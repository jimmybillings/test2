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
    ActionFactory.prototype.load = function (documentId) {
        return new Load(documentId);
    };
    return ActionFactory;
}());
exports.ActionFactory = ActionFactory;
var InternalActionFactory = (function (_super) {
    __extends(InternalActionFactory, _super);
    function InternalActionFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InternalActionFactory.prototype.loadSuccess = function (document) {
        return new LoadSuccess(document);
    };
    InternalActionFactory.prototype.loadFailure = function (error) {
        return new LoadFailure(error);
    };
    return InternalActionFactory;
}(ActionFactory));
exports.InternalActionFactory = InternalActionFactory;
var Load = (function () {
    function Load(documentId) {
        this.documentId = documentId;
        this.type = Load.Type;
    }
    Load.Type = '[Privacy Policy] Load';
    return Load;
}());
exports.Load = Load;
var LoadSuccess = (function () {
    function LoadSuccess(document) {
        this.document = document;
        this.type = LoadSuccess.Type;
    }
    LoadSuccess.Type = '[Privacy Policy] Load Success';
    return LoadSuccess;
}());
exports.LoadSuccess = LoadSuccess;
var LoadFailure = (function () {
    function LoadFailure(error) {
        this.error = error;
        this.type = LoadFailure.Type;
    }
    LoadFailure.Type = '[Privacy Policy] Load Failure';
    return LoadFailure;
}());
exports.LoadFailure = LoadFailure;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9wcml2YWN5LXBvbGljeS9wcml2YWN5LXBvbGljeS5hY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUdBO0lBQUE7SUFJQSxDQUFDO0lBSFEsNEJBQUksR0FBWCxVQUFZLFVBQWtCO1FBQzVCLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBQ0gsb0JBQUM7QUFBRCxDQUpBLEFBSUMsSUFBQTtBQUpZLHNDQUFhO0FBTTFCO0lBQTJDLHlDQUFhO0lBQXhEOztJQVFBLENBQUM7SUFQUSwyQ0FBVyxHQUFsQixVQUFtQixRQUFnQjtRQUNqQyxNQUFNLENBQUMsSUFBSSxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVNLDJDQUFXLEdBQWxCLFVBQW1CLEtBQXVCO1FBQ3hDLE1BQU0sQ0FBQyxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBQ0gsNEJBQUM7QUFBRCxDQVJBLEFBUUMsQ0FSMEMsYUFBYSxHQVF2RDtBQVJZLHNEQUFxQjtBQVVsQztJQUdFLGNBQTRCLFVBQWtCO1FBQWxCLGVBQVUsR0FBVixVQUFVLENBQVE7UUFEOUIsU0FBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDaUIsQ0FBQztJQUY1QixTQUFJLEdBQUcsdUJBQXVCLENBQUM7SUFHeEQsV0FBQztDQUpELEFBSUMsSUFBQTtBQUpZLG9CQUFJO0FBTWpCO0lBR0UscUJBQTRCLFFBQWdCO1FBQWhCLGFBQVEsR0FBUixRQUFRLENBQVE7UUFENUIsU0FBSSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUM7SUFDUSxDQUFDO0lBRjFCLGdCQUFJLEdBQUcsK0JBQStCLENBQUM7SUFHaEUsa0JBQUM7Q0FKRCxBQUlDLElBQUE7QUFKWSxrQ0FBVztBQU14QjtJQUdFLHFCQUE0QixLQUF1QjtRQUF2QixVQUFLLEdBQUwsS0FBSyxDQUFrQjtRQURuQyxTQUFJLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQztJQUNlLENBQUM7SUFGakMsZ0JBQUksR0FBRywrQkFBK0IsQ0FBQztJQUdoRSxrQkFBQztDQUpELEFBSUMsSUFBQTtBQUpZLGtDQUFXIiwiZmlsZSI6ImFwcC9zdG9yZS9wcml2YWN5LXBvbGljeS9wcml2YWN5LXBvbGljeS5hY3Rpb25zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHsgQXBpRXJyb3JSZXNwb25zZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2FwaS5pbnRlcmZhY2UnO1xuXG5leHBvcnQgY2xhc3MgQWN0aW9uRmFjdG9yeSB7XG4gIHB1YmxpYyBsb2FkKGRvY3VtZW50SWQ6IHN0cmluZyk6IExvYWQge1xuICAgIHJldHVybiBuZXcgTG9hZChkb2N1bWVudElkKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgSW50ZXJuYWxBY3Rpb25GYWN0b3J5IGV4dGVuZHMgQWN0aW9uRmFjdG9yeSB7XG4gIHB1YmxpYyBsb2FkU3VjY2Vzcyhkb2N1bWVudDogc3RyaW5nKTogTG9hZFN1Y2Nlc3Mge1xuICAgIHJldHVybiBuZXcgTG9hZFN1Y2Nlc3MoZG9jdW1lbnQpO1xuICB9XG5cbiAgcHVibGljIGxvYWRGYWlsdXJlKGVycm9yOiBBcGlFcnJvclJlc3BvbnNlKTogTG9hZEZhaWx1cmUge1xuICAgIHJldHVybiBuZXcgTG9hZEZhaWx1cmUoZXJyb3IpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBMb2FkIGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBUeXBlID0gJ1tQcml2YWN5IFBvbGljeV0gTG9hZCc7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlID0gTG9hZC5UeXBlO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgZG9jdW1lbnRJZDogc3RyaW5nKSB7IH1cbn1cblxuZXhwb3J0IGNsYXNzIExvYWRTdWNjZXNzIGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBUeXBlID0gJ1tQcml2YWN5IFBvbGljeV0gTG9hZCBTdWNjZXNzJztcbiAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSBMb2FkU3VjY2Vzcy5UeXBlO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgZG9jdW1lbnQ6IHN0cmluZykgeyB9XG59XG5cbmV4cG9ydCBjbGFzcyBMb2FkRmFpbHVyZSBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVHlwZSA9ICdbUHJpdmFjeSBQb2xpY3ldIExvYWQgRmFpbHVyZSc7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlID0gTG9hZEZhaWx1cmUuVHlwZTtcbiAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IGVycm9yOiBBcGlFcnJvclJlc3BvbnNlKSB7IH1cbn1cblxuZXhwb3J0IHR5cGUgQW55ID0gTG9hZCB8IExvYWRTdWNjZXNzIHwgTG9hZEZhaWx1cmU7XG4iXX0=
