"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var HomeVideoService = (function () {
    function HomeVideoService(http) {
        this.http = http;
    }
    HomeVideoService.prototype.getVideo = function (mediaId) {
        return this.http.get("https://content.jwplatform.com/feeds/" + mediaId + ".json")
            .map(function (data) { try {
            return data.json();
        }
        catch (exception) {
            return data;
        } });
    };
    HomeVideoService.decorators = [
        { type: core_1.Injectable },
    ];
    HomeVideoService.ctorParameters = function () { return [
        { type: http_1.Http, },
    ]; };
    return HomeVideoService;
}());
exports.HomeVideoService = HomeVideoService;
//# sourceMappingURL=home.video.service.js.map