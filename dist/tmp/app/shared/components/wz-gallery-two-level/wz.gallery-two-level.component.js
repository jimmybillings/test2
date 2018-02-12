"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var WzGalleryTwoLevelComponent = (function () {
    function WzGalleryTwoLevelComponent() {
        this.navigate = new core_1.EventEmitter();
        this.activeItemHovered = false;
    }
    WzGalleryTwoLevelComponent.prototype.onClick = function (result, child) {
        this.navigate.emit({
            pathSegment: { ids: [result.id, child.id], names: [result.name, child.name] },
            method: child.hasMore ? 'nextLevel' : 'search'
        });
    };
    WzGalleryTwoLevelComponent.prototype.onMouseOver = function (child, index) {
        this.activeItemHovered = child.resultCount > 0 ? true : false;
        this.activeRow = index;
    };
    WzGalleryTwoLevelComponent.prototype.onMouseOut = function (child) {
        this.activeItemHovered = false;
    };
    WzGalleryTwoLevelComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'two-level-view',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    templateUrl: 'wz.gallery-two-level.html'
                },] },
    ];
    WzGalleryTwoLevelComponent.ctorParameters = function () { return []; };
    WzGalleryTwoLevelComponent.propDecorators = {
        'data': [{ type: core_1.Input },],
        'navigate': [{ type: core_1.Output },],
    };
    return WzGalleryTwoLevelComponent;
}());
exports.WzGalleryTwoLevelComponent = WzGalleryTwoLevelComponent;
//# sourceMappingURL=wz.gallery-two-level.component.js.map