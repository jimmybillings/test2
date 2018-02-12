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
    ActionFactory.prototype.addCustomPriceToLineItem = function (lineItem, price) {
        return new AddCustomPriceToLineItem(lineItem, price);
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
    function AddCustomPriceToLineItem(lineItem, price) {
        this.lineItem = lineItem;
        this.price = price;
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
//# sourceMappingURL=quote-edit.actions.js.map