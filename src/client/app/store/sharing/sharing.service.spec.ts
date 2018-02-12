import { SharingService } from './sharing.service';
import { MockApiService, mockApiMatchers } from '../spec-helpers/mock-api.service';
import { Api } from '../../shared/interfaces/api.interface';
import { Frame } from '../../shared/modules/wazee-frame-formatter/index';

export function main() {
  describe('Sharing Service', () => {
    let serviceUnderTest: SharingService, mockApiService: MockApiService;

    beforeEach(() => {
      jasmine.clock().install();

      // mock "now" === November 12, 2017 at 13:14:15 and 16 ms
      //
      // Someone needs to smack whomever created JS's Date() and decided that months are zero-based, but all other values are
      // one-based.  That's why November is specified as 10.
      //
      // NOTE also that there is no direct way to specify a mock time zone in Jasmine's clock().  Thus, this spec will fail
      // if run outside the Mountain time zone.
      jasmine.clock().mockDate(new Date(2017, 10, 12, 13, 14, 15, 16));

      jasmine.addMatchers(mockApiMatchers);
      mockApiService = new MockApiService();
      serviceUnderTest = new SharingService(mockApiService.injector, { state: { emailAddress: 'test@gmail.com' } } as any);
    });

    afterEach(() => {
      jasmine.clock().uninstall();
    });

    describe('createAssetShareLink()', () => {
      it('Should call the api correctly to create a share link', () => {
        serviceUnderTest.createAssetShareLink(1234, {
          in: undefined,
          out: undefined
        }).subscribe();

        expect(mockApiService.post).toHaveBeenCalledWithApi(Api.Identities);
        expect(mockApiService.post).toHaveBeenCalledWithEndpoint('accessInfo');
        expect(mockApiService.post).toHaveBeenCalledWithBody({
          type: 'asset',
          accessInfo: '1234',
          accessStartDate: '2017-11-12T13:14:15-07:00',
          accessEndDate: '2017-11-22T13:14:15-07:00',
          properties: null
        });
      });
    });

    describe('emailAssetShareLink()', () => {
      it('Should call the api correctly to create a share link', () => {
        serviceUnderTest.emailAssetShareLink(
          1234,
          {
            in: undefined,
            out: undefined
          },
          {
            recipientEmails: 'james.billings@wazeedigital.com',
            comment: 'Some Comment',
            copyMe: true
          },
          {
            some: 'properties'
          }
        ).subscribe();

        expect(mockApiService.post).toHaveBeenCalledWithApi(Api.Identities);
        expect(mockApiService.post).toHaveBeenCalledWithEndpoint('accessInfo');
        expect(mockApiService.post).toHaveBeenCalledWithBody({
          type: 'asset',
          accessInfo: '1234',
          accessStartDate: '2017-11-12T13:14:15-07:00',
          accessEndDate: '2017-11-22T13:14:15-07:00',
          properties: { some: 'properties' },
          recipientEmails: [
            'james.billings@wazeedigital.com', 'test@gmail.com'
          ],
          comment: 'Some Comment'
        });
      });

      it('handles specified markers', () => {
        serviceUnderTest.emailAssetShareLink(
          1234,
          {
            in: new Frame(30).setFromSeconds(1),
            out: new Frame(30).setFromSeconds(2)
          },
          {
            recipientEmails: 'james.billings@wazeedigital.com',
            comment: 'Some Comment',
            copyMe: true
          },
          {
            some: 'properties'
          }
        ).subscribe();

        expect(mockApiService.post).toHaveBeenCalledWithBody({
          type: 'asset',
          accessInfo: '1234',
          accessStartDate: '2017-11-12T13:14:15-07:00',
          accessEndDate: '2017-11-22T13:14:15-07:00',
          properties: {
            timeStart: 1000,
            timeEnd: 2000,
            some: 'properties'
          },
          recipientEmails: [
            'james.billings@wazeedigital.com', 'test@gmail.com'
          ],
          comment: 'Some Comment'
        });
      });

      it('handles undefined markers', () => {
        serviceUnderTest.emailAssetShareLink(
          1234,
          undefined,
          {
            recipientEmails: 'james.billings@wazeedigital.com',
            comment: 'Some Comment',
            copyMe: true
          },
          {
            some: 'properties'
          }
        ).subscribe();

        expect(mockApiService.post).toHaveBeenCalledWithBody({
          type: 'asset',
          accessInfo: '1234',
          accessStartDate: '2017-11-12T13:14:15-07:00',
          accessEndDate: '2017-11-22T13:14:15-07:00',
          properties: { some: 'properties' },
          recipientEmails: [
            'james.billings@wazeedigital.com', 'test@gmail.com'
          ],
          comment: 'Some Comment'
        });
      });

      it('handles null markers', () => {
        serviceUnderTest.emailAssetShareLink(
          1234,
          null,
          {
            recipientEmails: 'james.billings@wazeedigital.com',
            comment: 'Some Comment',
            copyMe: true
          },
          {
            some: 'properties'
          }
        ).subscribe();

        expect(mockApiService.post).toHaveBeenCalledWithBody({
          type: 'asset',
          accessInfo: '1234',
          accessStartDate: '2017-11-12T13:14:15-07:00',
          accessEndDate: '2017-11-22T13:14:15-07:00',
          properties: { some: 'properties' },
          recipientEmails: [
            'james.billings@wazeedigital.com', 'test@gmail.com'
          ],
          comment: 'Some Comment'
        });
      });

      it('handles copyMe = false', () => {
        serviceUnderTest.emailAssetShareLink(
          1234,
          null,
          {
            recipientEmails: 'james.billings@wazeedigital.com',
            comment: 'Some Comment',
            copyMe: false
          },
          {
            some: 'properties'
          }
        ).subscribe();

        expect(mockApiService.post).toHaveBeenCalledWithBody({
          type: 'asset',
          accessInfo: '1234',
          accessStartDate: '2017-11-12T13:14:15-07:00',
          accessEndDate: '2017-11-22T13:14:15-07:00',
          properties: { some: 'properties' },
          recipientEmails: [
            'james.billings@wazeedigital.com'
          ],
          comment: 'Some Comment'
        });
      });
    });

    describe('emailCollectionShareLink()', () => {
      it('Should call the api correctly to share a collection', () => {
        serviceUnderTest.emailCollectionShareLink(1, {
          recipientEmails: 'james.billings@wazeedigital.com',
          accessLevel: 'Viewer',
          comment: 'Some Comment'
        }).subscribe();
        expect(mockApiService.post).toHaveBeenCalledWithApi(Api.Identities);
        expect(mockApiService.post).toHaveBeenCalledWithEndpoint('collection/share');
        expect(mockApiService.post).toHaveBeenCalledWithBody({
          userEmail: [
            'james.billings@wazeedigital.com'
          ],
          collections: [
            1
          ],
          accessLevel: 'Viewer',
          comment: 'Some Comment'
        });
        expect(mockApiService.post).toHaveBeenCalledWithLoading('onBeforeRequest');
      });
    });
  });
}
