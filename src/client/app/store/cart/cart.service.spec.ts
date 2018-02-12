import { FutureCartService } from './cart.service';
import { MockApiService, mockApiMatchers } from '../spec-helpers/mock-api.service';
import { Api } from '../../shared/interfaces/api.interface';
import { Frame } from '../../shared/modules/wazee-frame-formatter/index';

export function main() {
  describe('Future Cart Service', () => {
    let serviceUnderTest: FutureCartService, mockApiService: MockApiService;

    beforeEach(() => {
      jasmine.addMatchers(mockApiMatchers);
      mockApiService = new MockApiService();
      serviceUnderTest = new FutureCartService(mockApiService.injector);
    });

    describe('load()', () => {
      it('calls the api service correctly', () => {
        serviceUnderTest.load();

        expect(mockApiService.get).toHaveBeenCalledWithApi(Api.Orders);
        expect(mockApiService.get).toHaveBeenCalledWithEndpoint('cart');
        expect(mockApiService.get).toHaveBeenCalledWithLoading();
      });
    });

    describe('editLineItem()', () => {
      describe('calls the api service correctly', () => {
        it('when called with markers and attributes', () => {
          serviceUnderTest.editLineItem(
            { id: 3, asset: { some: 'asset' } } as any,
            { in: new Frame(30).setFromFrameNumber(30), out: new Frame(30).setFromFrameNumber(60) },
            [{ priceAttributeName: 'some', selectedAttributeValue: 'attribute' } as any]
          );

          expect(mockApiService.put).toHaveBeenCalledWithApi(Api.Orders);
          expect(mockApiService.put).toHaveBeenCalledWithEndpoint('cart/update/lineItem/3');
          expect(mockApiService.put).toHaveBeenCalledWithLoading(true);
          expect(mockApiService.put).toHaveBeenCalledWithBody({
            id: 3,
            asset: { some: 'asset', timeStart: 1000, timeEnd: 2000 },
            attributes: [
              { priceAttributeName: 'some', selectedAttributeValue: 'attribute' }
            ]
          });
          expect(mockApiService.put).toHaveBeenCalledWithParameters({ region: 'AAA' });
        });

        it('when just called with attributes', () => {
          serviceUnderTest.editLineItem(
            { id: 3, asset: { some: 'asset', timeStart: 333, timeEnd: 999 } } as any,
            null,
            [{ priceAttributeName: 'some', selectedAttributeValue: 'attribute' } as any]
          );

          expect(mockApiService.put).toHaveBeenCalledWithApi(Api.Orders);
          expect(mockApiService.put).toHaveBeenCalledWithEndpoint('cart/update/lineItem/3');
          expect(mockApiService.put).toHaveBeenCalledWithLoading(true);
          expect(mockApiService.put).toHaveBeenCalledWithBody({
            id: 3,
            asset: { some: 'asset', timeStart: 333, timeEnd: 999 },
            attributes: [
              { priceAttributeName: 'some', selectedAttributeValue: 'attribute' }
            ]
          });
          expect(mockApiService.put).toHaveBeenCalledWithParameters({ region: 'AAA' });
        });

        it('when just called with markers', () => {
          serviceUnderTest.editLineItem(
            {
              id: 3,
              asset: { some: 'asset' }
            } as any,
            { in: new Frame(30).setFromFrameNumber(30), out: new Frame(30).setFromFrameNumber(60) },
            null
          );

          expect(mockApiService.put).toHaveBeenCalledWithApi(Api.Orders);
          expect(mockApiService.put).toHaveBeenCalledWithEndpoint('cart/update/lineItem/3');
          expect(mockApiService.put).toHaveBeenCalledWithLoading(true);
          expect(mockApiService.put).toHaveBeenCalledWithBody({
            id: 3,
            asset: { some: 'asset', timeStart: 1000, timeEnd: 2000 },
            attributes: []
          });
          expect(mockApiService.put).toHaveBeenCalledWithParameters({ region: 'AAA' });
        });
      });
    });

    describe('removeAsset()', () => {
      it('calls the API correctly', () => {
        serviceUnderTest.removeAsset({ uuid: 'ABCD' });

        expect(mockApiService.delete).toHaveBeenCalledWithApi(Api.Orders);
        expect(mockApiService.delete).toHaveBeenCalledWithEndpoint('cart/asset/ABCD');
        expect(mockApiService.delete).toHaveBeenCalledWithLoading(true);
      });
    });

    describe('addNote()', () => {
      it('replaces the first note if the field already exists', () => {
        serviceUnderTest.addNote('some note', { id: 'abc-123', notes: [{ notes: ['note'] }] });

        expect(mockApiService.put).toHaveBeenCalledWithApi(Api.Orders);
        expect(mockApiService.put).toHaveBeenCalledWithEndpoint('cart/update/lineItem/abc-123');
        expect(mockApiService.put).toHaveBeenCalledWithBody({ id: 'abc-123', notes: [{ notes: ['some note'] }] });
        expect(mockApiService.put).toHaveBeenCalledWithLoading(true);
      });

      it('adds the \'notes\' if the field doesn\'t exists', () => {
        serviceUnderTest.addNote('some note', { id: 'abc-123' });

        expect(mockApiService.put).toHaveBeenCalledWithApi(Api.Orders);
        expect(mockApiService.put).toHaveBeenCalledWithEndpoint('cart/update/lineItem/abc-123');
        expect(mockApiService.put).toHaveBeenCalledWithBody({ id: 'abc-123', notes: [{ notes: ['some note'] }] });
        expect(mockApiService.put).toHaveBeenCalledWithLoading(true);
      });
    });

    describe('removeNoteFrom()', () => {
      it('calls the apiService correctly', () => {
        serviceUnderTest.removeNoteFrom({ id: 'abc-123', some: 'lineItem', notes: [{ notes: ['some note'] }] } as any);

        expect(mockApiService.put).toHaveBeenCalledWithApi(Api.Orders);
        expect(mockApiService.put).toHaveBeenCalledWithEndpoint('cart/update/lineItem/abc-123');
        expect(mockApiService.put).toHaveBeenCalledWithBody({ id: 'abc-123', some: 'lineItem' });
        expect(mockApiService.put).toHaveBeenCalledWithLoading(true);
      });
    });
  });
}
