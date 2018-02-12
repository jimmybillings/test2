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
var capabilities_service_1 = require("../../services/capabilities.service");
var WzAsset = (function () {
    function WzAsset(store, detector) {
        this.store = store;
        this.detector = detector;
        this.onAddToCart = new core_1.EventEmitter();
        this.onShowSpeedview = new core_1.EventEmitter();
        this.onHideSpeedview = new core_1.EventEmitter();
        this.onEditAsset = new core_1.EventEmitter();
        this.onAddtoDifferentCollection = new core_1.EventEmitter();
        this.assetType = 'search';
        this.showAssetName = true;
        this.assetIdsInActiveCollection = [];
        this.enhancedAssets = {};
    }
    Object.defineProperty(WzAsset.prototype, "activeCollection", {
        get: function () {
            return this._activeCollection;
        },
        set: function (value) {
            this._activeCollection = value;
            this.assetIdsInActiveCollection = value.assets.items.map(function (x) { return x.assetId; });
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(WzAsset.prototype, "assets", {
        get: function () {
            return this._assets;
        },
        set: function (assets) {
            this._assets = assets;
        },
        enumerable: true,
        configurable: true
    });
    WzAsset.prototype.ngOnInit = function () {
        var _this = this;
        this.store.selectCloned(function (state) { return state.uiConfig.components.search.config; })
            .filter(function (config) { return !!config.showAssetNameGridView && !!config.showAssetNameGridView.value; })
            .map(function (config) { return config.showAssetNameGridView.value; })
            .take(1).subscribe(function (value) {
            _this.showAssetName = Boolean(value);
        });
    };
    Object.defineProperty(WzAsset.prototype, "canAddToDifferentCollection", {
        get: function () {
            return this.userCan.haveCollections() && this.assetType === 'collection';
        },
        enumerable: true,
        configurable: true
    });
    WzAsset.prototype.addToActiveCollection = function (asset) {
        this.store.dispatch(function (factory) { return factory.activeCollection.addAsset(asset); });
    };
    WzAsset.prototype.removeFromActiveCollection = function (asset) {
        this.store.dispatch(function (factory) { return factory.activeCollection.removeAsset(asset); });
    };
    WzAsset.prototype.addToDifferentCollection = function (asset) {
        this.onAddtoDifferentCollection.emit(asset);
    };
    WzAsset.prototype.addAssetToCart = function (asset) {
        this.setAssetActiveId(asset);
        this.onAddToCart.emit(asset);
    };
    WzAsset.prototype.setAssetActiveId = function (asset) {
        this.assetId = asset.assetId;
        this.hasComp = asset.hasDownloadableComp;
    };
    WzAsset.prototype.loadDeliveryOptionsFor = function (asset) {
        this.assetId = asset.assetId;
        this.store.dispatch(function (factory) { return factory.deliveryOptions.load(asset); });
    };
    WzAsset.prototype.editAsset = function (asset) {
        this.onEditAsset.emit(asset);
    };
    WzAsset.prototype.inCollection = function (asset) {
        return this.assetIdsInActiveCollection.indexOf(asset.assetId) > -1;
    };
    WzAsset.prototype.nameOf = function (asset) {
        return asset.name;
    };
    WzAsset.prototype.routerLinkFor = function (asset) {
        return asset.routerLink;
    };
    WzAsset.prototype.hasThumbnail = function (asset) {
        return !!asset.thumbnailUrl;
    };
    WzAsset.prototype.thumbnailUrlFor = function (asset) {
        return asset.thumbnailUrl;
    };
    WzAsset.prototype.hasTitle = function (asset) {
        return !!this.titleOf(asset);
    };
    WzAsset.prototype.titleOf = function (asset) {
        return asset.title;
    };
    WzAsset.prototype.hasFormatType = function (asset) {
        return !!asset.formatType;
    };
    WzAsset.prototype.formatTypeOf = function (asset) {
        return asset.formatType;
    };
    WzAsset.prototype.formatClassNameFor = function (asset) {
        switch (this.formatTypeOf(asset)) {
            case 'High Definition': return 'hd';
            case 'Standard Definition': return 'sd';
            case 'Digital Video': return 'dv';
            default: return 'hd';
        }
    };
    WzAsset.prototype.hasDuration = function (asset) {
        return !!asset.subclipDurationFrame;
    };
    WzAsset.prototype.subclipDurationFrameFor = function (asset) {
        return asset.subclipDurationFrame;
    };
    WzAsset.prototype.isImage = function (asset) {
        return asset.isImage;
    };
    WzAsset.prototype.isSubclipped = function (asset) {
        return asset.isSubclipped;
    };
    WzAsset.prototype.subclipSegmentStylesFor = function (asset) {
        var enhancedAsset = asset;
        return {
            'margin-left.%': enhancedAsset.inMarkerPercentage,
            'width.%': enhancedAsset.subclipDurationPercentage,
            'min-width.px': 2
        };
    };
    WzAsset.prototype.hasDescription = function (asset) {
        return !!asset.description;
    };
    WzAsset.prototype.descriptionOf = function (asset) {
        return asset.description;
    };
    WzAsset.prototype.inMarkerFrameFor = function (asset) {
        return asset.inMarkerFrame;
    };
    WzAsset.prototype.outMarkerFrameFor = function (asset) {
        return asset.outMarkerFrame;
    };
    WzAsset.prototype.canBePurchased = function (asset) {
        var rights = asset.metaData.find(function (metadatum) {
            return metadatum.name === 'Rights.Reproduction';
        });
        if (!rights)
            return false;
        return ['Rights Managed', 'Royalty Free'].includes(rights.value) &&
            this.store.snapshot(function (state) { return state.speedPreview[asset.assetId] &&
                state.speedPreview[asset.assetId].hasOwnProperty('price'); });
    };
    WzAsset.prototype.commentCountFor = function (asset) {
        return this.store.select(function (factory) { return factory.comment.counts[asset.uuid]; });
    };
    WzAsset.prototype.canBeRemoved = function (asset) {
        return this.inCollection(asset) && this.assetType === 'collection';
    };
    WzAsset.prototype.canBeAddedAgain = function (asset) {
        return this.inCollection(asset) && this.assetType !== 'collection';
    };
    WzAsset.prototype.loadPricing = function (asset) {
        var _this = this;
        this.store.dispatch(function (factory) { return factory.speedPreview.load(asset); });
        this.store.blockUntil(function (state) { return !!state.speedPreview[asset.assetId]; })
            .subscribe(function () { return _this.detector.markForCheck(); });
    };
    Object.defineProperty(WzAsset.prototype, "userCanEditActiveCollection", {
        get: function () {
            return this.userCan.editCollection(this._activeCollection);
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], WzAsset.prototype, "onAddToCart", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], WzAsset.prototype, "onShowSpeedview", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], WzAsset.prototype, "onHideSpeedview", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], WzAsset.prototype, "onEditAsset", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], WzAsset.prototype, "onAddtoDifferentCollection", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", capabilities_service_1.Capabilities)
    ], WzAsset.prototype, "userCan", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], WzAsset.prototype, "assetType", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], WzAsset.prototype, "activeCollection", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], WzAsset.prototype, "assets", null);
    return WzAsset;
}());
exports.WzAsset = WzAsset;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kdWxlcy93ei1hc3NldC93ei1hc3NldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUFrRztBQUtsRyw0RUFBbUU7QUFNbkU7SUE2QkUsaUJBQW9CLEtBQWUsRUFBVSxRQUEyQjtRQUFwRCxVQUFLLEdBQUwsS0FBSyxDQUFVO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBbUI7UUE1QjlELGdCQUFXLEdBQUcsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFDakMsb0JBQWUsR0FBRyxJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUNyQyxvQkFBZSxHQUFHLElBQUksbUJBQVksRUFBRSxDQUFDO1FBQ3JDLGdCQUFXLEdBQUcsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFDakMsK0JBQTBCLEdBQWdDLElBQUksbUJBQVksRUFBRSxDQUFDO1FBR3ZFLGNBQVMsR0FBVyxRQUFRLENBQUM7UUFldEMsa0JBQWEsR0FBWSxJQUFJLENBQUM7UUFFN0IsK0JBQTBCLEdBQWEsRUFBRSxDQUFDO1FBQzFDLG1CQUFjLEdBQTBDLEVBQUUsQ0FBQztJQUdTLENBQUM7SUFwQnBFLHNCQUFXLHFDQUFnQjthQVFwQztZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUM7UUFDaEMsQ0FBQzthQVZRLFVBQTRCLEtBQWlCO1lBQ3BELElBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7WUFDL0IsSUFBSSxDQUFDLDBCQUEwQixHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFDLENBQUMsSUFBSyxPQUFBLENBQUMsQ0FBQyxPQUFPLEVBQVQsQ0FBUyxDQUFDLENBQUM7UUFDN0UsQ0FBQzs7O09BQUE7SUFBQSxDQUFDO0lBQ08sc0JBQVcsMkJBQU07YUEyQjFCO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDdEIsQ0FBQzthQTdCUSxVQUFrQixNQUF1QjtZQUNoRCxJ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T0FBQSxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBaEMsQ0FBZ0MsQ0FBQyxDQUFDO1FBQ2pFLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFuQyxDQUFtQyxDQUFDO2FBQ2hFLFNBQVMsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsRUFBNUIsQ0FBNEIsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFFRCxzQkFBVyxnREFBMkI7YUFBdEM7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDN0QsQ0FBQzs7O09BQUE7SUFwTVM7UUFBVCxhQUFNLEVBQUU7O2dEQUFrQztJQUNqQztRQUFULGFBQU0sRUFBRTs7b0RBQXNDO0lBQ3JDO1FBQVQsYUFBTSxFQUFFOztvREFBc0M7SUFDckM7UUFBVCxhQUFNLEVBQUU7O2dEQUFrQztJQUNqQztRQUFULGFBQU0sRUFBRTtrQ0FBNkIsbUJBQVk7K0RBQXFDO0lBRTlFO1FBQVIsWUFBSyxFQUFFO2tDQUFpQixtQ0FBWTs0Q0FBQztJQUM3QjtRQUFSLFlBQUssRUFBRTs7OENBQXFDO0lBQ3BDO1FBQVIsWUFBSyxFQUFFOzs7bURBR1A7SUFDUTtRQUFSLFlBQUssRUFBRTs7O3lDQUVQO0lBdUxILGNBQUM7Q0F0TUQsQUFzTUMsSUFBQTtBQXRNWSwwQkFBTyIsImZpbGUiOiJhcHAvc2hhcmVkL21vZHVsZXMvd3otYXNzZXQvd3otYXNzZXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBDaGFuZ2VEZXRlY3RvclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5cbmltcG9ydCB7IENvbGxlY3Rpb24gfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2NvbGxlY3Rpb24uaW50ZXJmYWNlJztcbmltcG9ydCB7IEFzc2V0IH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9jb21tb24uaW50ZXJmYWNlJztcbmltcG9ydCB7IENhcGFiaWxpdGllcyB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2NhcGFiaWxpdGllcy5zZXJ2aWNlJztcbmltcG9ydCB7IEZyYW1lIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZHVsZXMvd2F6ZWUtZnJhbWUtZm9ybWF0dGVyL2luZGV4JztcbmltcG9ydCB7IEVuaGFuY2VkQXNzZXQgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9lbmhhbmNlZC1hc3NldCc7XG5pbXBvcnQgeyBBcHBTdG9yZSB9IGZyb20gJy4uLy4uLy4uL2FwcC5zdG9yZSc7XG5pbXBvcnQgeyBNZXRhZGF0dW0gfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9jb21tZXJjZS5pbnRlcmZhY2UnO1xuXG5leHBvcnQgY2xhc3MgV3pBc3NldCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBPdXRwdXQoKSBvbkFkZFRvQ2FydCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIG9uU2hvd1NwZWVkdmlldyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIG9uSGlkZVNwZWVkdmlldyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIG9uRWRpdEFzc2V0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgb25BZGR0b0RpZmZlcmVudENvbGxlY3Rpb246IEV2ZW50RW1pdHRlcjxFbmhhbmNlZEFzc2V0PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBASW5wdXQoKSBwdWJsaWMgdXNlckNhbjogQ2FwYWJpbGl0aWVzO1xuICBASW5wdXQoKSBwdWJsaWMgYXNzZXRUeXBlOiBzdHJpbmcgPSAnc2VhcmNoJztcbiAgQElucHV0KCkgcHVibGljIHNldCBhY3RpdmVDb2xsZWN0aW9uKHZhbHVlOiBDb2xsZWN0aW9uKSB7XG4gICAgdGhpcy5fYWN0aXZlQ29sbGVjdGlvbiA9IHZhbHVlO1xuICAgIHRoaXMuYXNzZXRJZHNJbkFjdGl2ZUNvbGxlY3Rpb24gPSB2YWx1ZS5hc3NldHMuaXRlbXMubWFwKCh4KSA9PiB4LmFzc2V0SWQpO1xuICB9O1xuICBASW5wdXQoKSBwdWJsaWMgc2V0IGFzc2V0cyhhc3NldHM6IEVuaGFuY2VkQXNzZXRbXSkge1xuICAgIHRoaXMuX2Fzc2V0cyA9IGFzc2V0cztcbiAgfVxuXG4gIHB1YmxpYyBnZXQgYWN0aXZlQ29sbGVjdGlvbigpOiBDb2xsZWN0aW9uIHtcbiAgICByZXR1cm4gdGhpcy5fYWN0aXZlQ29sbGVjdGlvbjtcbiAgfVxuXG4gIHB1YmxpYyBhc3NldElkOiBudW1iZXI7XG4gIHB1YmxpYyBoYXNDb21wOiBib29sZWFuO1xuICBwdWJsaWMgc2hvd0Fzc2V0TmFtZTogYm9vbGVhbiA9IHRydWU7XG4gIHByaXZhdGUgX2Fzc2V0czogRW5oYW5jZWRBc3NldFtdO1xuICBwcml2YXRlIGFzc2V0SWRzSW5BY3RpdmVDb2xsZWN0aW9uOiBudW1iZXJbXSA9IFtdO1xuICBwcml2YXRlIGVuaGFuY2VkQXNzZXRzOiB7IFtsb29rdXBJZDogc3RyaW5nXTogRW5oYW5jZWRBc3NldCB9ID0ge307XG4gIHByaXZhdGUgX2FjdGl2ZUNvbGxlY3Rpb246IENvbGxlY3Rpb247XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzdG9yZTogQXBwU3RvcmUsIHByaXZhdGUgZGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmKSB7IH1cblxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5zdG9yZS5zZWxlY3RDbG9uZWQoc3RhdGUgPT4gc3RhdGUudWlDb25maWcuY29tcG9uZW50cy5zZWFyY2guY29uZmlnKVxuICAgICAgLmZpbHRlcihjb25maWcgPT4gISFjb25maWcuc2hvd0Fzc2V0TmFtZUdyaWRWaWV3ICYmICEhY29uZmlnLnNob3dBc3NldE5hbWVHcmlkVmlldy52YWx1ZSlcbiAgICAgIC5tYXAoY29uZmlnID0+IGNvbmZpZy5zaG93QXNzZXROYW1lR3JpZFZpZXcudmFsdWUpXG4gICAgICAudGFrZSgxKS5zdWJzY3JpYmUoKHZhbHVlOiAndHJ1ZScgfCAnZmFsc2UnKSA9PiB7XG4gICAgICAgIHRoaXMuc2hvd0Fzc2V0TmFtZSA9IEJvb2xlYW4odmFsdWUpO1xuICAgICAgfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGFzc2V0cygpOiBFbmhhbmNlZEFzc2V0W10ge1xuICAgIHJldHVybiB0aGlzLl9hc3NldHM7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGNhbkFkZFRvRGlmZmVyZW50Q29sbGVjdGlvbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy51c2VyQ2FuLmhhdmVDb2xsZWN0aW9ucygpICYmIHRoaXMuYXNzZXRUeXBlID09PSAnY29sbGVjdGlvbic7XG4gIH1cblxuICBwdWJsaWMgYWRkVG9BY3RpdmVDb2xsZWN0aW9uKGFzc2V0OiBFbmhhbmNlZEFzc2V0KSB7XG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaChmYWN0b3J5ID0+IGZhY3RvcnkuYWN0aXZlQ29sbGVjdGlvbi5hZGRBc3NldChhc3NldCkpO1xuICB9XG5cbiAgcHVibGljIHJlbW92ZUZyb21BY3RpdmVDb2xsZWN0aW9uKGFzc2V0OiBFbmhhbmNlZEFzc2V0KSB7XG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaChmYWN0b3J5ID0+IGZhY3RvcnkuYWN0aXZlQ29sbGVjdGlvbi5yZW1vdmVBc3NldChhc3NldCkpO1xuICB9XG5cbiAgcHVibGljIGFkZFRvRGlmZmVyZW50Q29sbGVjdGlvbihhc3NldDogRW5oYW5jZWRBc3NldCkge1xuICAgIHRoaXMub25BZGR0b0RpZmZlcmVudENvbGxlY3Rpb24uZW1pdChhc3NldCk7XG4gIH1cblxuICBwdWJsaWMgYWRkQXNzZXRUb0NhcnQoYXNzZXQ6IEVuaGFuY2VkQXNzZXQpIHtcbiAgICB0aGlzLnNldEFzc2V0QWN0aXZlSWQoYXNzZXQpO1xuICAgIHRoaXMub25BZGRUb0NhcnQuZW1pdChhc3NldCk7XG4gIH1cblxuICBwdWJsaWMgc2V0QXNzZXRBY3RpdmVJZChhc3NldDogRW5oYW5jZWRBc3NldCkge1xuICAgIHRoaXMuYXNzZXRJZCA9IGFzc2V0LmFzc2V0SWQ7XG4gICAgdGhpcy5oYXNDb21wID0gYXNzZXQuaGFzRG93bmxvYWRhYmxlQ29tcDtcbiAgfVxuXG4gIHB1YmxpYyBsb2FkRGVsaXZlcnlPcHRpb25zRm9yKGFzc2V0OiBFbmhhbmNlZEFzc2V0KTogdm9pZCB7XG4gICAgdGhpcy5hc3NldElkID0gYXNzZXQuYXNzZXRJZDtcbiAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKGZhY3RvcnkgPT4gZmFjdG9yeS5kZWxpdmVyeU9wdGlvbnMubG9hZChhc3NldCkpO1xuICB9XG5cbiAgcHVibGljIGVkaXRBc3NldChhc3NldDogRW5oYW5jZWRBc3NldCkge1xuICAgIHRoaXMub25FZGl0QXNzZXQuZW1pdChhc3NldCk7XG4gIH1cblxuICBwdWJsaWMgaW5Db2xsZWN0aW9uKGFzc2V0OiBhbnkpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5hc3NldElkc0luQWN0aXZlQ29sbGVjdGlvbi5pbmRleE9mKGFzc2V0LmFzc2V0SWQpID4gLTE7XG4gIH1cblxuICBwdWJsaWMgbmFtZU9mKGFzc2V0OiBFbmhhbmNlZEFzc2V0KTogc3RyaW5nIHtcbiAgICByZXR1cm4gYXNzZXQubmFtZTtcbiAgfVxuXG4gIHB1YmxpYyByb3V0ZXJMaW5rRm9yKGFzc2V0OiBFbmhhbmNlZEFzc2V0KTogYW55W10ge1xuICAgIHJldHVybiBhc3NldC5yb3V0ZXJMaW5rO1xuICB9XG5cbiAgcHVibGljIGhhc1RodW1ibmFpbChhc3NldDogRW5oYW5jZWRBc3NldCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIWFzc2V0LnRodW1ibmFpbFVybDtcbiAgfVxuXG4gIHB1YmxpYyB0aHVtYm5haWxVcmxGb3IoYXNzZXQ6IEVuaGFuY2VkQXNzZXQpOiBzdHJpbmcge1xuICAgIHJldHVybiBhc3NldC50aHVtYm5haWxVcmw7XG4gIH1cblxuICBwdWJsaWMgaGFzVGl0bGUoYXNzZXQ6IEVuaGFuY2VkQXNzZXQpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISF0aGlzLnRpdGxlT2YoYXNzZXQpO1xuICB9XG5cbiAgcHVibGljIHRpdGxlT2YoYXNzZXQ6IEVuaGFuY2VkQXNzZXQpOiBzdHJpbmcge1xuICAgIHJldHVybiBhc3NldC50aXRsZTtcbiAgfVxuXG4gIHB1YmxpYyBoYXNGb3JtYXRUeXBlKGFzc2V0OiBFbmhhbmNlZEFzc2V0KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhYXNzZXQuZm9ybWF0VHlwZTtcbiAgfVxuXG4gIHB1YmxpYyBmb3JtYXRUeXBlT2YoYXNzZXQ6IEVuaGFuY2VkQXNzZXQpOiBzdHJpbmcge1xuICAgIHJldHVybiBhc3NldC5mb3JtYXRUeXBlO1xuICB9XG5cbiAgcHVibGljIGZvcm1hdENsYXNzTmFtZUZvcihhc3NldDogRW5oYW5jZWRBc3NldCk6IHN0cmluZyB7XG4gICAgc3dpdGNoICh0aGlzLmZvcm1hdFR5cGVPZihhc3NldCkpIHtcbiAgICAgIGNhc2UgJ0hpZ2ggRGVmaW5pdGlvbic6IHJldHVybiAnaGQnO1xuICAgICAgY2FzZSAnU3RhbmRhcmQgRGVmaW5pdGlvbic6IHJldHVybiAnc2QnO1xuICAgICAgY2FzZSAnRGlnaXRhbCBWaWRlbyc6IHJldHVybiAnZHYnO1xuICAgICAgZGVmYXVsdDogcmV0dXJuICdoZCc7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGhhc0R1cmF0aW9uKGFzc2V0OiBFbmhhbmNlZEFzc2V0KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhYXNzZXQuc3ViY2xpcER1cmF0aW9uRnJhbWU7XG4gIH1cblxuICBwdWJsaWMgc3ViY2xpcER1cmF0aW9uRnJhbWVGb3IoYXNzZXQ6IEVuaGFuY2VkQXNzZXQpOiBGcmFtZSB7XG4gICAgcmV0dXJuIGFzc2V0LnN1YmNsaXBEdXJhdGlvbkZyYW1lO1xuICB9XG5cbiAgcHVibGljIGlzSW1hZ2UoYXNzZXQ6IEVuaGFuY2VkQXNzZXQpOiBib29sZWFuIHtcbiAgICByZXR1cm4gYXNzZXQuaXNJbWFnZTtcbiAgfVxuXG4gIHB1YmxpYyBpc1N1YmNsaXBwZWQoYXNzZXQ6IEVuaGFuY2VkQXNzZXQpOiBib29sZWFuIHtcbiAgICByZXR1cm4gYXNzZXQuaXNTdWJjbGlwcGVkO1xuICB9XG5cbiAgcHVibGljIHN1YmNsaXBTZWdtZW50U3R5bGVzRm9yKGFzc2V0OiBFbmhhbmNlZEFzc2V0KTogb2JqZWN0IHtcbiAgICBjb25zdCBlbmhhbmNlZEFzc2V0OiBFbmhhbmNlZEFzc2V0ID0gYXNzZXQ7XG5cbiAgICByZXR1cm4ge1xuICAgICAgJ21hcmdpbi1sZWZ0LiUnOiBlbmhhbmNlZEFzc2V0LmluTWFya2VyUGVyY2VudGFnZSxcbiAgICAgICd3aWR0aC4lJzogZW5oYW5jZWRBc3NldC5zdWJjbGlwRHVyYXRpb25QZXJjZW50YWdlLFxuICAgICAgJ21pbi13aWR0aC5weCc6IDJcbiAgICB9O1xuICB9XG5cbiAgcHVibGljIGhhc0Rlc2NyaXB0aW9uKGFzc2V0OiBFbmhhbmNlZEFzc2V0KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhYXNzZXQuZGVzY3JpcHRpb247XG4gIH1cblxuICBwdWJsaWMgZGVzY3JpcHRpb25PZihhc3NldDogRW5oYW5jZWRBc3NldCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGFzc2V0LmRlc2NyaXB0aW9uO1xuICB9XG5cbiAgcHVibGljIGluTWFya2VyRnJhbWVGb3IoYXNzZXQ6IEVuaGFuY2VkQXNzZXQpOiBGcmFtZSB7XG4gICAgcmV0dXJuIGFzc2V0LmluTWFya2VyRnJhbWU7XG4gIH1cblxuICBwdWJsaWMgb3V0TWFya2VyRnJhbWVGb3IoYXNzZXQ6IEVuaGFuY2VkQXNzZXQpOiBGcmFtZSB7XG4gICAgcmV0dXJuIGFzc2V0Lm91dE1hcmtlckZyYW1lO1xuICB9XG5cbiAgcHVibGljIGNhbkJlUHVyY2hhc2VkKGFzc2V0OiBFbmhhbmNlZEFzc2V0KTogYm9vbGVhbiB7XG4gICAgY29uc3QgcmlnaHRzOiBNZXRhZGF0dW0gPSBhc3NldC5tZXRhRGF0YS5maW5kKChtZXRhZGF0dW06IE1ldGFkYXR1bSkgPT5cbiAgICAgIG1ldGFkYXR1bS5uYW1lID09PSAnUmlnaHRzLlJlcHJvZHVjdGlvbicpO1xuXG4gICAgaWYgKCFyaWdodHMpIHJldHVybiBmYWxzZTtcblxuICAgIHJldHVybiBbJ1JpZ2h0cyBNYW5hZ2VkJywgJ1JveWFsdHkgRnJlZSddLmluY2x1ZGVzKHJpZ2h0cy52YWx1ZSkgJiZcbiAgICAgIHRoaXMuc3RvcmUuc25hcHNob3Qoc3RhdGUgPT4gc3RhdGUuc3BlZWRQcmV2aWV3W2Fzc2V0LmFzc2V0SWRdICYmXG4gICAgICAgIHN0YXRlLnNwZWVkUHJldmlld1thc3NldC5hc3NldElkXS5oYXNPd25Qcm9wZXJ0eSgncHJpY2UnKSk7XG4gIH1cblxuICBwdWJsaWMgY29tbWVudENvdW50Rm9yKGFzc2V0OiBFbmhhbmNlZEFzc2V0KTogT2JzZXJ2YWJsZTxudW1iZXI+IHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5zZWxlY3QoZmFjdG9yeSA9PiBmYWN0b3J5LmNvbW1lbnQuY291bnRzW2Fzc2V0LnV1aWRdKTtcbiAgfVxuXG4gIHB1YmxpYyBjYW5CZVJlbW92ZWQoYXNzZXQ6IEVuaGFuY2VkQXNzZXQpIHtcbiAgICByZXR1cm4gdGhpcy5pbkNvbGxlY3Rpb24oYXNzZXQpICYmIHRoaXMuYXNzZXRUeXBlID09PSAnY29sbGVjdGlvbic7XG4gIH1cblxuICBwdWJsaWMgY2FuQmVBZGRlZEFnYWluKGFzc2V0OiBFbmhhbmNlZEFzc2V0KSB7XG4gICAgcmV0dXJuIHRoaXMuaW5Db2xsZWN0aW9uKGFzc2V0KSAmJiB0aGlzLmFzc2V0VHlwZSAhPT0gJ2NvbGxlY3Rpb24nO1xuICB9XG5cbiAgcHVibGljIGxvYWRQcmljaW5nKGFzc2V0OiBhbnkpIHtcbiAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKGZhY3RvcnkgPT4gZmFjdG9yeS5zcGVlZFByZXZpZXcubG9hZChhc3NldCkpO1xuICAgIHRoaXMuc3RvcmUuYmxvY2tVbnRpbChzdGF0ZSA9PiAhIXN0YXRlLnNwZWVkUHJldmlld1thc3NldC5hc3NldElkXSlcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5kZXRlY3Rvci5tYXJrRm9yQ2hlY2soKSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHVzZXJDYW5FZGl0QWN0aXZlQ29sbGVjdGlvbigpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy51c2VyQ2FuLmVkaXRDb2xsZWN0aW9uKHRoaXMuX2FjdGl2ZUNvbGxlY3Rpb24pO1xuICB9XG59XG4iXX0=
