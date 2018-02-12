import { Common } from '../../shared/utilities/common.functions';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as SubclipMarkersInterface from '../../shared/interfaces/subclip-markers';

import {
  AddAssetParameters,
  EditableQuoteFields,
  FeeLineItem,
  Project,
  Quote,
} from '../../shared/interfaces/commerce.interface';
import { FutureApiService } from '../api/api.service';
import { Api, ApiParameters } from '../../shared/interfaces/api.interface';
import { SubclipMarkers, Duration, durationFrom, bothMarkersAreSet } from '../../shared/interfaces/subclip-markers';
import { AssetLineItem, Asset, QuoteOptions } from '../../shared/interfaces/commerce.interface';
import { Pojo, SelectedPriceAttribute } from '../../shared/interfaces/common.interface';

@Injectable()
export class FutureQuoteEditService {
  constructor(private apiService: FutureApiService) { }


  public load(): Observable<Quote> {
    return this.apiService.get(Api.Orders, 'quote/focused', { loadingIndicator: true });
  }

  public delete(quoteId: number): Observable<Quote> {
    return this.apiService.delete(Api.Orders, `quote/${quoteId}`, { loadingIndicator: 'onBeforeRequest' })
      .switchMap(() => this.load());
  }

  public addProject(quoteId: number): Observable<Quote> {
    return this.apiService.post(Api.Orders, `quote/${quoteId}/project`, { loadingIndicator: true });
  }

  public removeProject(quoteId: number, projectId: number): Observable<Quote> {
    return this.apiService.delete(Api.Orders, `quote/${quoteId}/project/${projectId}`, { loadingIndicator: true });
  }

  public updateProject(quoteId: number, project: Project): Observable<Quote> {
    return this.apiService.put(Api.Orders, `quote/${quoteId}/project`, { body: project, loadingIndicator: true });
  }

  public moveLineItem(quoteId: number, project: Project, lineItem: AssetLineItem): Observable<Quote> {
    return this.apiService.put(
      Api.Orders,
      `quote/${quoteId}/move/lineItem`,
      { parameters: { lineItemId: lineItem.id, projectId: project.id }, loadingIndicator: true }
    );
  }

  public cloneLineItem(quoteId: number, lineItem: AssetLineItem): Observable<Quote> {
    return this.apiService.put(Api.Orders, `quote/${quoteId}/clone/lineItem`,
      { parameters: { lineItemId: lineItem.id }, loadingIndicator: true });
  }

  public editLineItemFromDetails(
    quoteId: number,
    lineItem: AssetLineItem,
    markers: SubclipMarkers,
    attributes: SelectedPriceAttribute[]
  ): Observable<Quote> {
    const duration: Duration = this.durationFrom(lineItem, markers);
    const newAttributes: SelectedPriceAttribute[] = attributes ? attributes : lineItem.attributes || [];
    const newAsset: Asset = { ...lineItem.asset, ...duration };

    const newLineItem = {
      ...lineItem,
      attributes: newAttributes,
      asset: newAsset
    };

    return this.makeEditLineItemRequest(quoteId, newLineItem);
  }

  public removeAsset(quoteId: number, asset: Asset): Observable<Quote> {
    return this.apiService.delete(Api.Orders, `quote/${quoteId}/asset/${asset.uuid}`, { loadingIndicator: true });
  }

  public addCustomPriceToLineItem(quoteId: number, lineItem: AssetLineItem, customPrice: number): Observable<Quote> {
    const multiplier: number = Math.round((customPrice / lineItem.itemPrice) * Math.pow(10, 6)) / Math.pow(10, 6);

    const newLineItem: AssetLineItem = {
      ...lineItem,
      multiplier: multiplier
    };

    return this.makeEditLineItemRequest(quoteId, newLineItem);
  }

  public createQuote(): Observable<Quote> {
    return this.apiService.post(Api.Orders, 'quote', { loadingIndicator: true });
  }

  public sendQuote(quoteId: number, ownerEmail: string, body: Pojo): Observable<any> {
    return this.apiService.put(
      Api.Orders,
      `quote/send/${quoteId}`,
      { body: body, parameters: { ownerEmail: ownerEmail }, loadingIndicator: true }
    );
  }

  public cloneQuote(quote: Quote): Observable<Quote> {
    Common.deletePropertiesFromObject(
      quote,
      [
        'id', 'createdUserId', 'ownerUserId', 'createdOn', 'lastUpdated', 'expirationDate', 'quoteStatus',
        'paymentTerms', 'poNumber', 'bulkOrderId', 'poReference', 'campaignReference', 'orderId', 'billingAccountId',
        'invoiceContact', 'salesManager', 'ownerData', 'billingAccountData', 'userId', 'externalLicenseIds', 'internalLicenseIds',
        'externalAgreementIds', 'internalAgreementIds'
      ]
    );
    return this.apiService.post(Api.Orders, 'quote',
      {
        loadingIndicator: true,
        body: quote
      });
  }

  public updateQuoteField(quoteField: Pojo, quote: Quote): Observable<Quote> {
    let property: EditableQuoteFields = Object.keys(quoteField)[0] as EditableQuoteFields;
    if (quoteField[property] === '') {
      delete quote[property];
    } else {
      quote = { ...quote, ...quoteField };
    }

    return this.apiService.put(
      Api.Orders,
      `quote/${quote.id}`,
      { body: quote, loadingIndicator: true },
    );
  }

  public editLineItemMarkers(
    quoteId: number,
    lineItem: AssetLineItem,
    newMarkers: SubclipMarkersInterface.SubclipMarkers): Observable<Quote> {
    const duration: SubclipMarkersInterface.Duration = SubclipMarkersInterface.durationFrom(newMarkers);

    Object.assign(lineItem.asset, duration);

    return this.apiService.put(
      Api.Orders,
      `quote/${quoteId}/update/lineItem/${lineItem.id}`,
      { body: lineItem, parameters: { region: 'AAA' }, loadingIndicator: true }
    );
  }

  public updateProjectPriceAttributes(
    quoteId: number, priceAttributes: SelectedPriceAttribute[], project: Project
  ): Observable<Quote> {
    return this.apiService.put(
      Api.Orders,
      `quote/${quoteId}/project/priceAttributes/${project.id}`,
      { body: priceAttributes, loadingIndicator: true }
    );
  }

  public editLineItem(quoteId: number, lineItem: AssetLineItem, fieldToEdit: any): Observable<Quote> {
    if (!!fieldToEdit.pricingAttributes) {
      fieldToEdit = { attributes: fieldToEdit.pricingAttributes };
    }

    return this.makeEditLineItemRequest(quoteId, Object.assign(lineItem, fieldToEdit));
  }

  public addFeeTo(quoteId: number, project: Project, fee: FeeLineItem): Observable<Quote> {
    return this.apiService.put(
      Api.Orders,
      `quote/${quoteId}/fee/lineItem`,
      { body: fee, parameters: { projectName: project.name }, loadingIndicator: true }
    );
  }

  public removeFee(quoteId: number, fee: FeeLineItem): Observable<Quote> {
    return this.apiService.delete(
      Api.Orders,
      `quote/${quoteId}/fee/${fee.id}`,
      { loadingIndicator: true }
    );
  }

  public bulkImport(quoteId: number, rawAssets: { lineItemAttributes: string }, projectId: string): Observable<Quote> {
    return this.apiService.put(
      Api.Orders,
      `quote/${quoteId}/asset/direct/lineItem`,
      {
        body: rawAssets,
        parameters: { projectId },
        loadingIndicator: true
      }
    );
  }

  public addAssetToProjectInQuote(
    quoteId: number,
    existingProjectNames: Array<string>,
    addAssetParameters: AddAssetParameters): Observable<Quote> {
    return this.apiService.put(
      Api.Orders,
      `quote/${quoteId}/asset/lineItem`,
      {
        body: this.formatAssetBody(addAssetParameters),
        parameters: { projectName: existingProjectNames[existingProjectNames.length - 1], region: 'AAA' },
        loadingIndicator: true
      }
    );
  }

  public addNote(quoteId: number, note: string, lineItem: AssetLineItem): Observable<Quote> {
    if (lineItem.hasOwnProperty('notes') && Array.isArray(lineItem.notes)) {
      lineItem.notes[0] = { notes: [note] };
    } else {
      lineItem.notes = [{ notes: [note] }];
    }

    return this.makeEditLineItemRequest(quoteId, lineItem);
  }

  public removeNote(quoteId: number, lineItem: AssetLineItem): Observable<Quote> {
    let clonedLineItem: AssetLineItem = Common.clone(lineItem);
    delete clonedLineItem.notes;

    return this.makeEditLineItemRequest(quoteId, clonedLineItem);
  }

  private formatAssetBody(parameters: AddAssetParameters): any {
    let formatted = {};
    Object.assign(formatted, { lineItem: this.formatLineItem(parameters.lineItem, parameters.markers) });
    if (parameters.attributes) {
      Object.assign(formatted, { attributes: parameters.attributes });
    }
    return formatted;
  }

  private formatLineItem(lineItem: any, markers: SubclipMarkersInterface.SubclipMarkers): any {
    return Object.assign({}, lineItem, { asset: this.formatAsset(lineItem.asset, markers) });
  }

  private formatAsset(asset: any, markers: SubclipMarkersInterface.SubclipMarkers): any {
    let timeStart: number;
    let timeEnd: number;

    if (markers) {
      const duration: SubclipMarkersInterface.Duration = SubclipMarkersInterface.durationFrom(markers);
      timeStart = duration.timeStart;
      timeEnd = duration.timeEnd;
    } else {
      timeStart = asset.timeStart;
      timeEnd = asset.timeEnd;
    }

    return { assetId: asset.assetId, timeStart: timeStart >= 0 ? timeStart : -1, timeEnd: timeEnd >= 0 ? timeEnd : -2 };
  }

  private durationFrom(lineItem: AssetLineItem, markers: SubclipMarkers): Duration {
    return bothMarkersAreSet(markers) ?
      durationFrom(markers) : { timeStart: lineItem.asset.timeStart, timeEnd: lineItem.asset.timeEnd };
  }

  private makeEditLineItemRequest(quoteId: number, lineItem: AssetLineItem): Observable<Quote> {
    return this.apiService.put(
      Api.Orders,
      `quote/${quoteId}/update/lineItem/${lineItem.id}`,
      { body: lineItem, parameters: { region: 'AAA' }, loadingIndicator: true }
    );
  }
}
