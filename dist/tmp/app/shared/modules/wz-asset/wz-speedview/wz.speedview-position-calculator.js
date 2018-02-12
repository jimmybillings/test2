"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpeedViewPositionCalculator = {
    calculate: function (viewPort) {
        this._currentViewPort = viewPort;
        var x = this._determineHorizontalPreviewPlacement;
        var y = this._determineVerticalPreviewPlacement;
        return { x: x, y: y };
    },
    _currentViewPort: null,
    _previewWidth: 420,
    _previewHeight: 300,
    _horizontalPadding: 10,
    _verticalPadding: 20,
    _delay: 200,
    get _determineHorizontalPreviewPlacement() {
        if (this._roomToTheRight) {
            return this._currentViewPort.right + this._horizontalPadding;
        }
        else {
            return this._currentViewPort.left - this._previewWidth - this._horizontalPadding;
        }
    },
    get _determineVerticalPreviewPlacement() {
        if (this._roomBelow && this._roomAbove) {
            return this._currentViewPort.top - (this._previewHeight / 3);
        }
        else if (!this._roomBelow) {
            return window.innerHeight - this._previewHeight - this._verticalPadding;
        }
        else {
            return 0 + this._verticalPadding;
        }
    },
    get _roomToTheRight() {
        return window.innerWidth - this._currentViewPort.right - this._previewWidth >= this._horizontalPadding;
    },
    get _roomAbove() {
        return 0 + this._currentViewPort.top - (this._previewHeight / 3) >= this._verticalPadding;
    },
    get _roomBelow() {
        return window.innerHeight - (this._currentViewPort.top - (this._previewHeight / 3) + this._previewHeight) >= this._verticalPadding;
    }
};
//# sourceMappingURL=wz.speedview-position-calculator.js.map