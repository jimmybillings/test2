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
var common_functions_1 = require("../utilities/common.functions");
function collections(state, action) {
    if (state === void 0) { state = initialState(); }
    if (state === null)
        state = initialState();
    var updatedItems;
    switch (action.type) {
        case 'REPLACE_COLLECTIONS':
            return Object.assign({}, action.payload ? action.payload : initialState());
        case 'ADD_COLLECTION':
            updatedItems = state.items ? common_functions_1.Common.clone(state.items) : [];
            if (action.payload)
                updatedItems.push(action.payload);
            return Object.assign({}, state, { items: updatedItems });
        case 'UPDATE_COLLECTION':
            if (!state.items || !action.payload)
                return state;
            updatedItems = state.items.map(function (collection) {
                return collection.id === action.payload.id ? action.payload : collection;
            });
            return Object.assign({}, state, { items: updatedItems });
        case 'DELETE_COLLECTION':
            if (!state.items)
                return state;
            updatedItems = state.items.filter(function (collection) { return collection.id !== action.payload; });
            return Object.assign({}, state, { items: updatedItems });
        case 'DELETE_ALL_COLLECTIONS':
            return Object.assign({}, initialState());
        default:
            return state;
    }
}
exports.collections = collections;
;
var CollectionsStore = (function () {
    function CollectionsStore(store) {
        this.store = store;
    }
    Object.defineProperty(CollectionsStore.prototype, "data", {
        get: function () {
            return this.store.select('collections');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CollectionsStore.prototype, "state", {
        get: function () {
            var s;
            this.data.take(1).subscribe(function (state) { return s = state; });
            return s;
        },
        enumerable: true,
        configurable: true
    });
    CollectionsStore.prototype.deleteAllCollections = function () {
        this.store.dispatch({ type: 'DELETE_ALL_COLLECTIONS' });
    };
    CollectionsStore.prototype.deleteCollectionWith = function (collectionId) {
        this.store.dispatch({ type: 'DELETE_COLLECTION', payload: collectionId });
    };
    CollectionsStore.prototype.add = function (newCollection) {
        this.store.dispatch({ type: 'ADD_COLLECTION', payload: newCollection });
    };
    CollectionsStore.prototype.update = function (collection) {
        this.store.dispatch({ type: 'UPDATE_COLLECTION', payload: collection });
    };
    CollectionsStore.prototype.replaceAllCollectionsWith = function (replacements) {
        replacements.items = replacements.items === undefined ? [] : replacements.items;
        this.store.dispatch({
            type: 'REPLACE_COLLECTIONS', payload: {
                items: replacements.items,
                pagination: {
                    totalCount: replacements.totalCount,
                    currentPage: replacements.currentPage + 1,
                    hasNextPage: replacements.hasNextPage,
                    hasPreviousPage: replacements.hasPreviousPage,
                    numberOfPages: replacements.numberOfPages,
                    pageSize: replacements.pageSize
                }
            }
        });
    };
    CollectionsStore = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [store_1.Store])
    ], CollectionsStore);
    return CollectionsStore;
}());
exports.CollectionsStore = CollectionsStore;
function initialState() {
    return {
        items: [],
        pagination: {
            totalCount: 0,
            currentPage: 1,
            pageSize: 100,
            hasNextPage: false,
            hasPreviousPage: false,
            numberOfPages: 0
        }
    };
}
;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvc3RvcmVzL2NvbGxlY3Rpb25zLnN0b3JlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQTJDO0FBRTNDLHFDQUFvQztBQUNwQyxrRUFBdUQ7QUFJdkQscUJBQTRCLEtBQXlDLEVBQUUsTUFBb0I7SUFBL0Qsc0JBQUEsRUFBQSxRQUEyQixZQUFZLEVBQUU7SUFDbkUsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQztRQUFDLEtBQUssR0FBRyxZQUFZLEVBQUUsQ0FBQztJQUUzQyxJQUFJLFlBQTBCLENBQUM7SUFFL0IsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDcEIsS0FBSyxxQkFBcUI7WUFDeEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7UUFFN0UsS0FBSyxnQkFBZ0I7WUFDbkIsWUFBWSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLHlCQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQzVELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7Z0JBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFdEQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsQ0FBQyxDQUFDO1FBRTNELEtBQUssbUJBQW1CO1lBQ3RCLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7Z0JBQUMsTUFB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QixJQUFJLEVBQUUscUJBQXFCLEVBQUUsT0FBTyxFQUFFO2dCQUNwQyxLQUFLLEVBQUUsWUFBWSxDQUFDLEtBQUs7Z0JBQ3pCLFVBQVUsRUFBRTtvQkFDVixVQUFVLEVBQUUsWUFBWSxDQUFDLFVBQVU7b0JBQ25DLFdBQVcsRUFBRSxZQUFZLENBQUMsV0FBVyxHQUFHLENBQUM7b0JBQ3pDLFdBQVcsRUFBRSxZQUFZLENBQUMsV0FBVztvQkFDckMsZUFBZSxFQUFFLFlBQVksQ0FBQyxlQUFlO29CQUM3QyxhQUFhLEVBQUUsWUFBWSxDQUFDLGFBQWE7b0JBQ3pDLFFBQVEsRUFBRSxZQUFZLENBQUMsUUFBUTtpQkFDaEM7YUFDRjtTQUNGLENBQUMsQ0FBQztJQUNMLENBQUM7SUE1Q1UsZ0JBQWdCO1FBRDVCLGlCQUFVLEVBQUU7eUNBRWdCLGFBQUs7T0FEckIsZ0JBQWdCLENBNkM1QjtJQUFELHVCQUFDO0NBN0NELEFBNkNDLElBQUE7QUE3Q1ksNENBQWdCO0FBK0M3QjtJQUNFLE1BQU0sQ0FBQztRQUNMLEtBQUssRUFBRSxFQUFFO1FBQ1QsVUFBVSxFQUFFO1lBQ1YsVUFBVSxFQUFFLENBQUM7WUFDYixXQUFXLEVBQUUsQ0FBQztZQUNkLFFBQVEsRUFBRSxHQUFHO1lBQ2IsV0FBVyxFQUFFLEtBQUs7WUFDbEIsZUFBZSxFQUFFLEtBQUs7WUFDdEIsYUFBYSxFQUFFLENBQUM7U0FDakI7S0FDRixDQUFDO0FBQ0osQ0FBQztBQUFBLENBQUMiLCJmaWxlIjoiYXBwL3NoYXJlZC9zdG9yZXMvY29sbGVjdGlvbnMuc3RvcmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IFN0b3JlIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHsgQ29tbW9uIH0gZnJvbSAnLi4vdXRpbGl0aWVzL2NvbW1vbi5mdW5jdGlvbnMnO1xuaW1wb3J0IHsgQ29sbGVjdGlvbiwgQ29sbGVjdGlvbnNTdG9yZUksIENvbGxlY3Rpb25TdW1tYXJ5IH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9jb2xsZWN0aW9uLmludGVyZmFjZSc7XG5pbXBvcnQgeyBMZWdhY3lBY3Rpb24gfSBmcm9tICcuLi9pbnRlcmZhY2VzL2NvbW1vbi5pbnRlcmZhY2UnO1xuXG5leHBvcnQgZnVuY3Rpb24gY29sbGVjdGlvbnMoc3RhdGU6IENvbGxlY3Rpb25zU3RvcmVJID0gaW5pdGlhbFN0YXRlKCksIGFjdGlvbjogTGVnYWN5QWN0aW9uKSB7XG4gIGlmIChzdGF0ZSA9PT0gbnVsbCkgc3RhdGUgPSBpbml0aWFsU3RhdGUoKTtcblxuICBsZXQgdXBkYXRlZEl0ZW1zOiBDb2xsZWN0aW9uW107XG5cbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgJ1JFUExBQ0VfQ09MTEVDVElPTlMnOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIGFjdGlvbi5wYXlsb2FkID8gYWN0aW9uLnBheWxvYWQgOiBpbml0aWFsU3RhdGUoKSk7XG5cbiAgICBjYXNlICdBRERfQ09MTEVDVElPTic6XG4gICAgICB1cGRhdGVkSXRlbXMgPSBzdGF0ZS5pdGVtcyA/IENvbW1vbi5jbG9uZShzdGF0ZS5pdGVtcykgOiBbXTtcbiAgICAgIGlmIChhY3Rpb24ucGF5bG9hZCkgdXBkYXRlZEl0ZW1zLnB1c2goYWN0aW9uLnBheWxvYWQpO1xuXG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgaXRlbXM6IHVwZGF0ZWRJdGVtcyB9KTtcblxuICAgIGNhc2UgJ1VQREFURV9DT0xMRUNUSU9OJzpcbiAgICAgIGlmICghc3RhdGUuaXRlbXMgfHwgIWFjdGlvbi5wYXlsb2FkKSByZXR1cm4gc3RhdGU7XG5cbiAgICAgIHVwZGF0ZWRJdGVtcyA9IHN0YXRlLml0ZW1zLm1hcCgoY29sbGVjdGlvbjogQ29sbGVjdGlvbikgPT4ge1xuICAgICAgICByZXR1cm4gY29sbGVjdGlvbi5pZCA9PT0gYWN0aW9uLnBheWxvYWQuaWQgPyBhY3Rpb24ucGF5bG9hZCA6IGNvbGxlY3Rpb247XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IGl0ZW1zOiB1cGRhdGVkSXRlbXMgfSk7XG5cbiAgICBjYXNlICdERUxFVEVfQ09MTEVDVElPTic6XG4gICAgICBpZiAoIXN0YXRlLml0ZW1zKSByZXR1cm4gc3RhdGU7XG5cbiAgICAgIHVwZGF0ZWRJdGVtcyA9IHN0YXRlLml0ZW1zLmZpbHRlcigoY29sbGVjdGlvbjogQ29sbGVjdGlvbikgPT4gY29sbGVjdGlvbi5pZCAhPT0gYWN0aW9uLnBheWxvYWQpO1xuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IGl0ZW1zOiB1cGRhdGVkSXRlbXMgfSk7XG5cbiAgICBjYXNlICdERUxFVEVfQUxMX0NPTExFQ1RJT05TJzpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBpbml0aWFsU3RhdGUoKSk7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlO1xuICB9XG59O1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ29sbGVjdGlvbnNTdG9yZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc3RvcmU6IFN0b3JlPGFueT4pIHsgfSAgLy8gV2FzIFN0b3JlPENvbGxlY3Rpb25zU3RvcmVJPiBiZWZvcmUgbmdyeCB1cGdyYWRlLlxuXG4gIHB1YmxpYyBnZXQgZGF0YSgpOiBPYnNlcnZhYmxlPENvbGxlY3Rpb25TdW1tYXJ5PiB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUuc2VsZWN0KCdjb2xsZWN0aW9ucycpO1xuICB9XG5cbiAgcHVibGljIGdldCBzdGF0ZSgpOiBDb2xsZWN0aW9uW10ge1xuICAgIGxldCBzOiBhbnk7XG4gICAgdGhpcy5kYXRhLnRha2UoMSkuc3Vic2NyaWJlKHN0YXRlID0+IHMgPSBzdGF0ZSk7XG4gICAgcmV0dXJuIHM7XG4gIH1cblxuICBwdWJsaWMgZGVsZXRlQWxsQ29sbGVjdGlvbnMoKTogdm9pZCB7XG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaCh7IHR5cGU6ICdERUxFVEVfQUxMX0NPTExFQ1RJT05TJyB9KTtcbiAgfVxuXG4gIHB1YmxpYyBkZWxldGVDb2xsZWN0aW9uV2l0aChjb2xsZWN0aW9uSWQ6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goeyB0eXBlOiAnREVMRVRFX0NPTExFQ1RJT04nLCBwYXlsb2FkOiBjb2xsZWN0aW9uSWQgfSk7XG4gIH1cblxuICBwdWJsaWMgYWRkKG5ld0NvbGxlY3Rpb246IENvbGxlY3Rpb24pOiB2b2lkIHtcbiAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKHsgdHlwZTogJ0FERF9DT0xMRUNUSU9OJywgcGF5bG9hZDogbmV3Q29sbGVjdGlvbiB9KTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGUoY29sbGVjdGlvbjogQ29sbGVjdGlvbik6IHZvaWQge1xuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goeyB0eXBlOiAnVVBEQVRFX0NPTExFQ1RJT04nLCBwYXlsb2FkOiBjb2xsZWN0aW9uIH0pO1xuICB9XG5cbiAgcHVibGljIHJlcGxhY2VBbGxDb2xsZWN0aW9uc1dpdGgocmVwbGFjZW1lbnRzOiBhbnkpOiB2b2lkIHtcbiAgICByZXBsYWNlbWVudHMuaXRlbXMgPSByZXBsYWNlbWVudHMuaXRlbXMgPT09IHVuZGVmaW5lZCA/IFtdIDogcmVwbGFjZW1lbnRzLml0ZW1zO1xuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goe1xuICAgICAgdHlwZTogJ1JFUExBQ0VfQ09MTEVDVElPTlMnLCBwYXlsb2FkOiB7XG4gICAgICAgIGl0ZW1zOiByZXBsYWNlbWVudHMuaXRlbXMsXG4gICAgICAgIHBhZ2luYXRpb246IHtcbiAgICAgICAgICB0b3RhbENvdW50OiByZXBsYWNlbWVudHMudG90YWxDb3VudCxcbiAgICAgICAgICBjdXJyZW50UGFnZTogcmVwbGFjZW1lbnRzLmN1cnJlbnRQYWdlICsgMSxcbiAgICAgICAgICBoYXNOZXh0UGFnZTogcmVwbGFjZW1lbnRzLmhhc05leHRQYWdlLFxuICAgICAgICAgIGhhc1ByZXZpb3VzUGFnZTogcmVwbGFjZW1lbnRzLmhhc1ByZXZpb3VzUGFnZSxcbiAgICAgICAgICBudW1iZXJPZlBhZ2VzOiByZXBsYWNlbWVudHMubnVtYmVyT2ZQYWdlcyxcbiAgICAgICAgICBwYWdlU2l6ZTogcmVwbGFjZW1lbnRzLnBhZ2VTaXplXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpbml0aWFsU3RhdGUoKTogQ29sbGVjdGlvbnNTdG9yZUkge1xuICByZXR1cm4ge1xuICAgIGl0ZW1zOiBbXSxcbiAgICBwYWdpbmF0aW9uOiB7XG4gICAgICB0b3RhbENvdW50OiAwLFxuICAgICAgY3VycmVudFBhZ2U6IDEsXG4gICAgICBwYWdlU2l6ZTogMTAwLFxuICAgICAgaGFzTmV4dFBhZ2U6IGZhbHNlLFxuICAgICAgaGFzUHJldmlvdXNQYWdlOiBmYWxzZSxcbiAgICAgIG51bWJlck9mUGFnZXM6IDBcbiAgICB9XG4gIH07XG59O1xuIl19
