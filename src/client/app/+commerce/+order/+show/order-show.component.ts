import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { WindowRef } from '../../../shared/services/window-ref.service';
import { Order, AssetLineItem, Project, quotesWithoutPricing } from '../../../shared/interfaces/commerce.interface';
import { enhanceAsset } from '../../../shared/interfaces/enhanced-asset';
import { AppStore } from '../../../app.store';
import { Common } from '../../../shared/utilities/common.functions';

@Component({
  moduleId: module.id,
  selector: 'order-show-component',
  templateUrl: 'order-show.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderShowComponent {
  public orderObservable: Observable<Order>;
  public noteVisibilityMap: { [index: string]: boolean } = {};

  constructor(private window: WindowRef, private store: AppStore) {
    this.orderObservable = this.store.select(state => state.order.activeOrder)
      .map((currentOrder) => {
        const order: Order = Common.clone(currentOrder);
        order.projects = order.projects.map((project: Project) => {
          if (project.lineItems) {
            project.lineItems = project.lineItems.map((lineItem: AssetLineItem) => {
              lineItem.asset = enhanceAsset(Object.assign(lineItem.asset, { uuid: lineItem.id }), 'order', order.id);
              return lineItem;
            });
          }
          return project;
        });
        return order;
      });
  }

  public download(url: string): void {
    this.window.nativeWindow.location.href = url;
  }

  public assetCountLabelKeyFor(count: number): string {
    switch (count) {
      case 0: return 'ORDER.SHOW.PROJECTS.NO_ASSETS';
      case 1: return 'ORDER.SHOW.PROJECTS.ONLY_ONE_ASSET';
      default: return 'ORDER.SHOW.PROJECTS.MORE_THAN_ONE_ASSET';
    }
  }

  public isRefundedLineItem(lineItem: AssetLineItem): boolean {
    return lineItem.price < 0;
  }

  public isRefundedProject(project: Project): boolean {
    return !!project.creditMemoForProjectId;
  }

  public isRefundedOrder(order: Order): boolean {
    return !!order.creditMemoForOrderId;
  }

  public shouldShowPaymentBalanceFor(item: Order): boolean {
    return !!item.paymentDueDate && !!item.paymentBalance && item.paymentBalance > 0;
  }

  public shouldShowDiscountFor(order: Order): boolean {
    return (order.discount || 0) > 0 && !order.creditMemoForOrderId;
  }

  public offlineAgreementIdsFor(order: Order): string {
    let ids: string[] = [];
    order.projects.forEach(project => project.lineItems.forEach((lineItem: AssetLineItem) => {
      if (lineItem.externalAgreementIds) lineItem.externalAgreementIds.forEach(id => ids.push(id));
    }));
    return ids.filter((id: string, index: number, ids: string[]) => id !== ids[index - 1]).join(', ');
  }

  public shouldDisplayRights(lineItem: AssetLineItem, order: Order): boolean {
    return lineItem.rightsManaged === 'Rights Managed' && !quotesWithoutPricing.includes(order.orderType);
  }

  public showDownloadButtonFor(lineItem: AssetLineItem): boolean {
    return !!lineItem.downloadUrl && lineItem.transcodeStatus !== 'Failed';
  }

  public nothingToDownload(lineItem: AssetLineItem): boolean {
    return !lineItem.downloadUrl && lineItem.transcodeStatus === 'Completed';
  }

  public showSpinnerIcon(lineItem: AssetLineItem): boolean {
    return lineItem.transcodeStatus === 'Submitted';
  }

  public showAsperaButtonFor(lineItem: AssetLineItem): boolean {
    return lineItem.transcodeStatus === 'Completed' && !!lineItem.asperaSpec;
  }

  public iconForNotesButton(lineItem: AssetLineItem): string {
    return this.noteVisibilityMap[lineItem.id] ? 'keyboard_arrow_up' : 'keyboard_arrow_down';
  }

  public toggleNotesVisibilityFor(lineItem: AssetLineItem): void {
    this.noteVisibilityMap[lineItem.id] = !this.noteVisibilityMap[lineItem.id];
  }

  public hasNotes(lineItem: AssetLineItem): boolean {
    return lineItem.hasOwnProperty('notes') &&
      lineItem.notes.length > 0 &&
      lineItem.notes[0].hasOwnProperty('notes') &&
      lineItem.notes[0].notes.length > 0;
  }

  public shouldShowNoteFor(lineItem: AssetLineItem): boolean {
    return this.hasNotes(lineItem) && !!this.noteVisibilityMap[lineItem.id];
  }
}
