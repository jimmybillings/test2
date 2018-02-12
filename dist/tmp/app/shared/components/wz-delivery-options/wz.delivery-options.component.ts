import { Observable } from 'rxjs/Observable';
import { Component, ChangeDetectionStrategy, OnInit, Input } from '@angular/core';
import { AppStore, ActionFactoryMapper } from '../../../app.store';
import { DeliveryOption, DeliveryOptions, DeliveryOptionGroup } from '../../../shared/interfaces/asset.interface';
import { SubclipMarkers } from '../../../shared/interfaces/subclip-markers';

@Component({
  moduleId: module.id,
  selector: 'wz-delivery-options',
  templateUrl: './wz.delivery-options.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WzDeliveryOptionsComponent implements OnInit {
  @Input() public assetId: number;
  @Input() public markers: SubclipMarkers = null;
  public deliveryOptions: Observable<DeliveryOptions>;
  public showMissingOptionsMessage: Observable<boolean>;
  public showLoadingSpinner: Observable<boolean>;
  public showLoadingMessage: Observable<boolean>;

  constructor(private store: AppStore) { }

  ngOnInit(): void {
    this.deliveryOptions = this.store.select(state => state.deliveryOptions.options);
    this.showMissingOptionsMessage = this.store.select(state => {
      return !state.deliveryOptions.loading && !state.deliveryOptions.hasDeliveryOptions;
    });
    this.showLoadingSpinner = this.store.select(state => state.deliveryOptions.loading);
    this.showLoadingMessage = this.store.select(state => state.deliveryOptions.showLoadingMessage);
  }

  public iconStringFor(option: DeliveryOption): string {
    return `ASSET.DELIVERY_OPTIONS.ICON.${option.deliveryOptionTransferType}`;
  }

  public trStringFor(group: DeliveryOptionGroup): string {
    return `ASSET.DELIVERY_OPTIONS.LABEL.${group[0].deliveryOptionLabel}`;
  }

  public onDownloadBtnClick(option: DeliveryOption): void {
    this.store.dispatch(this.factoryMapperFor(option));
  }

  private factoryMapperFor(option: DeliveryOption): ActionFactoryMapper {
    switch (option.deliveryOptionTransferType) {
      case 'location':
        return factory => factory.deliveryOptions.deliver(this.assetId, option, this.markers);
      case 'download':
        return factory => factory.deliveryOptions.download(option);
      case 'aspera':
        return factory => factory.deliveryOptions.downloadViaAspera(option);
      default:
        return factory => factory.snackbar.display('DELIVERY_OPTIONS.DELIVERY_ERROR');
    }
  }
}
