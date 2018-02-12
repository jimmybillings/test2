import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CommerceCapabilities } from '../services/commerce.capabilities';
import { CommerceMessage } from '../../shared/interfaces/commerce.interface';
import { AppStore } from '../../app.store';
import { FormFields } from '../../shared/interfaces/forms.interface';
import { CommentParentObject } from '../../shared/interfaces/comment.interface';
import { CartService } from '../../shared/services/cart.service';

@Component({
  moduleId: module.id,
  selector: 'cart-component',
  templateUrl: 'cart.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CartComponent implements OnInit {
  public tabLabelKeys: string[];
  public tabEnabled: boolean[];
  public selectedTabIndex: number;
  public showComments: boolean = null;
  public commentFormConfig: FormFields;
  public commentParentObject: CommentParentObject;

  constructor(
    public userCan: CommerceCapabilities,
    private store: AppStore,
    private cartService: CartService,
    private detector: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.store.dispatch(factory => factory.checkout.reset());
    // We could initialize a subset of these instead, based on some condition.
    // For example, don't include 'billing' and 'payment' if the cart total is 0.
    // this.tabLabelKeys = ['cart', 'billing', 'payment', 'confirm'];
    // I think the confirm tab should be place order
    this.tabLabelKeys = ['cart', 'billing', 'payment', 'confirm'];

    // Enable the first tab and disable the rest.
    this.tabEnabled = this.tabLabelKeys.map((_, index) => index === 0);

    this.selectedTabIndex = 0;

    this.commentFormConfig = this.store.snapshotCloned(state => state.uiConfig.components.cartComment.config.form.items);

    this.commentParentObject = { objectType: 'cart', objectId: this.cartService.state.data.id };
  }

  public onNotification(message: CommerceMessage): void {
    switch (message.type) {
      case 'GO_TO_NEXT_TAB': {
        this.goToNextTab();
        break;
      }
      case 'GO_TO_PREVIOUS_TAB': {
        this.goToPreviousTab();
        break;
      }
      case 'GO_TO_TAB': {
        this.goToTab(message.payload);
        break;
      }
      case 'DISABLE_TAB': {
        this.disableTab(message.payload);
      }
    }
  }

  public toggleCommentsVisibility(): void {
    this.showComments = !this.showComments;
  }

  public get commentCount(): Observable<number> {
    return this.store.select(state => state.comment.cart.pagination.totalCount);
  }

  private goToNextTab(): void {
    let nextSelectedTabIndex: number = this.selectedTabIndex + 1;
    if (nextSelectedTabIndex >= this.tabLabelKeys.length) return;

    this.tabEnabled[nextSelectedTabIndex] = true;
    this.selectedTabIndex = nextSelectedTabIndex;
    this.detector.markForCheck();
  }

  private goToPreviousTab(): void {
    if (this.selectedTabIndex === 0) return;
    this.selectedTabIndex -= 1;
    this.detector.markForCheck();
  }

  private disableTab(tabIndex: number) {
    this.tabEnabled[tabIndex] = false;
    this.detector.markForCheck();
  }

  private goToTab(tabIndex: number) {
    this.selectedTabIndex = tabIndex;
    this.detector.markForCheck();
  }
}
