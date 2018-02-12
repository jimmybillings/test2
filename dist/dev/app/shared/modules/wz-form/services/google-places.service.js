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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
    GooglePlacesService = __decorate([
        core_1.Injectable(),
        __param(1, core_1.Inject(platform_browser_1.DOCUMENT)),
        __metadata("design:paramtypes", [window_ref_service_1.WindowRef, Document])
    ], GooglePlacesService);
    return GooglePlacesService;
}());
exports.GooglePlacesService = GooglePlacesService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kdWxlcy93ei1mb3JtL3NlcnZpY2VzL2dvb2dsZS1wbGFjZXMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUFtRDtBQUNuRCw4REFBcUQ7QUFDckQsMkVBQWlFO0FBS2pFO0lBS0UsNkJBQW9CLE1BQWlCLEVBQTRCLFFBQWtCO1FBQW5GLGlCQUF3RjtRQUFwRSxXQUFNLEdBQU4sTUFBTSxDQUFXO1FBQTRCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFGbEUsY0FBUyxHQUMxQixzR0FBc0csQ0FBQztRQXFDaEcscUJBQWdCLEdBQUcsVUFBQyxRQUFrQjtZQUMzQyxFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNwQyxLQUFJLENBQUMsWUFBWSxHQUFHLElBQUksS0FBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUM5RSxLQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsRUFDNUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUN2QixDQUFDO2dCQUNGLEtBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLGVBQWUsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUMzRCxDQUFDO1FBQ0gsQ0FBQyxDQUFBO0lBNUNzRixDQUFDO0lBRWpGLHVDQUFTLEdBQWhCO1FBQUEsaUJBWUM7UUFYQyxTQUFTLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUFDLFVBQUMsUUFBa0I7WUFDMUQsSUFBSSxXQUFXLEdBQWdCO2dCQUM3QixHQUFHLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRO2dCQUM3QixHQUFHLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTO2FBQy9CLENBQUM7WUFDRixJQUFJLE1BQU0sR0FBVyxJQUFJLEtBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO2dCQUNuRSxNQUFNLEVBQUUsV0FBVztnQkFDbkIsTUFBTSxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUTthQUNqQyxDQUFDLENBQUM7WUFDSCxLQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztRQUNsRCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSwrQ0FBaUIsR0FBeEIsVUFBeUIsUUFBa0I7UUFBM0MsaUJBa0JDO1FBakJDLElBQUksT0FBTyxHQUFrQyxJQUFJLENBQUMsUUFBUSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzFGLElBQUksQ0FBQyxHQUFXLE9BQU8sQ0FBQyxNQUFNLEVBQUUsWUFBWSxHQUFZLEtBQUssQ0FBQztRQUU5RCxPQUFPLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDWCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUN0QyxZQUFZLEdBQUcsSUFBSSxDQUFDO1lBQ3RCLENBQUM7UUFDSCxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUNqQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbEMsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNwRCxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO1lBQzdFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDNUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsY0FBTSxPQUFBLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsRUFBL0IsQ0FBK0IsQ0FBQztRQUM3RCxDQUFDO0lBQ0gsQ0FBQztJQVlNLHNDQUFRLEdBQWY7UUFDRSxJQUFJLEtBQUssR0FBa0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUV4RCxNQUFNLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxVQUFDLElBQTRCLEVBQUUsT0FBK0I7WUFDbkcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDMUYsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNkLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNULENBQUM7SUExRFUsbUJBQW1CO1FBRC9CLGlCQUFVLEVBQUU7UUFNNkIsV0FBQSxhQUFNLENBQUMsMkJBQVEsQ0FBQyxDQUFBO3lDQUE1Qiw4QkFBUyxFQUFzQyxRQUFRO09BTHhFLG1CQUFtQixDQTJEL0I7SUFBRCwwQkFBQztDQTNERCxBQTJEQyxJQUFBO0FBM0RZLGtEQUFtQiIsImZpbGUiOiJhcHAvc2hhcmVkL21vZHVsZXMvd3otZm9ybS9zZXJ2aWNlcy9nb29nbGUtcGxhY2VzLnNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQgeyBXaW5kb3dSZWYgfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcy93aW5kb3ctcmVmLnNlcnZpY2UnO1xuaW1wb3J0IHsgR29vZ2xlQWRkcmVzcywgRm9ybWF0dGVkR29vZ2xlQWRkcmVzcywgR29vZ2xlQWRkcmVzc0NvbXBvbmVudCB9IGZyb20gJy4uLy4uLy4uL2ludGVyZmFjZXMvdXNlci5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgR2VvbG9jYXRpb24sIFBvc2l0aW9uLCBDaXJjbGUsIEF1dG9jb21wbGV0ZSB9IGZyb20gJy4uLy4uLy4uL2ludGVyZmFjZXMvY29tbW9uLmludGVyZmFjZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBHb29nbGVQbGFjZXNTZXJ2aWNlIHtcbiAgcHVibGljIGF1dG9jb21wbGV0ZTogQXV0b2NvbXBsZXRlO1xuICBwdWJsaWMgc2NyaXB0OiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSByZWFkb25seSBzY3JpcHRTcmM6IHN0cmluZyA9XG4gICdodHRwczovL21hcHMuZ29vZ2xlYXBpcy5jb20vbWFwcy9hcGkvanM/a2V5PUFJemFTeUN6eUdzSzN6YVJHRkFFQzcybldiZFJ2QlkxTG85MkNmdyZsaWJyYXJpZXM9cGxhY2VzJztcbiAgY29uc3RydWN0b3IocHJpdmF0ZSB3aW5kb3c6IFdpbmRvd1JlZiwgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogRG9jdW1lbnQpIHsgfVxuXG4gIHB1YmxpYyBnZW9sb2NhdGUoKTogdm9pZCB7XG4gICAgbmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbigocG9zaXRpb246IFBvc2l0aW9uKSA9PiB7XG4gICAgICBsZXQgZ2VvbG9jYXRpb246IEdlb2xvY2F0aW9uID0ge1xuICAgICAgICBsYXQ6IHBvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZSxcbiAgICAgICAgbG5nOiBwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlXG4gICAgICB9O1xuICAgICAgbGV0IGNpcmNsZTogQ2lyY2xlID0gbmV3IHRoaXMud2luZG93Lm5hdGl2ZVdpbmRvdy5nb29nbGUubWFwcy5DaXJjbGUoe1xuICAgICAgICBjZW50ZXI6IGdlb2xvY2F0aW9uLFxuICAgICAgICByYWRpdXM6IHBvc2l0aW9uLmNvb3Jkcy5hY2N1cmFjeVxuICAgICAgfSk7XG4gICAgICB0aGlzLmF1dG9jb21wbGV0ZS5zZXRCb3VuZHMoY2lyY2xlLmdldEJvdW5kcygpKTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBsb2FkUGxhY2VzTGlicmFyeShjYWxsYmFjazogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICBsZXQgc2NyaXB0czogTm9kZUxpc3RPZjxIVE1MU2NyaXB0RWxlbWVudD4gPSB0aGlzLmRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzY3JpcHQnKTtcbiAgICBsZXQgaTogbnVtYmVyID0gc2NyaXB0cy5sZW5ndGgsIHNjcmlwdExvYWRlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgaWYgKHNjcmlwdHNbaV0uc3JjID09PSB0aGlzLnNjcmlwdFNyYykge1xuICAgICAgICBzY3JpcHRMb2FkZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzY3JpcHRMb2FkZWQpIHtcbiAgICAgIHRoaXMuaW5pdEF1dG9jb21wbGV0ZShjYWxsYmFjayk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2NyaXB0ID0gdGhpcy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5zY3JpcHQsIHsgc3JjOiB0aGlzLnNjcmlwdFNyYywgdHlwZTogJ3RleHQvamF2YXNjcmlwdCcgfSk7XG4gICAgICB0aGlzLmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5zY3JpcHQpO1xuICAgICAgdGhpcy5zY3JpcHQub25sb2FkID0gKCkgPT4gdGhpcy5pbml0QXV0b2NvbXBsZXRlKGNhbGxiYWNrKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgaW5pdEF1dG9jb21wbGV0ZSA9IChjYWxsYmFjazogRnVuY3Rpb24pOiB2b2lkID0+IHtcbiAgICBpZiAodGhpcy53aW5kb3cubmF0aXZlV2luZG93Lmdvb2dsZSkge1xuICAgICAgdGhpcy5hdXRvY29tcGxldGUgPSBuZXcgdGhpcy53aW5kb3cubmF0aXZlV2luZG93Lmdvb2dsZS5tYXBzLnBsYWNlcy5BdXRvY29tcGxldGUoXG4gICAgICAgIHRoaXMuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2F1dG9jb21wbGV0ZScpLFxuICAgICAgICB7IHR5cGVzOiBbJ2FkZHJlc3MnXSB9XG4gICAgICApO1xuICAgICAgdGhpcy5hdXRvY29tcGxldGUuYWRkTGlzdGVuZXIoJ3BsYWNlX2NoYW5nZWQnLCBjYWxsYmFjayk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGdldFBsYWNlKCk6IEZvcm1hdHRlZEdvb2dsZUFkZHJlc3Mge1xuICAgIGxldCBwbGFjZTogR29vZ2xlQWRkcmVzcyA9IHRoaXMuYXV0b2NvbXBsZXRlLmdldFBsYWNlKCk7XG5cbiAgICByZXR1cm4gcGxhY2UuYWRkcmVzc19jb21wb25lbnRzLnJlZHVjZSgocHJldjogRm9ybWF0dGVkR29vZ2xlQWRkcmVzcywgY3VycmVudDogR29vZ2xlQWRkcmVzc0NvbXBvbmVudCkgPT4ge1xuICAgICAgcHJldltjdXJyZW50LnR5cGVzWzBdXSA9IHsgbG9uZ19uYW1lOiBjdXJyZW50LmxvbmdfbmFtZSwgc2hvcnRfbmFtZTogY3VycmVudC5zaG9ydF9uYW1lIH07XG4gICAgICByZXR1cm4gcHJldjtcbiAgICB9LCB7fSk7XG4gIH1cbn1cbiJdfQ==
