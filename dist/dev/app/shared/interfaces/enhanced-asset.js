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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvaW50ZXJmYWNlcy9lbmhhbmNlZC1hc3NldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDBFQUF5RjtBQVl6RixzQkFBNkIsS0FBb0MsRUFBRSxJQUFlLEVBQUUsUUFBMEI7SUFDNUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxhQUFhLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLE1BQUEsRUFBRSxRQUFRLFVBQUEsRUFBRSxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7QUFDbkYsQ0FBQztBQUZELG9DQUVDO0FBRUQ7SUFBQTtRQXVDVSxxQkFBZ0IsR0FBa0IsRUFBRSxDQUFDO0lBNFMvQyxDQUFDO0lBeFNDLHNCQUFXLHdDQUFhO2FBQXhCO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDekMsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyw4Q0FBbUI7YUFBOUI7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDbEQsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVywrQ0FBb0I7YUFBL0I7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBQ2hELENBQUM7OztPQUFBO0lBSUQsc0JBQVcsK0NBQW9CO2FBQS9CO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUNoRCxDQUFDOzs7T0FBQTtJQUVELHNCQUFXLHFEQUEwQjthQUFyQztZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQ3pELENBQUM7OztPQUFBO0lBRUQsc0JBQVcsc0RBQTJCO2FBQXRDO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMs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QUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQ3JELENBQUM7UUFDSixDQUFDOzs7T0FBQTtJQUNILG9CQUFDO0FBQUQsQ0FuVkEsQUFtVkMsSUFBQTtBQW5WWSxzQ0FBYSIsImZpbGUiOiJhcHAvc2hhcmVkL2ludGVyZmFjZXMvZW5oYW5jZWQtYXNzZXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGcmFtZSwgVGltZWNvZGVGb3JtYXQgfSBmcm9tICcuLi8uLi9zaGFyZWQvbW9kdWxlcy93YXplZS1mcmFtZS1mb3JtYXR0ZXIvaW5kZXgnO1xuaW1wb3J0IHsgU3ViY2xpcE1hcmtlcnMgfSBmcm9tICcuLi9pbnRlcmZhY2VzL3N1YmNsaXAtbWFya2Vycyc7XG5pbXBvcnQgKiBhcyBjb21tZXJjZSBmcm9tICcuLi9pbnRlcmZhY2VzL2NvbW1lcmNlLmludGVyZmFjZSc7XG5pbXBvcnQgKiBhcyBjb21tb24gZnJvbSAnLi4vaW50ZXJmYWNlcy9jb21tb24uaW50ZXJmYWNlJztcblxuaW50ZXJmYWNlIEludGVybmFsQ2FjaGUge1xuICBbaW5kZXg6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IHR5cGUgQXNzZXRUeXBlID0gJ2NvbGxlY3Rpb24nIHwgJ3F1b3RlRWRpdCcgfCAnc2VhcmNoJyB8ICdxdW90ZVNob3cnIHwgJ29yZGVyJyB8ICdjYXJ0JztcbmV4cG9ydCB0eXBlIEFjY2Vzc1BhdGggPSAnQ29udGVudEZpbHRlcicgfCAnUGFyZW50T2JqZWN0JyB8ICdTaGFyZVVzZXInO1xuXG5leHBvcnQgZnVuY3Rpb24gZW5oYW5jZUFzc2V0KGFzc2V0OiBjb21tZXJjZS5Bc3NldCB8IGNvbW1vbi5Bc3NldCwgdHlwZTogQXNzZXRUeXBlLCBwYXJlbnRJZD86IE51bWJlciB8IHN0cmluZyk6IEVuaGFuY2VkQXNzZXQge1xuICByZXR1cm4gT2JqZWN0LmFzc2lnbihuZXcgRW5oYW5jZWRBc3NldCgpLCBhc3NldCwgeyB0eXBlLCBwYXJlbnRJZCB9KS5ub3JtYWxpemUoKTtcbn1cblxuZXhwb3J0IGNsYXNzIEVuaGFuY2VkQXNzZXQgaW1wbGVtZW50cyBjb21tZXJjZS5Bc3NldCwgY29tbW9uLkFzc2V0IHtcbiAgLy8gZGVmaW5lZCBpbiB0d28gb3IgbW9yZSBvZiB0aGUgZm9sbG93aW5nIHNvdXJjZXNcbiAgcHVibGljIHJlYWRvbmx5IGFzc2V0SWQ6IG51bWJlcjtcbiAgcHVibGljIHJlYWRvbmx5IHR5cGU/OiBBc3NldFR5cGU7XG4gIHB1YmxpYyByZWFkb25seSBwYXJlbnRJZD86IG51bWJlcjtcbiAgcHVibGljIHJlYWRvbmx5IHV1aWQ/OiBzdHJpbmc7XG4gIHB1YmxpYyByZWFkb25seSB0aW1lU3RhcnQ/OiBudW1iZXI7XG4gIHB1YmxpYyByZWFkb25seSB0aW1lRW5kPzogbnVtYmVyO1xuICBwdWJsaWMgY2xpcFVybD86IHN0cmluZzsgIC8vIG5vdCByZWFkb25seSBiZWNhdXNlIHdlIG1pZ2h0IGhhdmUgdG8gdXBkYXRlIGFmdGVyIGluc3RhbnRpYXRpb25cbiAgcHVibGljIHJlYWRvbmx5IGhhc0Rvd25sb2FkYWJsZUNvbXA/OiBib29sZWFuO1xuICBwdWJsaWMgcmVhZG9ubHkgbmFtZTogc3RyaW5nOyAgLy8gY2xpcCBuYW1lIGluIGNvbW1vbi5Bc3NldCwgc29tZXRoaW5nIGVsc2UgaW4gY2xpcCBBUEkgcmVzcG9uc2VcbiAgcHVibGljIHJlYWRvbmx5IHByaW1hcnk/OiBBcnJheTx7IHZhbHVlOiBzdHJpbmcgfT4gfCBjb21tZXJjZS5NZXRhZGF0dW1bXTtcbiAgcHVibGljIHJlYWRvbmx5IHRyYW5zY29kZVRhcmdldHM/OiBzdHJpbmdbXTtcbiAgcHVibGljIHJlYWRvbmx5IGFjY2Vzc1BhdGg6IEFjY2Vzc1BhdGg7XG5cbiAgLy8gZGVmaW5lZCBpbiBjb21tZXJjZS5Bc3NldCBvbmx5XG4gIHB1YmxpYyByZWFkb25seSBhc3NldE5hbWU/OiBzdHJpbmc7XG4gIHB1YmxpYyByZWFkb25seSBhc3NldER1cmF0aW9uPzogbnVtYmVyO1xuICBwdWJsaWMgcmVhZG9ubHkgbWV0YWRhdGE/OiBjb21tZXJjZS5NZXRhZGF0dW1bXTtcbiAgcHVibGljIHJlYWRvbmx5IHJpZ2h0c01hbmFnZWQ/OiBzdHJpbmc7XG4gIHB1YmxpYyByZWFkb25seSBzdXBwbGllcklkPzogbnVtYmVyO1xuICBwdWJsaWMgcmVhZG9ubHkgc3VwcGxpZXJOYW1lPzogc3RyaW5nO1xuICBwdWJsaWMgcmVhZG9ubHkgdGh1bWJuYWlsVXJsPzogc3RyaW5nO1xuXG4gIC8vIGRlZmluZWQgaW4gY29tbW9uLkFzc2V0IG9ubHlcbiAgcHVibGljIHJlYWRvbmx5IG1ldGFEYXRhPzogY29tbWVyY2UuTWV0YWRhdHVtW107XG4gIHB1YmxpYyByZWFkb25seSB0aHVtYm5haWw/OiB7IG5hbWU6IHN0cmluZywgdXJsczogY29tbW9uLkFzc2V0VXJscyB9O1xuICBwdWJsaWMgcmVhZG9ubHkgc21hbGxQcmV2aWV3PzogeyBuYW1lOiBzdHJpbmcsIHVybHM6IGNvbW1vbi5Bc3NldFVybHMgfTtcbiAgcHVibGljIHJlYWRvbmx5IGRldGFpbFR5cGVNYXA/OiBhbnk7XG5cbiAgLy8gZGVmaW5lZCBieSBBUEkgcmVzcG9uc2UgdG8gY2xpcC88aWQ+L2NsaXBEYXRhXG4gIHB1YmxpYyByZWFkb25seSBjbGlwVGh1bWJuYWlsVXJsPzogc3RyaW5nO1xuICBwdWJsaWMgcmVhZG9ubHkgY29tbW9uPzogY29tbWVyY2UuTWV0YWRhdHVtW107XG4gIHB1YmxpYyByZWFkb25seSBmaWx0ZXI/OiBzdHJpbmc7XG4gIHB1YmxpYyByZWFkb25seSBwcmljZT86IG51bWJlcjtcbiAgcHVibGljIHJlYWRvbmx5IHJlc291cmNlQ2xhc3M/OiBzdHJpbmc7XG4gIHB1YmxpYyByZWFkb25seSBzZWNvbmRhcnk/OiBvYmplY3RbXTtcblxuXG4gIHByaXZhdGUgY2FsY3VsYXRpb25DYWNoZTogSW50ZXJuYWxDYWNoZSA9IHt9O1xuXG4gIC8vLy8gYXNzZXQgZHVyYXRpb25cblxuICBwdWJsaWMgZ2V0IGR1cmF0aW9uRnJhbWUoKTogRnJhbWUge1xuICAgIHJldHVybiB0aGlzLmdldENhY2hlZCgnZHVyYXRpb25GcmFtZScpO1xuICB9XG5cbiAgcHVibGljIGdldCBkdXJhdGlvbkZyYW1lTnVtYmVyKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuZnJhbWVOdW1iZXJGcm9tKHRoaXMuZHVyYXRpb25GcmFtZSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGR1cmF0aW9uTWlsbGlzZWNvbmRzKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Q2FjaGVkKCdkdXJhdGlvbk1pbGxpc2Vjb25kcycpO1xuICB9XG5cbiAgLy8vLyBzdWJjbGlwIGR1cmF0aW9uXG5cbiAgcHVibGljIGdldCBzdWJjbGlwRHVyYXRpb25GcmFtZSgpOiBGcmFtZSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Q2FjaGVkKCdzdWJjbGlwRHVyYXRpb25GcmFtZScpO1xuICB9XG5cbiAgcHVibGljIGdldCBzdWJjbGlwRHVyYXRpb25GcmFtZU51bWJlcigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmZyYW1lTnVtYmVyRnJvbSh0aGlzLnN1YmNsaXBEdXJhdGlvbkZyYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgc3ViY2xpcER1cmF0aW9uTWlsbGlzZWNvbmRzKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMubWlsbGlzZWNvbmRzRnJvbSh0aGlzLnN1YmNsaXBEdXJhdGlvbkZyYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgc3ViY2xpcER1cmF0aW9uUGVyY2VudGFnZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnBlcmNlbnRhZ2VGb3IodGhpcy5zdWJjbGlwRHVyYXRpb25GcmFtZSk7XG4gIH1cblxuICAvLy8vIGluIG1hcmtlclxuXG4gIHB1YmxpYyBnZXQgaW5NYXJrZXJGcmFtZSgpOiBGcmFtZSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Q2FjaGVkKCdpbk1hcmtlckZyYW1lJyk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGluTWFya2VyRnJhbWVOdW1iZXIoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5mcmFtZU51bWJlckZyb20odGhpcy5pbk1hcmtlckZyYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgaW5NYXJrZXJNaWxsaXNlY29uZHMoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5taWxsaXNlY29uZHNGcm9tKHRoaXMuaW5NYXJrZXJGcmFtZSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGluTWFya2VyUGVyY2VudGFnZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnBlcmNlbnRhZ2VGb3IodGhpcy5pbk1hcmtlckZyYW1lKTtcbiAgfVxuXG4gIC8vLy8gb3V0IG1hcmtlclxuXG4gIHB1YmxpYyBnZXQgb3V0TWFya2VyRnJhbWUoKTogRnJhbWUge1xuICAgIHJldHVybiB0aGlzLmdldENhY2hlZCgnb3V0TWFya2VyRnJhbWUnKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgb3V0TWFya2VyRnJhbWVOdW1iZXIoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5mcmFtZU51bWJlckZyb20odGhpcy5vdXRNYXJrZXJGcmFtZSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IG91dE1hcmtlck1pbGxpc2Vjb25kcygpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLm1pbGxpc2Vjb25kc0Zyb20odGhpcy5vdXRNYXJrZXJGcmFtZSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IG91dE1hcmtlclBlcmNlbnRhZ2UoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5wZXJjZW50YWdlRm9yKHRoaXMub3V0TWFya2VyRnJhbWUpO1xuICB9XG5cbiAgLy8vLyBtZXRhZGF0YVxuXG4gIHB1YmxpYyBnZXRNZXRhZGF0YVZhbHVlRm9yKG1ldGFkYXRhTmFtZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5maW5kTWV0YWRhdGFWYWx1ZUZvcihtZXRhZGF0YU5hbWUpO1xuICB9XG5cbiAgcHVibGljIGNvbnZlcnRNZXRhZGF0YVZhbHVlRm9yKG1ldGFkYXRhTmFtZTogc3RyaW5nLCBjb252ZXJ0ZXI6ICh2YWx1ZTogc3RyaW5nKSA9PiBhbnkpOiBhbnkge1xuICAgIGNvbnN0IHZhbHVlOiBzdHJpbmcgPSB0aGlzLmdldE1ldGFkYXRhVmFsdWVGb3IobWV0YWRhdGFOYW1lKTtcblxuICAgIHJldHVybiB2YWx1ZSA/IGNvbnZlcnRlcih2YWx1ZSkgOiB1bmRlZmluZWQ7XG4gIH1cblxuICAvLy8vIG90aGVyIGFzc29ydGVkIGluZm9ybWF0aW9uXG5cbiAgcHVibGljIGdldCBzdWJjbGlwTWFya2VycygpOiBTdWJjbGlwTWFya2VycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGluOiB0aGlzLnRpbWVTdGFydCAmJiB0aGlzLnRpbWVTdGFydCA+PSAwID8gdGhpcy5pbk1hcmtlckZyYW1lIDogdW5kZWZpbmVkLFxuICAgICAgb3V0OiB0aGlzLnRpbWVFbmQgJiYgdGhpcy50aW1lRW5kID49IDAgPyB0aGlzLm91dE1hcmtlckZyYW1lIDogdW5kZWZpbmVkXG4gICAgfTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgdGl0bGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5nZXRDYWNoZWQoJ3RpdGxlJyk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGRlc2NyaXB0aW9uKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Q2FjaGVkKCdkZXNjcmlwdGlvbicpO1xuICB9XG5cbiAgcHVibGljIGdldCBmb3JtYXRUeXBlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Q2FjaGVkKCdmb3JtYXRUeXBlJyk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGlzSW1hZ2UoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMucmVzb3VyY2VDbGFzcyA9PT0gJ0ltYWdlJztcbiAgfVxuXG4gIHB1YmxpYyBnZXQgZnJhbWVzUGVyU2Vjb25kKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Q2FjaGVkKCdmcmFtZXNQZXJTZWNvbmQnKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgaXNTdWJjbGlwcGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnRpbWVTdGFydCA+PSAwIHx8IHRoaXMudGltZUVuZCA+PSAwO1xuICB9XG5cbiAgcHVibGljIGdldCByb3V0ZXJMaW5rKCk6IGFueVtdIHtcbiAgICByZXR1cm4gdGhpcy5nZXRDYWNoZWQoJ3JvdXRlckxpbmsnKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgaXNWaWV3YWJsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5hY2Nlc3NQYXRoID09PSAnQ29udGVudEZpbHRlcic7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGlzQ2hpbGRPZlZpZXdhYmxlT2JqZWN0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmFjY2Vzc1BhdGggPT09ICdQYXJlbnRPYmplY3QnO1xuICB9XG5cbiAgLy8vLyBmb3IgaW5pdGlhbGl6YXRpb24gLS0gbWVyZ2VzIGRpZmZlcmVudGx5IGRlZmluZWQgYXNzZXQgcHJvcGVydGllcyBpbnRvIGEgbm9ybWFsaXplZCBzZXRcblxuICBwdWJsaWMgbm9ybWFsaXplKCk6IEVuaGFuY2VkQXNzZXQge1xuICAgIC8vIG1ha2UgJ2Fzc2V0TmFtZScgYXZhaWxhYmxlIGFzICduYW1lJ1xuICAgIGlmICghdGhpcy5uYW1lICYmICEhdGhpcy5hc3NldE5hbWUpIE9iamVjdC5hc3NpZ24odGhpcywgeyBuYW1lOiB0aGlzLmFzc2V0TmFtZSB9KTtcblxuICAgIC8vIG1ha2UgdGhlIGRlZXBseSBuZXN0ZWQgdGh1bWJuYWlsIFVSTCBhdmFpbGFibGUgYXMgJ3RodW1ibmFpbFVybCdcbiAgICBpZiAoIXRoaXMudGh1bWJuYWlsVXJsICYmICEhdGhpcy50aHVtYm5haWwgJiYgISF0aGlzLnRodW1ibmFpbC51cmxzICYmICEhdGhpcy50aHVtYm5haWwudXJscy5odHRwcykge1xuICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCB7IHRodW1ibmFpbFVybDogdGhpcy50aHVtYm5haWwudXJscy5odHRwcyB9KTtcbiAgICB9XG5cbiAgICAvLyBtYWtlICdjbGlwVGh1bWJuYWlsVXJsJyBhdmFpbGFibGUgYXMgJ3RodW1ibmFpbFVybCdcbiAgICBpZiAoIXRoaXMudGh1bWJuYWlsVXJsICYmICEhdGhpcy5jbGlwVGh1bWJuYWlsVXJsKSB7XG4gICAgICBPYmplY3QuYXNzaWduKHRoaXMsIHsgdGh1bWJuYWlsVXJsOiB0aGlzLmNsaXBUaHVtYm5haWxVcmwgfSk7XG4gICAgfVxuXG4gICAgLy8gZW5zdXJlIHRoYXQgJ3RpbWVTdGFydCcgYW5kICd0aW1lRW5kJyBhcmUgbnVtYmVycyAoY29tbWVyY2UuQXNzZXQpLCBub3Qgc3RyaW5ncyAoY29tbW9uLkFzc2V0KVxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgeyB0aW1lU3RhcnQ6IHBhcnNlSW50KGAke3RoaXMudGltZVN0YXJ0fWApLCB0aW1lRW5kOiBwYXJzZUludChgJHt0aGlzLnRpbWVFbmR9YCkgfSk7XG5cbiAgICAvLyBwdWxsICdyZXNvdXJjZUNsYXNzJyBmcm9tIG1ldGFkYXRhIGlmIGl0IHdhc24ndCBwYXNzZWQgaW4gZXhwbGljaXRseVxuICAgIGlmICghdGhpcy5yZXNvdXJjZUNsYXNzKSB7XG4gICAgICBPYmplY3QuYXNzaWduKHRoaXMsIHsgcmVzb3VyY2VDbGFzczogdGhpcy5nZXRNZXRhZGF0YVZhbHVlRm9yKCdSZXNvdXJjZS5DbGFzcycpIH0pO1xuICAgIH1cblxuICAgIC8vIG1ha2UgJ21ldGFEYXRhJyAodXBwZXJjYXNlIEQpIGF2YWlsYWJsZSBhcyAnbWV0YWRhdGEnIChsb3dlcmNhc2UgZClcbiAgICBpZiAoIXRoaXMubWV0YWRhdGEgJiYgISF0aGlzLm1ldGFEYXRhKSB7XG4gICAgICBPYmplY3QuYXNzaWduKHRoaXMsIHsgbWV0YWRhdGE6IHRoaXMubWV0YURhdGEgfSk7XG4gICAgfVxuXG4gICAgLy8gbWFrZSAncHJpbWFyeScgYXZhaWxhYmxlIGFzICdtZXRhZGF0YSdcbiAgICBpZiAoIXRoaXMubWV0YWRhdGEgJiYgISF0aGlzLnByaW1hcnkpIHtcbiAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgeyBtZXRhZGF0YTogdGhpcy5wcmltYXJ5IH0pO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmRldGFpbFR5cGVNYXAgJiYgdGhpcy5kZXRhaWxUeXBlTWFwLmNvbW1vbiAmJiBPYmplY3Qua2V5cyh0aGlzLmRldGFpbFR5cGVNYXAuY29tbW9uKS5sZW5ndGggPiAwKSB7XG4gICAgICBPYmplY3QuYXNzaWduKHRoaXMsIHRoaXMuZGV0YWlsVHlwZU1hcCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLy8vIHByaXZhdGUgbWV0aG9kc1xuXG4gIHByaXZhdGUgZ2V0Q2FjaGVkKGtleTogc3RyaW5nKTogYW55IHtcbiAgICBpZiAoIXRoaXMuY2FsY3VsYXRpb25DYWNoZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB0aGlzLmNhbGN1bGF0aW9uQ2FjaGVba2V5XSA9IHRoaXMuY2FsY3VsYXRlVmFsdWVGb3Ioa2V5KTtcblxuICAgIHJldHVybiB0aGlzLmNhbGN1bGF0aW9uQ2FjaGVba2V5XTtcbiAgfVxuXG4gIHByaXZhdGUgY2FsY3VsYXRlVmFsdWVGb3Ioa2V5OiBzdHJpbmcpOiBhbnkge1xuICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICBjYXNlICdkZXNjcmlwdGlvbic6XG4gICAgICAgIC8vIFRPRE86IFNpdGUgY29uZmlnIHNob3VsZCBzZXQgdGhlIG5hbWUgb2YgdGhlIG1ldGFkYXRhIHRoYXQgaG9sZHMgd2hpY2hldmVyIGRlc2NyaXB0aW9uIGZpZWxkIHRoZSBjdXJyZW50IHNpdGVcbiAgICAgICAgLy8gd2FudHMgdG8gdXNlLCBhbmQgdGhpcyBmdW5jdGlvbiBzaG91bGQgY2FsbCB0aGlzLmdldE1ldGFkYXRhRm9yKCkgd2l0aCB0aGF0IG1ldGFkYXRhIG5hbWUuXG4gICAgICAgIC8vIEJ1dCBmb3Igbm93LCB3ZSBtdXN0IHJlbHkgb24gdGhlIHNpdGUgY29uZmlnIHRvIHBsYWNlIHRoZSAnZGVzY3JpcHRpb24nIG1ldGFkYXRhIGludG8gYXJyYXkgbG9jYXRpb24gMS5cbiAgICAgICAgcmV0dXJuIHRoaXMuZmluZE1ldGFkYXRhVmFsdWVBdEluZGV4KDEpO1xuXG4gICAgICBjYXNlICdkdXJhdGlvbkZyYW1lJzpcbiAgICAgICAgcmV0dXJuIHRoaXMuZnJhbWVzUGVyU2Vjb25kICYmIHRoaXMuZHVyYXRpb25NaWxsaXNlY29uZHNcbiAgICAgICAgICA/IHRoaXMubmV3RnJhbWUuc2V0RnJvbVNlY29uZHModGhpcy5kdXJhdGlvbk1pbGxpc2Vjb25kcyAvIDEwMDApXG4gICAgICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICAgIGNhc2UgJ2R1cmF0aW9uTWlsbGlzZWNvbmRzJzpcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udmVydE1ldGFkYXRhVmFsdWVGb3IoJ0Zvcm1hdC5EdXJhdGlvbicsIHZhbHVlID0+IHtcbiAgICAgICAgICAvLyBJZiB2YWx1ZSBpcyBmb3JtYXR0ZWQgYXMgJ0hIOk1NOlNTJywgYWRkICc7MDAnIHRvIG1ha2UgaXQgJ0hIOk1NOlNTO0ZGJywgYW5kIHRyZWF0IGl0IGFzIGEgdGltZWNvZGUuXG4gICAgICAgICAgLy8gT3RoZXJ3aXNlLCB0cmVhdCBpdCBhcyBhIG51bWVyaWMgdmFsdWUgb2YgbWlsbGlzZWNvbmRzLlxuICAgICAgICAgIHJldHVybiB2YWx1ZS5pbmRleE9mKCc6JykgPT09IC0xXG4gICAgICAgICAgICA/IHBhcnNlSW50KHZhbHVlKVxuICAgICAgICAgICAgOiAodGhpcy5mcmFtZXNQZXJTZWNvbmRcbiAgICAgICAgICAgICAgPyB0aGlzLm1pbGxpc2Vjb25kc0Zyb20odGhpcy5uZXdGcmFtZS5zZXRGcm9tU3RyaW5nKGAke3ZhbHVlfTswMGAsIFRpbWVjb2RlRm9ybWF0LlNJTVBMRV9USU1FX0NPTlZFUlNJT04pKVxuICAgICAgICAgICAgICA6IHVuZGVmaW5lZCk7XG4gICAgICAgIH0pO1xuXG4gICAgICBjYXNlICdmb3JtYXRUeXBlJzpcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TWV0YWRhdGFWYWx1ZUZvcignVEUuRGlnaXRhbEZvcm1hdCcpO1xuXG4gICAgICBjYXNlICdmcmFtZXNQZXJTZWNvbmQnOlxuICAgICAgICByZXR1cm4gdGhpcy5jb252ZXJ0TWV0YWRhdGFWYWx1ZUZvcignRm9ybWF0LkZyYW1lUmF0ZScsIHZhbHVlID0+IHBhcnNlRmxvYXQodmFsdWUpKTtcblxuICAgICAgY2FzZSAnaW5NYXJrZXJGcmFtZSc6XG4gICAgICAgIHJldHVybiB0aGlzLmZyYW1lc1BlclNlY29uZFxuICAgICAgICAgID8gdGhpcy5uZXdGcmFtZS5zZXRGcm9tU2Vjb25kcyh0aGlzLnRpbWVTdGFydCA+PSAwID8gdGhpcy50aW1lU3RhcnQgLyAxMDAwIDogMClcbiAgICAgICAgICA6IHVuZGVmaW5lZDtcblxuICAgICAgY2FzZSAnb3V0TWFya2VyRnJhbWUnOlxuICAgICAgICByZXR1cm4gdGhpcy5mcmFtZXNQZXJTZWNvbmRcbiAgICAgICAgICA/ICh0aGlzLnRpbWVFbmQgPj0gMCA/IHRoaXMubmV3RnJhbWUuc2V0RnJvbVNlY29uZHModGhpcy50aW1lRW5kIC8gMTAwMCkgOiB0aGlzLmR1cmF0aW9uRnJhbWUpXG4gICAgICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICAgIGNhc2UgJ3JvdXRlckxpbmsnOlxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVSb3V0ZXJMaW5rKCk7XG5cbiAgICAgIGNhc2UgJ3N1YmNsaXBEdXJhdGlvbkZyYW1lJzpcbiAgICAgICAgcmV0dXJuIHRoaXMuZnJhbWVzUGVyU2Vjb25kICYmIHRoaXMuaW5NYXJrZXJGcmFtZSAmJiB0aGlzLm91dE1hcmtlckZyYW1lXG4gICAgICAgICAgPyB0aGlzLm5ld0ZyYW1lLnNldEZyb21GcmFtZU51bWJlcih0aGlzLm91dE1hcmtlckZyYW1lTnVtYmVyIC0gdGhpcy5pbk1hcmtlckZyYW1lTnVtYmVyKVxuICAgICAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgICBjYXNlICd0aXRsZSc6XG4gICAgICAgIC8vIFRPRE86IFNpdGUgY29uZmlnIHNob3VsZCBzZXQgdGhlIG5hbWUgb2YgdGhlIG1ldGFkYXRhIHRoYXQgaG9sZHMgd2hpY2hldmVyIHRpdGxlIGZpZWxkIHRoZSBjdXJyZW50IHNpdGVcbiAgICAgICAgLy8gd2FudHMgdG8gdXNlLCBhbmQgdGhpcyBmdW5jdGlvbiBzaG91bGQgY2FsbCB0aGlzLmdldE1ldGFkYXRhRm9yKCkgd2l0aCB0aGF0IG1ldGFkYXRhIG5hbWUuXG4gICAgICAgIC8vIEJ1dCBmb3Igbm93LCB3ZSBtdXN0IHJlbHkgb24gdGhlIHNpdGUgY29uZmlnIHRvIHBsYWNlIHRoZSAndGl0bGUnIG1ldGFkYXRhIGludG8gYXJyYXkgbG9jYXRpb24gMC5cbiAgICAgICAgcmV0dXJuIHRoaXMuZmluZE1ldGFkYXRhVmFsdWVBdEluZGV4KDApO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFZhbHVlIGNhbGN1bGF0aW9uIGZvciAnJHtrZXl9JyBpcyBtaXNzaW5nLmApO1xuICAgIH1cbiAgfVxuXG5cbiAgcHJpdmF0ZSBjcmVhdGVSb3V0ZXJMaW5rKCk6IGFueVtdIHtcbiAgICBzd2l0Y2ggKHRoaXMudHlwZSkge1xuICAgICAgY2FzZSAnY29sbGVjdGlvbic6XG4gICAgICAgIHJldHVybiBbYC9jb2xsZWN0aW9ucy8ke3RoaXMucGFyZW50SWR9L2Fzc2V0LyR7dGhpcy51dWlkfWBdO1xuXG4gICAgICBjYXNlICdxdW90ZUVkaXQnOlxuICAgICAgICByZXR1cm4gW2AvYWN0aXZlLXF1b3RlL2Fzc2V0LyR7dGhpcy51dWlkfWBdO1xuXG4gICAgICBjYXNlICdzZWFyY2gnOlxuICAgICAgICByZXR1cm4gW2Avc2VhcmNoL2Fzc2V0LyR7dGhpcy5hc3NldElkfWBdO1xuXG4gICAgICBjYXNlICdxdW90ZVNob3cnOlxuICAgICAgICByZXR1cm4gW2AvcXVvdGVzLyR7dGhpcy5wYXJlbnRJZH0vYXNzZXQvJHt0aGlzLnV1aWR9YF07XG5cbiAgICAgIGNhc2UgJ29yZGVyJzpcbiAgICAgICAgcmV0dXJuIFtgL29yZGVycy8ke3RoaXMucGFyZW50SWR9L2Fzc2V0LyR7dGhpcy51dWlkfWBdO1xuXG4gICAgICBjYXNlICdjYXJ0JzpcbiAgICAgICAgcmV0dXJuIFtgL2NhcnQvYXNzZXQvJHt0aGlzLnV1aWR9YF07XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXQgbmV3RnJhbWUoKTogRnJhbWUge1xuICAgIHJldHVybiBuZXcgRnJhbWUodGhpcy5mcmFtZXNQZXJTZWNvbmQpO1xuICB9XG5cbiAgcHJpdmF0ZSBmcmFtZU51bWJlckZyb20oZnJhbWU6IEZyYW1lKTogbnVtYmVyIHtcbiAgICByZXR1cm4gZnJhbWUgPyBmcmFtZS5hc0ZyYW1lTnVtYmVyKCkgOiB1bmRlZmluZWQ7XG4gIH1cblxuICBwcml2YXRlIG1pbGxpc2Vjb25kc0Zyb20oZnJhbWU6IEZyYW1lKTogbnVtYmVyIHtcbiAgICByZXR1cm4gZnJhbWUgPyBmcmFtZS5hc01pbGxpc2Vjb25kcygpIDogdW5kZWZpbmVkO1xuICB9XG5cbiAgcHJpdmF0ZSBwZXJjZW50YWdlRm9yKGZyYW1lOiBGcmFtZSk6IG51bWJlciB7XG4gICAgcmV0dXJuIGZyYW1lICYmIHRoaXMuZHVyYXRpb25GcmFtZU51bWJlciA/IHRoaXMuZnJhbWVOdW1iZXJGcm9tKGZyYW1lKSAqIDEwMCAvIHRoaXMuZHVyYXRpb25GcmFtZU51bWJlciA6IDA7XG4gIH1cblxuICBwcml2YXRlIGZpbmRNZXRhZGF0YVZhbHVlRm9yKG1ldGFkYXRhTmFtZTogc3RyaW5nLCBvYmplY3Q6IGFueSA9IHRoaXMpOiBzdHJpbmcge1xuICAgIGlmIChvYmplY3QgIT09IE9iamVjdChvYmplY3QpKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgIGlmIChvYmplY3QubmFtZSA9PT0gbWV0YWRhdGFOYW1lICYmIG9iamVjdC5oYXNPd25Qcm9wZXJ0eSgndmFsdWUnKSkgcmV0dXJuIG9iamVjdC52YWx1ZTtcblxuICAgIGZvciAodmFyIGtleSBvZiBPYmplY3Qua2V5cyhvYmplY3QpKSB7XG4gICAgICBpZiAob2JqZWN0W2tleV0pIHtcbiAgICAgICAgY29uc3QgdmFsdWU6IHN0cmluZyA9IHRoaXMuZmluZE1ldGFkYXRhVmFsdWVGb3IobWV0YWRhdGFOYW1lLCBvYmplY3Rba2V5XSk7XG4gICAgICAgIGlmICh2YWx1ZSkgcmV0dXJuIHZhbHVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBwcml2YXRlIGZpbmRNZXRhZGF0YVZhbHVlQXRJbmRleChpbmRleDogbnVtYmVyKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5tZXRhZGF0YSAmJiB0aGlzLm1ldGFkYXRhW2luZGV4XSA/IHRoaXMubWV0YWRhdGFbaW5kZXhdLnZhbHVlIDogdW5kZWZpbmVkO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXQgcm91dGVyUGFyYW1ldGVycygpOiBhbnkge1xuICAgIHJldHVybiBPYmplY3QuYXNzaWduKFxuICAgICAge30sXG4gICAgICB0aGlzLnV1aWQgPyB7IHV1aWQ6IHRoaXMudXVpZCB9IDogbnVsbCxcbiAgICAgIHRoaXMudGltZVN0YXJ0ID49IDAgPyB7IHRpbWVTdGFydDogdGhpcy50aW1lU3RhcnQgfSA6IG51bGwsXG4gICAgICB0aGlzLnRpbWVFbmQgPj0gMCA/IHsgdGltZUVuZDogdGhpcy50aW1lRW5kIH0gOiBudWxsXG4gICAgKTtcbiAgfVxufVxuIl19
