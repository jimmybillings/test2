"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ActionFactory = (function () {
    function ActionFactory() {
    }
    ActionFactory.prototype.setHeaderPosition = function (pageVerticalOffset) {
        return new SetHeaderPosition(pageVerticalOffset);
    };
    ActionFactory.prototype.checkIfHeaderCanBeFixed = function (url) {
        return new CheckIfHeaderCanBeFixed(url);
    };
    ActionFactory.prototype.checkIfFiltersAreAvailable = function (url) {
        return new CheckIfFiltersAreAvailable(url);
    };
    ActionFactory.prototype.reset = function () {
        return new Reset();
    };
    return ActionFactory;
}());
exports.ActionFactory = ActionFactory;
var InternalActionFactory = (function (_super) {
    __extends(InternalActionFactory, _super);
    function InternalActionFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InternalActionFactory.prototype.disableFix = function () {
        return new DisableFix();
    };
    InternalActionFactory.prototype.enableFix = function () {
        return new EnableFix();
    };
    InternalActionFactory.prototype.fix = function () {
        return new Fix();
    };
    InternalActionFactory.prototype.unfix = function () {
        return new Unfix();
    };
    InternalActionFactory.prototype.enableFilters = function () {
        return new EnableFilters();
    };
    InternalActionFactory.prototype.disableFilters = function () {
        return new DisableFilters();
    };
    return InternalActionFactory;
}(ActionFactory));
exports.InternalActionFactory = InternalActionFactory;
var SetHeaderPosition = (function () {
    function SetHeaderPosition(pageVerticalOffset) {
        this.pageVerticalOffset = pageVerticalOffset;
        this.type = SetHeaderPosition.Type;
    }
    SetHeaderPosition.Type = '[Header Display Options] Set Header Position';
    return SetHeaderPosition;
}());
exports.SetHeaderPosition = SetHeaderPosition;
var CheckIfHeaderCanBeFixed = (function () {
    function CheckIfHeaderCanBeFixed(url) {
        this.url = url;
        this.type = CheckIfHeaderCanBeFixed.Type;
    }
    CheckIfHeaderCanBeFixed.Type = '[Header Display Options] Check If Header Can Be Fixed';
    return CheckIfHeaderCanBeFixed;
}());
exports.CheckIfHeaderCanBeFixed = CheckIfHeaderCanBeFixed;
var CheckIfFiltersAreAvailable = (function () {
    function CheckIfFiltersAreAvailable(url) {
        this.url = url;
        this.type = CheckIfFiltersAreAvailable.Type;
    }
    CheckIfFiltersAreAvailable.Type = '[Header Display Options] Check If Filters Are Available';
    return CheckIfFiltersAreAvailable;
}());
exports.CheckIfFiltersAreAvailable = CheckIfFiltersAreAvailable;
var DisableFix = (function () {
    function DisableFix() {
        this.type = DisableFix.Type;
    }
    DisableFix.Type = '[Header Display Options] Disable Fix';
    return DisableFix;
}());
exports.DisableFix = DisableFix;
var EnableFix = (function () {
    function EnableFix() {
        this.type = EnableFix.Type;
    }
    EnableFix.Type = '[Header Display Options] Enable Fix';
    return EnableFix;
}());
exports.EnableFix = EnableFix;
var DisableFilters = (function () {
    function DisableFilters() {
        this.type = DisableFilters.Type;
    }
    DisableFilters.Type = '[Header Display Options] Disable Filters';
    return DisableFilters;
}());
exports.DisableFilters = DisableFilters;
var EnableFilters = (function () {
    function EnableFilters() {
        this.type = EnableFilters.Type;
    }
    EnableFilters.Type = '[Header Display Options] Enable Filters';
    return EnableFilters;
}());
exports.EnableFilters = EnableFilters;
var Fix = (function () {
    function Fix() {
        this.type = Fix.Type;
    }
    Fix.Type = '[Header Display Options] Fix';
    return Fix;
}());
exports.Fix = Fix;
var Unfix = (function () {
    function Unfix() {
        this.type = Unfix.Type;
    }
    Unfix.Type = '[Header Display Options] Unfix';
    return Unfix;
}());
exports.Unfix = Unfix;
var Reset = (function () {
    function Reset() {
        this.type = Reset.Type;
    }
    Reset.Type = '[Header Display Options] Reset';
    return Reset;
}());
exports.Reset = Reset;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9oZWFkZXItZGlzcGxheS1vcHRpb25zL2hlYWRlci1kaXNwbGF5LW9wdGlvbnMuYWN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFFQTtJQUFBO0lBZ0JBLENBQUM7SUFmUSx5Q0FBaUIsR0FBeEIsVUFBeUIsa0JBQTBCO1FBQ2pELE1BQU0sQ0FBQyxJQUFJLGlCQUFpQixDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVNLCtDQUF1QixHQUE5QixVQUErQixHQUFXO1FBQ3hDLE1BQU0sQ0FBQyxJQUFJLHVCQUF1QixDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFTSxrREFBMEIsR0FBakMsVUFBa0MsR0FBVztRQUMzQyxNQUFNLENBQUMsSUFBSSwwQkFBMEIsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRU0sNkJBQUssR0FBWjtRQUNFLE1BQU0sQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFDSCxvQkFBQztBQUFELENBaEJBLEFBZ0JDLElBQUE7QUFoQlksc0NBQWE7QUFrQjFCO0lBQTJDLHlDQUFhO0lBQXhEOztJQXdCQSxDQUFDO0lBdkJRLDBDQUFVLEdBQWpCO1FBQ0UsTUFBTSxDQUFDLElBQUksVUFBVSxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVNLHlDQUFTLEdBQWhCO1FBQ0UsTUFBTSxDQUFDLElBQUksU0FBUyxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVNLG1DQUFHLEdBQVY7UUFDRSxNQUFNLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBRU0scUNBQUssR0FBWjtRQUNFLE1BQU0sQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFTSw2Q0FBYSxHQUFwQjtRQUNFLE1BQU0sQ0FBQyxJQUFJLGFBQWEsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFTSw4Q0FBYyxHQUFyQjtRQUNFLE1BQU0sQ0FBQyxJQUFJLGNBQWMsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFDSCw0QkFBQztBQUFELENBeEJBLEFBd0JDLENBeEIwQyxhQUFhLEdBd0J2RDtBQXhCWSxzREFBcUI7QUEwQmxDO0lBR0UsMkJBQTRCLGtCQUEwQjtRQUExQix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQVE7UUFEdEMsU0FBSSxHQUFHLGlCQUFpQixDQUFDLElBQUksQ0FBQztJQUNZLENBQUM7SUFGcEMsc0JBQUksR0FBRyw4Q0FBOEMsQ0FBQztJQUcvRSx3QkFBQztDQUpELEFBSUMsSUFBQTtBQUpZLDhDQUFpQjtBQU05QjtJQUdFLGlDQUE0QixHQUFXO1FBQVgsUUFBRyxHQUFILEdBQUcsQ0FBUTtRQUR2QixTQUFJLEdBQUcsdUJBQXVCLENBQUMsSUFBSSxDQUFDO0lBQ1QsQ0FBQztJQUZyQiw0QkFBSSxHQUFHLHVEQUF1RCxDQUFDO0lBR3hGLDhCQUFDO0NBSkQsQUFJQyxJQUFBO0FBSlksMERBQXVCO0FBTXBDO0lBR0Usb0NBQTRCLEdBQVc7UUFBWCxRQUFHLEdBQUgsR0FBRyxDQUFRO1FBRHZCLFNBQUksR0FBRywwQkFBMEIsQ0FBQyxJQUFJLENBQUM7SUFDWixDQUFDO0lBRnJCLCtCQUFJLEdBQUcseURBQXlELENBQUM7SUFHMUYsaUNBQUM7Q0FKRCxBQUlDLElBQUE7QUFKWSxnRUFBMEI7QUFNdkM7SUFBQTtRQUVrQixTQUFJLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQztJQUN6QyxDQUFDO0lBRndCLGVBQUksR0FBRyxzQ0FBc0MsQ0FBQztJQUV2RSxpQkFBQztDQUhELEFBR0MsSUFBQTtBQUhZLGdDQUFVO0FBS3ZCO0lBQUE7UUFFa0IsU0FBSSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUM7SUFDeEMsQ0FBQztJQUZ3QixjQUFJLEdBQUcscUNBQXFDLENBQUM7SUFFdEUsZ0JBQUM7Q0FIRCxBQUdDLElBQUE7QUFIWSw4QkFBUztBQUt0QjtJQUFBO1FBRWtCLFNBQUksR0FBRyxjQUFjLENBQUMsSUFBSSxDQUFDO0lBQzdDLENBQUM7SUFGd0IsbUJBQUksR0FBRywwQ0FBMEMsQ0FBQztJQUUzRSxxQkFBQztDQUhELEFBR0MsSUFBQTtBQUhZLHdDQUFjO0FBSzNCO0lBQUE7UUFFa0IsU0FBSSxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUM7SUFDNUMsQ0FBQztJQUZ3QixrQkFBSSxHQUFHLHlDQUF5QyxDQUFDO0lBRTFFLG9CQUFDO0NBSEQsQUFHQyxJQUFBO0FBSFksc0NBQWE7QUFLMUI7SUFBQTtRQUVrQixTQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztJQUNsQyxDQUFDO0lBRndCLFFBQUksR0FBRyw4QkFBOEIsQ0FBQztJQUUvRCxVQUFDO0NBSEQsQUFHQyxJQUFBO0FBSFksa0JBQUc7QUFLaEI7SUFBQTtRQUVrQixTQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQztJQUNwQyxDQUFDO0lBRndCLFVBQUksR0FBRyxnQ0FBZ0MsQ0FBQztJQUVqRSxZQUFDO0NBSEQsQUFHQyxJQUFBO0FBSFksc0JBQUs7QUFLbEI7SUFBQTtRQUVrQixTQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQztJQUNwQyxDQUFDO0lBRndCLFVBQUksR0FBRyxnQ0FBZ0MsQ0FBQztJQUVqRSxZQUFDO0NBSEQsQUFHQyxJQUFBO0FBSFksc0JBQUsiLCJmaWxlIjoiYXBwL3N0b3JlL2hlYWRlci1kaXNwbGF5LW9wdGlvbnMvaGVhZGVyLWRpc3BsYXktb3B0aW9ucy5hY3Rpb25zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuXG5leHBvcnQgY2xhc3MgQWN0aW9uRmFjdG9yeSB7XG4gIHB1YmxpYyBzZXRIZWFkZXJQb3NpdGlvbihwYWdlVmVydGljYWxPZmZzZXQ6IG51bWJlcik6IFNldEhlYWRlclBvc2l0aW9uIHtcbiAgICByZXR1cm4gbmV3IFNldEhlYWRlclBvc2l0aW9uKHBhZ2VWZXJ0aWNhbE9mZnNldCk7XG4gIH1cblxuICBwdWJsaWMgY2hlY2tJZkhlYWRlckNhbkJlRml4ZWQodXJsOiBzdHJpbmcpOiBDaGVja0lmSGVhZGVyQ2FuQmVGaXhlZCB7XG4gICAgcmV0dXJuIG5ldyBDaGVja0lmSGVhZGVyQ2FuQmVGaXhlZCh1cmwpO1xuICB9XG5cbiAgcHVibGljIGNoZWNrSWZGaWx0ZXJzQXJlQXZhaWxhYmxlKHVybDogc3RyaW5nKTogQ2hlY2tJZkZpbHRlcnNBcmVBdmFpbGFibGUge1xuICAgIHJldHVybiBuZXcgQ2hlY2tJZkZpbHRlcnNBcmVBdmFpbGFibGUodXJsKTtcbiAgfVxuXG4gIHB1YmxpYyByZXNldCgpOiBSZXNldCB7XG4gICAgcmV0dXJuIG5ldyBSZXNldCgpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBJbnRlcm5hbEFjdGlvbkZhY3RvcnkgZXh0ZW5kcyBBY3Rpb25GYWN0b3J5IHtcbiAgcHVibGljIGRpc2FibGVGaXgoKTogRGlzYWJsZUZpeCB7XG4gICAgcmV0dXJuIG5ldyBEaXNhYmxlRml4KCk7XG4gIH1cblxuICBwdWJsaWMgZW5hYmxlRml4KCk6IEVuYWJsZUZpeCB7XG4gICAgcmV0dXJuIG5ldyBFbmFibGVGaXgoKTtcbiAgfVxuXG4gIHB1YmxpYyBmaXgoKTogRml4IHtcbiAgICByZXR1cm4gbmV3IEZpeCgpO1xuICB9XG5cbiAgcHVibGljIHVuZml4KCk6IFVuZml4IHtcbiAgICByZXR1cm4gbmV3IFVuZml4KCk7XG4gIH1cblxuICBwdWJsaWMgZW5hYmxlRmlsdGVycygpOiBFbmFibGVGaWx0ZXJzIHtcbiAgICByZXR1cm4gbmV3IEVuYWJsZUZpbHRlcnMoKTtcbiAgfVxuXG4gIHB1YmxpYyBkaXNhYmxlRmlsdGVycygpOiBEaXNhYmxlRmlsdGVycyB7XG4gICAgcmV0dXJuIG5ldyBEaXNhYmxlRmlsdGVycygpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBTZXRIZWFkZXJQb3NpdGlvbiBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVHlwZSA9ICdbSGVhZGVyIERpc3BsYXkgT3B0aW9uc10gU2V0IEhlYWRlciBQb3NpdGlvbic7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlID0gU2V0SGVhZGVyUG9zaXRpb24uVHlwZTtcbiAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IHBhZ2VWZXJ0aWNhbE9mZnNldDogbnVtYmVyKSB7IH1cbn1cblxuZXhwb3J0IGNsYXNzIENoZWNrSWZIZWFkZXJDYW5CZUZpeGVkIGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBUeXBlID0gJ1tIZWFkZXIgRGlzcGxheSBPcHRpb25zXSBDaGVjayBJZiBIZWFkZXIgQ2FuIEJlIEZpeGVkJztcbiAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSBDaGVja0lmSGVhZGVyQ2FuQmVGaXhlZC5UeXBlO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgdXJsOiBzdHJpbmcpIHsgfVxufVxuXG5leHBvcnQgY2xhc3MgQ2hlY2tJZkZpbHRlcnNBcmVBdmFpbGFibGUgaW1wbGVtZW50cyBBY3Rpb24ge1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFR5cGUgPSAnW0hlYWRlciBEaXNwbGF5IE9wdGlvbnNdIENoZWNrIElmIEZpbHRlcnMgQXJlIEF2YWlsYWJsZSc7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlID0gQ2hlY2tJZkZpbHRlcnNBcmVBdmFpbGFibGUuVHlwZTtcbiAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IHVybDogc3RyaW5nKSB7IH1cbn1cblxuZXhwb3J0IGNsYXNzIERpc2FibGVGaXggaW1wbGVtZW50cyBBY3Rpb24ge1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFR5cGUgPSAnW0hlYWRlciBEaXNwbGF5IE9wdGlvbnNdIERpc2FibGUgRml4JztcbiAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSBEaXNhYmxlRml4LlR5cGU7XG59XG5cbmV4cG9ydCBjbGFzcyBFbmFibGVGaXggaW1wbGVtZW50cyBBY3Rpb24ge1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFR5cGUgPSAnW0hlYWRlciBEaXNwbGF5IE9wdGlvbnNdIEVuYWJsZSBGaXgnO1xuICBwdWJsaWMgcmVhZG9ubHkgdHlwZSA9IEVuYWJsZUZpeC5UeXBlO1xufVxuXG5leHBvcnQgY2xhc3MgRGlzYWJsZUZpbHRlcnMgaW1wbGVtZW50cyBBY3Rpb24ge1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFR5cGUgPSAnW0hlYWRlciBEaXNwbGF5IE9wdGlvbnNdIERpc2FibGUgRmlsdGVycyc7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlID0gRGlzYWJsZUZpbHRlcnMuVHlwZTtcbn1cblxuZXhwb3J0IGNsYXNzIEVuYWJsZUZpbHRlcnMgaW1wbGVtZW50cyBBY3Rpb24ge1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFR5cGUgPSAnW0hlYWRlciBEaXNwbGF5IE9wdGlvbnNdIEVuYWJsZSBGaWx0ZXJzJztcbiAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSBFbmFibGVGaWx0ZXJzLlR5cGU7XG59XG5cbmV4cG9ydCBjbGFzcyBGaXggaW1wbGVtZW50cyBBY3Rpb24ge1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFR5cGUgPSAnW0hlYWRlciBEaXNwbGF5IE9wdGlvbnNdIEZpeCc7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlID0gRml4LlR5cGU7XG59XG5cbmV4cG9ydCBjbGFzcyBVbmZpeCBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVHlwZSA9ICdbSGVhZGVyIERpc3BsYXkgT3B0aW9uc10gVW5maXgnO1xuICBwdWJsaWMgcmVhZG9ubHkgdHlwZSA9IFVuZml4LlR5cGU7XG59XG5cbmV4cG9ydCBjbGFzcyBSZXNldCBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVHlwZSA9ICdbSGVhZGVyIERpc3BsYXkgT3B0aW9uc10gUmVzZXQnO1xuICBwdWJsaWMgcmVhZG9ubHkgdHlwZSA9IFJlc2V0LlR5cGU7XG59XG5cbmV4cG9ydCB0eXBlIEFueSA9IERpc2FibGVGaXggfCBFbmFibGVGaXggfCBGaXggfCBVbmZpeCB8IERpc2FibGVGaWx0ZXJzIHwgRW5hYmxlRmlsdGVycyB8IFJlc2V0O1xuIl19
