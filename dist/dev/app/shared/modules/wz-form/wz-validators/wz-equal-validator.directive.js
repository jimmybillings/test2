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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var EqualValidatorDirective = (function () {
    function EqualValidatorDirective(validateEqual, reverse) {
        this.validateEqual = validateEqual;
        this.reverse = reverse;
    }
    EqualValidatorDirective_1 = EqualValidatorDirective;
    Object.defineProperty(EqualValidatorDirective.prototype, "isReverse", {
        get: function () {
            if (!this.reverse)
                return false;
            return this.reverse === 'true' ? true : false;
        },
        enumerable: true,
        configurable: true
    });
    EqualValidatorDirective.prototype.validate = function (c) {
        var v = c.value;
        var e = c.root.get(this.validateEqual);
        if (e && v !== e.value && !this.isReverse) {
            return {
                validateEqual: true
            };
        }
        if (e && v === e.value && this.isReverse) {
            if (e.errors !== null) {
                delete e.errors['validateEqual'];
                if (!Object.keys(e.errors).length)
                    e.setErrors(null);
            }
        }
        if (e && v !== e.value && this.isReverse) {
            e.setErrors({ validateEqual: true });
        }
        return null;
    };
    EqualValidatorDirective = EqualValidatorDirective_1 = __decorate([
        core_1.Directive({
            selector: '[validateEqual]',
            providers: [
                { provide: forms_1.NG_VALIDATORS, useExisting: core_1.forwardRef(function () { return EqualValidatorDirective_1; }), multi: true }
            ]
        }),
        __param(0, core_1.Attribute('validateEqual')),
        __param(1, core_1.Attribute('reverse')),
        __metadata("design:paramtypes", [String, String])
    ], EqualValidatorDirective);
    return EqualValidatorDirective;
    var EqualValidatorDirective_1;
}());
exports.EqualValidatorDirective = EqualValidatorDirective;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kdWxlcy93ei1mb3JtL3d6LXZhbGlkYXRvcnMvd3otZXF1YWwtdmFsaWRhdG9yLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUFpRTtBQUNqRSx3Q0FBMkU7QUFRM0U7SUFDRSxpQ0FBZ0QsYUFBcUIsRUFDdEMsT0FBZTtRQURFLGtCQUFhLEdBQWIsYUFBYSxDQUFRO1FBQ3RDLFlBQU8sR0FBUCxPQUFPLENBQVE7SUFDOUMsQ0FBQztnQ0FIVSx1QkFBdUI7SUFLbEMsc0JBQVksOENBQVM7YUFBckI7WUFDRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUNoQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ2hELENBQUM7OztPQUFBO0lBRUQsMENBQVEsR0FBUixVQUFTLENBQWtCO1FBRXpCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFHaEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBR3ZDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQzFDLE1BQU0sQ0FBQztnQkFDTCxhQUFhLEVBQUUsSUFBSTthQUNwQixDQUFDO1FBQ0osQ0FBQztRQUdELEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUN6QyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3RCLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztnQkFDakMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUM7b0JBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2RCxDQUFDO1FBQ0gsQ0FBQztRQUdELEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUN6QyxDQUFDLENBQUMsU0FBUyxDQUFDLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDdkMsQ0FBQztRQUVELE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBdENVLHVCQUF1QjtRQU5uQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGlCQUFpQjtZQUMzQixTQUFTLEVBQUU7Z0JBQ1QsRUFBRSxPQUFPLEVBQUUscUJBQWEsRUFBRSxXQUFXLEVBQUUsaUJBQVUsQ0FBQyxjQUFNLE9BQUEseUJBQXVCLEVBQXZCLENBQXVCLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFO2FBQ2hHO1NBQ0YsQ0FBQztRQUVjLFdBQUEsZ0JBQVMsQ0FBQyxlQUFlLENBQUMsQ0FBQTtRQUNyQyxXQUFBLGdCQUFTLENBQUMsU0FBUyxDQUFDLENBQUE7O09BRlosdUJBQXVCLENBdUNuQztJQUFELDhCQUFDOztDQXZDRCxBQXVDQyxJQUFBO0FBdkNZLDBEQUF1QiIsImZpbGUiOiJhcHAvc2hhcmVkL21vZHVsZXMvd3otZm9ybS93ei12YWxpZGF0b3JzL3d6LWVxdWFsLXZhbGlkYXRvci5kaXJlY3RpdmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIGZvcndhcmRSZWYsIEF0dHJpYnV0ZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVmFsaWRhdG9yLCBBYnN0cmFjdENvbnRyb2wsIE5HX1ZBTElEQVRPUlMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1t2YWxpZGF0ZUVxdWFsXScsXG4gIHByb3ZpZGVyczogW1xuICAgIHsgcHJvdmlkZTogTkdfVkFMSURBVE9SUywgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gRXF1YWxWYWxpZGF0b3JEaXJlY3RpdmUpLCBtdWx0aTogdHJ1ZSB9XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgRXF1YWxWYWxpZGF0b3JEaXJlY3RpdmUgaW1wbGVtZW50cyBWYWxpZGF0b3Ige1xuICBjb25zdHJ1Y3RvciggQEF0dHJpYnV0ZSgndmFsaWRhdGVFcXVhbCcpIHB1YmxpYyB2YWxpZGF0ZUVxdWFsOiBzdHJpbmcsXG4gICAgQEF0dHJpYnV0ZSgncmV2ZXJzZScpIHB1YmxpYyByZXZlcnNlOiBzdHJpbmcpIHtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IGlzUmV2ZXJzZSgpIHtcbiAgICBpZiAoIXRoaXMucmV2ZXJzZSkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiB0aGlzLnJldmVyc2UgPT09ICd0cnVlJyA/IHRydWUgOiBmYWxzZTtcbiAgfVxuXG4gIHZhbGlkYXRlKGM6IEFic3RyYWN0Q29udHJvbCk6IHsgW2tleTogc3RyaW5nXTogYW55IH0ge1xuICAgIC8vIHNlbGYgdmFsdWVcbiAgICBsZXQgdiA9IGMudmFsdWU7XG5cbiAgICAvLyBjb250cm9sIHZsYXVlXG4gICAgbGV0IGUgPSBjLnJvb3QuZ2V0KHRoaXMudmFsaWRhdGVFcXVhbCk7XG5cbiAgICAvLyB2YWx1ZSBub3QgZXF1YWxcbiAgICBpZiAoZSAmJiB2ICE9PSBlLnZhbHVlICYmICF0aGlzLmlzUmV2ZXJzZSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdmFsaWRhdGVFcXVhbDogdHJ1ZVxuICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyB2YWx1ZSBlcXVhbCBhbmQgcmV2ZXJzZVxuICAgIGlmIChlICYmIHYgPT09IGUudmFsdWUgJiYgdGhpcy5pc1JldmVyc2UpIHtcbiAgICAgIGlmIChlLmVycm9ycyAhPT0gbnVsbCkge1xuICAgICAgICBkZWxldGUgZS5lcnJvcnNbJ3ZhbGlkYXRlRXF1YWwnXTtcbiAgICAgICAgaWYgKCFPYmplY3Qua2V5cyhlLmVycm9ycykubGVuZ3RoKSBlLnNldEVycm9ycyhudWxsKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyB2YWx1ZSBub3QgZXF1YWwgYW5kIHJldmVyc2VcbiAgICBpZiAoZSAmJiB2ICE9PSBlLnZhbHVlICYmIHRoaXMuaXNSZXZlcnNlKSB7XG4gICAgICBlLnNldEVycm9ycyh7IHZhbGlkYXRlRXF1YWw6IHRydWUgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cbiJdfQ==
