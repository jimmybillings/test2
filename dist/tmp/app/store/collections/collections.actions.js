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
//# sourceMappingURL=collections.actions.js.map