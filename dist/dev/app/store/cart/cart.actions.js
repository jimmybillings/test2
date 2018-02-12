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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9jYXJ0L2NhcnQuYWN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFRQTtJQUFBO0lBNkJBLENBQUM7SUE1QlEsNEJBQUksR0FBWDtRQUNFLE1BQU0sQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFTSwrQ0FBdUIsR0FBOUIsVUFDRSxJQUFZLEVBQ1osT0FBdUIsRUFDdkIsVUFBb0M7UUFFcEMsTUFBTSxDQUFDLElBQUksdUJBQXVCLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRU0sbUNBQVcsR0FBbEIsVUFBbUIsS0FBWTtRQUM3QixNQUFNLENBQUMsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVNLCtCQUFPLEdBQWQsVUFBZSxJQUFZLEVBQUUsUUFBdUI7UUFDbEQsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRU0sc0NBQWMsR0FBckIsVUFBc0IsUUFBdUI7UUFDM0MsTUFBTSxDQUFDLElBQUksVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFHTSxtQ0FBVyxHQUFsQixVQUFtQixJQUFVO1FBQzNCLE1BQU0sQ0FBQyxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBQ0gsb0JBQUM7QUFBRCxDQTdCQSxBQTZCQyxJQUFBO0FBN0JZLHNDQUFhO0FBK0IxQjtJQUEyQyx5Q0FBYTtJQUF4RDs7SUE0QkEsQ0FBQztJQTNCUSwyQ0FBVyxHQUFsQixVQUFtQixLQUF1QjtRQUN4QyxNQUFNLENBQUMsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVNLDhEQUE4QixHQUFyQyxVQUFzQyxJQUFVO1FBQzlDLE1BQU0sQ0FBQyxJQUFJLDhCQUE4QixDQUFDLElB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LEFBSUMsSUFBQTtBQUpZLDhDQUFpQiIsImZpbGUiOiJhcHAvc3RvcmUvY2FydC9jYXJ0LmFjdGlvbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBY3Rpb24gfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5cbmltcG9ydCB7IEFzc2V0TGluZUl0ZW0sIENhcnQgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9jb21tZXJjZS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQXNzZXQgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9jb21tb24uaW50ZXJmYWNlJztcbmltcG9ydCB7IEFwaUVycm9yUmVzcG9uc2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9hcGkuaW50ZXJmYWNlJztcbmltcG9ydCB7IFN1YmNsaXBNYXJrZXJzIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvc3ViY2xpcC1tYXJrZXJzJztcbmltcG9ydCB7IFBvam8sIFNlbGVjdGVkUHJpY2VBdHRyaWJ1dGUgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9jb21tb24uaW50ZXJmYWNlJztcblxuZXhwb3J0IGNsYXNzIEFjdGlvbkZhY3Rvcnkge1xuICBwdWJsaWMgbG9hZCgpOiBMb2FkIHtcbiAgICByZXR1cm4gbmV3IExvYWQoKTtcbiAgfVxuXG4gIHB1YmxpYyBlZGl0TGluZUl0ZW1Gcm9tRGV0YWlscyhcbiAgICB1dWlkOiBzdHJpbmcsXG4gICAgbWFya2VyczogU3ViY2xpcE1hcmtlcnMsXG4gICAgYXR0cmlidXRlczogU2VsZWN0ZWRQcmljZUF0dHJpYnV0ZVtdXG4gICk6IEVkaXRMaW5lSXRlbUZyb21EZXRhaWxzIHtcbiAgICByZXR1cm4gbmV3IEVkaXRMaW5lSXRlbUZyb21EZXRhaWxzKHV1aWQsIG1hcmtlcnMsIGF0dHJpYnV0ZXMpO1xuICB9XG5cbiAgcHVibGljIHJlbW92ZUFzc2V0KGFzc2V0OiBBc3NldCk6IFJlbW92ZUFzc2V0IHtcbiAgICByZXR1cm4gbmV3IFJlbW92ZUFzc2V0KGFzc2V0KTtcbiAgfVxuXG4gIHB1YmxpYyBhZGROb3RlKG5vdGU6IHN0cmluZywgbGluZUl0ZW06IEFzc2V0TGluZUl0ZW0pOiBBZGROb3RlIHtcbiAgICByZXR1cm4gbmV3IEFkZE5vdGUobm90ZSwgbGluZUl0ZW0pO1xuICB9XG5cbiAgcHVibGljIHJlbW92ZU5vdGVGcm9tKGxpbmVJdGVtOiBBc3NldExpbmVJdGVtKTogUmVtb3ZlTm90ZSB7XG4gICAgcmV0dXJuIG5ldyBSZW1vdmVOb3RlKGxpbmVJdGVtKTtcbiAgfVxuXG4gIC8vIE1vdmUgdGhpcyB0byBpbnRlcm5hbCBhY3Rpb24gZmFjdG9yeSB3aGVuIGNhcnQgaXMgZnVsbHkgXCJlZmZlY3RlZFwiXG4gIHB1YmxpYyBsb2FkU3VjY2VzcyhjYXJ0OiBDYXJ0KTogTG9hZFN1Y2Nlc3Mge1xuICAgIHJldHVybiBuZXcgTG9hZFN1Y2Nlc3MoY2FydCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIEludGVybmFsQWN0aW9uRmFjdG9yeSBleHRlbmRzIEFjdGlvbkZhY3Rvcnkge1xuICBwdWJsaWMgbG9hZEZhaWx1cmUoZXJyb3I6IEFwaUVycm9yUmVzcG9uc2UpOiBMb2FkRmFpbHVyZSB7XG4gICAgcmV0dXJuIG5ldyBMb2FkRmFpbHVyZShlcnJvcik7XG4gIH1cblxuICBwdWJsaWMgZWRpdExpbmVJdGVtRnJvbURldGFpbHNTdWNjZXNzKGNhcnQ6IENhcnQpOiBFZGl0TGluZUl0ZW1Gcm9tRGV0YWlsc1N1Y2Nlc3Mge1xuICAgIHJldHVybiBuZXcgRWRpdExpbmVJdGVtRnJvbURldGFpbHNTdWNjZXNzKGNhcnQpO1xuICB9XG5cbiAgcHVibGljIGVkaXRMaW5lSXRlbUZyb21EZXRhaWxzRmFpbHVyZShlcnJvcjogQXBpRXJyb3JSZXNwb25zZSk6IEVkaXRMaW5lSXRlbUZyb21EZXRhaWxzRmFpbHVyZSB7XG4gICAgcmV0dXJuIG5ldyBFZGl0TGluZUl0ZW1Gcm9tRGV0YWlsc0ZhaWx1cmUoZXJyb3IpO1xuICB9XG5cbiAgcHVibGljIHJlbW92ZUFzc2V0U3VjY2VzcyhjYXJ0OiBDYXJ0KTogUmVtb3ZlQXNzZXRTdWNjZXNzIHtcbiAgICByZXR1cm4gbmV3IFJlbW92ZUFzc2V0U3VjY2VzcyhjYXJ0KTtcbiAgfVxuXG4gIHB1YmxpYyByZW1vdmVBc3NldEZhaWx1cmUoZXJyb3I6IEFwaUVycm9yUmVzcG9uc2UpOiBSZW1vdmVBc3NldEZhaWx1cmUge1xuICAgIHJldHVybiBuZXcgUmVtb3ZlQXNzZXRGYWlsdXJlKGVycm9yKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGROb3RlU3VjY2VzcyhjYXJ0OiBDYXJ0KTogQWRkTm90ZVN1Y2Nlc3Mge1xuICAgIHJldHVybiBuZXcgQWRkTm90ZVN1Y2Nlc3MoY2FydCk7XG4gIH1cblxuICBwdWJsaWMgcmVtb3ZlTm90ZVN1Y2Nlc3MoY2FydDogQ2FydCk6IFJlbW92ZU5vdGVTdWNjZXNzIHtcbiAgICByZXR1cm4gbmV3IFJlbW92ZU5vdGVTdWNjZXNzKGNhcnQpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBMb2FkIGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBUeXBlID0gJ1tDYXJ0XSBMb2FkJztcbiAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSBMb2FkLlR5cGU7XG59XG5cbmV4cG9ydCBjbGFzcyBMb2FkU3VjY2VzcyBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVHlwZSA9ICdbQ2FydF0gTG9hZCBTdWNjZXNzJztcbiAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSBMb2FkU3VjY2Vzcy5UeXBlO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgY2FydDogQ2FydCkgeyB9XG59XG5cbmV4cG9ydCBjbGFzcyBMb2FkRmFpbHVyZSBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVHlwZSA9ICdbQ2FydF0gTG9hZCBGYWlsdXJlJztcbiAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSBMb2FkRmFpbHVyZS5UeXBlO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgZXJyb3I6IEFwaUVycm9yUmVzcG9uc2UpIHsgfVxufVxuXG5leHBvcnQgY2xhc3MgRWRpdExpbmVJdGVtRnJvbURldGFpbHMgaW1wbGVtZW50cyBBY3Rpb24ge1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFR5cGUgPSAnW0NhcnRdIEVkaXQgTGluZSBJdGVtIEZyb20gRGV0YWlscyc7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlID0gRWRpdExpbmVJdGVtRnJvbURldGFpbHMuVHlwZTtcbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIHJlYWRvbmx5IHV1aWQ6IHN0cmluZyxcbiAgICBwdWJsaWMgcmVhZG9ubHkgbWFya2VyczogU3ViY2xpcE1hcmtlcnMsXG4gICAgcHVibGljIHJlYWRvbmx5IGF0dHJpYnV0ZXM6IFNlbGVjdGVkUHJpY2VBdHRyaWJ1dGVbXVxuICApIHsgfVxufVxuXG5leHBvcnQgY2xhc3MgRWRpdExpbmVJdGVtRnJvbURldGFpbHNTdWNjZXNzIGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBUeXBlID0gJ1tDYXJ0XSBFZGl0IExpbmUgSXRlbSBGcm9tIERldGFpbHMgU3VjY2Vzcyc7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlID0gRWRpdExpbmVJdGVtRnJvbURldGFpbHNTdWNjZXNzLlR5cGU7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBjYXJ0OiBDYXJ0KSB7IH1cbn1cblxuZXhwb3J0IGNsYXNzIEVkaXRMaW5lSXRlbUZyb21EZXRhaWxzRmFpbHVyZSBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVHlwZSA9ICdbQ2FydF0gRWRpdCBMaW5lIEl0ZW0gRnJvbSBEZXRhaWxzIEZhaWx1cmUnO1xuICBwdWJsaWMgcmVhZG9ubHkgdHlwZSA9IEVkaXRMaW5lSXRlbUZyb21EZXRhaWxzRmFpbHVyZS5UeXBlO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgZXJyb3I6IEFwaUVycm9yUmVzcG9uc2UpIHsgfVxufVxuXG5leHBvcnQgY2xhc3MgUmVtb3ZlQXNzZXQgaW1wbGVtZW50cyBBY3Rpb24ge1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFR5cGUgPSAnW0NhcnRdIFJlbW92ZSBBc3NldCc7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlID0gUmVtb3ZlQXNzZXQuVHlwZTtcbiAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IGFzc2V0OiBBc3NldCkgeyB9XG59XG5cbmV4cG9ydCBjbGFzcyBSZW1vdmVBc3NldFN1Y2Nlc3MgaW1wbGVtZW50cyBBY3Rpb24ge1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFR5cGUgPSAnW0NhcnRdIFJlbW92ZSBBc3NldCBTdWNjZXNzJztcbiAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSBSZW1vdmVBc3NldFN1Y2Nlc3MuVHlwZTtcbiAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IGNhcnQ6IENhcnQpIHsgfVxufVxuXG5leHBvcnQgY2xhc3MgUmVtb3ZlQXNzZXRGYWlsdXJlIGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBUeXBlID0gJ1tDYXJ0XSBSZW1vdmUgQXNzZXQgRmFpbHVyZSc7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlID0gUmVtb3ZlQXNzZXRGYWlsdXJlLlR5cGU7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBlcnJvcjogQXBpRXJyb3JSZXNwb25zZSkgeyB9XG59XG5cbmV4cG9ydCBjbGFzcyBBZGROb3RlIGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBUeXBlID0gJ1tDYXJ0XSBBZGQgTm90ZSc7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlID0gQWRkTm90ZS5UeXBlO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgbm90ZTogc3RyaW5nLCBwdWJsaWMgcmVhZG9ubHkgbGluZUl0ZW06IEFzc2V0TGluZUl0ZW0pIHsgfVxufVxuXG5leHBvcnQgY2xhc3MgUmVtb3ZlTm90ZSBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVHlwZSA9ICdbQ2FydF0gUmVtb3ZlIE5vdGUnO1xuICBwdWJsaWMgcmVhZG9ubHkgdHlwZSA9IFJlbW92ZU5vdGUuVHlwZTtcbiAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IGxpbmVJdGVtOiBBc3NldExpbmVJdGVtKSB7IH1cbn1cblxuZXhwb3J0IGNsYXNzIEFkZE5vdGVTdWNjZXNzIGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBUeXBlID0gJ1tDYXJ0XSBBZGQgTm90ZSBTdWNjZXNzJztcbiAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSBBZGROb3RlU3VjY2Vzcy5UeXBlO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgY2FydDogQ2FydCkgeyB9XG59XG5cbmV4cG9ydCBjbGFzcyBSZW1vdmVOb3RlU3VjY2VzcyBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVHlwZSA9ICdbQ2FydF0gUmVtb3ZlIE5vdGUgU3VjY2Vzcyc7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlID0gUmVtb3ZlTm90ZVN1Y2Nlc3MuVHlwZTtcbiAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IGNhcnQ6IENhcnQpIHsgfVxufVxuXG5leHBvcnQgdHlwZSBBbnkgPVxuICBMb2FkIHwgTG9hZFN1Y2Nlc3MgfCBMb2FkRmFpbHVyZSB8XG4gIEVkaXRMaW5lSXRlbUZyb21EZXRhaWxzIHwgRWRpdExpbmVJdGVtRnJvbURldGFpbHNTdWNjZXNzIHwgRWRpdExpbmVJdGVtRnJvbURldGFpbHNGYWlsdXJlIHxcbiAgUmVtb3ZlQXNzZXQgfCBSZW1vdmVBc3NldFN1Y2Nlc3MgfCBSZW1vdmVBc3NldEZhaWx1cmUgfCBBZGROb3RlIHwgQWRkTm90ZVN1Y2Nlc3MgfCBSZW1vdmVOb3RlIHwgUmVtb3ZlTm90ZVN1Y2Nlc3M7XG4iXX0=
