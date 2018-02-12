import { Observable } from 'rxjs/Observable';

import { GalleryViewResolver } from './gallery-view.resolver';

export function main() {
  describe('Gallery View Resolver', () => {
    let resolverUnderTest: GalleryViewResolver;
    let mockService: any;
    let mockRoute: any;
    let mockEmptyRoute: any;

    beforeEach(() => {
      mockService = { load: jasmine.createSpy('load').and.returnValue(Observable.of({ some: 'object' })) };
      mockRoute = { params: { path: '[{"names":["Name 1"],"ids":[1]},{"names":["Name 2"],"ids":[2]}]' } };
      mockEmptyRoute = { params: {} };

      resolverUnderTest = new GalleryViewResolver(mockService);
    });

    describe('resolve()', () => {
      it('tells the service to load children for the appropriate path', () => {
        resolverUnderTest.resolve(mockRoute);

        expect(mockService.load).toHaveBeenCalledWith([{ ids: [1], names: ['Name 1'] }, { ids: [2], names: ['Name 2'] }]);
      });

      it('returns the service\'s returned observable', () => {
        resolverUnderTest.resolve(mockRoute).subscribe(returnObject => expect(returnObject).toEqual({ some: 'object' }));
      });

      it('tells the service to load an empty path if there are no route parameters', () => {
        resolverUnderTest.resolve(mockEmptyRoute);

        expect(mockService.load).toHaveBeenCalledWith([]);
      });
    });
  });
}
