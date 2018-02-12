"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wz_speedview_directive_1 = require("./wz.speedview.directive");
var wz_speedview_position_calculator_1 = require("./wz.speedview-position-calculator");
var overlay_1 = require("@angular/cdk/overlay");
var portal_1 = require("@angular/cdk/portal");
var wz_speedview_component_1 = require("./wz.speedview.component");
var mock_app_store_1 = require("../../../../store/spec-helpers/mock-app.store");
var enhanced_asset_1 = require("../../../interfaces/enhanced-asset");
function main() {
    describe('Wz Speedview Directive', function () {
        var directiveUnderTest, mockviewContainerRef = {}, mockRenderer, mockAppStore, mockOverlayRef, mockOverlay, componentInstance;
        beforeEach(function () {
            spyOn(wz_speedview_position_calculator_1.SpeedViewPositionCalculator, 'calculate').and.returnValue({ x: 100, y: 200 });
            mockRenderer = {
                listenGlobal: jasmine.createSpy('listenGlobal')
                    .and.callFake(function (a, b, c) {
                    c();
                    return function () { return true; };
                })
            };
            componentInstance = {
                merge: jasmine.createSpy('merge'),
                show: jasmine.createSpy('show')
            };
            mockOverlayRef = {
                attach: jasmine.createSpy('attach').and.returnValue({ instance: componentInstance }),
                detach: jasmine.createSpy('detach').and.returnValue(Promise.resolve()),
                dispose: jasmine.createSpy('dispose')
            };
            mockOverlay = {
                create: jasmine.createSpy('create').and.returnValue(mockOverlayRef),
                position: jasmine.createSpy('position').and.returnValue({
                    global: jasmine.createSpy('global').and.returnValue({
                        top: jasmine.createSpy('top').and.returnValue({
                            left: jasmine.createSpy('left').and.returnValue({ x: 100, y: 200 })
                        })
                    })
                })
            };
            mockAppStore = new mock_app_store_1.MockAppStore();
            directiveUnderTest = new wz_speedview_directive_1.WzSpeedviewDirective(mockviewContainerRef, mockOverlay, mockRenderer, mockAppStore);
            directiveUnderTest.ngOnInit();
        });
        describe('ngOnInit()', function () {
            it('Should assign a new instance of overlay state', function () {
                directiveUnderTest.ngOnInit();
            });
        });
        describe('onMouseEnter()', function () {
            var $event, spy, asset;
            beforeEach(function () {
                $event = {
                    currentTarget: {
                        getBoundingClientRect: function () {
                            return {
                                bottom: 380.03125,
                                height: 114.96875,
                                left: 327.828125,
                                right: 532.21875,
                                top: 265.0625,
                                width: 204.390625,
                            };
                        }
                    }
                };
                asset = {
                    'assetId': 35634858,
                    'name': '34548576_056',
                    'metaData': [],
                    'thumbnail': {
                        'name': 'thumbnail',
                        'urls': {
                            'https': 'https://test.jpg'
                        }
                    },
                    'smallPreview': {
                        'name': 'quickPreview',
                        'urls': {
                            'https': 'https://test.flv'
                        }
                    },
                    'hasDownloadableComp': false
                };
                directiveUnderTest.wzSpeedview = enhanced_asset_1.enhanceAsset(asset, 'search');
                spy = mockAppStore.createActionFactoryMethod('speedPreview', 'load');
            });
            describe('loadOverlay()', function () {
                it('Should call the speedview position calculator with the view port', function () {
                    directiveUnderTest.onMouseEnter($event);
                    expect(wz_speedview_position_calculator_1.SpeedViewPositionCalculator.calculate).toHaveBeenCalledWith({
                        bottom: 380.03125,
                        height: 114.96875,
                        left: 327.828125,
                        right: 532.21875,
                        top: 265.0625,
                        width: 204.390625,
                    });
                });
                it('should configure the position correctly', function () {
                    directiveUnderTest.onMouseEnter($event);
                    expect(mockOverlay.position).toHaveBeenCalled();
                    expect(mockOverlay.position().global).toHaveBeenCalled();
                    expect(mockOverlay.position().global().top).toHaveBeenCalledWith('200px');
                    expect(mockOverlay.position().global().top().left).toHaveBeenCalledWith('100px');
                });
                it('should create a new overlay', function () {
                    var overlayState = new overlay_1.OverlayConfig();
                    overlayState.positionStrategy = { x: 100, y: 200 };
                    directiveUnderTest.onMouseEnter($event);
                    expect(mockOverlay.create).toHaveBeenCalledWith(overlayState);
                });
            });
            describe('loadSpeedView()', function () {
                it('Should attach the speed view component to the overlay', function () {
                    directiveUnderTest.onMouseEnter($event);
                    expect(mockOverlayRef.attach).toHaveBeenCalledWith(new portal_1.ComponentPortal(wz_speedview_component_1.WzSpeedviewComponent, {}));
                });
                it('Should merge the poster url onto the speedview while we wait for the video to start playing', function () {
                    directiveUnderTest.onMouseEnter($event);
                    expect(componentInstance.merge).toHaveBeenCalledWith({ posterUrl: 'https://test.jpg' });
                });
                it('Should call the show method on the component instance', function () {
                    directiveUnderTest.onMouseEnter($event);
                    expect(componentInstance.show).toHaveBeenCalled();
                });
                it('Should merge the new speedview data into the component when loaded', function () {
                    var enhancedAssetUnderTest = enhanced_asset_1.enhanceAsset(asset, 'search');
                    mockAppStore.createStateElement('speedPreview', 35634858, enhancedAssetUnderTest);
                    directiveUnderTest.onMouseEnter($event);
                    expect(componentInstance.merge.calls.allArgs())
                        .toEqual([[{ posterUrl: 'https://test.jpg' }], [enhancedAssetUnderTest]]);
                });
            });
            describe('destroySpeedView()', function () {
                beforeEach(function () {
                    var enhancedAssetUnderTest = enhanced_asset_1.enhanceAsset(asset, 'search');
                    mockAppStore.createStateElement('speedPreview', 35634858, enhancedAssetUnderTest);
                    directiveUnderTest.onMouseEnter($event);
                });
                describe('ngOnDestroy()', function () {
                    it('should destroy the speed view', function () {
                        directiveUnderTest.ngOnDestroy();
                        expect(mockOverlayRef.dispose).toHaveBeenCalled();
                    });
                });
                describe('onMouseLeave()', function () {
                    it('should destroy the speed view', function () {
                        directiveUnderTest.onMouseLeave();
                        expect(mockOverlayRef.dispose).toHaveBeenCalled();
                    });
                });
            });
            describe('onClick()', function () {
                it('should destroy the speed view', function () {
                    directiveUnderTest.onClick();
                });
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kdWxlcy93ei1hc3NldC93ei1zcGVlZHZpZXcvd3ouc3BlZWR2aWV3LmRpcmVjdGl2ZS5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUVBQWdFO0FBRWhFLHVGQUFpRjtBQUVqRixnREFLOEI7QUFFOUIsOENBRzZCO0FBQzdCLG1FQUFnRTtBQUNoRSxnRkFBNkU7QUFDN0UscUVBQWlGO0FBR2pGO0lBRUUsUUFBUSxDQUFDLHdCQUF3QixFQUFFO1FBQ2pDLElBQUksa0JBQXdDLEVBQUUsb0JBQW9CLEdBQVEsRUFBRSxFQUMxRSxZQUFpQixFQUFFLFlBQWlCLEVBQUUsY0FBbUIsRUFBRSxXQUFnQixFQUMzRSxpQkFBc0IsQ0FBQztRQUV6QixVQUFVLENBQUM7WUFDVCxLQUFLLENBQUMsOERBQTJCLEVBQUUsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7WUFDcEYsWUFBWSxHQUFHO2dCQUNiLFlBQVksRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQztxQkFDNUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxVQUFDLENBQU0sRUFBRSxDQUFNLEVBQUUsQ0FBVztvQkFDeEMsQ0FBQyxFQUFFLENBQUM7b0JBQ0osTUFBTSxDQUFDLGNBQU0sT0FBQSxJQUFJLEVBQUosQ0FBSSxDQUFDO2dCQUNwQixDQUFDLENBQUM7YUFDTCxDQUFDO1lBQ0YsaUJBQWlCLEdBQUc7Z0JBQ2xCLEtBQUssRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQztnQkFDakMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDO2FBQ2hDLENBQUM7WUFDRixjQUFjLEdBQUc7Z0JBQ2YsTUFBTSxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcs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QkFDL0IsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBM0tELG9CQTJLQyIsImZpbGUiOiJhcHAvc2hhcmVkL21vZHVsZXMvd3otYXNzZXQvd3otc3BlZWR2aWV3L3d6LnNwZWVkdmlldy5kaXJlY3RpdmUuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFd6U3BlZWR2aWV3RGlyZWN0aXZlIH0gZnJvbSAnLi93ei5zcGVlZHZpZXcuZGlyZWN0aXZlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgU3BlZWRWaWV3UG9zaXRpb25DYWxjdWxhdG9yIH0gZnJvbSAnLi93ei5zcGVlZHZpZXctcG9zaXRpb24tY2FsY3VsYXRvcic7XG5pbXBvcnQgeyBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBPdmVybGF5Q29uZmlnLFxuICBPdmVybGF5UmVmLFxuICBPdmVybGF5LFxuICBHbG9iYWxQb3NpdGlvblN0cmF0ZWd5LFxufSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5cbmltcG9ydCB7XG4gIFRlbXBsYXRlUG9ydGFsRGlyZWN0aXZlLFxuICBDb21wb25lbnRQb3J0YWxcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQgeyBXelNwZWVkdmlld0NvbXBvbmVudCB9IGZyb20gJy4vd3ouc3BlZWR2aWV3LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNb2NrQXBwU3RvcmUgfSBmcm9tICcuLi8uLi8uLi8uLi9zdG9yZS9zcGVjLWhlbHBlcnMvbW9jay1hcHAuc3RvcmUnO1xuaW1wb3J0IHsgRW5oYW5jZWRBc3NldCwgZW5oYW5jZUFzc2V0IH0gZnJvbSAnLi4vLi4vLi4vaW50ZXJmYWNlcy9lbmhhbmNlZC1hc3NldCc7XG5pbXBvcnQgeyBDb29yZHMsIFZpZXdwb3J0IH0gZnJvbSAnLi4vLi4vLi4vaW50ZXJmYWNlcy9jb21tb24uaW50ZXJmYWNlJztcblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG5cbiAgZGVzY3JpYmUoJ1d6IFNwZWVkdmlldyBEaXJlY3RpdmUnLCAoKSA9PiB7XG4gICAgbGV0IGRpcmVjdGl2ZVVuZGVyVGVzdDogV3pTcGVlZHZpZXdEaXJlY3RpdmUsIG1vY2t2aWV3Q29udGFpbmVyUmVmOiBhbnkgPSB7fSxcbiAgICAgIG1vY2tSZW5kZXJlcjogYW55LCBtb2NrQXBwU3RvcmU6IGFueSwgbW9ja092ZXJsYXlSZWY6IGFueSwgbW9ja092ZXJsYXk6IGFueSxcbiAgICAgIGNvbXBvbmVudEluc3RhbmNlOiBhbnk7XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgIHNweU9uKFNwZWVkVmlld1Bvc2l0aW9uQ2FsY3VsYXRvciwgJ2NhbGN1bGF0ZScpLmFuZC5yZXR1cm5WYWx1ZSh7IHg6IDEwMCwgeTogMjAwIH0pO1xuICAgICAgbW9ja1JlbmRlcmVyID0ge1xuICAgICAgICBsaXN0ZW5HbG9iYWw6IGphc21pbmUuY3JlYXRlU3B5KCdsaXN0ZW5HbG9iYWwnKVxuICAgICAgICAgIC5hbmQuY2FsbEZha2UoKGE6IGFueSwgYjogYW55LCBjOiBGdW5jdGlvbikgPT4ge1xuICAgICAgICAgICAgYygpO1xuICAgICAgICAgICAgcmV0dXJuICgpID0+IHRydWU7XG4gICAgICAgICAgfSlcbiAgICAgIH07XG4gICAgICBjb21wb25lbnRJbnN0YW5jZSA9IHtcbiAgICAgICAgbWVyZ2U6IGphc21pbmUuY3JlYXRlU3B5KCdtZXJnZScpLFxuICAgICAgICBzaG93OiBqYXNtaW5lLmNyZWF0ZVNweSgnc2hvdycpXG4gICAgICB9O1xuICAgICAgbW9ja092ZXJsYXlSZWYgPSB7XG4gICAgICAgIGF0dGFjaDogamFzbWluZS5jcmVhdGVTcHkoJ2F0dGFjaCcpLmFuZC5yZXR1cm5WYWx1ZSh7IGluc3RhbmNlOiBjb21wb25lbnRJbnN0YW5jZSB9KSxcbiAgICAgICAgZGV0YWNoOiBqYXNtaW5lLmNyZWF0ZVNweSgnZGV0YWNoJykuYW5kLnJldHVyblZhbHVlKFByb21pc2UucmVzb2x2ZSgpKSxcbiAgICAgICAgZGlzcG9zZTogamFzbWluZS5jcmVhdGVTcHkoJ2Rpc3Bvc2UnKVxuICAgICAgfTtcbiAgICAgIG1vY2tPdmVybGF5ID0ge1xuICAgICAgICBjcmVhdGU6IGphc21pbmUuY3JlYXRlU3B5KCdjcmVhdGUnKS5hbmQucmV0dXJuVmFsdWUobW9ja092ZXJsYXlSZWYpLFxuICAgICAgICBwb3NpdGlvbjogamFzbWluZS5jcmVhdGVTcHkoJ3Bvc2l0aW9uJykuYW5kLnJldHVyblZhbHVlKHtcbiAgICAgICAgICBnbG9iYWw6IGphc21pbmUuY3JlYXRlU3B5KCdnbG9iYWwnKS5hbmQucmV0dXJuVmFsdWUoe1xuICAgICAgICAgICAgdG9wOiBqYXNtaW5lLmNyZWF0ZVNweSgndG9wJykuYW5kLnJldHVyblZhbHVlKHtcbiAgICAgICAgICAgICAgbGVmdDogamFzbWluZS5jcmVhdGVTcHkoJ2xlZnQnKS5hbmQucmV0dXJuVmFsdWUoeyB4OiAxMDAsIHk6IDIwMCB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgfTtcbiAgICAgIG1vY2tBcHBTdG9yZSA9IG5ldyBNb2NrQXBwU3RvcmUoKTtcbiAgICAgIGRpcmVjdGl2ZVVuZGVyVGVzdCA9IG5ldyBXelNwZWVkdmlld0RpcmVjdGl2ZShtb2Nrdmlld0NvbnRhaW5lclJlZiwgbW9ja092ZXJsYXksIG1vY2tSZW5kZXJlciwgbW9ja0FwcFN0b3JlKTtcbiAgICAgIGRpcmVjdGl2ZVVuZGVyVGVzdC5uZ09uSW5pdCgpO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ25nT25Jbml0KCknLCAoKSA9PiB7XG5cbiAgICAgIGl0KCdTaG91bGQgYXNzaWduIGEgbmV3IGluc3RhbmNlIG9mIG92ZXJsYXkgc3RhdGUnLCAoKSA9PiB7XG4gICAgICAgIGRpcmVjdGl2ZVVuZGVyVGVzdC5uZ09uSW5pdCgpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnb25Nb3VzZUVudGVyKCknLCAoKSA9PiB7XG4gICAgICBsZXQgJGV2ZW50OiBhbnksIHNweTogYW55LCBhc3NldDogYW55O1xuICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG5cbiAgICAgICAgJGV2ZW50ID0ge1xuICAgICAgICAgIGN1cnJlbnRUYXJnZXQ6IHtcbiAgICAgICAgICAgIGdldEJvdW5kaW5nQ2xpZW50UmVjdDogKCk6IFZpZXdwb3J0ID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBib3R0b206IDM4MC4wMzEyNSxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDExNC45Njg3NSxcbiAgICAgICAgICAgICAgICBsZWZ0OiAzMjcuODI4MTI1LFxuICAgICAgICAgICAgICAgIHJpZ2h0OiA1MzIuMjE4NzUsXG4gICAgICAgICAgICAgICAgdG9wOiAyNjUuMDYyNSxcbiAgICAgICAgICAgICAgICB3aWR0aDogMjA0LjM5MDYyNSxcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGFzc2V0ID0ge1xuICAgICAgICAgICdhc3NldElkJzogMzU2MzQ4NTgsXG4gICAgICAgICAgJ25hbWUnOiAnMzQ1NDg1NzZfMDU2JyxcbiAgICAgICAgICAnbWV0YURhdGEnOiBbXSxcbiAgICAgICAgICAndGh1bWJuYWlsJzoge1xuICAgICAgICAgICAgJ25hbWUnOiAndGh1bWJuYWlsJyxcbiAgICAgICAgICAgICd1cmxzJzoge1xuICAgICAgICAgICAgICAnaHR0cHMnOiAnaHR0cHM6Ly90ZXN0LmpwZydcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgICdzbWFsbFByZXZpZXcnOiB7XG4gICAgICAgICAgICAnbmFtZSc6ICdxdWlja1ByZXZpZXcnLFxuICAgICAgICAgICAgJ3VybHMnOiB7XG4gICAgICAgICAgICAgICdodHRwcyc6ICdodHRwczovL3Rlc3QuZmx2J1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgJ2hhc0Rvd25sb2FkYWJsZUNvbXAnOiBmYWxzZVxuICAgICAgICB9O1xuICAgICAgICBkaXJlY3RpdmVVbmRlclRlc3Qud3pTcGVlZHZpZXcgPSBlbmhhbmNlQXNzZXQoYXNzZXQsICdzZWFyY2gnKTtcbiAgICAgICAgc3B5ID0gbW9ja0FwcFN0b3JlLmNyZWF0ZUFjdGlvbkZhY3RvcnlNZXRob2QoJ3NwZWVkUHJldmlldycsICdsb2FkJyk7XG4gICAgICB9KTtcblxuICAgICAgZGVzY3JpYmUoJ2xvYWRPdmVybGF5KCknLCAoKSA9PiB7XG4gICAgICAgIGl0KCdTaG91bGQgY2FsbCB0aGUgc3BlZWR2aWV3IHBvc2l0aW9uIGNhbGN1bGF0b3Igd2l0aCB0aGUgdmlldyBwb3J0JywgKCkgPT4ge1xuICAgICAgICAgIGRpcmVjdGl2ZVVuZGVyVGVzdC5vbk1vdXNlRW50ZXIoJGV2ZW50KTtcbiAgICAgICAgICBleHBlY3QoU3BlZWRWaWV3UG9zaXRpb25DYWxjdWxhdG9yLmNhbGN1bGF0ZSkudG9IYXZlQmVlbkNhbGxlZFdpdGgoe1xuICAgICAgICAgICAgYm90dG9tOiAzODAuMDMxMjUsXG4gICAgICAgICAgICBoZWlnaHQ6IDExNC45Njg3NSxcbiAgICAgICAgICAgIGxlZnQ6IDMyNy44MjgxMjUsXG4gICAgICAgICAgICByaWdodDogNTMyLjIxODc1LFxuICAgICAgICAgICAgdG9wOiAyNjUuMDYyNSxcbiAgICAgICAgICAgIHdpZHRoOiAyMDQuMzkwNjI1LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIGNvbmZpZ3VyZSB0aGUgcG9zaXRpb24gY29ycmVjdGx5JywgKCkgPT4ge1xuICAgICAgICAgIGRpcmVjdGl2ZVVuZGVyVGVzdC5vbk1vdXNlRW50ZXIoJGV2ZW50KTtcbiAgICAgICAgICBleHBlY3QobW9ja092ZXJsYXkucG9zaXRpb24pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICBleHBlY3QobW9ja092ZXJsYXkucG9zaXRpb24oKS5nbG9iYWwpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICBleHBlY3QobW9ja092ZXJsYXkucG9zaXRpb24oKS5nbG9iYWwoKS50b3ApLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKCcyMDBweCcpO1xuICAgICAgICAgIGV4cGVjdChtb2NrT3ZlcmxheS5wb3NpdGlvbigpLmdsb2JhbCgpLnRvcCgpLmxlZnQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKCcxMDBweCcpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIGNyZWF0ZSBhIG5ldyBvdmVybGF5JywgKCkgPT4ge1xuICAgICAgICAgIGxldCBvdmVybGF5U3RhdGU6IE92ZXJsYXlDb25maWcgPSBuZXcgT3ZlcmxheUNvbmZpZygpO1xuICAgICAgICAgIG92ZXJsYXlTdGF0ZS5wb3NpdGlvblN0cmF0ZWd5ID0geyB4OiAxMDAsIHk6IDIwMCB9IGFzIGFueTtcbiAgICAgICAgICBkaXJlY3RpdmVVbmRlclRlc3Qub25Nb3VzZUVudGVyKCRldmVudCk7XG4gICAgICAgICAgZXhwZWN0KG1vY2tPdmVybGF5LmNyZWF0ZSkudG9IYXZlQmVlbkNhbGxlZFdpdGgob3ZlcmxheVN0YXRlKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgZGVzY3JpYmUoJ2xvYWRTcGVlZFZpZXcoKScsICgpID0+IHtcbiAgICAgICAgaXQoJ1Nob3VsZCBhdHRhY2ggdGhlIHNwZWVkIHZpZXcgY29tcG9uZW50IHRvIHRoZSBvdmVybGF5JywgKCkgPT4ge1xuICAgICAgICAgIGRpcmVjdGl2ZVVuZGVyVGVzdC5vbk1vdXNlRW50ZXIoJGV2ZW50KTtcbiAgICAgICAgICBleHBlY3QobW9ja092ZXJsYXlSZWYuYXR0YWNoKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChcbiAgICAgICAgICAgIG5ldyBDb21wb25lbnRQb3J0YWwoV3pTcGVlZHZpZXdDb21wb25lbnQsIHt9IGFzIGFueSlcbiAgICAgICAgICApO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnU2hvdWxkIG1lcmdlIHRoZSBwb3N0ZXIgdXJsIG9udG8gdGhlIHNwZWVkdmlldyB3aGlsZSB3ZSB3YWl0IGZvciB0aGUgdmlkZW8gdG8gc3RhcnQgcGxheWluZycsICgpID0+IHtcbiAgICAgICAgICBkaXJlY3RpdmVVbmRlclRlc3Qub25Nb3VzZUVudGVyKCRldmVudCk7XG4gICAgICAgICAgZXhwZWN0KGNvbXBvbmVudEluc3RhbmNlLm1lcmdlKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCh7IHBvc3RlclVybDogJ2h0dHBzOi8vdGVzdC5qcGcnIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnU2hvdWxkIGNhbGwgdGhlIHNob3cgbWV0aG9kIG9uIHRoZSBjb21wb25lbnQgaW5zdGFuY2UnLCAoKSA9PiB7XG4gICAgICAgICAgZGlyZWN0aXZlVW5kZXJUZXN0Lm9uTW91c2VFbnRlcigkZXZlbnQpO1xuICAgICAgICAgIGV4cGVjdChjb21wb25lbnRJbnN0YW5jZS5zaG93KS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgaXQoJ1Nob3VsZCBtZXJnZSB0aGUgbmV3IHNwZWVkdmlldyBkYXRhIGludG8gdGhlIGNvbXBvbmVudCB3aGVuIGxvYWRlZCcsICgpID0+IHtcbiAgICAgICAgICBjb25zdCBlbmhhbmNlZEFzc2V0VW5kZXJUZXN0ID0gZW5oYW5jZUFzc2V0KGFzc2V0LCAnc2VhcmNoJyk7XG4gICAgICAgICAgbW9ja0FwcFN0b3JlLmNyZWF0ZVN0YXRlRWxlbWVudCgnc3BlZWRQcmV2aWV3JywgMzU2MzQ4NTgsIGVuaGFuY2VkQXNzZXRVbmRlclRlc3QpO1xuICAgICAgICAgIGRpcmVjdGl2ZVVuZGVyVGVzdC5vbk1vdXNlRW50ZXIoJGV2ZW50KTtcbiAgICAgICAgICBleHBlY3QoY29tcG9uZW50SW5zdGFuY2UubWVyZ2UuY2FsbHMuYWxsQXJncygpKVxuICAgICAgICAgICAgLnRvRXF1YWwoW1t7IHBvc3RlclVybDogJ2h0dHBzOi8vdGVzdC5qcGcnIH1dLCBbZW5oYW5jZWRBc3NldFVuZGVyVGVzdF1dKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgZGVzY3JpYmUoJ2Rlc3Ryb3lTcGVlZFZpZXcoKScsICgpID0+IHtcbiAgICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgICAgY29uc3QgZW5oYW5jZWRBc3NldFVuZGVyVGVzdCA9IGVuaGFuY2VBc3NldChhc3NldCwgJ3NlYXJjaCcpO1xuICAgICAgICAgIG1vY2tBcHBTdG9yZS5jcmVhdGVTdGF0ZUVsZW1lbnQoJ3NwZWVkUHJldmlldycsIDM1NjM0ODU4LCBlbmhhbmNlZEFzc2V0VW5kZXJUZXN0KTtcbiAgICAgICAgICBkaXJlY3RpdmVVbmRlclRlc3Qub25Nb3VzZUVudGVyKCRldmVudCk7XG4gICAgICAgIH0pO1xuICAgICAgICBkZXNjcmliZSgnbmdPbkRlc3Ryb3koKScsICgpID0+IHtcbiAgICAgICAgICBpdCgnc2hvdWxkIGRlc3Ryb3kgdGhlIHNwZWVkIHZpZXcnLCAoKSA9PiB7XG4gICAgICAgICAgICBkaXJlY3RpdmVVbmRlclRlc3QubmdPbkRlc3Ryb3koKTtcbiAgICAgICAgICAgIGV4cGVjdChtb2NrT3ZlcmxheVJlZi5kaXNwb3NlKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBkZXNjcmliZSgnb25Nb3VzZUxlYXZlKCknLCAoKSA9PiB7XG4gICAgICAgICAgaXQoJ3Nob3VsZCBkZXN0cm95IHRoZSBzcGVlZCB2aWV3JywgKCkgPT4ge1xuICAgICAgICAgICAgZGlyZWN0aXZlVW5kZXJUZXN0Lm9uTW91c2VMZWF2ZSgpO1xuICAgICAgICAgICAgZXhwZWN0KG1vY2tPdmVybGF5UmVmLmRpc3Bvc2UpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgZGVzY3JpYmUoJ29uQ2xpY2soKScsICgpID0+IHtcbiAgICAgICAgaXQoJ3Nob3VsZCBkZXN0cm95IHRoZSBzcGVlZCB2aWV3JywgKCkgPT4ge1xuICAgICAgICAgIGRpcmVjdGl2ZVVuZGVyVGVzdC5vbkNsaWNrKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG4iXX0=
