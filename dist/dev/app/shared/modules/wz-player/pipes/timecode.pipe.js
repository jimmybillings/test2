"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var index_1 = require("../../wazee-frame-formatter/index");
var TimecodePipe = (function () {
    function TimecodePipe() {
    }
    TimecodePipe.prototype.transform = function (frame) {
        return frame ? frame.asString(index_1.TimecodeFormat.SIMPLE_TIME_CONVERSION) : '';
    };
    TimecodePipe = __decorate([
        core_1.Pipe({ name: 'timecode' })
    ], TimecodePipe);
    return TimecodePipe;
}());
exports.TimecodePipe = TimecodePipe;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kdWxlcy93ei1wbGF5ZXIvcGlwZXMvdGltZWNvZGUucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHNDQUFvRDtBQUVwRCwyREFBMEU7QUFHMUU7SUFBQTtJQUlBLENBQUM7SUFIQyxnQ0FBUyxHQUFULFVBQVUsS0FBWTtRQUNwQixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLHNCQUFjLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQzVFLENBQUM7SUFIVSxZQUFZO1FBRHhCLFdBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FBQztPQUNkLFlBQVksQ0FJeEI7SUFBRCxtQkFBQztDQUpELEFBSUMsSUFBQTtBQUpZLG9DQUFZIiwiZmlsZSI6ImFwcC9zaGFyZWQvbW9kdWxlcy93ei1wbGF5ZXIvcGlwZXMvdGltZWNvZGUucGlwZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRnJhbWUsIFRpbWVjb2RlRm9ybWF0IH0gZnJvbSAnLi4vLi4vd2F6ZWUtZnJhbWUtZm9ybWF0dGVyL2luZGV4JztcblxuQFBpcGUoeyBuYW1lOiAndGltZWNvZGUnIH0pXG5leHBvcnQgY2xhc3MgVGltZWNvZGVQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIHRyYW5zZm9ybShmcmFtZTogRnJhbWUpOiBzdHJpbmcge1xuICAgIHJldHVybiBmcmFtZSA/IGZyYW1lLmFzU3RyaW5nKFRpbWVjb2RlRm9ybWF0LlNJTVBMRV9USU1FX0NPTlZFUlNJT04pIDogJyc7XG4gIH1cbn1cbiJdfQ==
