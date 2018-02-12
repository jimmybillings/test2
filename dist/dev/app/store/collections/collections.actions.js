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
    ActionFactory.prototype.addAssetToCollection = function (collection, asset) {
        return new AddAssetToCollection(collection, asset);
    };
    return ActionFactory;
}());
exports.ActionFactory = ActionFactory;
var InternalActionFactory = (function (_super) {
    __extends(InternalActionFactory, _super);
    function InternalActionFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return InternalActionFactory;
}(ActionFactory));
exports.InternalActionFactory = InternalActionFactory;
var AddAssetToCollection = (function () {
    function AddAssetToCollection(collection, asset) {
        this.collection = collection;
        this.asset = asset;
        this.type = AddAssetToCollection.Type;
    }
    AddAssetToCollection.Type = '[Collections] add asset to collection';
    return AddAssetToCollection;
}());
exports.AddAssetToCollection = AddAssetToCollection;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9jb2xsZWN0aW9ucy9jb2xsZWN0aW9ucy5hY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUlBO0lBQUE7SUFJQSxDQUFDO0lBSFEsNENBQW9CLEdBQTNCLFVBQTRCLFVBQXNCLEVBQUUsS0FBb0I7UUFDdEUsTUFBTSxDQUFDLElBQUksb0JBQW9CLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFDSCxvQkFBQztBQUFELENBSkEsQUFJQyxJQUFBO0FBSlksc0NBQWE7QUFNMUI7SUFBMkMseUNBQWE7SUFBeEQ7O0lBQTJELENBQUM7SUFBRCw0QkFBQztBQUFELENBQTNELEFBQTRELENBQWpCLGFBQWEsR0FBSTtBQUEvQyxzREFBcUI7QUFFbEM7SUFHRSw4QkFBcUIsVUFBc0IsRUFBVyxLQUFvQjtRQUFyRCxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQVcsVUFBSyxHQUFMLEtBQUssQ0FBZTtRQUQxRCxTQUFJLEdBQUcsb0JBQW9CLENBQUMsSUFBSSxDQUFDO0lBQzZCLENBQUM7SUFGeEQseUJBQUksR0FBRyx1Q0FBdUMsQ0FBQztJQUd4RSwyQkFBQztDQUpELEFBSUMsSUFBQTtBQUpZLG9EQUFvQiIsImZpbGUiOiJhcHAvc3RvcmUvY29sbGVjdGlvbnMvY29sbGVjdGlvbnMuYWN0aW9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFjdGlvbiB9IGZyb20gJ0BuZ3J4L3N0b3JlJztcbmltcG9ydCB7IEVuaGFuY2VkQXNzZXQgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9lbmhhbmNlZC1hc3NldCc7XG5pbXBvcnQgeyBDb2xsZWN0aW9uIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvY29sbGVjdGlvbi5pbnRlcmZhY2UnO1xuXG5leHBvcnQgY2xhc3MgQWN0aW9uRmFjdG9yeSB7XG4gIHB1YmxpYyBhZGRBc3NldFRvQ29sbGVjdGlvbihjb2xsZWN0aW9uOiBDb2xsZWN0aW9uLCBhc3NldDogRW5oYW5jZWRBc3NldCk6IEFkZEFzc2V0VG9Db2xsZWN0aW9uIHtcbiAgICByZXR1cm4gbmV3IEFkZEFzc2V0VG9Db2xsZWN0aW9uKGNvbGxlY3Rpb24sIGFzc2V0KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgSW50ZXJuYWxBY3Rpb25GYWN0b3J5IGV4dGVuZHMgQWN0aW9uRmFjdG9yeSB7IH1cblxuZXhwb3J0IGNsYXNzIEFkZEFzc2V0VG9Db2xsZWN0aW9uIGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBUeXBlID0gJ1tDb2xsZWN0aW9uc10gYWRkIGFzc2V0IHRvIGNvbGxlY3Rpb24nO1xuICBwdWJsaWMgcmVhZG9ubHkgdHlwZSA9IEFkZEFzc2V0VG9Db2xsZWN0aW9uLlR5cGU7XG4gIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGNvbGxlY3Rpb246IENvbGxlY3Rpb24sIHJlYWRvbmx5IGFzc2V0OiBFbmhhbmNlZEFzc2V0KSB7IH1cbn1cblxuZXhwb3J0IHR5cGUgQW55ID0gQWRkQXNzZXRUb0NvbGxlY3Rpb247XG4iXX0=
