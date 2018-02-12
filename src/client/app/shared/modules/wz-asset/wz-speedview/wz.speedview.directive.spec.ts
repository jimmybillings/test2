import { WzSpeedviewDirective } from './wz.speedview.directive';
import { Observable } from 'rxjs/Observable';
import { SpeedViewPositionCalculator } from './wz.speedview-position-calculator';
import { ViewContainerRef } from '@angular/core';
import {
  OverlayConfig,
  OverlayRef,
  Overlay,
  GlobalPositionStrategy,
} from '@angular/cdk/overlay';

import {
  TemplatePortalDirective,
  ComponentPortal
} from '@angular/cdk/portal';
import { WzSpeedviewComponent } from './wz.speedview.component';
import { MockAppStore } from '../../../../store/spec-helpers/mock-app.store';
import { EnhancedAsset, enhanceAsset } from '../../../interfaces/enhanced-asset';
import { Coords, Viewport } from '../../../interfaces/common.interface';

export function main() {

  describe('Wz Speedview Directive', () => {
    let directiveUnderTest: WzSpeedviewDirective, mockviewContainerRef: any = {},
      mockRenderer: any, mockAppStore: any, mockOverlayRef: any, mockOverlay: any,
      componentInstance: any;

    beforeEach(() => {
      spyOn(SpeedViewPositionCalculator, 'calculate').and.returnValue({ x: 100, y: 200 });
      mockRenderer = {
        listenGlobal: jasmine.createSpy('listenGlobal')
          .and.callFake((a: any, b: any, c: Function) => {
            c();
            return () => true;
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
      mockAppStore = new MockAppStore();
      directiveUnderTest = new WzSpeedviewDirective(mockviewContainerRef, mockOverlay, mockRenderer, mockAppStore);
      directiveUnderTest.ngOnInit();
    });

    describe('ngOnInit()', () => {

      it('Should assign a new instance of overlay state', () => {
        directiveUnderTest.ngOnInit();
      });
    });

    describe('onMouseEnter()', () => {
      let $event: any, spy: any, asset: any;
      beforeEach(() => {

        $event = {
          currentTarget: {
            getBoundingClientRect: (): Viewport => {
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
        directiveUnderTest.wzSpeedview = enhanceAsset(asset, 'search');
        spy = mockAppStore.createActionFactoryMethod('speedPreview', 'load');
      });

      describe('loadOverlay()', () => {
        it('Should call the speedview position calculator with the view port', () => {
          directiveUnderTest.onMouseEnter($event);
          expect(SpeedViewPositionCalculator.calculate).toHaveBeenCalledWith({
            bottom: 380.03125,
            height: 114.96875,
            left: 327.828125,
            right: 532.21875,
            top: 265.0625,
            width: 204.390625,
          });
        });

        it('should configure the position correctly', () => {
          directiveUnderTest.onMouseEnter($event);
          expect(mockOverlay.position).toHaveBeenCalled();
          expect(mockOverlay.position().global).toHaveBeenCalled();
          expect(mockOverlay.position().global().top).toHaveBeenCalledWith('200px');
          expect(mockOverlay.position().global().top().left).toHaveBeenCalledWith('100px');
        });

        it('should create a new overlay', () => {
          let overlayState: OverlayConfig = new OverlayConfig();
          overlayState.positionStrategy = { x: 100, y: 200 } as any;
          directiveUnderTest.onMouseEnter($event);
          expect(mockOverlay.create).toHaveBeenCalledWith(overlayState);
        });
      });

      describe('loadSpeedView()', () => {
        it('Should attach the speed view component to the overlay', () => {
          directiveUnderTest.onMouseEnter($event);
          expect(mockOverlayRef.attach).toHaveBeenCalledWith(
            new ComponentPortal(WzSpeedviewComponent, {} as any)
          );
        });

        it('Should merge the poster url onto the speedview while we wait for the video to start playing', () => {
          directiveUnderTest.onMouseEnter($event);
          expect(componentInstance.merge).toHaveBeenCalledWith({ posterUrl: 'https://test.jpg' });
        });

        it('Should call the show method on the component instance', () => {
          directiveUnderTest.onMouseEnter($event);
          expect(componentInstance.show).toHaveBeenCalled();
        });


        it('Should merge the new speedview data into the component when loaded', () => {
          const enhancedAssetUnderTest = enhanceAsset(asset, 'search');
          mockAppStore.createStateElement('speedPreview', 35634858, enhancedAssetUnderTest);
          directiveUnderTest.onMouseEnter($event);
          expect(componentInstance.merge.calls.allArgs())
            .toEqual([[{ posterUrl: 'https://test.jpg' }], [enhancedAssetUnderTest]]);
        });
      });

      describe('destroySpeedView()', () => {
        beforeEach(() => {
          const enhancedAssetUnderTest = enhanceAsset(asset, 'search');
          mockAppStore.createStateElement('speedPreview', 35634858, enhancedAssetUnderTest);
          directiveUnderTest.onMouseEnter($event);
        });
        describe('ngOnDestroy()', () => {
          it('should destroy the speed view', () => {
            directiveUnderTest.ngOnDestroy();
            expect(mockOverlayRef.dispose).toHaveBeenCalled();
          });
        });
        describe('onMouseLeave()', () => {
          it('should destroy the speed view', () => {
            directiveUnderTest.onMouseLeave();
            expect(mockOverlayRef.dispose).toHaveBeenCalled();
          });
        });
      });

      describe('onClick()', () => {
        it('should destroy the speed view', () => {
          directiveUnderTest.onClick();
        });
      });
    });
  });
}

