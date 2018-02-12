"use strict";
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
            return _this.service.addCustomPriceToLineItem(quoteId, action.lineItem, action.price)
                .map(function (quote) { return _this.store.create(function (factory) { return factory.quoteEdit.addCustomPriceToLineItemSuccess(quote); }); })
                .catch(function (error) { return Observable_1.Observable.of(_this.store.create(function (factory) { return factory.quoteEdit.addCustomPriceToLineItemFailure(error); })); });
        });
        this.sendQuote = this.actions.ofType(QuoteEditActions.SendQuote.Type)
            .withLatestFrom(this.store.select(function (state) { return state.quoteEdit; }))
            .switchMap(function (_a) {
            var action = _a[0], quoteEdit = _a[1];
            var invoiceContactType = quoteEdit.sendDetails.invoiceContact.id ? 'User' : undefined;
            var details = {
                expirationDate: new Date(quoteEdit.sendDetails.salesManager.expirationDate),
                agreementId: quoteEdit.sendDetails.salesManager.offlineAgreement || undefined,
                salesManager: quoteEdit.sendDetails.salesManager.salesManager,
                salesOwner: quoteEdit.sendDetails.billingAccount.salesOwner,
                paymentTermsDays: quoteEdit.sendDetails.billingAccount.paymentTermsDays,
                billingAccountId: quoteEdit.sendDetails.billingAccount.id,
                invoiceContactType: invoiceContactType,
                invoiceContactId: quoteEdit.sendDetails.invoiceContact.id
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
    QuoteEditEffects.decorators = [
        { type: core_1.Injectable },
    ];
    QuoteEditEffects.ctorParameters = function () { return [
        { type: effects_1.Actions, },
        { type: app_store_1.AppStore, },
        { type: quote_edit_service_1.FutureQuoteEditService, },
    ]; };
    QuoteEditEffects.propDecorators = {
        'load': [{ type: effects_1.Effect },],
        'delete': [{ type: effects_1.Effect },],
        'changeRouteOnDeleteSuccess': [{ type: effects_1.Effect },],
        'editLineItemFromDetails': [{ type: effects_1.Effect },],
        'showSnackbarOnEditLineItemSuccess': [{ type: effects_1.Effect },],
        'removeAsset': [{ type: effects_1.Effect },],
        'showSnackbarOnRemoveAssetSuccess': [{ type: effects_1.Effect },],
        'changeRouteOnRemoveAssetSuccess': [{ type: effects_1.Effect },],
        'addCustomPriceToLineItem': [{ type: effects_1.Effect },],
        'sendQuote': [{ type: effects_1.Effect },],
        'sendQuoteSuccess': [{ type: effects_1.Effect },],
        'cloneQuote': [{ type: effects_1.Effect },],
        'cloneQuoteSuccess': [{ type: effects_1.Effect },],
        'createQuote': [{ type: effects_1.Effect },],
        'updateQuoteFields': [{ type: effects_1.Effect },],
        'addFeeTo': [{ type: effects_1.Effect },],
        'removeFee': [{ type: effects_1.Effect },],
        'bulkImport': [{ type: effects_1.Effect },],
        'bulkImportSuccess': [{ type: effects_1.Effect },],
        'editLineItem': [{ type: effects_1.Effect },],
        'addAssetToProjectInQuote': [{ type: effects_1.Effect },],
        'addAssetToProjectInQuoteSuccess': [{ type: effects_1.Effect },],
        'addProject': [{ type: effects_1.Effect },],
        'removeProject': [{ type: effects_1.Effect },],
        'updateProject': [{ type: effects_1.Effect },],
        'moveLineItem': [{ type: effects_1.Effect },],
        'cloneLineItem': [{ type: effects_1.Effect },],
        'editLineItemMarkers': [{ type: effects_1.Effect },],
        'updateProjectPriceAttributes': [{ type: effects_1.Effect },],
        'refreshAndNotify': [{ type: effects_1.Effect },],
        'addUserToQuote': [{ type: effects_1.Effect },],
        'addBillingAccountToQuote': [{ type: effects_1.Effect },],
        'addNote': [{ type: effects_1.Effect },],
        'removeNote': [{ type: effects_1.Effect },],
    };
    return QuoteEditEffects;
}());
exports.QuoteEditEffects = QuoteEditEffects;
//# sourceMappingURL=quote-edit.effects.js.map