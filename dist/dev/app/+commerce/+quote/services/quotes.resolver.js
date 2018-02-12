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
var quotes_service_1 = require("../../../shared/services/quotes.service");
var commerce_capabilities_1 = require("../../services/commerce.capabilities");
var common_functions_1 = require("../../../shared/utilities/common.functions");
var QuotesResolver = (function () {
    function QuotesResolver(quotesService, userCan) {
        this.quotesService = quotesService;
        this.userCan = userCan;
    }
    QuotesResolver.prototype.resolve = function (route) {
        this.quotesService.getQuotes(this.userCan.administerQuotes(), common_functions_1.Common.clone(route.params)).subscribe();
        return this.quotesService.data.map((function (data) { return data.items !== null; })).filter(function (data) { return data; }).take(1);
    };
    QuotesResolver = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [quotes_service_1.QuotesService, commerce_capabilities_1.CommerceCapabilities])
    ], QuotesResolver);
    return QuotesResolver;
}());
exports.QuotesResolver = QuotesResolver;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvK3F1b3RlL3NlcnZpY2VzL3F1b3Rlcy5yZXNvbHZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUEyQztBQUczQywwRUFBd0U7QUFDeEUsOEVBQTRFO0FBQzVFLCtFQUFvRTtBQUdwRTtJQUNFLHdCQUFvQixhQUE0QixFQUFVLE9BQTZCO1FBQW5FLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQVUsWUFBTyxHQUFQLE9BQU8sQ0FBc0I7SUFBSSxDQUFDO0lBRTVGLGdDQUFPLEdBQVAsVUFBUSxLQUE2QjtRQUNuQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLEVBQUUseUJBQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFdEcsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxDQUFDLEtBQUssS0FBSyxJQUFJLEVBQW5CLENBQW1CLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksRUFBSixDQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDakcsQ0FBQztJQVBVLGNBQWM7UUFEMUIsaUJBQVUsRUFBRTt5Q0FFd0IsOEJBQWEsRUFBbUIsNENBQW9CO09BRDVFLGNBQWMsQ0FRMUI7SUFBRCxxQkFBQztDQVJELEFBUUMsSUFBQTtBQVJZLHdDQUFjIiwiZmlsZSI6ImFwcC8rY29tbWVyY2UvK3F1b3RlL3NlcnZpY2VzL3F1b3Rlcy5yZXNvbHZlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJlc29sdmUsIEFjdGl2YXRlZFJvdXRlU25hcHNob3QgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBRdW90ZXNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL3F1b3Rlcy5zZXJ2aWNlJztcbmltcG9ydCB7IENvbW1lcmNlQ2FwYWJpbGl0aWVzIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvY29tbWVyY2UuY2FwYWJpbGl0aWVzJztcbmltcG9ydCB7IENvbW1vbiB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC91dGlsaXRpZXMvY29tbW9uLmZ1bmN0aW9ucyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBRdW90ZXNSZXNvbHZlciBpbXBsZW1lbnRzIFJlc29sdmU8Ym9vbGVhbj4ge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHF1b3Rlc1NlcnZpY2U6IFF1b3Rlc1NlcnZpY2UsIHByaXZhdGUgdXNlckNhbjogQ29tbWVyY2VDYXBhYmlsaXRpZXMpIHsgfVxuXG4gIHJlc29sdmUocm91dGU6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICB0aGlzLnF1b3Rlc1NlcnZpY2UuZ2V0UXVvdGVzKHRoaXMudXNlckNhbi5hZG1pbmlzdGVyUXVvdGVzKCksIENvbW1vbi5jbG9uZShyb3V0ZS5wYXJhbXMpKS5zdWJzY3JpYmUoKTtcblxuICAgIHJldHVybiB0aGlzLnF1b3Rlc1NlcnZpY2UuZGF0YS5tYXAoKGRhdGEgPT4gZGF0YS5pdGVtcyAhPT0gbnVsbCkpLmZpbHRlcihkYXRhID0+IGRhdGEpLnRha2UoMSk7XG4gIH1cbn1cbiJdfQ==
