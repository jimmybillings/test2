import { DeliveryOptionsService } from './delivery-options.service';
import { MockApiService, mockApiMatchers } from '../spec-helpers/mock-api.service';
import { Api } from '../../shared/interfaces/api.interface';
import { Frame } from '../../shared/modules/wazee-frame-formatter/frame';

export function main() {
  describe('Delivery Options Service', () => {
    let serviceUnderTest: DeliveryOptionsService;
    let mockApiService: MockApiService;
    let mockAsperaService: any;

    beforeEach(() => {
      jasmine.addMatchers(mockApiMatchers);
      mockApiService = new MockApiService();
      mockAsperaService = { initConnect: jasmine.createSpy('initConnect') };
      serviceUnderTest = new DeliveryOptionsService(mockApiService.injector, mockAsperaService);
    });

    describe('getDeliveryOptions()', () => {
      it('calls the API correctly', () => {
        serviceUnderTest.getDeliveryOptions(47);
        expect(mockApiService.get).toHaveBeenCalledWithApi(Api.Assets);
        expect(mockApiService.get).toHaveBeenCalledWithEndpoint('renditionType/deliveryOptions/47');
      });

      it('calls the API correctly, with a shareKey', () => {
        serviceUnderTest.getDeliveryOptions(47, 'abc-123');
        expect(mockApiService.get).toHaveBeenCalledWithApi(Api.Assets);
        expect(mockApiService.get).toHaveBeenCalledWithEndpoint('renditionType/deliveryOptions/47');
        expect(mockApiService.get).toHaveBeenCalledWithOverridingToken('abc-123');
      });

      it('maps the data to a more suitable format for the UI', () => {
        mockApiService.getResponse = mockApiDeliveryOptions();

        let formattedDeliveryOptions: any;
        serviceUnderTest.getDeliveryOptions(111).take(1).subscribe(options => formattedDeliveryOptions = options);
        expect(formattedDeliveryOptions).toEqual(mockFormattedDeliveryOptions());
      });

      it('returns an observable of an empty array if no options are returned by the API', () => {
        mockApiService.getResponse = {};

        let formattedDeliveryOptions: any;
        serviceUnderTest.getDeliveryOptions(111).take(1).subscribe(options => formattedDeliveryOptions = options);
        expect(formattedDeliveryOptions).toEqual([]);
      });
    });

    describe('deliverAsset()', () => {
      describe('should call the API service correctly', () => {
        it('when markers do not exist', () => {
          serviceUnderTest.deliverAsset(123, 456);

          expect(mockApiService.post).toHaveBeenCalledWithApi(Api.Orders);
          expect(mockApiService.post).toHaveBeenCalledWithEndpoint('order/deliverAsset/123');
          expect(mockApiService.post).toHaveBeenCalledWithLoading(true);
          expect(mockApiService.post).toHaveBeenCalledWithParameters({
            region: 'AAA',
            optionId: '456'
          });
        });

        it('when markers do exist', () => {
          serviceUnderTest.deliverAsset(123, 456, {
            in: new Frame(30).setFromSeconds(1),
            out: new Frame(30).setFromSeconds(10)
          });

          expect(mockApiService.post).toHaveBeenCalledWithApi(Api.Orders);
          expect(mockApiService.post).toHaveBeenCalledWithEndpoint('order/deliverAsset/123');
          expect(mockApiService.post).toHaveBeenCalledWithLoading(true);
          expect(mockApiService.post).toHaveBeenCalledWithParameters({
            region: 'AAA',
            optionId: '456',
            startTime: '1000',
            endTime: '10000'
          });
        });
      });
    });

    describe('initializeAsperaConnection', () => {
      it('calls \'initConnect()\' on the aspera service', () => {
        serviceUnderTest.initializeAsperaConnection('wow');

        expect(mockAsperaService.initConnect).toHaveBeenCalledWith('wow');
      });
    });
  });

  function mockApiDeliveryOptions(): { list: any[] } {
    return {
      list: [
        {
          deliveryOptionId: 5,
          deliveryOptionLabel: 'Watermarked Comp',
          renditionUrl: 'someUrl'
        },
        {
          deliveryOptionId: 7,
          deliveryOptionLabel: 'On Demand Comp'
        },
        {
          deliveryOptionId: 8,
          deliveryOptionLabel: 'Direct Download',
          deliveryOptionGroupId: 'directDown',
          deliveryOptionGroupOrder: '2',
          renditionUrl: 'someUrl'
        },
        {
          deliveryOptionId: 9,
          deliveryOptionLabel: 'Direct Download Aspera',
          deliveryOptionGroupId: 'directDown',
          deliveryOptionGroupOrder: '1',
          renditionUrl: 'someUrl'
        }
      ]
    };
  }

  function mockFormattedDeliveryOptions(): Array<any[]> {
    return [
      [
        {
          deliveryOptionId: 5,
          deliveryOptionLabel: 'Watermarked Comp',
          renditionUrl: 'someUrl'
        }
      ],
      [
        {
          deliveryOptionId: 7,
          deliveryOptionLabel: 'On Demand Comp'
        }
      ],
      [
        {
          deliveryOptionId: 9,
          deliveryOptionLabel: 'Direct Download Aspera',
          deliveryOptionGroupId: 'directDown',
          deliveryOptionGroupOrder: '1',
          renditionUrl: 'someUrl'
        },
        {
          deliveryOptionId: 8,
          deliveryOptionLabel: 'Direct Download',
          deliveryOptionGroupId: 'directDown',
          deliveryOptionGroupOrder: '2',
          renditionUrl: 'someUrl'
        }
      ]
    ];
  }
}


