import { WzSubclipEditorComponent } from './wz.subclip-editor.component';
import { Frame } from '../../modules/wazee-frame-formatter/index';
import { EnhancedAsset } from '../../interfaces/enhanced-asset';
import { SubclipMarkers } from '../../interfaces/subclip-markers';

export function main() {
  describe('Wz Subclip Editor Component', () => {
    let componentUnderTest: WzSubclipEditorComponent;
    let inMarkerFrame: Frame = new Frame(29.97).setFromFrameNumber(42);
    let otherInMarkerFrame: Frame = new Frame(29.97).setFromFrameNumber(43);
    let outMarkerFrame: Frame = new Frame(29.97).setFromFrameNumber(4242);
    let otherOutMarkerFrame: Frame = new Frame(29.97).setFromFrameNumber(4343);

    beforeEach(() => {
      componentUnderTest = new WzSubclipEditorComponent();
      componentUnderTest.cancel.emit = jasmine.createSpy('cancel emitter');
      componentUnderTest.save.emit = jasmine.createSpy('save emitter');
    });

    describe('markersAreRemovable getter', () => {
      const tests = [
        { isSubclipped: false, in: undefined, out: undefined, state: 'markers are both unset', expectedResult: false },
        { isSubclipped: false, in: undefined, out: outMarkerFrame, state: 'out marker is set', expectedResult: false },
        { isSubclipped: false, in: inMarkerFrame, out: undefined, state: 'in marker is set', expectedResult: false },
        { isSubclipped: false, in: inMarkerFrame, out: outMarkerFrame, state: 'markers are both set', expectedResult: false },

        { isSubclipped: true, in: undefined, out: undefined, state: 'markers are both unset', expectedResult: true },
        { isSubclipped: true, in: undefined, out: outMarkerFrame, state: 'out marker is set', expectedResult: false },
        { isSubclipped: true, in: inMarkerFrame, out: undefined, state: 'in marker is set', expectedResult: false },
        { isSubclipped: true, in: inMarkerFrame, out: outMarkerFrame, state: 'markers are both set', expectedResult: false }
      ];

      tests.forEach(test => {
        describe(`when the asset ${test.isSubclipped ? 'is' : 'is not'} subclipped`, () => {
          it(`returns ${test.expectedResult} when player ${test.state}`, () => {
            componentUnderTest.enhancedAsset = { isSubclipped: test.isSubclipped } as EnhancedAsset;
            componentUnderTest.onPlayerMarkerChange({ in: test.in, out: test.out });

            expect(componentUnderTest.markersAreRemovable).toBe(test.expectedResult);
          });
        });
      });
    });

    describe('markersAreSavable and markersSaveButtonHoverTextKey getters', () => {
      // NOTE that some of these test cases technically can't happen
      // (like isSubclipped: false, playerMarkersSet: 'both', assetMarkers: 'bothSame', which means that player markers
      // are set, and the asset isn't subclipped, and the asset markers are the same as the player markers.  But the
      // test exists for completeness, and we should do the right thing in that unlikely (impossible) event anyway.
      const tests = [
        {
          isSubclipped: false, playerMarkersSet: 'neither', assetMarkers: 'bothSame', alreadyUsed: false,
          expectedResult: false, expectedHoverTextKey: 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.TITLE.ADD.NOT_READY'
        },
        {
          isSubclipped: false, playerMarkersSet: 'neither', assetMarkers: 'bothSame', alreadyUsed: true,
          expectedResult: false, expectedHoverTextKey: 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.TITLE.ADD.NOT_READY'
        },
        {
          isSubclipped: false, playerMarkersSet: 'neither', assetMarkers: 'outSame', alreadyUsed: false,
          expectedResult: false, expectedHoverTextKey: 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.TITLE.ADD.NOT_READY'
        },
        {
          isSubclipped: false, playerMarkersSet: 'neither', assetMarkers: 'outSame', alreadyUsed: true,
          expectedResult: false, expectedHoverTextKey: 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.TITLE.ADD.NOT_READY'
        },
        {
          isSubclipped: false, playerMarkersSet: 'neither', assetMarkers: 'inSame', alreadyUsed: false,
          expectedResult: false, expectedHoverTextKey: 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.TITLE.ADD.NOT_READY'
        },
        {
          isSubclipped: false, playerMarkersSet: 'neither', assetMarkers: 'inSame', alreadyUsed: true,
          expectedResult: false, expectedHoverTextKey: 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.TITLE.ADD.NOT_READY'
        },
        {
          isSubclipped: false, playerMarkersSet: 'neither', assetMarkers: 'neitherSame', alreadyUsed: false,
          expectedResult: false, expectedHoverTextKey: 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.TITLE.ADD.NOT_READY'
        },
        {
          isSubclipped: false, playerMarkersSet: 'neither', assetMarkers: 'neitherSame', alreadyUsed: true,
          expectedResult: false, expectedHoverTextKey: 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.TITLE.ADD.NOT_READY'
        },

        {
          isSubclipped: false, playerMarkersSet: 'outOnly', assetMarkers: 'bothSame', alreadyUsed: false,
          expectedResult: false, expectedHoverTextKey: 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.TITLE.ADD.NOT_READY'
        },
        {
          isSubclipped: false, playerMarkersSet: 'outOnly', assetMarkers: 'bothSame', alreadyUsed: true,
          expectedResult: false, expectedHoverTextKey: 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.TITLE.ADD.NOT_READY'
        },
        {
          isSubclipped: false, playerMarkersSet: 'outOnly', assetMarkers: 'outSame', alreadyUsed: false,
          expectedResult: false, expectedHoverTextKey: 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.TITLE.ADD.NOT_READY'
        },
        {
          isSubclipped: false, playerMarkersSet: 'outOnly', assetMarkers: 'outSame', alreadyUsed: true,
          expectedResult: false, expectedHoverTextKey: 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.TITLE.ADD.NOT_READY'
        },
        {
          isSubclipped: false, playerMarkersSet: 'outOnly', assetMarkers: 'inSame', alreadyUsed: false,
          expectedResult: false, expectedHoverTextKey: 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.TITLE.ADD.NOT_READY'
        },
        {
          isSubclipped: false, playerMarkersSet: 'outOnly', assetMarkers: 'inSame', alreadyUsed: true,
          expectedResult: false, expectedHoverTextKey: 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.TITLE.ADD.NOT_READY'
        },
        {
          isSubclipped: false, playerMarkersSet: 'outOnly', assetMarkers: 'neitherSame', alreadyUsed: false,
          expectedResult: false, expectedHoverTextKey: 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.TITLE.ADD.NOT_READY'
        },
        {
          isSubclipped: false, playerMarkersSet: 'outOnly', assetMarkers: 'neitherSame', alreadyUsed: true,
          expectedResult: false, expectedHoverTextKey: 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.TITLE.ADD.NOT_READY'
        },

        {
          isSubclipped: false, playerMarkersSet: 'inOnly', assetMarkers: 'bothSame', alreadyUsed: false,
          expectedResult: false, expectedHoverTextKey: 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.TITLE.ADD.NOT_READY'
        },
        {
          isSubclipped: false, playerMarkersSet: 'inOnly', assetMarkers: 'bothSame', alreadyUsed: true,
          expectedResult: false, expectedHoverTextKey: 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.TITLE.ADD.NOT_READY'
        },
        {
          isSubclipped: false, playerMarkersSet: 'inOnly', assetMarkers: 'outSame', alreadyUsed: false,
          expectedResult: false, expectedHoverTextKey: 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.TITLE.ADD.NOT_READY'
        },
        {
          isSubclipped: false, playerMarkersSet: 'inOnly', assetMarkers: 'outSame', alreadyUsed: true,
          expectedResult: false, expectedHoverTextKey: 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.TITLE.ADD.NOT_READY'
        },
        {
          isSubclipped: false, playerMarkersSet: 'inOnly', assetMarkers: 'inSame', alreadyUsed: false,
          expectedResult: false, expectedHoverTextKey: 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.TITLE.ADD.NOT_READY'
        },
        {
          isSubclipped: false, playerMarkersSet: 'inOnly', assetMarkers: 'inSame', alreadyUsed: true,
          expectedResult: false, expectedHoverTextKey: 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.TITLE.ADD.NOT_READY'
        },
        {
          isSubclipped: false, playerMarkersSet: 'inOnly', assetMarkers: 'neitherSame', alreadyUsed: false,
          expectedResult: false, expectedHoverTextKey: 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.TITLE.ADD.NOT_READY'
        },
        {
          isSubclipped: false, playerMarkersSet: 'inOnly', assetMarkers: 'neitherSame', alreadyUsed: true,
          expectedResult: false, expectedHoverTextKey: 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.TITLE.ADD.NOT_READY'
        },

        {
          isSubclipped: false, playerMarkersSet: 'both', assetMarkers: 'bothSame', alreadyUsed: false,
          expectedResult: false, expectedHoverTextKey: 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.TITLE.NOT_CHANGED'
        },
        {
          isSubclipped: false, playerMarkersSet: 'both', assetMarkers: 'bothSame', alreadyUsed: true,
          expectedResult: false, expectedHoverTextKey: 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.TITLE.NOT_CHANGED'
        },
        {
          isSubclipped: false, playerMarkersSet: 'both', assetMarkers: 'outSame', alreadyUsed: false,
          expectedResult: true, expectedHoverTextKey: 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.TITLE.ADD.READY'
        },
        {
          isSubclipped: false, playerMarkersSet: 'both', assetMarkers: 'outSame', alreadyUsed: true,
          expectedResult: false, expectedHoverTextKey: 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.TITLE.ALREADY_USED'
        },
        {
          isSubclipped: false, playerMarkersSet: 'both', assetMarkers: 'inSame', alreadyUsed: false,
          expectedResult: true, expectedHoverTextKey: 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.TITLE.ADD.READY'
        },
        {
          isSubclipped: false, playerMarkersSet: 'both', assetMarkers: 'inSame', alreadyUsed: true,
          expectedResult: false, expectedHoverTextKey: 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.TITLE.ALREADY_USED'
        },
        {
          isSubclipped: false, playerMarkersSet: 'both', assetMarkers: 'neitherSame', alreadyUsed: false,
          expectedResult: true, expectedHoverTextKey: 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.TITLE.ADD.READY'
        },
        {
          isSubclipped: false, playerMarkersSet: 'both', assetMarkers: 'neitherSame', alreadyUsed: true,
          expectedResult: false, expectedHoverTextKey: 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.TITLE.ALREADY_USED'
        },

        {
          isSubclipped: true, playerMarkersSet: 'neither', assetMarkers: 'bothSame', alreadyUsed: false,
          expectedResult: false, expectedHoverTextKey: 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.TITLE.UPDATE.NOT_READY'
        },
        {
          isSubclipped: true, playerMarkersSet: 'neither', assetMarkers: 'bothSame', alreadyUsed: true,
          expectedResult: false, expectedHoverTextKey: 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.TITLE.UPDATE.NOT_READY'
        },
        {
          isSubclipped: true, playerMarkersSet: 'neither', assetMarkers: 'outSame', alreadyUsed: false,
          expectedResult: false, expectedHoverTextKey: 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.TITLE.UPDATE.NOT_READY'
        },
        {
          isSubclipped: true, playerMarkersSet: 'neither', assetMarkers: 'outSame', alreadyUsed: true,
          expectedResult: false, expectedHoverTextKey: 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.TITLE.UPDATE.NOT_READY'
        },
        {
          isSubclipped: true, playerMarkersSet: 'neither', assetMarkers: 'inSame', alreadyUsed: false,
          expectedResult: false, expectedHoverTextKey: 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.TITLE.UPDATE.NOT_READY'
        },
        {
          isSubclipped: true, playerMarkersSet: 'neither', assetMarkers: 'inSame', alreadyUsed: true,
          expectedResult: false, expectedHoverTextKey: 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.TITLE.UPDATE.NOT_READY'
        },
        {
          isSubclipped: true, playerMarkersSet: 'neither', assetMarkers: 'neitherSame', alreadyUsed: false,
          expectedResult: false, expectedHoverTextKey: 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.TITLE.UPDATE.NOT_READY'
        },
        {
          isSubclipped: true, playerMarkersSet: 'neither', assetMarkers: 'neitherSame', alreadyUsed: true,
          expectedResult: false, expectedHoverTextKey: 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.TITLE.UPDATE.NOT_READY'
        },

        {
          isSubclipped: true, playerMarkersSet: 'outOnly', assetMarkers: 'bothSame', alreadyUsed: false,
          expectedResult: false, expectedHoverTextKey: 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.TITLE.UPDATE.NOT_READY'
        },
        {
          isSubclipped: true, playerMarkersSet: 'outOnly', assetMarkers: 'bothSame', alreadyUsed: true,
          expectedResult: false, expectedHoverTextKey: 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.TITLE.UPDATE.NOT_READY'
        },
        {
          isSubclipped: true, playerMarkersSet: 'outOnly', assetMarkers: 'outSame', alreadyUsed: false,
          expectedResult: false, expectedHoverTextKey: 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.TITLE.UPDATE.NOT_READY'
        },
        {
          isSubclipped: true, playerMarkersSet: 'outOnly', assetMarkers: 'outSame', alreadyUsed: true,
          expectedResult: false, expectedHoverTextKey: 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.TITLE.UPDATE.NOT_READY'
        },
        {
          isSubclipped: true, playerMarkersSet: 'outOnly', assetMarkers: 'inSame', alreadyUsed: false,
          expectedResult: false, expectedHoverTextKey: 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.TITLE.UPDATE.NOT_READY'
        },
        {
          isSubclipped: true, playerMarkersSet: 'outOnly', assetMarkers: 'inSame', alreadyUsed: true,
          expectedResult: false, expectedHoverTextKey: 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.TITLE.UPDATE.NOT_READY'
        },
        {
          isSubclipped: true, playerMarkersSet: 'outOnly', assetMarkers: 'neitherSame', alreadyUsed: false,
          expectedResult: false, expectedHoverTextKey: 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.TITLE.UPDATE.NOT_READY'
        },
        {
          isSubclipped: true, playerMarkersSet: 'outOnly', assetMarkers: 'neitherSame', alreadyUsed: true,
          expectedResult: false, expectedHoverTextKey: 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.TITLE.UPDATE.NOT_READY'
        },

        {
          isSubclipped: true, playerMarkersSet: 'inOnly', assetMarkers: 'bothSame', alreadyUsed: false,
          expectedResult: false, expectedHoverTextKey: 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.TITLE.UPDATE.NOT_READY'
        },
        {
          isSubclipped: true, playerMarkersSet: 'inOnly', assetMarkers: 'bothSame', alreadyUsed: true,
          expectedResult: false, expectedHoverTextKey: 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.TITLE.UPDATE.NOT_READY'
        },
        {
          isSubclipped: true, playerMarkersSet: 'inOnly', assetMarkers: 'outSame', alreadyUsed: false,
          expectedResult: false, expectedHoverTextKey: 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.TITLE.UPDATE.NOT_READY'
        },
        {
          isSubclipped: true, playerMarkersSet: 'inOnly', assetMarkers: 'outSame', alreadyUsed: true,
          expectedResult: false, expectedHoverTextKey: 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.TITLE.UPDATE.NOT_READY'
        },
        {
          isSubclipped: true, playerMarkersSet: 'inOnly', assetMarkers: 'inSame', alreadyUsed: false,
          expectedResult: false, expectedHoverTextKey: 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.TITLE.UPDATE.NOT_READY'
        },
        {
          isSubclipped: true, playerMarkersSet: 'inOnly', assetMarkers: 'inSame', alreadyUsed: true,
          expectedResult: false, expectedHoverTextKey: 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.TITLE.UPDATE.NOT_READY'
        },
        {
          isSubclipped: true, playerMarkersSet: 'inOnly', assetMarkers: 'neitherSame', alreadyUsed: false,
          expectedResult: false, expectedHoverTextKey: 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.TITLE.UPDATE.NOT_READY'
        },
        {
          isSubclipped: true, playerMarkersSet: 'inOnly', assetMarkers: 'neitherSame', alreadyUsed: true,
          expectedResult: false, expectedHoverTextKey: 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.TITLE.UPDATE.NOT_READY'
        },

        {
          isSubclipped: true, playerMarkersSet: 'both', assetMarkers: 'bothSame', alreadyUsed: false,
          expectedResult: false, expectedHoverTextKey: 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.TITLE.NOT_CHANGED'
        },
        {
          isSubclipped: true, playerMarkersSet: 'both', assetMarkers: 'bothSame', alreadyUsed: true,
          expectedResult: false, expectedHoverTextKey: 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.TITLE.NOT_CHANGED'
        },
        {
          isSubclipped: true, playerMarkersSet: 'both', assetMarkers: 'outSame', alreadyUsed: false,
          expectedResult: true, expectedHoverTextKey: 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.TITLE.UPDATE.READY'
        },
        {
          isSubclipped: true, playerMarkersSet: 'both', assetMarkers: 'outSame', alreadyUsed: true,
          expectedResult: false, expectedHoverTextKey: 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.TITLE.ALREADY_USED'
        },
        {
          isSubclipped: true, playerMarkersSet: 'both', assetMarkers: 'inSame', alreadyUsed: false,
          expectedResult: true, expectedHoverTextKey: 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.TITLE.UPDATE.READY'
        },
        {
          isSubclipped: true, playerMarkersSet: 'both', assetMarkers: 'inSame', alreadyUsed: true,
          expectedResult: false, expectedHoverTextKey: 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.TITLE.ALREADY_USED'
        },
        {
          isSubclipped: true, playerMarkersSet: 'both', assetMarkers: 'neitherSame', alreadyUsed: false,
          expectedResult: true, expectedHoverTextKey: 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.TITLE.UPDATE.READY'
        },
        {
          isSubclipped: true, playerMarkersSet: 'both', assetMarkers: 'neitherSame', alreadyUsed: true,
          expectedResult: false, expectedHoverTextKey: 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.TITLE.ALREADY_USED'
        }
      ];

      tests.forEach(test => {
        describe(`when asset ${test.isSubclipped ? 'is' : 'is not'} subclipped`, () => {
          let playerMarkersState: string;
          let playerMarkers: SubclipMarkers;

          switch (test.playerMarkersSet) {
            case 'neither':
              playerMarkersState = 'markers are both unset';
              playerMarkers = { in: undefined, out: undefined };
              break;
            case 'outOnly':
              playerMarkersState = 'out marker is set';
              playerMarkers = { in: undefined, out: outMarkerFrame };
              break;
            case 'inOnly':
              playerMarkersState = 'in marker is set';
              playerMarkers = { in: inMarkerFrame, out: undefined };
              break;
            case 'both':
              playerMarkersState = 'markers are both set';
              playerMarkers = { in: inMarkerFrame, out: outMarkerFrame };
              break;
            default: throw new Error('Bad value for test.playerMarkersSet!');
          }

          describe(`when player ${playerMarkersState}`, () => {
            beforeEach(() => {
              componentUnderTest.onPlayerMarkerChange(playerMarkers);
            });

            let assetMarkersDescription: string;
            let assetIn: Frame;
            let assetOut: Frame;

            switch (test.assetMarkers) {
              case 'bothSame':
                assetMarkersDescription = 'both match player markers';
                assetIn = playerMarkers.in;
                assetOut = playerMarkers.out;
                break;
              case 'outSame':
                assetMarkersDescription = 'match player out marker';
                assetIn = otherInMarkerFrame;
                assetOut = playerMarkers.out;
                break;
              case 'inSame':
                assetMarkersDescription = 'match player in marker';
                assetIn = playerMarkers.in;
                assetOut = otherOutMarkerFrame;
                break;
              case 'neitherSame':
                assetMarkersDescription = 'don\'t match either player marker';
                assetIn = otherInMarkerFrame;
                assetOut = otherOutMarkerFrame;
                break;
              default: throw new Error('Bad value for test.assetMarkers!');
            }

            describe(`when asset markers ${assetMarkersDescription}`, () => {
              it(`returns ${test.expectedResult} when player markers ${test.alreadyUsed ? 'are' : 'are not'} already used`,
                () => {
                  componentUnderTest.enhancedAsset = {
                    isSubclipped: test.isSubclipped,
                    inMarkerFrame: assetIn,
                    outMarkerFrame: assetOut,
                    subclipMarkers: { in: assetIn, out: assetOut }
                  } as any;

                  if (test.alreadyUsed) componentUnderTest.alreadyUsedMarkersList = [playerMarkers];

                  expect(componentUnderTest.markersAreSavable).toBe(test.expectedResult);
                  expect(componentUnderTest.markersSaveButtonHoverTextKey).toBe(test.expectedHoverTextKey);
                });
            });
          });
        });
      });
    });

    describe('markersAreAlreadyUsed getter', () => {
      describe('when player markers are set', () => {
        beforeEach(() => {
          componentUnderTest.onPlayerMarkerChange({ in: inMarkerFrame, out: outMarkerFrame });
        });

        it('returns true when the player markers are present in the alreadyUsedMarkersList @Input', () => {
          componentUnderTest.alreadyUsedMarkersList = [{ in: inMarkerFrame, out: outMarkerFrame }];

          expect(componentUnderTest.markersAreAlreadyUsed).toBe(true);
        });

        it('returns false when the player markers are not present in the alreadyUsedMarkersList @Input', () => {
          componentUnderTest.alreadyUsedMarkersList = [{ in: otherInMarkerFrame, out: otherOutMarkerFrame }];

          expect(componentUnderTest.markersAreAlreadyUsed).toBe(false);
        });

        it('returns false when the alreadyUsedMarkersList @Input is empty', () => {
          componentUnderTest.alreadyUsedMarkersList = [];

          expect(componentUnderTest.markersAreAlreadyUsed).toBe(false);

        });
      });

      describe('when player markers are not set', () => {
        beforeEach(() => {
          componentUnderTest.onPlayerMarkerChange({ in: undefined, out: undefined });
        });

        it('returns true when unset markers are present in the alreadyUsedMarkersList @Input (full asset)', () => {
          componentUnderTest.alreadyUsedMarkersList = [{ in: undefined, out: undefined }];

          expect(componentUnderTest.markersAreAlreadyUsed).toBe(true);
        });

        it('returns false when other markers are present in the alreadyUsedMarkersList @Input', () => {
          componentUnderTest.alreadyUsedMarkersList = [{ in: inMarkerFrame, out: outMarkerFrame }];

          expect(componentUnderTest.markersAreAlreadyUsed).toBe(false);
        });

        it('returns false when the alreadyUsedMarkersList @Input is empty', () => {
          componentUnderTest.alreadyUsedMarkersList = [];

          expect(componentUnderTest.markersAreAlreadyUsed).toBe(false);

        });
      });
    });

    describe('cancelButtonHoverTextKey getter', () => {
      it('returns the expected key when the asset is subclipped', () => {
        componentUnderTest.enhancedAsset = { isSubclipped: true } as any;

        expect(componentUnderTest.cancelButtonHoverTextKey).toBe('ASSET.SAVE_SUBCLIP.ACTION_BUTTON.CANCEL.TITLE.UPDATE');
      });

      it('returns the expected key when the asset is not subclipped', () => {
        componentUnderTest.enhancedAsset = { isSubclipped: false } as any;

        expect(componentUnderTest.cancelButtonHoverTextKey).toBe('ASSET.SAVE_SUBCLIP.ACTION_BUTTON.CANCEL.TITLE.ADD');
      });
    });

    describe('markersSaveButtonLabelKey getter', () => {
      it('returns the expected key when the asset is subclipped', () => {
        componentUnderTest.enhancedAsset = { isSubclipped: true } as any;

        expect(componentUnderTest.markersSaveButtonLabelKey).toBe('ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.LABEL.UPDATE');
      });

      it('returns the expected key when the asset is not subclipped', () => {
        componentUnderTest.enhancedAsset = { isSubclipped: false } as any;

        expect(componentUnderTest.markersSaveButtonLabelKey).toBe('ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.LABEL.ADD');
      });
    });

    describe('markersRemoveButtonHoverTextKey getter', () => {
      beforeEach(() => {
        componentUnderTest.onPlayerMarkerChange({ in: inMarkerFrame, out: outMarkerFrame });
      });

      it('returns the expected key when the player markers are already used', () => {
        componentUnderTest.alreadyUsedMarkersList = [{ in: inMarkerFrame, out: outMarkerFrame }];

        expect(componentUnderTest.markersRemoveButtonHoverTextKey)
          .toBe('ASSET.SAVE_SUBCLIP.ACTION_BUTTON.REMOVE.TITLE.ALREADY_USED');
      });

      it('returns the expected key when the player markers are not already used', () => {
        componentUnderTest.alreadyUsedMarkersList = [];

        expect(componentUnderTest.markersRemoveButtonHoverTextKey).toBe('ASSET.SAVE_SUBCLIP.ACTION_BUTTON.REMOVE.TITLE.READY');
      });
    });

    describe('onCancelButtonClick()', () => {
      it('emits a cancel event', () => {
        componentUnderTest.onCancelButtonClick();

        expect(componentUnderTest.cancel.emit).toHaveBeenCalledWith();
      });
    });

    describe('onSaveButtonClick()', () => {
      it('emits the updated markers', () => {
        componentUnderTest.onPlayerMarkerChange({ in: inMarkerFrame, out: outMarkerFrame });

        componentUnderTest.onSaveButtonClick();

        expect(componentUnderTest.save.emit).toHaveBeenCalledWith({ in: inMarkerFrame, out: outMarkerFrame });
      });
    });

    describe('onRemoveButtonClick()', () => {
      it('emits the updated markers', () => {
        componentUnderTest.onPlayerMarkerChange({ in: undefined, out: undefined });

        componentUnderTest.onRemoveButtonClick();

        expect(componentUnderTest.save.emit).toHaveBeenCalledWith({ in: undefined, out: undefined });
      });
    });

    describe('assetHasMarkers getter', () => {
      it('returns true if the asset is subclipped', () => {
        componentUnderTest.enhancedAsset = { isSubclipped: true } as any;

        expect(componentUnderTest.assetHasMarkers).toBe(true);
      });

      it('returns false if the asset is not subclipped', () => {
        componentUnderTest.enhancedAsset = { isSubclipped: false } as any;

        expect(componentUnderTest.assetHasMarkers).toBe(false);
      });
    });

    describe('assetInMarker getter', () => {
      it('returns the asset\'s in marker Frame object', () => {
        componentUnderTest.enhancedAsset = { subclipMarkers: { in: inMarkerFrame, out: outMarkerFrame } } as any;

        expect(componentUnderTest.assetInMarker).toEqual(inMarkerFrame);
      });
    });

    describe('assetOutMarker getter', () => {
      it('returns the asset\'s out marker Frame object', () => {
        componentUnderTest.enhancedAsset = { subclipMarkers: { in: inMarkerFrame, out: outMarkerFrame } } as any;

        expect(componentUnderTest.assetOutMarker).toEqual(outMarkerFrame);
      });
    });

    describe('playerInMarker getter', () => {
      it('returns the player\'s in marker Frame object', () => {
        componentUnderTest.onPlayerMarkerChange({ in: inMarkerFrame, out: outMarkerFrame });

        expect(componentUnderTest.playerInMarker).toEqual(inMarkerFrame);
      });
    });

    describe('playerOutMarker getter', () => {
      it('returns the player\'s out marker Frame object', () => {
        componentUnderTest.onPlayerMarkerChange({ in: inMarkerFrame, out: outMarkerFrame });

        expect(componentUnderTest.playerOutMarker).toEqual(outMarkerFrame);
      });
    });
  });
}
