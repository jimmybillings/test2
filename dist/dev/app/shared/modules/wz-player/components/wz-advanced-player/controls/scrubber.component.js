"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ScrubberComponent.prototype, "window", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ScrubberComponent.prototype, "playerState", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ScrubberComponent.prototype, "request", void 0);
    ScrubberComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'wz-scrubber',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            template: "\n    <ng-container *ngIf=\"readyToDisplay\">\n      <mat-slider\n        class=\"scrubber\"\n        min=\"0\"\n        max=\"{{ largestFrameNumber }}\"\n        value=\"{{ currentFrameNumber }}\"\n        (input)=\"onSliderInput()\"\n        (mouseover)=\"onMouseOver()\"\n        (mouseout)=\"onMouseOut()\"\n        (mousedown)=\"onMouseDown()\">\n      </mat-slider>\n\n      <mat-slider\n        *ngIf=\"inMarkerIsSet\"\n        [disabled]=\"true\"\n        class=\"marker in\"\n        min=\"0\"\n        max=\"{{ largestFrameNumber }}\"\n        value=\"{{ inMarkerFrameNumber }}\"\n        (click)=\"onInMarkerClick()\"\n        (mouseover)=\"onMouseOver()\"\n        (mouseout)=\"onMouseOut()\">\n      </mat-slider>\n\n      <mat-slider\n        *ngIf=\"outMarkerIsSet\"\n        [disabled]=\"true\"\n        class=\"marker out\"\n        min=\"0\"\n        max=\"{{ largestFrameNumber }}\"\n        value=\"{{ outMarkerFrameNumber }}\"\n        (click)=\"onOutMarkerClick()\"\n        (mouseover)=\"onMouseOver()\"\n        (mouseout)=\"onMouseOut()\">\n      </mat-slider>\n\n      <span *ngIf=\"hoverFrameDisplayIsVisible\" class=\"hover-frame-display\" [style.left.px]=\"hoverFrameDisplayPosition\">\n        {{ hoverFrame | playerTimecode:playerState }}\n      </span>\n    </ng-container>\n  "
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer, core_1.ChangeDetectorRef])
    ], ScrubberComponent);
    return ScrubberComponent;
}());
exports.ScrubberComponent = ScrubberComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kdWxlcy93ei1wbGF5ZXIvY29tcG9uZW50cy93ei1hZHZhbmNlZC1wbGF5ZXIvY29udHJvbHMvc2NydWJiZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBRXVCO0FBRXZCLGlFQUFnRTtBQW1EaEU7SUFZRSwyQkFBb0IsVUFBc0IsRUFBVSxRQUFrQixFQUFVLGNBQWlDO1FBQTdGLGVBQVUsR0FBVixVQUFVLENBQVk7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQVUsbUJBQWMsR0FBZCxjQUFjLENBQW1CO1FBVHZHLFlBQU8sR0FBb0MsSUFBSSxtQkFBWSxFQUFxQixDQUFDO1FBRW5GLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFDM0IsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUMxQiwrQkFBMEIsR0FBVyxDQUFDLENBQUM7SUFLc0UsQ0FBQztJQUUvRyxvQ0FBUSxHQUFmO1FBQ0UsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFFdEMsSUFBSSxDQUFDLGdDQUFnQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNqSCxJQUFJLENBQUMsOEJBQThCLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzdHLENBQUM7SUFFTSx1Q0FBVyxHQUFsQjtRQUNFLElBQUksQ0FBQyxnQ0FBZ0MsRUFBRSxDQUFDO1FBQ3hDLElBQUksQ0FBQyw4QkFBOEIsRUFBRSxDQUFDO0lBQ3hDLENBQUM7SUFFRCxzQkFBVyw2Q0FBYzthQUF6QjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztRQUN0RCxDQUFDOzs7T0FBQTtJQUVELHNCQUFXLGlEQUFrQjthQUE3QjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDekYsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyxpREFBa0I7YUFBN0I7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUN4RixDQUFDOzs7T0FBQTtJQUVELHNCQUFXLDRDQUFhO2FBQXhCO1lBQ0UsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQztRQUNoRSxDQUFDOzs7T0FBQTtJQUVELHNCQUFXLGtEQUFtQjthQUE5QjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUNyRixDQUFDOzs7T0FBQTtJQUVELHNCQUFXLDZDQUFjO2FBQXpCO1lBQ0UsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQztRQUNqRSxDQUFDOzs7T0FBQTtJQUVELHNCQUFXLG1EQUFvQjthQUEvQjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUN2RixDQUFDOzs7T0FBQTtJQUVNLHlDQUFhLEdBQXBCO1FBQ0UsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBRU0sdUNBQVcsR0FBbEI7UUFDRSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztJQUN2QixDQUFDO0lBRU0sc0NBQVUsR0FBakI7UUFDRSxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztJQUN4QixDQUFDO0lBRU0sdUNBQVcsR0FBbEI7UUFDRSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztJQUN4QixDQUFDO0lBRU0sMkNBQWUsR0FBdEI7UUFDRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRU0sNENBQWdCLEdBQXZCO1FBQ0UsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUVELHNCQUFXLHlEQUEwQjthQUFyQztZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDekMsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyx3REFBeUI7YUFBcEM7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDO1FBQ3pDLENBQUM7OztPQUFBO0lBRUQsc0JBQVcseUNBQVU7YUFBckI7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUMxQixDQUFDOzs7T0FBQTtJQUVPLHVDQUFXLEdBQW5CLFVBQW9CLEtBQVU7UUFDNUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsMEJBQTBCLENBQUM7WUFBQyxNQUFNLENBQUM7UUFFN0MsSUFBSSxDQUFDLDJCQUEyQixDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFFTyxxQ0FBUyxHQUFqQjtRQUNFLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDckMsQ0FBQztJQUVELHNCQUFZLDRDQUFhO2FBQXpCO1lBQ0UsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQztRQUNoRSxDQUFDOzs7T0FBQTtJQUVELHNCQUFZLGdEQUFpQjthQUE3QjtZQUNFLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUM7UUFDL0QsQ0FBQzs7O09BQUE7SUFFTyx1REFBMkIsR0FBbkMsVUFBb0MsVUFBa0I7UUFDcEQsSUFBTSxjQUFjLEdBQVcsVUFBVSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztRQUNwRSxJQUFNLFFBQVEsR0FBVSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNFLElBQU0sUUFBUSxHQUFRLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDbkUsSUFBTSxZQUFZLEdBQVEsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO1FBRWxGLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxjQUFjLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDcEQsSUFBSSxDQUFDLG1DQUFtQyxDQUFDLGNBQWMsRUFBRSxRQUFRLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFDbkYsQ0FBQztJQUVELHNCQUFZLGlEQUFrQjthQUE5QjtZQUNFLElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQztZQUNwQixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQztZQUU1QyxPQUFPLE9BQU8sRUFBRSxDQUFDO2dCQUNmLFdBQVcsSUFBSSxPQUFPLENBQUMsVUFBVSxDQUFDO2dCQUNsQyxPQUFPLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQztZQUNqQyxDQUFDO1lBRUQsTUFBTSxDQUFDLFdBQVcsQ0FBQztRQUNyQixDQUFDOzs7T0FBQTtJQUVPLDZDQUFpQixHQUF6QixVQUEwQixlQUFvQixFQUFFLFNBQWlCO1FBQy9ELE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFVBQUMsS0FBVSxJQUFLLE9BQUEsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFuRCxDQUFtRCxDQUFDLENBQUM7SUFDbkcsQ0FBQztJQUVPLGdEQUFvQixHQUE1QixVQUE2QixjQUFzQixFQUFFLFFBQWE7UUFDaEUsSUFBTSxhQUFhLEdBQVEsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFLG9CQUFvQixDQUFDLENBQUM7UUFDdkcsSUFBTSxrQkFBa0IsR0FBVyxhQUFhLENBQUMsV0FBVyxDQUFDO1FBRTdELElBQUksY0FBYyxHQUFXLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLFdBQVcsR0FBRyxrQkFBa0IsQ0FBQyxDQUFDO1FBQzFILGNBQWMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFFakcsSUFBSSxDQUFDLFdBQVc7WUFDZCxJQUFJLGFBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLGlCQUFpQixDQUFDLENBQUMsa0JBQWtCLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDdkgsQ0FBQztJQUVPLCtEQUFtQyxHQUEzQyxVQUE0QyxjQUFzQixFQUFFLFFBQWEsRUFBRSxZQUFpQjtRQUNsRyxJQUFNLGFBQWEsR0FBUSxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3RFLElBQU0sS0FBSyxHQUNULFVBQVUsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7Y0FDakQsVUFBVSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO2NBQy9ELFVBQVUsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsb0JBQW9CLENBQUMsQ0FBQztjQUNoRSxVQUFVLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxDQUFDO2NBQzFELFVBQVUsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztRQUVoRSxJQUFNLHFCQUFxQixHQUFXLGNBQWMsR0FBRyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNuRSxJQUFNLGVBQWUsR0FBVyxDQUFDLENBQUM7UUFDbEMsSUFBTSxlQUFlLEdBQVcsUUFBUSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFFN0QsSUFBSSxDQUFDLDBCQUEwQixHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxFQUFFLGVBQWUsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO0lBQzlHLENBQUM7SUFFTyx1Q0FBVyxHQUFuQixVQUFvQixjQUFzQixFQUFFLGNBQXNCLEVBQUUsS0FBYTtRQUMvRSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBcEtRO1FBQVIsWUFBSyxFQUFFOztxREFBYTtJQUNaO1FBQVIsWUFBSyxFQUFFOzswREFBMEI7SUFDeEI7UUFBVCxhQUFNLEVBQUU7a0NBQVUsbUJBQVk7c0RBQTREO0lBSGhGLGlCQUFpQjtRQWhEN0IsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsYUFBYTtZQUN2QixlQUFlLEVBQUUsOEJBQXVCLENBQUMsTUFBTTtZQUMvQyxRQUFRLEVBQUUsK3hDQXlDVDtTQUNGLENBQUM7eUNBY2dDLGlCQUFVLEVBQW9CLGVBQVEsRUFBMEIsd0JBQWlCO09BWnRHLGlCQUFpQixDQXNLN0I7SUFBRCx3QkFBQztDQXRLRCxBQXNLQyxJQUFBO0FBdEtZLDhDQUFpQiIsImZpbGUiOiJhcHAvc2hhcmVkL21vZHVsZXMvd3otcGxheWVyL2NvbXBvbmVudHMvd3otYWR2YW5jZWQtcGxheWVyL2NvbnRyb2xzL3NjcnViYmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIE9uSW5pdCwgT25EZXN0cm95LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIEVsZW1lbnRSZWYsIFJlbmRlcmVyLCBDaGFuZ2VEZXRlY3RvclJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRnJhbWUgfSBmcm9tICcuLi8uLi8uLi8uLi93YXplZS1mcmFtZS1mb3JtYXR0ZXIvaW5kZXgnO1xuaW1wb3J0IHsgUGxheWVyU3RhdGUsIFBsYXllclNlZWtSZXF1ZXN0IH0gZnJvbSAnLi4vLi4vLi4vaW50ZXJmYWNlcy9wbGF5ZXIuaW50ZXJmYWNlJztcblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAnd3otc2NydWJiZXInLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctY29udGFpbmVyICpuZ0lmPVwicmVhZHlUb0Rpc3BsYXlcIj5cbiAgICAgIDxtYXQtc2xpZGVyXG4gICAgICAgIGNsYXNzPVwic2NydWJiZXJcIlxuICAgICAgICBtaW49XCIwXCJcbiAgICAgICAgbWF4PVwie3sgbGFyZ2VzdEZyYW1lTnVtYmVyIH19XCJcbiAgICAgICAgdmFsdWU9XCJ7eyBjdXJyZW50RnJhbWVOdW1iZXIgfX1cIlxuICAgICAgICAoaW5wdXQpPVwib25TbGlkZXJJbnB1dCgpXCJcbiAgICAgICAgKG1vdXNlb3Zlcik9XCJvbk1vdXNlT3ZlcigpXCJcbiAgICAgICAgKG1vdXNlb3V0KT1cIm9uTW91c2VPdXQoKVwiXG4gICAgICAgIChtb3VzZWRvd24pPVwib25Nb3VzZURvd24oKVwiPlxuICAgICAgPC9tYXQtc2xpZGVyPlxuXG4gICAgICA8bWF0LXNsaWRlclxuICAgICAgICAqbmdJZj1cImluTWFya2VySXNTZXRcIlxuICAgICAgICBbZGlzYWJsZWRdPVwidHJ1ZVwiXG4gICAgICAgIGNsYXNzPVwibWFya2VyIGluXCJcbiAgICAgICAgbWluPVwiMFwiXG4gICAgICAgIG1heD1cInt7IGxhcmdlc3RGcmFtZU51bWJlciB9fVwiXG4gICAgICAgIHZhbHVlPVwie3sgaW5NYXJrZXJGcmFtZU51bWJlciB9fVwiXG4gICAgICAgIChjbGljayk9XCJvbkluTWFya2VyQ2xpY2soKVwiXG4gICAgICAgIChtb3VzZW92ZXIpPVwib25Nb3VzZU92ZXIoKVwiXG4gICAgICAgIChtb3VzZW91dCk9XCJvbk1vdXNlT3V0KClcIj5cbiAgICAgIDwvbWF0LXNsaWRlcj5cblxuICAgICAgPG1hdC1zbGlkZXJcbiAgICAgICAgKm5nSWY9XCJvdXRNYXJrZXJJc1NldFwiXG4gICAgICAgIFtkaXNhYmxlZF09XCJ0cnVlXCJcbiAgICAgICAgY2xhc3M9XCJtYXJrZXIgb3V0XCJcbiAgICAgICAgbWluPVwiMFwiXG4gICAgICAgIG1heD1cInt7IGxhcmdlc3RGcmFtZU51bWJlciB9fVwiXG4gICAgICAgIHZhbHVlPVwie3sgb3V0TWFya2VyRnJhbWVOdW1iZXIgfX1cIlxuICAgICAgICAoY2xpY2spPVwib25PdXRNYXJrZXJDbGljaygpXCJcbiAgICAgICAgKG1vdXNlb3Zlcik9XCJvbk1vdXNlT3ZlcigpXCJcbiAgICAgICAgKG1vdXNlb3V0KT1cIm9uTW91c2VPdXQoKVwiPlxuICAgICAgPC9tYXQtc2xpZGVyPlxuXG4gICAgICA8c3BhbiAqbmdJZj1cImhvdmVyRnJhbWVEaXNwbGF5SXNWaXNpYmxlXCIgY2xhc3M9XCJob3Zlci1mcmFtZS1kaXNwbGF5XCIgW3N0eWxlLmxlZnQucHhdPVwiaG92ZXJGcmFtZURpc3BsYXlQb3NpdGlvblwiPlxuICAgICAgICB7eyBob3ZlckZyYW1lIHwgcGxheWVyVGltZWNvZGU6cGxheWVyU3RhdGUgfX1cbiAgICAgIDwvc3Bhbj5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgYFxufSlcblxuZXhwb3J0IGNsYXNzIFNjcnViYmVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSB3aW5kb3c6IGFueTtcbiAgQElucHV0KCkgcGxheWVyU3RhdGU6IFBsYXllclN0YXRlO1xuICBAT3V0cHV0KCkgcmVxdWVzdDogRXZlbnRFbWl0dGVyPFBsYXllclNlZWtSZXF1ZXN0PiA9IG5ldyBFdmVudEVtaXR0ZXI8UGxheWVyU2Vla1JlcXVlc3Q+KCk7XG5cbiAgcHJpdmF0ZSBzY3J1YmJpbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBob3ZlcmluZzogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIF9ob3ZlckZyYW1lRGlzcGxheVBvc2l0aW9uOiBudW1iZXIgPSAwO1xuICBwcml2YXRlIF9ob3ZlckZyYW1lOiBGcmFtZTtcbiAgcHJpdmF0ZSBkb2N1bWVudE1vdXNlTW92ZUxpc3RlbmVyUmVtb3ZlcjogRnVuY3Rpb247XG4gIHByaXZhdGUgZG9jdW1lbnRNb3VzZVVwTGlzdGVuZXJSZW1vdmVyOiBGdW5jdGlvbjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyLCBwcml2YXRlIGNoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZikgeyB9XG5cbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGNvbnN0IGRvY3VtZW50ID0gdGhpcy53aW5kb3cuZG9jdW1lbnQ7XG5cbiAgICB0aGlzLmRvY3VtZW50TW91c2VNb3ZlTGlzdGVuZXJSZW1vdmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oZG9jdW1lbnQsICdtb3VzZW1vdmUnLCB0aGlzLm9uTW91c2VNb3ZlLmJpbmQodGhpcykpO1xuICAgIHRoaXMuZG9jdW1lbnRNb3VzZVVwTGlzdGVuZXJSZW1vdmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oZG9jdW1lbnQsICdtb3VzZXVwJywgdGhpcy5vbk1vdXNlVXAuYmluZCh0aGlzKSk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5kb2N1bWVudE1vdXNlTW92ZUxpc3RlbmVyUmVtb3ZlcigpO1xuICAgIHRoaXMuZG9jdW1lbnRNb3VzZVVwTGlzdGVuZXJSZW1vdmVyKCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHJlYWR5VG9EaXNwbGF5KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmR1cmF0aW9uSXNTZXQgJiYgdGhpcy5jdXJyZW50RnJhbWVJc1NldDtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgbGFyZ2VzdEZyYW1lTnVtYmVyKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuZHVyYXRpb25Jc1NldCA/IHRoaXMucGxheWVyU3RhdGUuZHVyYXRpb25GcmFtZS5mcmFtZU51bWJlciAtIDEgOiB1bmRlZmluZWQ7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGN1cnJlbnRGcmFtZU51bWJlcigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRGcmFtZUlzU2V0ID8gdGhpcy5wbGF5ZXJTdGF0ZS5jdXJyZW50RnJhbWUuZnJhbWVOdW1iZXIgOiB1bmRlZmluZWQ7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGluTWFya2VySXNTZXQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhdGhpcy5wbGF5ZXJTdGF0ZSAmJiAhIXRoaXMucGxheWVyU3RhdGUuaW5NYXJrZXJGcmFtZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgaW5NYXJrZXJGcmFtZU51bWJlcigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmluTWFya2VySXNTZXQgPyB0aGlzLnBsYXllclN0YXRlLmluTWFya2VyRnJhbWUuZnJhbWVOdW1iZXIgOiB1bmRlZmluZWQ7XG4gIH1cblxuICBwdWJsaWMgZ2V0IG91dE1hcmtlcklzU2V0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIXRoaXMucGxheWVyU3RhdGUgJiYgISF0aGlzLnBsYXllclN0YXRlLm91dE1hcmtlckZyYW1lO1xuICB9XG5cbiAgcHVibGljIGdldCBvdXRNYXJrZXJGcmFtZU51bWJlcigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLm91dE1hcmtlcklzU2V0ID8gdGhpcy5wbGF5ZXJTdGF0ZS5vdXRNYXJrZXJGcmFtZS5mcmFtZU51bWJlciA6IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHB1YmxpYyBvblNsaWRlcklucHV0KCk6IHZvaWQge1xuICAgIHRoaXMucmVxdWVzdC5lbWl0KHsgdHlwZTogJ1NFRUtfVE9fRlJBTUUnLCBmcmFtZTogdGhpcy5faG92ZXJGcmFtZSB9KTtcbiAgfVxuXG4gIHB1YmxpYyBvbk1vdXNlT3ZlcigpOiB2b2lkIHtcbiAgICB0aGlzLmhvdmVyaW5nID0gdHJ1ZTtcbiAgfVxuXG4gIHB1YmxpYyBvbk1vdXNlT3V0KCk6IHZvaWQge1xuICAgIHRoaXMuaG92ZXJpbmcgPSBmYWxzZTtcbiAgfVxuXG4gIHB1YmxpYyBvbk1vdXNlRG93bigpOiB2b2lkIHtcbiAgICB0aGlzLnNjcnViYmluZyA9IHRydWU7XG4gIH1cblxuICBwdWJsaWMgb25Jbk1hcmtlckNsaWNrKCk6IHZvaWQge1xuICAgIHRoaXMucmVxdWVzdC5lbWl0KHsgdHlwZTogJ1NFRUtfVE9fTUFSS0VSJywgbWFya2VyVHlwZTogJ2luJyB9KTtcbiAgfVxuXG4gIHB1YmxpYyBvbk91dE1hcmtlckNsaWNrKCk6IHZvaWQge1xuICAgIHRoaXMucmVxdWVzdC5lbWl0KHsgdHlwZTogJ1NFRUtfVE9fTUFSS0VSJywgbWFya2VyVHlwZTogJ291dCcgfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGhvdmVyRnJhbWVEaXNwbGF5SXNWaXNpYmxlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmhvdmVyaW5nIHx8IHRoaXMuc2NydWJiaW5nO1xuICB9XG5cbiAgcHVibGljIGdldCBob3ZlckZyYW1lRGlzcGxheVBvc2l0aW9uKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2hvdmVyRnJhbWVEaXNwbGF5UG9zaXRpb247XG4gIH1cblxuICBwdWJsaWMgZ2V0IGhvdmVyRnJhbWUoKTogRnJhbWUge1xuICAgIHJldHVybiB0aGlzLl9ob3ZlckZyYW1lO1xuICB9XG5cbiAgcHJpdmF0ZSBvbk1vdXNlTW92ZShldmVudDogYW55KTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmhvdmVyRnJhbWVEaXNwbGF5SXNWaXNpYmxlKSByZXR1cm47XG5cbiAgICB0aGlzLnVwZGF0ZUhvdmVyRnJhbWVEaXNwbGF5V2l0aChldmVudC5wYWdlWCk7XG4gICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTsgIC8vIEJlY2F1c2UgdGhpcyBldmVudCBpcyB0cmFja2VkIG91dHNpZGUgdGhlIGNvbXBvbmVudC5cbiAgfVxuXG4gIHByaXZhdGUgb25Nb3VzZVVwKCk6IHZvaWQge1xuICAgIHRoaXMuc2NydWJiaW5nID0gZmFsc2U7XG4gICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTsgIC8vIEJlY2F1c2UgdGhpcyBldmVudCBpcyB0cmFja2VkIG91dHNpZGUgdGhlIGNvbXBvbmVudC5cbiAgfVxuXG4gIHByaXZhdGUgZ2V0IGR1cmF0aW9uSXNTZXQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhdGhpcy5wbGF5ZXJTdGF0ZSAmJiAhIXRoaXMucGxheWVyU3RhdGUuZHVyYXRpb25GcmFtZTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IGN1cnJlbnRGcmFtZUlzU2V0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIXRoaXMucGxheWVyU3RhdGUgJiYgISF0aGlzLnBsYXllclN0YXRlLmN1cnJlbnRGcmFtZTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlSG92ZXJGcmFtZURpc3BsYXlXaXRoKHBhZ2VNb3VzZVg6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IHJlbGF0aXZlTW91c2VYOiBudW1iZXIgPSBwYWdlTW91c2VYIC0gdGhpcy5zY3J1YmJlclBhZ2VPZmZzZXQ7XG4gICAgY29uc3QgY2hpbGRyZW46IGFueVtdID0gQXJyYXkuZnJvbSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jaGlsZHJlbik7XG4gICAgY29uc3Qgc2NydWJiZXI6IGFueSA9IHRoaXMuZmluZEJ5Q2xhc3NOYW1lSW4oY2hpbGRyZW4sICdzY3J1YmJlcicpO1xuICAgIGNvbnN0IGZyYW1lRGlzcGxheTogYW55ID0gdGhpcy5maW5kQnlDbGFzc05hbWVJbihjaGlsZHJlbiwgJ2hvdmVyLWZyYW1lLWRpc3BsYXknKTtcblxuICAgIHRoaXMudXBkYXRlSG92ZXJGcmFtZVdpdGgocmVsYXRpdmVNb3VzZVgsIHNjcnViYmVyKTtcbiAgICB0aGlzLnVwZGF0ZUhvdmVyRnJhbWVEaXNwbGF5UG9zaXRpb25XaXRoKHJlbGF0aXZlTW91c2VYLCBzY3J1YmJlciwgZnJhbWVEaXNwbGF5KTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IHNjcnViYmVyUGFnZU9mZnNldCgpOiBudW1iZXIge1xuICAgIGxldCB0b3RhbE9mZnNldCA9IDA7XG4gICAgbGV0IGVsZW1lbnQgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcblxuICAgIHdoaWxlIChlbGVtZW50KSB7XG4gICAgICB0b3RhbE9mZnNldCArPSBlbGVtZW50Lm9mZnNldExlZnQ7XG4gICAgICBlbGVtZW50ID0gZWxlbWVudC5vZmZzZXRQYXJlbnQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRvdGFsT2Zmc2V0O1xuICB9XG5cbiAgcHJpdmF0ZSBmaW5kQnlDbGFzc05hbWVJbihlbGVtZW50Q2hpbGRyZW46IGFueSwgY2xhc3NOYW1lOiBzdHJpbmcpOiBhbnkge1xuICAgIHJldHVybiBlbGVtZW50Q2hpbGRyZW4uZmluZCgoY2hpbGQ6IGFueSkgPT4gQXJyYXkuZnJvbShjaGlsZC5jbGFzc0xpc3QpLmluZGV4T2YoY2xhc3NOYW1lKSA+IC0xKTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlSG92ZXJGcmFtZVdpdGgocmVsYXRpdmVNb3VzZVg6IG51bWJlciwgc2NydWJiZXI6IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IHNjcnViYmVyVHJhY2s6IGFueSA9IHRoaXMuZmluZEJ5Q2xhc3NOYW1lSW4oQXJyYXkuZnJvbShzY3J1YmJlci5jaGlsZHJlbiksICdtYXQtc2xpZGVyLXdyYXBwZXInKTtcbiAgICBjb25zdCBzY3J1YmJlclRyYWNrV2lkdGg6IG51bWJlciA9IHNjcnViYmVyVHJhY2sub2Zmc2V0V2lkdGg7XG5cbiAgICBsZXQgbmV3RnJhbWVOdW1iZXI6IG51bWJlciA9IE1hdGgucm91bmQocmVsYXRpdmVNb3VzZVggKiB0aGlzLnBsYXllclN0YXRlLmR1cmF0aW9uRnJhbWUuZnJhbWVOdW1iZXIgLyBzY3J1YmJlclRyYWNrV2lkdGgpO1xuICAgIG5ld0ZyYW1lTnVtYmVyID0gdGhpcy5jb25zdHJhaW5UbygwLCB0aGlzLnBsYXllclN0YXRlLmR1cmF0aW9uRnJhbWUuZnJhbWVOdW1iZXIsIG5ld0ZyYW1lTnVtYmVyKTtcblxuICAgIHRoaXMuX2hvdmVyRnJhbWUgPVxuICAgICAgbmV3IEZyYW1lKHRoaXMucGxheWVyU3RhdGUuZnJhbWVzUGVyU2Vjb25kLCB0aGlzLnBsYXllclN0YXRlLnNvdXJjZUJhc2VkT2Zmc2V0KS5zZXRGcm9tRnJhbWVOdW1iZXIobmV3RnJhbWVOdW1iZXIpO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVIb3ZlckZyYW1lRGlzcGxheVBvc2l0aW9uV2l0aChyZWxhdGl2ZU1vdXNlWDogbnVtYmVyLCBzY3J1YmJlcjogYW55LCBmcmFtZURpc3BsYXk6IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IGNvbXB1dGVkU3R5bGU6IGFueSA9IHRoaXMud2luZG93LmdldENvbXB1dGVkU3R5bGUoZnJhbWVEaXNwbGF5KTtcbiAgICBjb25zdCB3aWR0aDogbnVtYmVyID1cbiAgICAgIHBhcnNlRmxvYXQoY29tcHV0ZWRTdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKCd3aWR0aCcpKVxuICAgICAgKyBwYXJzZUZsb2F0KGNvbXB1dGVkU3R5bGUuZ2V0UHJvcGVydHlWYWx1ZSgnYm9yZGVyLWxlZnQtd2lkdGgnKSlcbiAgICAgICsgcGFyc2VGbG9hdChjb21wdXRlZFN0eWxlLmdldFByb3BlcnR5VmFsdWUoJ2JvcmRlci1yaWdodC13aWR0aCcpKVxuICAgICAgKyBwYXJzZUZsb2F0KGNvbXB1dGVkU3R5bGUuZ2V0UHJvcGVydHlWYWx1ZSgncGFkZGluZy1sZWZ0JykpXG4gICAgICArIHBhcnNlRmxvYXQoY29tcHV0ZWRTdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKCdwYWRkaW5nLXJpZ2h0JykpO1xuXG4gICAgY29uc3QgdW5jb25zdHJhaW5lZFBvc2l0aW9uOiBudW1iZXIgPSByZWxhdGl2ZU1vdXNlWCAtICh3aWR0aCAvIDIpO1xuICAgIGNvbnN0IG1pbmltdW1Qb3NpdGlvbjogbnVtYmVyID0gMDtcbiAgICBjb25zdCBtYXhpbXVtUG9zaXRpb246IG51bWJlciA9IHNjcnViYmVyLm9mZnNldFdpZHRoIC0gd2lkdGg7XG5cbiAgICB0aGlzLl9ob3ZlckZyYW1lRGlzcGxheVBvc2l0aW9uID0gdGhpcy5jb25zdHJhaW5UbyhtaW5pbXVtUG9zaXRpb24sIG1heGltdW1Qb3NpdGlvbiwgdW5jb25zdHJhaW5lZFBvc2l0aW9uKTtcbiAgfVxuXG4gIHByaXZhdGUgY29uc3RyYWluVG8obWluaW11bUFsbG93ZWQ6IG51bWJlciwgbWF4aW11bUFsbG93ZWQ6IG51bWJlciwgdmFsdWU6IG51bWJlcikge1xuICAgIHJldHVybiBNYXRoLm1heChtaW5pbXVtQWxsb3dlZCwgTWF0aC5taW4obWF4aW11bUFsbG93ZWQsIHZhbHVlKSk7XG4gIH1cbn1cbiJdfQ==
