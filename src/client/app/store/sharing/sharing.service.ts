import { visitAll } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { FutureApiService } from '../api/api.service';
import { Api } from '../../shared/interfaces/api.interface';
import { SubclipMarkers, Duration, durationFrom, bothMarkersAreSet } from '../../shared/interfaces/subclip-markers';
import { AssetShareParameters, CollectionShareParameters, Pojo } from '../../shared/interfaces/common.interface';
import { CurrentUserService } from '../../shared/services/current-user.service';

@Injectable()
export class SharingService {
  constructor(private apiService: FutureApiService, private currentUserService: CurrentUserService) { }

  public createAssetShareLink(assetId: number, markers: SubclipMarkers): Observable<string> {
    return this.callSharingEndpointWith(this.formatAssetCreateBodyWith(assetId, markers))
      .map(response => `${window.location.href};share_key=${response.apiKey}`);
  }

  public emailAssetShareLink(
    assetId: number, markers: SubclipMarkers, parameters: AssetShareParameters, properties: Pojo
  ): Observable<null> {
    return this.callSharingEndpointWith(this.formatAssetEmailBodyWith(assetId, markers, parameters, properties))
      .map(response => null);
  }

  public emailCollectionShareLink(collectionId: number, parameters: CollectionShareParameters): Observable<null> {
    return this.apiService.post(Api.Identities, 'collection/share', {
      body: {
        userEmail: [
          parameters.recipientEmails
        ],
        collections: [
          collectionId
        ],
        accessLevel: parameters.accessLevel,
        comment: parameters.comment
      },
      loadingIndicator: 'onBeforeRequest'
    }).map(response => null);
  }

  private callSharingEndpointWith(body: AccessInfoRequestBody): Observable<AccessInfoResponse> {
    return this.apiService.post(Api.Identities, 'accessInfo', { body: body });
  }

  private formatAssetCreateBodyWith(assetId: number, markers: SubclipMarkers, properties?: Pojo): AccessInfoRequestBody {
    const durationProperties: Duration = this.formatTimePropertiesFrom(markers);
    const fullProperties: Pojo = properties ? { ...durationProperties, ...properties } : durationProperties;
    return {
      type: 'asset',
      accessInfo: String(assetId),
      accessStartDate: this.formatStartDate(),
      accessEndDate: this.formatEndDate(),
      properties: fullProperties
    };
  }

  private formatAssetEmailBodyWith(
    assetId: number, markers: SubclipMarkers, parameters: AssetShareParameters, properties: Pojo
  ): AccessInfoRequestBody {
    return {
      ...this.formatAssetCreateBodyWith(assetId, markers, properties),
      recipientEmails: this.formatEmailReceipientsFrom(parameters.recipientEmails, parameters.copyMe),
      comment: parameters.comment,
      project: parameters.project
    };
  }

  private formatStartDate(): string {
    return this.isoFormatLocalDate(new Date());
  }

  private formatEndDate(): string {
    const date: Date = new Date();
    date.setDate(date.getDate() + 10);

    return this.isoFormatLocalDate(date);
  }

  private isoFormatLocalDate(date: Date): string {
    const outputDate: string = `${date.getFullYear()}-${this.pad(date.getMonth() + 1)}-${this.pad(date.getDate())}`;
    const outputTime: string = `${this.pad(date.getHours())}:${this.pad(date.getMinutes())}:${this.pad(date.getSeconds())}`;
    const timeZoneOffset: number = -date.getTimezoneOffset();
    const outputTimeZoneSign: string = timeZoneOffset >= 0 ? '+' : '-';
    const outputTimeZoneOffset: string = `${this.pad(timeZoneOffset / 60)}:${this.pad(timeZoneOffset % 60)}`;

    return `${outputDate}T${outputTime}${outputTimeZoneSign}${outputTimeZoneOffset}`;
  }

  private pad(number: number): string {
    var integer: number = Math.abs(Math.floor(number));
    return integer < 10 ? `0${integer}` : String(integer);
  }

  private formatTimePropertiesFrom(markers: SubclipMarkers): Duration {
    return bothMarkersAreSet(markers) ? durationFrom(markers) : null;
  }

  private formatEmailReceipientsFrom(recipientsString: string, copyMe: boolean): string[] {
    return recipientsString.split(/\s*,\s*|\s*;\s*/).concat(copyMe ? [this.currentUserService.state.emailAddress] : []);
  }
}

interface AccessInfoRequestBody {
  type: 'asset';
  accessInfo: string;
  accessStartDate: string;
  accessEndDate: string;
  properties?: Pojo;
  recipientEmails?: string[];
  comment?: string;
  project?: string;
}

interface AccessInfoResponse {
  apiKey: string;
}
