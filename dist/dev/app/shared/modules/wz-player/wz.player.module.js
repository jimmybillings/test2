"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var wz_design_module_1 = require("../wz-design/wz.design.module");
var core_2 = require("@ngx-translate/core");
var timecode_pipe_1 = require("./pipes/timecode.pipe");
var player_timecode_pipe_1 = require("./pipes/player-timecode.pipe");
var wz_player_component_1 = require("./components/wz-player/wz.player.component");
var wz_advanced_player_component_1 = require("./components/wz-advanced-player/wz.advanced-player.component");
var player_controlbar_component_1 = require("./components/wz-advanced-player/controlbars/player-controlbar.component");
var subclip_controlbar_component_1 = require("./components/wz-advanced-player/controlbars/subclip-controlbar.component");
var fast_playback_button_component_1 = require("./components/wz-advanced-player/controls/fast-playback-button.component");
var markers_clear_button_component_1 = require("./components/wz-advanced-player/controls/markers-clear-button.component");
var markers_playback_button_component_1 = require("./components/wz-advanced-player/controls/markers-playback-button.component");
var marker_seek_button_component_1 = require("./components/wz-advanced-player/controls/marker-seek-button.component");
var marker_set_button_component_1 = require("./components/wz-advanced-player/controls/marker-set-button.component");
var marker_time_display_component_1 = require("./components/wz-advanced-player/controls/marker-time-display.component");
var playback_toggle_button_component_1 = require("./components/wz-advanced-player/controls/playback-toggle-button.component");
var scrubber_component_1 = require("./components/wz-advanced-player/controls/scrubber.component");
var step_button_component_1 = require("./components/wz-advanced-player/controls/step-button.component");
var time_display_component_1 = require("./components/wz-advanced-player/controls/time-display.component");
var volume_control_component_1 = require("./components/wz-advanced-player/controls/volume-control.component");
var timecode_format_button_component_1 = require("./components/wz-advanced-player/controls/timecode-format-button.component");
var WzPlayerModule = (function () {
    function WzPlayerModule() {
    }
    WzPlayerModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                wz_design_module_1.MaterialModule,
                core_2.TranslateModule
            ],
            declarations: [
                timecode_pipe_1.TimecodePipe,
                player_timecode_pipe_1.PlayerTimecodePipe,
                wz_player_component_1.WzPlayerComponent,
                wz_advanced_player_component_1.WzAdvancedPlayerComponent,
                player_controlbar_component_1.PlayerControlbarComponent,
                subclip_controlbar_component_1.SubclipControlbarComponent,
                fast_playback_button_component_1.FastPlaybackButtonComponent,
                markers_clear_button_component_1.MarkersClearButtonComponent,
                markers_playback_button_component_1.MarkersPlaybackButtonComponent,
                marker_seek_button_component_1.MarkerSeekButtonComponent,
                marker_set_button_component_1.MarkerSetButtonComponent,
                marker_time_display_component_1.MarkerTimeDisplayComponent,
                playback_toggle_button_component_1.PlaybackToggleButtonComponent,
                scrubber_component_1.ScrubberComponent,
                step_button_component_1.StepButtonComponent,
                time_display_component_1.TimeDisplayComponent,
                volume_control_component_1.VolumeControlComponent,
                timecode_format_button_component_1.TimecodeFormatButtonComponent
            ],
            exports: [
                timecode_pipe_1.TimecodePipe,
                wz_advanced_player_component_1.WzAdvancedPlayerComponent,
                wz_player_component_1.WzPlayerComponent
            ]
        })
    ], WzPlayerModule);
    return WzPlayerModule;
}());
exports.WzPlayerModule = WzPlayerModule;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kdWxlcy93ei1wbGF5ZXIvd3oucGxheWVyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHNDQUF5QztBQUN6QywwQ0FBK0M7QUFDL0Msa0VBQStEO0FBQy9ELDRDQUFzRDtBQUV0RCx1REFBcUQ7QUFDckQscUVBQWtFO0FBQ2xFLGtGQUErRTtBQUMvRSw2R0FBeUc7QUFDekcsdUhBQW9IO0FBQ3BILHlIQUFzSDtBQUN0SCwwSEFBc0g7QUFDdEgsMEhBQXNIO0FBQ3RILGdJQUE0SDtBQUM1SCxzSEFBa0g7QUFDbEgsb0hBQWdIO0FBQ2hILHdIQUFvSDtBQUNwSCw4SEFBMEg7QUFDMUgsa0dBQWdHO0FBQ2hHLHdHQUFxRztBQUNyRywwR0FBdUc7QUFDdkcsOEdBQTJHO0FBQzNHLDhIQUEwSDtBQWtDMUg7SUFBQTtJQUE4QixDQUFDO0lBQWxCLGNBQWM7UUFoQzFCLGVBQVEsQ0FBQztZQUNSLE9BQU8sRUFBRTtnQkFDUCxxQkFBWTtnQkFDWixpQ0FBYztnQkFDZCxzQkFBZTthQUNoQjtZQUNELFlBQVksRUFBRTtnQkFDWiw0QkFBWTtnQkFDWix5Q0FBa0I7Z0JBQ2xCLHVDQUFpQjtnQkFDakIsd0RBQXlCO2dCQUN6Qix1REFBeUI7Z0JBQ3pCLHlEQUEwQjtnQkFDMUIsNERBQTJCO2dCQUMzQiw0REFBMkI7Z0JBQzNCLGtFQUE4QjtnQkFDOUIsd0RBQXlCO2dCQUN6QixzREFBd0I7Z0JBQ3hCLDBEQUEwQjtnQkFDMUIsZ0VBQTZCO2dCQUM3QixzQ0FBaUI7Z0JBQ2pCLDJDQUFtQjtnQkFDbkIsNkNBQW9CO2dCQUNwQixpREFBc0I7Z0JBQ3RCLGdFQUE2QjthQUM5QjtZQUNELE9BQU8sRUFBRTtnQkFDUCw0QkFBWTtnQkFDWix3REFBeUI7Z0JBQ3pCLHVDQUFpQjthQUNsQjtTQUNGLENBQUM7T0FDVyxjQUFjLENBQUk7SUFBRCxxQkFBQztDQUEvQixBQUErQixJQUFBO0FBQWxCLHdDQUFjIiwiZmlsZSI6ImFwcC9zaGFyZWQvbW9kdWxlcy93ei1wbGF5ZXIvd3oucGxheWVyLm1vZHVsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTWF0ZXJpYWxNb2R1bGUgfSBmcm9tICcuLi93ei1kZXNpZ24vd3ouZGVzaWduLm1vZHVsZSc7XG5pbXBvcnQgeyBUcmFuc2xhdGVNb2R1bGUgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcblxuaW1wb3J0IHsgVGltZWNvZGVQaXBlIH0gZnJvbSAnLi9waXBlcy90aW1lY29kZS5waXBlJztcbmltcG9ydCB7IFBsYXllclRpbWVjb2RlUGlwZSB9IGZyb20gJy4vcGlwZXMvcGxheWVyLXRpbWVjb2RlLnBpcGUnO1xuaW1wb3J0IHsgV3pQbGF5ZXJDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvd3otcGxheWVyL3d6LnBsYXllci5jb21wb25lbnQnO1xuaW1wb3J0IHsgV3pBZHZhbmNlZFBsYXllckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy93ei1hZHZhbmNlZC1wbGF5ZXIvd3ouYWR2YW5jZWQtcGxheWVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQbGF5ZXJDb250cm9sYmFyQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3d6LWFkdmFuY2VkLXBsYXllci9jb250cm9sYmFycy9wbGF5ZXItY29udHJvbGJhci5jb21wb25lbnQnO1xuaW1wb3J0IHsgU3ViY2xpcENvbnRyb2xiYXJDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvd3otYWR2YW5jZWQtcGxheWVyL2NvbnRyb2xiYXJzL3N1YmNsaXAtY29udHJvbGJhci5jb21wb25lbnQnO1xuaW1wb3J0IHsgRmFzdFBsYXliYWNrQnV0dG9uQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3d6LWFkdmFuY2VkLXBsYXllci9jb250cm9scy9mYXN0LXBsYXliYWNrLWJ1dHRvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWFya2Vyc0NsZWFyQnV0dG9uQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3d6LWFkdmFuY2VkLXBsYXllci9jb250cm9scy9tYXJrZXJzLWNsZWFyLWJ1dHRvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWFya2Vyc1BsYXliYWNrQnV0dG9uQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3d6LWFkdmFuY2VkLXBsYXllci9jb250cm9scy9tYXJrZXJzLXBsYXliYWNrLWJ1dHRvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWFya2VyU2Vla0J1dHRvbkNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy93ei1hZHZhbmNlZC1wbGF5ZXIvY29udHJvbHMvbWFya2VyLXNlZWstYnV0dG9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXJrZXJTZXRCdXR0b25Db21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvd3otYWR2YW5jZWQtcGxheWVyL2NvbnRyb2xzL21hcmtlci1zZXQtYnV0dG9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXJrZXJUaW1lRGlzcGxheUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy93ei1hZHZhbmNlZC1wbGF5ZXIvY29udHJvbHMvbWFya2VyLXRpbWUtZGlzcGxheS5jb21wb25lbnQnO1xuaW1wb3J0IHsgUGxheWJhY2tUb2dnbGVCdXR0b25Db21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvd3otYWR2YW5jZWQtcGxheWVyL2NvbnRyb2xzL3BsYXliYWNrLXRvZ2dsZS1idXR0b24uY29tcG9uZW50JztcbmltcG9ydCB7IFNjcnViYmVyQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3d6LWFkdmFuY2VkLXBsYXllci9jb250cm9scy9zY3J1YmJlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgU3RlcEJ1dHRvbkNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy93ei1hZHZhbmNlZC1wbGF5ZXIvY29udHJvbHMvc3RlcC1idXR0b24uY29tcG9uZW50JztcbmltcG9ydCB7IFRpbWVEaXNwbGF5Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3d6LWFkdmFuY2VkLXBsYXllci9jb250cm9scy90aW1lLWRpc3BsYXkuY29tcG9uZW50JztcbmltcG9ydCB7IFZvbHVtZUNvbnRyb2xDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvd3otYWR2YW5jZWQtcGxheWVyL2NvbnRyb2xzL3ZvbHVtZS1jb250cm9sLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUaW1lY29kZUZvcm1hdEJ1dHRvbkNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy93ei1hZHZhbmNlZC1wbGF5ZXIvY29udHJvbHMvdGltZWNvZGUtZm9ybWF0LWJ1dHRvbi5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdGVyaWFsTW9kdWxlLFxuICAgIFRyYW5zbGF0ZU1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBUaW1lY29kZVBpcGUsXG4gICAgUGxheWVyVGltZWNvZGVQaXBlLFxuICAgIFd6UGxheWVyQ29tcG9uZW50LFxuICAgIFd6QWR2YW5jZWRQbGF5ZXJDb21wb25lbnQsXG4gICAgUGxheWVyQ29udHJvbGJhckNvbXBvbmVudCxcbiAgICBTdWJjbGlwQ29udHJvbGJhckNvbXBvbmVudCxcbiAgICBGYXN0UGxheWJhY2tCdXR0b25Db21wb25lbnQsXG4gICAgTWFya2Vyc0NsZWFyQnV0dG9uQ29tcG9uZW50LFxuICAgIE1hcmtlcnNQbGF5YmFja0J1dHRvbkNvbXBvbmVudCxcbiAgICBNYXJrZXJTZWVrQnV0dG9uQ29tcG9uZW50LFxuICAgIE1hcmtlclNldEJ1dHRvbkNvbXBvbmVudCxcbiAgICBNYXJrZXJUaW1lRGlzcGxheUNvbXBvbmVudCxcbiAgICBQbGF5YmFja1RvZ2dsZUJ1dHRvbkNvbXBvbmVudCxcbiAgICBTY3J1YmJlckNvbXBvbmVudCxcbiAgICBTdGVwQnV0dG9uQ29tcG9uZW50LFxuICAgIFRpbWVEaXNwbGF5Q29tcG9uZW50LFxuICAgIFZvbHVtZUNvbnRyb2xDb21wb25lbnQsXG4gICAgVGltZWNvZGVGb3JtYXRCdXR0b25Db21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIFRpbWVjb2RlUGlwZSxcbiAgICBXekFkdmFuY2VkUGxheWVyQ29tcG9uZW50LFxuICAgIFd6UGxheWVyQ29tcG9uZW50XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgV3pQbGF5ZXJNb2R1bGUgeyB9XG4iXX0=
