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
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], CartEffects.prototype, "load", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], CartEffects.prototype, "editLineItemFromDetails", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], CartEffects.prototype, "showSnackbarOnEditLineItemSuccess", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], CartEffects.prototype, "removeAsset", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], CartEffects.prototype, "showSnackbarOnRemoveAssetSuccess", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], CartEffects.prototype, "changeRouteOnRemoveAssetSuccess", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], CartEffects.prototype, "addNote", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], CartEffects.prototype, "removeNote", void 0);
    CartEffects = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [effects_1.Actions, app_store_1.AppStore, cart_service_1.FutureCartService])
    ], CartEffects);
    return CartEffects;
}());
exports.CartEffects = CartEffects;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9jYXJ0L2NhcnQuZWZmZWN0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUEyQztBQUMzQyw4Q0FBNkM7QUFDN0MseUNBQWdEO0FBR2hELDRDQUE4QztBQUM5Qyw2Q0FBMkM7QUFDM0MsK0NBQW1EO0FBSW5EO0lBMkRFLHFCQUFvQixPQUFnQixFQUFVLEtBQWUsRUFBVSxPQUEwQjtRQUFqRyxpQkFBc0c7UUFBbEYsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQUFVLFVBQUssR0FBTCxLQUFLLENBQVU7UUFBVSxZQUFPLEdBQVAsT0FBTyxDQUFtQjtRQXpEMUYsU0FBSSxHQUF1QixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzthQUN6RSxTQUFTLENBQUMsVUFBQSxNQUFNLElBQUksT0FBQSxLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFuQixDQUFtQixDQUFDO2FBQ3hDLEdBQUcsQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLEtBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQTlCLENBQThCLENBQUMsRUFBNUQsQ0FBNEQsQ0FBQzthQUN6RSxLQUFLLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSx1QkFBVSxDQUFDLEVBQUUsQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUEvQixDQUErQixDQUFDLENBQUMsRUFBNUUsQ0FBNEUsQ0FBQyxDQUFDO1FBR3pGLDRCQUF1QixHQUF1QixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDO2FB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REMsZ0JBQU0sRUFBRTtrQ0FDaUMsdUJBQVU7MEVBRy9DO0lBR0w7UUFEQyxnQkFBTSxFQUFFO2tDQUNXLHVCQUFVO29EQUsxQjtJQUdKO1FBREMsZ0JBQU0sRUFBRTtrQ0FDZ0MsdUJBQVU7eUVBRy9DO0lBR0o7UUFEQyxnQkFBTSxFQUFFO2tDQUMrQix1QkFBVTt3RUFHOUM7SUFHSjtRQURDLGdCQUFNLEVBQUU7a0NBQ08sdUJBQVU7Z0RBS3RCO0lBR0o7UUFEQyxnQkFBTSxFQUFFO2tDQUNVLHVCQUFVO21EQUt6QjtJQXpETyxXQUFXO1FBRHZCLGlCQUFVLEVBQUU7eUNBNERrQixpQkFBTyxFQUFpQixvQkFBUSxFQUFtQixnQ0FBaUI7T0EzRHRGLFdBQVcsQ0FrRXZCO0lBQUQsa0JBQUM7Q0FsRUQsQUFrRUMsSUFBQTtBQWxFWSxrQ0FBVyIsImZpbGUiOiJhcHAvc3RvcmUvY2FydC9jYXJ0LmVmZmVjdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IEVmZmVjdCwgQWN0aW9ucyB9IGZyb20gJ0BuZ3J4L2VmZmVjdHMnO1xuaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuXG5pbXBvcnQgKiBhcyBDYXJ0QWN0aW9ucyBmcm9tICcuL2NhcnQuYWN0aW9ucyc7XG5pbXBvcnQgeyBBcHBTdG9yZSB9IGZyb20gJy4uLy4uL2FwcC5zdG9yZSc7XG5pbXBvcnQgeyBGdXR1cmVDYXJ0U2VydmljZSB9IGZyb20gJy4vY2FydC5zZXJ2aWNlJztcbmltcG9ydCB7IENhcnQsIEFzc2V0TGluZUl0ZW0gfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9jb21tZXJjZS5pbnRlcmZhY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ2FydEVmZmVjdHMge1xuICBARWZmZWN0KClcbiAgcHVibGljIGxvYWQ6IE9ic2VydmFibGU8QWN0aW9uPiA9IHRoaXMuYWN0aW9ucy5vZlR5cGUoQ2FydEFjdGlvbnMuTG9hZC5UeXBlKVxuICAgIC5zd2l0Y2hNYXAoYWN0aW9uID0+IHRoaXMuc2VydmljZS5sb2FkKCkpXG4gICAgLm1hcChjYXJ0ID0+IHRoaXMuc3RvcmUuY3JlYXRlKGZhY3RvcnkgPT4gZmFjdG9yeS5jYXJ0LmxvYWRTdWNjZXNzKGNhcnQpKSlcbiAgICAuY2F0Y2goZXJyb3IgPT4gT2JzZXJ2YWJsZS5vZih0aGlzLnN0b3JlLmNyZWF0ZShmYWN0b3J5ID0+IGZhY3RvcnkuY2FydC5sb2FkRmFpbHVyZShlcnJvcikpKSk7XG5cbiAgQEVmZmVjdCgpXG4gIHB1YmxpYyBlZGl0TGluZUl0ZW1Gcm9tRGV0YWlsczogT2JzZXJ2YWJsZTxBY3Rpb24+ID0gdGhpcy5hY3Rpb25zLm9mVHlwZShDYXJ0QWN0aW9ucy5FZGl0TGluZUl0ZW1Gcm9tRGV0YWlscy5UeXBlKVxuICAgIC53aXRoTGF0ZXN0RnJvbSh0aGlzLnN0b3JlLnNlbGVjdChzdGF0ZSA9PiBzdGF0ZS5jYXJ0LmRhdGEpKVxuICAgIC5zd2l0Y2hNYXAoKFthY3Rpb24sIGNhcnRdOiBbQ2FydEFjdGlvbnMuRWRpdExpbmVJdGVtRnJvbURldGFpbHMsIENhcnRdKSA9PiB7XG4gICAgICBjb25zdCBsaW5lSXRlbVRvRWRpdDogQXNzZXRMaW5lSXRlbSA9IHRoaXMuZmluZExpbmVJdGVtQnkoYWN0aW9uLnV1aWQsIGNhcnQpO1xuICAgICAgcmV0dXJuIHRoaXMuc2VydmljZS5lZGl0TGluZUl0ZW0obGluZUl0ZW1Ub0VkaXQsIGFjdGlvbi5tYXJrZXJzLCBhY3Rpb24uYXR0cmlidXRlcylcbiAgICAgICAgLm1hcChjYXJ0ID0+IHRoaXMuc3RvcmUuY3JlYXRlKGZhY3RvcnkgPT4gZmFjdG9yeS5jYXJ0LmVkaXRMaW5lSXRlbUZyb21EZXRhaWxzU3VjY2VzcyhjYXJ0KSkpXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiBPYnNlcnZhYmxlLm9mKHRoaXMuc3RvcmUuY3JlYXRlKGZhY3RvcnkgPT4gZmFjdG9yeS5jYXJ0LmVkaXRMaW5lSXRlbUZyb21EZXRhaWxzRmFpbHVyZShlcnJvcikpKSk7XG4gICAgfSk7XG5cbiAgQEVmZmVjdCgpXG4gIHB1YmxpYyBzaG93U25hY2tiYXJPbkVkaXRMaW5lSXRlbVN1Y2Nlc3M6IE9ic2VydmFibGU8QWN0aW9uPiA9XG4gICAgdGhpcy5hY3Rpb25zLm9mVHlwZShDYXJ0QWN0aW9ucy5FZGl0TGluZUl0ZW1Gcm9tRGV0YWlsc1N1Y2Nlc3MuVHlwZSkubWFwKCgpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLnN0b3JlLmNyZWF0ZShmYWN0b3J5ID0+IGZhY3Rvcnkuc25hY2tiYXIuZGlzcGxheSgnQVNTRVQuREVUQUlMLkNBUlRfSVRFTV9VUERBVEVEJykpO1xuICAgIH0pO1xuXG4gIEBFZmZlY3QoKVxuICBwdWJsaWMgcmVtb3ZlQXNzZXQ6IE9ic2VydmFibGU8QWN0aW9uPiA9IHRoaXMuYWN0aW9ucy5vZlR5cGUoQ2FydEFjdGlvbnMuUmVtb3ZlQXNzZXQuVHlwZSlcbiAgICAud2l0aExhdGVzdEZyb20odGhpcy5zdG9yZS5zZWxlY3Qoc3RhdGUgPT4gc3RhdGUuY2FydC5kYXRhLmlkKSlcbiAgICAuc3dpdGNoTWFwKChbYWN0aW9uLCBjYXJ0SWRdOiBbQ2FydEFjdGlvbnMuUmVtb3ZlQXNzZXQsIG51bWJlcl0pID0+IHRoaXMuc2VydmljZS5yZW1vdmVBc3NldChhY3Rpb24uYXNzZXQpXG4gICAgICAubWFwKGNhcnQgPT4gdGhpcy5zdG9yZS5jcmVhdGUoZmFjdG9yeSA9PiBmYWN0b3J5LmNhcnQucmVtb3ZlQXNzZXRTdWNjZXNzKGNhcnQpKSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiBPYnNlcnZhYmxlLm9mKHRoaXMuc3RvcmUuY3JlYXRlKGZhY3RvcnkgPT4gZmFjdG9yeS5jYXJ0LnJlbW92ZUFzc2V0RmFpbHVyZShlcnJvcikpKSlcbiAgICApO1xuXG4gIEBFZmZlY3QoKVxuICBwdWJsaWMgc2hvd1NuYWNrYmFyT25SZW1vdmVBc3NldFN1Y2Nlc3M6IE9ic2VydmFibGU8QWN0aW9uPiA9XG4gICAgdGhpcy5hY3Rpb25zLm9mVHlwZShDYXJ0QWN0aW9ucy5SZW1vdmVBc3NldFN1Y2Nlc3MuVHlwZSkubWFwKChhY3Rpb246IENhcnRBY3Rpb25zLlJlbW92ZUFzc2V0U3VjY2VzcykgPT5cbiAgICAgIHRoaXMuc3RvcmUuY3JlYXRlKGZhY3RvcnkgPT4gZmFjdG9yeS5zbmFja2Jhci5kaXNwbGF5KCdDQVJULlJFTU9WRV9BU1NFVC5TVUNDRVNTJykpXG4gICAgKTtcblxuICBARWZmZWN0KClcbiAgcHVibGljIGNoYW5nZVJvdXRlT25SZW1vdmVBc3NldFN1Y2Nlc3M6IE9ic2VydmFibGU8QWN0aW9uPiA9XG4gICAgdGhpcy5hY3Rpb25zLm9mVHlwZShDYXJ0QWN0aW9ucy5SZW1vdmVBc3NldFN1Y2Nlc3MuVHlwZSkubWFwKChhY3Rpb246IENhcnRBY3Rpb25zLlJlbW92ZUFzc2V0U3VjY2VzcykgPT5cbiAgICAgIHRoaXMuc3RvcmUuY3JlYXRlKGZhY3RvcnkgPT4gZmFjdG9yeS5yb3V0ZXIuZ29Ub0NhcnQoKSlcbiAgICApO1xuXG4gIEBFZmZlY3QoKVxuICBwdWJsaWMgYWRkTm90ZTogT2JzZXJ2YWJsZTxBY3Rpb24+ID0gdGhpcy5hY3Rpb25zLm9mVHlwZShDYXJ0QWN0aW9ucy5BZGROb3RlLlR5cGUpXG4gICAgLnN3aXRjaE1hcCgoYWN0aW9uOiBDYXJ0QWN0aW9ucy5BZGROb3RlKSA9PlxuICAgICAgdGhpcy5zZXJ2aWNlLmFkZE5vdGUoYWN0aW9uLm5vdGUsIGFjdGlvbi5saW5lSXRlbSlcbiAgICAgICAgLm1hcCgoY2FydCkgPT4gdGhpcy5zdG9yZS5jcmVhdGUoZmFjdG9yeSA9PiBmYWN0b3J5LmNhcnQuYWRkTm90ZVN1Y2Nlc3MoY2FydCkpKVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4gT2JzZXJ2YWJsZS5vZih0aGlzLnN0b3JlLmNyZWF0ZShmYWN0b3J5ID0+IGZhY3RvcnkuZXJyb3IuaGFuZGxlKGVycm9yKSkpKVxuICAgICk7XG5cbiAgQEVmZmVjdCgpXG4gIHB1YmxpYyByZW1vdmVOb3RlOiBPYnNlcnZhYmxlPEFjdGlvbj4gPSB0aGlzLmFjdGlvbnMub2ZUeXBlKENhcnRBY3Rpb25zLlJlbW92ZU5vdGUuVHlwZSlcbiAgICAuc3dpdGNoTWFwKChhY3Rpb246IENhcnRBY3Rpb25zLlJlbW92ZU5vdGUpID0+XG4gICAgICB0aGlzLnNlcnZpY2UucmVtb3ZlTm90ZUZyb20oYWN0aW9uLmxpbmVJdGVtKVxuICAgICAgICAubWFwKChjYXJ0KSA9PiB0aGlzLnN0b3JlLmNyZWF0ZShmYWN0b3J5ID0+IGZhY3RvcnkuY2FydC5yZW1vdmVOb3RlU3VjY2VzcyhjYXJ0KSkpXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiBPYnNlcnZhYmxlLm9mKHRoaXMuc3RvcmUuY3JlYXRlKGZhY3RvcnkgPT4gZmFjdG9yeS5lcnJvci5oYW5kbGUoZXJyb3IpKSkpXG4gICAgKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFjdGlvbnM6IEFjdGlvbnMsIHByaXZhdGUgc3RvcmU6IEFwcFN0b3JlLCBwcml2YXRlIHNlcnZpY2U6IEZ1dHVyZUNhcnRTZXJ2aWNlKSB7IH1cblxuICBwcml2YXRlIGZpbmRMaW5lSXRlbUJ5KGFzc2V0TGluZUl0ZW1VdWlkOiBzdHJpbmcsIGNhcnQ6IENhcnQpOiBBc3NldExpbmVJdGVtIHtcbiAgICByZXR1cm4gY2FydC5wcm9qZWN0c1xuICAgICAgLnJlZHVjZSgoYWxsTGluZUl0ZW1zLCBwcm9qZWN0KSA9PiBhbGxMaW5lSXRlbXMuY29uY2F0KHByb2plY3QubGluZUl0ZW1zKSwgW10pXG4gICAgICAuZmluZChsaW5lSXRlbSA9PiBsaW5lSXRlbS5pZCA9PT0gYXNzZXRMaW5lSXRlbVV1aWQpO1xuICB9XG59XG4iXX0=
