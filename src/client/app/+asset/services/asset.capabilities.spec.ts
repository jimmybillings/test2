import { AssetCapabilities } from './asset.capabilities';

export function main() {
  describe('Asset Capabilities', () => {
    let capabilitiesUnderTest: AssetCapabilities;
    let mockCurrentUser: any;

    function instantiator(hasPerm: boolean) {
      mockCurrentUser = { hasPermission: () => hasPerm };
      return new AssetCapabilities(mockCurrentUser, null);
    }

    describe('viewAdvancedPlayer()', () => {
      describe('returns true', () => {
        it('when the user can create subclips', () => {
          capabilitiesUnderTest = instantiator(true);
          expect(capabilitiesUnderTest.viewAdvancedPlayer({ metadata: { 'Format.FrameRate': '27' } } as any, false));
        });

        it('when the asset is shared', () => {
          capabilitiesUnderTest = instantiator(false);
          expect(capabilitiesUnderTest.viewAdvancedPlayer({} as any, true));
        });
      });

      describe('returns false', () => {
        it('when the user cannot create subclips and the asset is not shared', () => {
          capabilitiesUnderTest = instantiator(false);
          expect(capabilitiesUnderTest.viewAdvancedPlayer({} as any, false));
        });
      });
    });
  });
};

