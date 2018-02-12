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
    ActionFactory.prototype.editLineItemFromDetails = function (uuid, markers, attributes) {
        return new EditLineItemFromDetails(uuid, markers, attributes);
    };
    ActionFactory.prototype.removeAsset = function (asset) {
        return new RemoveAsset(asset);
    };
    ActionFactory.prototype.addNote = function (note, lineItem) {
        return new AddNote(note, lineItem);
    };
    ActionFactory.prototype.removeNoteFrom = function (lineItem) {
        return new RemoveNote(lineItem);
    };
    ActionFactory.prototype.loadSuccess = function (cart) {
        return new LoadSuccess(cart);
    };
    return ActionFactory;
}());
exports.ActionFactory = ActionFactory;
var InternalActionFactory = (function (_super) {
    __extends(InternalActionFactory, _super);
    function InternalActionFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InternalActionFactory.prototype.loadFailure = function (error) {
        return new LoadFailure(error);
    };
    InternalActionFactory.prototype.editLineItemFromDetailsSuccess = function (cart) {
        return new EditLineItemFromDetailsSuccess(cart);
    };
    InternalActionFactory.prototype.editLineItemFromDetailsFailure = function (error) {
        return new EditLineItemFromDetailsFailure(error);
    };
    InternalActionFactory.prototype.removeAssetSuccess = function (cart) {
        return new RemoveAssetSuccess(cart);
    };
    InternalActionFactory.prototype.removeAssetFailure = function (error) {
        return new RemoveAssetFailure(error);
    };
    InternalActionFactory.prototype.addNoteSuccess = function (cart) {
        return new AddNoteSuccess(cart);
    };
    InternalActionFactory.prototype.removeNoteSuccess = function (cart) {
        return new RemoveNoteSuccess(cart);
    };
    return InternalActionFactory;
}(ActionFactory));
exports.InternalActionFactory = InternalActionFactory;
var Load = (function () {
    function Load() {
        this.type = Load.Type;
    }
    Load.Type = '[Cart] Load';
    return Load;
}());
exports.Load = Load;
var LoadSuccess = (function () {
    function LoadSuccess(cart) {
        this.cart = cart;
        this.type = LoadSuccess.Type;
    }
    LoadSuccess.Type = '[Cart] Load Success';
    return LoadSuccess;
}());
exports.LoadSuccess = LoadSuccess;
var LoadFailure = (function () {
    function LoadFailure(error) {
        this.error = error;
        this.type = LoadFailure.Type;
    }
    LoadFailure.Type = '[Cart] Load Failure';
    return LoadFailure;
}());
exports.LoadFailure = LoadFailure;
var EditLineItemFromDetails = (function () {
    function EditLineItemFromDetails(uuid, markers, attributes) {
        this.uuid = uuid;
        this.markers = markers;
        this.attributes = attributes;
        this.type = EditLineItemFromDetails.Type;
    }
    EditLineItemFromDetails.Type = '[Cart] Edit Line Item From Details';
    return EditLineItemFromDetails;
}());
exports.EditLineItemFromDetails = EditLineItemFromDetails;
var EditLineItemFromDetailsSuccess = (function () {
    function EditLineItemFromDetailsSuccess(cart) {
        this.cart = cart;
        this.type = EditLineItemFromDetailsSuccess.Type;
    }
    EditLineItemFromDetailsSuccess.Type = '[Cart] Edit Line Item From Details Success';
    return EditLineItemFromDetailsSuccess;
}());
exports.EditLineItemFromDetailsSuccess = EditLineItemFromDetailsSuccess;
var EditLineItemFromDetailsFailure = (function () {
    function EditLineItemFromDetailsFailure(error) {
        this.error = error;
        this.type = EditLineItemFromDetailsFailure.Type;
    }
    EditLineItemFromDetailsFailure.Type = '[Cart] Edit Line Item From Details Failure';
    return EditLineItemFromDetailsFailure;
}());
exports.EditLineItemFromDetailsFailure = EditLineItemFromDetailsFailure;
var RemoveAsset = (function () {
    function RemoveAsset(asset) {
        this.asset = asset;
        this.type = RemoveAsset.Type;
    }
    RemoveAsset.Type = '[Cart] Remove Asset';
    return RemoveAsset;
}());
exports.RemoveAsset = RemoveAsset;
var RemoveAssetSuccess = (function () {
    function RemoveAssetSuccess(cart) {
        this.cart = cart;
        this.type = RemoveAssetSuccess.Type;
    }
    RemoveAssetSuccess.Type = '[Cart] Remove Asset Success';
    return RemoveAssetSuccess;
}());
exports.RemoveAssetSuccess = RemoveAssetSuccess;
var RemoveAssetFailure = (function () {
    function RemoveAssetFailure(error) {
        this.error = error;
        this.type = RemoveAssetFailure.Type;
    }
    RemoveAssetFailure.Type = '[Cart] Remove Asset Failure';
    return RemoveAssetFailure;
}());
exports.RemoveAssetFailure = RemoveAssetFailure;
var AddNote = (function () {
    function AddNote(note, lineItem) {
        this.note = note;
        this.lineItem = lineItem;
        this.type = AddNote.Type;
    }
    AddNote.Type = '[Cart] Add Note';
    return AddNote;
}());
exports.AddNote = AddNote;
var RemoveNote = (function () {
    function RemoveNote(lineItem) {
        this.lineItem = lineItem;
        this.type = RemoveNote.Type;
    }
    RemoveNote.Type = '[Cart] Remove Note';
    return RemoveNote;
}());
exports.RemoveNote = RemoveNote;
var AddNoteSuccess = (function () {
    function AddNoteSuccess(cart) {
        this.cart = cart;
        this.type = AddNoteSuccess.Type;
    }
    AddNoteSuccess.Type = '[Cart] Add Note Success';
    return AddNoteSuccess;
}());
exports.AddNoteSuccess = AddNoteSuccess;
var RemoveNoteSuccess = (function () {
    function RemoveNoteSuccess(cart) {
        this.cart = cart;
        this.type = RemoveNoteSuccess.Type;
    }
    RemoveNoteSuccess.Type = '[Cart] Remove Note Success';
    return RemoveNoteSuccess;
}());
exports.RemoveNoteSuccess = RemoveNoteSuccess;
//# sourceMappingURL=cart.actions.js.map