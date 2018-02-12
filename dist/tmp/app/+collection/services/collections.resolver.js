"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var collections_service_1 = require("../../shared/services/collections.service");
var CollectionsResolver = (function () {
    function CollectionsResolver(collectionsService) {
        this.collectionsService = collectionsService;
    }
    CollectionsResolver.prototype.resolve = function () {
        this.collectionsService.reset();
        this.collectionsService.load().subscribe();
        return this.collectionsService.data.map(function (collections) { return collections.items.length > 0; }).filter(function (data) { return data; }).take(1);
    };
    CollectionsResolver.decorators = [
        { type: core_1.Injectable },
    ];
    CollectionsResolver.ctorParameters = function () { return [
        { type: collections_service_1.CollectionsService, },
    ]; };
    return CollectionsResolver;
}());
exports.CollectionsResolver = CollectionsResolver;
//# sourceMappingURL=collections.resolver.js.map