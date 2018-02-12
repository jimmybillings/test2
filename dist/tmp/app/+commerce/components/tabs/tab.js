"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Tab = (function () {
    function Tab() {
        this.notify = new core_1.EventEmitter();
    }
    Tab.prototype.goToPreviousTab = function () {
        this.notify.emit({ type: 'GO_TO_PREVIOUS_TAB' });
    };
    Tab.prototype.goToNextTab = function () {
        this.notify.emit({ type: 'GO_TO_NEXT_TAB' });
    };
    Tab.prototype.goToTab = function (tabIndex) {
        this.notify.emit({ type: 'GO_TO_TAB', payload: tabIndex });
    };
    Tab.prototype.disableTab = function (tabIndex) {
        this.notify.emit({ type: 'DISABLE_TAB', payload: tabIndex });
    };
    Tab.propDecorators = {
        'notify': [{ type: core_1.Output },],
    };
    return Tab;
}());
exports.Tab = Tab;
//# sourceMappingURL=tab.js.map