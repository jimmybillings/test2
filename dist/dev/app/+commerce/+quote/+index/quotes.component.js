"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
    QuotesComponent = __decorate([
        core_1.Component({
            selector: 'quotes-component',
            templateUrl: 'quotes.html',
            moduleId: module.id,
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [commerce_capabilities_1.CommerceCapabilities,
            quotes_service_1.QuotesService,
            app_store_1.AppStore,
            router_1.Router,
            wz_dialog_service_1.WzDialogService])
    ], QuotesComponent);
    return QuotesComponent;
}());
exports.QuotesComponent = QuotesComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvK3F1b3RlLytpbmRleC9xdW90ZXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQW1FO0FBQ25FLDBDQUF5RDtBQUN6RCwwRUFBd0U7QUFDeEUsOEVBQTRFO0FBQzVFLGdEQUE4QztBQUc5QyxrR0FBK0Y7QUFRL0Y7SUFTRSx5QkFDUyxPQUE2QixFQUM1QixhQUE0QixFQUM1QixLQUFlLEVBQ2YsTUFBYyxFQUNkLGFBQThCO1FBTHhDLGlCQVdDO1FBVlEsWUFBTyxHQUFQLE9BQU8sQ0FBc0I7UUFDNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsVUFBSyxHQUFMLEtBQUssQ0FBVTtRQUNmLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxrQkFBYSxHQUFiLGFBQWEsQ0FBaUI7UUE4RGhDLGdCQUFXLEdBQUc7WUFDcEIsS0FBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsS0FBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUM7Z0JBQzlELEtBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEtBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxLQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDekYsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUE7UUFoRUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQztRQUN0QyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBckMsQ0FBcUMsQ0FBQyxDQUFDO0lBQzFGLENBQUM7SUFFTSxvQ0FBVSxHQUFqQixVQUFrQixDQUFTO1FBQ3pCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsR0FBQSxFQUFFLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRU0sdUNBQWEsR0FBcEIsVUFBcUIsSUFBUztRQUM1QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztRQUN4QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFTSxrQ0FBUSxHQUFmLFVBQWdCLEtBQW9CO1FBQ2xDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3pGLENBQUM7SUFFTSx5Q0FBZSxHQUF0QixVQUF1QixNQUFXO1FBQ2hDLElBQUksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDO1FBQzVCLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDbkIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUM1QixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFJLFNBQVMsR0FBUSxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDaEUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRW5DLENBQUM7UUFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRU0scUNBQVcsR0FBbEIsVUFBbUIsT0FBZTtRQUFsQyxpQkFJQztRQUhDLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFDLEtBQVk7WUFDNUQsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO1FBQzFDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLDZDQUFtQixHQUExQixVQUEyQixPQUFlO1FBQ3hDLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3JELENBQUM7SUFFTSx1Q0FBYSxHQUFwQixVQUFxQixLQUFZO1FBQy9CLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1FBQzNCLElBQUksQ0FBQyxhQUFhLENBQUMsc0JBQXNCLENBQUM7WUFDeEMsS0FBSyxFQUFFLG9CQUFvQjtZQUMzQixPQUFPLEVBQUUsc0JBQXNCO1lBQy9CLE1BQU0sRUFBRSxxQkFBcUI7WUFDN0IsT0FBTyxFQUFFLHNCQUFzQjtTQUNoQyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN2QixDQUFDO0lBRU0sd0NBQWMsR0FBckI7UUFBQSxpQkFJQztRQUhDLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxDQUFDO1lBQ3pDLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztRQUMxQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFRTywwQ0FBZ0IsR0FBeEIsVUFBeUIsTUFBVztRQUNsQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVPLDBDQUFnQixHQUF4QjtRQUNFLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQztRQUN2QyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQy9DLENBQUM7SUFFTyw0Q0FBa0IsR0FBMUI7UUFDRSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztRQUMzQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFBQyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztRQUNuRSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQ25ELENBQUM7SUFFTyxnREFBc0IsR0FBOUI7UUFDRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHO1lBQy9CLElBQUksRUFBRSxDQUFDO1lBQ1AsTUFBTSxFQUFFLDRCQUE0QjtZQUNwQyxPQUFPLEVBQUUsU0FBUztZQUNsQixRQUFRLEVBQUUsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFO1NBQ2xDLENBQUM7SUFDSixDQUFDO0lBRUQsc0JBQVksMkNBQWM7YUFBMUI7WUFDRSxNQUFNLENBQUM7Z0JBQ0w7b0JBQ0UsT0FBTyxFQUFFO3dCQUNQLElBQUksRUFBRSxDQUFDO3dCQUNQLE1BQU0sRUFBRSxvQ0FBb0M7d0JBQzVDLE9BQU8sRUFBRSxvQkFBb0I7d0JBQzdCLE1BQU0sRUFBRSxFQUFFLEdBQUcsRUFBRSxXQUFXLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRTtxQkFDeEM7b0JBQ0QsUUFBUSxFQUFFO3dCQUNSLElBQUksRUFBRSxDQUFDO3dCQUNQLE1BQU0sRUFBRSxtQ0FBbUM7d0JBQzNDLE9BQU8sRUFBRSxvQkFBb0I7d0JBQzdCLE1BQU0sRUFBRSxFQUFFLEdBQUcsRUFBRSxXQUFXLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRTtxQkFDekM7aUJBQ0Y7Z0JBQ0Q7b0JBQ0UsT0FBTyxFQUFFO3dCQUNQLElBQUksRUFBRSxDQUFDO3dCQUNQLE1BQU0sRUFBRSw2QkFBNkI7d0JBQ3JDLE9BQU8sRUFBRSxXQUFXO3dCQUNwQixNQUFNLEVBQUUsRUFBRSxHQUFHLEVBQUUsYUFBYSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUU7cUJBQzNDO29CQUNELFFBQVEsRUFBRTt3QkFDUixJQUFJLEVBQUUsQ0FBQzt3QkFDUCxNQUFNLEVBQUUsOEJBQThCO3dCQUN0QyxPQUFPLEVBQUUsWUFBWTt3QkFDckIsTUFBTSxFQUFFLEVBQUUsR0FBRyxFQUFFLGFBQWEsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFO3FCQUMxQztpQkFDRjtnQkFDRDtvQkFDRSxPQUFPLEVBQUU7d0JBQ1AsSUFBSSxFQUFFLENBQUM7d0JBQ1AsTUFBTSxFQUFFLHVDQUF1Qzt3QkFDL0MsT0FBTyxFQUFFLGdCQUFnQjt3QkFDekIsTUFBTSxFQUFFLEVBQUUsR0FBRyxFQUFFLGdCQUFnQixFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUU7cUJBQzdDO29CQUNELFFBQVEsRUFBRTt3QkFDUixJQUFJLEVBQUUsQ0FBQzt3QkFDUCxNQUFNLEVBQUUsc0NBQXNDO3dCQUM5QyxPQUFPLEVBQUUsZ0JBQWdCO3dCQUN6QixNQUFNLEVBQUUsRUFBRSxHQUFHLEVBQUUsZ0JBQWdCLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRTtxQkFDOUM7aUJBQ0Y7YUFDRixDQUFDO1FBQ0osQ0FBQzs7O09BQUE7SUFFRCxzQkFBWSw2Q0FBZ0I7YUFBNUI7WUFDRSxNQUFNLENBQUM7Z0JBQ0w7b0JBQ0UsT0FBTyxFQUFFO3dCQUNQLElBQUksRUFBRSxDQUFDO3dCQUNQLE1BQU0sRUFBRSx3QkFBd0I7d0JBQ2hDLE9BQU8sRUFBRSxLQUFLO3FCQUNmO2lCQUNGO2dCQUNEO29CQUNFLE9BQU8sRUFBRTt3QkFDUCxJQUFJLEVBQUUsQ0FBQzt3QkFDUCxNQUFNLEVBQUUsMkJBQTJCO3dCQUNuQyxPQUFPLEVBQUUsUUFBUTt3QkFDakIsUUFBUSxFQUFFLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRTtxQkFDakM7b0JBQ0QsUUFBUSxFQUFFO3dCQUNSLElBQUksRUFBRSxDQUFDO3dCQUNQLE1BQU0sRUFBRSw0QkFBNEI7d0JBQ3BDLE9BQU8sRUFBRSxTQUFTO3dCQUNsQixRQUFRLEVBQUUsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFO3FCQUNsQztvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsSUFBSSxFQUFFLENBQUM7d0JBQ1AsTUFBTSxFQUFFLDRCQUE0Qjt3QkFDcEMsT0FBTyxFQUFFLFNBQVM7d0JBQ2xCLFFBQVEsRUFBRSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUU7cUJBQ2xDO29CQUNELFFBQVEsRUFBRTt3QkFDUixJQUFJLEVBQUUsQ0FBQzt3QkFDUCxNQUFNLEVBQUUsOEJBQThCO3dCQUN0QyxPQUFPLEVBQUUsV0FBVzt3QkFDcEIsUUFBUSxFQUFFLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRTtxQkFDcEM7aUJBQ0Y7YUFDRixDQUFDO1FBQ0osQ0FBQzs7O09BQUE7SUE3TFUsZUFBZTtRQU4zQixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGtCQUFrQjtZQUM1QixXQUFXLEVBQUUsYUFBYTtZQUMxQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsZUFBZSxFQUFFLDhCQUF1QixDQUFDLE1BQU07U0FDaEQsQ0FBQzt5Q0FXa0IsNENBQW9CO1lBQ2IsOEJBQWE7WUFDckIsb0JBQVE7WUFDUCxlQUFNO1lBQ0MsbUNBQWU7T0FkN0IsZUFBZSxDQThMM0I7SUFBRCxzQkFBQztDQTlMRCxBQThMQyxJQUFBO0FBOUxZLDBDQUFlIiwiZmlsZSI6ImFwcC8rY29tbWVyY2UvK3F1b3RlLytpbmRleC9xdW90ZXMuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyLCBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBRdW90ZXNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL3F1b3Rlcy5zZXJ2aWNlJztcbmltcG9ydCB7IENvbW1lcmNlQ2FwYWJpbGl0aWVzIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvY29tbWVyY2UuY2FwYWJpbGl0aWVzJztcbmltcG9ydCB7IEFwcFN0b3JlIH0gZnJvbSAnLi4vLi4vLi4vYXBwLnN0b3JlJztcbmltcG9ydCB7IFF1b3RlLCBRdW90ZXMgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9jb21tZXJjZS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBXekRpYWxvZ1NlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kdWxlcy93ei1kaWFsb2cvc2VydmljZXMvd3ouZGlhbG9nLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdxdW90ZXMtY29tcG9uZW50JyxcbiAgdGVtcGxhdGVVcmw6ICdxdW90ZXMuaHRtbCcsXG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIFF1b3Rlc0NvbXBvbmVudCB7XG4gIHB1YmxpYyBxdW90ZXM6IE9ic2VydmFibGU8UXVvdGVzPjtcbiAgcHVibGljIGNvbmZpZzogYW55O1xuICBwdWJsaWMgc29ydE9wdGlvbnM6IGFueVtdO1xuICBwdWJsaWMgZmlsdGVyT3B0aW9uczogYW55W107XG4gIHB1YmxpYyBjdXJyZW50U29ydDogYW55O1xuICBwdWJsaWMgY3VycmVudEZpbHRlcjogYW55O1xuICBwcml2YXRlIHBhcmFtczogYW55O1xuICBwcml2YXRlIHF1b3RlVG9SZWplY3Q6IFF1b3RlO1xuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgdXNlckNhbjogQ29tbWVyY2VDYXBhYmlsaXRpZXMsXG4gICAgcHJpdmF0ZSBxdW90ZXNTZXJ2aWNlOiBRdW90ZXNTZXJ2aWNlLFxuICAgIHByaXZhdGUgc3RvcmU6IEFwcFN0b3JlLFxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXG4gICAgcHJpdmF0ZSBkaWFsb2dTZXJ2aWNlOiBXekRpYWxvZ1NlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy5xdW90ZXMgPSB0aGlzLnF1b3Rlc1NlcnZpY2UuZGF0YTtcbiAgICB0aGlzLmJ1aWxkRmlsdGVyT3B0aW9ucygpO1xuICAgIHRoaXMuYnVpbGRTb3J0T3B0aW9ucygpO1xuICAgIHRoaXMuY29uZmlnID0gdGhpcy5zdG9yZS5zbmFwc2hvdENsb25lZChzdGF0ZSA9PiBzdGF0ZS51aUNvbmZpZy5jb21wb25lbnRzLmNhcnQuY29uZmlnKTtcbiAgfVxuXG4gIHB1YmxpYyBjaGFuZ2VQYWdlKGk6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuYnVpbGRSb3V0ZVBhcmFtcyh7IGkgfSk7XG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvcXVvdGVzJywgdGhpcy5wYXJhbXNdKTtcbiAgfVxuXG4gIHB1YmxpYyBvblNvcnRSZXN1bHRzKHNvcnQ6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuY3VycmVudFNvcnQgPSBzb3J0O1xuICAgIHRoaXMuYnVpbGRSb3V0ZVBhcmFtcyhzb3J0LnNvcnQpO1xuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL3F1b3RlcycsIHRoaXMucGFyYW1zXSk7XG4gIH1cblxuICBwdWJsaWMgb25TZWFyY2gocXVlcnk6IHsgcTogc3RyaW5nIH0pOiB2b2lkIHtcbiAgICB0aGlzLmJ1aWxkUm91dGVQYXJhbXMocXVlcnkpO1xuICAgIHRoaXMucXVvdGVzU2VydmljZS5nZXRRdW90ZXModGhpcy51c2VyQ2FuLmFkbWluaXN0ZXJRdW90ZXMoKSwgdGhpcy5wYXJhbXMpLnN1YnNjcmliZSgpO1xuICB9XG5cbiAgcHVibGljIG9uRmlsdGVyUmVzdWx0cyhmaWx0ZXI6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuY3VycmVudEZpbHRlciA9IGZpbHRlcjtcbiAgICBpZiAoIWZpbHRlci5zdGF0dXMpIHtcbiAgICAgIGRlbGV0ZSB0aGlzLnBhcmFtcy5zdGF0dXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBuZXdQYXJhbXM6IGFueSA9IE9iamVjdC5hc3NpZ24oe30sIGZpbHRlci5zdGF0dXMsIHsgaTogMSB9KTtcbiAgICAgIHRoaXMuYnVpbGRSb3V0ZVBhcmFtcyhuZXdQYXJhbXMpO1xuXG4gICAgfVxuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL3F1b3RlcycsIHRoaXMucGFyYW1zXSk7XG4gIH1cblxuICBwdWJsaWMgb25FZGl0UXVvdGUocXVvdGVJZDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5xdW90ZXNTZXJ2aWNlLnNldEZvY3VzZWQocXVvdGVJZCkuc3Vic2NyaWJlKChxdW90ZTogUXVvdGUpID0+IHtcbiAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2FjdGl2ZS1xdW90ZSddKTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBvblNldEFzRm9jdXNlZFF1b3RlKHF1b3RlSWQ6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMucXVvdGVzU2VydmljZS5zZXRGb2N1c2VkKHF1b3RlSWQpLnN1YnNjcmliZSgpO1xuICB9XG5cbiAgcHVibGljIG9uUmVqZWN0UXVvdGUocXVvdGU6IFF1b3RlKTogdm9pZCB7XG4gICAgdGhpcy5xdW90ZVRvUmVqZWN0ID0gcXVvdGU7XG4gICAgdGhpcy5kaWFsb2dTZXJ2aWNlLm9wZW5Db25maXJtYXRpb25EaWFsb2coe1xuICAgICAgdGl0bGU6ICdRVU9URS5SRUpFQ1QuVElUTEUnLFxuICAgICAgbWVzc2FnZTogJ1FVT1RFLlJFSkVDVC5NRVNTQUdFJyxcbiAgICAgIGFjY2VwdDogJ1FVT1RFLlJFSkVDVC5BQ0NFUFQnLFxuICAgICAgZGVjbGluZTogJ1FVT1RFLlJFSkVDVC5ERUNMSU5FJ1xuICAgIH0sIHRoaXMucmVqZWN0UXVvdGUpO1xuICB9XG5cbiAgcHVibGljIGNyZWF0ZU5ld1F1b3RlKCk6IHZvaWQge1xuICAgIHRoaXMucXVvdGVzU2VydmljZS5jcmVhdGVFbXB0eSgpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9hY3RpdmUtcXVvdGUnXSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHJlamVjdFF1b3RlID0gKCkgPT4ge1xuICAgIHRoaXMucXVvdGVzU2VydmljZS5yZWplY3RRdW90ZSh0aGlzLnF1b3RlVG9SZWplY3QuaWQpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLnF1b3Rlc1NlcnZpY2UuZ2V0UXVvdGVzKHRoaXMudXNlckNhbi5hZG1pbmlzdGVyUXVvdGVzKCksIHRoaXMucGFyYW1zKS5zdWJzY3JpYmUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgYnVpbGRSb3V0ZVBhcmFtcyhwYXJhbXM6IGFueSkge1xuICAgIHRoaXMucGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5wYXJhbXMsIHBhcmFtcyk7XG4gIH1cblxuICBwcml2YXRlIGJ1aWxkU29ydE9wdGlvbnMoKTogdm9pZCB7XG4gICAgdGhpcy5zb3J0T3B0aW9ucyA9IHRoaXMudGhlU29ydE9wdGlvbnM7XG4gICAgdGhpcy5jdXJyZW50U29ydCA9IHRoaXMuc29ydE9wdGlvbnNbMF0uZmlyc3Q7XG4gIH1cblxuICBwcml2YXRlIGJ1aWxkRmlsdGVyT3B0aW9ucygpOiB2b2lkIHtcbiAgICB0aGlzLmZpbHRlck9wdGlvbnMgPSB0aGlzLnRoZUZpbHRlck9wdGlvbnM7XG4gICAgaWYgKHRoaXMudXNlckNhbi5hZG1pbmlzdGVyUXVvdGVzKCkpIHRoaXMuYWRkUGVuZGluZ0ZpbHRlck9wdGlvbigpO1xuICAgIHRoaXMuY3VycmVudEZpbHRlciA9IHRoaXMuZmlsdGVyT3B0aW9uc1swXS5maXJzdDtcbiAgfVxuXG4gIHByaXZhdGUgYWRkUGVuZGluZ0ZpbHRlck9wdGlvbigpOiB2b2lkIHtcbiAgICB0aGlzLmZpbHRlck9wdGlvbnNbMV1bJ2ZpZnRoJ10gPSB7XG4gICAgICAnaWQnOiA1LFxuICAgICAgJ25hbWUnOiAnUVVPVEUuSU5ERVguRklMVEVSLlBFTkRJTkcnLFxuICAgICAgJ3ZhbHVlJzogJ3BlbmRpbmcnLFxuICAgICAgJ3N0YXR1cyc6IHsgJ3N0YXR1cyc6ICdQRU5ESU5HJyB9XG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IHRoZVNvcnRPcHRpb25zKCk6IGFueVtdIHtcbiAgICByZXR1cm4gW1xuICAgICAge1xuICAgICAgICAnZmlyc3QnOiB7XG4gICAgICAgICAgJ2lkJzogMSxcbiAgICAgICAgICAnbmFtZSc6ICdRVU9URS5JTkRFWC5TT1JULkRBVEVfQ1JFQVRFRF9ERVNDJyxcbiAgICAgICAgICAndmFsdWUnOiAnY3JlYXRlZE5ld2VzdEZpcnN0JyxcbiAgICAgICAgICAnc29ydCc6IHsgJ3MnOiAnY3JlYXRlZE9uJywgJ2QnOiB0cnVlIH1cbiAgICAgICAgfSxcbiAgICAgICAgJ3NlY29uZCc6IHtcbiAgICAgICAgICAnaWQnOiAyLFxuICAgICAgICAgICduYW1lJzogJ1FVT1RFLklOREVYLlNPUlQuREFURV9DUkVBVEVEX0FTQycsXG4gICAgICAgICAgJ3ZhbHVlJzogJ2NyZWF0ZWRPbGRlc3RGaXJzdCcsXG4gICAgICAgICAgJ3NvcnQnOiB7ICdzJzogJ2NyZWF0ZWRPbicsICdkJzogZmFsc2UgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAnZmlyc3QnOiB7XG4gICAgICAgICAgJ2lkJzogMyxcbiAgICAgICAgICAnbmFtZSc6ICdRVU9URS5JTkRFWC5TT1JULlNUQVRVU19BU0MnLFxuICAgICAgICAgICd2YWx1ZSc6ICdzdGF0dXNBc2MnLFxuICAgICAgICAgICdzb3J0JzogeyAncyc6ICdxdW90ZVN0YXR1cycsICdkJzogZmFsc2UgfVxuICAgICAgICB9LFxuICAgICAgICAnc2Vjb25kJzoge1xuICAgICAgICAgICdpZCc6IDQsXG4gICAgICAgICAgJ25hbWUnOiAnUVVPVEUuSU5ERVguU09SVC5TVEFUVVNfREVTQycsXG4gICAgICAgICAgJ3ZhbHVlJzogJ3N0YXR1c0Rlc2MnLFxuICAgICAgICAgICdzb3J0JzogeyAncyc6ICdxdW90ZVN0YXR1cycsICdkJzogdHJ1ZSB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICdmaXJzdCc6IHtcbiAgICAgICAgICAnaWQnOiA1LFxuICAgICAgICAgICduYW1lJzogJ1FVT1RFLklOREVYLlNPUlQuRVhQSVJBVElPTl9EQVRFX0RFU0MnLFxuICAgICAgICAgICd2YWx1ZSc6ICdleHBpcmF0aW9uRGF0ZScsXG4gICAgICAgICAgJ3NvcnQnOiB7ICdzJzogJ2V4cGlyYXRpb25EYXRlJywgJ2QnOiB0cnVlIH1cbiAgICAgICAgfSxcbiAgICAgICAgJ3NlY29uZCc6IHtcbiAgICAgICAgICAnaWQnOiA2LFxuICAgICAgICAgICduYW1lJzogJ1FVT1RFLklOREVYLlNPUlQuRVhQSVJBVElPTl9EQVRFX0FTQycsXG4gICAgICAgICAgJ3ZhbHVlJzogJ2V4cGlyYXRpb25EYXRlJyxcbiAgICAgICAgICAnc29ydCc6IHsgJ3MnOiAnZXhwaXJhdGlvbkRhdGUnLCAnZCc6IGZhbHNlIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIF07XG4gIH1cblxuICBwcml2YXRlIGdldCB0aGVGaWx0ZXJPcHRpb25zKCk6IGFueVtdIHtcbiAgICByZXR1cm4gW1xuICAgICAge1xuICAgICAgICAnZmlyc3QnOiB7XG4gICAgICAgICAgJ2lkJzogMCxcbiAgICAgICAgICAnbmFtZSc6ICdRVU9URS5JTkRFWC5GSUxURVIuQUxMJyxcbiAgICAgICAgICAndmFsdWUnOiAnYWxsJ1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAnZmlyc3QnOiB7XG4gICAgICAgICAgJ2lkJzogMSxcbiAgICAgICAgICAnbmFtZSc6ICdRVU9URS5JTkRFWC5GSUxURVIuQUNUSVZFJyxcbiAgICAgICAgICAndmFsdWUnOiAnYWN0aXZlJyxcbiAgICAgICAgICAnc3RhdHVzJzogeyAnc3RhdHVzJzogJ0FDVElWRScgfVxuICAgICAgICB9LFxuICAgICAgICAnc2Vjb25kJzoge1xuICAgICAgICAgICdpZCc6IDIsXG4gICAgICAgICAgJ25hbWUnOiAnUVVPVEUuSU5ERVguRklMVEVSLk9SREVSRUQnLFxuICAgICAgICAgICd2YWx1ZSc6ICdvcmRlcmVkJyxcbiAgICAgICAgICAnc3RhdHVzJzogeyAnc3RhdHVzJzogJ09SREVSRUQnIH1cbiAgICAgICAgfSxcbiAgICAgICAgJ3RoaXJkJzoge1xuICAgICAgICAgICdpZCc6IDMsXG4gICAgICAgICAgJ25hbWUnOiAnUVVPVEUuSU5ERVguRklMVEVSLkVYUElSRUQnLFxuICAgICAgICAgICd2YWx1ZSc6ICdleHBpcmVkJyxcbiAgICAgICAgICAnc3RhdHVzJzogeyAnc3RhdHVzJzogJ0VYUElSRUQnIH1cbiAgICAgICAgfSxcbiAgICAgICAgJ2ZvdXJ0aCc6IHtcbiAgICAgICAgICAnaWQnOiA0LFxuICAgICAgICAgICduYW1lJzogJ1FVT1RFLklOREVYLkZJTFRFUi5DQU5DRUxMRUQnLFxuICAgICAgICAgICd2YWx1ZSc6ICdjYW5jZWxsZWQnLFxuICAgICAgICAgICdzdGF0dXMnOiB7ICdzdGF0dXMnOiAnQ0FOQ0VMTEVEJyB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgXTtcbiAgfVxufVxuIl19
