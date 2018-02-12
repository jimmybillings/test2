"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ValuesPipe = (function () {
    function ValuesPipe() {
    }
    ValuesPipe.prototype.transform = function (value, args) {
        if (args === void 0) { args = null; }
        return Object.keys(value).map(function (key) {
            var pair = {};
            var k = 'key';
            var v = 'value';
            pair[k] = key;
            pair[v] = value[key];
            return pair;
        });
    };
    ValuesPipe = __decorate([
        core_1.Pipe({
            name: 'values'
        })
    ], ValuesPipe);
    return ValuesPipe;
}());
exports.ValuesPipe = ValuesPipe;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvcGlwZXMvdmFsdWVzLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxzQ0FBb0Q7QUFNcEQ7SUFBQTtJQWNBLENBQUM7SUFiQyw4QkFBUyxHQUFULFVBQVUsS0FBVSxFQUFFLElBQWtCO1FBQWxCLHFCQUFBLEVBQUEsV0FBa0I7UUFDdEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQVUsR0FBRztZQUN6QyxJQUFJLElBQUksR0FBUSxFQUFFLENBQUM7WUFDbkIsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDO1lBQ2QsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDO1lBR2hCLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7WUFDZCxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRXJCLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDZCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFiVSxVQUFVO1FBSnRCLFdBQUksQ0FBQztZQUNKLElBQUksRUFBRSxRQUFRO1NBQ2YsQ0FBQztPQUVXLFVBQVUsQ0FjdEI7SUFBRCxpQkFBQztDQWRELEFBY0MsSUFBQTtBQWRZLGdDQUFVIiwiZmlsZSI6ImFwcC9zaGFyZWQvcGlwZXMvdmFsdWVzLnBpcGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ3ZhbHVlcydcbn0pXG5cbmV4cG9ydCBjbGFzcyBWYWx1ZXNQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIHRyYW5zZm9ybSh2YWx1ZTogYW55LCBhcmdzOiBhbnlbXSA9IG51bGwpOiBhbnkge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyh2YWx1ZSkubWFwKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIGxldCBwYWlyOiBhbnkgPSB7fTtcbiAgICAgIGxldCBrID0gJ2tleSc7XG4gICAgICBsZXQgdiA9ICd2YWx1ZSc7XG5cblxuICAgICAgcGFpcltrXSA9IGtleTtcbiAgICAgIHBhaXJbdl0gPSB2YWx1ZVtrZXldO1xuXG4gICAgICByZXR1cm4gcGFpcjtcbiAgICB9KTtcbiAgfVxufVxuIl19
