"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Common = (function () {
    function Common() {
    }
    Common.deletePropertiesFromObject = function (object, propertiesToDelete) {
        Object.keys(object).forEach(function (item) {
            if (propertiesToDelete.indexOf(item) > -1) {
                delete object[item];
                return;
            }
            if (Common.isObject(object[item])) {
                Common.deletePropertiesFromObject(object[item], propertiesToDelete);
            }
            if (Common.isArray(object[item])) {
                object[item].forEach(function (item) {
                    if (typeof item === 'object' && !Array.isArray(item)) {
                        Common.deletePropertiesFromObject(item, propertiesToDelete);
                    }
                });
            }
        });
        return object;
    };
    Common.urlStringToParamsObject = function (url) {
        var hashes = url.split(/;(.+)/)[1];
        hashes = (hashes) ? hashes.split(';') : [];
        return hashes.reduce(function (urlObj, hash) {
            var param = hash.split('=');
            urlObj[param[0]] = param[1];
            return urlObj;
        }, {});
    };
    Common.urlParamsObjectToUrlStringParams = function (urlObj) {
        var paramString = ';';
        Object.keys(urlObj).forEach(function (param) {
            paramString = paramString + param + '=' + urlObj[param] + ';';
        });
        paramString = paramString.slice(0, -1);
        return paramString;
    };
    Common.clone = function (object) {
        try {
            return JSON.parse(JSON.stringify(object));
        }
        catch (error) {
            return object;
        }
    };
    Common.setMarginTop = function (className, document) {
        var elements = document.getElementsByClassName(className);
        if (elements.length === 0)
            return;
        var scrollTopMargin = -1 * document.body.getBoundingClientRect().top;
        elements[elements.length - 1].setAttribute('style', "margin-top: " + scrollTopMargin + "px");
    };
    Common.onCollectionShowPage = function (url) {
        return url.includes('/collections/') && !url.includes('/asset/');
    };
    Common.isEmpty = function (obj) {
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop))
                return false;
        }
        return JSON.stringify(obj) === JSON.stringify({});
    };
    Common.convertToDateInstance = function (dateString) {
        var utcDate = new Date(dateString);
        var offsetInMinutes = utcDate.getTimezoneOffset();
        var offsetInMilliseconds = offsetInMinutes * 60 * 1000;
        var fudgeFactor = 500;
        return new Date(utcDate.getTime() + offsetInMilliseconds + fudgeFactor);
    };
    Common.isNullOrUndefined = function (value) {
        return typeof value === 'undefined' || value === null;
    };
    Common.isNotNullOrUndefined = function (value) {
        return !Common.isNullOrUndefined(value);
    };
    Common.isObject = function (item) {
        return Common.isDefined(item) && typeof item === 'object' && !Array.isArray(item);
    };
    Common.isArray = function (item) {
        return Common.isDefined(item) && typeof item === 'object' && Array.isArray(item);
    };
    Common.isDefined = function (item) {
        return item !== null && item !== undefined && item !== NaN;
    };
    return Common;
}());
exports.Common = Common;
//# sourceMappingURL=common.functions.js.map