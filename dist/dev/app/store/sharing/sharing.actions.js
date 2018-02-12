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
    ActionFactory.prototype.createAssetShareLink = function (assetId, subclipMarkers) {
        return new CreateAssetShareLink(assetId, subclipMarkers);
    };
    ActionFactory.prototype.emailAssetShareLink = function (assetId, markers, parameters, properties) {
        return new EmailAssetShareLink(assetId, markers, parameters, properties);
    };
    ActionFactory.prototype.emailCollectionShareLink = function (collectionId, parameters, reloadType) {
        return new EmailCollectionShareLink(collectionId, parameters, reloadType);
    };
    return ActionFactory;
}());
exports.ActionFactory = ActionFactory;
var InternalActionFactory = (function (_super) {
    __extends(InternalActionFactory, _super);
    function InternalActionFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InternalActionFactory.prototype.createAssetShareLinkSuccess = function (link) {
        return new CreateAssetShareLinkSuccess(link);
    };
    InternalActionFactory.prototype.emailCollectionShareLinkSuccess = function (reloadType) {
        return new EmailCollectionShareLinkSuccess(reloadType);
    };
    return InternalActionFactory;
}(ActionFactory));
exports.InternalActionFactory = InternalActionFactory;
var CreateAssetShareLink = (function () {
    function CreateAssetShareLink(assetId, markers) {
        this.assetId = assetId;
        this.markers = markers;
        this.type = CreateAssetShareLink.Type;
    }
    CreateAssetShareLink.Type = '[Sharing] Create Asset Share Link';
    return CreateAssetShareLink;
}());
exports.CreateAssetShareLink = CreateAssetShareLink;
var CreateAssetShareLinkSuccess = (function () {
    function CreateAssetShareLinkSuccess(link) {
        this.link = link;
        this.type = CreateAssetShareLinkSuccess.Type;
    }
    CreateAssetShareLinkSuccess.Type = '[Sharing] Create Asset Share Link Success';
    return CreateAssetShareLinkSuccess;
}());
exports.CreateAssetShareLinkSuccess = CreateAssetShareLinkSuccess;
var EmailCollectionShareLink = (function () {
    function EmailCollectionShareLink(collectionId, parameters, reloadType) {
        this.collectionId = collectionId;
        this.parameters = parameters;
        this.reloadType = reloadType;
        this.type = EmailCollectionShareLink.Type;
    }
    EmailCollectionShareLink.Type = '[Sharing] Email Collection Share Link';
    return EmailCollectionShareLink;
}());
exports.EmailCollectionShareLink = EmailCollectionShareLink;
var EmailCollectionShareLinkSuccess = (function () {
    function EmailCollectionShareLinkSuccess(reloadType) {
        this.reloadType = reloadType;
        this.type = EmailCollectionShareLinkSuccess.Type;
    }
    EmailCollectionShareLinkSuccess.Type = '[Sharing] Email Collection Share Link Success';
    return EmailCollectionShareLinkSuccess;
}());
exports.EmailCollectionShareLinkSuccess = EmailCollectionShareLinkSuccess;
var EmailAssetShareLink = (function () {
    function EmailAssetShareLink(assetId, markers, parameters, properties) {
        this.assetId = assetId;
        this.markers = markers;
        this.parameters = parameters;
        this.properties = properties;
        this.type = EmailAssetShareLink.Type;
    }
    EmailAssetShareLink.Type = '[Sharing] Email Asset Share Link';
    return EmailAssetShareLink;
}());
exports.EmailAssetShareLink = EmailAssetShareLink;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9zaGFyaW5nL3NoYXJpbmcuYWN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFNQTtJQUFBO0lBbUJBLENBQUM7SUFsQlEsNENBQW9CLEdBQTNCLFVBQTRCLE9BQWUsRUFBRSxjQUE4QjtRQUN6RSxNQUFNLENBQUMsSUFBSSxvQkFBb0IsQ0FBQyxPQUFPLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVNLDJDQUFtQixHQUExQixVQUNFLE9BQWUsRUFDZixPQUF1QixFQUN2QixVQUFnQyxFQUNoQyxVQUFnQjtRQUVoQixNQUFNLENBQUMsSUFBSSxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUMzRSxDQUFDO0lBRU0sZ0RBQXdCLEdBQS9CLFVBQ0UsWUFBb0IsRUFBRSxVQUFxQyxFQUFFLFVBQWdDO1FBRTdGLE1BQU0sQ0FBQyxJQUFJLHdCQUF3QixDQUFDLFlBQVksRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDNUUsQ0FBQztJQUNILG9CQUFDO0FBQUQsQ0FuQkEsQUFtQkMsSUFBQTtBQW5CWSxzQ0FBYTtBQXFCMUI7SUFBMkMseUNBQWE7SUFBeEQ7O0lBUUEsQ0FBQztJQVBRLDJEQUEyQixHQUFsQyxVQUFtQyxJQUFZO1FBQzdDLE1BQU0sQ0FBQyxJQUFJLDJCQUEyQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFTSwrREFBK0IsR0FBdEMsVUFBdUMsVUFBZ0M7UUFDckUsTUFBTSxDQUFDLElBQUksK0JBQStCLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUNILDRCQUFDO0FBQUQsQ0FSQSxBQVFDLENBUjBDLGFBQWEsR0FRdkQ7QUFSWSxzREFBcUI7QUFVbEM7SUFHRSw4QkFBNEIsT0FBZSxFQUFrQixPQUF1QjtRQUF4RCxZQUFPLEdBQVAsT0FBTyxDQUFRO1FBQWtCLFlBQU8sR0FBUCxPQUFPLENBQWdCO1FBRHBFLFNBQUksR0FBRyxvQkFBb0IsQ0FBQyxJQUFJLENBQUM7SUFDdUMsQ0FBQztJQUZsRSx5QkFBSSxHQUFHLG1DQUFtQyxDQUFDO0lBR3BFLDJCQUFDO0NBSkQsQUFJQyxJQUFBO0FBSlksb0RBQW9CO0FBTWpDO0lBR0UscUNBQTRCLElBQVk7UUFBWixTQUFJLEdBQUosSUFBSSxDQUFRO1FBRHhCLFNBQUksR0FBRywyQkFBMkIsQ0FBQyxJQUFJLENBQUM7SUFDWixDQUFDO0lBRnRCLGdDQUFJLEdBQUcsMkNBQTJDLENBQUM7SUFHNUUsa0NBQUM7Q0FKRCxBQUlDLElBQUE7QUFKWSxrRUFBMkI7QUFNeEM7SUFHRSxrQ0FDa0IsWUFBb0IsRUFDcEIsVUFBcUMsRUFDckMsVUFBZ0M7UUFGaEMsaUJBQVksR0FBWixZQUFZLENBQVE7UUFDcEIsZUFBVSxHQUFWLFVBQVUsQ0FBMkI7UUFDckMsZUFBVSxHQUFWLFVBQVUsQ0FBc0I7UUFKbEMsU0FBSSxHQUFHLHdCQUF3QixDQUFDLElBQUksQ0FBQztJQUtqRCxDQUFDO0lBTmtCLDZCQUFJLEdBQUcsdUNBQXVDLENBQUM7SUFPeEUsK0JBQUM7Q0FSRCxBQVFDLElBQUE7QUFSWSw0REFBd0I7QUFVckM7SUFHRSx5Q0FBNEIsVUFBZ0M7UUFBaEMsZUFBVSxHQUFWLFVBQVUsQ0FBc0I7UUFENUMsU0FBSSxHQUFHLCtCQUErQixDQUFDLElBQUksQ0FBQztJQUNJLENBQUM7SUFGMUMsb0NBQUksR0FBRywrQ0FBK0MsQ0FBQztJQUdoRixzQ0FBQztDQUpELEFBSUMsSUFBQTtBQUpZLDBFQUErQjtBQU01QztJQUdFLDZCQUNrQixPQUFlLEVBQ2YsT0FBdUIsRUFDdkIsVUFBZ0MsRUFDaEMsVUFBZ0I7UUFIaEIsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUNmLFlBQU8sR0FBUCxPQUFPLENBQWdCO1FBQ3ZCLGVBQVUsR0FBVixVQUFVLENBQXNCO1FBQ2hDLGVBQVUsR0FBVixVQUFVLENBQU07UUFMbEIsU0FBSSxHQUFHLG1CQUFtQixDQUFDLElBQUksQ0FBQztJQU01QyxDQUFDO0lBUGtCLHdCQUFJLEdBQUcsa0NBQWtDLENBQUM7SUFRbkUsMEJBQUM7Q0FURCxBQVNDLElBQUE7QUFUWSxrREFBbUIiLCJmaWxlIjoiYXBwL3N0b3JlL3NoYXJpbmcvc2hhcmluZy5hY3Rpb25zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuXG5pbXBvcnQgeyBTdWJjbGlwTWFya2VycyB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL3N1YmNsaXAtbWFya2Vycyc7XG5pbXBvcnQgeyBBc3NldFNoYXJlUGFyYW1ldGVycywgQ29sbGVjdGlvblNoYXJlUGFyYW1ldGVycywgUG9qbyB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2NvbW1vbi5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQ29sbGVjdGlvblJlbG9hZFR5cGUgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9jb2xsZWN0aW9uLmludGVyZmFjZSc7XG5cbmV4cG9ydCBjbGFzcyBBY3Rpb25GYWN0b3J5IHtcbiAgcHVibGljIGNyZWF0ZUFzc2V0U2hhcmVMaW5rKGFzc2V0SWQ6IG51bWJlciwgc3ViY2xpcE1hcmtlcnM6IFN1YmNsaXBNYXJrZXJzKTogQ3JlYXRlQXNzZXRTaGFyZUxpbmsge1xuICAgIHJldHVybiBuZXcgQ3JlYXRlQXNzZXRTaGFyZUxpbmsoYXNzZXRJZCwgc3ViY2xpcE1hcmtlcnMpO1xuICB9XG5cbiAgcHVibGljIGVtYWlsQXNzZXRTaGFyZUxpbmsoXG4gICAgYXNzZXRJZDogbnVtYmVyLFxuICAgIG1hcmtlcnM6IFN1YmNsaXBNYXJrZXJzLFxuICAgIHBhcmFtZXRlcnM6IEFzc2V0U2hhcmVQYXJhbWV0ZXJzLFxuICAgIHByb3BlcnRpZXM6IFBvam9cbiAgKTogRW1haWxBc3NldFNoYXJlTGluayB7XG4gICAgcmV0dXJuIG5ldyBFbWFpbEFzc2V0U2hhcmVMaW5rKGFzc2V0SWQsIG1hcmtlcnMsIHBhcmFtZXRlcnMsIHByb3BlcnRpZXMpO1xuICB9XG5cbiAgcHVibGljIGVtYWlsQ29sbGVjdGlvblNoYXJlTGluayhcbiAgICBjb2xsZWN0aW9uSWQ6IG51bWJlciwgcGFyYW1ldGVyczogQ29sbGVjdGlvblNoYXJlUGFyYW1ldGVycywgcmVsb2FkVHlwZTogQ29sbGVjdGlvblJlbG9hZFR5cGVcbiAgKTogRW1haWxDb2xsZWN0aW9uU2hhcmVMaW5rIHtcbiAgICByZXR1cm4gbmV3IEVtYWlsQ29sbGVjdGlvblNoYXJlTGluayhjb2xsZWN0aW9uSWQsIHBhcmFtZXRlcnMsIHJlbG9hZFR5cGUpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBJbnRlcm5hbEFjdGlvbkZhY3RvcnkgZXh0ZW5kcyBBY3Rpb25GYWN0b3J5IHtcbiAgcHVibGljIGNyZWF0ZUFzc2V0U2hhcmVMaW5rU3VjY2VzcyhsaW5rOiBzdHJpbmcpOiBDcmVhdGVBc3NldFNoYXJlTGlua1N1Y2Nlc3Mge1xuICAgIHJldHVybiBuZXcgQ3JlYXRlQXNzZXRTaGFyZUxpbmtTdWNjZXNzKGxpbmspO1xuICB9XG5cbiAgcHVibGljIGVtYWlsQ29sbGVjdGlvblNoYXJlTGlua1N1Y2Nlc3MocmVsb2FkVHlwZTogQ29sbGVjdGlvblJlbG9hZFR5cGUpOiBFbWFpbENvbGxlY3Rpb25TaGFyZUxpbmtTdWNjZXNzIHtcbiAgICByZXR1cm4gbmV3IEVtYWlsQ29sbGVjdGlvblNoYXJlTGlua1N1Y2Nlc3MocmVsb2FkVHlwZSk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIENyZWF0ZUFzc2V0U2hhcmVMaW5rIGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBUeXBlID0gJ1tTaGFyaW5nXSBDcmVhdGUgQXNzZXQgU2hhcmUgTGluayc7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlID0gQ3JlYXRlQXNzZXRTaGFyZUxpbmsuVHlwZTtcbiAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IGFzc2V0SWQ6IG51bWJlciwgcHVibGljIHJlYWRvbmx5IG1hcmtlcnM6IFN1YmNsaXBNYXJrZXJzKSB7IH1cbn1cblxuZXhwb3J0IGNsYXNzIENyZWF0ZUFzc2V0U2hhcmVMaW5rU3VjY2VzcyBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVHlwZSA9ICdbU2hhcmluZ10gQ3JlYXRlIEFzc2V0IFNoYXJlIExpbmsgU3VjY2Vzcyc7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlID0gQ3JlYXRlQXNzZXRTaGFyZUxpbmtTdWNjZXNzLlR5cGU7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBsaW5rOiBzdHJpbmcpIHsgfVxufVxuXG5leHBvcnQgY2xhc3MgRW1haWxDb2xsZWN0aW9uU2hhcmVMaW5rIGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBUeXBlID0gJ1tTaGFyaW5nXSBFbWFpbCBDb2xsZWN0aW9uIFNoYXJlIExpbmsnO1xuICBwdWJsaWMgcmVhZG9ubHkgdHlwZSA9IEVtYWlsQ29sbGVjdGlvblNoYXJlTGluay5UeXBlO1xuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgcmVhZG9ubHkgY29sbGVjdGlvbklkOiBudW1iZXIsXG4gICAgcHVibGljIHJlYWRvbmx5IHBhcmFtZXRlcnM6IENvbGxlY3Rpb25TaGFyZVBhcmFtZXRlcnMsXG4gICAgcHVibGljIHJlYWRvbmx5IHJlbG9hZFR5cGU6IENvbGxlY3Rpb25SZWxvYWRUeXBlXG4gICkgeyB9XG59XG5cbmV4cG9ydCBjbGFzcyBFbWFpbENvbGxlY3Rpb25TaGFyZUxpbmtTdWNjZXNzIGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBUeXBlID0gJ1tTaGFyaW5nXSBFbWFpbCBDb2xsZWN0aW9uIFNoYXJlIExpbmsgU3VjY2Vzcyc7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlID0gRW1haWxDb2xsZWN0aW9uU2hhcmVMaW5rU3VjY2Vzcy5UeXBlO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgcmVsb2FkVHlwZTogQ29sbGVjdGlvblJlbG9hZFR5cGUpIHsgfVxufVxuXG5leHBvcnQgY2xhc3MgRW1haWxBc3NldFNoYXJlTGluayBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVHlwZSA9ICdbU2hhcmluZ10gRW1haWwgQXNzZXQgU2hhcmUgTGluayc7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlID0gRW1haWxBc3NldFNoYXJlTGluay5UeXBlO1xuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgcmVhZG9ubHkgYXNzZXRJZDogbnVtYmVyLFxuICAgIHB1YmxpYyByZWFkb25seSBtYXJrZXJzOiBTdWJjbGlwTWFya2VycyxcbiAgICBwdWJsaWMgcmVhZG9ubHkgcGFyYW1ldGVyczogQXNzZXRTaGFyZVBhcmFtZXRlcnMsXG4gICAgcHVibGljIHJlYWRvbmx5IHByb3BlcnRpZXM6IFBvam9cbiAgKSB7IH1cbn1cblxuZXhwb3J0IHR5cGUgQW55ID0gQ3JlYXRlQXNzZXRTaGFyZUxpbmsgfCBDcmVhdGVBc3NldFNoYXJlTGlua1N1Y2Nlc3MgfCBFbWFpbEFzc2V0U2hhcmVMaW5rIHwgRW1haWxDb2xsZWN0aW9uU2hhcmVMaW5rXG4gIHwgRW1haWxDb2xsZWN0aW9uU2hhcmVMaW5rU3VjY2VzcztcbiJdfQ==
