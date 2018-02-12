"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../../shared/modules/wazee-frame-formatter/index");
function enhanceAsset(asset, type, parentId) {
    return Object.assign(new EnhancedAsset(), asset, { type: type, parentId: parentId }).normalize();
}
exports.enhanceAsset = enhanceAsset;
var EnhancedAsset = (function () {
    function EnhancedAsset() {
        this.calculationCache = {};
    }
    Object.defineProperty(EnhancedAsset.prototype, "durationFrame", {
        get: function () {
            return this.getCached('durationFrame');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EnhancedAsset.prototype, "durationFrameNumber", {
        get: function () {
            return this.frameNumberFrom(this.durationFrame);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EnhancedAsset.prototype, "durationMilliseconds", {
        get: function () {
            return this.getCached('durationMilliseconds');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EnhancedAsset.prototype, "subclipDurationFrame", {
        get: function () {
            return this.getCached('subclipDurationFrame');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EnhancedAsset.prototype, "subclipDurationFrameNumber", {
        get: function () {
            return this.frameNumberFrom(this.subclipDurationFrame);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EnhancedAsset.prototype, "subclipDurationMilliseconds", {
        get: function () {
            return this.millisecondsFrom(this.subclipDurationFrame);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EnhancedAsset.prototype, "subclipDurationPercentage", {
        get: function () {
            return this.percentageFor(this.subclipDurationFrame);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EnhancedAsset.prototype, "inMarkerFrame", {
        get: function () {
            return this.getCached('inMarkerFrame');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EnhancedAsset.prototype, "inMarkerFrameNumber", {
        get: function () {
            return this.frameNumberFrom(this.inMarkerFrame);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EnhancedAsset.prototype, "inMarkerMilliseconds", {
        get: function () {
            return this.millisecondsFrom(this.inMarkerFrame);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EnhancedAsset.prototype, "inMarkerPercentage", {
        get: function () {
            return this.percentageFor(this.inMarkerFrame);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EnhancedAsset.prototype, "outMarkerFrame", {
        get: function () {
            return this.getCached('outMarkerFrame');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EnhancedAsset.prototype, "outMarkerFrameNumber", {
        get: function () {
            return this.frameNumberFrom(this.outMarkerFrame);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EnhancedAsset.prototype, "outMarkerMilliseconds", {
        get: function () {
            return this.millisecondsFrom(this.outMarkerFrame);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EnhancedAsset.prototype, "outMarkerPercentage", {
        get: function () {
            return this.percentageFor(this.outMarkerFrame);
        },
        enumerable: true,
        configurable: true
    });
    EnhancedAsset.prototype.getMetadataValueFor = function (metadataName) {
        return this.findMetadataValueFor(metadataName);
    };
    EnhancedAsset.prototype.convertMetadataValueFor = function (metadataName, converter) {
        var value = this.getMetadataValueFor(metadataName);
        return value ? converter(value) : undefined;
    };
    Object.defineProperty(EnhancedAsset.prototype, "subclipMarkers", {
        get: function () {
            return {
                in: this.timeStart && this.timeStart >= 0 ? this.inMarkerFrame : undefined,
                out: this.timeEnd && this.timeEnd >= 0 ? this.outMarkerFrame : undefined
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EnhancedAsset.prototype, "title", {
        get: function () {
            return this.getCached('title');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EnhancedAsset.prototype, "description", {
        get: function () {
            return this.getCached('description');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EnhancedAsset.prototype, "formatType", {
        get: function () {
            return this.getCached('formatType');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EnhancedAsset.prototype, "isImage", {
        get: function () {
            return this.resourceClass === 'Image';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EnhancedAsset.prototype, "framesPerSecond", {
        get: function () {
            return this.getCached('framesPerSecond');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EnhancedAsset.prototype, "isSubclipped", {
        get: function () {
            return this.timeStart >= 0 || this.timeEnd >= 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EnhancedAsset.prototype, "routerLink", {
        get: function () {
            return this.getCached('routerLink');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EnhancedAsset.prototype, "isViewable", {
        get: function () {
            return this.accessPath === 'ContentFilter';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EnhancedAsset.prototype, "isChildOfViewableObject", {
        get: function () {
            return this.accessPath === 'ParentObject';
        },
        enumerable: true,
        configurable: true
    });
    EnhancedAsset.prototype.normalize = function () {
        if (!this.name && !!this.assetName)
            Object.assign(this, { name: this.assetName });
        if (!this.thumbnailUrl && !!this.thumbnail && !!this.thumbnail.urls && !!this.thumbnail.urls.https) {
            Object.assign(this, { thumbnailUrl: this.thumbnail.urls.https });
        }
        if (!this.thumbnailUrl && !!this.clipThumbnailUrl) {
            Object.assign(this, { thumbnailUrl: this.clipThumbnailUrl });
        }
        Object.assign(this, { timeStart: parseInt("" + this.timeStart), timeEnd: parseInt("" + this.timeEnd) });
        if (!this.resourceClass) {
            Object.assign(this, { resourceClass: this.getMetadataValueFor('Resource.Class') });
        }
        if (!this.metadata && !!this.metaData) {
            Object.assign(this, { metadata: this.metaData });
        }
        if (!this.metadata && !!this.primary) {
            Object.assign(this, { metadata: this.primary });
        }
        if (this.detailTypeMap && this.detailTypeMap.common && Object.keys(this.detailTypeMap.common).length > 0) {
            Object.assign(this, this.detailTypeMap);
        }
        return this;
    };
    EnhancedAsset.prototype.getCached = function (key) {
        if (!this.calculationCache.hasOwnProperty(key))
            this.calculationCache[key] = this.calculateValueFor(key);
        return this.calculationCache[key];
    };
    EnhancedAsset.prototype.calculateValueFor = function (key) {
        var _this = this;
        switch (key) {
            case 'description':
                return this.findMetadataValueAtIndex(1);
            case 'durationFrame':
                return this.framesPerSecond && this.durationMilliseconds
                    ? this.newFrame.setFromSeconds(this.durationMilliseconds / 1000)
                    : undefined;
            case 'durationMilliseconds':
                return this.convertMetadataValueFor('Format.Duration', function (value) {
                    return value.indexOf(':') === -1
                        ? parseInt(value)
                        : (_this.framesPerSecond
                            ? _this.millisecondsFrom(_this.newFrame.setFromString(value + ";00", index_1.TimecodeFormat.SIMPLE_TIME_CONVERSION))
                            : undefined);
                });
            case 'formatType':
                return this.getMetadataValueFor('TE.DigitalFormat');
            case 'framesPerSecond':
                return this.convertMetadataValueFor('Format.FrameRate', function (value) { return parseFloat(value); });
            case 'inMarkerFrame':
                return this.framesPerSecond
                    ? this.newFrame.setFromSeconds(this.timeStart >= 0 ? this.timeStart / 1000 : 0)
                    : undefined;
            case 'outMarkerFrame':
                return this.framesPerSecond
                    ? (this.timeEnd >= 0 ? this.newFrame.setFromSeconds(this.timeEnd / 1000) : this.durationFrame)
                    : undefined;
            case 'routerLink':
                return this.createRouterLink();
            case 'subclipDurationFrame':
                return this.framesPerSecond && this.inMarkerFrame && this.outMarkerFrame
                    ? this.newFrame.setFromFrameNumber(this.outMarkerFrameNumber - this.inMarkerFrameNumber)
                    : undefined;
            case 'title':
                return this.findMetadataValueAtIndex(0);
            default:
                throw new Error("Value calculation for '" + key + "' is missing.");
        }
    };
    EnhancedAsset.prototype.createRouterLink = function () {
        switch (this.type) {
            case 'collection':
                return ["/collections/" + this.parentId + "/asset/" + this.uuid];
            case 'quoteEdit':
                return ["/active-quote/asset/" + this.uuid];
            case 'search':
                return ["/search/asset/" + this.assetId];
            case 'quoteShow':
                return ["/quotes/" + this.parentId + "/asset/" + this.uuid];
            case 'order':
                return ["/orders/" + this.parentId + "/asset/" + this.uuid];
            case 'cart':
                return ["/cart/asset/" + this.uuid];
        }
    };
    Object.defineProperty(EnhancedAsset.prototype, "newFrame", {
        get: function () {
            return new index_1.Frame(this.framesPerSecond);
        },
        enumerable: true,
        configurable: true
    });
    EnhancedAsset.prototype.frameNumberFrom = function (frame) {
        return frame ? frame.asFrameNumber() : undefined;
    };
    EnhancedAsset.prototype.millisecondsFrom = function (frame) {
        return frame ? frame.asMilliseconds() : undefined;
    };
    EnhancedAsset.prototype.percentageFor = function (frame) {
        return frame && this.durationFrameNumber ? this.frameNumberFrom(frame) * 100 / this.durationFrameNumber : 0;
    };
    EnhancedAsset.prototype.findMetadataValueFor = function (metadataName, object) {
        if (object === void 0) { object = this; }
        if (object !== Object(object))
            return undefined;
        if (object.name === metadataName && object.hasOwnProperty('value'))
            return object.value;
        for (var _i = 0, _a = Object.keys(object); _i < _a.length; _i++) {
            var key = _a[_i];
            if (object[key]) {
                var value = this.findMetadataValueFor(metadataName, object[key]);
                if (value)
                    return value;
            }
        }
        return undefined;
    };
    EnhancedAsset.prototype.findMetadataValueAtIndex = function (index) {
        return this.metadata && this.metadata[index] ? this.metadata[index].value : undefined;
    };
    Object.defineProperty(EnhancedAsset.prototype, "routerParameters", {
        get: function () {
            return Object.assign({}, this.uuid ? { uuid: this.uuid } : null, this.timeStart >= 0 ? { timeStart: this.timeStart } : null, this.timeEnd >= 0 ? { timeEnd: this.timeEnd } : null);
        },
        enumerable: true,
        configurable: true
    });
    return EnhancedAsset;
}());
exports.EnhancedAsset = EnhancedAsset;
//# sourceMappingURL=enhanced-asset.js.map