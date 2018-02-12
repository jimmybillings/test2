"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var index_1 = require("../../../../wazee-frame-formatter/index");
var ScrubberComponent = (function () {
    function ScrubberComponent(elementRef, renderer, changeDetector) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.changeDetector = changeDetector;
        this.request = new core_1.EventEmitter();
        this.scrubbing = false;
        this.hovering = false;
        this._hoverFrameDisplayPosition = 0;
    }
    ScrubberComponent.prototype.ngOnInit = function () {
        var document = this.window.document;
        this.documentMouseMoveListenerRemover = this.renderer.listen(document, 'mousemove', this.onMouseMove.bind(this));
        this.documentMouseUpListenerRemover = this.renderer.listen(document, 'mouseup', this.onMouseUp.bind(this));
    };
    ScrubberComponent.prototype.ngOnDestroy = function () {
        this.documentMouseMoveListenerRemover();
        this.documentMouseUpListenerRemover();
    };
    Object.defineProperty(ScrubberComponent.prototype, "readyToDisplay", {
        get: function () {
            return this.durationIsSet && this.currentFrameIsSet;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScrubberComponent.prototype, "largestFrameNumber", {
        get: function () {
            return this.durationIsSet ? this.playerState.durationFrame.frameNumber - 1 : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScrubberComponent.prototype, "currentFrameNumber", {
        get: function () {
            return this.currentFrameIsSet ? this.playerState.currentFrame.frameNumber : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScrubberComponent.prototype, "inMarkerIsSet", {
        get: function () {
            return !!this.playerState && !!this.playerState.inMarkerFrame;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScrubberComponent.prototype, "inMarkerFrameNumber", {
        get: function () {
            return this.inMarkerIsSet ? this.playerState.inMarkerFrame.frameNumber : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScrubberComponent.prototype, "outMarkerIsSet", {
        get: function () {
            return !!this.playerState && !!this.playerState.outMarkerFrame;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScrubberComponent.prototype, "outMarkerFrameNumber", {
        get: function () {
            return this.outMarkerIsSet ? this.playerState.outMarkerFrame.frameNumber : undefined;
        },
        enumerable: true,
        configurable: true
    });
    ScrubberComponent.prototype.onSliderInput = function () {
        this.request.emit({ type: 'SEEK_TO_FRAME', frame: this._hoverFrame });
    };
    ScrubberComponent.prototype.onMouseOver = function () {
        this.hovering = true;
    };
    ScrubberComponent.prototype.onMouseOut = function () {
        this.hovering = false;
    };
    ScrubberComponent.prototype.onMouseDown = function () {
        this.scrubbing = true;
    };
    ScrubberComponent.prototype.onInMarkerClick = function () {
        this.request.emit({ type: 'SEEK_TO_MARKER', markerType: 'in' });
    };
    ScrubberComponent.prototype.onOutMarkerClick = function () {
        this.request.emit({ type: 'SEEK_TO_MARKER', markerType: 'out' });
    };
    Object.defineProperty(ScrubberComponent.prototype, "hoverFrameDisplayIsVisible", {
        get: function () {
            return this.hovering || this.scrubbing;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScrubberComponent.prototype, "hoverFrameDisplayPosition", {
        get: function () {
            return this._hoverFrameDisplayPosition;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScrubberComponent.prototype, "hoverFrame", {
        get: function () {
            return this._hoverFrame;
        },
        enumerable: true,
        configurable: true
    });
    ScrubberComponent.prototype.onMouseMove = function (event) {
        if (!this.hoverFrameDisplayIsVisible)
            return;
        this.updateHoverFrameDisplayWith(event.pageX);
        this.changeDetector.markForCheck();
    };
    ScrubberComponent.prototype.onMouseUp = function () {
        this.scrubbing = false;
        this.changeDetector.markForCheck();
    };
    Object.defineProperty(ScrubberComponent.prototype, "durationIsSet", {
        get: function () {
            return !!this.playerState && !!this.playerState.durationFrame;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScrubberComponent.prototype, "currentFrameIsSet", {
        get: function () {
            return !!this.playerState && !!this.playerState.currentFrame;
        },
        enumerable: true,
        configurable: true
    });
    ScrubberComponent.prototype.updateHoverFrameDisplayWith = function (pageMouseX) {
        var relativeMouseX = pageMouseX - this.scrubberPageOffset;
        var children = Array.from(this.elementRef.nativeElement.children);
        var scrubber = this.findByClassNameIn(children, 'scrubber');
        var frameDisplay = this.findByClassNameIn(children, 'hover-frame-display');
        this.updateHoverFrameWith(relativeMouseX, scrubber);
        this.updateHoverFrameDisplayPositionWith(relativeMouseX, scrubber, frameDisplay);
    };
    Object.defineProperty(ScrubberComponent.prototype, "scrubberPageOffset", {
        get: function () {
            var totalOffset = 0;
            var element = this.elementRef.nativeElement;
            while (element) {
                totalOffset += element.offsetLeft;
                element = element.offsetParent;
            }
            return totalOffset;
        },
        enumerable: true,
        configurable: true
    });
    ScrubberComponent.prototype.findByClassNameIn = function (elementChildren, className) {
        return elementChildren.find(function (child) { return Array.from(child.classList).indexOf(className) > -1; });
    };
    ScrubberComponent.prototype.updateHoverFrameWith = function (relativeMouseX, scrubber) {
        var scrubberTrack = this.findByClassNameIn(Array.from(scrubber.children), 'mat-slider-wrapper');
        var scrubberTrackWidth = scrubberTrack.offsetWidth;
        var newFrameNumber = Math.round(relativeMouseX * this.playerState.durationFrame.frameNumber / scrubberTrackWidth);
        newFrameNumber = this.constrainTo(0, this.playerState.durationFrame.frameNumber, newFrameNumber);
        this._hoverFrame =
            new index_1.Frame(this.playerState.framesPerSecond, this.playerState.sourceBasedOffset).setFromFrameNumber(newFrameNumber);
    };
    ScrubberComponent.prototype.updateHoverFrameDisplayPositionWith = function (relativeMouseX, scrubber, frameDisplay) {
        var computedStyle = this.window.getComputedStyle(frameDisplay);
        var width = parseFloat(computedStyle.getPropertyValue('width'))
            + parseFloat(computedStyle.getPropertyValue('border-left-width'))
            + parseFloat(computedStyle.getPropertyValue('border-right-width'))
            + parseFloat(computedStyle.getPropertyValue('padding-left'))
            + parseFloat(computedStyle.getPropertyValue('padding-right'));
        var unconstrainedPosition = relativeMouseX - (width / 2);
        var minimumPosition = 0;
        var maximumPosition = scrubber.offsetWidth - width;
        this._hoverFrameDisplayPosition = this.constrainTo(minimumPosition, maximumPosition, unconstrainedPosition);
    };
    ScrubberComponent.prototype.constrainTo = function (minimumAllowed, maximumAllowed, value) {
        return Math.max(minimumAllowed, Math.min(maximumAllowed, value));
    };
    ScrubberComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'wz-scrubber',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    template: "\n    <ng-container *ngIf=\"readyToDisplay\">\n      <mat-slider\n        class=\"scrubber\"\n        min=\"0\"\n        max=\"{{ largestFrameNumber }}\"\n        value=\"{{ currentFrameNumber }}\"\n        (input)=\"onSliderInput()\"\n        (mouseover)=\"onMouseOver()\"\n        (mouseout)=\"onMouseOut()\"\n        (mousedown)=\"onMouseDown()\">\n      </mat-slider>\n\n      <mat-slider\n        *ngIf=\"inMarkerIsSet\"\n        [disabled]=\"true\"\n        class=\"marker in\"\n        min=\"0\"\n        max=\"{{ largestFrameNumber }}\"\n        value=\"{{ inMarkerFrameNumber }}\"\n        (click)=\"onInMarkerClick()\"\n        (mouseover)=\"onMouseOver()\"\n        (mouseout)=\"onMouseOut()\">\n      </mat-slider>\n\n      <mat-slider\n        *ngIf=\"outMarkerIsSet\"\n        [disabled]=\"true\"\n        class=\"marker out\"\n        min=\"0\"\n        max=\"{{ largestFrameNumber }}\"\n        value=\"{{ outMarkerFrameNumber }}\"\n        (click)=\"onOutMarkerClick()\"\n        (mouseover)=\"onMouseOver()\"\n        (mouseout)=\"onMouseOut()\">\n      </mat-slider>\n\n      <span *ngIf=\"hoverFrameDisplayIsVisible\" class=\"hover-frame-display\" [style.left.px]=\"hoverFrameDisplayPosition\">\n        {{ hoverFrame | playerTimecode:playerState }}\n      </span>\n    </ng-container>\n  "
                },] },
    ];
    ScrubberComponent.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
        { type: core_1.Renderer, },
        { type: core_1.ChangeDetectorRef, },
    ]; };
    ScrubberComponent.propDecorators = {
        'window': [{ type: core_1.Input },],
        'playerState': [{ type: core_1.Input },],
        'request': [{ type: core_1.Output },],
    };
    return ScrubberComponent;
}());
exports.ScrubberComponent = ScrubberComponent;
//# sourceMappingURL=scrubber.component.js.map