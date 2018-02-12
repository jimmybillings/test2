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
var Observable_1 = require("rxjs/Observable");
var effects_1 = require("@ngrx/effects");
var core_1 = require("@angular/core");
var QuoteEditActions = require("./quote-edit.actions");
var quote_edit_service_1 = require("./quote-edit.service");
var app_store_1 = require("../../app.store");
var QuoteEditEffects = (function () {
    function QuoteEditEffects(actions, store, service) {
        var _this = this;
        this.actions = actions;
        this.store = store;
        this.service = service;
        this.load = this.actions.ofType(QuoteEditActions.Load.Type)
            .switchMap(function () { return _this.service.load()
            .map(function (quote) { return _this.store.create(function (factory) { return factory.quoteEdit.loadSuccess(quote); }); })
            .catch(function (error) { return Observable_1.Observable.of(_this.store.create(function (factory) { return factory.quoteEdit.loadFailure(error); })); }); });
        this.delete = this.actions.ofType(QuoteEditActions.Delete.Type)
            .withLatestFrom(this.store.select(function (state) { return state.quoteEdit.data.id; }))
            .switchMap(function (_a) {
            var action = _a[0], quoteId = _a[1];
            return _this.service.delete(quoteId)
                .map(function (quote) { return _this.store.create(function (factory) { return factory.quoteEdit.deleteSuccess(quote); }); })
                .catch(function (error) { return Observable_1.Observable.of(_this.store.create(function (factory) { return factory.quoteEdit.deleteFailure(error); })); });
        });
        this.changeRouteOnDeleteSuccess = this.actions.ofType(QuoteEditActions.DeleteSuccess.Type)
            .map(function () { return _this.store.create(function (factory) { return factory.router.goToQuotes(); }); });
        this.editLineItemFromDetails = this.actions.ofType(QuoteEditActions.EditLineItemFromDetails.Type)
            .withLatestFrom(this.store.select(function (state) { return state.quoteEdit.data; }))
            .switchMap(function (_a) {
            var action = _a[0], quote = _a[1];
            var lineItemToEdit = _this.findLineItemBy(action.uuid, quote);
            return _this.service.editLineItemFromDetails(quote.id, lineItemToEdit, action.markers, action.attributes)
                .map(function (quote) { return _this.store.create(function (factory) { return factory.quoteEdit.editLineItemFromDetailsSuccess(quote); }); })
                .catch(function (error) { return Observable_1.Observable.of(_this.store.create(function (factory) { return factory.quoteEdit.editLineItemFromDetailsFailure(error); })); });
        });
        this.showSnackbarOnEditLineItemSuccess = this.actions.ofType(QuoteEditActions.EditLineItemFromDetailsSuccess.Type).map(function () {
            return _this.store.create(function (factory) { return factory.snackbar.display('ASSET.DETAIL.QUOTE_ITEM_UPDATED'); });
        });
        this.removeAsset = this.actions.ofType(QuoteEditActions.RemoveAsset.Type)
            .withLatestFrom(this.store.select(function (state) { return state.quoteEdit.data.id; }))
            .switchMap(function (_a) {
            var action = _a[0], quoteId = _a[1];
            return _this.service.removeAsset(quoteId, action.asset)
                .map(function (quote) { return _this.store.create(function (factory) { return factory.quoteEdit.removeAssetSuccess(quote); }); })
                .catch(function (error) { return Observable_1.Observable.of(_this.store.create(function (factory) { return factory.quoteEdit.removeAssetFailure(error); })); });
        });
        this.showSnackbarOnRemoveAssetSuccess = this.actions.ofType(QuoteEditActions.RemoveAssetSuccess.Type).map(function (action) {
            return _this.store.create(function (factory) { return factory.snackbar.display('QUOTE.REMOVE_ASSET.SUCCESS'); });
        });
        this.changeRouteOnRemoveAssetSuccess = this.actions.ofType(QuoteEditActions.RemoveAssetSuccess.Type).map(function (action) {
            return _this.store.create(function (factory) { return factory.router.goToActiveQuote(); });
        });
        this.addCustomPriceToLineItem = this.actions.ofType(QuoteEditActions.AddCustomPriceToLineItem.Type)
            .withLatestFrom(this.store.select(function (state) { return state.quoteEdit.data.id; }))
            .switchMap(function (_a) {
            var action = _a[0], quoteId = _a[1];
            return _this.service.addCustomPriceToLineItem(quoteId, action.lineItem, action.price, action.override)
                .map(function (quote) { return _this.store.create(function (factory) { return factory.quoteEdit.addCustomPriceToLineItemSuccess(quote); }); })
                .catch(function (error) { return Observable_1.Observable.of(_this.store.create(function (factory) { return factory.quoteEdit.addCustomPriceToLineItemFailure(error); })); });
        });
        this.sendQuote = this.actions.ofType(QuoteEditActions.SendQuote.Type)
            .withLatestFrom(this.store.select(function (state) { return state.quoteEdit; }))
            .switchMap(function (_a) {
            var action = _a[0], quoteEdit = _a[1];
            var invoiceContactType, invoiceContactId;
            if (quoteEdit.sendDetails.invoiceContact.hasOwnProperty('id')) {
                invoiceContactType = 'User';
                invoiceContactId = quoteEdit.sendDetails.invoiceContact.id;
            }
            var details = {
                expirationDate: new Date(quoteEdit.sendDetails.salesManager.expirationDate),
                agreementId: quoteEdit.sendDetails.salesManager.offlineAgreement || undefined,
                salesManager: quoteEdit.sendDetails.salesManager.salesManager,
                salesOwner: quoteEdit.sendDetails.billingAccount.salesOwner,
                paymentTermsDays: quoteEdit.sendDetails.billingAccount.paymentTermsDays,
                billingAccountId: quoteEdit.sendDetails.billingAccount.id,
                invoiceContactType: invoiceContactType,
                invoiceContactId: invoiceContactId
            };
            return _this.service.sendQuote(quoteEdit.data.id, quoteEdit.sendDetails.user.email, details)
                .map(function () {
                return _this.store.create(function (factory) {
                    return factory.quoteEdit.sendQuoteSuccess(quoteEdit.data.id, quoteEdit.sendDetails.user.email);
                });
            })
                .catch(function (error) {
                return Observable_1.Observable.of(_this.store.create(function (factory) {
                    return factory.error.handle(error);
                }));
            });
        });
        this.sendQuoteSuccess = this.actions
            .ofType(QuoteEditActions.SendQuoteSuccess.Type)
            .mergeMap(function (action) {
            return [
                _this.store.create(function (factory) {
                    return factory.router.goToQuoteById(action.quoteId);
                }),
                _this.store.create(function (factory) { return factory.quoteEdit.load(); }),
                _this.store.create(function (factory) {
                    return factory.snackbar.display('QUOTE.CREATED_FOR_TOAST', { emailAddress: action.ownerEmail });
                })
            ];
        });
        this.cloneQuote = this.actions
            .ofType(QuoteEditActions.CloneQuote.Type)
            .switchMap(function (action) {
            return _this.service.cloneQuote(action.quote)
                .map(function (quote) {
                return _this.store.create(function (factory) { return factory.quoteEdit.cloneQuoteSuccess(quote); });
            })
                .catch(function (error) { return Observable_1.Observable.of(_this.store.create(function (factory) { return factory.error.handle(error); })); });
        });
        this.cloneQuoteSuccess = this.actions
            .ofType(QuoteEditActions.CloneQuoteSuccess.Type)
            .mergeMap(function () {
            return [
                _this.store.create(function (factory) { return factory.router.goToActiveQuote(); }),
                _this.store.create(function (factory) { return factory.snackbar.display('QUOTE.UPDATED'); })
            ];
        });
        this.createQuote = this.actions
            .ofType(QuoteEditActions.CreateQuote.Type)
            .switchMap(function (action) {
            return _this.service.createQuote()
                .map(function (quote) {
                return _this.store.create(function (factory) {
                    return factory.quoteEdit.refreshAndNotify(quote, 'QUOTE.UPDATED');
                });
            })
                .catch(function (error) { return Observable_1.Observable.of(_this.store.create(function (factory) { return factory.error.handle(error); })); });
        });
        this.updateQuoteFields = this.actions
            .ofType(QuoteEditActions.UpdateQuoteFields.Type)
            .withLatestFrom(this.store.select(function (state) { return state.quoteEdit.data; }))
            .switchMap(function (_a) {
            var action = _a[0], quote = _a[1];
            return _this.service.updateQuoteField(action.options, quote)
                .map(function (quote) { return _this.store.create(function (factory) {
                return factory.quoteEdit.refreshAndNotify(quote, 'QUOTE.UPDATED');
            }); })
                .catch(function (error) { return Observable_1.Observable.of(_this.store.create(function (factory) { return factory.error.handle(error); })); });
        });
        this.addFeeTo = this.actions
            .ofType(QuoteEditActions.AddFeeTo.Type)
            .withLatestFrom(this.store.select(function (state) { return state.quoteEdit.data.id; }))
            .switchMap(function (_a) {
            var action = _a[0], quoteId = _a[1];
            return _this.service.addFeeTo(quoteId, action.project, action.fee)
                .map(function (quote) { return _this.store.create(function (factory) {
                return factory.quoteEdit.refreshAndNotify(quote, 'QUOTE.UPDATED');
            }); })
                .catch(function (error) { return Observable_1.Observable.of(_this.store.create(function (factory) { return factory.error.handle(error); })); });
        });
        this.removeFee = this.actions
            .ofType(QuoteEditActions.RemoveFee.Type)
            .withLatestFrom(this.store.select(function (state) { return state.quoteEdit.data.id; }))
            .switchMap(function (_a) {
            var action = _a[0], quoteId = _a[1];
            return _this.service.removeFee(quoteId, action.fee)
                .map(function (quote) { return _this.store.create(function (factory) {
                return factory.quoteEdit.refreshAndNotify(quote, 'QUOTE.UPDATED');
            }); })
                .catch(function (error) { return Observable_1.Observable.of(_this.store.create(function (factory) { return factory.error.handle(error); })); });
        });
        this.bulkImport = this.actions
            .ofType(QuoteEditActions.BulkImport.Type)
            .withLatestFrom(this.store.select(function (state) { return state.quoteEdit.data.id; }))
            .switchMap(function (_a) {
            var action = _a[0], quoteId = _a[1];
            return _this.service.bulkImport(quoteId, action.rawAssets, action.projectId)
                .map(function (quote) { return _this.store.create(function (factory) {
                return factory.quoteEdit.bulkImportSuccess(quote, action.rawAssets);
            }); })
                .catch(function (error) { return Observable_1.Observable.of(_this.store.create(function (factory) { return factory.error.handle(error); })); });
        });
        this.bulkImportSuccess = this.actions
            .ofType(QuoteEditActions.BulkImportSuccess.Type)
            .map(function (action) {
            return _this.store.create(function (factory) { return factory.snackbar.display('QUOTE.BULK_IMPORT.CONFIRMATION', { numOfAssets: action.rawAssets.lineItemAttributes.split('\n').length }); });
        });
        this.editLineItem = this.actions
            .ofType(QuoteEditActions.EditLineItem.Type)
            .withLatestFrom(this.store.select(function (state) { return state.quoteEdit.data.id; }))
            .switchMap(function (_a) {
            var action = _a[0], quoteId = _a[1];
            return _this.service.editLineItem(quoteId, action.lineItem, action.fieldToEdit)
                .map(function (quote) { return _this.store.create(function (factory) {
                return factory.quoteEdit.refreshAndNotify(quote, 'QUOTE.UPDATED');
            }); })
                .catch(function (error) { return Observable_1.Observable.of(_this.store.create(function (factory) { return factory.error.handle(error); })); });
        });
        this.addAssetToProjectInQuote = this.actions
            .ofType(QuoteEditActions.AddAssetToProjectInQuote.Type)
            .withLatestFrom(this.store.select(function (state) { return state.quoteEdit.data; }))
            .switchMap(function (_a) {
            var action = _a[0], quote = _a[1];
            var existingProjects = (quote.projects || []).map(function (project) { return project.name; });
            return _this.service.addAssetToProjectInQuote(quote.id, existingProjects, action.parameters)
                .map(function (quote) { return _this.store.create(function (factory) {
                return factory.quoteEdit.addAssetToProjectInQuoteSuccess(quote, action.parameters.lineItem.asset.assetId);
            }); })
                .catch(function (error) { return Observable_1.Observable.of(_this.store.create(function (factory) { return factory.error.handle(error); })); });
        });
        this.addAssetToProjectInQuoteSuccess = this.actions
            .ofType(QuoteEditActions.AddAssetToProjectInQuoteSuccess.Type)
            .map(function (action) {
            return _this.store.create(function (factory) {
                return factory.snackbar.display('ASSET.ADD_TO_QUOTE_TOAST', { assetId: action.assetId });
            });
        });
        this.addProject = this.actions
            .ofType(QuoteEditActions.AddProject.Type)
            .withLatestFrom(this.store.select(function (state) { return state.quoteEdit.data.id; }))
            .switchMap(function (_a) {
            var action = _a[0], quoteId = _a[1];
            return _this.service.addProject(quoteId)
                .map(function (quote) { return _this.store.create(function (factory) {
                return factory.quoteEdit.refreshAndNotify(quote, 'QUOTE.UPDATED');
            }); })
                .catch(function (error) { return Observable_1.Observable.of(_this.store.create(function (factory) { return factory.error.handle(error); })); });
        });
        this.removeProject = this.actions
            .ofType(QuoteEditActions.RemoveProject.Type)
            .withLatestFrom(this.store.select(function (state) { return state.quoteEdit.data.id; }))
            .switchMap(function (_a) {
            var action = _a[0], quoteId = _a[1];
            return _this.service.removeProject(quoteId, action.projectId)
                .map(function (quote) { return _this.store.create(function (factory) {
                return factory.quoteEdit.refreshAndNotify(quote, 'QUOTE.UPDATED');
            }); })
                .catch(function (error) { return Observable_1.Observable.of(_this.store.create(function (factory) { return factory.error.handle(error); })); });
        });
        this.updateProject = this.actions
            .ofType(QuoteEditActions.UpdateProject.Type)
            .withLatestFrom(this.store.select(function (state) { return state.quoteEdit.data.id; }))
            .switchMap(function (_a) {
            var action = _a[0], quoteId = _a[1];
            return _this.service.updateProject(quoteId, action.project)
                .map(function (quote) { return _this.store.create(function (factory) {
                return factory.quoteEdit.refreshAndNotify(quote, 'QUOTE.UPDATED');
            }); })
                .catch(function (error) { return Observable_1.Observable.of(_this.store.create(function (factory) { return factory.error.handle(error); })); });
        });
        this.moveLineItem = this.actions
            .ofType(QuoteEditActions.MoveLineItem.Type)
            .withLatestFrom(this.store.select(function (state) { return state.quoteEdit.data.id; }))
            .switchMap(function (_a) {
            var action = _a[0], quoteId = _a[1];
            return _this.service.moveLineItem(quoteId, action.project, action.lineItem)
                .map(function (quote) { return _this.store.create(function (factory) {
                return factory.quoteEdit.refreshAndNotify(quote, 'QUOTE.UPDATED');
            }); })
                .catch(function (error) { return Observable_1.Observable.of(_this.store.create(function (factory) { return factory.error.handle(error); })); });
        });
        this.cloneLineItem = this.actions
            .ofType(QuoteEditActions.CloneLineItem.Type)
            .withLatestFrom(this.store.select(function (state) { return state.quoteEdit.data.id; }))
            .switchMap(function (_a) {
            var action = _a[0], quoteId = _a[1];
            return _this.service.cloneLineItem(quoteId, action.lineItem)
                .map(function (quote) { return _this.store.create(function (factory) {
                return factory.quoteEdit.refreshAndNotify(quote, 'QUOTE.UPDATED');
            }); })
                .catch(function (error) { return Observable_1.Observable.of(_this.store.create(function (factory) { return factory.error.handle(error); })); });
        });
        this.editLineItemMarkers = this.actions
            .ofType(QuoteEditActions.EditLineItemMarkers.Type)
            .withLatestFrom(this.store.select(function (state) { return state.quoteEdit.data.id; }))
            .switchMap(function (_a) {
            var action = _a[0], quoteId = _a[1];
            return _this.service.editLineItemMarkers(quoteId, action.lineItem, action.newMarkers)
                .map(function (quote) { return _this.store.create(function (factory) {
                return factory.quoteEdit.refreshAndNotify(quote, 'QUOTE.UPDATED');
            }); })
                .catch(function (error) { return Observable_1.Observable.of(_this.store.create(function (factory) { return factory.error.handle(error); })); });
        });
        this.updateProjectPriceAttributes = this.actions
            .ofType(QuoteEditActions.UpdateProjectPriceAttributes.Type)
            .withLatestFrom(this.store.select(function (state) { return state.quoteEdit.data.id; }))
            .switchMap(function (_a) {
            var action = _a[0], quoteId = _a[1];
            return _this.service.updateProjectPriceAttributes(quoteId, action.priceAttributes, action.project)
                .map(function (quote) { return _this.store.create(function (factory) {
                return factory.quoteEdit.refreshAndNotify(quote, 'QUOTE.UPDATED');
            }); })
                .catch(function (error) { return Observable_1.Observable.of(_this.store.create(function (factory) { return factory.error.handle(error); })); });
        });
        this.refreshAndNotify = this.actions
            .ofType(QuoteEditActions.RefreshAndNotify.Type)
            .map(function (action) {
            return _this.store.create(function (factory) {
                return factory.snackbar.display(action.translationString);
            });
        });
        this.addUserToQuote = this.actions
            .ofType(QuoteEditActions.AddUserToQuote.Type)
            .map(function (action) {
            return _this.store.create(function (factory) { return factory.account.getAccountForQuoteAdminOnUserAdd(action.user.accountId); });
        });
        this.addBillingAccountToQuote = this.actions
            .ofType(QuoteEditActions.AddBillingAccountToQuote.Type)
            .map(function (action) {
            return _this.store.create(function (factory) { return factory.account.getAccountForQuoteAdmin(action.account.id); });
        });
        this.addNote = this.actions.ofType(QuoteEditActions.AddNote.Type)
            .withLatestFrom(this.store.select(function (state) { return state.quoteEdit.data.id; }))
            .switchMap(function (_a) {
            var action = _a[0], quoteId = _a[1];
            return _this.service.addNote(quoteId, action.note, action.lineItem)
                .map(function (quote) { return _this.store.create(function (factory) { return factory.quoteEdit.refreshAndNotify(quote, 'QUOTE.UPDATED'); }); })
                .catch(function (error) { return Observable_1.Observable.of(_this.store.create(function (factory) { return factory.error.handle(error); })); });
        });
        this.removeNote = this.actions.ofType(QuoteEditActions.RemoveNote.Type)
            .withLatestFrom(this.store.select(function (state) { return state.quoteEdit.data.id; }))
            .switchMap(function (_a) {
            var action = _a[0], quoteId = _a[1];
            return _this.service.removeNote(quoteId, action.lineItem)
                .map(function (quote) { return _this.store.create(function (factory) { return factory.quoteEdit.refreshAndNotify(quote, 'QUOTE.UPDATED'); }); })
                .catch(function (error) { return Observable_1.Observable.of(_this.store.create(function (factory) { return factory.error.handle(error); })); });
        });
    }
    QuoteEditEffects.prototype.findLineItemBy = function (assetLineItemUuid, quote) {
        return quote.projects
            .reduce(function (allLineItems, project) { return allLineItems.concat(project.lineItems); }, [])
            .find(function (lineItem) { return lineItem.id === assetLineItemUuid; });
    };
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], QuoteEditEffects.prototype, "load", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], QuoteEditEffects.prototype, "delete", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], QuoteEditEffects.prototype, "changeRouteOnDeleteSuccess", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], QuoteEditEffects.prototype, "editLineItemFromDetails", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], QuoteEditEffects.prototype, "showSnackbarOnEditLineItemSuccess", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], QuoteEditEffects.prototype, "removeAsset", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], QuoteEditEffects.prototype, "showSnackbarOnRemoveAssetSuccess", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], QuoteEditEffects.prototype, "changeRouteOnRemoveAssetSuccess", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], QuoteEditEffects.prototype, "addCustomPriceToLineItem", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], QuoteEditEffects.prototype, "sendQuote", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], QuoteEditEffects.prototype, "sendQuoteSuccess", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], QuoteEditEffects.prototype, "cloneQuote", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], QuoteEditEffects.prototype, "cloneQuoteSuccess", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], QuoteEditEffects.prototype, "createQuote", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], QuoteEditEffects.prototype, "updateQuoteFields", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], QuoteEditEffects.prototype, "addFeeTo", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], QuoteEditEffects.prototype, "removeFee", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], QuoteEditEffects.prototype, "bulkImport", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], QuoteEditEffects.prototype, "bulkImportSuccess", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], QuoteEditEffects.prototype, "editLineItem", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], QuoteEditEffects.prototype, "addAssetToProjectInQuote", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], QuoteEditEffects.prototype, "addAssetToProjectInQuoteSuccess", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], QuoteEditEffects.prototype, "addProject", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], QuoteEditEffects.prototype, "removeProject", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], QuoteEditEffects.prototype, "updateProject", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], QuoteEditEffects.prototype, "moveLineItem", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], QuoteEditEffects.prototype, "cloneLineItem", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], QuoteEditEffects.prototype, "editLineItemMarkers", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], QuoteEditEffects.prototype, "updateProjectPriceAttributes", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], QuoteEditEffects.prototype, "refreshAndNotify", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], QuoteEditEffects.prototype, "addUserToQuote", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], QuoteEditEffects.prototype, "addBillingAccountToQuote", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], QuoteEditEffects.prototype, "addNote", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], QuoteEditEffects.prototype, "removeNote", void 0);
    QuoteEditEffects = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [effects_1.Actions,
            app_store_1.AppStore,
            quote_edit_service_1.FutureQuoteEditService])
    ], QuoteEditEffects);
    return QuoteEditEffects;
}());
exports.QuoteEditEffects = QuoteEditEffects;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9xdW90ZS1lZGl0L3F1b3RlLWVkaXQuZWZmZWN0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLDhDQUE2QztBQUU3Qyx5Q0FBZ0Q7QUFDaEQsc0NBQWtEO0FBRWxELHVEQUF5RDtBQUV6RCwyREFBOEQ7QUFDOUQsNkNBQTJDO0FBTTNDO0lBbVhFLDBCQUNVLE9BQWdCLEVBQ2hCLEtBQWUsRUFDZixPQUErQjtRQUh6QyxpQkFJSztRQUhLLFlBQU8sR0FBUCxPQUFPLENBQVM7UUFDaEIsVUFBSyxHQUFMLEtBQUssQ0FBVTtRQUNmLFlBQU8sR0FBUCxPQUFPLENBQXdCO1FBcFhsQyxTQUFJLEdBQXVCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7YUFDOUUsU0FBUyxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRTthQUNqQyxHQUFHLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUFwQyxDQUFvQyxDQUFDLEVBQWxFLENBQWtFLENBQUM7YUFDaEYsS0FBSyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsdUJBQVUsQ0FBQyxFQUFFLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxPQUFPLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsRUFBcEMsQ0FBb0MsQ0FBQyxDQUFDLEVBQWpGLENBQWlGLENBQUMsRUFGbkYsQ0FFbUYsQ0FDbkcsQ0FBQztRQUdHLFdBQU0sR0FBdUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQzth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QUNZLHVCQUFVOzBEQVMzQjtJQUdKO1FBREMsZ0JBQU0sRUFBRTtrQ0FDd0IsdUJBQVU7c0VBVXRDO0lBR0w7UUFEQyxnQkFBTSxFQUFFO2tDQUMrQix1QkFBVTs2RUFNOUM7SUFHSjtRQURDLGdCQUFNLEVBQUU7a0NBQ1UsdUJBQVU7d0RBU3pCO0lBR0o7UUFEQyxnQkFBTSxFQUFFO2tDQUNhLHVCQUFVOzJEQVM1QjtJQUdKO1FBREMsZ0JBQU0sRUFBRTtrQ0FDYSx1QkFBVTsyREFTNUI7SUFHSjtRQURDLGdCQUFNLEVBQUU7a0NBQ1ksdUJBQVU7MERBUzNCO0lBR0o7UUFEQyxnQkFBTSxFQUFFO2tDQUNhLHVCQUFVOzJEQVM1QjtJQUdKO1FBREMsZ0JBQU0sRUFBRTtrQ0FDbUIsdUJBQVU7aUVBU2xDO0lBR0o7UUFEQyxnQkFBTSxFQUFFO2tDQUM0Qix1QkFBVTswRUFTM0M7SUFHSjtRQURDLGdCQUFNLEVBQUU7a0NBQ2dCLHVCQUFVOzhEQU0vQjtJQUdKO1FBREMsZ0JBQU0sRUFBRTtrQ0FDYyx1QkFBVTs0REFJN0I7SUFHSjtRQURDLGdCQUFNLEVBQUU7a0NBQ3dCLHVCQUFVO3NFQUl6QztJQUdGO1FBREMsZ0JBQU0sRUFBRTtrQ0FDTyx1QkFBVTtxREFNdEI7SUFHSjtRQURDLGdCQUFNLEVBQUU7a0NBQ1UsdUJBQVU7d0RBTXpCO0lBalhPLGdCQUFnQjtRQUQ1QixpQkFBVSxFQUFFO3lDQXFYUSxpQkFBTztZQUNULG9CQUFRO1lBQ04sMkNBQXNCO09BdFg5QixnQkFBZ0IsQ0E4WDVCO0lBQUQsdUJBQUM7Q0E5WEQsQUE4WEMsSUFBQTtBQTlYWSw0Q0FBZ0IiLCJmaWxlIjoiYXBwL3N0b3JlL3F1b3RlLWVkaXQvcXVvdGUtZWRpdC5lZmZlY3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBBY3Rpb24gfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5pbXBvcnQgeyBFZmZlY3QsIEFjdGlvbnMgfSBmcm9tICdAbmdyeC9lZmZlY3RzJztcbmltcG9ydCB7IEluamVjdGFibGUsIHN0YXRlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCAqIGFzIFF1b3RlRWRpdEFjdGlvbnMgZnJvbSAnLi9xdW90ZS1lZGl0LmFjdGlvbnMnO1xuaW1wb3J0ICogYXMgQWNjb3VudEFjdGlvbnMgZnJvbSAnLi4vYWNjb3VudC9hY2NvdW50LmFjdGlvbnMnO1xuaW1wb3J0IHsgRnV0dXJlUXVvdGVFZGl0U2VydmljZSB9IGZyb20gJy4vcXVvdGUtZWRpdC5zZXJ2aWNlJztcbmltcG9ydCB7IEFwcFN0b3JlIH0gZnJvbSAnLi4vLi4vYXBwLnN0b3JlJztcbmltcG9ydCB7IFF1b3RlLCBBc3NldExpbmVJdGVtLCBRdW90ZUVkaXQgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9jb21tZXJjZS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQWNjb3VudCB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2FjY291bnQuaW50ZXJmYWNlJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBRdW90ZUVkaXRFZmZlY3RzIHtcbiAgQEVmZmVjdCgpXG4gIHB1YmxpYyBsb2FkOiBPYnNlcnZhYmxlPEFjdGlvbj4gPSB0aGlzLmFjdGlvbnMub2ZUeXBlKFF1b3RlRWRpdEFjdGlvbnMuTG9hZC5UeXBlKVxuICAgIC5zd2l0Y2hNYXAoKCkgPT4gdGhpcy5zZXJ2aWNlLmxvYWQoKVxuICAgICAgLm1hcChxdW90ZSA9PiB0aGlzLnN0b3JlLmNyZWF0ZShmYWN0b3J5ID0+IGZhY3RvcnkucXVvdGVFZGl0LmxvYWRTdWNjZXNzKHF1b3RlKSkpXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gT2JzZXJ2YWJsZS5vZih0aGlzLnN0b3JlLmNyZWF0ZShmYWN0b3J5ID0+IGZhY3RvcnkucXVvdGVFZGl0LmxvYWRGYWlsdXJlKGVycm9yKSkpKVxuICAgICk7XG5cbiAgQEVmZmVjdCgpXG4gIHB1YmxpYyBkZWxldGU6IE9ic2VydmFibGU8QWN0aW9uPiA9IHRoaXMuYWN0aW9ucy5vZlR5cGUoUXVvdGVFZGl0QWN0aW9ucy5EZWxldGUuVHlwZSlcbiAgICAud2l0aExhdGVzdEZyb20odGhpcy5zdG9yZS5zZWxlY3Qoc3RhdGUgPT4gc3RhdGUucXVvdGVFZGl0LmRhdGEuaWQpKVxuICAgIC5zd2l0Y2hNYXAoKFthY3Rpb24sIHF1b3RlSWRdOiBbUXVvdGVFZGl0QWN0aW9ucy5EZWxldGUsIG51bWJlcl0pID0+IHRoaXMuc2VydmljZS5kZWxldGUocXVvdGVJZClcbiAgICAgIC5tYXAocXVvdGUgPT4gdGhpcy5zdG9yZS5jcmVhdGUoZmFjdG9yeSA9PiBmYWN0b3J5LnF1b3RlRWRpdC5kZWxldGVTdWNjZXNzKHF1b3RlKSkpXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gT2JzZXJ2YWJsZS5vZih0aGlzLnN0b3JlLmNyZWF0ZShmYWN0b3J5ID0+IGZhY3RvcnkucXVvdGVFZGl0LmRlbGV0ZUZhaWx1cmUoZXJyb3IpKSkpXG4gICAgKTtcblxuICBARWZmZWN0KClcbiAgcHVibGljIGNoYW5nZVJvdXRlT25EZWxldGVTdWNjZXNzOiBPYnNlcnZhYmxlPEFjdGlvbj4gPSB0aGlzLmFjdGlvbnMub2ZUeXBlKFF1b3RlRWRpdEFjdGlvbnMuRGVsZXRlU3VjY2Vzcy5UeXBlKVxuICAgIC5tYXAoKCkgPT4gdGhpcy5zdG9yZS5jcmVhdGUoZmFjdG9yeSA9PiBmYWN0b3J5LnJvdXRlci5nb1RvUXVvdGVzKCkpKTtcblxuICBARWZmZWN0KClcbiAgcHVibGljIGVkaXRMaW5lSXRlbUZyb21EZXRhaWxzOiBPYnNlcnZhYmxlPEFjdGlvbj4gPSB0aGlzLmFjdGlvbnMub2ZUeXBlKFF1b3RlRWRpdEFjdGlvbnMuRWRpdExpbmVJdGVtRnJvbURldGFpbHMuVHlwZSlcbiAgICAud2l0aExhdGVzdEZyb20odGhpcy5zdG9yZS5zZWxlY3Qoc3RhdGUgPT4gc3RhdGUucXVvdGVFZGl0LmRhdGEpKVxuICAgIC5zd2l0Y2hNYXAoKFthY3Rpb24sIHF1b3RlXTogW1F1b3RlRWRpdEFjdGlvbnMuRWRpdExpbmVJdGVtRnJvbURldGFpbHMsIFF1b3RlXSkgPT4ge1xuICAgICAgY29uc3QgbGluZUl0ZW1Ub0VkaXQ6IEFzc2V0TGluZUl0ZW0gPSB0aGlzLmZpbmRMaW5lSXRlbUJ5KGFjdGlvbi51dWlkLCBxdW90ZSk7XG4gICAgICByZXR1cm4gdGhpcy5zZXJ2aWNlLmVkaXRMaW5lSXRlbUZyb21EZXRhaWxzKHF1b3RlLmlkLCBsaW5lSXRlbVRvRWRpdCwgYWN0aW9uLm1hcmtlcnMsIGFjdGlvbi5hdHRyaWJ1dGVzKVxuICAgICAgICAubWFwKHF1b3RlID0+IHRoaXMuc3RvcmUuY3JlYXRlKGZhY3RvcnkgPT4gZmFjdG9yeS5xdW90ZUVkaXQuZWRpdExpbmVJdGVtRnJvbURldGFpbHNTdWNjZXNzKHF1b3RlKSkpXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiBPYnNlcnZhYmxlLm9mKHRoaXMuc3RvcmUuY3JlYXRlKGZhY3RvcnkgPT4gZmFjdG9yeS5xdW90ZUVkaXQuZWRpdExpbmVJdGVtRnJvbURldGFpbHNGYWlsdXJlKGVycm9yKSkpKTtcbiAgICB9KTtcblxuICBARWZmZWN0KClcbiAgcHVibGljIHNob3dTbmFja2Jhck9uRWRpdExpbmVJdGVtU3VjY2VzczogT2JzZXJ2YWJsZTxBY3Rpb24+ID1cbiAgICB0aGlzLmFjdGlvbnMub2ZUeXBlKFF1b3RlRWRpdEFjdGlvbnMuRWRpdExpbmVJdGVtRnJvbURldGFpbHNTdWNjZXNzLlR5cGUpLm1hcCgoKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5zdG9yZS5jcmVhdGUoZmFjdG9yeSA9PiBmYWN0b3J5LnNuYWNrYmFyLmRpc3BsYXkoJ0FTU0VULkRFVEFJTC5RVU9URV9JVEVNX1VQREFURUQnKSk7XG4gICAgfSk7XG5cbiAgQEVmZmVjdCgpXG4gIHB1YmxpYyByZW1vdmVBc3NldDogT2JzZXJ2YWJsZTxBY3Rpb24+ID0gdGhpcy5hY3Rpb25zLm9mVHlwZShRdW90ZUVkaXRBY3Rpb25zLlJlbW92ZUFzc2V0LlR5cGUpXG4gICAgLndpdGhMYXRlc3RGcm9tKHRoaXMuc3RvcmUuc2VsZWN0KHN0YXRlID0+IHN0YXRlLnF1b3RlRWRpdC5kYXRhLmlkKSlcbiAgICAuc3dpdGNoTWFwKChbYWN0aW9uLCBxdW90ZUlkXTogW1F1b3RlRWRpdEFjdGlvbnMuUmVtb3ZlQXNzZXQsIG51bWJlcl0pID0+XG4gICAgICB0aGlzLnNlcnZpY2UucmVtb3ZlQXNzZXQocXVvdGVJZCwgYWN0aW9uLmFzc2V0KVxuICAgICAgICAubWFwKChxdW90ZTogUXVvdGUpID0+IHRoaXMuc3RvcmUuY3JlYXRlKGZhY3RvcnkgPT4gZmFjdG9yeS5xdW90ZUVkaXQucmVtb3ZlQXNzZXRTdWNjZXNzKHF1b3RlKSkpXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiBPYnNlcnZhYmxlLm9mKHRoaXMuc3RvcmUuY3JlYXRlKGZhY3RvcnkgPT4gZmFjdG9yeS5xdW90ZUVkaXQucmVtb3ZlQXNzZXRGYWlsdXJlKGVycm9yKSkpKVxuICAgICk7XG5cbiAgQEVmZmVjdCgpXG4gIHB1YmxpYyBzaG93U25hY2tiYXJPblJlbW92ZUFzc2V0U3VjY2VzczogT2JzZXJ2YWJsZTxBY3Rpb24+ID1cbiAgICB0aGlzLmFjdGlvbnMub2ZUeXBlKFF1b3RlRWRpdEFjdGlvbnMuUmVtb3ZlQXNzZXRTdWNjZXNzLlR5cGUpLm1hcCgoYWN0aW9uOiBRdW90ZUVkaXRBY3Rpb25zLlJlbW92ZUFzc2V0U3VjY2VzcykgPT5cbiAgICAgIHRoaXMuc3RvcmUuY3JlYXRlKGZhY3RvcnkgPT4gZmFjdG9yeS5zbmFja2Jhci5kaXNwbGF5KCdRVU9URS5SRU1PVkVfQVNTRVQuU1VDQ0VTUycpKVxuICAgICk7XG5cbiAgQEVmZmVjdCgpXG4gIHB1YmxpYyBjaGFuZ2VSb3V0ZU9uUmVtb3ZlQXNzZXRTdWNjZXNzOiBPYnNlcnZhYmxlPEFjdGlvbj4gPVxuICAgIHRoaXMuYWN0aW9ucy5vZlR5cGUoUXVvdGVFZGl0QWN0aW9ucy5SZW1vdmVBc3NldFN1Y2Nlc3MuVHlwZSkubWFwKChhY3Rpb246IFF1b3RlRWRpdEFjdGlvbnMuUmVtb3ZlQXNzZXRTdWNjZXNzKSA9PlxuICAgICAgdGhpcy5zdG9yZS5jcmVhdGUoZmFjdG9yeSA9PiBmYWN0b3J5LnJvdXRlci5nb1RvQWN0aXZlUXVvdGUoKSlcbiAgICApO1xuXG4gIEBFZmZlY3QoKVxuICBwdWJsaWMgYWRkQ3VzdG9tUHJpY2VUb0xpbmVJdGVtOiBPYnNlcnZhYmxlPEFjdGlvbj4gPSB0aGlzLmFjdGlvbnMub2ZUeXBlKFF1b3RlRWRpdEFjdGlvbnMuQWRkQ3VzdG9tUHJpY2VUb0xpbmVJdGVtLlR5cGUpXG4gICAgLndpdGhMYXRlc3RGcm9tKHRoaXMuc3RvcmUuc2VsZWN0KHN0YXRlID0+IHN0YXRlLnF1b3RlRWRpdC5kYXRhLmlkKSlcbiAgICAuc3dpdGNoTWFwKChbYWN0aW9uLCBxdW90ZUlkXTogW1F1b3RlRWRpdEFjdGlvbnMuQWRkQ3VzdG9tUHJpY2VUb0xpbmVJdGVtLCBudW1iZXJdKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5zZXJ2aWNlLmFkZEN1c3RvbVByaWNlVG9MaW5lSXRlbShxdW90ZUlkLCBhY3Rpb24ubGluZUl0ZW0sIGFjdGlvbi5wcmljZSwgYWN0aW9uLm92ZXJyaWRlKVxuICAgICAgICAubWFwKHF1b3RlID0+IHRoaXMuc3RvcmUuY3JlYXRlKGZhY3RvcnkgPT4gZmFjdG9yeS5xdW90ZUVkaXQuYWRkQ3VzdG9tUHJpY2VUb0xpbmVJdGVtU3VjY2VzcyhxdW90ZSkpKVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4gT2JzZXJ2YWJsZS5vZih0aGlzLnN0b3JlLmNyZWF0ZShmYWN0b3J5ID0+IGZhY3RvcnkucXVvdGVFZGl0LmFkZEN1c3RvbVByaWNlVG9MaW5lSXRlbUZhaWx1cmUoZXJyb3IpKSkpO1xuICAgIH0pO1xuXG4gIEBFZmZlY3QoKVxuICBwdWJsaWMgc2VuZFF1b3RlOiBPYnNlcnZhYmxlPEFjdGlvbj4gPSB0aGlzLmFjdGlvbnMub2ZUeXBlKFF1b3RlRWRpdEFjdGlvbnMuU2VuZFF1b3RlLlR5cGUpXG4gICAgLndpdGhMYXRlc3RGcm9tKHRoaXMuc3RvcmUuc2VsZWN0KHN0YXRlID0+IHN0YXRlLnF1b3RlRWRpdCkpXG4gICAgLnN3aXRjaE1hcCgoW2FjdGlvbiwgcXVvdGVFZGl0XTogW1F1b3RlRWRpdEFjdGlvbnMuU2VuZFF1b3RlLCBRdW90ZUVkaXRdKSA9PiB7XG4gICAgICBsZXQgaW52b2ljZUNvbnRhY3RUeXBlOiBzdHJpbmcsIGludm9pY2VDb250YWN0SWQ6IG51bWJlcjtcbiAgICAgIGlmIChxdW90ZUVkaXQuc2VuZERldGFpbHMuaW52b2ljZUNvbnRhY3QuaGFzT3duUHJvcGVydHkoJ2lkJykpIHtcbiAgICAgICAgaW52b2ljZUNvbnRhY3RUeXBlID0gJ1VzZXInO1xuICAgICAgICBpbnZvaWNlQ29udGFjdElkID0gcXVvdGVFZGl0LnNlbmREZXRhaWxzLmludm9pY2VDb250YWN0LmlkO1xuICAgICAgfVxuICAgICAgbGV0IGRldGFpbHMgPSB7XG4gICAgICAgIGV4cGlyYXRpb25EYXRlOiBuZXcgRGF0ZShxdW90ZUVkaXQuc2VuZERldGFpbHMuc2FsZXNNYW5hZ2VyLmV4cGlyYXRpb25EYXRlKSxcbiAgICAgICAgYWdyZWVtZW50SWQ6IHF1b3RlRWRpdC5zZW5kRGV0YWlscy5zYWxlc01hbmFnZXIub2ZmbGluZUFncmVlbWVudCB8fCB1bmRlZmluZWQsXG4gICAgICAgIHNhbGVzTWFuYWdlcjogcXVvdGVFZGl0LnNlbmREZXRhaWxzLnNhbGVzTWFuYWdlci5zYWxlc01hbmFnZXIsXG4gICAgICAgIHNhbGVzT3duZXI6IHF1b3RlRWRpdC5zZW5kRGV0YWlscy5iaWxsaW5nQWNjb3VudC5zYWxlc093bmVyLFxuICAgICAgICBwYXltZW50VGVybXNEYXlzOiBxdW90ZUVkaXQuc2VuZERldGFpbHMuYmlsbGluZ0FjY291bnQucGF5bWVudFRlcm1zRGF5cyxcbiAgICAgICAgYmlsbGluZ0FjY291bnRJZDogcXVvdGVFZGl0LnNlbmREZXRhaWxzLmJpbGxpbmdBY2NvdW50LmlkLFxuICAgICAgICBpbnZvaWNlQ29udGFjdFR5cGU6IGludm9pY2VDb250YWN0VHlwZSxcbiAgICAgICAgaW52b2ljZUNvbnRhY3RJZDogaW52b2ljZUNvbnRhY3RJZFxuICAgICAgfTtcbiAgICAgIHJldHVybiB0aGlzLnNlcnZpY2Uuc2VuZFF1b3RlKHF1b3RlRWRpdC5kYXRhLmlkLCBxdW90ZUVkaXQuc2VuZERldGFpbHMudXNlci5lbWFpbCwgZGV0YWlscylcbiAgICAgICAgLm1hcCgoKSA9PlxuICAgICAgICAgIHRoaXMuc3RvcmUuY3JlYXRlKGZhY3RvcnkgPT5cbiAgICAgICAgICAgIGZhY3RvcnkucXVvdGVFZGl0LnNlbmRRdW90ZVN1Y2Nlc3MoXG4gICAgICAgICAgICAgIHF1b3RlRWRpdC5kYXRhLmlkLFxuICAgICAgICAgICAgICBxdW90ZUVkaXQuc2VuZERldGFpbHMudXNlci5lbWFpbFxuICAgICAgICAgICAgKVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT5cbiAgICAgICAgICBPYnNlcnZhYmxlLm9mKHRoaXMuc3RvcmUuY3JlYXRlKGZhY3RvcnkgPT5cbiAgICAgICAgICAgIGZhY3RvcnkuZXJyb3IuaGFuZGxlKGVycm9yKVxuICAgICAgICAgICkpXG4gICAgICAgICk7XG4gICAgfSk7XG5cbiAgQEVmZmVjdCgpXG4gIHB1YmxpYyBzZW5kUXVvdGVTdWNjZXNzOiBPYnNlcnZhYmxlPEFjdGlvbj4gPSB0aGlzLmFjdGlvbnNcbiAgICAub2ZUeXBlKFF1b3RlRWRpdEFjdGlvbnMuU2VuZFF1b3RlU3VjY2Vzcy5UeXBlKVxuICAgIC5tZXJnZU1hcCgoYWN0aW9uOiBRdW90ZUVkaXRBY3Rpb25zLlNlbmRRdW90ZVN1Y2Nlc3MpID0+IHtcbiAgICAgIHJldHVybiBbXG4gICAgICAgIHRoaXMuc3RvcmUuY3JlYXRlKGZhY3RvcnkgPT5cbiAgICAgICAgICBmYWN0b3J5LnJvdXRlci5nb1RvUXVvdGVCeUlkKGFjdGlvbi5xdW90ZUlkKVxuICAgICAgICApLFxuICAgICAgICB0aGlzLnN0b3JlLmNyZWF0ZShmYWN0b3J5ID0+IGZhY3RvcnkucXVvdGVFZGl0LmxvYWQoKSksXG4gICAgICAgIHRoaXMuc3RvcmUuY3JlYXRlKGZhY3RvcnkgPT5cbiAgICAgICAgICBmYWN0b3J5LnNuYWNrYmFyLmRpc3BsYXkoXG4gICAgICAgICAgICAnUVVPVEUuQ1JFQVRFRF9GT1JfVE9BU1QnLFxuICAgICAgICAgICAgeyBlbWFpbEFkZHJlc3M6IGFjdGlvbi5vd25lckVtYWlsIH1cbiAgICAgICAgICApXG4gICAgICAgICldO1xuICAgIH0pO1xuXG4gIEBFZmZlY3QoKVxuICBwdWJsaWMgY2xvbmVRdW90ZTogT2JzZXJ2YWJsZTxBY3Rpb24+ID0gdGhpcy5hY3Rpb25zXG4gICAgLm9mVHlwZShRdW90ZUVkaXRBY3Rpb25zLkNsb25lUXVvdGUuVHlwZSlcbiAgICAuc3dpdGNoTWFwKChhY3Rpb246IFF1b3RlRWRpdEFjdGlvbnMuQ2xvbmVRdW90ZSkgPT5cblxuICAgICAgdGhpcy5zZXJ2aWNlLmNsb25lUXVvdGUoYWN0aW9uLnF1b3RlKVxuICAgICAgICAubWFwKChxdW90ZSkgPT5cbiAgICAgICAgICB0aGlzLnN0b3JlLmNyZWF0ZShmYWN0b3J5ID0+IGZhY3RvcnkucXVvdGVFZGl0LmNsb25lUXVvdGVTdWNjZXNzKHF1b3RlKSlcbiAgICAgICAgKVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4gT2JzZXJ2YWJsZS5vZih0aGlzLnN0b3JlLmNyZWF0ZShmYWN0b3J5ID0+IGZhY3RvcnkuZXJyb3IuaGFuZGxlKGVycm9yKSkpKVxuICAgICk7XG5cbiAgQEVmZmVjdCgpXG4gIHB1YmxpYyBjbG9uZVF1b3RlU3VjY2VzczogT2JzZXJ2YWJsZTxBY3Rpb24+ID0gdGhpcy5hY3Rpb25zXG4gICAgLm9mVHlwZShRdW90ZUVkaXRBY3Rpb25zLkNsb25lUXVvdGVTdWNjZXNzLlR5cGUpXG4gICAgLm1lcmdlTWFwKCgpID0+IHtcbiAgICAgIHJldHVybiBbXG4gICAgICAgIHRoaXMuc3RvcmUuY3JlYXRlKGZhY3RvcnkgPT4gZmFjdG9yeS5yb3V0ZXIuZ29Ub0FjdGl2ZVF1b3RlKCkpLFxuICAgICAgICB0aGlzLnN0b3JlLmNyZWF0ZShmYWN0b3J5ID0+IGZhY3Rvcnkuc25hY2tiYXIuZGlzcGxheSgnUVVPVEUuVVBEQVRFRCcpKVxuICAgICAgXTtcbiAgICB9KTtcblxuICBARWZmZWN0KClcbiAgcHVibGljIGNyZWF0ZVF1b3RlOiBPYnNlcnZhYmxlPEFjdGlvbj4gPSB0aGlzLmFjdGlvbnNcbiAgICAub2ZUeXBlKFF1b3RlRWRpdEFjdGlvbnMuQ3JlYXRlUXVvdGUuVHlwZSlcbiAgICAuc3dpdGNoTWFwKChhY3Rpb246IFF1b3RlRWRpdEFjdGlvbnMuQ2xvbmVRdW90ZSkgPT5cblxuICAgICAgdGhpcy5zZXJ2aWNlLmNyZWF0ZVF1b3RlKClcbiAgICAgICAgLm1hcCgocXVvdGUpID0+XG4gICAgICAgICAgdGhpcy5zdG9yZS5jcmVhdGUoZmFjdG9yeSA9PlxuICAgICAgICAgICAgZmFjdG9yeS5xdW90ZUVkaXQucmVmcmVzaEFuZE5vdGlmeShxdW90ZSwgJ1FVT1RFLlVQREFURUQnKVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4gT2JzZXJ2YWJsZS5vZih0aGlzLnN0b3JlLmNyZWF0ZShmYWN0b3J5ID0+IGZhY3RvcnkuZXJyb3IuaGFuZGxlKGVycm9yKSkpKVxuICAgICk7XG5cbiAgQEVmZmVjdCgpXG4gIHB1YmxpYyB1cGRhdGVRdW90ZUZpZWxkczogT2JzZXJ2YWJsZTxBY3Rpb24+ID0gdGhpcy5hY3Rpb25zXG4gICAgLm9mVHlwZShRdW90ZUVkaXRBY3Rpb25zLlVwZGF0ZVF1b3RlRmllbGRzLlR5cGUpXG4gICAgLndpdGhMYXRlc3RGcm9tKHRoaXMuc3RvcmUuc2VsZWN0KHN0YXRlID0+IHN0YXRlLnF1b3RlRWRpdC5kYXRhKSlcbiAgICAuc3dpdGNoTWFwKChbYWN0aW9uLCBxdW90ZV06IFtRdW90ZUVkaXRBY3Rpb25zLlVwZGF0ZVF1b3RlRmllbGRzLCBRdW90ZV0pID0+XG4gICAgICB0aGlzLnNlcnZpY2UudXBkYXRlUXVvdGVGaWVsZChhY3Rpb24ub3B0aW9ucywgcXVvdGUpXG4gICAgICAgIC5tYXAoKHF1b3RlKSA9PiB0aGlzLnN0b3JlLmNyZWF0ZShmYWN0b3J5ID0+XG4gICAgICAgICAgZmFjdG9yeS5xdW90ZUVkaXQucmVmcmVzaEFuZE5vdGlmeShxdW90ZSwgJ1FVT1RFLlVQREFURUQnKSlcbiAgICAgICAgKVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4gT2JzZXJ2YWJsZS5vZih0aGlzLnN0b3JlLmNyZWF0ZShmYWN0b3J5ID0+IGZhY3RvcnkuZXJyb3IuaGFuZGxlKGVycm9yKSkpKVxuICAgICk7XG5cbiAgQEVmZmVjdCgpXG4gIHB1YmxpYyBhZGRGZWVUbzogT2JzZXJ2YWJsZTxBY3Rpb24+ID0gdGhpcy5hY3Rpb25zXG4gICAgLm9mVHlwZShRdW90ZUVkaXRBY3Rpb25zLkFkZEZlZVRvLlR5cGUpXG4gICAgLndpdGhMYXRlc3RGcm9tKHRoaXMuc3RvcmUuc2VsZWN0KHN0YXRlID0+IHN0YXRlLnF1b3RlRWRpdC5kYXRhLmlkKSlcbiAgICAuc3dpdGNoTWFwKChbYWN0aW9uLCBxdW90ZUlkXTogW1F1b3RlRWRpdEFjdGlvbnMuQWRkRmVlVG8sIG51bWJlcl0pID0+XG4gICAgICB0aGlzLnNlcnZpY2UuYWRkRmVlVG8ocXVvdGVJZCwgYWN0aW9uLnByb2plY3QsIGFjdGlvbi5mZWUpXG4gICAgICAgIC5tYXAoKHF1b3RlKSA9PiB0aGlzLnN0b3JlLmNyZWF0ZShmYWN0b3J5ID0+XG4gICAgICAgICAgZmFjdG9yeS5xdW90ZUVkaXQucmVmcmVzaEFuZE5vdGlmeShxdW90ZSwgJ1FVT1RFLlVQREFURUQnKSlcbiAgICAgICAgKVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4gT2JzZXJ2YWJsZS5vZih0aGlzLnN0b3JlLmNyZWF0ZShmYWN0b3J5ID0+IGZhY3RvcnkuZXJyb3IuaGFuZGxlKGVycm9yKSkpKVxuICAgICk7XG5cbiAgQEVmZmVjdCgpXG4gIHB1YmxpYyByZW1vdmVGZWU6IE9ic2VydmFibGU8QWN0aW9uPiA9IHRoaXMuYWN0aW9uc1xuICAgIC5vZlR5cGUoUXVvdGVFZGl0QWN0aW9ucy5SZW1vdmVGZWUuVHlwZSlcbiAgICAud2l0aExhdGVzdEZyb20odGhpcy5zdG9yZS5zZWxlY3Qoc3RhdGUgPT4gc3RhdGUucXVvdGVFZGl0LmRhdGEuaWQpKVxuICAgIC5zd2l0Y2hNYXAoKFthY3Rpb24sIHF1b3RlSWRdOiBbUXVvdGVFZGl0QWN0aW9ucy5BZGRGZWVUbywgbnVtYmVyXSkgPT5cbiAgICAgIHRoaXMuc2VydmljZS5yZW1vdmVGZWUocXVvdGVJZCwgYWN0aW9uLmZlZSlcbiAgICAgICAgLm1hcCgocXVvdGUpID0+IHRoaXMuc3RvcmUuY3JlYXRlKGZhY3RvcnkgPT5cbiAgICAgICAgICBmYWN0b3J5LnF1b3RlRWRpdC5yZWZyZXNoQW5kTm90aWZ5KHF1b3RlLCAnUVVPVEUuVVBEQVRFRCcpKVxuICAgICAgICApXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiBPYnNlcnZhYmxlLm9mKHRoaXMuc3RvcmUuY3JlYXRlKGZhY3RvcnkgPT4gZmFjdG9yeS5lcnJvci5oYW5kbGUoZXJyb3IpKSkpXG4gICAgKTtcblxuICBARWZmZWN0KClcbiAgcHVibGljIGJ1bGtJbXBvcnQ6IE9ic2VydmFibGU8QWN0aW9uPiA9IHRoaXMuYWN0aW9uc1xuICAgIC5vZlR5cGUoUXVvdGVFZGl0QWN0aW9ucy5CdWxrSW1wb3J0LlR5cGUpXG4gICAgLndpdGhMYXRlc3RGcm9tKHRoaXMuc3RvcmUuc2VsZWN0KHN0YXRlID0+IHN0YXRlLnF1b3RlRWRpdC5kYXRhLmlkKSlcbiAgICAuc3dpdGNoTWFwKChbYWN0aW9uLCBxdW90ZUlkXTogW1F1b3RlRWRpdEFjdGlvbnMuQnVsa0ltcG9ydCwgbnVtYmVyXSkgPT5cbiAgICAgIHRoaXMuc2VydmljZS5idWxrSW1wb3J0KHF1b3RlSWQsIGFjdGlvbi5yYXdBc3NldHMsIGFjdGlvbi5wcm9qZWN0SWQpXG4gICAgICAgIC5tYXAoKHF1b3RlKSA9PiB0aGlzLnN0b3JlLmNyZWF0ZShmYWN0b3J5ID0+XG4gICAgICAgICAgZmFjdG9yeS5xdW90ZUVkaXQuYnVsa0ltcG9ydFN1Y2Nlc3MocXVvdGUsIGFjdGlvbi5yYXdBc3NldHMpKVxuICAgICAgICApXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiBPYnNlcnZhYmxlLm9mKHRoaXMuc3RvcmUuY3JlYXRlKGZhY3RvcnkgPT4gZmFjdG9yeS5lcnJvci5oYW5kbGUoZXJyb3IpKSkpXG4gICAgKTtcblxuICBARWZmZWN0KClcbiAgcHVibGljIGJ1bGtJbXBvcnRTdWNjZXNzOiBPYnNlcnZhYmxlPEFjdGlvbj4gPSB0aGlzLmFjdGlvbnNcbiAgICAub2ZUeXBlKFF1b3RlRWRpdEFjdGlvbnMuQnVsa0ltcG9ydFN1Y2Nlc3MuVHlwZSlcbiAgICAubWFwKChhY3Rpb246IFF1b3RlRWRpdEFjdGlvbnMuQnVsa0ltcG9ydFN1Y2Nlc3MpID0+XG4gICAgICB0aGlzLnN0b3JlLmNyZWF0ZShmYWN0b3J5ID0+IGZhY3Rvcnkuc25hY2tiYXIuZGlzcGxheShcbiAgICAgICAgJ1FVT1RFLkJVTEtfSU1QT1JULkNPTkZJUk1BVElPTicsXG4gICAgICAgIHsgbnVtT2ZBc3NldHM6IGFjdGlvbi5yYXdBc3NldHMubGluZUl0ZW1BdHRyaWJ1dGVzLnNwbGl0KCdcXG4nKS5sZW5ndGggfSlcbiAgICAgIClcbiAgICApO1xuXG4gIEBFZmZlY3QoKVxuICBwdWJsaWMgZWRpdExpbmVJdGVtOiBPYnNlcnZhYmxlPEFjdGlvbj4gPSB0aGlzLmFjdGlvbnNcbiAgICAub2ZUeXBlKFF1b3RlRWRpdEFjdGlvbnMuRWRpdExpbmVJdGVtLlR5cGUpXG4gICAgLndpdGhMYXRlc3RGcm9tKHRoaXMuc3RvcmUuc2VsZWN0KHN0YXRlID0+IHN0YXRlLnF1b3RlRWRpdC5kYXRhLmlkKSlcbiAgICAuc3dpdGNoTWFwKChbYWN0aW9uLCBxdW90ZUlkXTogW1F1b3RlRWRpdEFjdGlvbnMuRWRpdExpbmVJdGVtLCBudW1iZXJdKSA9PlxuICAgICAgdGhpcy5zZXJ2aWNlLmVkaXRMaW5lSXRlbShxdW90ZUlkLCBhY3Rpb24ubGluZUl0ZW0sIGFjdGlvbi5maWVsZFRvRWRpdClcbiAgICAgICAgLm1hcCgocXVvdGUpID0+IHRoaXMuc3RvcmUuY3JlYXRlKGZhY3RvcnkgPT5cbiAgICAgICAgICBmYWN0b3J5LnF1b3RlRWRpdC5yZWZyZXNoQW5kTm90aWZ5KHF1b3RlLCAnUVVPVEUuVVBEQVRFRCcpKVxuICAgICAgICApXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiBPYnNlcnZhYmxlLm9mKHRoaXMuc3RvcmUuY3JlYXRlKGZhY3RvcnkgPT4gZmFjdG9yeS5lcnJvci5oYW5kbGUoZXJyb3IpKSkpXG4gICAgKTtcblxuICBARWZmZWN0KClcbiAgcHVibGljIGFkZEFzc2V0VG9Qcm9qZWN0SW5RdW90ZTogT2JzZXJ2YWJsZTxBY3Rpb24+ID0gdGhpcy5hY3Rpb25zXG4gICAgLm9mVHlwZShRdW90ZUVkaXRBY3Rpb25zLkFkZEFzc2V0VG9Qcm9qZWN0SW5RdW90ZS5UeXBlKVxuICAgIC53aXRoTGF0ZXN0RnJvbSh0aGlzLnN0b3JlLnNlbGVjdChzdGF0ZSA9PiBzdGF0ZS5xdW90ZUVkaXQuZGF0YSkpXG4gICAgLnN3aXRjaE1hcCgoW2FjdGlvbiwgcXVvdGVdOiBbUXVvdGVFZGl0QWN0aW9ucy5BZGRBc3NldFRvUHJvamVjdEluUXVvdGUsIFF1b3RlXSkgPT4ge1xuICAgICAgbGV0IGV4aXN0aW5nUHJvamVjdHMgPSAocXVvdGUucHJvamVjdHMgfHwgW10pLm1hcCgocHJvamVjdDogYW55KSA9PiBwcm9qZWN0Lm5hbWUpO1xuICAgICAgcmV0dXJuIHRoaXMuc2VydmljZS5hZGRBc3NldFRvUHJvamVjdEluUXVvdGUocXVvdGUuaWQsIGV4aXN0aW5nUHJvamVjdHMsIGFjdGlvbi5wYXJhbWV0ZXJzKVxuICAgICAgICAubWFwKChxdW90ZSkgPT4gdGhpcy5zdG9yZS5jcmVhdGUoZmFjdG9yeSA9PlxuICAgICAgICAgIGZhY3RvcnkucXVvdGVFZGl0LmFkZEFzc2V0VG9Qcm9qZWN0SW5RdW90ZVN1Y2Nlc3MocXVvdGUsIGFjdGlvbi5wYXJhbWV0ZXJzLmxpbmVJdGVtLmFzc2V0LmFzc2V0SWQpKVxuICAgICAgICApXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiBPYnNlcnZhYmxlLm9mKHRoaXMuc3RvcmUuY3JlYXRlKGZhY3RvcnkgPT4gZmFjdG9yeS5lcnJvci5oYW5kbGUoZXJyb3IpKSkpO1xuICAgIH0pO1xuXG4gIEBFZmZlY3QoKVxuICBwdWJsaWMgYWRkQXNzZXRUb1Byb2plY3RJblF1b3RlU3VjY2VzczogT2JzZXJ2YWJsZTxBY3Rpb24+ID0gdGhpcy5hY3Rpb25zXG4gICAgLm9mVHlwZShRdW90ZUVkaXRBY3Rpb25zLkFkZEFzc2V0VG9Qcm9qZWN0SW5RdW90ZVN1Y2Nlc3MuVHlwZSlcbiAgICAubWFwKChhY3Rpb246IFF1b3RlRWRpdEFjdGlvbnMuQWRkQXNzZXRUb1Byb2plY3RJblF1b3RlU3VjY2VzcykgPT5cbiAgICAgIHRoaXMuc3RvcmUuY3JlYXRlKGZhY3RvcnkgPT5cbiAgICAgICAgZmFjdG9yeS5zbmFja2Jhci5kaXNwbGF5KCdBU1NFVC5BRERfVE9fUVVPVEVfVE9BU1QnLCB7IGFzc2V0SWQ6IGFjdGlvbi5hc3NldElkIH0pXG4gICAgICApXG4gICAgKTtcblxuICBARWZmZWN0KClcbiAgcHVibGljIGFkZFByb2plY3Q6IE9ic2VydmFibGU8QWN0aW9uPiA9IHRoaXMuYWN0aW9uc1xuICAgIC5vZlR5cGUoUXVvdGVFZGl0QWN0aW9ucy5BZGRQcm9qZWN0LlR5cGUpXG4gICAgLndpdGhMYXRlc3RGcm9tKHRoaXMuc3RvcmUuc2VsZWN0KHN0YXRlID0+IHN0YXRlLnF1b3RlRWRpdC5kYXRhLmlkKSlcbiAgICAuc3dpdGNoTWFwKChbYWN0aW9uLCBxdW90ZUlkXTogW1F1b3RlRWRpdEFjdGlvbnMuQWRkUHJvamVjdCwgbnVtYmVyXSkgPT5cbiAgICAgIHRoaXMuc2VydmljZS5hZGRQcm9qZWN0KHF1b3RlSWQpXG4gICAgICAgIC5tYXAoKHF1b3RlKSA9PiB0aGlzLnN0b3JlLmNyZWF0ZShmYWN0b3J5ID0+XG4gICAgICAgICAgZmFjdG9yeS5xdW90ZUVkaXQucmVmcmVzaEFuZE5vdGlmeShxdW90ZSwgJ1FVT1RFLlVQREFURUQnKSlcbiAgICAgICAgKVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4gT2JzZXJ2YWJsZS5vZih0aGlzLnN0b3JlLmNyZWF0ZShmYWN0b3J5ID0+IGZhY3RvcnkuZXJyb3IuaGFuZGxlKGVycm9yKSkpKVxuICAgICk7XG5cbiAgQEVmZmVjdCgpXG4gIHB1YmxpYyByZW1vdmVQcm9qZWN0OiBPYnNlcnZhYmxlPEFjdGlvbj4gPSB0aGlzLmFjdGlvbnNcbiAgICAub2ZUeXBlKFF1b3RlRWRpdEFjdGlvbnMuUmVtb3ZlUHJvamVjdC5UeXBlKVxuICAgIC53aXRoTGF0ZXN0RnJvbSh0aGlzLnN0b3JlLnNlbGVjdChzdGF0ZSA9PiBzdGF0ZS5xdW90ZUVkaXQuZGF0YS5pZCkpXG4gICAgLnN3aXRjaE1hcCgoW2FjdGlvbiwgcXVvdGVJZF06IFtRdW90ZUVkaXRBY3Rpb25zLlJlbW92ZVByb2plY3QsIG51bWJlcl0pID0+XG4gICAgICB0aGlzLnNlcnZpY2UucmVtb3ZlUHJvamVjdChxdW90ZUlkLCBhY3Rpb24ucHJvamVjdElkKVxuICAgICAgICAubWFwKChxdW90ZSkgPT4gdGhpcy5zdG9yZS5jcmVhdGUoZmFjdG9yeSA9PlxuICAgICAgICAgIGZhY3RvcnkucXVvdGVFZGl0LnJlZnJlc2hBbmROb3RpZnkocXVvdGUsICdRVU9URS5VUERBVEVEJykpXG4gICAgICAgIClcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IE9ic2VydmFibGUub2YodGhpcy5zdG9yZS5jcmVhdGUoZmFjdG9yeSA9PiBmYWN0b3J5LmVycm9yLmhhbmRsZShlcnJvcikpKSlcbiAgICApO1xuXG4gIEBFZmZlY3QoKVxuICBwdWJsaWMgdXBkYXRlUHJvamVjdDogT2JzZXJ2YWJsZTxBY3Rpb24+ID0gdGhpcy5hY3Rpb25zXG4gICAgLm9mVHlwZShRdW90ZUVkaXRBY3Rpb25zLlVwZGF0ZVByb2plY3QuVHlwZSlcbiAgICAud2l0aExhdGVzdEZyb20odGhpcy5zdG9yZS5zZWxlY3Qoc3RhdGUgPT4gc3RhdGUucXVvdGVFZGl0LmRhdGEuaWQpKVxuICAgIC5zd2l0Y2hNYXAoKFthY3Rpb24sIHF1b3RlSWRdOiBbUXVvdGVFZGl0QWN0aW9ucy5VcGRhdGVQcm9qZWN0LCBudW1iZXJdKSA9PlxuICAgICAgdGhpcy5zZXJ2aWNlLnVwZGF0ZVByb2plY3QocXVvdGVJZCwgYWN0aW9uLnByb2plY3QpXG4gICAgICAgIC5tYXAoKHF1b3RlKSA9PiB0aGlzLnN0b3JlLmNyZWF0ZShmYWN0b3J5ID0+XG4gICAgICAgICAgZmFjdG9yeS5xdW90ZUVkaXQucmVmcmVzaEFuZE5vdGlmeShxdW90ZSwgJ1FVT1RFLlVQREFURUQnKSlcbiAgICAgICAgKVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4gT2JzZXJ2YWJsZS5vZih0aGlzLnN0b3JlLmNyZWF0ZShmYWN0b3J5ID0+IGZhY3RvcnkuZXJyb3IuaGFuZGxlKGVycm9yKSkpKVxuICAgICk7XG5cbiAgQEVmZmVjdCgpXG4gIHB1YmxpYyBtb3ZlTGluZUl0ZW06IE9ic2VydmFibGU8QWN0aW9uPiA9IHRoaXMuYWN0aW9uc1xuICAgIC5vZlR5cGUoUXVvdGVFZGl0QWN0aW9ucy5Nb3ZlTGluZUl0ZW0uVHlwZSlcbiAgICAud2l0aExhdGVzdEZyb20odGhpcy5zdG9yZS5zZWxlY3Qoc3RhdGUgPT4gc3RhdGUucXVvdGVFZGl0LmRhdGEuaWQpKVxuICAgIC5zd2l0Y2hNYXAoKFthY3Rpb24sIHF1b3RlSWRdOiBbUXVvdGVFZGl0QWN0aW9ucy5Nb3ZlTGluZUl0ZW0sIG51bWJlcl0pID0+XG4gICAgICB0aGlzLnNlcnZpY2UubW92ZUxpbmVJdGVtKHF1b3RlSWQsIGFjdGlvbi5wcm9qZWN0LCBhY3Rpb24ubGluZUl0ZW0pXG4gICAgICAgIC5tYXAoKHF1b3RlKSA9PiB0aGlzLnN0b3JlLmNyZWF0ZShmYWN0b3J5ID0+XG4gICAgICAgICAgZmFjdG9yeS5xdW90ZUVkaXQucmVmcmVzaEFuZE5vdGlmeShxdW90ZSwgJ1FVT1RFLlVQREFURUQnKSlcbiAgICAgICAgKVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4gT2JzZXJ2YWJsZS5vZih0aGlzLnN0b3JlLmNyZWF0ZShmYWN0b3J5ID0+IGZhY3RvcnkuZXJyb3IuaGFuZGxlKGVycm9yKSkpKVxuICAgICk7XG5cbiAgQEVmZmVjdCgpXG4gIHB1YmxpYyBjbG9uZUxpbmVJdGVtOiBPYnNlcnZhYmxlPEFjdGlvbj4gPSB0aGlzLmFjdGlvbnNcbiAgICAub2ZUeXBlKFF1b3RlRWRpdEFjdGlvbnMuQ2xvbmVMaW5lSXRlbS5UeXBlKVxuICAgIC53aXRoTGF0ZXN0RnJvbSh0aGlzLnN0b3JlLnNlbGVjdChzdGF0ZSA9PiBzdGF0ZS5xdW90ZUVkaXQuZGF0YS5pZCkpXG4gICAgLnN3aXRjaE1hcCgoW2FjdGlvbiwgcXVvdGVJZF06IFtRdW90ZUVkaXRBY3Rpb25zLkNsb25lTGluZUl0ZW0sIG51bWJlcl0pID0+XG4gICAgICB0aGlzLnNlcnZpY2UuY2xvbmVMaW5lSXRlbShxdW90ZUlkLCBhY3Rpb24ubGluZUl0ZW0pXG4gICAgICAgIC5tYXAoKHF1b3RlKSA9PiB0aGlzLnN0b3JlLmNyZWF0ZShmYWN0b3J5ID0+XG4gICAgICAgICAgZmFjdG9yeS5xdW90ZUVkaXQucmVmcmVzaEFuZE5vdGlmeShxdW90ZSwgJ1FVT1RFLlVQREFURUQnKSlcbiAgICAgICAgKVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4gT2JzZXJ2YWJsZS5vZih0aGlzLnN0b3JlLmNyZWF0ZShmYWN0b3J5ID0+IGZhY3RvcnkuZXJyb3IuaGFuZGxlKGVycm9yKSkpKVxuICAgICk7XG5cbiAgQEVmZmVjdCgpXG4gIHB1YmxpYyBlZGl0TGluZUl0ZW1NYXJrZXJzOiBPYnNlcnZhYmxlPEFjdGlvbj4gPSB0aGlzLmFjdGlvbnNcbiAgICAub2ZUeXBlKFF1b3RlRWRpdEFjdGlvbnMuRWRpdExpbmVJdGVtTWFya2Vycy5UeXBlKVxuICAgIC53aXRoTGF0ZXN0RnJvbSh0aGlzLnN0b3JlLnNlbGVjdChzdGF0ZSA9PiBzdGF0ZS5xdW90ZUVkaXQuZGF0YS5pZCkpXG4gICAgLnN3aXRjaE1hcCgoW2FjdGlvbiwgcXVvdGVJZF06IFtRdW90ZUVkaXRBY3Rpb25zLkVkaXRMaW5lSXRlbU1hcmtlcnMsIG51bWJlcl0pID0+XG4gICAgICB0aGlzLnNlcnZpY2UuZWRpdExpbmVJdGVtTWFya2VycyhxdW90ZUlkLCBhY3Rpb24ubGluZUl0ZW0sIGFjdGlvbi5uZXdNYXJrZXJzKVxuICAgICAgICAubWFwKChxdW90ZSkgPT4gdGhpcy5zdG9yZS5jcmVhdGUoZmFjdG9yeSA9PlxuICAgICAgICAgIGZhY3RvcnkucXVvdGVFZGl0LnJlZnJlc2hBbmROb3RpZnkocXVvdGUsICdRVU9URS5VUERBVEVEJykpXG4gICAgICAgIClcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IE9ic2VydmFibGUub2YodGhpcy5zdG9yZS5jcmVhdGUoZmFjdG9yeSA9PiBmYWN0b3J5LmVycm9yLmhhbmRsZShlcnJvcikpKSlcbiAgICApO1xuXG4gIEBFZmZlY3QoKVxuICBwdWJsaWMgdXBkYXRlUHJvamVjdFByaWNlQXR0cmlidXRlczogT2JzZXJ2YWJsZTxBY3Rpb24+ID0gdGhpcy5hY3Rpb25zXG4gICAgLm9mVHlwZShRdW90ZUVkaXRBY3Rpb25zLlVwZGF0ZVByb2plY3RQcmljZUF0dHJpYnV0ZXMuVHlwZSlcbiAgICAud2l0aExhdGVzdEZyb20odGhpcy5zdG9yZS5zZWxlY3Qoc3RhdGUgPT4gc3RhdGUucXVvdGVFZGl0LmRhdGEuaWQpKVxuICAgIC5zd2l0Y2hNYXAoKFthY3Rpb24sIHF1b3RlSWRdOiBbUXVvdGVFZGl0QWN0aW9ucy5VcGRhdGVQcm9qZWN0UHJpY2VBdHRyaWJ1dGVzLCBudW1iZXJdKSA9PlxuICAgICAgdGhpcy5zZXJ2aWNlLnVwZGF0ZVByb2plY3RQcmljZUF0dHJpYnV0ZXMocXVvdGVJZCwgYWN0aW9uLnByaWNlQXR0cmlidXRlcywgYWN0aW9uLnByb2plY3QpXG4gICAgICAgIC5tYXAoKHF1b3RlKSA9PiB0aGlzLnN0b3JlLmNyZWF0ZShmYWN0b3J5ID0+XG4gICAgICAgICAgZmFjdG9yeS5xdW90ZUVkaXQucmVmcmVzaEFuZE5vdGlmeShxdW90ZSwgJ1FVT1RFLlVQREFURUQnKSlcbiAgICAgICAgKVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4gT2JzZXJ2YWJsZS5vZih0aGlzLnN0b3JlLmNyZWF0ZShmYWN0b3J5ID0+IGZhY3RvcnkuZXJyb3IuaGFuZGxlKGVycm9yKSkpKVxuICAgICk7XG5cbiAgQEVmZmVjdCgpXG4gIHB1YmxpYyByZWZyZXNoQW5kTm90aWZ5OiBPYnNlcnZhYmxlPEFjdGlvbj4gPSB0aGlzLmFjdGlvbnNcbiAgICAub2ZUeXBlKFF1b3RlRWRpdEFjdGlvbnMuUmVmcmVzaEFuZE5vdGlmeS5UeXBlKVxuICAgIC5tYXAoKGFjdGlvbjogUXVvdGVFZGl0QWN0aW9ucy5SZWZyZXNoQW5kTm90aWZ5KSA9PlxuICAgICAgdGhpcy5zdG9yZS5jcmVhdGUoZmFjdG9yeSA9PlxuICAgICAgICBmYWN0b3J5LnNuYWNrYmFyLmRpc3BsYXkoYWN0aW9uLnRyYW5zbGF0aW9uU3RyaW5nKVxuICAgICAgKVxuICAgICk7XG5cbiAgQEVmZmVjdCgpXG4gIHB1YmxpYyBhZGRVc2VyVG9RdW90ZTogT2JzZXJ2YWJsZTxBY3Rpb24+ID0gdGhpcy5hY3Rpb25zXG4gICAgLm9mVHlwZShRdW90ZUVkaXRBY3Rpb25zLkFkZFVzZXJUb1F1b3RlLlR5cGUpXG4gICAgLm1hcCgoYWN0aW9uOiBRdW90ZUVkaXRBY3Rpb25zLkFkZFVzZXJUb1F1b3RlKSA9PlxuICAgICAgdGhpcy5zdG9yZS5jcmVhdGUoZmFjdG9yeSA9PiBmYWN0b3J5LmFjY291bnQuZ2V0QWNjb3VudEZvclF1b3RlQWRtaW5PblVzZXJBZGQoYWN0aW9uLnVzZXIuYWNjb3VudElkKSlcbiAgICApO1xuXG4gIEBFZmZlY3QoKVxuICBwdWJsaWMgYWRkQmlsbGluZ0FjY291bnRUb1F1b3RlOiBPYnNlcnZhYmxlPEFjdGlvbj4gPSB0aGlzLmFjdGlvbnNcbiAgICAub2ZUeXBlKFF1b3RlRWRpdEFjdGlvbnMuQWRkQmlsbGluZ0FjY291bnRUb1F1b3RlLlR5cGUpXG4gICAgLm1hcCgoYWN0aW9uOiBRdW90ZUVkaXRBY3Rpb25zLkFkZEJpbGxpbmdBY2NvdW50VG9RdW90ZSkgPT5cbiAgICAgIHRoaXMuc3RvcmUuY3JlYXRlKGZhY3RvcnkgPT4gZmFjdG9yeS5hY2NvdW50LmdldEFjY291bnRGb3JRdW90ZUFkbWluKGFjdGlvbi5hY2NvdW50LmlkKSksXG4gICk7XG5cbiAgQEVmZmVjdCgpXG4gIHB1YmxpYyBhZGROb3RlOiBPYnNlcnZhYmxlPEFjdGlvbj4gPSB0aGlzLmFjdGlvbnMub2ZUeXBlKFF1b3RlRWRpdEFjdGlvbnMuQWRkTm90ZS5UeXBlKVxuICAgIC53aXRoTGF0ZXN0RnJvbSh0aGlzLnN0b3JlLnNlbGVjdChzdGF0ZSA9PiBzdGF0ZS5xdW90ZUVkaXQuZGF0YS5pZCkpXG4gICAgLnN3aXRjaE1hcCgoW2FjdGlvbiwgcXVvdGVJZF06IFtRdW90ZUVkaXRBY3Rpb25zLkFkZE5vdGUsIG51bWJlcl0pID0+XG4gICAgICB0aGlzLnNlcnZpY2UuYWRkTm90ZShxdW90ZUlkLCBhY3Rpb24ubm90ZSwgYWN0aW9uLmxpbmVJdGVtKVxuICAgICAgICAubWFwKHF1b3RlID0+IHRoaXMuc3RvcmUuY3JlYXRlKGZhY3RvcnkgPT4gZmFjdG9yeS5xdW90ZUVkaXQucmVmcmVzaEFuZE5vdGlmeShxdW90ZSwgJ1FVT1RFLlVQREFURUQnKSkpXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiBPYnNlcnZhYmxlLm9mKHRoaXMuc3RvcmUuY3JlYXRlKGZhY3RvcnkgPT4gZmFjdG9yeS5lcnJvci5oYW5kbGUoZXJyb3IpKSkpXG4gICAgKTtcblxuICBARWZmZWN0KClcbiAgcHVibGljIHJlbW92ZU5vdGU6IE9ic2VydmFibGU8QWN0aW9uPiA9IHRoaXMuYWN0aW9ucy5vZlR5cGUoUXVvdGVFZGl0QWN0aW9ucy5SZW1vdmVOb3RlLlR5cGUpXG4gICAgLndpdGhMYXRlc3RGcm9tKHRoaXMuc3RvcmUuc2VsZWN0KHN0YXRlID0+IHN0YXRlLnF1b3RlRWRpdC5kYXRhLmlkKSlcbiAgICAuc3dpdGNoTWFwKChbYWN0aW9uLCBxdW90ZUlkXTogW1F1b3RlRWRpdEFjdGlvbnMuUmVtb3ZlTm90ZSwgbnVtYmVyXSkgPT5cbiAgICAgIHRoaXMuc2VydmljZS5yZW1vdmVOb3RlKHF1b3RlSWQsIGFjdGlvbi5saW5lSXRlbSlcbiAgICAgICAgLm1hcChxdW90ZSA9PiB0aGlzLnN0b3JlLmNyZWF0ZShmYWN0b3J5ID0+IGZhY3RvcnkucXVvdGVFZGl0LnJlZnJlc2hBbmROb3RpZnkocXVvdGUsICdRVU9URS5VUERBVEVEJykpKVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4gT2JzZXJ2YWJsZS5vZih0aGlzLnN0b3JlLmNyZWF0ZShmYWN0b3J5ID0+IGZhY3RvcnkuZXJyb3IuaGFuZGxlKGVycm9yKSkpKVxuICAgICk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBhY3Rpb25zOiBBY3Rpb25zLFxuICAgIHByaXZhdGUgc3RvcmU6IEFwcFN0b3JlLFxuICAgIHByaXZhdGUgc2VydmljZTogRnV0dXJlUXVvdGVFZGl0U2VydmljZSxcbiAgKSB7IH1cblxuICBwcml2YXRlIGZpbmRMaW5lSXRlbUJ5KGFzc2V0TGluZUl0ZW1VdWlkOiBzdHJpbmcsIHF1b3RlOiBRdW90ZSk6IEFzc2V0TGluZUl0ZW0ge1xuICAgIHJldHVybiBxdW90ZS5wcm9qZWN0c1xuICAgICAgLnJlZHVjZSgoYWxsTGluZUl0ZW1zLCBwcm9qZWN0KSA9PiBhbGxMaW5lSXRlbXMuY29uY2F0KHByb2plY3QubGluZUl0ZW1zKSwgW10pXG4gICAgICAuZmluZChsaW5lSXRlbSA9PiBsaW5lSXRlbS5pZCA9PT0gYXNzZXRMaW5lSXRlbVV1aWQpO1xuICB9XG59XG4iXX0=
