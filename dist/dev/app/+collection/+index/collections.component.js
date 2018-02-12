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
var collection_share_component_1 = require("../components/collection-share.component");
var core_1 = require("@angular/core");
var collections_service_1 = require("../../shared/services/collections.service");
var router_1 = require("@angular/router");
var current_user_service_1 = require("../../shared/services/current-user.service");
var collection_context_service_1 = require("../../shared/services/collection-context.service");
var collection_link_component_1 = require("../components/collection-link.component");
var collection_form_component_1 = require("../../application/collection-tray/components/collection-form.component");
var collection_share_members_component_1 = require("../components/collection-share-members.component");
var wz_dialog_service_1 = require("../../shared/modules/wz-dialog/services/wz.dialog.service");
var app_store_1 = require("../../app.store");
var common_functions_1 = require("../../shared/utilities/common.functions");
var CollectionsComponent = (function () {
    function CollectionsComponent(router, collections, collectionContext, currentUser, dialogService, store) {
        this.router = router;
        this.collections = collections;
        this.collectionContext = collectionContext;
        this.currentUser = currentUser;
        this.dialogService = dialogService;
        this.store = store;
        this.collectionSearchIsShowing = false;
        this.filterOptions = [];
        this.sortOptions = [];
        this.filterOptions = [
            {
                'first': {
                    'id': 0, 'name': 'COLLECTION.INDEX.FILTER_DD_MENU.ALL', 'value': 'all',
                    'access': { 'accessLevel': 'all' }
                },
                'second': {
                    'id': 1, 'name': 'COLLECTION.INDEX.FILTER_DD_MENU.OWNER',
                    'value': 'owner',
                    'access': { 'accessLevel': 'owner' }
                }
            },
            {
                'first': {
                    'id': 2, 'name': 'COLLECTION.INDEX.FILTER_DD_MENU.EDITOR',
                    'value': 'editor',
                    'access': { 'accessLevel': 'editor' }
                },
                'second': {
                    'id': 3, 'name': 'COLLECTION.INDEX.FILTER_DD_MENU.VIEWER',
                    'value': 'viewer',
                    'access': { 'accessLevel': 'viewer' }
                }
            },
            {
                'first': {
                    'id': 4,
                    'name': 'COLLECTION.INDEX.FILTER_DD_MENU.RESEARCHER',
                    'value': 'researcher',
                    'access': { 'accessLevel': 'researcher' }
                }
            }
        ];
        this.sortOptions = [
            {
                'first': {
                    'id': 0,
                    'name': 'COLLECTION.INDEX.SORT_DD_MENU.DATE_MOD_NEWEST',
                    'value': 'modNewest',
                    'sort': { 's': 'lastUpdated', 'd': true }
                },
                'second': {
                    'id': 1,
                    'name': 'COLLECTION.INDEX.SORT_DD_MENU.DATE_MOD_OLDEST',
                    'value': 'modOldest',
                    'sort': {
                        's': 'lastUpdated', 'd': false
                    }
                }
            },
            {
                'first': {
                    'id': 2,
                    'name': 'COLLECTION.INDEX.SORT_DD_MENU.DATE_CREATE_NEWEST',
                    'value': 'createNewest',
                    'sort': {
                        's': 'createdOn', 'd': true
                    }
                },
                'second': {
                    'id': 3,
                    'name': 'COLLECTION.INDEX.SORT_DD_MENU.DATE_CREATE_OLDEST',
                    'value': 'createOldest',
                    'sort': { 's': 'createdOn', 'd': false }
                }
            },
            {
                'first': {
                    'id': 4,
                    'name': 'COLLECTION.INDEX.SORT_DD_MENU.LIST_COLL_ASC',
                    'value': 'alphaAsc',
                    'sort': { 's': 'name', 'd': false }
                },
                'second': {
                    'id': 5,
                    'name': 'COLLECTION.INDEX.SORT_DD_MENU.LIST_COLL_DESC',
                    'value': 'alphaDesc',
                    'sort': { 's': 'name', 'd': true }
                }
            }
        ];
    }
    Object.defineProperty(CollectionsComponent.prototype, "collectionContextData", {
        get: function () {
            return this.collectionContext.data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CollectionsComponent.prototype, "activeCollection", {
        get: function () {
            return this.store.select(function (state) { return state.activeCollection.collection; });
        },
        enumerable: true,
        configurable: true
    });
    CollectionsComponent.prototype.toggleCollectionSearch = function () {
        this.collectionSearchIsShowing = !this.collectionSearchIsShowing;
    };
    CollectionsComponent.prototype.selectActiveCollection = function (id) {
        this.store.dispatch(function (factory) { return factory.activeCollection.set(id); });
    };
    CollectionsComponent.prototype.setCollectionForDelete = function (collection) {
        var _this = this;
        this.store.dispatch(function (factory) { return factory.dialog.showConfirmation({
            title: { key: 'COLLECTION.INDEX.CONFIRMATION_TITLE', values: { collectionName: collection.name } },
            message: { key: 'COLLECTION.INDEX.CONFIRMATION_SUBTITLE', values: { collectionName: collection.name } },
            decline: 'COLLECTION.INDEX.CONFIRMATION_CANCEL_BTN_TITLE',
            accept: 'COLLECTION.INDEX.CONFIRMATION_DELETE_BTN_TITLE',
        }, function () { return _this.deleteCollection(collection.id); }); });
    };
    CollectionsComponent.prototype.deleteCollection = function (id) {
        this.collections.delete(id, true).subscribe();
    };
    CollectionsComponent.prototype.search = function (query) {
        this.collectionContext.updateCollectionOptions({ currentSearchQuery: query });
        this.collections.load(query, true).subscribe();
    };
    CollectionsComponent.prototype.onFilterCollections = function (filter) {
        this.collectionContext.updateCollectionOptions({ currentFilter: filter });
        this.collections.load(filter.access, true).subscribe();
    };
    CollectionsComponent.prototype.onSortCollections = function (sort) {
        this.collectionContext.updateCollectionOptions({ currentSort: sort });
        this.collections.load(sort.sort, true).subscribe();
    };
    CollectionsComponent.prototype.isActiveCollection = function (collectionId) {
        return this.store.match(collectionId, function (state) { return state.activeCollection.collection.id; });
    };
    CollectionsComponent.prototype.getAssetsForLink = function (collectionId) {
        var _this = this;
        this.collections.getItems(collectionId).subscribe(function (data) {
            _this.dialogService.openComponentInDialog({
                componentType: collection_link_component_1.CollectionLinkComponent,
                inputOptions: { assets: data.items }
            });
        });
    };
    CollectionsComponent.prototype.editCollection = function (collection) {
        this.dialogService.openComponentInDialog(this.collectionFormComponentOptions('edit', common_functions_1.Common.clone(collection)));
    };
    CollectionsComponent.prototype.showShareMembers = function (collection) {
        this.dialogService.openComponentInDialog({
            componentType: collection_share_members_component_1.CollectionShareMembersComponent,
            dialogConfig: { position: { top: '12%' } },
            inputOptions: {
                collection: common_functions_1.Common.clone(collection),
            },
            outputOptions: [{
                    event: 'close',
                    callback: function () { return true; },
                    closeOnEvent: true
                }]
        });
    };
    CollectionsComponent.prototype.createCollection = function () {
        this.dialogService.openComponentInDialog(this.collectionFormComponentOptions('create'));
    };
    CollectionsComponent.prototype.onDuplicateCollection = function (collectionId) {
        var _this = this;
        this.collections.getByIdAndDuplicate(collectionId)
            .subscribe(function (collection) {
            _this.dialogService.openComponentInDialog(_this.collectionFormComponentOptions('duplicate', collection));
        });
    };
    CollectionsComponent.prototype.onCreateShareDialog = function (collection) {
        this.dialogService.openComponentInDialog({
            componentType: collection_share_component_1.CollectionShareComponent,
            dialogConfig: { position: { top: '3%' }, panelClass: 'wz-share-dialog' },
            inputOptions: {
                reloadType: 'collections',
                collection: common_functions_1.Common.clone(collection),
            },
            outputOptions: [{
                    event: 'closeRequest',
                    callback: function () { return true; },
                    closeOnEvent: true
                }]
        });
    };
    CollectionsComponent.prototype.collectionFormComponentOptions = function (actionType, collection) {
        if (collection === void 0) { collection = false; }
        return {
            componentType: collection_form_component_1.CollectionFormComponent,
            inputOptions: {
                collection: collection,
                fields: this.formFields,
                collectionActionType: actionType
            },
            outputOptions: [{
                    event: 'collectionSaved',
                    callback: function (event) { return true; },
                    closeOnEvent: true
                }]
        };
    };
    Object.defineProperty(CollectionsComponent.prototype, "formFields", {
        get: function () {
            return this.store.snapshotCloned(function (state) { return state.uiConfig.components.collection.config; });
        },
        enumerable: true,
        configurable: true
    });
    CollectionsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'collections-component',
            templateUrl: 'collections.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [router_1.Router,
            collections_service_1.CollectionsService,
            collection_context_service_1.CollectionContextService,
            current_user_service_1.CurrentUserService,
            wz_dialog_service_1.WzDialogService,
            app_store_1.AppStore])
    ], CollectionsComponent);
    return CollectionsComponent;
}());
exports.CollectionsComponent = CollectionsComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29sbGVjdGlvbi8raW5kZXgvY29sbGVjdGlvbnMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsdUZBQW9GO0FBQ3BGLHNDQUFtRTtBQUluRSxpRkFBK0U7QUFDL0UsMENBQXlDO0FBQ3pDLG1GQUFnRjtBQUdoRiwrRkFBNEY7QUFDNUYscUZBQWtGO0FBQ2xGLG9IQUFpSDtBQUNqSCx1R0FBbUc7QUFDbkcsK0ZBQTRGO0FBQzVGLDZDQUEyQztBQUMzQyw0RUFBaUU7QUFTakU7SUFLRSw4QkFDUyxNQUFjLEVBQ2QsV0FBK0IsRUFDL0IsaUJBQTJDLEVBQzNDLFdBQStCLEVBQzlCLGFBQThCLEVBQzlCLEtBQWU7UUFMaEIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLGdCQUFXLEdBQVgsV0FBVyxDQUFvQjtRQUMvQixzQkFBaUIsR0FBakIsaUJBQWlCLENBQTBCO1FBQzNDLGdCQUFXLEdBQVgsV0FBVyxDQUFvQjtRQUM5QixrQkFBYSxHQUFiLGFBQWEsQ0FBaUI7UUFDOUIsVUFBSyxHQUFMLEtBQUssQ0FBVTtRQVZsQiw4QkFBeUIsR0FBWSxLQUFLLENBQUM7UUFDM0Msa0JBQWEsR0FBZSxFQUFFLENBQUM7UUFDL0IsZ0JBQVcsR0FBZSxFQUFFLENBQUM7UUFVbEMsSUFBSSxDQUFDLGFBQWEsR0FBRztZQUNuQjtnQkFDRSxPQUFPLEVBQUU7b0JBQ1AsSUFBSSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUscUNBQXFDLEVBQUUsT0FBTyxFQUFFLEtBQUs7b0JBQ3RFLFFBQVEsRUFBRSxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUU7aUJBQ25DO2dCQUNELFFBQVEsRUFBRTtvQkFDUixJQUFJLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSx1Q0FBdUM7b0JBQ3hELE9BQU8sRUFBRSxPQUFPO29CQUNoQixRQUFRLEVBQUUsRUFBRSxhQUFhLEVBQUUsT0FBTyxFQUFFO2lCQUNyQzthQUNGO1lBQ0Q7Z0JBQ0Us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VyxFQUFFLGtCQUFrQjtZQUMvQixlQUFlLEVBQUUsOEJBQXVCLENBQUMsTUFBTTtTQUNoRCxDQUFDO3lDQVFpQixlQUFNO1lBQ0Qsd0NBQWtCO1lBQ1oscURBQXdCO1lBQzlCLHlDQUFrQjtZQUNmLG1DQUFlO1lBQ3ZCLG9CQUFRO09BWGQsb0JBQW9CLENBdU9oQztJQUFELDJCQUFDO0NBdk9ELEFBdU9DLElBQUE7QUF2T1ksb0RBQW9CIiwiZmlsZSI6ImFwcC8rY29sbGVjdGlvbi8raW5kZXgvY29sbGVjdGlvbnMuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29sbGVjdGlvblNoYXJlQ29tcG9uZW50IH0gZnJvbSAnLi4vY29tcG9uZW50cy9jb2xsZWN0aW9uLXNoYXJlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb21wb25lbnQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcblxuaW1wb3J0IHsgQ29sbGVjdGlvbiwgQ29sbGVjdGlvbkFjdGlvblR5cGUsIENvbGxlY3Rpb25TdW1tYXJ5LCBDb2xsZWN0aW9uU3VtbWFyeUl0ZW0gfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9jb2xsZWN0aW9uLmludGVyZmFjZSc7XG5pbXBvcnQgeyBDb2xsZWN0aW9uc1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvc2VydmljZXMvY29sbGVjdGlvbnMuc2VydmljZSc7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQ3VycmVudFVzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2N1cnJlbnQtdXNlci5zZXJ2aWNlJztcbmltcG9ydCB7IFd6RXZlbnQsIFBvam8gfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9jb21tb24uaW50ZXJmYWNlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IENvbGxlY3Rpb25Db250ZXh0U2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9jb2xsZWN0aW9uLWNvbnRleHQuc2VydmljZSc7XG5pbXBvcnQgeyBDb2xsZWN0aW9uTGlua0NvbXBvbmVudCB9IGZyb20gJy4uL2NvbXBvbmVudHMvY29sbGVjdGlvbi1saW5rLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb2xsZWN0aW9uRm9ybUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL2FwcGxpY2F0aW9uL2NvbGxlY3Rpb24tdHJheS9jb21wb25lbnRzL2NvbGxlY3Rpb24tZm9ybS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29sbGVjdGlvblNoYXJlTWVtYmVyc0NvbXBvbmVudCB9IGZyb20gJy4uL2NvbXBvbmVudHMvY29sbGVjdGlvbi1zaGFyZS1tZW1iZXJzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBXekRpYWxvZ1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvbW9kdWxlcy93ei1kaWFsb2cvc2VydmljZXMvd3ouZGlhbG9nLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXBwU3RvcmUgfSBmcm9tICcuLi8uLi9hcHAuc3RvcmUnO1xuaW1wb3J0IHsgQ29tbW9uIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3V0aWxpdGllcy9jb21tb24uZnVuY3Rpb25zJztcblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAnY29sbGVjdGlvbnMtY29tcG9uZW50JyxcbiAgdGVtcGxhdGVVcmw6ICdjb2xsZWN0aW9ucy5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5cbmV4cG9ydCBjbGFzcyBDb2xsZWN0aW9uc0NvbXBvbmVudCB7XG4gIHB1YmxpYyBjb2xsZWN0aW9uU2VhcmNoSXNTaG93aW5nOiBib29sZWFuID0gZmFsc2U7XG4gIHB1YmxpYyBmaWx0ZXJPcHRpb25zOiBBcnJheTxhbnk+ID0gW107XG4gIHB1YmxpYyBzb3J0T3B0aW9uczogQXJyYXk8YW55PiA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyByb3V0ZXI6IFJvdXRlcixcbiAgICBwdWJsaWMgY29sbGVjdGlvbnM6IENvbGxlY3Rpb25zU2VydmljZSxcbiAgICBwdWJsaWMgY29sbGVjdGlvbkNvbnRleHQ6IENvbGxlY3Rpb25Db250ZXh0U2VydmljZSxcbiAgICBwdWJsaWMgY3VycmVudFVzZXI6IEN1cnJlbnRVc2VyU2VydmljZSxcbiAgICBwcml2YXRlIGRpYWxvZ1NlcnZpY2U6IFd6RGlhbG9nU2VydmljZSxcbiAgICBwcml2YXRlIHN0b3JlOiBBcHBTdG9yZVxuICApIHtcbiAgICB0aGlzLmZpbHRlck9wdGlvbnMgPSBbXG4gICAgICB7XG4gICAgICAgICdmaXJzdCc6IHtcbiAgICAgICAgICAnaWQnOiAwLCAnbmFtZSc6ICdDT0xMRUNUSU9OLklOREVYLkZJTFRFUl9ERF9NRU5VLkFMTCcsICd2YWx1ZSc6ICdhbGwnLFxuICAgICAgICAgICdhY2Nlc3MnOiB7ICdhY2Nlc3NMZXZlbCc6ICdhbGwnIH1cbiAgICAgICAgfSxcbiAgICAgICAgJ3NlY29uZCc6IHtcbiAgICAgICAgICAnaWQnOiAxLCAnbmFtZSc6ICdDT0xMRUNUSU9OLklOREVYLkZJTFRFUl9ERF9NRU5VLk9XTkVSJyxcbiAgICAgICAgICAndmFsdWUnOiAnb3duZXInLFxuICAgICAgICAgICdhY2Nlc3MnOiB7ICdhY2Nlc3NMZXZlbCc6ICdvd25lcicgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAnZmlyc3QnOiB7XG4gICAgICAgICAgJ2lkJzogMiwgJ25hbWUnOiAnQ09MTEVDVElPTi5JTkRFWC5GSUxURVJfRERfTUVOVS5FRElUT1InLFxuICAgICAgICAgICd2YWx1ZSc6ICdlZGl0b3InLFxuICAgICAgICAgICdhY2Nlc3MnOiB7ICdhY2Nlc3NMZXZlbCc6ICdlZGl0b3InIH1cbiAgICAgICAgfSxcbiAgICAgICAgJ3NlY29uZCc6IHtcbiAgICAgICAgICAnaWQnOiAzLCAnbmFtZSc6XG4gICAgICAgICAgICAnQ09MTEVDVElPTi5JTkRFWC5GSUxURVJfRERfTUVOVS5WSUVXRVInLFxuICAgICAgICAgICd2YWx1ZSc6ICd2aWV3ZXInLFxuICAgICAgICAgICdhY2Nlc3MnOiB7ICdhY2Nlc3NMZXZlbCc6ICd2aWV3ZXInIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ2ZpcnN0Jzoge1xuICAgICAgICAgICdpZCc6IDQsXG4gICAgICAgICAgJ25hbWUnOiAnQ09MTEVDVElPTi5JTkRFWC5GSUxURVJfRERfTUVOVS5SRVNFQVJDSEVSJyxcbiAgICAgICAgICAndmFsdWUnOiAncmVzZWFyY2hlcicsXG4gICAgICAgICAgJ2FjY2Vzcyc6IHsgJ2FjY2Vzc0xldmVsJzogJ3Jlc2VhcmNoZXInIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIF07XG4gICAgdGhpcy5zb3J0T3B0aW9ucyA9IFtcbiAgICAgIHtcbiAgICAgICAgJ2ZpcnN0Jzoge1xuICAgICAgICAgICdpZCc6IDAsXG4gICAgICAgICAgJ25hbWUnOiAnQ09MTEVDVElPTi5JTkRFWC5TT1JUX0REX01FTlUuREFURV9NT0RfTkVXRVNUJyxcbiAgICAgICAgICAndmFsdWUnOiAnbW9kTmV3ZXN0JyxcbiAgICAgICAgICAnc29ydCc6IHsgJ3MnOiAnbGFzdFVwZGF0ZWQnLCAnZCc6IHRydWUgfVxuICAgICAgICB9LFxuICAgICAgICAnc2Vjb25kJzoge1xuICAgICAgICAgICdpZCc6IDEsXG4gICAgICAgICAgJ25hbWUnOiAnQ09MTEVDVElPTi5JTkRFWC5TT1JUX0REX01FTlUuREFURV9NT0RfT0xERVNUJyxcbiAgICAgICAgICAndmFsdWUnOiAnbW9kT2xkZXN0JyxcbiAgICAgICAgICAnc29ydCc6IHtcbiAgICAgICAgICAgICdzJzogJ2xhc3RVcGRhdGVkJywgJ2QnOiBmYWxzZVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ2ZpcnN0Jzoge1xuICAgICAgICAgICdpZCc6IDIsXG4gICAgICAgICAgJ25hbWUnOiAnQ09MTEVDVElPTi5JTkRFWC5TT1JUX0REX01FTlUuREFURV9DUkVBVEVfTkVXRVNUJyxcbiAgICAgICAgICAndmFsdWUnOiAnY3JlYXRlTmV3ZXN0JyxcbiAgICAgICAgICAnc29ydCc6IHtcbiAgICAgICAgICAgICdzJzogJ2NyZWF0ZWRPbicsICdkJzogdHJ1ZVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgJ3NlY29uZCc6IHtcbiAgICAgICAgICAnaWQnOiAzLFxuICAgICAgICAgICduYW1lJzogJ0NPTExFQ1RJT04uSU5ERVguU09SVF9ERF9NRU5VLkRBVEVfQ1JFQVRFX09MREVTVCcsXG4gICAgICAgICAgJ3ZhbHVlJzogJ2NyZWF0ZU9sZGVzdCcsXG4gICAgICAgICAgJ3NvcnQnOiB7ICdzJzogJ2NyZWF0ZWRPbicsICdkJzogZmFsc2UgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAnZmlyc3QnOiB7XG4gICAgICAgICAgJ2lkJzogNCxcbiAgICAgICAgICAnbmFtZSc6ICdDT0xMRUNUSU9OLklOREVYLlNPUlRfRERfTUVOVS5MSVNUX0NPTExfQVNDJyxcbiAgICAgICAgICAndmFsdWUnOiAnYWxwaGFBc2MnLFxuICAgICAgICAgICdzb3J0JzogeyAncyc6ICduYW1lJywgJ2QnOiBmYWxzZSB9XG4gICAgICAgIH0sXG4gICAgICAgICdzZWNvbmQnOiB7XG4gICAgICAgICAgJ2lkJzogNSxcbiAgICAgICAgICAnbmFtZSc6ICdDT0xMRUNUSU9OLklOREVYLlNPUlRfRERfTUVOVS5MSVNUX0NPTExfREVTQycsXG4gICAgICAgICAgJ3ZhbHVlJzogJ2FscGhhRGVzYycsXG4gICAgICAgICAgJ3NvcnQnOiB7ICdzJzogJ25hbWUnLCAnZCc6IHRydWUgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgY29sbGVjdGlvbkNvbnRleHREYXRhKCkge1xuICAgIHJldHVybiB0aGlzLmNvbGxlY3Rpb25Db250ZXh0LmRhdGE7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGFjdGl2ZUNvbGxlY3Rpb24oKTogT2JzZXJ2YWJsZTxDb2xsZWN0aW9uPiB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUuc2VsZWN0KHN0YXRlID0+IHN0YXRlLmFjdGl2ZUNvbGxlY3Rpb24uY29sbGVjdGlvbik7XG4gIH1cblxuICBwdWJsaWMgdG9nZ2xlQ29sbGVjdGlvblNlYXJjaCgpIHtcbiAgICB0aGlzLmNvbGxlY3Rpb25TZWFyY2hJc1Nob3dpbmcgPSAhdGhpcy5jb2xsZWN0aW9uU2VhcmNoSXNTaG93aW5nO1xuICB9XG5cbiAgcHVibGljIHNlbGVjdEFjdGl2ZUNvbGxlY3Rpb24oaWQ6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goZmFjdG9yeSA9PiBmYWN0b3J5LmFjdGl2ZUNvbGxlY3Rpb24uc2V0KGlkKSk7XG4gIH1cblxuICBwdWJsaWMgc2V0Q29sbGVjdGlvbkZvckRlbGV0ZShjb2xsZWN0aW9uOiBDb2xsZWN0aW9uU3VtbWFyeUl0ZW0pOiB2b2lkIHtcbiAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKGZhY3RvcnkgPT4gZmFjdG9yeS5kaWFsb2cuc2hvd0NvbmZpcm1hdGlvbih7XG4gICAgICB0aXRsZTogeyBrZXk6ICdDT0xMRUNUSU9OLklOREVYLkNPTkZJUk1BVElPTl9USVRMRScsIHZhbHVlczogeyBjb2xsZWN0aW9uTmFtZTogY29sbGVjdGlvbi5uYW1lIH0gfSxcbiAgICAgIG1lc3NhZ2U6IHsga2V5OiAnQ09MTEVDVElPTi5JTkRFWC5DT05GSVJNQVRJT05fU1VCVElUTEUnLCB2YWx1ZXM6IHsgY29sbGVjdGlvbk5hbWU6IGNvbGxlY3Rpb24ubmFtZSB9IH0sXG4gICAgICBkZWNsaW5lOiAnQ09MTEVDVElPTi5JTkRFWC5DT05GSVJNQVRJT05fQ0FOQ0VMX0JUTl9USVRMRScsXG4gICAgICBhY2NlcHQ6ICdDT0xMRUNUSU9OLklOREVYLkNPTkZJUk1BVElPTl9ERUxFVEVfQlROX1RJVExFJyxcbiAgICB9LCAoKSA9PiB0aGlzLmRlbGV0ZUNvbGxlY3Rpb24oY29sbGVjdGlvbi5pZCkpKTtcbiAgfVxuXG4gIHB1YmxpYyBkZWxldGVDb2xsZWN0aW9uKGlkOiBudW1iZXIsICk6IHZvaWQge1xuICAgIHRoaXMuY29sbGVjdGlvbnMuZGVsZXRlKGlkLCB0cnVlKS5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHB1YmxpYyBzZWFyY2gocXVlcnk6IHN0cmluZykge1xuICAgIHRoaXMuY29sbGVjdGlvbkNvbnRleHQudXBkYXRlQ29sbGVjdGlvbk9wdGlvbnMoeyBjdXJyZW50U2VhcmNoUXVlcnk6IHF1ZXJ5IH0pO1xuICAgIHRoaXMuY29sbGVjdGlvbnMubG9hZChxdWVyeSwgdHJ1ZSkuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBwdWJsaWMgb25GaWx0ZXJDb2xsZWN0aW9ucyhmaWx0ZXI6IFBvam8pIHtcbiAgICB0aGlzLmNvbGxlY3Rpb25Db250ZXh0LnVwZGF0ZUNvbGxlY3Rpb25PcHRpb25zKHsgY3VycmVudEZpbHRlcjogZmlsdGVyIH0pO1xuICAgIHRoaXMuY29sbGVjdGlvbnMubG9hZChmaWx0ZXIuYWNjZXNzLCB0cnVlKS5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHB1YmxpYyBvblNvcnRDb2xsZWN0aW9ucyhzb3J0OiBQb2pvKSB7XG4gICAgdGhpcy5jb2xsZWN0aW9uQ29udGV4dC51cGRhdGVDb2xsZWN0aW9uT3B0aW9ucyh7IGN1cnJlbnRTb3J0OiBzb3J0IH0pO1xuICAgIHRoaXMuY29sbGVjdGlvbnMubG9hZChzb3J0LnNvcnQsIHRydWUpLnN1YnNjcmliZSgpO1xuICB9XG5cbiAgcHVibGljIGlzQWN0aXZlQ29sbGVjdGlvbihjb2xsZWN0aW9uSWQ6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLm1hdGNoKGNvbGxlY3Rpb25JZCwgc3RhdGUgPT4gc3RhdGUuYWN0aXZlQ29sbGVjdGlvbi5jb2xsZWN0aW9uLmlkKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRBc3NldHNGb3JMaW5rKGNvbGxlY3Rpb25JZDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5jb2xsZWN0aW9ucy5nZXRJdGVtcyhjb2xsZWN0aW9uSWQpLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgIHRoaXMuZGlhbG9nU2VydmljZS5vcGVuQ29tcG9uZW50SW5EaWFsb2coXG4gICAgICAgIHtcbiAgICAgICAgICBjb21wb25lbnRUeXBlOiBDb2xsZWN0aW9uTGlua0NvbXBvbmVudCxcbiAgICAgICAgICBpbnB1dE9wdGlvbnM6IHsgYXNzZXRzOiBkYXRhLml0ZW1zIH1cbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBlZGl0Q29sbGVjdGlvbihjb2xsZWN0aW9uOiBDb2xsZWN0aW9uU3VtbWFyeUl0ZW0pIHtcbiAgICB0aGlzLmRpYWxvZ1NlcnZpY2Uub3BlbkNvbXBvbmVudEluRGlhbG9nKFxuICAgICAgdGhpcy5jb2xsZWN0aW9uRm9ybUNvbXBvbmVudE9wdGlvbnMoJ2VkaXQnLCBDb21tb24uY2xvbmUoY29sbGVjdGlvbikpXG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyBzaG93U2hhcmVNZW1iZXJzKGNvbGxlY3Rpb246IENvbGxlY3Rpb25TdW1tYXJ5SXRlbSkge1xuICAgIHRoaXMuZGlhbG9nU2VydmljZS5vcGVuQ29tcG9uZW50SW5EaWFsb2coXG4gICAgICB7XG4gICAgICAgIGNvbXBvbmVudFR5cGU6IENvbGxlY3Rpb25TaGFyZU1lbWJlcnNDb21wb25lbnQsXG4gICAgICAgIGRpYWxvZ0NvbmZpZzogeyBwb3NpdGlvbjogeyB0b3A6ICcxMiUnIH0gfSxcbiAgICAgICAgaW5wdXRPcHRpb25zOiB7XG4gICAgICAgICAgY29sbGVjdGlvbjogQ29tbW9uLmNsb25lKGNvbGxlY3Rpb24pLFxuICAgICAgICB9LFxuICAgICAgICBvdXRwdXRPcHRpb25zOiBbe1xuICAgICAgICAgIGV2ZW50OiAnY2xvc2UnLFxuICAgICAgICAgIGNhbGxiYWNrOiAoKSA9PiB0cnVlLFxuICAgICAgICAgIGNsb3NlT25FdmVudDogdHJ1ZVxuICAgICAgICB9XVxuICAgICAgfVxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgY3JlYXRlQ29sbGVjdGlvbigpIHtcbiAgICB0aGlzLmRpYWxvZ1NlcnZpY2Uub3BlbkNvbXBvbmVudEluRGlhbG9nKFxuICAgICAgdGhpcy5jb2xsZWN0aW9uRm9ybUNvbXBvbmVudE9wdGlvbnMoJ2NyZWF0ZScpXG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyBvbkR1cGxpY2F0ZUNvbGxlY3Rpb24oY29sbGVjdGlvbklkOiBudW1iZXIpIHtcbiAgICB0aGlzLmNvbGxlY3Rpb25zLmdldEJ5SWRBbmREdXBsaWNhdGUoY29sbGVjdGlvbklkKVxuICAgICAgLnN1YnNjcmliZShjb2xsZWN0aW9uID0+IHtcbiAgICAgICAgdGhpcy5kaWFsb2dTZXJ2aWNlLm9wZW5Db21wb25lbnRJbkRpYWxvZyhcbiAgICAgICAgICB0aGlzLmNvbGxlY3Rpb25Gb3JtQ29tcG9uZW50T3B0aW9ucygnZHVwbGljYXRlJywgY29sbGVjdGlvbilcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHVibGljIG9uQ3JlYXRlU2hhcmVEaWFsb2coY29sbGVjdGlvbjogQ29sbGVjdGlvbikge1xuICAgIHRoaXMuZGlhbG9nU2VydmljZS5vcGVuQ29tcG9uZW50SW5EaWFsb2coXG4gICAgICB7XG4gICAgICAgIGNvbXBvbmVudFR5cGU6IENvbGxlY3Rpb25TaGFyZUNvbXBvbmVudCxcbiAgICAgICAgZGlhbG9nQ29uZmlnOiB7IHBvc2l0aW9uOiB7IHRvcDogJzMlJyB9LCBwYW5lbENsYXNzOiAnd3otc2hhcmUtZGlhbG9nJyB9LFxuICAgICAgICBpbnB1dE9wdGlvbnM6IHtcbiAgICAgICAgICByZWxvYWRUeXBlOiAnY29sbGVjdGlvbnMnLFxuICAgICAgICAgIGNvbGxlY3Rpb246IENvbW1vbi5jbG9uZShjb2xsZWN0aW9uKSxcbiAgICAgICAgfSxcbiAgICAgICAgb3V0cHV0T3B0aW9uczogW3tcbiAgICAgICAgICBldmVudDogJ2Nsb3NlUmVxdWVzdCcsXG4gICAgICAgICAgY2FsbGJhY2s6ICgpID0+IHRydWUsXG4gICAgICAgICAgY2xvc2VPbkV2ZW50OiB0cnVlXG4gICAgICAgIH1dXG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgY29sbGVjdGlvbkZvcm1Db21wb25lbnRPcHRpb25zKGFjdGlvblR5cGU6IENvbGxlY3Rpb25BY3Rpb25UeXBlLCBjb2xsZWN0aW9uOiBQb2pvIHwgYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbXBvbmVudFR5cGU6IENvbGxlY3Rpb25Gb3JtQ29tcG9uZW50LFxuICAgICAgaW5wdXRPcHRpb25zOiB7XG4gICAgICAgIGNvbGxlY3Rpb246IGNvbGxlY3Rpb24sXG4gICAgICAgIGZpZWxkczogdGhpcy5mb3JtRmllbGRzLFxuICAgICAgICBjb2xsZWN0aW9uQWN0aW9uVHlwZTogYWN0aW9uVHlwZVxuICAgICAgfSxcbiAgICAgIG91dHB1dE9wdGlvbnM6IFt7XG4gICAgICAgIGV2ZW50OiAnY29sbGVjdGlvblNhdmVkJyxcbiAgICAgICAgY2FsbGJhY2s6IChldmVudDogV3pFdmVudCkgPT4gdHJ1ZSxcbiAgICAgICAgY2xvc2VPbkV2ZW50OiB0cnVlXG4gICAgICB9XVxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIGdldCBmb3JtRmllbGRzKCkge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLnNuYXBzaG90Q2xvbmVkKHN0YXRlID0+IHN0YXRlLnVpQ29uZmlnLmNvbXBvbmVudHMuY29sbGVjdGlvbi5jb25maWcpO1xuICB9XG59XG4iXX0=
