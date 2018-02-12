"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var window_ref_service_1 = require("../../../services/window-ref.service");
var GooglePlacesService = (function () {
    function GooglePlacesService(window, document) {
        var _this = this;
        this.window = window;
        this.document = document;
        this.scriptSrc = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCzyGsK3zaRGFAEC72nWbdRvBY1Lo92Cfw&libraries=places';
        this.initAutocomplete = function (callback) {
            if (_this.window.nativeWindow.google) {
                _this.autocomplete = new _this.window.nativeWindow.google.maps.places.Autocomplete(_this.document.getElementById('autocomplete'), { types: ['address'] });
                _this.autocomplete.addListener('place_changed', callback);
            }
        };
    }
    GooglePlacesService.prototype.geolocate = function () {
        var _this = this;
        navigator.geolocation.getCurrentPosition(function (position) {
            var geolocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            var circle = new _this.window.nativeWindow.google.maps.Circle({
                center: geolocation,
                radius: position.coords.accuracy
            });
            _this.autocomplete.setBounds(circle.getBounds());
        });
    };
    GooglePlacesService.prototype.loadPlacesLibrary = function (callback) {
        var _this = this;
        var scripts = this.document.getElementsByTagName('script');
        var i = scripts.length, scriptLoaded = false;
        while (i--) {
            if (scripts[i].src === this.scriptSrc) {
                scriptLoaded = true;
            }
        }
        if (scriptLoaded) {
            this.initAutocomplete(callback);
        }
        else {
            this.script = this.document.createElement('script');
            Object.assign(this.script, { src: this.scriptSrc, type: 'text/javascript' });
            this.document.body.appendChild(this.script);
            this.script.onload = function () { return _this.initAutocomplete(callback); };
        }
    };
    GooglePlacesService.prototype.getPlace = function () {
        var place = this.autocomplete.getPlace();
        return place.address_components.reduce(function (prev, current) {
            prev[current.types[0]] = { long_name: current.long_name, short_name: current.short_name };
            return prev;
        }, {});
    };
    GooglePlacesService.decorators = [
        { type: core_1.Injectable },
    ];
    GooglePlacesService.ctorParameters = function () { return [
        { type: window_ref_service_1.WindowRef, },
        { type: Document, decorators: [{ type: core_1.Inject, args: [platform_browser_1.DOCUMENT,] },] },
    ]; };
    return GooglePlacesService;
}());
exports.GooglePlacesService = GooglePlacesService;
//# sourceMappingURL=google-places.service.js.map