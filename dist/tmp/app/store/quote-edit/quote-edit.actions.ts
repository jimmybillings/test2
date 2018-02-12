import {
  AddAssetParameters,
  AssetLineItem,
  FeeLineItem,
  Project,
  Quote,
  QuoteOptions,
  SendDetails,
  SendDetailsInvoiceContact
} from '../../shared/interfaces/commerce.interface';
import { Asset, SelectedPriceAttribute, Pojo } from '../../shared/interfaces/common.interface';
import { Account } from '../../shared/interfaces/account.interface';
import { ApiErrorResponse } from '../../shared/interfaces/api.interface';
import { SubclipMarkers } from '../../shared/interfaces/subclip-markers';
import { User } from '../../shared/interfaces/user.interface';
import { Action } from '@ngrx/store';
export class ActionFactory {
  public load(): Load {
    return new Load();
  }

  public delete(): Delete {
    return new Delete();
  }

  public editLineItemFromDetails(
    uuid: string,
    markers: SubclipMarkers,
    attributes: SelectedPriceAttribute[]
  ): EditLineItemFromDetails {
    return new EditLineItemFromDetails(uuid, markers, attributes);
  }

  public removeAsset(asset: Asset): RemoveAsset {
    return new RemoveAsset(asset);
  }

  public addCustomPriceToLineItem(lineItem: AssetLineItem, price: number): AddCustomPriceToLineItem {
    return new AddCustomPriceToLineItem(lineItem, price);
  }

  public sendQuote(): SendQuote {
    return new SendQuote();
  }

  public saveRecipientInformationOnQuote(quoteOptions: QuoteOptions): SaveRecipientInformationOnQuote {
    return new SaveRecipientInformationOnQuote(quoteOptions);
  }

  public cloneQuote(quote: Quote): CloneQuote {
    return new CloneQuote(quote);
  }

  public createQuote(): CreateQuote {
    return new CreateQuote();
  }

  public updateQuoteField(options: Pojo): UpdateQuoteFields {
    return new UpdateQuoteFields(options);
  }

  public addFeeTo(project: Project, fee: FeeLineItem): AddFeeTo {
    return new AddFeeTo(project, fee);
  }

  public removeFee(fee: FeeLineItem): RemoveFee {
    return new RemoveFee(fee);
  }

  public bulkImport(rawAssets: { lineItemAttributes: string }, projectId: string): BulkImport {
    return new BulkImport(rawAssets, projectId);
  }

  public editLineItem(lineItem: AssetLineItem, fieldToEdit: any): EditLineItem {
    return new EditLineItem(lineItem, fieldToEdit);
  }

  public addAssetToProjectInQuote(paramaters: AddAssetParameters): AddAssetToProjectInQuote {
    return new AddAssetToProjectInQuote(paramaters);
  }

  public addProject(): AddProject {
    return new AddProject();
  }

  public removeProject(projectId: number): RemoveProject {
    return new RemoveProject(projectId);
  }

  public updateProject(project: Project): UpdateProject {
    return new UpdateProject(project);
  }

  public moveLineItem(project: Project, lineItem: AssetLineItem): MoveLineItem {
    return new MoveLineItem(project, lineItem);
  }

  public cloneLineItem(lineItem: AssetLineItem): CloneLineItem {
    return new CloneLineItem(lineItem);
  }

  public editLineItemMarkers(lineItem: AssetLineItem, newMarkers: SubclipMarkers) {
    return new EditLineItemMarkers(lineItem, newMarkers);
  }

  public updateProjectPriceAttributes(priceAttributes: SelectedPriceAttribute[], project: Project): UpdateProjectPriceAttributes {
    return new UpdateProjectPriceAttributes(priceAttributes, project);
  }

  public addUserToQuote(user: User): AddUserToQuote {
    return new AddUserToQuote(user);
  }

  public addBillingAccountToQuote(account: Account): AddBillingAccountToQuote {
    return new AddBillingAccountToQuote(account);
  }

  public addInvoiceContactToQuote(userId: number): AddInvoiceContactToQuote {
    return new AddInvoiceContactToQuote(userId);
  }

  public initializeSalesManagerFormOnQuote(emailAddress: string, defaultDate: string): InitializeSalesManagerFormOnQuote {
    return new InitializeSalesManagerFormOnQuote(emailAddress, defaultDate);
  }

  public updateSalesManagerFormOnQuote(form: Pojo): UpdateSalesManagerFormOnQuote {
    return new UpdateSalesManagerFormOnQuote(form);
  }

  public updateBillingAccount(form: Pojo): UpdateBillingAccount {
    return new UpdateBillingAccount(form);
  }

  public addNote(note: string, lineItem: AssetLineItem): AddNote {
    return new AddNote(note, lineItem);
  }

  public removeNoteFrom(lineItem: AssetLineItem): RemoveNote {
    return new RemoveNote(lineItem);
  }

  public overrideInvoiceContact(contact: SendDetailsInvoiceContact): OverrideInvoiceContact {
    return new OverrideInvoiceContact(contact);
  }
}

export class InternalActionFactory extends ActionFactory {
  public loadSuccess(quote: Quote): LoadSuccess {
    return new LoadSuccess(quote);
  }

  public loadFailure(error: ApiErrorResponse): LoadFailure {
    return new LoadFailure(error);
  }

  public deleteSuccess(quote: Quote): DeleteSuccess {
    return new DeleteSuccess(quote);
  }

  public deleteFailure(error: ApiErrorResponse): DeleteFailure {
    return new DeleteFailure(error);
  }

  public editLineItemFromDetailsSuccess(quote: Quote): EditLineItemFromDetailsSuccess {
    return new EditLineItemFromDetailsSuccess(quote);
  }

  public editLineItemFromDetailsFailure(error: ApiErrorResponse): EditLineItemFromDetailsFailure {
    return new EditLineItemFromDetailsFailure(error);
  }

  public removeAssetSuccess(quote: Quote): RemoveAssetSuccess {
    return new RemoveAssetSuccess(quote);
  }

  public removeAssetFailure(error: ApiErrorResponse): RemoveAssetFailure {
    return new RemoveAssetFailure(error);
  }

  public addCustomPriceToLineItemSuccess(quote: Quote): AddCustomPriceToLineItemSuccess {
    return new AddCustomPriceToLineItemSuccess(quote);
  }

  public addCustomPriceToLineItemFailure(error: ApiErrorResponse): AddCustomPriceToLineItemFailure {
    return new AddCustomPriceToLineItemFailure(error);
  }

  public sendQuoteSuccess(quoteId: number, ownerEmail: string) {
    return new SendQuoteSuccess(quoteId, ownerEmail);
  }

  public cloneQuoteSuccess(quote: Quote) {
    return new CloneQuoteSuccess(quote);
  }

  public bulkImportSuccess(quote: Quote, rawAssets: { lineItemAttributes: string }): BulkImportSuccess {
    return new BulkImportSuccess(quote, rawAssets);
  }

  public addAssetToProjectInQuoteSuccess(quote: Quote, assetId: number): AddAssetToProjectInQuoteSuccess {
    return new AddAssetToProjectInQuoteSuccess(quote, assetId);
  }

  public refreshAndNotify(quote: Quote, translationString: string): RefreshAndNotify {
    return new RefreshAndNotify(quote, translationString);
  }
}

export class Load implements Action {
  public static readonly Type = '[Quote Edit] Load';
  public readonly type = Load.Type;
}

export class LoadSuccess implements Action {
  public static readonly Type = '[Quote Edit] Load Success';
  public readonly type = LoadSuccess.Type;
  constructor(public readonly quote: Quote) { }
}

export class LoadFailure implements Action {
  public static readonly Type = '[Quote Edit] Load Failure';
  public readonly type = LoadFailure.Type;
  constructor(public readonly error: ApiErrorResponse) { }
}

export class Delete implements Action {
  public static readonly Type = '[Quote Edit] Delete';
  public readonly type = Delete.Type;
}

export class DeleteSuccess implements Action {
  public static readonly Type = '[Quote Edit] Delete Success';
  public readonly type = DeleteSuccess.Type;
  constructor(public readonly quote: Quote) { }
}

export class DeleteFailure implements Action {
  public static readonly Type = '[Quote Edit] Delete Failure';
  public readonly type = DeleteFailure.Type;
  constructor(public readonly error: ApiErrorResponse) { }
}

export class EditLineItemFromDetails implements Action {
  public static readonly Type = '[Quote Edit] Edit Line Item From Details';
  public readonly type = EditLineItemFromDetails.Type;
  constructor(
    public readonly uuid: string,
    public readonly markers: SubclipMarkers,
    public readonly attributes: SelectedPriceAttribute[]
  ) { }
}

export class EditLineItemFromDetailsSuccess implements Action {
  public static readonly Type = '[Quote Edit] Edit Line Item From Details Success';
  public readonly type = EditLineItemFromDetailsSuccess.Type;
  constructor(public readonly quote: Quote) { }
}

export class EditLineItemFromDetailsFailure implements Action {
  public static readonly Type = '[Quote Edit] Edit Line Item From Details Failure';
  public readonly type = EditLineItemFromDetailsFailure.Type;
  constructor(public readonly error: ApiErrorResponse) { }
}

export class RemoveAsset implements Action {
  public static readonly Type = '[Quote Edit] Remove Asset';
  public readonly type = RemoveAsset.Type;
  constructor(public readonly asset: Asset) { }
}

export class RemoveAssetSuccess implements Action {
  public static readonly Type = '[Quote Edit] Remove Asset Success';
  public readonly type = RemoveAssetSuccess.Type;
  constructor(public readonly quote: Quote) { }
}

export class RemoveAssetFailure implements Action {
  public static readonly Type = '[Quote Edit] Remove Asset Failure';
  public readonly type = RemoveAssetFailure.Type;
  constructor(public readonly error: ApiErrorResponse) { }
}

export class AddCustomPriceToLineItem implements Action {
  public static readonly Type = '[Quote Edit] Add Custom Price To LineItem';
  public readonly type = AddCustomPriceToLineItem.Type;
  constructor(public readonly lineItem: AssetLineItem, public readonly price: number) { }
}

export class AddCustomPriceToLineItemSuccess implements Action {
  public static readonly Type = '[Quote Edit] Add Custom Price To LineItem Success';
  public readonly type = AddCustomPriceToLineItemSuccess.Type;
  constructor(public readonly quote: Quote) { }
}

export class AddCustomPriceToLineItemFailure implements Action {
  public static readonly Type = '[Quote Edit] Add Custom Price To LineItem Failure';
  public readonly type = AddCustomPriceToLineItemFailure.Type;
  constructor(public readonly error: ApiErrorResponse) { }
}

export class SendQuote implements Action {
  public static readonly Type = '[Quote Edit] Send Quote';
  public readonly type = SendQuote.Type;
}

export class SaveRecipientInformationOnQuote implements Action {
  public static readonly Type = '[Quote Edit] Save Recipient Information On Quote';
  public readonly type = SaveRecipientInformationOnQuote.Type;
  constructor(public readonly quoteOptions: QuoteOptions) { }
}

export class SendQuoteSuccess implements Action {
  public static readonly Type = '[Quote Edit] Send Quote Success';
  public readonly type = SendQuoteSuccess.Type;
  constructor(
    public readonly quoteId: number,
    public readonly ownerEmail: string) { }
}

export class CloneQuote implements Action {
  public static readonly Type = '[Quote Edit] Clone Quote';
  public readonly type = CloneQuote.Type;
  constructor(public readonly quote: Quote) { }
}

export class CloneQuoteSuccess implements Action {
  public static readonly Type = '[Quote Edit] Clone Quote Success';
  public readonly type = CloneQuoteSuccess.Type;
  constructor(public readonly quote: Quote) { }
}

export class CreateQuote implements Action {
  public static readonly Type = '[Quote Edit] Create Quote';
  public readonly type = CreateQuote.Type;
}
export class UpdateQuoteFields implements Action {
  public static readonly Type = '[Quote Edit] Update Quote Fields';
  public readonly type = UpdateQuoteFields.Type;
  constructor(public readonly options: Pojo) { }
}
export class AddFeeTo implements Action {
  public static readonly Type = '[Quote Edit] Add Fee To';
  public readonly type = AddFeeTo.Type;
  constructor(public readonly project: Project, public readonly fee: FeeLineItem) { }
}

export class RemoveFee implements Action {
  public static readonly Type = '[Quote Edit] Remove Fee';
  public readonly type = RemoveFee.Type;
  constructor(public readonly fee: FeeLineItem) { }
}

export class BulkImport implements Action {
  public static readonly Type = '[Quote Edit] Bulk Import';
  public readonly type = BulkImport.Type;
  constructor(public readonly rawAssets: { lineItemAttributes: string }, public readonly projectId: string) { }
}

export class BulkImportSuccess implements Action {
  public static readonly Type = '[Quote Edit] Bulk Import Success';
  public readonly type = BulkImportSuccess.Type;
  constructor(public readonly quote: Quote, public readonly rawAssets: { lineItemAttributes: string }) { }
}

export class EditLineItem implements Action {
  public static readonly Type = '[Quote Edit] Edit Line Item';
  public readonly type = EditLineItem.Type;
  constructor(public readonly lineItem: AssetLineItem, public readonly fieldToEdit: any) { }
}

export class AddAssetToProjectInQuote implements Action {
  public static readonly Type = '[Quote Edit] Add Asset To Project In Quote';
  public readonly type = AddAssetToProjectInQuote.Type;
  constructor(public readonly parameters: AddAssetParameters) { }
}

export class AddAssetToProjectInQuoteSuccess implements Action {
  public static readonly Type = '[Quote Edit] Add Asset To Project In Quote Success';
  public readonly type = AddAssetToProjectInQuoteSuccess.Type;
  constructor(public readonly quote: Quote, public readonly assetId: number) { }
}

export class AddProject implements Action {
  public static readonly Type = '[Quote Edit] Add Project';
  public readonly type = AddProject.Type;
}

export class RemoveProject implements Action {
  public static readonly Type = '[Quote Edit] Remove Project';
  public readonly type = RemoveProject.Type;
  constructor(public readonly projectId: number) { }
}
export class UpdateProject implements Action {
  public static readonly Type = '[Quote Edit] Update Project';
  public readonly type = UpdateProject.Type;
  constructor(public readonly project: Project) { }
}

export class MoveLineItem implements Action {
  public static readonly Type = '[Quote Edit] Move Line Item';
  public readonly type = MoveLineItem.Type;
  constructor(public readonly project: Project, public readonly lineItem: AssetLineItem) { }
}

export class CloneLineItem implements Action {
  public static readonly Type = '[Quote Edit] Clone Line Item';
  public readonly type = CloneLineItem.Type;
  constructor(public readonly lineItem: AssetLineItem) { }
}

export class RefreshAndNotify implements Action {
  public static readonly Type = '[Quote Edit] Refresh And Notify';
  public readonly type = RefreshAndNotify.Type;
  constructor(public readonly quote: Quote, public readonly translationString: string) { }
}

export class EditLineItemMarkers implements Action {
  public static readonly Type = '[Quote Edit] Edit Line Item Markers';
  public readonly type = EditLineItemMarkers.Type;
  constructor(public readonly lineItem: AssetLineItem, public readonly newMarkers: SubclipMarkers) { }
}

export class UpdateProjectPriceAttributes implements Action {
  public static readonly Type = '[Quote Edit] Update Project Price Attributes';
  public readonly type = UpdateProjectPriceAttributes.Type;
  constructor(public readonly priceAttributes: SelectedPriceAttribute[], public readonly project: Project) { }
}

export class AddUserToQuote implements Action {
  public static readonly Type = '[Quote Edit] Add User To Quote';
  public readonly type = AddUserToQuote.Type;
  constructor(public readonly user: User) { }
}
export class AddBillingAccountToQuote implements Action {
  public static readonly Type = '[Quote Edit] Add Billing Account To Quote';
  public readonly type = AddBillingAccountToQuote.Type;
  constructor(public readonly account: Account) { }
}

export class AddInvoiceContactToQuote implements Action {
  public static readonly Type = '[Quote Edit] Add Invoice Contact To Quote';
  public readonly type = AddInvoiceContactToQuote.Type;
  constructor(public readonly userId: number) { }
}

export class InitializeSalesManagerFormOnQuote implements Action {
  public static readonly Type = '[Quote Edit] Initialize Sales Manager Form On Quote';
  public readonly type = InitializeSalesManagerFormOnQuote.Type;
  constructor(public readonly emailAddress: string, public readonly defaultDate: string) { }
}

export class UpdateSalesManagerFormOnQuote implements Action {
  public static readonly Type = '[Quote Edit] Add Sales Manager Form On Quote';
  public readonly type = UpdateSalesManagerFormOnQuote.Type;
  constructor(public readonly form: Pojo) { }
}

export class UpdateBillingAccount implements Action {
  public static readonly Type = '[Quote Edit] Update Billing Account';
  public readonly type = UpdateBillingAccount.Type;
  constructor(public readonly form: Pojo) { }
}

export class AddNote implements Action {
  public static readonly Type = '[Quote Edit] Add Note';
  public readonly type = AddNote.Type;
  constructor(public readonly note: string, public readonly lineItem: AssetLineItem) { }
}

export class RemoveNote implements Action {
  public static readonly Type = '[Quote Edit] Remove Note';
  public readonly type = RemoveNote.Type;
  constructor(public readonly lineItem: AssetLineItem) { }
}

export class OverrideInvoiceContact implements Action {
  public static readonly Type = '[Quote Edit] Override Invoice Contact';
  public readonly type = OverrideInvoiceContact.Type;
  constructor(public readonly contact: SendDetailsInvoiceContact) { }
}

export type Any =
  Load | LoadSuccess | LoadFailure |
  Delete | DeleteSuccess | DeleteFailure |
  EditLineItemFromDetails | EditLineItemFromDetailsSuccess | EditLineItemFromDetailsFailure |
  RemoveAsset | RemoveAssetSuccess | RemoveAssetFailure |
  AddCustomPriceToLineItem | AddCustomPriceToLineItemSuccess | AddCustomPriceToLineItemFailure |
  SendQuote | SaveRecipientInformationOnQuote | CloneQuote | CloneQuoteSuccess | CreateQuote |
  UpdateQuoteFields | AddFeeTo | RemoveFee | BulkImport | BulkImportSuccess | EditLineItem |
  AddAssetToProjectInQuote | AddAssetToProjectInQuoteSuccess | AddProject | RemoveProject |
  UpdateProject | MoveLineItem | CloneLineItem | RefreshAndNotify | EditLineItemMarkers |
  UpdateProjectPriceAttributes | AddUserToQuote | AddBillingAccountToQuote | AddInvoiceContactToQuote |
  InitializeSalesManagerFormOnQuote | UpdateSalesManagerFormOnQuote |
  UpdateBillingAccount | AddNote | RemoveNote | OverrideInvoiceContact;
