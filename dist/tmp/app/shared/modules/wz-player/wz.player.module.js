"use strict";
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
    WzPlayerModule.decorators = [
        { type: core_1.NgModule, args: [{
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
                },] },
    ];
    WzPlayerModule.ctorParameters = function () { return []; };
    return WzPlayerModule;
}());
exports.WzPlayerModule = WzPlayerModule;
//# sourceMappingURL=wz.player.module.js.map