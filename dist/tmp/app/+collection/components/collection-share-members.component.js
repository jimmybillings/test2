"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var CollectionShareMembersComponent = (function () {
    function CollectionShareMembersComponent() {
        this.close = new core_1.EventEmitter();
    }
    CollectionShareMembersComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'collection-share-members-component',
                    templateUrl: 'collection-share-members.html',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    CollectionShareMembersComponent.ctorParameters = function () { return []; };
    CollectionShareMembersComponent.propDecorators = {
        'collection': [{ type: core_1.Input },],
        'close': [{ type: core_1.Output },],
    };
    return CollectionShareMembersComponent;
}());
exports.CollectionShareMembersComponent = CollectionShareMembersComponent;
//# sourceMappingURL=collection-share-members.component.js.map