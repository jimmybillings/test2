"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ErrorBase = (function () {
    function ErrorBase(userCan) {
        this.userCan = userCan;
    }
    Object.defineProperty(ErrorBase.prototype, "showCartLink", {
        get: function () {
            return this.userCan.addToCart() && !this.userCan.administerQuotes();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ErrorBase.prototype, "showCollectionsLink", {
        get: function () {
            return this.userCan.viewCollections();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ErrorBase.prototype, "showQuotesLink", {
        get: function () {
            return this.userCan.administerQuotes();
        },
        enumerable: true,
        configurable: true
    });
    return ErrorBase;
}());
exports.ErrorBase = ErrorBase;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rZXJyb3IvZXJyb3IuYmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBO0lBQ0UsbUJBQXNCLE9BQXFCO1FBQXJCLFlBQU8sR0FBUCxPQUFPLENBQWM7SUFBSSxDQUFDO0lBRWhELHNCQUFXLG1DQUFZO2FBQXZCO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDdEUsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVywwQ0FBbUI7YUFBOUI7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN4QyxDQUFDOzs7T0FBQTtJQUVELHNCQUFXLHFDQUFjO2FBQXpCO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN6QyxDQUFDOzs7T0FBQTtJQUNILGdCQUFDO0FBQUQsQ0FkQSxBQWNDLElBQUE7QUFkWSw4QkFBUyIsImZpbGUiOiJhcHAvK2Vycm9yL2Vycm9yLmJhc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDYXBhYmlsaXRpZXMgfSBmcm9tICcuLi9zaGFyZWQvc2VydmljZXMvY2FwYWJpbGl0aWVzLnNlcnZpY2UnO1xuXG5leHBvcnQgY2xhc3MgRXJyb3JCYXNlIHtcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIHVzZXJDYW46IENhcGFiaWxpdGllcykgeyB9XG5cbiAgcHVibGljIGdldCBzaG93Q2FydExpbmsoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMudXNlckNhbi5hZGRUb0NhcnQoKSAmJiAhdGhpcy51c2VyQ2FuLmFkbWluaXN0ZXJRdW90ZXMoKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgc2hvd0NvbGxlY3Rpb25zTGluaygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy51c2VyQ2FuLnZpZXdDb2xsZWN0aW9ucygpO1xuICB9XG5cbiAgcHVibGljIGdldCBzaG93UXVvdGVzTGluaygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy51c2VyQ2FuLmFkbWluaXN0ZXJRdW90ZXMoKTtcbiAgfVxufVxuIl19
