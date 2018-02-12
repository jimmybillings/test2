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
var http_1 = require("@angular/http");
var HomeVideoService = (function () {
    function HomeVideoService(http) {
        this.http = http;
    }
    HomeVideoService.prototype.getVideo = function (mediaId) {
        return this.http.get("https://content.jwplatform.com/feeds/" + mediaId + ".json")
            .map(function (data) { try {
            return data.json();
        }
        catch (exception) {
            return data;
        } });
    };
    HomeVideoService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], HomeVideoService);
    return HomeVideoService;
}());
exports.HomeVideoService = HomeVideoService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8raG9tZS9zZXJ2aWNlcy9ob21lLnZpZGVvLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBMkM7QUFDM0Msc0NBQXFDO0FBTXJDO0lBR0UsMEJBQ1UsSUFBVTtRQUFWLFNBQUksR0FBSixJQUFJLENBQU07SUFBSSxDQUFDO0lBRWxCLG1DQUFRLEdBQWYsVUFBZ0IsT0FBWTtRQUMxQixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsMENBQXdDLE9BQU8sVUFBTyxDQUFDO2FBQ3pFLEdBQUcsQ0FBQyxVQUFBLElBQUksSUFBTSxJQUFJLENBQUM7WUFBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQUMsQ0FBQztRQUFDLEtBQUssQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JGLENBQUM7SUFUVSxnQkFBZ0I7UUFENUIsaUJBQVUsRUFBRTt5Q0FLSyxXQUFJO09BSlQsZ0JBQWdCLENBd0I1QjtJQUFELHVCQUFDO0NBeEJELEFBd0JDLElBQUE7QUF4QlksNENBQWdCIiwiZmlsZSI6ImFwcC8raG9tZS9zZXJ2aWNlcy9ob21lLnZpZGVvLnNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcblxuZGVjbGFyZSB2YXIgandwbGF5ZXI6IGFueTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEhvbWVWaWRlb1NlcnZpY2Uge1xuICBwdWJsaWMgaGVyb1ZpZGVvOiBhbnk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBodHRwOiBIdHRwKSB7IH1cblxuICBwdWJsaWMgZ2V0VmlkZW8obWVkaWFJZDogYW55KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldChgaHR0cHM6Ly9jb250ZW50Lmp3cGxhdGZvcm0uY29tL2ZlZWRzLyR7bWVkaWFJZH0uanNvbmApXG4gICAgICAubWFwKGRhdGEgPT4geyB0cnkgeyByZXR1cm4gZGF0YS5qc29uKCk7IH0gY2F0Y2ggKGV4Y2VwdGlvbikgeyByZXR1cm4gZGF0YTsgfSB9KTtcbiAgfVxuXG4gIC8vIHB1YmxpYyBzZXRVcFZpZGVvKHZpZGVvOiBhbnksIGVsZW1lbnRJZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgLy8gICByZXR1cm4gdGhpcy5oZXJvVmlkZW8gPSBqd3BsYXllcihlbGVtZW50SWQpLnNldHVwKHtcbiAgLy8gICAgIGF1dG9zdGFydDogdHJ1ZSxcbiAgLy8gICAgIGNvbnRyb2xzOiBmYWxzZSxcbiAgLy8gICAgIHBsYXlsaXN0OiB2aWRlbyxcbiAgLy8gICAgIGFuZHJvaWRobHM6IGZhbHNlLFxuICAvLyAgICAgbXV0ZTogdHJ1ZSxcbiAgLy8gICAgIHJlcGVhdDogdHJ1ZSxcbiAgLy8gICAgIHN0cmV0Y2hpbmc6ICdmaWxsJyxcbiAgLy8gICAgIGhlaWdodDogJzEwMCUnLFxuICAvLyAgICAgd2lkdGg6ICcxMDAlJ1xuICAvLyAgIH0pIGFzIE9ic2VydmFibGU8YW55PjtcbiAgLy8gfVxufVxuIl19
