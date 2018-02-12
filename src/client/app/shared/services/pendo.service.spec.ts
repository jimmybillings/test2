import { PendoService } from './pendo.service';

export function main() {
  describe('Pendo Service', () => {
    let serviceUnderTest: PendoService;
    let mockUser: any;
    (<any>window).pendo = {};

    beforeEach(() => {
      serviceUnderTest = new PendoService();
      (<any>window).pendo = {
        initialize: jasmine.createSpy('initialize')
      };
      mockUser = {
        accountId: 1,
        id: 25,
        firstName: 'ross',
        lastName: 'edfort',
        siteName: 'core',
        emailAddress: 'ross.edfort@wazeedigital.com'
      };
    });

    describe('initialize()', () => {
      it('Should initialize pendo correctly', () => {
        serviceUnderTest.initialize({
          siteName: 'core',
          id: 1,
          firstName: 'ross',
          lastName: 'edfort',
          accountId: '25',
          emailAddress: 'ross.edfort@wazeedigital.com'
        } as any);
        expect((<any>window).pendo.initialize).toHaveBeenCalledWith({
          apiKey: '7e5da402-5d29-41b0-5579-6e149b0a28f2',
          visitor: { id: 'core-1-ross-edfort', email: 'ross.edfort@wazeedigital.com' },
          account: { id: 'core-25' }
        });
      });
    });
  });
}
