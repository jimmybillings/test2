"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var animations_1 = require("@angular/animations");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var WzSpeedviewComponent = (function () {
    function WzSpeedviewComponent() {
        this.speedviewAssetInfo = new BehaviorSubject_1.BehaviorSubject({
            values: [],
            url: '',
            price: 0,
            imageQuickView: false,
            pricingType: ''
        });
        this.visibility = new BehaviorSubject_1.BehaviorSubject('hidden');
    }
    WzSpeedviewComponent.prototype.translationReady = function (field) {
        return 'assetmetadata.' + field.replace(/\./g, '_');
    };
    WzSpeedviewComponent.prototype.merge = function (data) {
        var speedviewAssetInfo;
        this.speedviewAssetInfo.take(1).subscribe(function (currentData) {
            speedviewAssetInfo = currentData;
        });
        if (data.noData) {
            var tempData = { posterUrl: speedviewAssetInfo.posterUrl };
            speedviewAssetInfo = __assign({}, tempData, data);
        }
        else if (data.posterUrl) {
            speedviewAssetInfo.posterUrl = data.posterUrl;
        }
        else {
            if (speedviewAssetInfo.noData)
                delete speedviewAssetInfo.noData;
            speedviewAssetInfo = __assign({}, speedviewAssetInfo, data);
        }
        this.speedviewAssetInfo.next(speedviewAssetInfo);
    };
    WzSpeedviewComponent.prototype.show = function () {
        var _this = this;
        setTimeout(function () {
            _this.visibility.next('visible');
        }, 300);
    };
    WzSpeedviewComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'wz-speedview',
            templateUrl: 'wz.speedview.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            animations: [
                animations_1.trigger('state', [
                    animations_1.state('hidden', animations_1.style({
                        opacity: '0',
                        transform: 'scale(0)'
                    })),
                    animations_1.state('visible', animations_1.style({
                        opacity: '1',
                        transform: 'scale(1)'
                    })),
                    animations_1.transition('hidden => visible', animations_1.animate('150ms cubic-bezier(0.0, 0.0, 0.2, 1)')),
                    animations_1.transition('visible => hidden', animations_1.animate('150ms cubic-bezier(0.4, 0.0, 1, 1)'))
                ])
            ],
        })
    ], WzSpeedviewComponent);
    return WzSpeedviewComponent;
}());
exports.WzSpeedviewComponent = WzSpeedviewComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kdWxlcy93ei1hc3NldC93ei1zcGVlZHZpZXcvd3ouc3BlZWR2aWV3LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQW1FO0FBRW5FLGtEQU82QjtBQUM3Qix3REFBdUQ7QUF5QnZEO0lBckJBO1FBdUJTLHVCQUFrQixHQUFtQyxJQUFJLGlDQUFlLENBQUM7WUFDOUUsTUFBTSxFQUFFLEVBQUU7WUFDVixHQUFHLEVBQUUsRUFBRTtZQUNQLEtBQUssRUFBRSxDQUFDO1lBQ1IsY0FBYyxFQUFFLEtBQUs7WUFDckIsV0FBVyxFQUFFLEVBQWlCO1NBQy9CLENBQUMsQ0FBQztRQUVJLGVBQVUsR0FBNEMsSUFBSSxpQ0FBZSxDQUFDLFFBQWtDLENBQUMsQ0FBQztJQWlDdkgsQ0FBQztJQS9CUSwrQ0FBZ0IsR0FBdkIsVUFBd0IsS0FBYTtRQUNuQyxNQUFNLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVNLG9DQUFLLEdBQVosVUFBYSxJQUFtQjtRQUM5QixJQUFJLGtCQUFpQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsV0FBVztZQUNuRCxrQkFBa0IsR0FBRyxXQUFXLENBQUM7UUFDbkMsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNoQixJQUFJLFFBQVEsR0FBRyxFQUFFLFNBQVMsRUFBRSxrQkFBa0IsQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUMzRCxrQkFBa0IsZ0JBQVEsUUFBUSxFQUFLLElBQUksQ0FBRSxDQUFDO1FBR2hELENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDMUIsa0JBQWtCLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFHaEQsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sRUFBRSxDQUFDLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDO2dCQUFDLE9BQU8sa0JBQWtCLENBQUMsTUFBTSxDQUFDO1lBQ2hFLGtCQUFrQixnQkFBUSxrQkFBa0IsRUFBSyxJQUFJLENBQUUsQ0FBQztRQUMxRCxDQUFDO1FBQ0QsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFFTSxtQ0FBSSxHQUFYO1FBQUEsaUJBSUM7UUFIQyxVQUFVLENBQUM7WUFDVCxLQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNsQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDVixDQUFDO0lBMUNVLG9CQUFvQjtRQXJCaEMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsY0FBYztZQUN4QixXQUFXLEVBQUUsbUJBQW1CO1lBQ2hDLGVBQWUsRUFBRSw4QkFBdUIsQ0FBQyxNQUFNO1lBQy9DLFVBQVUsRUFBRTtnQkFDVixvQkFBTyxDQUFDLE9BQU8sRUFBRTtvQkFDZixrQkFBSyxDQUFDLFFBQVEsRUFBRSxrQkFBSyxDQUFDO3dCQUNwQixPQUFPLEVBQUUsR0FBRzt3QkFDWixTQUFTLEVBQUUsVUFBVTtxQkFDdEIsQ0FBQyxDQUFDO29CQUNILGtCQUFLLENBQUMsU0FBUyxFQUFFLGtCQUFLLENBQUM7d0JBQ3JCLE9BQU8sRUFBRSxHQUFHO3dCQUNaLFNBQVMsRUFBRSxVQUFVO3FCQUN0QixDQUFDLENBQUM7b0JBQ0gsdUJBQVUsQ0FBQyxtQkFBbUIsRUFBRSxvQkFBTyxDQUFDLHNDQUFzQyxDQUFDLENBQUM7b0JBQ2hGLHVCQUFVLENBQUMsbUJBQW1CLEVBQUUsb0JBQU8sQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO2lCQUMvRSxDQUFDO2FBQ0g7U0FDRixDQUFDO09BRVcsb0JBQW9CLENBMkNoQztJQUFELDJCQUFDO0NBM0NELEFBMkNDLElBQUE7QUEzQ1ksb0RBQW9CIiwiZmlsZSI6ImFwcC9zaGFyZWQvbW9kdWxlcy93ei1hc3NldC93ei1zcGVlZHZpZXcvd3ouc3BlZWR2aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFByaWNpbmdUeXBlLCBTcGVlZHZpZXdEYXRhIH0gZnJvbSAnLi4vLi4vLi4vaW50ZXJmYWNlcy9hc3NldC5pbnRlcmZhY2UnO1xuaW1wb3J0IHtcbiAgc3R5bGUsXG4gIHRyaWdnZXIsXG4gIHN0YXRlLFxuICB0cmFuc2l0aW9uLFxuICBhbmltYXRlLFxuICBBbmltYXRpb25FdmVudCxcbn0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzL0JlaGF2aW9yU3ViamVjdCc7XG5cbmV4cG9ydCB0eXBlIFNwZWVkUHJldmlld1Zpc2liaWxpdHkgPSAndmlzaWJsZScgfCAnaGlkZGVuJztcblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAnd3otc3BlZWR2aWV3JyxcbiAgdGVtcGxhdGVVcmw6ICd3ei5zcGVlZHZpZXcuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBhbmltYXRpb25zOiBbXG4gICAgdHJpZ2dlcignc3RhdGUnLCBbXG4gICAgICBzdGF0ZSgnaGlkZGVuJywgc3R5bGUoe1xuICAgICAgICBvcGFjaXR5OiAnMCcsXG4gICAgICAgIHRyYW5zZm9ybTogJ3NjYWxlKDApJ1xuICAgICAgfSkpLFxuICAgICAgc3RhdGUoJ3Zpc2libGUnLCBzdHlsZSh7XG4gICAgICAgIG9wYWNpdHk6ICcxJyxcbiAgICAgICAgdHJhbnNmb3JtOiAnc2NhbGUoMSknXG4gICAgICB9KSksXG4gICAgICB0cmFuc2l0aW9uKCdoaWRkZW4gPT4gdmlzaWJsZScsIGFuaW1hdGUoJzE1MG1zIGN1YmljLWJlemllcigwLjAsIDAuMCwgMC4yLCAxKScpKSxcbiAgICAgIHRyYW5zaXRpb24oJ3Zpc2libGUgPT4gaGlkZGVuJywgYW5pbWF0ZSgnMTUwbXMgY3ViaWMtYmV6aWVyKDAuNCwgMC4wLCAxLCAxKScpKVxuICAgIF0pXG4gIF0sXG59KVxuXG5leHBvcnQgY2xhc3MgV3pTcGVlZHZpZXdDb21wb25lbnQge1xuXG4gIHB1YmxpYyBzcGVlZHZpZXdBc3NldEluZm86IEJlaGF2aW9yU3ViamVjdDxTcGVlZHZpZXdEYXRhPiA9IG5ldyBCZWhhdmlvclN1YmplY3Qoe1xuICAgIHZhbHVlczogW10sXG4gICAgdXJsOiAnJyxcbiAgICBwcmljZTogMCxcbiAgICBpbWFnZVF1aWNrVmlldzogZmFsc2UsXG4gICAgcHJpY2luZ1R5cGU6ICcnIGFzIFByaWNpbmdUeXBlXG4gIH0pO1xuXG4gIHB1YmxpYyB2aXNpYmlsaXR5OiBCZWhhdmlvclN1YmplY3Q8U3BlZWRQcmV2aWV3VmlzaWJpbGl0eT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KCdoaWRkZW4nIGFzIFNwZWVkUHJldmlld1Zpc2liaWxpdHkpO1xuXG4gIHB1YmxpYyB0cmFuc2xhdGlvblJlYWR5KGZpZWxkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gJ2Fzc2V0bWV0YWRhdGEuJyArIGZpZWxkLnJlcGxhY2UoL1xcLi9nLCAnXycpO1xuICB9XG5cbiAgcHVibGljIG1lcmdlKGRhdGE6IFNwZWVkdmlld0RhdGEpIHtcbiAgICBsZXQgc3BlZWR2aWV3QXNzZXRJbmZvOiBTcGVlZHZpZXdEYXRhO1xuICAgIHRoaXMuc3BlZWR2aWV3QXNzZXRJbmZvLnRha2UoMSkuc3Vic2NyaWJlKGN1cnJlbnREYXRhID0+IHtcbiAgICAgIHNwZWVkdmlld0Fzc2V0SW5mbyA9IGN1cnJlbnREYXRhO1xuICAgIH0pO1xuICAgIC8vIEZhbGwgYmFjayBpZiB0aGUgYXNzZXQgaGFzIG5vIGRhdGFcbiAgICBpZiAoZGF0YS5ub0RhdGEpIHtcbiAgICAgIGxldCB0ZW1wRGF0YSA9IHsgcG9zdGVyVXJsOiBzcGVlZHZpZXdBc3NldEluZm8ucG9zdGVyVXJsIH07XG4gICAgICBzcGVlZHZpZXdBc3NldEluZm8gPSB7IC4uLnRlbXBEYXRhLCAuLi5kYXRhIH07XG5cbiAgICAgIC8vIEZpcnN0IGhvdmVyIHVzaW5nIHRoZSBjYWNoZWQgaW1hZ2UgZnJvbSB0aGUgcmVzdWx0IHRodW1ibmFpbFxuICAgIH0gZWxzZSBpZiAoZGF0YS5wb3N0ZXJVcmwpIHtcbiAgICAgIHNwZWVkdmlld0Fzc2V0SW5mby5wb3N0ZXJVcmwgPSBkYXRhLnBvc3RlclVybDtcblxuICAgICAgLy8gbWFpbiBtZXRhIGRhdGEgY29taW5nIGZyb20gc2VydmVyIG9yIGNhY2hlXG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChzcGVlZHZpZXdBc3NldEluZm8ubm9EYXRhKSBkZWxldGUgc3BlZWR2aWV3QXNzZXRJbmZvLm5vRGF0YTtcbiAgICAgIHNwZWVkdmlld0Fzc2V0SW5mbyA9IHsgLi4uc3BlZWR2aWV3QXNzZXRJbmZvLCAuLi5kYXRhIH07XG4gICAgfVxuICAgIHRoaXMuc3BlZWR2aWV3QXNzZXRJbmZvLm5leHQoc3BlZWR2aWV3QXNzZXRJbmZvKTtcbiAgfVxuXG4gIHB1YmxpYyBzaG93KCkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy52aXNpYmlsaXR5Lm5leHQoJ3Zpc2libGUnKTtcbiAgICB9LCAzMDApO1xuICB9XG59XG4iXX0=
