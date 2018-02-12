"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var api_service_1 = require("../services/api.service");
var api_interface_1 = require("../interfaces/api.interface");
var gallery_view_store_1 = require("../stores/gallery-view.store");
var GalleryViewService = (function () {
    function GalleryViewService(store, api) {
        this.store = store;
        this.api = api;
    }
    Object.defineProperty(GalleryViewService.prototype, "data", {
        get: function () {
            return this.store.data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GalleryViewService.prototype, "state", {
        get: function () {
            return this.store.state;
        },
        enumerable: true,
        configurable: true
    });
    GalleryViewService.prototype.load = function (path) {
        var _this = this;
        var query = (path && path.length > 0) ? this.stringifyPathForSearch(path) : null;
        return this.api.get(api_interface_1.Api.Assets, 'galleryResult', { loadingIndicator: true, parameters: { query: query } })
            .do(function (response) { return _this.store.replaceWith(response.list, path); });
    };
    GalleryViewService.prototype.stringifyPathForSearch = function (path) {
        var _this = this;
        return path.map(function (segment) { return _this.stringifyPathSegmentForSearch(segment); }).join(',');
    };
    GalleryViewService.prototype.stringifyPathSegmentForSearch = function (segment) {
        return segment.ids.map(function (id, index) { return id + ":\"" + segment.names[index] + "\""; }).join(',');
    };
    GalleryViewService.prototype.selectFakeResponseFor = function (index) {
        switch (index) {
            case 0: return this.fakeLevelZeroResponse;
            case 1: return this.fakeLevelTwoResponse;
            case 2: return this.fakeLevelThreeResponse;
        }
        return 'Wha??';
    };
    Object.defineProperty(GalleryViewService.prototype, "fakeLevelZeroResponse", {
        get: function () {
            return "\n      {\n        \"results\": [\n          {\n            \"id\": 2,\n            \"name\": \"Highlights\",\n            \"resultCount\": 17,\n            \"hasMore\": true,\n            \"children\": [\n              {\n                \"id\": 3,\n                \"name\": \"Day 1\",\n                \"resultCount\": 17,\n                \"thumbnailUrl\": \"http://www.masters.com/images/pics/large/h_2016040700348.jpg\",\n                \"hasMore\": true\n              },\n              {\n                \"id\": 3,\n                \"name\": \"Day 2\",\n                \"resultCount\": 32,\n                \"thumbnailUrl\": \"http://www.masters.com/images/pics/large/h_2016040809705.jpg\",\n                \"hasMore\": true\n              },\n              {\n                \"id\": 3,\n                \"name\": \"Day 3\",\n                \"resultCount\": 41,\n                \"thumbnailUrl\": \"http://www.masters.com/images/pics/large/h_2016040910496.jpg\",\n                \"hasMore\": true\n              },\n              {\n                \"id\": 3,\n                \"name\": \"Day 4\",\n                \"resultCount\": 12,\n                \"thumbnailUrl\": \"http://mastersprogressivedl.edgesuite.net/2016/thumbnails/LDR_2016_r4_34046_2_492x277.jpg\",\n                \"hasMore\": true\n              },\n              {\n                \"id\": 3,\n                \"name\": \"Day 5\",\n                \"resultCount\": 0,\n                \"thumbnailUrl\": \"http://www.masters.com/images/pics/large/h_2016040910496.jpg\",\n                \"hasMore\": true\n              },\n              {\n                \"id\": 3,\n                \"name\": \"Day 6\",\n                \"resultCount\": 0,\n                \"thumbnailUrl\": \"http://www.masters.com/images/pics/large/h_2016040809705.jpg\",\n                \"hasMore\": true\n              },\n              {\n                \"id\": 3,\n                \"name\": \"Day 7\",\n                \"resultCount\": 0,\n                \"thumbnailUrl\": \"http://www.masters.com/images/pics/large/h_2016041038412.jpg\",\n                \"hasMore\": true\n              }\n            ]\n          },\n          {\n            \"id\": 5,\n            \"name\": \"Press Packets\",\n            \"resultCount\": 4,\n            \"hasMore\": true,\n            \"children\": [\n              {\n                \"id\": 6,\n                \"name\": \"Day 1\",\n                \"resultCount\": 4,\n                \"thumbnailUrl\": \"https://cdnt3m-a.akamaihd.net/tem/warehouse/186/234/7/1862347_038_lt.jpg\",\n                \"hasMore\": true\n              },\n              {\n                \"id\": 6,\n                \"name\": \"Day 2\",\n                \"resultCount\": 3,\n                \"thumbnailUrl\": \"https://cdnt3m-a.akamaihd.net/tem/warehouse/186/543/186543_003_lt.jpg\",\n                \"hasMore\": true\n              },\n              {\n                \"id\": 6,\n                \"name\": \"Day 3\",\n                \"resultCount\": 4,\n                \"thumbnailUrl\": \"https://cdnt3m-a.akamaihd.net/tem/warehouse/186/212/6/1862126_026_lt.jpg\",\n                \"hasMore\": true\n              },\n              {\n                \"id\": 6,\n                \"name\": \"Day 4\",\n                \"resultCount\": 4,\n                \"thumbnailUrl\": \"https://cdnt3m-a.akamaihd.net/tem/warehouse/186/MVF/K/186MVFK_060_lt.jpg\",\n                \"hasMore\": true\n              },\n              {\n                \"id\": 6,\n                \"name\": \"Day 5\",\n                \"resultCount\": 0,\n                \"thumbnailUrl\": \"https://cdnt3m-a.akamaihd.net/tem/warehouse/186/543/186543_003_lt.jpg\",\n                \"hasMore\": true\n              },\n              {\n                \"id\": 6,\n                \"name\": \"Day 6\",\n                \"resultCount\": 0,\n                \"thumbnailUrl\": \"https://cdnt3m-a.akamaihd.net/tem/warehouse/186/543/186543_003_lt.jpg\",\n                \"hasMore\": true\n              },\n              {\n                \"id\": 6,\n                \"name\": \"Day 7\",\n                \"resultCount\": 0,\n                \"thumbnailUrl\": \"https://cdnt3m-a.akamaihd.net/tem/warehouse/186/543/186543_003_lt.jpg\",\n                \"hasMore\": true\n              }\n            ]\n          },\n          {\n            \"id\": 8,\n            \"name\": \"Promotional Content\",\n            \"resultCount\": 58,\n            \"hasMore\": true,\n            \"children\": [\n              {\n                \"id\": 9,\n                \"name\": \"Fly-overs\",\n                \"resultCount\": 18,\n                \"thumbnailUrl\": \"http://www.masters.com/images/pics/large/h_18rANGC15-1rb0278Hc.jpg\",\n                \"hasMore\": true\n              },\n              {\n                \"id\": 9,\n                \"name\": \"Master Moments\",\n                \"resultCount\": 40,\n                \"thumbnailUrl\": \"http://www.masters.com/images/pics/large/h_masters64_palmeron18_angc_83123735_032011.jpg\",\n                \"hasMore\": true\n              },\n              {\n                \"id\": 9,\n                \"name\": \"Course Scenics\",\n                \"resultCount\": 40,\n                \"thumbnailUrl\": \"https://cdnt3m-a.akamaihd.net/tem/warehouse/186/518/1/1865181_001_lt.jpg\",\n                \"hasMore\": true\n              }\n            ]\n          }\n        ]\n      }\n    ";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GalleryViewService.prototype, "fakeLevelTwoResponse", {
        get: function () {
            return "\n      {\n        \"results\": [\n          {\n            \"id\": 4,\n            \"name\": \"Jordan Spieth\",\n            \"resultCount\": 6,\n            \"thumbnailUrl\": \"http://www.masters.com/images/players/2016/480x270/34046.jpg\",\n            \"hasMore\": true\n          },\n          {\n            \"id\": 4,\n            \"name\": \"Danny Willett\",\n            \"resultCount\": 2,\n            \"thumbnailUrl\": \"http://www.masters.com/images/players/2016/480x270/32139.jpg\",\n            \"hasMore\": true\n          },\n          {\n            \"id\": 4,\n            \"name\": \"Rory McIlroy\",\n            \"resultCount\": 5,\n            \"thumbnailUrl\": \"http://www.masters.com/images/players/2016/480x270/28237.jpg\",\n            \"hasMore\": true\n          },\n          {\n            \"id\": 4,\n            \"name\": \"Dustin Johnson\",\n            \"resultCount\": 4,\n            \"thumbnailUrl\": \"http://www.masters.com/images/players/2016/480x270/30925.jpg\",\n            \"hasMore\": true\n          },\n          {\n            \"id\": 4,\n            \"name\": \"Bryson DeChambeau\",\n            \"resultCount\": 2,\n            \"thumbnailUrl\": \"http://www.masters.com/images/players/2016/480x270/47959.jpg\",\n            \"hasMore\": true\n          },\n          {\n            \"id\": 4,\n            \"name\": \"Jason Day\",\n            \"resultCount\": 3,\n            \"thumbnailUrl\": \"http://www.masters.com/images/players/2016/480x270/28089.jpg\",\n            \"hasMore\": true\n          }\n        ]\n      }\n    ";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GalleryViewService.prototype, "fakeLevelThreeResponse", {
        get: function () {
            return "\n      {\n        \"results\": [\n          {\n            \"id\": 10,\n            \"name\": \"Tee offs\",\n            \"resultCount\": 6,\n            \"thumbnailUrl\": \"\",\n            \"hasMore\": false\n          },\n          {\n            \"id\": 10,\n            \"name\": \"Drives\",\n            \"resultCount\": 2,\n            \"thumbnailUrl\": \"\",\n            \"hasMore\": false\n          },\n          {\n            \"id\": 10,\n            \"name\": \"Putts\",\n            \"resultCount\": 5,\n            \"thumbnailUrl\": \"\",\n            \"hasMore\": false\n          }\n        ]\n      }\n    ";
        },
        enumerable: true,
        configurable: true
    });
    GalleryViewService.decorators = [
        { type: core_1.Injectable },
    ];
    GalleryViewService.ctorParameters = function () { return [
        { type: gallery_view_store_1.GalleryViewStore, },
        { type: api_service_1.ApiService, },
    ]; };
    return GalleryViewService;
}());
exports.GalleryViewService = GalleryViewService;
//# sourceMappingURL=gallery-view.service.js.map