"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var app_store_1 = require("../../app.store");
var CollectionLinkComponent = (function () {
    function CollectionLinkComponent(store) {
        this.store = store;
    }
    Object.defineProperty(CollectionLinkComponent.prototype, "assets", {
        set: function (value) {
            this.buildLegacyLink(value);
        },
        enumerable: true,
        configurable: true
    });
    CollectionLinkComponent.prototype.buildLegacyLink = function (assets) {
        var filterSegment;
        filterSegment = assets.reduce(function (prev, current, i) {
            (i !== assets.length - 1) ? prev += current.assetId + ' OR ' : prev += current.assetId;
            return prev;
        }, '');
        this.legacyLink = "https://commerce.wazeedigital.com/license/searchResults.do?search.keywords=id:(" + filterSegment + ")";
    };
    CollectionLinkComponent.prototype.selectInputForCopy = function (event) {
        event.target.select();
    };
    CollectionLinkComponent.prototype.onCopyLegacyLinkButtonClick = function () {
        this.store.dispatch(function (factory) { return factory.snackbar.display('COLLECTION.LINK_COPIED_TOAST'); });
    };
    CollectionLinkComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'collection-link-component',
                    templateUrl: 'collection-link.html',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    CollectionLinkComponent.ctorParameters = function () { return [
        { type: app_store_1.AppStore, },
    ]; };
    CollectionLinkComponent.propDecorators = {
        'assets': [{ type: core_1.Input },],
    };
    return CollectionLinkComponent;
}());
exports.CollectionLinkComponent = CollectionLinkComponent;
//# sourceMappingURL=collection-link.component.js.map