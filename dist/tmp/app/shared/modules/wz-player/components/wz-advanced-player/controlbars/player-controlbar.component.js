"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var PlayerControlbarComponent = (function () {
    function PlayerControlbarComponent() {
        this.request = new core_1.EventEmitter();
    }
    PlayerControlbarComponent.prototype.forward = function (request) {
        this.request.emit(request);
    };
    PlayerControlbarComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'wz-player-controlbar',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    templateUrl: './player-controlbar.html'
                },] },
    ];
    PlayerControlbarComponent.ctorParameters = function () { return []; };
    PlayerControlbarComponent.propDecorators = {
        'playerState': [{ type: core_1.Input },],
        'request': [{ type: core_1.Output },],
    };
    return PlayerControlbarComponent;
}());
exports.PlayerControlbarComponent = PlayerControlbarComponent;
//# sourceMappingURL=player-controlbar.component.js.map