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
var collections_service_1 = require("../../shared/services/collections.service");
var CollectionsResolver = (function () {
    function CollectionsResolver(collectionsService) {
        this.collectionsService = collectionsService;
    }
    CollectionsResolver.prototype.resolve = function () {
        this.collectionsService.reset();
        this.collectionsService.load().subscribe();
        return this.collectionsService.data.map(function (collections) { return collections.items.length > 0; }).filter(function (data) { return data; }).take(1);
    };
    CollectionsResolver = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [collections_service_1.CollectionsService])
    ], CollectionsResolver);
    return CollectionsResolver;
}());
exports.CollectionsResolver = CollectionsResolver;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29sbGVjdGlvbi9zZXJ2aWNlcy9jb2xsZWN0aW9ucy5yZXNvbHZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBLHNDQUEyQztBQUUzQyxpRkFBK0U7QUFHL0U7SUFDRSw2QkFBb0Isa0JBQXNDO1FBQXRDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7SUFBSSxDQUFDO0lBRXhELHFDQUFPLEdBQWQ7UUFNRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFaEMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRTNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFBLFdBQVcsSUFBSSxPQUFBLFdBQVcsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBNUIsQ0FBNEIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksRUFBSixDQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEgsQ0FBQztJQWRVLG1CQUFtQjtRQUQvQixpQkFBVSxFQUFFO3lDQUU2Qix3Q0FBa0I7T0FEL0MsbUJBQW1CLENBZS9CO0lBQUQsMEJBQUM7Q0FmRCxBQWVDLElBQUE7QUFmWSxrREFBbUIiLCJmaWxlIjoiYXBwLytjb2xsZWN0aW9uL3NlcnZpY2VzL2NvbGxlY3Rpb25zLnJlc29sdmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSZXNvbHZlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IENvbGxlY3Rpb25zU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9jb2xsZWN0aW9ucy5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENvbGxlY3Rpb25zUmVzb2x2ZXIgaW1wbGVtZW50cyBSZXNvbHZlPGJvb2xlYW4+IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjb2xsZWN0aW9uc1NlcnZpY2U6IENvbGxlY3Rpb25zU2VydmljZSkgeyB9XG5cbiAgcHVibGljIHJlc29sdmUoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgLy8gRGVzdHJveSBjYWNoZWQgY29sbGVjdGlvbnMgKGlmIGFueSkgc28gdGhhdCB0aGlzIHJlc29sdmVyIHdvbid0IHJlc29sdmUgdW50aWwgd2UncmUgZG9uZSByZWxvYWRpbmcuICAoVGhpcyBlbGltaW5hdGVzXG4gICAgLy8gYSBwb3N0LW5hdmlnYXRpb24gZmxpY2tlciBpZiB0aGUgY29sbGVjdGlvbnMgaGF2ZSB1cGRhdGVkLikgTG9va2VkIGF0IGRvaW5nIHRoaXMgaW4gY29sbGVjdGlvbnNTZXJ2aWNlLmxvYWQoKSBpbnN0ZWFkLFxuICAgIC8vIGJ1dCB0aGF0IG1ldGhvZCBoYXMgd2F5IHRvbyBtYW55IHJlc3BvbnNpYmlsaXRpZXMuICBTbyB3ZSdsbCBjb250cm9sIGl0IGZyb20gaGVyZS5cbiAgICAvL1xuICAgIC8vIChUaGlzIGNhbiBiZSBtYW5hZ2VkIG1vcmUgbmF0dXJhbGx5IC0tIHJlYWN0aXZlbHkgLS0gb25jZSBDb2xsZWN0aW9ucyBoYXZlIG1vdmVkIHRvIHRoZSBBcHBTdG9yZS4pXG4gICAgdGhpcy5jb2xsZWN0aW9uc1NlcnZpY2UucmVzZXQoKTtcblxuICAgIHRoaXMuY29sbGVjdGlvbnNTZXJ2aWNlLmxvYWQoKS5zdWJzY3JpYmUoKTtcblxuICAgIHJldHVybiB0aGlzLmNvbGxlY3Rpb25zU2VydmljZS5kYXRhLm1hcChjb2xsZWN0aW9ucyA9PiBjb2xsZWN0aW9ucy5pdGVtcy5sZW5ndGggPiAwKS5maWx0ZXIoZGF0YSA9PiBkYXRhKS50YWtlKDEpO1xuICB9XG59XG4iXX0=
