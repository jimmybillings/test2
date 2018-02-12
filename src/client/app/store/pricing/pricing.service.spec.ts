import { PricingService } from './pricing.service';
import { MockApiService, mockApiMatchers } from '../spec-helpers/mock-api.service';
import { Api } from '../../shared/interfaces/api.interface';

export function main() {
  describe('Pricing Service', () => {
    let serviceUnderTest: PricingService;
    let mockApiService: MockApiService;
    const mockMarkers: any = {
      in: {
        asMilliseconds: () => 1000
      },
      out: {
        asMilliseconds: () => 10000
      }
    };

    beforeEach(() => {
      jasmine.addMatchers(mockApiMatchers);
      mockApiService = new MockApiService();
      serviceUnderTest = new PricingService(mockApiService.injector);
    });

    describe('getPrice()', () => {
      describe('calls the apiService correctly', () => {
        it('with markers', () => {
          serviceUnderTest.getPrice({ some: 'attribute' }, 12345, mockMarkers);

          expect(mockApiService.get).toHaveBeenCalledWithApi(Api.Orders);
          expect(mockApiService.get).toHaveBeenCalledWithEndpoint('priceBook/price/12345');
          expect(mockApiService.get).toHaveBeenCalledWithParameters({
            region: 'AAA',
            attributes: 'some:attribute',
            startSecond: 1000,
            endSecond: 10000
          });
        });

        it('without markers', () => {
          serviceUnderTest.getPrice({ some: 'attribute' }, 12345);

          expect(mockApiService.get).toHaveBeenCalledWithApi(Api.Orders);
          expect(mockApiService.get).toHaveBeenCalledWithEndpoint('priceBook/price/12345');
          expect(mockApiService.get).toHaveBeenCalledWithParameters({
            region: 'AAA',
            attributes: 'some:attribute'
          });
        });
      });


      it('maps the response to a number', () => {
        mockApiService.getResponse = { price: 1000, some: 'other data', that: 'we dont care about' };

        serviceUnderTest.getPrice({ some: 'attributes' }, 12345, mockMarkers).subscribe(res => {
          expect(res).toBe(1000);
        });
      });
    });

    describe('getPriceAttributes', () => {
      it('calls the apiService correctly', () => {
        serviceUnderTest.getPriceAttributes('Rights Managed');

        expect(mockApiService.get).toHaveBeenCalledWithApi(Api.Orders);
        expect(mockApiService.get).toHaveBeenCalledWithEndpoint('priceBook/priceAttributes');
        expect(mockApiService.get).toHaveBeenCalledWithParameters({ region: 'AAA', priceModel: 'RightsManaged' });
      });

      it('maps the response to an array of price attributes', () => {
        mockApiService.getResponse = { list: [{ some: 'attribute' }, { some: 'otherAttribute' }] };

        serviceUnderTest.getPriceAttributes('Rights Managed').subscribe(res => {
          expect(res).toEqual([{ some: 'attribute', primary: true }, { some: 'otherAttribute' }]);
        });
      });
    });
  });
}
