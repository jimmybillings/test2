"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ActionFactory = (function () {
    function ActionFactory() {
    }
    ActionFactory.prototype.load = function () {
        return new Load();
    };
    ActionFactory.prototype.delete = function () {
        return new Delete();
    };
    ActionFactory.prototype.editLineItemFromDetails = function (uuid, markers, attributes) {
        return new EditLineItemFromDetails(uuid, markers, attributes);
    };
    ActionFactory.prototype.removeAsset = function (asset) {
        return new RemoveAsset(asset);
    };
    ActionFactory.prototype.addCustomPriceToLineItem = function (lineItem, price, override) {
        return new AddCustomPriceToLineItem(lineItem, price, override);
    };
    ActionFactory.prototype.sendQuote = function () {
        return new SendQuote();
    };
    ActionFactory.prototype.saveRecipientInformationOnQuote = function (quoteOptions) {
        return new SaveRecipientInformationOnQuote(quoteOptions);
    };
    ActionFactory.prototype.cloneQuote = function (quote) {
        return new CloneQuote(quote);
    };
    ActionFactory.prototype.createQuote = function () {
        return new CreateQuote();
    };
    ActionFactory.prototype.updateQuoteField = function (options) {
        return new UpdateQuoteFields(options);
    };
    ActionFactory.prototype.addFeeTo = function (project, fee) {
        return new AddFeeTo(project, fee);
    };
    ActionFactory.prototype.removeFee = function (fee) {
        return new RemoveFee(fee);
    };
    ActionFactory.prototype.bulkImport = function (rawAssets, projectId) {
        return new BulkImport(rawAssets, projectId);
    };
    ActionFactory.prototype.editLineItem = function (lineItem, fieldToEdit) {
        return new EditLineItem(lineItem, fieldToEdit);
    };
    ActionFactory.prototype.addAssetToProjectInQuote = function (paramaters) {
        return new AddAssetToProjectInQuote(paramaters);
    };
    ActionFactory.prototype.addProject = function () {
        return new AddProject();
    };
    ActionFactory.prototype.removeProject = function (projectId) {
        return new RemoveProject(projectId);
    };
    ActionFactory.prototype.updateProject = function (project) {
        return new UpdateProject(project);
    };
    ActionFactory.prototype.moveLineItem = function (project, lineItem) {
        return new MoveLineItem(project, lineItem);
    };
    ActionFactory.prototype.cloneLineItem = function (lineItem) {
        return new CloneLineItem(lineItem);
    };
    ActionFactory.prototype.editLineItemMarkers = function (lineItem, newMarkers) {
        return new EditLineItemMarkers(lineItem, newMarkers);
    };
    ActionFactory.prototype.updateProjectPriceAttributes = function (priceAttributes, project) {
        return new UpdateProjectPriceAttributes(priceAttributes, project);
    };
    ActionFactory.prototype.addUserToQuote = function (user) {
        return new AddUserToQuote(user);
    };
    ActionFactory.prototype.addBillingAccountToQuote = function (account) {
        return new AddBillingAccountToQuote(account);
    };
    ActionFactory.prototype.addInvoiceContactToQuote = function (userId) {
        return new AddInvoiceContactToQuote(userId);
    };
    ActionFactory.prototype.initializeSalesManagerFormOnQuote = function (emailAddress, defaultDate) {
        return new InitializeSalesManagerFormOnQuote(emailAddress, defaultDate);
    };
    ActionFactory.prototype.updateSalesManagerFormOnQuote = function (form) {
        return new UpdateSalesManagerFormOnQuote(form);
    };
    ActionFactory.prototype.updateBillingAccount = function (form) {
        return new UpdateBillingAccount(form);
    };
    ActionFactory.prototype.addNote = function (note, lineItem) {
        return new AddNote(note, lineItem);
    };
    ActionFactory.prototype.removeNoteFrom = function (lineItem) {
        return new RemoveNote(lineItem);
    };
    ActionFactory.prototype.overrideInvoiceContact = function (contact) {
        return new OverrideInvoiceContact(contact);
    };
    return ActionFactory;
}());
exports.ActionFactory = ActionFactory;
var InternalActionFactory = (function (_super) {
    __extends(InternalActionFactory, _super);
    function InternalActionFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InternalActionFactory.prototype.loadSuccess = function (quote) {
        return new LoadSuccess(quote);
    };
    InternalActionFactory.prototype.loadFailure = function (error) {
        return new LoadFailure(error);
    };
    InternalActionFactory.prototype.deleteSuccess = function (quote) {
        return new DeleteSuccess(quote);
    };
    InternalActionFactory.prototype.deleteFailure = function (error) {
        return new DeleteFailure(error);
    };
    InternalActionFactory.prototype.editLineItemFromDetailsSuccess = function (quote) {
        return new EditLineItemFromDetailsSuccess(quote);
    };
    InternalActionFactory.prototype.editLineItemFromDetailsFailure = function (error) {
        return new EditLineItemFromDetailsFailure(error);
    };
    InternalActionFactory.prototype.removeAssetSuccess = function (quote) {
        return new RemoveAssetSuccess(quote);
    };
    InternalActionFactory.prototype.removeAssetFailure = function (error) {
        return new RemoveAssetFailure(error);
    };
    InternalActionFactory.prototype.addCustomPriceToLineItemSuccess = function (quote) {
        return new AddCustomPriceToLineItemSuccess(quote);
    };
    InternalActionFactory.prototype.addCustomPriceToLineItemFailure = function (error) {
        return new AddCustomPriceToLineItemFailure(error);
    };
    InternalActionFactory.prototype.sendQuoteSuccess = function (quoteId, ownerEmail) {
        return new SendQuoteSuccess(quoteId, ownerEmail);
    };
    InternalActionFactory.prototype.cloneQuoteSuccess = function (quote) {
        return new CloneQuoteSuccess(quote);
    };
    InternalActionFactory.prototype.bulkImportSuccess = function (quote, rawAssets) {
        return new BulkImportSuccess(quote, rawAssets);
    };
    InternalActionFactory.prototype.addAssetToProjectInQuoteSuccess = function (quote, assetId) {
        return new AddAssetToProjectInQuoteSuccess(quote, assetId);
    };
    InternalActionFactory.prototype.refreshAndNotify = function (quote, translationString) {
        return new RefreshAndNotify(quote, translationString);
    };
    return InternalActionFactory;
}(ActionFactory));
exports.InternalActionFactory = InternalActionFactory;
var Load = (function () {
    function Load() {
        this.type = Load.Type;
    }
    Load.Type = '[Quote Edit] Load';
    return Load;
}());
exports.Load = Load;
var LoadSuccess = (function () {
    function LoadSuccess(quote) {
        this.quote = quote;
        this.type = LoadSuccess.Type;
    }
    LoadSuccess.Type = '[Quote Edit] Load Success';
    return LoadSuccess;
}());
exports.LoadSuccess = LoadSuccess;
var LoadFailure = (function () {
    function LoadFailure(error) {
        this.error = error;
        this.type = LoadFailure.Type;
    }
    LoadFailure.Type = '[Quote Edit] Load Failure';
    return LoadFailure;
}());
exports.LoadFailure = LoadFailure;
var Delete = (function () {
    function Delete() {
        this.type = Delete.Type;
    }
    Delete.Type = '[Quote Edit] Delete';
    return Delete;
}());
exports.Delete = Delete;
var DeleteSuccess = (function () {
    function DeleteSuccess(quote) {
        this.quote = quote;
        this.type = DeleteSuccess.Type;
    }
    DeleteSuccess.Type = '[Quote Edit] Delete Success';
    return DeleteSuccess;
}());
exports.DeleteSuccess = DeleteSuccess;
var DeleteFailure = (function () {
    function DeleteFailure(error) {
        this.error = error;
        this.type = DeleteFailure.Type;
    }
    DeleteFailure.Type = '[Quote Edit] Delete Failure';
    return DeleteFailure;
}());
exports.DeleteFailure = DeleteFailure;
var EditLineItemFromDetails = (function () {
    function EditLineItemFromDetails(uuid, markers, attributes) {
        this.uuid = uuid;
        this.markers = markers;
        this.attributes = attributes;
        this.type = EditLineItemFromDetails.Type;
    }
    EditLineItemFromDetails.Type = '[Quote Edit] Edit Line Item From Details';
    return EditLineItemFromDetails;
}());
exports.EditLineItemFromDetails = EditLineItemFromDetails;
var EditLineItemFromDetailsSuccess = (function () {
    function EditLineItemFromDetailsSuccess(quote) {
        this.quote = quote;
        this.type = EditLineItemFromDetailsSuccess.Type;
    }
    EditLineItemFromDetailsSuccess.Type = '[Quote Edit] Edit Line Item From Details Success';
    return EditLineItemFromDetailsSuccess;
}());
exports.EditLineItemFromDetailsSuccess = EditLineItemFromDetailsSuccess;
var EditLineItemFromDetailsFailure = (function () {
    function EditLineItemFromDetailsFailure(error) {
        this.error = error;
        this.type = EditLineItemFromDetailsFailure.Type;
    }
    EditLineItemFromDetailsFailure.Type = '[Quote Edit] Edit Line Item From Details Failure';
    return EditLineItemFromDetailsFailure;
}());
exports.EditLineItemFromDetailsFailure = EditLineItemFromDetailsFailure;
var RemoveAsset = (function () {
    function RemoveAsset(asset) {
        this.asset = asset;
        this.type = RemoveAsset.Type;
    }
    RemoveAsset.Type = '[Quote Edit] Remove Asset';
    return RemoveAsset;
}());
exports.RemoveAsset = RemoveAsset;
var RemoveAssetSuccess = (function () {
    function RemoveAssetSuccess(quote) {
        this.quote = quote;
        this.type = RemoveAssetSuccess.Type;
    }
    RemoveAssetSuccess.Type = '[Quote Edit] Remove Asset Success';
    return RemoveAssetSuccess;
}());
exports.RemoveAssetSuccess = RemoveAssetSuccess;
var RemoveAssetFailure = (function () {
    function RemoveAssetFailure(error) {
        this.error = error;
        this.type = RemoveAssetFailure.Type;
    }
    RemoveAssetFailure.Type = '[Quote Edit] Remove Asset Failure';
    return RemoveAssetFailure;
}());
exports.RemoveAssetFailure = RemoveAssetFailure;
var AddCustomPriceToLineItem = (function () {
    function AddCustomPriceToLineItem(lineItem, price, override) {
        this.lineItem = lineItem;
        this.price = price;
        this.override = override;
        this.type = AddCustomPriceToLineItem.Type;
    }
    AddCustomPriceToLineItem.Type = '[Quote Edit] Add Custom Price To LineItem';
    return AddCustomPriceToLineItem;
}());
exports.AddCustomPriceToLineItem = AddCustomPriceToLineItem;
var AddCustomPriceToLineItemSuccess = (function () {
    function AddCustomPriceToLineItemSuccess(quote) {
        this.quote = quote;
        this.type = AddCustomPriceToLineItemSuccess.Type;
    }
    AddCustomPriceToLineItemSuccess.Type = '[Quote Edit] Add Custom Price To LineItem Success';
    return AddCustomPriceToLineItemSuccess;
}());
exports.AddCustomPriceToLineItemSuccess = AddCustomPriceToLineItemSuccess;
var AddCustomPriceToLineItemFailure = (function () {
    function AddCustomPriceToLineItemFailure(error) {
        this.error = error;
        this.type = AddCustomPriceToLineItemFailure.Type;
    }
    AddCustomPriceToLineItemFailure.Type = '[Quote Edit] Add Custom Price To LineItem Failure';
    return AddCustomPriceToLineItemFailure;
}());
exports.AddCustomPriceToLineItemFailure = AddCustomPriceToLineItemFailure;
var SendQuote = (function () {
    function SendQuote() {
        this.type = SendQuote.Type;
    }
    SendQuote.Type = '[Quote Edit] Send Quote';
    return SendQuote;
}());
exports.SendQuote = SendQuote;
var SaveRecipientInformationOnQuote = (function () {
    function SaveRecipientInformationOnQuote(quoteOptions) {
        this.quoteOptions = quoteOptions;
        this.type = SaveRecipientInformationOnQuote.Type;
    }
    SaveRecipientInformationOnQuote.Type = '[Quote Edit] Save Recipient Information On Quote';
    return SaveRecipientInformationOnQuote;
}());
exports.SaveRecipientInformationOnQuote = SaveRecipientInformationOnQuote;
var SendQuoteSuccess = (function () {
    function SendQuoteSuccess(quoteId, ownerEmail) {
        this.quoteId = quoteId;
        this.ownerEmail = ownerEmail;
        this.type = SendQuoteSuccess.Type;
    }
    SendQuoteSuccess.Type = '[Quote Edit] Send Quote Success';
    return SendQuoteSuccess;
}());
exports.SendQuoteSuccess = SendQuoteSuccess;
var CloneQuote = (function () {
    function CloneQuote(quote) {
        this.quote = quote;
        this.type = CloneQuote.Type;
    }
    CloneQuote.Type = '[Quote Edit] Clone Quote';
    return CloneQuote;
}());
exports.CloneQuote = CloneQuote;
var CloneQuoteSuccess = (function () {
    function CloneQuoteSuccess(quote) {
        this.quote = quote;
        this.type = CloneQuoteSuccess.Type;
    }
    CloneQuoteSuccess.Type = '[Quote Edit] Clone Quote Success';
    return CloneQuoteSuccess;
}());
exports.CloneQuoteSuccess = CloneQuoteSuccess;
var CreateQuote = (function () {
    function CreateQuote() {
        this.type = CreateQuote.Type;
    }
    CreateQuote.Type = '[Quote Edit] Create Quote';
    return CreateQuote;
}());
exports.CreateQuote = CreateQuote;
var UpdateQuoteFields = (function () {
    function UpdateQuoteFields(options) {
        this.options = options;
        this.type = UpdateQuoteFields.Type;
    }
    UpdateQuoteFields.Type = '[Quote Edit] Update Quote Fields';
    return UpdateQuoteFields;
}());
exports.UpdateQuoteFields = UpdateQuoteFields;
var AddFeeTo = (function () {
    function AddFeeTo(project, fee) {
        this.project = project;
        this.fee = fee;
        this.type = AddFeeTo.Type;
    }
    AddFeeTo.Type = '[Quote Edit] Add Fee To';
    return AddFeeTo;
}());
exports.AddFeeTo = AddFeeTo;
var RemoveFee = (function () {
    function RemoveFee(fee) {
        this.fee = fee;
        this.type = RemoveFee.Type;
    }
    RemoveFee.Type = '[Quote Edit] Remove Fee';
    return RemoveFee;
}());
exports.RemoveFee = RemoveFee;
var BulkImport = (function () {
    function BulkImport(rawAssets, projectId) {
        this.rawAssets = rawAssets;
        this.projectId = projectId;
        this.type = BulkImport.Type;
    }
    BulkImport.Type = '[Quote Edit] Bulk Import';
    return BulkImport;
}());
exports.BulkImport = BulkImport;
var BulkImportSuccess = (function () {
    function BulkImportSuccess(quote, rawAssets) {
        this.quote = quote;
        this.rawAssets = rawAssets;
        this.type = BulkImportSuccess.Type;
    }
    BulkImportSuccess.Type = '[Quote Edit] Bulk Import Success';
    return BulkImportSuccess;
}());
exports.BulkImportSuccess = BulkImportSuccess;
var EditLineItem = (function () {
    function EditLineItem(lineItem, fieldToEdit) {
        this.lineItem = lineItem;
        this.fieldToEdit = fieldToEdit;
        this.type = EditLineItem.Type;
    }
    EditLineItem.Type = '[Quote Edit] Edit Line Item';
    return EditLineItem;
}());
exports.EditLineItem = EditLineItem;
var AddAssetToProjectInQuote = (function () {
    function AddAssetToProjectInQuote(parameters) {
        this.parameters = parameters;
        this.type = AddAssetToProjectInQuote.Type;
    }
    AddAssetToProjectInQuote.Type = '[Quote Edit] Add Asset To Project In Quote';
    return AddAssetToProjectInQuote;
}());
exports.AddAssetToProjectInQuote = AddAssetToProjectInQuote;
var AddAssetToProjectInQuoteSuccess = (function () {
    function AddAssetToProjectInQuoteSuccess(quote, assetId) {
        this.quote = quote;
        this.assetId = assetId;
        this.type = AddAssetToProjectInQuoteSuccess.Type;
    }
    AddAssetToProjectInQuoteSuccess.Type = '[Quote Edit] Add Asset To Project In Quote Success';
    return AddAssetToProjectInQuoteSuccess;
}());
exports.AddAssetToProjectInQuoteSuccess = AddAssetToProjectInQuoteSuccess;
var AddProject = (function () {
    function AddProject() {
        this.type = AddProject.Type;
    }
    AddProject.Type = '[Quote Edit] Add Project';
    return AddProject;
}());
exports.AddProject = AddProject;
var RemoveProject = (function () {
    function RemoveProject(projectId) {
        this.projectId = projectId;
        this.type = RemoveProject.Type;
    }
    RemoveProject.Type = '[Quote Edit] Remove Project';
    return RemoveProject;
}());
exports.RemoveProject = RemoveProject;
var UpdateProject = (function () {
    function UpdateProject(project) {
        this.project = project;
        this.type = UpdateProject.Type;
    }
    UpdateProject.Type = '[Quote Edit] Update Project';
    return UpdateProject;
}());
exports.UpdateProject = UpdateProject;
var MoveLineItem = (function () {
    function MoveLineItem(project, lineItem) {
        this.project = project;
        this.lineItem = lineItem;
        this.type = MoveLineItem.Type;
    }
    MoveLineItem.Type = '[Quote Edit] Move Line Item';
    return MoveLineItem;
}());
exports.MoveLineItem = MoveLineItem;
var CloneLineItem = (function () {
    function CloneLineItem(lineItem) {
        this.lineItem = lineItem;
        this.type = CloneLineItem.Type;
    }
    CloneLineItem.Type = '[Quote Edit] Clone Line Item';
    return CloneLineItem;
}());
exports.CloneLineItem = CloneLineItem;
var RefreshAndNotify = (function () {
    function RefreshAndNotify(quote, translationString) {
        this.quote = quote;
        this.translationString = translationString;
        this.type = RefreshAndNotify.Type;
    }
    RefreshAndNotify.Type = '[Quote Edit] Refresh And Notify';
    return RefreshAndNotify;
}());
exports.RefreshAndNotify = RefreshAndNotify;
var EditLineItemMarkers = (function () {
    function EditLineItemMarkers(lineItem, newMarkers) {
        this.lineItem = lineItem;
        this.newMarkers = newMarkers;
        this.type = EditLineItemMarkers.Type;
    }
    EditLineItemMarkers.Type = '[Quote Edit] Edit Line Item Markers';
    return EditLineItemMarkers;
}());
exports.EditLineItemMarkers = EditLineItemMarkers;
var UpdateProjectPriceAttributes = (function () {
    function UpdateProjectPriceAttributes(priceAttributes, project) {
        this.priceAttributes = priceAttributes;
        this.project = project;
        this.type = UpdateProjectPriceAttributes.Type;
    }
    UpdateProjectPriceAttributes.Type = '[Quote Edit] Update Project Price Attributes';
    return UpdateProjectPriceAttributes;
}());
exports.UpdateProjectPriceAttributes = UpdateProjectPriceAttributes;
var AddUserToQuote = (function () {
    function AddUserToQuote(user) {
        this.user = user;
        this.type = AddUserToQuote.Type;
    }
    AddUserToQuote.Type = '[Quote Edit] Add User To Quote';
    return AddUserToQuote;
}());
exports.AddUserToQuote = AddUserToQuote;
var AddBillingAccountToQuote = (function () {
    function AddBillingAccountToQuote(account) {
        this.account = account;
        this.type = AddBillingAccountToQuote.Type;
    }
    AddBillingAccountToQuote.Type = '[Quote Edit] Add Billing Account To Quote';
    return AddBillingAccountToQuote;
}());
exports.AddBillingAccountToQuote = AddBillingAccountToQuote;
var AddInvoiceContactToQuote = (function () {
    function AddInvoiceContactToQuote(userId) {
        this.userId = userId;
        this.type = AddInvoiceContactToQuote.Type;
    }
    AddInvoiceContactToQuote.Type = '[Quote Edit] Add Invoice Contact To Quote';
    return AddInvoiceContactToQuote;
}());
exports.AddInvoiceContactToQuote = AddInvoiceContactToQuote;
var InitializeSalesManagerFormOnQuote = (function () {
    function InitializeSalesManagerFormOnQuote(emailAddress, defaultDate) {
        this.emailAddress = emailAddress;
        this.defaultDate = defaultDate;
        this.type = InitializeSalesManagerFormOnQuote.Type;
    }
    InitializeSalesManagerFormOnQuote.Type = '[Quote Edit] Initialize Sales Manager Form On Quote';
    return InitializeSalesManagerFormOnQuote;
}());
exports.InitializeSalesManagerFormOnQuote = InitializeSalesManagerFormOnQuote;
var UpdateSalesManagerFormOnQuote = (function () {
    function UpdateSalesManagerFormOnQuote(form) {
        this.form = form;
        this.type = UpdateSalesManagerFormOnQuote.Type;
    }
    UpdateSalesManagerFormOnQuote.Type = '[Quote Edit] Add Sales Manager Form On Quote';
    return UpdateSalesManagerFormOnQuote;
}());
exports.UpdateSalesManagerFormOnQuote = UpdateSalesManagerFormOnQuote;
var UpdateBillingAccount = (function () {
    function UpdateBillingAccount(form) {
        this.form = form;
        this.type = UpdateBillingAccount.Type;
    }
    UpdateBillingAccount.Type = '[Quote Edit] Update Billing Account';
    return UpdateBillingAccount;
}());
exports.UpdateBillingAccount = UpdateBillingAccount;
var AddNote = (function () {
    function AddNote(note, lineItem) {
        this.note = note;
        this.lineItem = lineItem;
        this.type = AddNote.Type;
    }
    AddNote.Type = '[Quote Edit] Add Note';
    return AddNote;
}());
exports.AddNote = AddNote;
var RemoveNote = (function () {
    function RemoveNote(lineItem) {
        this.lineItem = lineItem;
        this.type = RemoveNote.Type;
    }
    RemoveNote.Type = '[Quote Edit] Remove Note';
    return RemoveNote;
}());
exports.RemoveNote = RemoveNote;
var OverrideInvoiceContact = (function () {
    function OverrideInvoiceContact(contact) {
        this.contact = contact;
        this.type = OverrideInvoiceContact.Type;
    }
    OverrideInvoiceContact.Type = '[Quote Edit] Override Invoice Contact';
    return OverrideInvoiceContact;
}());
exports.OverrideInvoiceContact = OverrideInvoiceContact;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9xdW90ZS1lZGl0L3F1b3RlLWVkaXQuYWN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFnQkE7SUFBQTtJQWdJQSxDQUFDO0lBL0hRLDRCQUFJLEdBQVg7UUFDRSxNQUFNLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRU0sOEJBQU0sR0FBYjtRQUNFLE1BQU0sQ0FBQyxJQUFJLE1BQU0sRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFTSwrQ0FBdUIsR0FBOUIsVUFDRSxJQUFZLEVBQ1osT0FBdUIsRUFDdkIsVUFBb0M7UUFFcEMsTUFBTSxDQUFDLElBQUksdUJBQXVCLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRU0sbUNBQVcsR0FBbEIsVUFBbUIsS0FBWTtRQUM3QixNQUFNLENBQUMsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVNLGdEQUF3QixHQUEvQixVQUFnQyxRQUF1QixFQUFFLEtBQWEsRUFBRSxRQUFpQjtRQUN2RixNQUFNLENBQUMsSUFBSSx3QkFBd0IsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFFTSxpQ0FBUyxHQUFoQjtRQUNFLE1BQU0sQ0FBQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFTSx1REFBK0IsR0FBdEMsVUFBdUMsWUFBMEI7UUFDL0QsTUFBTSxDQUFDLElBQUksK0JBQStCLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVNLGtDQUFVLEdBQWpCLFVBQWtCLEtBQVk7UUFDNUIsTUFBTSxDQUFDLElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFTSxtQ0FBVyxHQUFsQjtRQUNFLE1BQU0sQ0FBQyxJQUFJLFdBQVcsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFF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QztJQUNoQixDQUFDO0lBRnBCLGtDQUFJLEdBQUcsOENBQThDLENBQUM7SUFHL0Usb0NBQUM7Q0FKRCxBQUlDLElBQUE7QUFKWSxzRUFBNkI7QUFNMUM7SUFHRSw4QkFBNEIsSUFBVTtRQUFWLFNBQUksR0FBSixJQUFJLENBQU07UUFEdEIsU0FBSSxHQUFHLG9CQUFvQixDQUFDLElBQUksQ0FBQztJQUNQLENBQUM7SUFGcEIseUJBQUksR0FBRyxxQ0FBcUMsQ0FBQztJQUd0RSwyQkFBQztDQUpELEFBSUMsSUFBQTtBQUpZLG9EQUFvQjtBQU1qQztJQUdFLGlCQUE0QixJQUFZLEVBQWtCLFFBQXVCO1FBQXJELFNBQUksR0FBSixJQUFJLENBQVE7UUFBa0IsYUFBUSxHQUFSLFFBQVEsQ0FBZTtRQURqRSxTQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztJQUNpRCxDQUFDO0lBRi9ELFlBQUksR0FBRyx1QkFBdUIsQ0FBQztJQUd4RCxjQUFDO0NBSkQsQUFJQyxJQUFBO0FBSlksMEJBQU87QUFNcEI7SUFHRSxvQkFBNEIsUUFBdUI7UUFBdkIsYUFBUSxHQUFSLFFBQVEsQ0FBZTtRQURuQyxTQUFJLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQztJQUNnQixDQUFDO0lBRmpDLGVBQUksR0FBRywwQkFBMEIsQ0FBQztJQUczRCxpQkFBQztDQUpELEFBSUMsSUFBQTtBQUpZLGdDQUFVO0FBTXZCO0lBR0UsZ0NBQTRCLE9BQWtDO1FBQWxDLFlBQU8sR0FBUCxPQUFPLENBQTJCO1FBRDlDLFNBQUksR0FBRyxzQkFBc0IsQ0FBQyxJQUFJLENBQUM7SUFDZSxDQUFDO0lBRjVDLDJCQUFJLEdBQUcsdUNBQXVDLENBQUM7SUFHeEUsNkJBQUM7Q0FKRCxBQUlDLElBQUE7QUFKWSx3REFBc0IiLCJmaWxlIjoiYXBwL3N0b3JlL3F1b3RlLWVkaXQvcXVvdGUtZWRpdC5hY3Rpb25zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWRkQXNzZXRQYXJhbWV0ZXJzLFxuICBBc3NldExpbmVJdGVtLFxuICBGZWVMaW5lSXRlbSxcbiAgUHJvamVjdCxcbiAgUXVvdGUsXG4gIFF1b3RlT3B0aW9ucyxcbiAgU2VuZERldGFpbHMsXG4gIFNlbmREZXRhaWxzSW52b2ljZUNvbnRhY3Rcbn0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvY29tbWVyY2UuaW50ZXJmYWNlJztcbmltcG9ydCB7IEFzc2V0LCBTZWxlY3RlZFByaWNlQXR0cmlidXRlLCBQb2pvIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvY29tbW9uLmludGVyZmFjZSc7XG5pbXBvcnQgeyBBY2NvdW50IH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvYWNjb3VudC5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQXBpRXJyb3JSZXNwb25zZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2FwaS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgU3ViY2xpcE1hcmtlcnMgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9zdWJjbGlwLW1hcmtlcnMnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL3VzZXIuaW50ZXJmYWNlJztcbmltcG9ydCB7IEFjdGlvbiB9IGZyb20gJ0BuZ3J4L3N0b3JlJztcbmV4cG9ydCBjbGFzcyBBY3Rpb25GYWN0b3J5IHtcbiAgcHVibGljIGxvYWQoKTogTG9hZCB7XG4gICAgcmV0dXJuIG5ldyBMb2FkKCk7XG4gIH1cblxuICBwdWJsaWMgZGVsZXRlKCk6IERlbGV0ZSB7XG4gICAgcmV0dXJuIG5ldyBEZWxldGUoKTtcbiAgfVxuXG4gIHB1YmxpYyBlZGl0TGluZUl0ZW1Gcm9tRGV0YWlscyhcbiAgICB1dWlkOiBzdHJpbmcsXG4gICAgbWFya2VyczogU3ViY2xpcE1hcmtlcnMsXG4gICAgYXR0cmlidXRlczogU2VsZWN0ZWRQcmljZUF0dHJpYnV0ZVtdXG4gICk6IEVkaXRMaW5lSXRlbUZyb21EZXRhaWxzIHtcbiAgICByZXR1cm4gbmV3IEVkaXRMaW5lSXRlbUZyb21EZXRhaWxzKHV1aWQsIG1hcmtlcnMsIGF0dHJpYnV0ZXMpO1xuICB9XG5cbiAgcHVibGljIHJlbW92ZUFzc2V0KGFzc2V0OiBBc3NldCk6IFJlbW92ZUFzc2V0IHtcbiAgICByZXR1cm4gbmV3IFJlbW92ZUFzc2V0KGFzc2V0KTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRDdXN0b21QcmljZVRvTGluZUl0ZW0obGluZUl0ZW06IEFzc2V0TGluZUl0ZW0sIHByaWNlOiBudW1iZXIsIG92ZXJyaWRlOiBib29sZWFuKTogQWRkQ3VzdG9tUHJpY2VUb0xpbmVJdGVtIHtcbiAgICByZXR1cm4gbmV3IEFkZEN1c3RvbVByaWNlVG9MaW5lSXRlbShsaW5lSXRlbSwgcHJpY2UsIG92ZXJyaWRlKTtcbiAgfVxuXG4gIHB1YmxpYyBzZW5kUXVvdGUoKTogU2VuZFF1b3RlIHtcbiAgICByZXR1cm4gbmV3IFNlbmRRdW90ZSgpO1xuICB9XG5cbiAgcHVibGljIHNhdmVSZWNpcGllbnRJbmZvcm1hdGlvbk9uUXVvdGUocXVvdGVPcHRpb25zOiBRdW90ZU9wdGlvbnMpOiBTYXZlUmVjaXBpZW50SW5mb3JtYXRpb25PblF1b3RlIHtcbiAgICByZXR1cm4gbmV3IFNhdmVSZWNpcGllbnRJbmZvcm1hdGlvbk9uUXVvdGUocXVvdGVPcHRpb25zKTtcbiAgfVxuXG4gIHB1YmxpYyBjbG9uZVF1b3RlKHF1b3RlOiBRdW90ZSk6IENsb25lUXVvdGUge1xuICAgIHJldHVybiBuZXcgQ2xvbmVRdW90ZShxdW90ZSk7XG4gIH1cblxuICBwdWJsaWMgY3JlYXRlUXVvdGUoKTogQ3JlYXRlUXVvdGUge1xuICAgIHJldHVybiBuZXcgQ3JlYXRlUXVvdGUoKTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGVRdW90ZUZpZWxkKG9wdGlvbnM6IFBvam8pOiBVcGRhdGVRdW90ZUZpZWxkcyB7XG4gICAgcmV0dXJuIG5ldyBVcGRhdGVRdW90ZUZpZWxkcyhvcHRpb25zKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRGZWVUbyhwcm9qZWN0OiBQcm9qZWN0LCBmZWU6IEZlZUxpbmVJdGVtKTogQWRkRmVlVG8ge1xuICAgIHJldHVybiBuZXcgQWRkRmVlVG8ocHJvamVjdCwgZmVlKTtcbiAgfVxuXG4gIHB1YmxpYyByZW1vdmVGZWUoZmVlOiBGZWVMaW5lSXRlbSk6IFJlbW92ZUZlZSB7XG4gICAgcmV0dXJuIG5ldyBSZW1vdmVGZWUoZmVlKTtcbiAgfVxuXG4gIHB1YmxpYyBidWxrSW1wb3J0KHJhd0Fzc2V0czogeyBsaW5lSXRlbUF0dHJpYnV0ZXM6IHN0cmluZyB9LCBwcm9qZWN0SWQ6IHN0cmluZyk6IEJ1bGtJbXBvcnQge1xuICAgIHJldHVybiBuZXcgQnVsa0ltcG9ydChyYXdBc3NldHMsIHByb2plY3RJZCk7XG4gIH1cblxuICBwdWJsaWMgZWRpdExpbmVJdGVtKGxpbmVJdGVtOiBBc3NldExpbmVJdGVtLCBmaWVsZFRvRWRpdDogYW55KTogRWRpdExpbmVJdGVtIHtcbiAgICByZXR1cm4gbmV3IEVkaXRMaW5lSXRlbShsaW5lSXRlbSwgZmllbGRUb0VkaXQpO1xuICB9XG5cbiAgcHVibGljIGFkZEFzc2V0VG9Qcm9qZWN0SW5RdW90ZShwYXJhbWF0ZXJzOiBBZGRBc3NldFBhcmFtZXRlcnMpOiBBZGRBc3NldFRvUHJvamVjdEluUXVvdGUge1xuICAgIHJldHVybiBuZXcgQWRkQXNzZXRUb1Byb2plY3RJblF1b3RlKHBhcmFtYXRlcnMpO1xuICB9XG5cbiAgcHVibGljIGFkZFByb2plY3QoKTogQWRkUHJvamVjdCB7XG4gICAgcmV0dXJuIG5ldyBBZGRQcm9qZWN0KCk7XG4gIH1cblxuICBwdWJsaWMgcmVtb3ZlUHJvamVjdChwcm9qZWN0SWQ6IG51bWJlcik6IFJlbW92ZVByb2plY3Qge1xuICAgIHJldHVybiBuZXcgUmVtb3ZlUHJvamVjdChwcm9qZWN0SWQpO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZVByb2plY3QocHJvamVjdDogUHJvamVjdCk6IFVwZGF0ZVByb2plY3Qge1xuICAgIHJldHVybiBuZXcgVXBkYXRlUHJvamVjdChwcm9qZWN0KTtcbiAgfVxuXG4gIHB1YmxpYyBtb3ZlTGluZUl0ZW0ocHJvamVjdDogUHJvamVjdCwgbGluZUl0ZW06IEFzc2V0TGluZUl0ZW0pOiBNb3ZlTGluZUl0ZW0ge1xuICAgIHJldHVybiBuZXcgTW92ZUxpbmVJdGVtKHByb2plY3QsIGxpbmVJdGVtKTtcbiAgfVxuXG4gIHB1YmxpYyBjbG9uZUxpbmVJdGVtKGxpbmVJdGVtOiBBc3NldExpbmVJdGVtKTogQ2xvbmVMaW5lSXRlbSB7XG4gICAgcmV0dXJuIG5ldyBDbG9uZUxpbmVJdGVtKGxpbmVJdGVtKTtcbiAgfVxuXG4gIHB1YmxpYyBlZGl0TGluZUl0ZW1NYXJrZXJzKGxpbmVJdGVtOiBBc3NldExpbmVJdGVtLCBuZXdNYXJrZXJzOiBTdWJjbGlwTWFya2Vycykge1xuICAgIHJldHVybiBuZXcgRWRpdExpbmVJdGVtTWFya2VycyhsaW5lSXRlbSwgbmV3TWFya2Vycyk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlUHJvamVjdFByaWNlQXR0cmlidXRlcyhwcmljZUF0dHJpYnV0ZXM6IFNlbGVjdGVkUHJpY2VBdHRyaWJ1dGVbXSwgcHJvamVjdDogUHJvamVjdCk6IFVwZGF0ZVByb2plY3RQcmljZUF0dHJpYnV0ZXMge1xuICAgIHJldHVybiBuZXcgVXBkYXRlUHJvamVjdFByaWNlQXR0cmlidXRlcyhwcmljZUF0dHJpYnV0ZXMsIHByb2plY3QpO1xuICB9XG5cbiAgcHVibGljIGFkZFVzZXJUb1F1b3RlKHVzZXI6IFVzZXIpOiBBZGRVc2VyVG9RdW90ZSB7XG4gICAgcmV0dXJuIG5ldyBBZGRVc2VyVG9RdW90ZSh1c2VyKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRCaWxsaW5nQWNjb3VudFRvUXVvdGUoYWNjb3VudDogQWNjb3VudCk6IEFkZEJpbGxpbmdBY2NvdW50VG9RdW90ZSB7XG4gICAgcmV0dXJuIG5ldyBBZGRCaWxsaW5nQWNjb3VudFRvUXVvdGUoYWNjb3VudCk7XG4gIH1cblxuICBwdWJsaWMgYWRkSW52b2ljZUNvbnRhY3RUb1F1b3RlKHVzZXJJZDogbnVtYmVyKTogQWRkSW52b2ljZUNvbnRhY3RUb1F1b3RlIHtcbiAgICByZXR1cm4gbmV3IEFkZEludm9pY2VDb250YWN0VG9RdW90ZSh1c2VySWQpO1xuICB9XG5cbiAgcHVibGljIGluaXRpYWxpemVTYWxlc01hbmFnZXJGb3JtT25RdW90ZShlbWFpbEFkZHJlc3M6IHN0cmluZywgZGVmYXVsdERhdGU6IHN0cmluZyk6IEluaXRpYWxpemVTYWxlc01hbmFnZXJGb3JtT25RdW90ZSB7XG4gICAgcmV0dXJuIG5ldyBJbml0aWFsaXplU2FsZXNNYW5hZ2VyRm9ybU9uUXVvdGUoZW1haWxBZGRyZXNzLCBkZWZhdWx0RGF0ZSk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlU2FsZXNNYW5hZ2VyRm9ybU9uUXVvdGUoZm9ybTogUG9qbyk6IFVwZGF0ZVNhbGVzTWFuYWdlckZvcm1PblF1b3RlIHtcbiAgICByZXR1cm4gbmV3IFVwZGF0ZVNhbGVzTWFuYWdlckZvcm1PblF1b3RlKGZvcm0pO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZUJpbGxpbmdBY2NvdW50KGZvcm06IFBvam8pOiBVcGRhdGVCaWxsaW5nQWNjb3VudCB7XG4gICAgcmV0dXJuIG5ldyBVcGRhdGVCaWxsaW5nQWNjb3VudChmb3JtKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGROb3RlKG5vdGU6IHN0cmluZywgbGluZUl0ZW06IEFzc2V0TGluZUl0ZW0pOiBBZGROb3RlIHtcbiAgICByZXR1cm4gbmV3IEFkZE5vdGUobm90ZSwgbGluZUl0ZW0pO1xuICB9XG5cbiAgcHVibGljIHJlbW92ZU5vdGVGcm9tKGxpbmVJdGVtOiBBc3NldExpbmVJdGVtKTogUmVtb3ZlTm90ZSB7XG4gICAgcmV0dXJuIG5ldyBSZW1vdmVOb3RlKGxpbmVJdGVtKTtcbiAgfVxuXG4gIHB1YmxpYyBvdmVycmlkZUludm9pY2VDb250YWN0KGNvbnRhY3Q6IFNlbmREZXRhaWxzSW52b2ljZUNvbnRhY3QpOiBPdmVycmlkZUludm9pY2VDb250YWN0IHtcbiAgICByZXR1cm4gbmV3IE92ZXJyaWRlSW52b2ljZUNvbnRhY3QoY29udGFjdCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIEludGVybmFsQWN0aW9uRmFjdG9yeSBleHRlbmRzIEFjdGlvbkZhY3Rvcnkge1xuICBwdWJsaWMgbG9hZFN1Y2Nlc3MocXVvdGU6IFF1b3RlKTogTG9hZFN1Y2Nlc3Mge1xuICAgIHJldHVybiBuZXcgTG9hZFN1Y2Nlc3MocXVvdGUpO1xuICB9XG5cbiAgcHVibGljIGxvYWRGYWlsdXJlKGVycm9yOiBBcGlFcnJvclJlc3BvbnNlKTogTG9hZEZhaWx1cmUge1xuICAgIHJldHVybiBuZXcgTG9hZEZhaWx1cmUoZXJyb3IpO1xuICB9XG5cbiAgcHVibGljIGRlbGV0ZVN1Y2Nlc3MocXVvdGU6IFF1b3RlKTogRGVsZXRlU3VjY2VzcyB7XG4gICAgcmV0dXJuIG5ldyBEZWxldGVTdWNjZXNzKHF1b3RlKTtcbiAgfVxuXG4gIHB1YmxpYyBkZWxldGVGYWlsdXJlKGVycm9yOiBBcGlFcnJvclJlc3BvbnNlKTogRGVsZXRlRmFpbHVyZSB7XG4gICAgcmV0dXJuIG5ldyBEZWxldGVGYWlsdXJlKGVycm9yKTtcbiAgfVxuXG4gIHB1YmxpYyBlZGl0TGluZUl0ZW1Gcm9tRGV0YWlsc1N1Y2Nlc3MocXVvdGU6IFF1b3RlKTogRWRpdExpbmVJdGVtRnJvbURldGFpbHNTdWNjZXNzIHtcbiAgICByZXR1cm4gbmV3IEVkaXRMaW5lSXRlbUZyb21EZXRhaWxzU3VjY2VzcyhxdW90ZSk7XG4gIH1cblxuICBwdWJsaWMgZWRpdExpbmVJdGVtRnJvbURldGFpbHNGYWlsdXJlKGVycm9yOiBBcGlFcnJvclJlc3BvbnNlKTogRWRpdExpbmVJdGVtRnJvbURldGFpbHNGYWlsdXJlIHtcbiAgICByZXR1cm4gbmV3IEVkaXRMaW5lSXRlbUZyb21EZXRhaWxzRmFpbHVyZShlcnJvcik7XG4gIH1cblxuICBwdWJsaWMgcmVtb3ZlQXNzZXRTdWNjZXNzKHF1b3RlOiBRdW90ZSk6IFJlbW92ZUFzc2V0U3VjY2VzcyB7XG4gICAgcmV0dXJuIG5ldyBSZW1vdmVBc3NldFN1Y2Nlc3MocXVvdGUpO1xuICB9XG5cbiAgcHVibGljIHJlbW92ZUFzc2V0RmFpbHVyZShlcnJvcjogQXBpRXJyb3JSZXNwb25zZSk6IFJlbW92ZUFzc2V0RmFpbHVyZSB7XG4gICAgcmV0dXJuIG5ldyBSZW1vdmVBc3NldEZhaWx1cmUoZXJyb3IpO1xuICB9XG5cbiAgcHVibGljIGFkZEN1c3RvbVByaWNlVG9MaW5lSXRlbVN1Y2Nlc3MocXVvdGU6IFF1b3RlKTogQWRkQ3VzdG9tUHJpY2VUb0xpbmVJdGVtU3VjY2VzcyB7XG4gICAgcmV0dXJuIG5ldyBBZGRDdXN0b21QcmljZVRvTGluZUl0ZW1TdWNjZXNzKHF1b3RlKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRDdXN0b21QcmljZVRvTGluZUl0ZW1GYWlsdXJlKGVycm9yOiBBcGlFcnJvclJlc3BvbnNlKTogQWRkQ3VzdG9tUHJpY2VUb0xpbmVJdGVtRmFpbHVyZSB7XG4gICAgcmV0dXJuIG5ldyBBZGRDdXN0b21QcmljZVRvTGluZUl0ZW1GYWlsdXJlKGVycm9yKTtcbiAgfVxuXG4gIHB1YmxpYyBzZW5kUXVvdGVTdWNjZXNzKHF1b3RlSWQ6IG51bWJlciwgb3duZXJFbWFpbDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIG5ldyBTZW5kUXVvdGVTdWNjZXNzKHF1b3RlSWQsIG93bmVyRW1haWwpO1xuICB9XG5cbiAgcHVibGljIGNsb25lUXVvdGVTdWNjZXNzKHF1b3RlOiBRdW90ZSkge1xuICAgIHJldHVybiBuZXcgQ2xvbmVRdW90ZVN1Y2Nlc3MocXVvdGUpO1xuICB9XG5cbiAgcHVibGljIGJ1bGtJbXBvcnRTdWNjZXNzKHF1b3RlOiBRdW90ZSwgcmF3QXNzZXRzOiB7IGxpbmVJdGVtQXR0cmlidXRlczogc3RyaW5nIH0pOiBCdWxrSW1wb3J0U3VjY2VzcyB7XG4gICAgcmV0dXJuIG5ldyBCdWxrSW1wb3J0U3VjY2VzcyhxdW90ZSwgcmF3QXNzZXRzKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRBc3NldFRvUHJvamVjdEluUXVvdGVTdWNjZXNzKHF1b3RlOiBRdW90ZSwgYXNzZXRJZDogbnVtYmVyKTogQWRkQXNzZXRUb1Byb2plY3RJblF1b3RlU3VjY2VzcyB7XG4gICAgcmV0dXJuIG5ldyBBZGRBc3NldFRvUHJvamVjdEluUXVvdGVTdWNjZXNzKHF1b3RlLCBhc3NldElkKTtcbiAgfVxuXG4gIHB1YmxpYyByZWZyZXNoQW5kTm90aWZ5KHF1b3RlOiBRdW90ZSwgdHJhbnNsYXRpb25TdHJpbmc6IHN0cmluZyk6IFJlZnJlc2hBbmROb3RpZnkge1xuICAgIHJldHVybiBuZXcgUmVmcmVzaEFuZE5vdGlmeShxdW90ZSwgdHJhbnNsYXRpb25TdHJpbmcpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBMb2FkIGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBUeXBlID0gJ1tRdW90ZSBFZGl0XSBMb2FkJztcbiAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSBMb2FkLlR5cGU7XG59XG5cbmV4cG9ydCBjbGFzcyBMb2FkU3VjY2VzcyBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVHlwZSA9ICdbUXVvdGUgRWRpdF0gTG9hZCBTdWNjZXNzJztcbiAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSBMb2FkU3VjY2Vzcy5UeXBlO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgcXVvdGU6IFF1b3RlKSB7IH1cbn1cblxuZXhwb3J0IGNsYXNzIExvYWRGYWlsdXJlIGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBUeXBlID0gJ1tRdW90ZSBFZGl0XSBMb2FkIEZhaWx1cmUnO1xuICBwdWJsaWMgcmVhZG9ubHkgdHlwZSA9IExvYWRGYWlsdXJlLlR5cGU7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBlcnJvcjogQXBpRXJyb3JSZXNwb25zZSkgeyB9XG59XG5cbmV4cG9ydCBjbGFzcyBEZWxldGUgaW1wbGVtZW50cyBBY3Rpb24ge1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFR5cGUgPSAnW1F1b3RlIEVkaXRdIERlbGV0ZSc7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlID0gRGVsZXRlLlR5cGU7XG59XG5cbmV4cG9ydCBjbGFzcyBEZWxldGVTdWNjZXNzIGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBUeXBlID0gJ1tRdW90ZSBFZGl0XSBEZWxldGUgU3VjY2Vzcyc7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlID0gRGVsZXRlU3VjY2Vzcy5UeXBlO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgcXVvdGU6IFF1b3RlKSB7IH1cbn1cblxuZXhwb3J0IGNsYXNzIERlbGV0ZUZhaWx1cmUgaW1wbGVtZW50cyBBY3Rpb24ge1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFR5cGUgPSAnW1F1b3RlIEVkaXRdIERlbGV0ZSBGYWlsdXJlJztcbiAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSBEZWxldGVGYWlsdXJlLlR5cGU7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBlcnJvcjogQXBpRXJyb3JSZXNwb25zZSkgeyB9XG59XG5cbmV4cG9ydCBjbGFzcyBFZGl0TGluZUl0ZW1Gcm9tRGV0YWlscyBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVHlwZSA9ICdbUXVvdGUgRWRpdF0gRWRpdCBMaW5lIEl0ZW0gRnJvbSBEZXRhaWxzJztcbiAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSBFZGl0TGluZUl0ZW1Gcm9tRGV0YWlscy5UeXBlO1xuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgcmVhZG9ubHkgdXVpZDogc3RyaW5nLFxuICAgIHB1YmxpYyByZWFkb25seSBtYXJrZXJzOiBTdWJjbGlwTWFya2VycyxcbiAgICBwdWJsaWMgcmVhZG9ubHkgYXR0cmlidXRlczogU2VsZWN0ZWRQcmljZUF0dHJpYnV0ZVtdXG4gICkgeyB9XG59XG5cbmV4cG9ydCBjbGFzcyBFZGl0TGluZUl0ZW1Gcm9tRGV0YWlsc1N1Y2Nlc3MgaW1wbGVtZW50cyBBY3Rpb24ge1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFR5cGUgPSAnW1F1b3RlIEVkaXRdIEVkaXQgTGluZSBJdGVtIEZyb20gRGV0YWlscyBTdWNjZXNzJztcbiAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSBFZGl0TGluZUl0ZW1Gcm9tRGV0YWlsc1N1Y2Nlc3MuVHlwZTtcbiAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IHF1b3RlOiBRdW90ZSkgeyB9XG59XG5cbmV4cG9ydCBjbGFzcyBFZGl0TGluZUl0ZW1Gcm9tRGV0YWlsc0ZhaWx1cmUgaW1wbGVtZW50cyBBY3Rpb24ge1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFR5cGUgPSAnW1F1b3RlIEVkaXRdIEVkaXQgTGluZSBJdGVtIEZyb20gRGV0YWlscyBGYWlsdXJlJztcbiAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSBFZGl0TGluZUl0ZW1Gcm9tRGV0YWlsc0ZhaWx1cmUuVHlwZTtcbiAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IGVycm9yOiBBcGlFcnJvclJlc3BvbnNlKSB7IH1cbn1cblxuZXhwb3J0IGNsYXNzIFJlbW92ZUFzc2V0IGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBUeXBlID0gJ1tRdW90ZSBFZGl0XSBSZW1vdmUgQXNzZXQnO1xuICBwdWJsaWMgcmVhZG9ubHkgdHlwZSA9IFJlbW92ZUFzc2V0LlR5cGU7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBhc3NldDogQXNzZXQpIHsgfVxufVxuXG5leHBvcnQgY2xhc3MgUmVtb3ZlQXNzZXRTdWNjZXNzIGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBUeXBlID0gJ1tRdW90ZSBFZGl0XSBSZW1vdmUgQXNzZXQgU3VjY2Vzcyc7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlID0gUmVtb3ZlQXNzZXRTdWNjZXNzLlR5cGU7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBxdW90ZTogUXVvdGUpIHsgfVxufVxuXG5leHBvcnQgY2xhc3MgUmVtb3ZlQXNzZXRGYWlsdXJlIGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBUeXBlID0gJ1tRdW90ZSBFZGl0XSBSZW1vdmUgQXNzZXQgRmFpbHVyZSc7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlID0gUmVtb3ZlQXNzZXRGYWlsdXJlLlR5cGU7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBlcnJvcjogQXBpRXJyb3JSZXNwb25zZSkgeyB9XG59XG5cbmV4cG9ydCBjbGFzcyBBZGRDdXN0b21QcmljZVRvTGluZUl0ZW0gaW1wbGVtZW50cyBBY3Rpb24ge1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFR5cGUgPSAnW1F1b3RlIEVkaXRdIEFkZCBDdXN0b20gUHJpY2UgVG8gTGluZUl0ZW0nO1xuICBwdWJsaWMgcmVhZG9ubHkgdHlwZSA9IEFkZEN1c3RvbVByaWNlVG9MaW5lSXRlbS5UeXBlO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgbGluZUl0ZW06IEFzc2V0TGluZUl0ZW0sIHB1YmxpYyByZWFkb25seSBwcmljZTogbnVtYmVyLCBwdWJsaWMgcmVhZG9ubHkgb3ZlcnJpZGU6IGJvb2xlYW4pIHsgfVxufVxuXG5leHBvcnQgY2xhc3MgQWRkQ3VzdG9tUHJpY2VUb0xpbmVJdGVtU3VjY2VzcyBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVHlwZSA9ICdbUXVvdGUgRWRpdF0gQWRkIEN1c3RvbSBQcmljZSBUbyBMaW5lSXRlbSBTdWNjZXNzJztcbiAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSBBZGRDdXN0b21QcmljZVRvTGluZUl0ZW1TdWNjZXNzLlR5cGU7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBxdW90ZTogUXVvdGUpIHsgfVxufVxuXG5leHBvcnQgY2xhc3MgQWRkQ3VzdG9tUHJpY2VUb0xpbmVJdGVtRmFpbHVyZSBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVHlwZSA9ICdbUXVvdGUgRWRpdF0gQWRkIEN1c3RvbSBQcmljZSBUbyBMaW5lSXRlbSBGYWlsdXJlJztcbiAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSBBZGRDdXN0b21QcmljZVRvTGluZUl0ZW1GYWlsdXJlLlR5cGU7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBlcnJvcjogQXBpRXJyb3JSZXNwb25zZSkgeyB9XG59XG5cbmV4cG9ydCBjbGFzcyBTZW5kUXVvdGUgaW1wbGVtZW50cyBBY3Rpb24ge1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFR5cGUgPSAnW1F1b3RlIEVkaXRdIFNlbmQgUXVvdGUnO1xuICBwdWJsaWMgcmVhZG9ubHkgdHlwZSA9IFNlbmRRdW90ZS5UeXBlO1xufVxuXG5leHBvcnQgY2xhc3MgU2F2ZVJlY2lwaWVudEluZm9ybWF0aW9uT25RdW90ZSBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVHlwZSA9ICdbUXVvdGUgRWRpdF0gU2F2ZSBSZWNpcGllbnQgSW5mb3JtYXRpb24gT24gUXVvdGUnO1xuICBwdWJsaWMgcmVhZG9ubHkgdHlwZSA9IFNhdmVSZWNpcGllbnRJbmZvcm1hdGlvbk9uUXVvdGUuVHlwZTtcbiAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IHF1b3RlT3B0aW9uczogUXVvdGVPcHRpb25zKSB7IH1cbn1cblxuZXhwb3J0IGNsYXNzIFNlbmRRdW90ZVN1Y2Nlc3MgaW1wbGVtZW50cyBBY3Rpb24ge1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFR5cGUgPSAnW1F1b3RlIEVkaXRdIFNlbmQgUXVvdGUgU3VjY2Vzcyc7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlID0gU2VuZFF1b3RlU3VjY2Vzcy5UeXBlO1xuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgcmVhZG9ubHkgcXVvdGVJZDogbnVtYmVyLFxuICAgIHB1YmxpYyByZWFkb25seSBvd25lckVtYWlsOiBzdHJpbmcpIHsgfVxufVxuXG5leHBvcnQgY2xhc3MgQ2xvbmVRdW90ZSBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVHlwZSA9ICdbUXVvdGUgRWRpdF0gQ2xvbmUgUXVvdGUnO1xuICBwdWJsaWMgcmVhZG9ubHkgdHlwZSA9IENsb25lUXVvdGUuVHlwZTtcbiAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IHF1b3RlOiBRdW90ZSkgeyB9XG59XG5cbmV4cG9ydCBjbGFzcyBDbG9uZVF1b3RlU3VjY2VzcyBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVHlwZSA9ICdbUXVvdGUgRWRpdF0gQ2xvbmUgUXVvdGUgU3VjY2Vzcyc7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlID0gQ2xvbmVRdW90ZVN1Y2Nlc3MuVHlwZTtcbiAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IHF1b3RlOiBRdW90ZSkgeyB9XG59XG5cbmV4cG9ydCBjbGFzcyBDcmVhdGVRdW90ZSBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVHlwZSA9ICdbUXVvdGUgRWRpdF0gQ3JlYXRlIFF1b3RlJztcbiAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSBDcmVhdGVRdW90ZS5UeXBlO1xufVxuZXhwb3J0IGNsYXNzIFVwZGF0ZVF1b3RlRmllbGRzIGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBUeXBlID0gJ1tRdW90ZSBFZGl0XSBVcGRhdGUgUXVvdGUgRmllbGRzJztcbiAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSBVcGRhdGVRdW90ZUZpZWxkcy5UeXBlO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgb3B0aW9uczogUG9qbykgeyB9XG59XG5leHBvcnQgY2xhc3MgQWRkRmVlVG8gaW1wbGVtZW50cyBBY3Rpb24ge1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFR5cGUgPSAnW1F1b3RlIEVkaXRdIEFkZCBGZWUgVG8nO1xuICBwdWJsaWMgcmVhZG9ubHkgdHlwZSA9IEFkZEZlZVRvLlR5cGU7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBwcm9qZWN0OiBQcm9qZWN0LCBwdWJsaWMgcmVhZG9ubHkgZmVlOiBGZWVMaW5lSXRlbSkgeyB9XG59XG5cbmV4cG9ydCBjbGFzcyBSZW1vdmVGZWUgaW1wbGVtZW50cyBBY3Rpb24ge1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFR5cGUgPSAnW1F1b3RlIEVkaXRdIFJlbW92ZSBGZWUnO1xuICBwdWJsaWMgcmVhZG9ubHkgdHlwZSA9IFJlbW92ZUZlZS5UeXBlO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgZmVlOiBGZWVMaW5lSXRlbSkgeyB9XG59XG5cbmV4cG9ydCBjbGFzcyBCdWxrSW1wb3J0IGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBUeXBlID0gJ1tRdW90ZSBFZGl0XSBCdWxrIEltcG9ydCc7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlID0gQnVsa0ltcG9ydC5UeXBlO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgcmF3QXNzZXRzOiB7IGxpbmVJdGVtQXR0cmlidXRlczogc3RyaW5nIH0sIHB1YmxpYyByZWFkb25seSBwcm9qZWN0SWQ6IHN0cmluZykgeyB9XG59XG5cbmV4cG9ydCBjbGFzcyBCdWxrSW1wb3J0U3VjY2VzcyBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVHlwZSA9ICdbUXVvdGUgRWRpdF0gQnVsayBJbXBvcnQgU3VjY2Vzcyc7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlID0gQnVsa0ltcG9ydFN1Y2Nlc3MuVHlwZTtcbiAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IHF1b3RlOiBRdW90ZSwgcHVibGljIHJlYWRvbmx5IHJhd0Fzc2V0czogeyBsaW5lSXRlbUF0dHJpYnV0ZXM6IHN0cmluZyB9KSB7IH1cbn1cblxuZXhwb3J0IGNsYXNzIEVkaXRMaW5lSXRlbSBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVHlwZSA9ICdbUXVvdGUgRWRpdF0gRWRpdCBMaW5lIEl0ZW0nO1xuICBwdWJsaWMgcmVhZG9ubHkgdHlwZSA9IEVkaXRMaW5lSXRlbS5UeXBlO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgbGluZUl0ZW06IEFzc2V0TGluZUl0ZW0sIHB1YmxpYyByZWFkb25seSBmaWVsZFRvRWRpdDogYW55KSB7IH1cbn1cblxuZXhwb3J0IGNsYXNzIEFkZEFzc2V0VG9Qcm9qZWN0SW5RdW90ZSBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVHlwZSA9ICdbUXVvdGUgRWRpdF0gQWRkIEFzc2V0IFRvIFByb2plY3QgSW4gUXVvdGUnO1xuICBwdWJsaWMgcmVhZG9ubHkgdHlwZSA9IEFkZEFzc2V0VG9Qcm9qZWN0SW5RdW90ZS5UeXBlO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgcGFyYW1ldGVyczogQWRkQXNzZXRQYXJhbWV0ZXJzKSB7IH1cbn1cblxuZXhwb3J0IGNsYXNzIEFkZEFzc2V0VG9Qcm9qZWN0SW5RdW90ZVN1Y2Nlc3MgaW1wbGVtZW50cyBBY3Rpb24ge1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFR5cGUgPSAnW1F1b3RlIEVkaXRdIEFkZCBBc3NldCBUbyBQcm9qZWN0IEluIFF1b3RlIFN1Y2Nlc3MnO1xuICBwdWJsaWMgcmVhZG9ubHkgdHlwZSA9IEFkZEFzc2V0VG9Qcm9qZWN0SW5RdW90ZVN1Y2Nlc3MuVHlwZTtcbiAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IHF1b3RlOiBRdW90ZSwgcHVibGljIHJlYWRvbmx5IGFzc2V0SWQ6IG51bWJlcikgeyB9XG59XG5cbmV4cG9ydCBjbGFzcyBBZGRQcm9qZWN0IGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBUeXBlID0gJ1tRdW90ZSBFZGl0XSBBZGQgUHJvamVjdCc7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlID0gQWRkUHJvamVjdC5UeXBlO1xufVxuXG5leHBvcnQgY2xhc3MgUmVtb3ZlUHJvamVjdCBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVHlwZSA9ICdbUXVvdGUgRWRpdF0gUmVtb3ZlIFByb2plY3QnO1xuICBwdWJsaWMgcmVhZG9ubHkgdHlwZSA9IFJlbW92ZVByb2plY3QuVHlwZTtcbiAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IHByb2plY3RJZDogbnVtYmVyKSB7IH1cbn1cbmV4cG9ydCBjbGFzcyBVcGRhdGVQcm9qZWN0IGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBUeXBlID0gJ1tRdW90ZSBFZGl0XSBVcGRhdGUgUHJvamVjdCc7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlID0gVXBkYXRlUHJvamVjdC5UeXBlO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgcHJvamVjdDogUHJvamVjdCkgeyB9XG59XG5cbmV4cG9ydCBjbGFzcyBNb3ZlTGluZUl0ZW0gaW1wbGVtZW50cyBBY3Rpb24ge1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFR5cGUgPSAnW1F1b3RlIEVkaXRdIE1vdmUgTGluZSBJdGVtJztcbiAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSBNb3ZlTGluZUl0ZW0uVHlwZTtcbiAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IHByb2plY3Q6IFByb2plY3QsIHB1YmxpYyByZWFkb25seSBsaW5lSXRlbTogQXNzZXRMaW5lSXRlbSkgeyB9XG59XG5cbmV4cG9ydCBjbGFzcyBDbG9uZUxpbmVJdGVtIGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBUeXBlID0gJ1tRdW90ZSBFZGl0XSBDbG9uZSBMaW5lIEl0ZW0nO1xuICBwdWJsaWMgcmVhZG9ubHkgdHlwZSA9IENsb25lTGluZUl0ZW0uVHlwZTtcbiAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IGxpbmVJdGVtOiBBc3NldExpbmVJdGVtKSB7IH1cbn1cblxuZXhwb3J0IGNsYXNzIFJlZnJlc2hBbmROb3RpZnkgaW1wbGVtZW50cyBBY3Rpb24ge1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFR5cGUgPSAnW1F1b3RlIEVkaXRdIFJlZnJlc2ggQW5kIE5vdGlmeSc7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlID0gUmVmcmVzaEFuZE5vdGlmeS5UeXBlO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgcXVvdGU6IFF1b3RlLCBwdWJsaWMgcmVhZG9ubHkgdHJhbnNsYXRpb25TdHJpbmc6IHN0cmluZykgeyB9XG59XG5cbmV4cG9ydCBjbGFzcyBFZGl0TGluZUl0ZW1NYXJrZXJzIGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBUeXBlID0gJ1tRdW90ZSBFZGl0XSBFZGl0IExpbmUgSXRlbSBNYXJrZXJzJztcbiAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSBFZGl0TGluZUl0ZW1NYXJrZXJzLlR5cGU7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBsaW5lSXRlbTogQXNzZXRMaW5lSXRlbSwgcHVibGljIHJlYWRvbmx5IG5ld01hcmtlcnM6IFN1YmNsaXBNYXJrZXJzKSB7IH1cbn1cblxuZXhwb3J0IGNsYXNzIFVwZGF0ZVByb2plY3RQcmljZUF0dHJpYnV0ZXMgaW1wbGVtZW50cyBBY3Rpb24ge1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFR5cGUgPSAnW1F1b3RlIEVkaXRdIFVwZGF0ZSBQcm9qZWN0IFByaWNlIEF0dHJpYnV0ZXMnO1xuICBwdWJsaWMgcmVhZG9ubHkgdHlwZSA9IFVwZGF0ZVByb2plY3RQcmljZUF0dHJpYnV0ZXMuVHlwZTtcbiAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IHByaWNlQXR0cmlidXRlczogU2VsZWN0ZWRQcmljZUF0dHJpYnV0ZVtdLCBwdWJsaWMgcmVhZG9ubHkgcHJvamVjdDogUHJvamVjdCkgeyB9XG59XG5cbmV4cG9ydCBjbGFzcyBBZGRVc2VyVG9RdW90ZSBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVHlwZSA9ICdbUXVvdGUgRWRpdF0gQWRkIFVzZXIgVG8gUXVvdGUnO1xuICBwdWJsaWMgcmVhZG9ubHkgdHlwZSA9IEFkZFVzZXJUb1F1b3RlLlR5cGU7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSB1c2VyOiBVc2VyKSB7IH1cbn1cbmV4cG9ydCBjbGFzcyBBZGRCaWxsaW5nQWNjb3VudFRvUXVvdGUgaW1wbGVtZW50cyBBY3Rpb24ge1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFR5cGUgPSAnW1F1b3RlIEVkaXRdIEFkZCBCaWxsaW5nIEFjY291bnQgVG8gUXVvdGUnO1xuICBwdWJsaWMgcmVhZG9ubHkgdHlwZSA9IEFkZEJpbGxpbmdBY2NvdW50VG9RdW90ZS5UeXBlO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgYWNjb3VudDogQWNjb3VudCkgeyB9XG59XG5cbmV4cG9ydCBjbGFzcyBBZGRJbnZvaWNlQ29udGFjdFRvUXVvdGUgaW1wbGVtZW50cyBBY3Rpb24ge1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFR5cGUgPSAnW1F1b3RlIEVkaXRdIEFkZCBJbnZvaWNlIENvbnRhY3QgVG8gUXVvdGUnO1xuICBwdWJsaWMgcmVhZG9ubHkgdHlwZSA9IEFkZEludm9pY2VDb250YWN0VG9RdW90ZS5UeXBlO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgdXNlcklkOiBudW1iZXIpIHsgfVxufVxuXG5leHBvcnQgY2xhc3MgSW5pdGlhbGl6ZVNhbGVzTWFuYWdlckZvcm1PblF1b3RlIGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBUeXBlID0gJ1tRdW90ZSBFZGl0XSBJbml0aWFsaXplIFNhbGVzIE1hbmFnZXIgRm9ybSBPbiBRdW90ZSc7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlID0gSW5pdGlhbGl6ZVNhbGVzTWFuYWdlckZvcm1PblF1b3RlLlR5cGU7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBlbWFpbEFkZHJlc3M6IHN0cmluZywgcHVibGljIHJlYWRvbmx5IGRlZmF1bHREYXRlOiBzdHJpbmcpIHsgfVxufVxuXG5leHBvcnQgY2xhc3MgVXBkYXRlU2FsZXNNYW5hZ2VyRm9ybU9uUXVvdGUgaW1wbGVtZW50cyBBY3Rpb24ge1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFR5cGUgPSAnW1F1b3RlIEVkaXRdIEFkZCBTYWxlcyBNYW5hZ2VyIEZvcm0gT24gUXVvdGUnO1xuICBwdWJsaWMgcmVhZG9ubHkgdHlwZSA9IFVwZGF0ZVNhbGVzTWFuYWdlckZvcm1PblF1b3RlLlR5cGU7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBmb3JtOiBQb2pvKSB7IH1cbn1cblxuZXhwb3J0IGNsYXNzIFVwZGF0ZUJpbGxpbmdBY2NvdW50IGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBUeXBlID0gJ1tRdW90ZSBFZGl0XSBVcGRhdGUgQmlsbGluZyBBY2NvdW50JztcbiAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSBVcGRhdGVCaWxsaW5nQWNjb3VudC5UeXBlO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgZm9ybTogUG9qbykgeyB9XG59XG5cbmV4cG9ydCBjbGFzcyBBZGROb3RlIGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBUeXBlID0gJ1tRdW90ZSBFZGl0XSBBZGQgTm90ZSc7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlID0gQWRkTm90ZS5UeXBlO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgbm90ZTogc3RyaW5nLCBwdWJsaWMgcmVhZG9ubHkgbGluZUl0ZW06IEFzc2V0TGluZUl0ZW0pIHsgfVxufVxuXG5leHBvcnQgY2xhc3MgUmVtb3ZlTm90ZSBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVHlwZSA9ICdbUXVvdGUgRWRpdF0gUmVtb3ZlIE5vdGUnO1xuICBwdWJsaWMgcmVhZG9ubHkgdHlwZSA9IFJlbW92ZU5vdGUuVHlwZTtcbiAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IGxpbmVJdGVtOiBBc3NldExpbmVJdGVtKSB7IH1cbn1cblxuZXhwb3J0IGNsYXNzIE92ZXJyaWRlSW52b2ljZUNvbnRhY3QgaW1wbGVtZW50cyBBY3Rpb24ge1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFR5cGUgPSAnW1F1b3RlIEVkaXRdIE92ZXJyaWRlIEludm9pY2UgQ29udGFjdCc7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlID0gT3ZlcnJpZGVJbnZvaWNlQ29udGFjdC5UeXBlO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgY29udGFjdDogU2VuZERldGFpbHNJbnZvaWNlQ29udGFjdCkgeyB9XG59XG5cbmV4cG9ydCB0eXBlIEFueSA9XG4gIExvYWQgfCBMb2FkU3VjY2VzcyB8IExvYWRGYWlsdXJlIHxcbiAgRGVsZXRlIHwgRGVsZXRlU3VjY2VzcyB8IERlbGV0ZUZhaWx1cmUgfFxuICBFZGl0TGluZUl0ZW1Gcm9tRGV0YWlscyB8IEVkaXRMaW5lSXRlbUZyb21EZXRhaWxzU3VjY2VzcyB8IEVkaXRMaW5lSXRlbUZyb21EZXRhaWxzRmFpbHVyZSB8XG4gIFJlbW92ZUFzc2V0IHwgUmVtb3ZlQXNzZXRTdWNjZXNzIHwgUmVtb3ZlQXNzZXRGYWlsdXJlIHxcbiAgQWRkQ3VzdG9tUHJpY2VUb0xpbmVJdGVtIHwgQWRkQ3VzdG9tUHJpY2VUb0xpbmVJdGVtU3VjY2VzcyB8IEFkZEN1c3RvbVByaWNlVG9MaW5lSXRlbUZhaWx1cmUgfFxuICBTZW5kUXVvdGUgfCBTYXZlUmVjaXBpZW50SW5mb3JtYXRpb25PblF1b3RlIHwgQ2xvbmVRdW90ZSB8IENsb25lUXVvdGVTdWNjZXNzIHwgQ3JlYXRlUXVvdGUgfFxuICBVcGRhdGVRdW90ZUZpZWxkcyB8IEFkZEZlZVRvIHwgUmVtb3ZlRmVlIHwgQnVsa0ltcG9ydCB8IEJ1bGtJbXBvcnRTdWNjZXNzIHwgRWRpdExpbmVJdGVtIHxcbiAgQWRkQXNzZXRUb1Byb2plY3RJblF1b3RlIHwgQWRkQXNzZXRUb1Byb2plY3RJblF1b3RlU3VjY2VzcyB8IEFkZFByb2plY3QgfCBSZW1vdmVQcm9qZWN0IHxcbiAgVXBkYXRlUHJvamVjdCB8IE1vdmVMaW5lSXRlbSB8IENsb25lTGluZUl0ZW0gfCBSZWZyZXNoQW5kTm90aWZ5IHwgRWRpdExpbmVJdGVtTWFya2VycyB8XG4gIFVwZGF0ZVByb2plY3RQcmljZUF0dHJpYnV0ZXMgfCBBZGRVc2VyVG9RdW90ZSB8IEFkZEJpbGxpbmdBY2NvdW50VG9RdW90ZSB8IEFkZEludm9pY2VDb250YWN0VG9RdW90ZSB8XG4gIEluaXRpYWxpemVTYWxlc01hbmFnZXJGb3JtT25RdW90ZSB8IFVwZGF0ZVNhbGVzTWFuYWdlckZvcm1PblF1b3RlIHxcbiAgVXBkYXRlQmlsbGluZ0FjY291bnQgfCBBZGROb3RlIHwgUmVtb3ZlTm90ZSB8IE92ZXJyaWRlSW52b2ljZUNvbnRhY3Q7XG4iXX0=
