import { Injectable } from '@angular/core';
import { CurrentUserService } from '../../shared/services/current-user.service';
import { Observable } from 'rxjs/Observable';
import { AppStore } from '../../app.store';
import { FeatureStore } from '../../shared/stores/feature.store';
import { Feature } from '../../shared/interfaces/feature.interface';
import { Address, ViewAddress } from '../../shared/interfaces/user.interface';
import { Project, Quote, QuoteState } from '../../shared/interfaces/commerce.interface';

@Injectable()
export class CommerceCapabilities {
  constructor(public currentUser: CurrentUserService, public store: AppStore, public feature: FeatureStore) { }

  public haveCart(): boolean {
    return this.feature.isAvailable('disableCartAccess');
  }

  public viewCartIcon(): boolean {
    return this.store.snapshot(state => state.headerDisplayOptions.canBeFixed) && this.haveCart() && this.addToCart();
  }

  public addToCart(): boolean {
    return this.haveCart() && this.currentUser.loggedIn();
  }

  public purchaseOnCredit(): boolean {
    return this.haveCart() && this.currentUser.hasPurchaseOnCredit();
  }

  public editAddress(address: ViewAddress): boolean {
    return address.type === 'User' && !!address.address;
  }

  public addAddress(address: ViewAddress): boolean {
    return address.type === 'User' && !address.address;
  }

  public editAccountAddress(address: ViewAddress): boolean {
    return address.type === 'Account' && this.userHas('EditAccounts') && !!address.address;
  }

  public addAccountAddress(address: ViewAddress): boolean {
    return address.type === 'Account' && this.userHas('EditAccounts') && !address.address;
  }

  public administerQuotes(): boolean {
    return this.userHas('AdministerQuotes');
  }

  public editClips(): boolean {
    return this.userHas('EditClips');
  }

  public cloneQuote(quoteObservable: Observable<QuoteState>): Observable<boolean> {
    return quoteObservable.map((quoteState: QuoteState) => {
      const quote: Quote = quoteState.data;
      if (quote.projects) {
        return quote.projects
          .filter((project: Project) => project.lineItems || project.feeLineItems)
          .length > 0 && this.administerQuotes();
      } else { return false; }
    });
  }

  public userHas(permission: string): boolean {
    return this.currentUser.hasPermission(permission);
  }

  public createSubclips(asset: any): boolean {
    return this.userHas('CreateSubclips') && typeof this.findMetadataValueFor('Format.FrameRate', asset) === 'string';
  }

  public calculatePrice(): boolean {
    return this.userHas('ViewPriceAttributes');
  }

  public findMetadataValueFor(metadataName: string, object: any): string | null {
    if (object !== Object(object)) return null;

    const keys = Object.keys(object);

    if (keys.length === 2 && keys.sort().join('|') === 'name|value' && object.name === metadataName) {
      return object.value;
    }

    for (var key of keys) {
      const value = this.findMetadataValueFor(metadataName, object[key]);
      if (value) return value;
    }

    return null;
  }

  public viewLicenseAgreementsButton(cartHasAssets: Observable<boolean>): boolean {
    let hasAssets: boolean;
    cartHasAssets.take(1).subscribe((has: boolean) => hasAssets = has);
    return this.feature.isAvailable('disableCommerceAgreements') && hasAssets;
  }
}
