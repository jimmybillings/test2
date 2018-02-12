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
    ActionFactory.prototype.initialize = function (siteName) {
        return new Initialize(siteName);
    };
    ActionFactory.prototype.load = function () {
        return new Load();
    };
    return ActionFactory;
}());
exports.ActionFactory = ActionFactory;
var InternalActionFactory = (function (_super) {
    __extends(InternalActionFactory, _super);
    function InternalActionFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InternalActionFactory.prototype.loadSuccess = function (config) {
        return new LoadSuccess(config);
    };
    InternalActionFactory.prototype.loadFailure = function (error) {
        return new LoadFailure(error);
    };
    InternalActionFactory.prototype.initializeSuccess = function (config) {
        return new InitializeSuccess(config);
    };
    InternalActionFactory.prototype.initializeFailure = function (error) {
        return new InitializeFailure(error);
    };
    return InternalActionFactory;
}(ActionFactory));
exports.InternalActionFactory = InternalActionFactory;
var Load = (function () {
    function Load() {
        this.type = Load.Type;
    }
    Load.Type = '[Ui Config] Load';
    return Load;
}());
exports.Load = Load;
var LoadSuccess = (function () {
    function LoadSuccess(config) {
        this.config = config;
        this.type = LoadSuccess.Type;
    }
    LoadSuccess.Type = '[Ui Config] Load Success';
    return LoadSuccess;
}());
exports.LoadSuccess = LoadSuccess;
var LoadFailure = (function () {
    function LoadFailure(error) {
        this.error = error;
        this.type = LoadFailure.Type;
    }
    LoadFailure.Type = '[Ui Config] Load Failure';
    return LoadFailure;
}());
exports.LoadFailure = LoadFailure;
var Initialize = (function () {
    function Initialize(siteName) {
        this.siteName = siteName;
        this.type = Initialize.Type;
    }
    Initialize.Type = '[Ui Config] Initialize';
    return Initialize;
}());
exports.Initialize = Initialize;
var InitializeSuccess = (function () {
    function InitializeSuccess(config) {
        this.config = config;
        this.type = InitializeSuccess.Type;
    }
    InitializeSuccess.Type = '[Ui Config] Initialize Success';
    return InitializeSuccess;
}());
exports.InitializeSuccess = InitializeSuccess;
var InitializeFailure = (function () {
    function InitializeFailure(error) {
        this.error = error;
        this.type = InitializeFailure.Type;
    }
    InitializeFailure.Type = '[Ui Config] Initialize Failure';
    return InitializeFailure;
}());
exports.InitializeFailure = InitializeFailure;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS91aS1jb25maWcvdWktY29uZmlnLmFjdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBSUE7SUFBQTtJQVFBLENBQUM7SUFQUSxrQ0FBVSxHQUFqQixVQUFrQixRQUFnQjtRQUNoQyxNQUFNLENBQUMsSUFBSSxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVNLDRCQUFJLEdBQVg7UUFDRSxNQUFNLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBQ0gsb0JBQUM7QUFBRCxDQVJBLEFBUUMsSUFBQTtBQVJZLHNDQUFhO0FBVTFCO0lBQTJDLHlDQUFhO0lBQXhEOztJQWdCQSxDQUFDO0lBZlEsMkNBQVcsR0FBbEIsVUFBbUIsTUFBZ0I7UUFDakMsTUFBTSxDQUFDLElBQUksV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFTSwyQ0FBVyxHQUFsQixVQUFtQixLQUF1QjtRQUN4QyxNQUFNLENBQUMsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVNLGlEQUFpQixHQUF4QixVQUF5QixNQUFnQjtRQUN2QyxNQUFNLENBQUMsSUFBSSxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRU0saURBQWlCLEdBQXhCLFVBQXlCLEtBQXVCO1FBQzlDLE1BQU0sQ0FBQyxJQUFJLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFDSCw0QkFBQztBQUFELENBaEJBLEFBZ0JDLENBaEIwQyxhQUFhLEdBZ0J2RDtBQWhCWSxzREFBcUI7QUFrQmxDO0lBQUE7UUFFa0IsU0FBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDbkMsQ0FBQztJQUZ3QixTQUFJLEdBQUcsa0JBQWtCLENBQUM7SUFFbkQsV0FBQztDQUhELEFBR0MsSUFBQTtBQUhZLG9CQUFJO0FBS2pCO0lBR0UscUJBQTRCLE1BQWdCO1FBQWhCLFdBQU0sR0FBTixNQUFNLENBQVU7UUFENUIsU0FBSSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUM7SUFDUSxDQUFDO0lBRjFCLGdCQUFJLEdBQUcsMEJBQTBCLENBQUM7SUFHM0Qsa0JBQUM7Q0FKRCxBQUlDLElBQUE7QUFKWSxrQ0FBVztBQU14QjtJQUdFLHFCQUE0QixLQUF1QjtRQUF2QixVQUFLLEdBQUwsS0FBSyxDQUFrQjtRQURuQyxTQUFJLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQztJQUNlLENBQUM7SUFGakMsZ0JBQUksR0FBRywwQkFBMEIsQ0FBQztJQUczRCxrQkFBQztDQUpELEFBSUMsSUFBQTtBQUpZLGtDQUFXO0FBTXhCO0lBR0Usb0JBQTRCLFFBQWdCO1FBQWhCLGFBQVEsR0FBUixRQUFRLENBQVE7UUFENUIsU0FBSSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUM7SUFDUyxDQUFDO0lBRjFCLGVBQUksR0FBRyx3QkFBd0IsQ0FBQztJQUd6RCxpQkFBQztDQUpELEFBSUMsSUFBQTtBQUpZLGdDQUFVO0FBTXZCO0lBR0UsMkJBQTRCLE1BQWdCO1FBQWhCLFdBQU0sR0FBTixNQUFNLENBQVU7UUFENUIsU0FBSSxHQUFHLGlCQUFpQixDQUFDLElBQUksQ0FBQztJQUNFLENBQUM7SUFGMUIsc0JBQUksR0FBRyxnQ0FBZ0MsQ0FBQztJQUdqRSx3QkFBQztDQUpELEFBSUMsSUFBQTtBQUpZLDhDQUFpQjtBQU05QjtJQUdFLDJCQUE0QixLQUF1QjtRQUF2QixVQUFLLEdBQUwsS0FBSyxDQUFrQjtRQURuQyxTQUFJLEdBQUcsaUJBQWlCLENBQUMsSUFBSSxDQUFDO0lBQ1MsQ0FBQztJQUZqQyxzQkFBSSxHQUFHLGdDQUFnQyxDQUFDO0lBR2pFLHdCQUFDO0NBSkQsQUFJQyxJQUFBO0FBSlksOENBQWlCIiwiZmlsZSI6ImFwcC9zdG9yZS91aS1jb25maWcvdWktY29uZmlnLmFjdGlvbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBY3Rpb24gfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5pbXBvcnQgeyBTdGF0ZSBhcyBVaUNvbmZpZyB9IGZyb20gJy4vdWktY29uZmlnLnN0YXRlJztcbmltcG9ydCB7IEFwaUVycm9yUmVzcG9uc2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9hcGkuaW50ZXJmYWNlJztcblxuZXhwb3J0IGNsYXNzIEFjdGlvbkZhY3Rvcnkge1xuICBwdWJsaWMgaW5pdGlhbGl6ZShzaXRlTmFtZTogc3RyaW5nKTogSW5pdGlhbGl6ZSB7XG4gICAgcmV0dXJuIG5ldyBJbml0aWFsaXplKHNpdGVOYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyBsb2FkKCk6IExvYWQge1xuICAgIHJldHVybiBuZXcgTG9hZCgpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBJbnRlcm5hbEFjdGlvbkZhY3RvcnkgZXh0ZW5kcyBBY3Rpb25GYWN0b3J5IHtcbiAgcHVibGljIGxvYWRTdWNjZXNzKGNvbmZpZzogVWlDb25maWcpOiBMb2FkU3VjY2VzcyB7XG4gICAgcmV0dXJuIG5ldyBMb2FkU3VjY2Vzcyhjb25maWcpO1xuICB9XG5cbiAgcHVibGljIGxvYWRGYWlsdXJlKGVycm9yOiBBcGlFcnJvclJlc3BvbnNlKTogTG9hZEZhaWx1cmUge1xuICAgIHJldHVybiBuZXcgTG9hZEZhaWx1cmUoZXJyb3IpO1xuICB9XG5cbiAgcHVibGljIGluaXRpYWxpemVTdWNjZXNzKGNvbmZpZzogVWlDb25maWcpOiBJbml0aWFsaXplU3VjY2VzcyB7XG4gICAgcmV0dXJuIG5ldyBJbml0aWFsaXplU3VjY2Vzcyhjb25maWcpO1xuICB9XG5cbiAgcHVibGljIGluaXRpYWxpemVGYWlsdXJlKGVycm9yOiBBcGlFcnJvclJlc3BvbnNlKTogSW5pdGlhbGl6ZUZhaWx1cmUge1xuICAgIHJldHVybiBuZXcgSW5pdGlhbGl6ZUZhaWx1cmUoZXJyb3IpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBMb2FkIGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBUeXBlID0gJ1tVaSBDb25maWddIExvYWQnO1xuICBwdWJsaWMgcmVhZG9ubHkgdHlwZSA9IExvYWQuVHlwZTtcbn1cblxuZXhwb3J0IGNsYXNzIExvYWRTdWNjZXNzIGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBUeXBlID0gJ1tVaSBDb25maWddIExvYWQgU3VjY2Vzcyc7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlID0gTG9hZFN1Y2Nlc3MuVHlwZTtcbiAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IGNvbmZpZzogVWlDb25maWcpIHsgfVxufVxuXG5leHBvcnQgY2xhc3MgTG9hZEZhaWx1cmUgaW1wbGVtZW50cyBBY3Rpb24ge1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFR5cGUgPSAnW1VpIENvbmZpZ10gTG9hZCBGYWlsdXJlJztcbiAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSBMb2FkRmFpbHVyZS5UeXBlO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgZXJyb3I6IEFwaUVycm9yUmVzcG9uc2UpIHsgfVxufVxuXG5leHBvcnQgY2xhc3MgSW5pdGlhbGl6ZSBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVHlwZSA9ICdbVWkgQ29uZmlnXSBJbml0aWFsaXplJztcbiAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSBJbml0aWFsaXplLlR5cGU7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBzaXRlTmFtZTogc3RyaW5nKSB7IH1cbn1cblxuZXhwb3J0IGNsYXNzIEluaXRpYWxpemVTdWNjZXNzIGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBUeXBlID0gJ1tVaSBDb25maWddIEluaXRpYWxpemUgU3VjY2Vzcyc7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlID0gSW5pdGlhbGl6ZVN1Y2Nlc3MuVHlwZTtcbiAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IGNvbmZpZzogVWlDb25maWcpIHsgfVxufVxuXG5leHBvcnQgY2xhc3MgSW5pdGlhbGl6ZUZhaWx1cmUgaW1wbGVtZW50cyBBY3Rpb24ge1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFR5cGUgPSAnW1VpIENvbmZpZ10gSW5pdGlhbGl6ZSBGYWlsdXJlJztcbiAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSBJbml0aWFsaXplRmFpbHVyZS5UeXBlO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgZXJyb3I6IEFwaUVycm9yUmVzcG9uc2UpIHsgfVxufVxuXG5leHBvcnQgdHlwZSBBbnkgPSBMb2FkIHwgTG9hZFN1Y2Nlc3MgfCBMb2FkRmFpbHVyZSB8IEluaXRpYWxpemUgfCBJbml0aWFsaXplU3VjY2VzcyB8IEluaXRpYWxpemVGYWlsdXJlO1xuIl19
