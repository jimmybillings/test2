import { Capabilities } from '../shared/services/capabilities.service';

export class ErrorBase {
  constructor(protected userCan: Capabilities) { }

  public get showCartLink(): boolean {
    return this.userCan.addToCart() && !this.userCan.administerQuotes();
  }

  public get showCollectionsLink(): boolean {
    return this.userCan.viewCollections();
  }

  public get showQuotesLink(): boolean {
    return this.userCan.administerQuotes();
  }
}
