"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var quotes_service_1 = require("../../../shared/services/quotes.service");
var commerce_capabilities_1 = require("../../services/commerce.capabilities");
var app_store_1 = require("../../../app.store");
var wz_dialog_service_1 = require("../../../shared/modules/wz-dialog/services/wz.dialog.service");
var QuotesComponent = (function () {
    function QuotesComponent(userCan, quotesService, store, router, dialogService) {
        var _this = this;
        this.userCan = userCan;
        this.quotesService = quotesService;
        this.store = store;
        this.router = router;
        this.dialogService = dialogService;
        this.rejectQuote = function () {
            _this.quotesService.rejectQuote(_this.quoteToReject.id).subscribe(function () {
                _this.quotesService.getQuotes(_this.userCan.administerQuotes(), _this.params).subscribe();
            });
        };
        this.quotes = this.quotesService.data;
        this.buildFilterOptions();
        this.buildSortOptions();
        this.config = this.store.snapshotCloned(function (state) { return state.uiConfig.components.cart.config; });
    }
    QuotesComponent.prototype.changePage = function (i) {
        this.buildRouteParams({ i: i });
        this.router.navigate(['/quotes', this.params]);
    };
    QuotesComponent.prototype.onSortResults = function (sort) {
        this.currentSort = sort;
        this.buildRouteParams(sort.sort);
        this.router.navigate(['/quotes', this.params]);
    };
    QuotesComponent.prototype.onSearch = function (query) {
        this.buildRouteParams(query);
        this.quotesService.getQuotes(this.userCan.administerQuotes(), this.params).subscribe();
    };
    QuotesComponent.prototype.onFilterResults = function (filter) {
        this.currentFilter = filter;
        if (!filter.status) {
            delete this.params.status;
        }
        else {
            var newParams = Object.assign({}, filter.status, { i: 1 });
            this.buildRouteParams(newParams);
        }
        this.router.navigate(['/quotes', this.params]);
    };
    QuotesComponent.prototype.onEditQuote = function (quoteId) {
        var _this = this;
        this.quotesService.setFocused(quoteId).subscribe(function (quote) {
            _this.router.navigate(['/active-quote']);
        });
    };
    QuotesComponent.prototype.onSetAsFocusedQuote = function (quoteId) {
        this.quotesService.setFocused(quoteId).subscribe();
    };
    QuotesComponent.prototype.onRejectQuote = function (quote) {
        this.quoteToReject = quote;
        this.dialogService.openConfirmationDialog({
            title: 'QUOTE.REJECT.TITLE',
            message: 'QUOTE.REJECT.MESSAGE',
            accept: 'QUOTE.REJECT.ACCEPT',
            decline: 'QUOTE.REJECT.DECLINE'
        }, this.rejectQuote);
    };
    QuotesComponent.prototype.createNewQuote = function () {
        var _this = this;
        this.quotesService.createEmpty().subscribe(function () {
            _this.router.navigate(['/active-quote']);
        });
    };
    QuotesComponent.prototype.buildRouteParams = function (params) {
        this.params = Object.assign({}, this.params, params);
    };
    QuotesComponent.prototype.buildSortOptions = function () {
        this.sortOptions = this.theSortOptions;
        this.currentSort = this.sortOptions[0].first;
    };
    QuotesComponent.prototype.buildFilterOptions = function () {
        this.filterOptions = this.theFilterOptions;
        if (this.userCan.administerQuotes())
            this.addPendingFilterOption();
        this.currentFilter = this.filterOptions[0].first;
    };
    QuotesComponent.prototype.addPendingFilterOption = function () {
        this.filterOptions[1]['fifth'] = {
            'id': 5,
            'name': 'QUOTE.INDEX.FILTER.PENDING',
            'value': 'pending',
            'status': { 'status': 'PENDING' }
        };
    };
    Object.defineProperty(QuotesComponent.prototype, "theSortOptions", {
        get: function () {
            return [
                {
                    'first': {
                        'id': 1,
                        'name': 'QUOTE.INDEX.SORT.DATE_CREATED_DESC',
                        'value': 'createdNewestFirst',
                        'sort': { 's': 'createdOn', 'd': true }
                    },
                    'second': {
                        'id': 2,
                        'name': 'QUOTE.INDEX.SORT.DATE_CREATED_ASC',
                        'value': 'createdOldestFirst',
                        'sort': { 's': 'createdOn', 'd': false }
                    }
                },
                {
                    'first': {
                        'id': 3,
                        'name': 'QUOTE.INDEX.SORT.STATUS_ASC',
                        'value': 'statusAsc',
                        'sort': { 's': 'quoteStatus', 'd': false }
                    },
                    'second': {
                        'id': 4,
                        'name': 'QUOTE.INDEX.SORT.STATUS_DESC',
                        'value': 'statusDesc',
                        'sort': { 's': 'quoteStatus', 'd': true }
                    }
                },
                {
                    'first': {
                        'id': 5,
                        'name': 'QUOTE.INDEX.SORT.EXPIRATION_DATE_DESC',
                        'value': 'expirationDate',
                        'sort': { 's': 'expirationDate', 'd': true }
                    },
                    'second': {
                        'id': 6,
                        'name': 'QUOTE.INDEX.SORT.EXPIRATION_DATE_ASC',
                        'value': 'expirationDate',
                        'sort': { 's': 'expirationDate', 'd': false }
                    }
                }
            ];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuotesComponent.prototype, "theFilterOptions", {
        get: function () {
            return [
                {
                    'first': {
                        'id': 0,
                        'name': 'QUOTE.INDEX.FILTER.ALL',
                        'value': 'all'
                    }
                },
                {
                    'first': {
                        'id': 1,
                        'name': 'QUOTE.INDEX.FILTER.ACTIVE',
                        'value': 'active',
                        'status': { 'status': 'ACTIVE' }
                    },
                    'second': {
                        'id': 2,
                        'name': 'QUOTE.INDEX.FILTER.ORDERED',
                        'value': 'ordered',
                        'status': { 'status': 'ORDERED' }
                    },
                    'third': {
                        'id': 3,
                        'name': 'QUOTE.INDEX.FILTER.EXPIRED',
                        'value': 'expired',
                        'status': { 'status': 'EXPIRED' }
                    },
                    'fourth': {
                        'id': 4,
                        'name': 'QUOTE.INDEX.FILTER.CANCELLED',
                        'value': 'cancelled',
                        'status': { 'status': 'CANCELLED' }
                    }
                },
            ];
        },
        enumerable: true,
        configurable: true
    });
    QuotesComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'quotes-component',
                    templateUrl: 'quotes.html',
                    moduleId: module.id,
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    QuotesComponent.ctorParameters = function () { return [
        { type: commerce_capabilities_1.CommerceCapabilities, },
        { type: quotes_service_1.QuotesService, },
        { type: app_store_1.AppStore, },
        { type: router_1.Router, },
        { type: wz_dialog_service_1.WzDialogService, },
    ]; };
    return QuotesComponent;
}());
exports.QuotesComponent = QuotesComponent;
//# sourceMappingURL=quotes.component.js.map