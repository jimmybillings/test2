"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
var effects_1 = require("@ngrx/effects");
var CartActions = require("./cart.actions");
var app_store_1 = require("../../app.store");
var cart_service_1 = require("./cart.service");
var CartEffects = (function () {
    function CartEffects(actions, store, service) {
        var _this = this;
        this.actions = actions;
        this.store = store;
        this.service = service;
        this.load = this.actions.ofType(CartActions.Load.Type)
            .switchMap(function (action) { return _this.service.load(); })
            .map(function (cart) { return _this.store.create(function (factory) { return factory.cart.loadSuccess(cart); }); })
            .catch(function (error) { return Observable_1.Observable.of(_this.store.create(function (factory) { return factory.cart.loadFailure(error); })); });
        this.editLineItemFromDetails = this.actions.ofType(CartActions.EditLineItemFromDetails.Type)
            .withLatestFrom(this.store.select(function (state) { return state.cart.data; }))
            .switchMap(function (_a) {
            var action = _a[0], cart = _a[1];
            var lineItemToEdit = _this.findLineItemBy(action.uuid, cart);
            return _this.service.editLineItem(lineItemToEdit, action.markers, action.attributes)
                .map(function (cart) { return _this.store.create(function (factory) { return factory.cart.editLineItemFromDetailsSuccess(cart); }); })
                .catch(function (error) { return Observable_1.Observable.of(_this.store.create(function (factory) { return factory.cart.editLineItemFromDetailsFailure(error); })); });
        });
        this.showSnackbarOnEditLineItemSuccess = this.actions.ofType(CartActions.EditLineItemFromDetailsSuccess.Type).map(function () {
            return _this.store.create(function (factory) { return factory.snackbar.display('ASSET.DETAIL.CART_ITEM_UPDATED'); });
        });
        this.removeAsset = this.actions.ofType(CartActions.RemoveAsset.Type)
            .withLatestFrom(this.store.select(function (state) { return state.cart.data.id; }))
            .switchMap(function (_a) {
            var action = _a[0], cartId = _a[1];
            return _this.service.removeAsset(action.asset)
                .map(function (cart) { return _this.store.create(function (factory) { return factory.cart.removeAssetSuccess(cart); }); })
                .catch(function (error) { return Observable_1.Observable.of(_this.store.create(function (factory) { return factory.cart.removeAssetFailure(error); })); });
        });
        this.showSnackbarOnRemoveAssetSuccess = this.actions.ofType(CartActions.RemoveAssetSuccess.Type).map(function (action) {
            return _this.store.create(function (factory) { return factory.snackbar.display('CART.REMOVE_ASSET.SUCCESS'); });
        });
        this.changeRouteOnRemoveAssetSuccess = this.actions.ofType(CartActions.RemoveAssetSuccess.Type).map(function (action) {
            return _this.store.create(function (factory) { return factory.router.goToCart(); });
        });
        this.addNote = this.actions.ofType(CartActions.AddNote.Type)
            .switchMap(function (action) {
            return _this.service.addNote(action.note, action.lineItem)
                .map(function (cart) { return _this.store.create(function (factory) { return factory.cart.addNoteSuccess(cart); }); })
                .catch(function (error) { return Observable_1.Observable.of(_this.store.create(function (factory) { return factory.error.handle(error); })); });
        });
        this.removeNote = this.actions.ofType(CartActions.RemoveNote.Type)
            .switchMap(function (action) {
            return _this.service.removeNoteFrom(action.lineItem)
                .map(function (cart) { return _this.store.create(function (factory) { return factory.cart.removeNoteSuccess(cart); }); })
                .catch(function (error) { return Observable_1.Observable.of(_this.store.create(function (factory) { return factory.error.handle(error); })); });
        });
    }
    CartEffects.prototype.findLineItemBy = function (assetLineItemUuid, cart) {
        return cart.projects
            .reduce(function (allLineItems, project) { return allLineItems.concat(project.lineItems); }, [])
            .find(function (lineItem) { return lineItem.id === assetLineItemUuid; });
    };
    CartEffects.decorators = [
        { type: core_1.Injectable },
    ];
    CartEffects.ctorParameters = function () { return [
        { type: effects_1.Actions, },
        { type: app_store_1.AppStore, },
        { type: cart_service_1.FutureCartService, },
    ]; };
    CartEffects.propDecorators = {
        'load': [{ type: effects_1.Effect },],
        'editLineItemFromDetails': [{ type: effects_1.Effect },],
        'showSnackbarOnEditLineItemSuccess': [{ type: effects_1.Effect },],
        'removeAsset': [{ type: effects_1.Effect },],
        'showSnackbarOnRemoveAssetSuccess': [{ type: effects_1.Effect },],
        'changeRouteOnRemoveAssetSuccess': [{ type: effects_1.Effect },],
        'addNote': [{ type: effects_1.Effect },],
        'removeNote': [{ type: effects_1.Effect },],
    };
    return CartEffects;
}());
exports.CartEffects = CartEffects;
//# sourceMappingURL=cart.effects.js.map