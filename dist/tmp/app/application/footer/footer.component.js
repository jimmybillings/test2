"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var FooterComponent = (function () {
    function FooterComponent() {
    }
    Object.defineProperty(FooterComponent.prototype, "privacyPolicyExists", {
        get: function () {
            return this.config &&
                this.config.hasOwnProperty('privacyPolicyId') &&
                this.config.privacyPolicyId.hasOwnProperty('value') &&
                this.config.privacyPolicyId.value !== '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FooterComponent.prototype, "showContacts", {
        get: function () {
            return this.config &&
                this.config.hasOwnProperty('contacts') &&
                this.config.contacts.hasOwnProperty('items') &&
                this.config.contacts.items.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FooterComponent.prototype, "contacts", {
        get: function () {
            return this.config.contacts.items;
        },
        enumerable: true,
        configurable: true
    });
    FooterComponent.prototype.show = function (value) {
        return value !== undefined;
    };
    FooterComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'app-footer',
                    templateUrl: 'footer.html',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    FooterComponent.ctorParameters = function () { return []; };
    FooterComponent.propDecorators = {
        'config': [{ type: core_1.Input },],
    };
    return FooterComponent;
}());
exports.FooterComponent = FooterComponent;
//# sourceMappingURL=footer.component.js.map