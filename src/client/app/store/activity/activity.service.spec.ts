import { ActivityService } from './activity.service';
import { MockApiService, mockApiMatchers } from '../spec-helpers/mock-api.service';
import { Api } from '../../shared/interfaces/api.interface';

export function main() {
  describe('Activity Service', () => {
    let serviceUnderTest: ActivityService;
    let mockApiService: MockApiService;
    let mockCurrentUserService: any;

    beforeEach(() => {
      jasmine.addMatchers(mockApiMatchers);
      mockApiService = new MockApiService();
      mockCurrentUserService = { state: { id: 123 } };
      serviceUnderTest = new ActivityService(mockApiService.injector, mockCurrentUserService);
    });

    describe('record()', () => {
      it('calls the api service correctly', () => {
        serviceUnderTest.record({ some: 'options' } as any);

        expect(mockApiService.post).toHaveBeenCalledWithApi(Api.Identities);
        expect(mockApiService.post).toHaveBeenCalledWithEndpoint('activityAudit');
        expect(mockApiService.post).toHaveBeenCalledWithBody({ some: 'options', userId: 123 });
      });
    });
  });
}
