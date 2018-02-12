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
var AssetDataComponent = (function () {
    function AssetDataComponent() {
    }
    AssetDataComponent.prototype.ngOnChanges = function (changes) {
        if (changes.asset) {
            if (Object.keys(changes.asset.currentValue.detailTypeMap.common).length > 0) {
                this.asset = changes.asset.currentValue.detailTypeMap;
                this.secondaryMdata = this.asset.secondary[0];
                this.secondaryKeys = Object.keys(this.secondaryMdata);
            }
        }
    };
    AssetDataComponent.prototype.getMetaField = function (field) {
        var meta = this.asset.clipData.filter(function (item) { return item.name === field; })[0];
        if (meta)
            return meta.value;
    };
    AssetDataComponent.prototype.translationReady = function (field) {
        return 'assetmetadata.' + field.replace(/\./g, '_');
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], AssetDataComponent.prototype, "asset", void 0);
    AssetDataComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'asset-data',
            templateUrl: 'asset-data.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        })
    ], AssetDataComponent);
    return AssetDataComponent;
}());
exports.AssetDataComponent = AssetDataComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rYXNzZXQvY29tcG9uZW50cy9hc3NldC1kYXRhLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUFxRjtBQVNyRjtJQUFBO0lBeUJBLENBQUM7SUFwQkMsd0NBQVcsR0FBWCxVQUFZLE9BQVk7UUFDdEIsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDbEIsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzVFLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDO2dCQUd0RCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM5QyxJQUFJLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ3hELENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQztJQUVNLHlDQUFZLEdBQW5CLFVBQW9CLEtBQVU7UUFDNUIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFVBQUMsSUFBUyxJQUFLLE9BQUEsSUFBSSxDQUFDLElBQUksS0FBSyxLQUFLLEVBQW5CLENBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3RSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUM5QixDQUFDO0lBRU0sNkNBQWdCLEdBQXZCLFVBQXdCLEtBQVU7UUFDaEMsTUFBTSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFyQlE7UUFBUixZQUFLLEVBQUU7O3FEQUFtQjtJQUhoQixrQkFBa0I7UUFQOUIsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsWUFBWTtZQUN0QixXQUFXLEVBQUUsaUJBQWlCO1lBQzlCLGVBQWUsRUFBRSw4QkFBdUIsQ0FBQyxNQUFNO1NBQ2hELENBQUM7T0FFVyxrQkFBa0IsQ0F5QjlCO0lBQUQseUJBQUM7Q0F6QkQsQUF5QkMsSUFBQTtBQXpCWSxnREFBa0IiLCJmaWxlIjoiYXBwLythc3NldC9jb21wb25lbnRzL2Fzc2V0LWRhdGEuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25DaGFuZ2VzLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICdhc3NldC1kYXRhJyxcbiAgdGVtcGxhdGVVcmw6ICdhc3NldC1kYXRhLmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcblxuZXhwb3J0IGNsYXNzIEFzc2V0RGF0YUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIHB1YmxpYyBzZWNvbmRhcnlLZXlzOiBBcnJheTxzdHJpbmc+O1xuICBwdWJsaWMgc2Vjb25kYXJ5TWRhdGE6IE9iamVjdDtcbiAgQElucHV0KCkgcHVibGljIGFzc2V0OiBhbnk7XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogYW55KTogdm9pZCB7XG4gICAgaWYgKGNoYW5nZXMuYXNzZXQpIHtcbiAgICAgIGlmIChPYmplY3Qua2V5cyhjaGFuZ2VzLmFzc2V0LmN1cnJlbnRWYWx1ZS5kZXRhaWxUeXBlTWFwLmNvbW1vbikubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLmFzc2V0ID0gY2hhbmdlcy5hc3NldC5jdXJyZW50VmFsdWUuZGV0YWlsVHlwZU1hcDtcbiAgICAgICAgLy8gdGhpcy5hc3NldERldGFpbC5jbGlwVXJsID0gY2hhbmdlcy5hc3NldERldGFpbC5jdXJyZW50VmFsdWUuY2xpcFVybDtcbiAgICAgICAgLy8gdGhpcy5hc3NldERldGFpbC5jbGlwVGh1bWJuYWlsVXJsID0gY2hhbmdlcy5hc3NldERldGFpbC5jdXJyZW50VmFsdWUuY2xpcFRodW1ibmFpbFVybDtcbiAgICAgICAgdGhpcy5zZWNvbmRhcnlNZGF0YSA9IHRoaXMuYXNzZXQuc2Vjb25kYXJ5WzBdO1xuICAgICAgICB0aGlzLnNlY29uZGFyeUtleXMgPSBPYmplY3Qua2V5cyh0aGlzLnNlY29uZGFyeU1kYXRhKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2V0TWV0YUZpZWxkKGZpZWxkOiBhbnkpIHtcbiAgICBsZXQgbWV0YSA9IHRoaXMuYXNzZXQuY2xpcERhdGEuZmlsdGVyKChpdGVtOiBhbnkpID0+IGl0ZW0ubmFtZSA9PT0gZmllbGQpWzBdO1xuICAgIGlmIChtZXRhKSByZXR1cm4gbWV0YS52YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyB0cmFuc2xhdGlvblJlYWR5KGZpZWxkOiBhbnkpIHtcbiAgICByZXR1cm4gJ2Fzc2V0bWV0YWRhdGEuJyArIGZpZWxkLnJlcGxhY2UoL1xcLi9nLCAnXycpO1xuICB9XG59XG5cbiJdfQ==
