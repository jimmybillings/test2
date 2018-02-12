"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wz_speedview_component_1 = require("./wz.speedview.component");
function main() {
    describe('Wz Speedview Component', function () {
        var componentUnderTest;
        beforeEach(function () {
            jasmine.clock().uninstall();
            jasmine.clock().install();
            componentUnderTest = new wz_speedview_component_1.WzSpeedviewComponent();
        });
        afterEach(function () { return jasmine.clock().uninstall(); });
        describe('speedviewAssetInfo', function () {
            it('Should initialize the SpeedViewAssetInfo object with valid values', function () {
                var speedViewData;
                componentUnderTest.speedviewAssetInfo.subscribe(function (data) { return speedViewData = data; });
                expect(speedViewData)
                    .toEqual({ values: [], url: '', pricingType: '', price: 0, imageQuickView: false });
            });
        });
        describe('visibility', function () {
            it('Should initialize the visibility variable to be hidden', function () {
                var visibility;
                componentUnderTest.visibility.subscribe(function (viz) { return visibility = viz; });
                expect(visibility)
                    .toBe('hidden');
            });
        });
        describe('translationReady()', function () {
            it('should accept a meta data key for parsing and return a translation key', function () {
                expect(componentUnderTest.translationReady('Format.Duration'))
                    .toEqual('assetmetadata.Format_Duration');
            });
        });
        describe('merge()', function () {
            it('Should set only the posterUrl regardless of the other properties', function () {
                componentUnderTest.merge({ posterUrl: 'testPosterUrl' });
                var speedViewData;
                componentUnderTest.speedviewAssetInfo.subscribe(function (data) { return speedViewData = data; });
                expect(speedViewData).toEqual({
                    values: [],
                    url: '',
                    pricingType: '',
                    price: 0,
                    imageQuickView: false,
                    posterUrl: 'testPosterUrl'
                });
            });
            it('Should set the noData property and remove everything else except for the posterUrl', function () {
                componentUnderTest.speedviewAssetInfo.next({
                    values: [],
                    url: '',
                    pricingType: '',
                    price: 0,
                    imageQuickView: false,
                    posterUrl: 'testPosterUrl'
                });
                componentUnderTest.merge({ noData: true });
                var speedViewData;
                componentUnderTest.speedviewAssetInfo.subscribe(function (data) { return speedViewData = data; });
                expect(speedViewData).toEqual({
                    noData: true,
                    posterUrl: 'testPosterUrl'
                });
            });
            it('Should set the noData property and remove everything else except for the posterUrl', function () {
                componentUnderTest.speedviewAssetInfo.next({
                    values: [],
                    url: '',
                    pricingType: '',
                    price: 0,
                    imageQuickView: false,
                    posterUrl: 'testPosterUrl'
                });
                componentUnderTest.merge({ noData: true });
                var speedViewData;
                componentUnderTest.speedviewAssetInfo.subscribe(function (data) { return speedViewData = data; });
                expect(speedViewData).toEqual({
                    noData: true,
                    posterUrl: 'testPosterUrl'
                });
            });
            it('Should set complete speedview data and remove the noData property if defined', function () {
                componentUnderTest.speedviewAssetInfo.next({
                    noData: true
                });
                componentUnderTest.merge({
                    values: [],
                    url: '',
                    pricingType: '',
                    price: 0,
                    imageQuickView: false
                });
                var speedViewData;
                componentUnderTest.speedviewAssetInfo.subscribe(function (data) { return speedViewData = data; });
                expect(speedViewData).toEqual({
                    values: [],
                    url: '',
                    pricingType: '',
                    price: 0,
                    imageQuickView: false
                });
            });
            it('Should set complete speedview data and not attempt to remove the noData property if its undefined', function () {
                componentUnderTest.speedviewAssetInfo.next({});
                componentUnderTest.merge({
                    values: [],
                    url: '',
                    pricingType: '',
                    price: 0,
                    imageQuickView: false
                });
                var speedViewData;
                componentUnderTest.speedviewAssetInfo.subscribe(function (data) { return speedViewData = data; });
                expect(speedViewData).toEqual({
                    values: [],
                    url: '',
                    pricingType: '',
                    price: 0,
                    imageQuickView: false
                });
            });
        });
        describe('show()', function () {
            it('Should set the visible variable to visible after a 300ms timeout', function () {
                componentUnderTest.show();
                var visibility;
                componentUnderTest.visibility.subscribe(function (viz) { return visibility = viz; });
                expect(visibility)
                    .toBe('hidden');
                jasmine.clock().tick(340);
                expect(visibility)
                    .toBe('visible');
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kdWxlcy93ei1hc3NldC93ei1zcGVlZHZpZXcvd3ouc3BlZWR2aWV3LmNvbXBvbmVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsbUVBQWdFO0FBR2hFO0lBQ0UsUUFBUSxDQUFDLHdCQUF3QixFQUFFO1FBQ2pDLElBQUksa0JBQXdDLENBQUM7UUFFN0MsVUFBVSxDQUFDO1lBQ1QsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQzVCLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUMxQixrQkFBa0IsR0FBRyxJQUFJLDZDQUFvQixFQUFFLENBQUM7UUFDbEQsQ0FBQyxDQUFDLENBQUM7UUFFSCxTQUFTLENBQUMsY0FBTSxPQUFBLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxTQUFTLEVBQUUsRUFBM0IsQ0FBMkIsQ0FBQyxDQUFDO1FBRTdDLFFBQVEsQ0FBQyxvQkFBb0IsRUFBRTtZQUM3QixFQUFFLENBQUMsbUVBQW1FLEVBQUU7Z0JBQ3RFLElBQUksYUFBNEIsQ0FBQztnQkFDakMsa0JBQWtCLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsYUFBYSxHQUFHLElBQUksRUFBcEIsQ0FBb0IsQ0FBQyxDQUFDO2dCQUM5RSxNQUFNLENBQUMsYUFBYSxDQUFDO3FCQUNsQixPQUFPLENBQUMsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLGNBQWMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1lBQ3hGLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsWUFBWSxFQUFFO1lBQ3JCLEVBQUUsQ0FBQyx3REFBd0QsRUFBRTtnQkFDM0QsSUFBSSxVQUEyQixDQUFDO2dCQUNo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QkFBa0IsQ0FBQyxTQUFTLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxhQUFhLEdBQUcsSUFBSSxFQUFwQixDQUFvQixDQUFDLENBQUM7Z0JBQzlFLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQyxPQUFPLENBQUM7b0JBQzVCLE1BQU0sRUFBRSxFQUFFO29CQUNWLEdBQUcsRUFBRSxFQUFFO29CQUNQLFdBQVcsRUFBRSxFQUFFO29CQUNmLEtBQUssRUFBRSxDQUFDO29CQUNSLGNBQWMsRUFBRSxLQUFLO2lCQUN0QixDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLFFBQVEsRUFBRTtZQUNqQixFQUFFLENBQUMsa0VBQWtFLEVBQUU7Z0JBQ3JFLGtCQUFrQixDQUFDLElBQUksRUFBRSxDQUFDO2dCQUMxQixJQUFJLFVBQTJCLENBQUM7Z0JBQ2hDLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxVQUFVLEdBQUcsR0FBRyxFQUFoQixDQUFnQixDQUFDLENBQUM7Z0JBQ2pFLE1BQU0sQ0FBQyxVQUFVLENBQUM7cUJBQ2YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNsQixPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUMxQixNQUFNLENBQUMsVUFBVSxDQUFDO3FCQUNmLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNyQixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBakpELG9CQWlKQyIsImZpbGUiOiJhcHAvc2hhcmVkL21vZHVsZXMvd3otYXNzZXQvd3otc3BlZWR2aWV3L3d6LnNwZWVkdmlldy5jb21wb25lbnQuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNwZWVkdmlld0RhdGEgfSBmcm9tICcuLi8uLi8uLi9pbnRlcmZhY2VzL2Fzc2V0LmludGVyZmFjZSc7XG5pbXBvcnQgeyBXelNwZWVkdmlld0NvbXBvbmVudCB9IGZyb20gJy4vd3ouc3BlZWR2aWV3LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIGRlc2NyaWJlKCdXeiBTcGVlZHZpZXcgQ29tcG9uZW50JywgKCkgPT4ge1xuICAgIGxldCBjb21wb25lbnRVbmRlclRlc3Q6IFd6U3BlZWR2aWV3Q29tcG9uZW50O1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICBqYXNtaW5lLmNsb2NrKCkudW5pbnN0YWxsKCk7XG4gICAgICBqYXNtaW5lLmNsb2NrKCkuaW5zdGFsbCgpO1xuICAgICAgY29tcG9uZW50VW5kZXJUZXN0ID0gbmV3IFd6U3BlZWR2aWV3Q29tcG9uZW50KCk7XG4gICAgfSk7XG5cbiAgICBhZnRlckVhY2goKCkgPT4gamFzbWluZS5jbG9jaygpLnVuaW5zdGFsbCgpKTtcblxuICAgIGRlc2NyaWJlKCdzcGVlZHZpZXdBc3NldEluZm8nLCAoKSA9PiB7XG4gICAgICBpdCgnU2hvdWxkIGluaXRpYWxpemUgdGhlIFNwZWVkVmlld0Fzc2V0SW5mbyBvYmplY3Qgd2l0aCB2YWxpZCB2YWx1ZXMnLCAoKSA9PiB7XG4gICAgICAgIGxldCBzcGVlZFZpZXdEYXRhOiBTcGVlZHZpZXdEYXRhO1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3Quc3BlZWR2aWV3QXNzZXRJbmZvLnN1YnNjcmliZShkYXRhID0+IHNwZWVkVmlld0RhdGEgPSBkYXRhKTtcbiAgICAgICAgZXhwZWN0KHNwZWVkVmlld0RhdGEpXG4gICAgICAgICAgLnRvRXF1YWwoeyB2YWx1ZXM6IFtdLCB1cmw6ICcnLCBwcmljaW5nVHlwZTogJycsIHByaWNlOiAwLCBpbWFnZVF1aWNrVmlldzogZmFsc2UgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCd2aXNpYmlsaXR5JywgKCkgPT4ge1xuICAgICAgaXQoJ1Nob3VsZCBpbml0aWFsaXplIHRoZSB2aXNpYmlsaXR5IHZhcmlhYmxlIHRvIGJlIGhpZGRlbicsICgpID0+IHtcbiAgICAgICAgbGV0IHZpc2liaWxpdHk6IFZpc2liaWxpdHlTdGF0ZTtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnZpc2liaWxpdHkuc3Vic2NyaWJlKHZpeiA9PiB2aXNpYmlsaXR5ID0gdml6KTtcbiAgICAgICAgZXhwZWN0KHZpc2liaWxpdHkpXG4gICAgICAgICAgLnRvQmUoJ2hpZGRlbicpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgndHJhbnNsYXRpb25SZWFkeSgpJywgKCkgPT4ge1xuICAgICAgaXQoJ3Nob3VsZCBhY2NlcHQgYSBtZXRhIGRhdGEga2V5IGZvciBwYXJzaW5nIGFuZCByZXR1cm4gYSB0cmFuc2xhdGlvbiBrZXknLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QudHJhbnNsYXRpb25SZWFkeSgnRm9ybWF0LkR1cmF0aW9uJykpXG4gICAgICAgICAgLnRvRXF1YWwoJ2Fzc2V0bWV0YWRhdGEuRm9ybWF0X0R1cmF0aW9uJyk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdtZXJnZSgpJywgKCkgPT4ge1xuXG4gICAgICBpdCgnU2hvdWxkIHNldCBvbmx5IHRoZSBwb3N0ZXJVcmwgcmVnYXJkbGVzcyBvZiB0aGUgb3RoZXIgcHJvcGVydGllcycsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm1lcmdlKHsgcG9zdGVyVXJsOiAndGVzdFBvc3RlclVybCcgfSk7XG4gICAgICAgIGxldCBzcGVlZFZpZXdEYXRhOiBTcGVlZHZpZXdEYXRhO1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3Quc3BlZWR2aWV3QXNzZXRJbmZvLnN1YnNjcmliZShkYXRhID0+IHNwZWVkVmlld0RhdGEgPSBkYXRhKTtcbiAgICAgICAgZXhwZWN0KHNwZWVkVmlld0RhdGEpLnRvRXF1YWwoe1xuICAgICAgICAgIHZhbHVlczogW10sXG4gICAgICAgICAgdXJsOiAnJyxcbiAgICAgICAgICBwcmljaW5nVHlwZTogJycsXG4gICAgICAgICAgcHJpY2U6IDAsXG4gICAgICAgICAgaW1hZ2VRdWlja1ZpZXc6IGZhbHNlLFxuICAgICAgICAgIHBvc3RlclVybDogJ3Rlc3RQb3N0ZXJVcmwnXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdTaG91bGQgc2V0IHRoZSBub0RhdGEgcHJvcGVydHkgYW5kIHJlbW92ZSBldmVyeXRoaW5nIGVsc2UgZXhjZXB0IGZvciB0aGUgcG9zdGVyVXJsJywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3Quc3BlZWR2aWV3QXNzZXRJbmZvLm5leHQoe1xuICAgICAgICAgIHZhbHVlczogW10sXG4gICAgICAgICAgdXJsOiAnJyxcbiAgICAgICAgICBwcmljaW5nVHlwZTogJycsXG4gICAgICAgICAgcHJpY2U6IDAsXG4gICAgICAgICAgaW1hZ2VRdWlja1ZpZXc6IGZhbHNlLFxuICAgICAgICAgIHBvc3RlclVybDogJ3Rlc3RQb3N0ZXJVcmwnXG4gICAgICAgIH0pO1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QubWVyZ2UoeyBub0RhdGE6IHRydWUgfSk7XG4gICAgICAgIGxldCBzcGVlZFZpZXdEYXRhOiBTcGVlZHZpZXdEYXRhO1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3Quc3BlZWR2aWV3QXNzZXRJbmZvLnN1YnNjcmliZShkYXRhID0+IHNwZWVkVmlld0RhdGEgPSBkYXRhKTtcbiAgICAgICAgZXhwZWN0KHNwZWVkVmlld0RhdGEpLnRvRXF1YWwoe1xuICAgICAgICAgIG5vRGF0YTogdHJ1ZSxcbiAgICAgICAgICBwb3N0ZXJVcmw6ICd0ZXN0UG9zdGVyVXJsJ1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnU2hvdWxkIHNldCB0aGUgbm9EYXRhIHByb3BlcnR5IGFuZCByZW1vdmUgZXZlcnl0aGluZyBlbHNlIGV4Y2VwdCBmb3IgdGhlIHBvc3RlclVybCcsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnNwZWVkdmlld0Fzc2V0SW5mby5uZXh0KHtcbiAgICAgICAgICB2YWx1ZXM6IFtdLFxuICAgICAgICAgIHVybDogJycsXG4gICAgICAgICAgcHJpY2luZ1R5cGU6ICcnLFxuICAgICAgICAgIHByaWNlOiAwLFxuICAgICAgICAgIGltYWdlUXVpY2tWaWV3OiBmYWxzZSxcbiAgICAgICAgICBwb3N0ZXJVcmw6ICd0ZXN0UG9zdGVyVXJsJ1xuICAgICAgICB9KTtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm1lcmdlKHsgbm9EYXRhOiB0cnVlIH0pO1xuICAgICAgICBsZXQgc3BlZWRWaWV3RGF0YTogU3BlZWR2aWV3RGF0YTtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnNwZWVkdmlld0Fzc2V0SW5mby5zdWJzY3JpYmUoZGF0YSA9PiBzcGVlZFZpZXdEYXRhID0gZGF0YSk7XG4gICAgICAgIGV4cGVjdChzcGVlZFZpZXdEYXRhKS50b0VxdWFsKHtcbiAgICAgICAgICBub0RhdGE6IHRydWUsXG4gICAgICAgICAgcG9zdGVyVXJsOiAndGVzdFBvc3RlclVybCdcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ1Nob3VsZCBzZXQgY29tcGxldGUgc3BlZWR2aWV3IGRhdGEgYW5kIHJlbW92ZSB0aGUgbm9EYXRhIHByb3BlcnR5IGlmIGRlZmluZWQnLCAoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5zcGVlZHZpZXdBc3NldEluZm8ubmV4dCh7XG4gICAgICAgICAgbm9EYXRhOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QubWVyZ2Uoe1xuICAgICAgICAgIHZhbHVlczogW10sXG4gICAgICAgICAgdXJsOiAnJyxcbiAgICAgICAgICBwcmljaW5nVHlwZTogJycsXG4gICAgICAgICAgcHJpY2U6IDAsXG4gICAgICAgICAgaW1hZ2VRdWlja1ZpZXc6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgc3BlZWRWaWV3RGF0YTogU3BlZWR2aWV3RGF0YTtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnNwZWVkdmlld0Fzc2V0SW5mby5zdWJzY3JpYmUoZGF0YSA9PiBzcGVlZFZpZXdEYXRhID0gZGF0YSk7XG4gICAgICAgIGV4cGVjdChzcGVlZFZpZXdEYXRhKS50b0VxdWFsKHtcbiAgICAgICAgICB2YWx1ZXM6IFtdLFxuICAgICAgICAgIHVybDogJycsXG4gICAgICAgICAgcHJpY2luZ1R5cGU6ICcnLFxuICAgICAgICAgIHByaWNlOiAwLFxuICAgICAgICAgIGltYWdlUXVpY2tWaWV3OiBmYWxzZVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnU2hvdWxkIHNldCBjb21wbGV0ZSBzcGVlZHZpZXcgZGF0YSBhbmQgbm90IGF0dGVtcHQgdG8gcmVtb3ZlIHRoZSBub0RhdGEgcHJvcGVydHkgaWYgaXRzIHVuZGVmaW5lZCcsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnNwZWVkdmlld0Fzc2V0SW5mby5uZXh0KHt9KTtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm1lcmdlKHtcbiAgICAgICAgICB2YWx1ZXM6IFtdLFxuICAgICAgICAgIHVybDogJycsXG4gICAgICAgICAgcHJpY2luZ1R5cGU6ICcnLFxuICAgICAgICAgIHByaWNlOiAwLFxuICAgICAgICAgIGltYWdlUXVpY2tWaWV3OiBmYWxzZVxuICAgICAgICB9KTtcbiAgICAgICAgbGV0IHNwZWVkVmlld0RhdGE6IFNwZWVkdmlld0RhdGE7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5zcGVlZHZpZXdBc3NldEluZm8uc3Vic2NyaWJlKGRhdGEgPT4gc3BlZWRWaWV3RGF0YSA9IGRhdGEpO1xuICAgICAgICBleHBlY3Qoc3BlZWRWaWV3RGF0YSkudG9FcXVhbCh7XG4gICAgICAgICAgdmFsdWVzOiBbXSxcbiAgICAgICAgICB1cmw6ICcnLFxuICAgICAgICAgIHByaWNpbmdUeXBlOiAnJyxcbiAgICAgICAgICBwcmljZTogMCxcbiAgICAgICAgICBpbWFnZVF1aWNrVmlldzogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdzaG93KCknLCAoKSA9PiB7XG4gICAgICBpdCgnU2hvdWxkIHNldCB0aGUgdmlzaWJsZSB2YXJpYWJsZSB0byB2aXNpYmxlIGFmdGVyIGEgMzAwbXMgdGltZW91dCcsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnNob3coKTtcbiAgICAgICAgbGV0IHZpc2liaWxpdHk6IFZpc2liaWxpdHlTdGF0ZTtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnZpc2liaWxpdHkuc3Vic2NyaWJlKHZpeiA9PiB2aXNpYmlsaXR5ID0gdml6KTtcbiAgICAgICAgZXhwZWN0KHZpc2liaWxpdHkpXG4gICAgICAgICAgLnRvQmUoJ2hpZGRlbicpO1xuICAgICAgICBqYXNtaW5lLmNsb2NrKCkudGljaygzNDApO1xuICAgICAgICBleHBlY3QodmlzaWJpbGl0eSlcbiAgICAgICAgICAudG9CZSgndmlzaWJsZScpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufVxuIl19
