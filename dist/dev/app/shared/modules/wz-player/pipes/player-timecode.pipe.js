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
var common_functions_1 = require("../../../utilities/common.functions");
var PlayerTimecodePipe = (function () {
    function PlayerTimecodePipe() {
    }
    PlayerTimecodePipe.prototype.transform = function (frame, state, format, base) {
        if (!frame)
            return '';
        var chosenFormat = common_functions_1.Common.isNullOrUndefined(format)
            ? (state ? state.timecodeFormat : index_1.TimecodeFormat.SIMPLE_TIME_CONVERSION)
            : format;
        var chosenBase = common_functions_1.Common.isNullOrUndefined(base)
            ? (state ? state.timecodeBase : index_1.TimecodeBase.STREAM_BASED)
            : base;
        return frame.asString(chosenFormat, chosenBase);
    };
    PlayerTimecodePipe = __decorate([
        core_1.Pipe({ name: 'playerTimecode' })
    ], PlayerTimecodePipe);
    return PlayerTimecodePipe;
}());
exports.PlayerTimecodePipe = PlayerTimecodePipe;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kdWxlcy93ei1wbGF5ZXIvcGlwZXMvcGxheWVyLXRpbWVjb2RlLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxzQ0FBb0Q7QUFHcEQsMkRBQXdGO0FBQ3hGLHdFQUE2RDtBQUc3RDtJQUFBO0lBZ0JBLENBQUM7SUFmUSxzQ0FBUyxHQUFoQixVQUFpQixLQUFZLEVBQUUsS0FBa0IsRUFBRSxNQUF1QixFQUFFLElBQW1CO1FBQzdGLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1lBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUV0QixJQUFNLFlBQVksR0FDaEIseUJBQU0sQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUM7WUFDOUIsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxzQkFBYyxDQUFDLHNCQUFzQixDQUFDO1lBQ3hFLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFFYixJQUFNLFVBQVUsR0FDZCx5QkFBTSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQztZQUM1QixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLG9CQUFZLENBQUMsWUFBWSxDQUFDO1lBQzFELENBQUMsQ0FBQyxJQUFJLENBQUM7UUFFWCxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQWZVLGtCQUFrQjtRQUQ5QixXQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQztPQUNwQixrQkFBa0IsQ0FnQjlCO0lBQUQseUJBQUM7Q0FoQkQsQUFnQkMsSUFBQTtBQWhCWSxnREFBa0IiLCJmaWxlIjoiYXBwL3NoYXJlZC9tb2R1bGVzL3d6LXBsYXllci9waXBlcy9wbGF5ZXItdGltZWNvZGUucGlwZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgUGxheWVyU3RhdGUgfSBmcm9tICcuLi9pbnRlcmZhY2VzL3BsYXllci5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgRnJhbWUsIFRpbWVjb2RlRm9ybWF0LCBUaW1lY29kZUJhc2UgfSBmcm9tICcuLi8uLi93YXplZS1mcmFtZS1mb3JtYXR0ZXIvaW5kZXgnO1xuaW1wb3J0IHsgQ29tbW9uIH0gZnJvbSAnLi4vLi4vLi4vdXRpbGl0aWVzL2NvbW1vbi5mdW5jdGlvbnMnO1xuXG5AUGlwZSh7IG5hbWU6ICdwbGF5ZXJUaW1lY29kZScgfSlcbmV4cG9ydCBjbGFzcyBQbGF5ZXJUaW1lY29kZVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgcHVibGljIHRyYW5zZm9ybShmcmFtZTogRnJhbWUsIHN0YXRlOiBQbGF5ZXJTdGF0ZSwgZm9ybWF0PzogVGltZWNvZGVGb3JtYXQsIGJhc2U/OiBUaW1lY29kZUJhc2UpOiBzdHJpbmcge1xuICAgIGlmICghZnJhbWUpIHJldHVybiAnJztcblxuICAgIGNvbnN0IGNob3NlbkZvcm1hdDogVGltZWNvZGVGb3JtYXQgPVxuICAgICAgQ29tbW9uLmlzTnVsbE9yVW5kZWZpbmVkKGZvcm1hdClcbiAgICAgICAgPyAoc3RhdGUgPyBzdGF0ZS50aW1lY29kZUZvcm1hdCA6IFRpbWVjb2RlRm9ybWF0LlNJTVBMRV9USU1FX0NPTlZFUlNJT04pXG4gICAgICAgIDogZm9ybWF0O1xuXG4gICAgY29uc3QgY2hvc2VuQmFzZTogVGltZWNvZGVCYXNlID1cbiAgICAgIENvbW1vbi5pc051bGxPclVuZGVmaW5lZChiYXNlKVxuICAgICAgICA/IChzdGF0ZSA/IHN0YXRlLnRpbWVjb2RlQmFzZSA6IFRpbWVjb2RlQmFzZS5TVFJFQU1fQkFTRUQpXG4gICAgICAgIDogYmFzZTtcblxuICAgIHJldHVybiBmcmFtZS5hc1N0cmluZyhjaG9zZW5Gb3JtYXQsIGNob3NlbkJhc2UpO1xuICB9XG59XG4iXX0=
