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
var store_1 = require("@ngrx/store");
var collectionOptionsState = {
    currentFilter: {
        'id': 0,
        'name': 'COLLECTION.INDEX.FILTER_DD_MENU.ALL',
        'value': 'all',
        'access': { 'accessLevel': 'all' }
    },
    currentSort: {
        'id': 0,
        'name': 'COLLECTION.INDEX.SORT_DD_MENU.DATE_MOD_NEWEST',
        'value': 'modNewest',
        'sort': { 's': 'lastUpdated', 'd': true }
    },
    currentSearchQuery: { 'q': '' }
};
function collectionOptions(state, action) {
    if (state === void 0) { state = collectionOptionsState; }
    switch (action.type) {
        case 'RESET_OPTIONS':
            return Object.assign({}, action.payload);
        case 'UPDATE_OPTIONS':
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}
exports.collectionOptions = collectionOptions;
;
var CollectionContextService = (function () {
    function CollectionContextService(store) {
        this.store = store;
        this.data = store.select('collectionOptions');
    }
    CollectionContextService.prototype.updateCollectionOptions = function (options) {
        this.store.dispatch({ type: 'UPDATE_OPTIONS', payload: options });
    };
    CollectionContextService.prototype.resetCollectionOptions = function () {
        this.store.dispatch({ type: 'RESET_OPTIONS', payload: collectionOptionsState });
    };
    CollectionContextService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [store_1.Store])
    ], CollectionContextService);
    return CollectionContextService;
}());
exports.CollectionContextService = CollectionContextService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvc2VydmljZXMvY29sbGVjdGlvbi1jb250ZXh0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBMkM7QUFDM0MscUNBQW9DO0FBS3BDLElBQU0sc0JBQXNCLEdBQVE7SUFDbEMsYUFBYSxFQUFFO1FBQ2IsSUFBSSxFQUFFLENBQUM7UUFDUCxNQUFNLEVBQUUscUNBQXFDO1FBQzdDLE9BQU8sRUFBRSxLQUFLO1FBQ2QsUUFBUSxFQUFFLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRTtLQUNuQztJQUNELFdBQVcsRUFBRTtRQUNYLElBQUksRUFBRSxDQUFDO1FBQ1AsTUFBTSxFQUFFLCtDQUErQztRQUN2RCxPQUFPLEVBQUUsV0FBVztRQUNwQixNQUFNLEVBQUUsRUFBRSxHQUFHLEVBQUUsYUFBYSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUU7S0FDMUM7SUFDRCxrQkFBa0IsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUU7Q0FDaEMsQ0FBQztBQUVGLDJCQUFrQyxLQUE4QixFQUFFLE1BQW9CO0lBQXBELHNCQUFBLEVBQUEsOEJBQThCO0lBQzlELE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLEtBQUssZUFBZTtZQUNsQixNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzNDLEtBQUssZ0JBQWdCO1lBQ25CLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2xEO1lBQ0UsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNqQixDQUFDO0FBQ0gsQ0FBQztBQVRELDhDQVNDO0FBQUEsQ0FBQztBQUdGO0lBR0Usa0NBQW1CLEtBQWlCO1FBQWpCLFVBQUssR0FBTCxLQUFLLENBQVk7UUFDbEMsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVNLDBEQUF1QixHQUE5QixVQUErQixPQUFZO1FBQ3pDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFTSx5REFBc0IsR0FBN0I7UUFDRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLENBQUMsQ0FBQztJQUNsRixDQUFDO0lBYlUsd0JBQXdCO1FBRHBDLGlCQUFVLEVBQUU7eUNBSWUsYUFBSztPQUhwQix3QkFBd0IsQ0FjcEM7SUFBRCwrQkFBQztDQWRELEFBY0MsSUFBQTtBQWRZLDREQUF3QiIsImZpbGUiOiJhcHAvc2hhcmVkL3NlcnZpY2VzL2NvbGxlY3Rpb24tY29udGV4dC5zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3RvcmUgfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcblxuaW1wb3J0IHsgTGVnYWN5QWN0aW9uIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9jb21tb24uaW50ZXJmYWNlJztcblxuY29uc3QgY29sbGVjdGlvbk9wdGlvbnNTdGF0ZTogYW55ID0ge1xuICBjdXJyZW50RmlsdGVyOiB7XG4gICAgJ2lkJzogMCxcbiAgICAnbmFtZSc6ICdDT0xMRUNUSU9OLklOREVYLkZJTFRFUl9ERF9NRU5VLkFMTCcsXG4gICAgJ3ZhbHVlJzogJ2FsbCcsXG4gICAgJ2FjY2Vzcyc6IHsgJ2FjY2Vzc0xldmVsJzogJ2FsbCcgfVxuICB9LFxuICBjdXJyZW50U29ydDoge1xuICAgICdpZCc6IDAsXG4gICAgJ25hbWUnOiAnQ09MTEVDVElPTi5JTkRFWC5TT1JUX0REX01FTlUuREFURV9NT0RfTkVXRVNUJyxcbiAgICAndmFsdWUnOiAnbW9kTmV3ZXN0JyxcbiAgICAnc29ydCc6IHsgJ3MnOiAnbGFzdFVwZGF0ZWQnLCAnZCc6IHRydWUgfVxuICB9LFxuICBjdXJyZW50U2VhcmNoUXVlcnk6IHsgJ3EnOiAnJyB9XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gY29sbGVjdGlvbk9wdGlvbnMoc3RhdGUgPSBjb2xsZWN0aW9uT3B0aW9uc1N0YXRlLCBhY3Rpb246IExlZ2FjeUFjdGlvbikge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSAnUkVTRVRfT1BUSU9OUyc6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgYWN0aW9uLnBheWxvYWQpO1xuICAgIGNhc2UgJ1VQREFURV9PUFRJT05TJzpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgYWN0aW9uLnBheWxvYWQpO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn07XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDb2xsZWN0aW9uQ29udGV4dFNlcnZpY2Uge1xuICBwdWJsaWMgZGF0YTogT2JzZXJ2YWJsZTxhbnk+O1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBzdG9yZTogU3RvcmU8YW55Pikge1xuICAgIHRoaXMuZGF0YSA9IHN0b3JlLnNlbGVjdCgnY29sbGVjdGlvbk9wdGlvbnMnKTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGVDb2xsZWN0aW9uT3B0aW9ucyhvcHRpb25zOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKHsgdHlwZTogJ1VQREFURV9PUFRJT05TJywgcGF5bG9hZDogb3B0aW9ucyB9KTtcbiAgfVxuXG4gIHB1YmxpYyByZXNldENvbGxlY3Rpb25PcHRpb25zKCk6IHZvaWQge1xuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goeyB0eXBlOiAnUkVTRVRfT1BUSU9OUycsIHBheWxvYWQ6IGNvbGxlY3Rpb25PcHRpb25zU3RhdGUgfSk7XG4gIH1cbn1cbiJdfQ==
