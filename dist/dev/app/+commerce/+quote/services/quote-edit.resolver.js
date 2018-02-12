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
var app_store_1 = require("../../../app.store");
var QuoteEditResolver = (function () {
    function QuoteEditResolver(store) {
        this.store = store;
    }
    QuoteEditResolver.prototype.resolve = function () {
        this.store.dispatch(function (factory) { return factory.quoteEdit.load(); });
        return this.store.blockUntil(function (state) { return !state.quoteEdit.loading; });
    };
    QuoteEditResolver = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [app_store_1.AppStore])
    ], QuoteEditResolver);
    return QuoteEditResolver;
}());
exports.QuoteEditResolver = QuoteEditResolver;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvK3F1b3RlL3NlcnZpY2VzL3F1b3RlLWVkaXQucmVzb2x2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBMkM7QUFJM0MsZ0RBQThDO0FBRzlDO0lBQ0UsMkJBQW9CLEtBQWU7UUFBZixVQUFLLEdBQUwsS0FBSyxDQUFVO0lBQUksQ0FBQztJQUV4QyxtQ0FBTyxHQUFQO1FBQ0UsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxFQUF4QixDQUF3QixDQUFDLENBQUM7UUFFekQsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBeEIsQ0FBd0IsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFQVSxpQkFBaUI7UUFEN0IsaUJBQVUsRUFBRTt5Q0FFZ0Isb0JBQVE7T0FEeEIsaUJBQWlCLENBUTdCO0lBQUQsd0JBQUM7Q0FSRCxBQVFDLElBQUE7QUFSWSw4Q0FBaUIiLCJmaWxlIjoiYXBwLytjb21tZXJjZS8rcXVvdGUvc2VydmljZXMvcXVvdGUtZWRpdC5yZXNvbHZlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJlc29sdmUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5cbmltcG9ydCB7IEFwcFN0b3JlIH0gZnJvbSAnLi4vLi4vLi4vYXBwLnN0b3JlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFF1b3RlRWRpdFJlc29sdmVyIGltcGxlbWVudHMgUmVzb2x2ZTxib29sZWFuPiB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc3RvcmU6IEFwcFN0b3JlKSB7IH1cblxuICByZXNvbHZlKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goZmFjdG9yeSA9PiBmYWN0b3J5LnF1b3RlRWRpdC5sb2FkKCkpO1xuXG4gICAgcmV0dXJuIHRoaXMuc3RvcmUuYmxvY2tVbnRpbChzdGF0ZSA9PiAhc3RhdGUucXVvdGVFZGl0LmxvYWRpbmcpO1xuICB9XG59XG4iXX0=
