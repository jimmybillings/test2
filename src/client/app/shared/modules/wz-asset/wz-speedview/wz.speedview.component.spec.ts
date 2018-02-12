import { SpeedviewData } from '../../../interfaces/asset.interface';
import { WzSpeedviewComponent } from './wz.speedview.component';
import { Observable } from 'rxjs/Observable';

export function main() {
  describe('Wz Speedview Component', () => {
    let componentUnderTest: WzSpeedviewComponent;

    beforeEach(() => {
      jasmine.clock().uninstall();
      jasmine.clock().install();
      componentUnderTest = new WzSpeedviewComponent();
    });

    afterEach(() => jasmine.clock().uninstall());

    describe('speedviewAssetInfo', () => {
      it('Should initialize the SpeedViewAssetInfo object with valid values', () => {
        let speedViewData: SpeedviewData;
        componentUnderTest.speedviewAssetInfo.subscribe(data => speedViewData = data);
        expect(speedViewData)
          .toEqual({ values: [], url: '', pricingType: '', price: 0, imageQuickView: false });
      });
    });

    describe('visibility', () => {
      it('Should initialize the visibility variable to be hidden', () => {
        let visibility: VisibilityState;
        componentUnderTest.visibility.subscribe(viz => visibility = viz);
        expect(visibility)
          .toBe('hidden');
      });
    });

    describe('translationReady()', () => {
      it('should accept a meta data key for parsing and return a translation key', () => {
        expect(componentUnderTest.translationReady('Format.Duration'))
          .toEqual('assetmetadata.Format_Duration');
      });
    });

    describe('merge()', () => {

      it('Should set only the posterUrl regardless of the other properties', () => {
        componentUnderTest.merge({ posterUrl: 'testPosterUrl' });
        let speedViewData: SpeedviewData;
        componentUnderTest.speedviewAssetInfo.subscribe(data => speedViewData = data);
        expect(speedViewData).toEqual({
          values: [],
          url: '',
          pricingType: '',
          price: 0,
          imageQuickView: false,
          posterUrl: 'testPosterUrl'
        });
      });

      it('Should set the noData property and remove everything else except for the posterUrl', () => {
        componentUnderTest.speedviewAssetInfo.next({
          values: [],
          url: '',
          pricingType: '',
          price: 0,
          imageQuickView: false,
          posterUrl: 'testPosterUrl'
        });
        componentUnderTest.merge({ noData: true });
        let speedViewData: SpeedviewData;
        componentUnderTest.speedviewAssetInfo.subscribe(data => speedViewData = data);
        expect(speedViewData).toEqual({
          noData: true,
          posterUrl: 'testPosterUrl'
        });
      });

      it('Should set the noData property and remove everything else except for the posterUrl', () => {
        componentUnderTest.speedviewAssetInfo.next({
          values: [],
          url: '',
          pricingType: '',
          price: 0,
          imageQuickView: false,
          posterUrl: 'testPosterUrl'
        });
        componentUnderTest.merge({ noData: true });
        let speedViewData: SpeedviewData;
        componentUnderTest.speedviewAssetInfo.subscribe(data => speedViewData = data);
        expect(speedViewData).toEqual({
          noData: true,
          posterUrl: 'testPosterUrl'
        });
      });

      it('Should set complete speedview data and remove the noData property if defined', () => {
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
        let speedViewData: SpeedviewData;
        componentUnderTest.speedviewAssetInfo.subscribe(data => speedViewData = data);
        expect(speedViewData).toEqual({
          values: [],
          url: '',
          pricingType: '',
          price: 0,
          imageQuickView: false
        });
      });

      it('Should set complete speedview data and not attempt to remove the noData property if its undefined', () => {
        componentUnderTest.speedviewAssetInfo.next({});
        componentUnderTest.merge({
          values: [],
          url: '',
          pricingType: '',
          price: 0,
          imageQuickView: false
        });
        let speedViewData: SpeedviewData;
        componentUnderTest.speedviewAssetInfo.subscribe(data => speedViewData = data);
        expect(speedViewData).toEqual({
          values: [],
          url: '',
          pricingType: '',
          price: 0,
          imageQuickView: false
        });
      });
    });

    describe('show()', () => {
      it('Should set the visible variable to visible after a 300ms timeout', () => {
        componentUnderTest.show();
        let visibility: VisibilityState;
        componentUnderTest.visibility.subscribe(viz => visibility = viz);
        expect(visibility)
          .toBe('hidden');
        jasmine.clock().tick(340);
        expect(visibility)
          .toBe('visible');
      });
    });
  });
}
