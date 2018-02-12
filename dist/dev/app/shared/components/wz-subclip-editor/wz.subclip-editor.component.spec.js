"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wz_subclip_editor_component_1 = require("./wz.subclip-editor.component");
var index_1 = require("../../modules/wazee-frame-formatter/index");
function main() {
    describe('Wz Subclip Editor Component', function () {
        var componentUnderTest;
        var inMarkerFrame = new index_1.Frame(29.97).setFromFrameNumber(42);
        var otherInMarkerFrame = new index_1.Frame(29.97).setFromFrameNumber(43);
        var outMarkerFrame = new index_1.Frame(29.97).setFromFrameNumber(4242);
        var otherOutMarkerFrame = new index_1.Frame(29.97).setFromFrameNumber(4343);
        beforeEach(function () {
            componentUnderTest = new wz_subclip_editor_component_1.WzSubclipEditorComponent();
            componentUnderTest.cancel.emit = jasmine.createSpy('cancel emitter');
            componentUnderTest.save.emit = jasmine.createSpy('save emitter');
        });
        describe('markersAreRemovable getter', function () {
            var tests = [
                { isSubclipped: false, in: undefined, out: undefined, state: 'markers are both unset', expectedResult: false },
                { isSubclipped: false, in: undefined, out: outMarkerFrame, state: 'out marker is set', expectedResult: false },
                { isSubclipped: false, in: inMarkerFrame, out: undefined, state: 'in marker is set', expectedResult: false },
                { isSubclipped: false, in: inMarkerFrame, out: outMarkerFrame, state: 'markers are both set', expectedResult: false },
                { isSubclipped: true, in: undefined, out: undefined, state: 'markers are both unset', expectedResult: true },
                { isSubclipped: true, in: undefined, out: outMarkerFrame, state: 'out marker is set', expectedResult: false },
                { isSubclipped: true, in: inMarkerFrame, out: undefined, state: 'in marker is set', expectedResult: false },
                { isSubclipped: true, in: inMarkerFrame, out: outMarkerFrame, state: 'markers are both set', expectedResult: false }
            ];
            tests.forEach(function (test) {
                describe("when the asset " + (test.isSubclipped ? 'is' : 'is not') + " subclipped", function () {
                    it("returns " + test.expectedResult + " when player " + test.state, function () {
                        componentUnderTest.enhancedAsset = { isSubclipped: test.isSubclipped };
                        componentUnderTest.onPlayerMarkerChange({ in: test.in, out: test.out });
                        expect(componentUnderTest.markersAreRemovable).toBe(test.expectedResult);
                    });
                });
            });
        });
        describe('markersAreSavable and markersSaveButtonHoverTextKey getters', function () {
            var tests = [
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
            tests.forEach(function (test) {
                describe("when asset " + (test.isSubclipped ? 'is' : 'is not') + " subclipped", function () {
                    var playerMarkersState;
                    var playerMarkers;
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
                    describe("when player " + playerMarkersState, function () {
                        beforeEach(function () {
                            componentUnderTest.onPlayerMarkerChange(playerMarkers);
                        });
                        var assetMarkersDescription;
                        var assetIn;
                        var assetOut;
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
                        describe("when asset markers " + assetMarkersDescription, function () {
                            it("returns " + test.expectedResult + " when player markers " + (test.alreadyUsed ? 'are' : 'are not') + " already used", function () {
                                componentUnderTest.enhancedAsset = {
                                    isSubclipped: test.isSubclipped,
                                    inMarkerFrame: assetIn,
                                    outMarkerFrame: assetOut,
                                    subclipMarkers: { in: assetIn, out: assetOut }
                                };
                                if (test.alreadyUsed)
                                    componentUnderTest.alreadyUsedMarkersList = [playerMarkers];
                                expect(componentUnderTest.markersAreSavable).toBe(test.expectedResult);
                                expect(componentUnderTest.markersSaveButtonHoverTextKey).toBe(test.expectedHoverTextKey);
                            });
                        });
                    });
                });
            });
        });
        describe('markersAreAlreadyUsed getter', function () {
            describe('when player markers are set', function () {
                beforeEach(function () {
                    componentUnderTest.onPlayerMarkerChange({ in: inMarkerFrame, out: outMarkerFrame });
                });
                it('returns true when the player markers are present in the alreadyUsedMarkersList @Input', function () {
                    componentUnderTest.alreadyUsedMarkersList = [{ in: inMarkerFrame, out: outMarkerFrame }];
                    expect(componentUnderTest.markersAreAlreadyUsed).toBe(true);
                });
                it('returns false when the player markers are not present in the alreadyUsedMarkersList @Input', function () {
                    componentUnderTest.alreadyUsedMarkersList = [{ in: otherInMarkerFrame, out: otherOutMarkerFrame }];
                    expect(componentUnderTest.markersAreAlreadyUsed).toBe(false);
                });
                it('returns false when the alreadyUsedMarkersList @Input is empty', function () {
                    componentUnderTest.alreadyUsedMarkersList = [];
                    expect(componentUnderTest.markersAreAlreadyUsed).toBe(false);
                });
            });
            describe('when player markers are not set', function () {
                beforeEach(function () {
                    componentUnderTest.onPlayerMarkerChange({ in: undefined, out: undefined });
                });
                it('returns true when unset markers are present in the alreadyUsedMarkersList @Input (full asset)', function () {
                    componentUnderTest.alreadyUsedMarkersList = [{ in: undefined, out: undefined }];
                    expect(componentUnderTest.markersAreAlreadyUsed).toBe(true);
                });
                it('returns false when other markers are present in the alreadyUsedMarkersList @Input', function () {
                    componentUnderTest.alreadyUsedMarkersList = [{ in: inMarkerFrame, out: outMarkerFrame }];
                    expect(componentUnderTest.markersAreAlreadyUsed).toBe(false);
                });
                it('returns false when the alreadyUsedMarkersList @Input is empty', function () {
                    componentUnderTest.alreadyUsedMarkersList = [];
                    expect(componentUnderTest.markersAreAlreadyUsed).toBe(false);
                });
            });
        });
        describe('cancelButtonHoverTextKey getter', function () {
            it('returns the expected key when the asset is subclipped', function () {
                componentUnderTest.enhancedAsset = { isSubclipped: true };
                expect(componentUnderTest.cancelButtonHoverTextKey).toBe('ASSET.SAVE_SUBCLIP.ACTION_BUTTON.CANCEL.TITLE.UPDATE');
            });
            it('returns the expected key when the asset is not subclipped', function () {
                componentUnderTest.enhancedAsset = { isSubclipped: false };
                expect(componentUnderTest.cancelButtonHoverTextKey).toBe('ASSET.SAVE_SUBCLIP.ACTION_BUTTON.CANCEL.TITLE.ADD');
            });
        });
        describe('markersSaveButtonLabelKey getter', function () {
            it('returns the expected key when the asset is subclipped', function () {
                componentUnderTest.enhancedAsset = { isSubclipped: true };
                expect(componentUnderTest.markersSaveButtonLabelKey).toBe('ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.LABEL.UPDATE');
            });
            it('returns the expected key when the asset is not subclipped', function () {
                componentUnderTest.enhancedAsset = { isSubclipped: false };
                expect(componentUnderTest.markersSaveButtonLabelKey).toBe('ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.LABEL.ADD');
            });
        });
        describe('markersRemoveButtonHoverTextKey getter', function () {
            beforeEach(function () {
                componentUnderTest.onPlayerMarkerChange({ in: inMarkerFrame, out: outMarkerFrame });
            });
            it('returns the expected key when the player markers are already used', function () {
                componentUnderTest.alreadyUsedMarkersList = [{ in: inMarkerFrame, out: outMarkerFrame }];
                expect(componentUnderTest.markersRemoveButtonHoverTextKey)
                    .toBe('ASSET.SAVE_SUBCLIP.ACTION_BUTTON.REMOVE.TITLE.ALREADY_USED');
            });
            it('returns the expected key when the player markers are not already used', function () {
                componentUnderTest.alreadyUsedMarkersList = [];
                expect(componentUnderTest.markersRemoveButtonHoverTextKey).toBe('ASSET.SAVE_SUBCLIP.ACTION_BUTTON.REMOVE.TITLE.READY');
            });
        });
        describe('onCancelButtonClick()', function () {
            it('emits a cancel event', function () {
                componentUnderTest.onCancelButtonClick();
                expect(componentUnderTest.cancel.emit).toHaveBeenCalledWith();
            });
        });
        describe('onSaveButtonClick()', function () {
            it('emits the updated markers', function () {
                componentUnderTest.onPlayerMarkerChange({ in: inMarkerFrame, out: outMarkerFrame });
                componentUnderTest.onSaveButtonClick();
                expect(componentUnderTest.save.emit).toHaveBeenCalledWith({ in: inMarkerFrame, out: outMarkerFrame });
            });
        });
        describe('onRemoveButtonClick()', function () {
            it('emits the updated markers', function () {
                componentUnderTest.onPlayerMarkerChange({ in: undefined, out: undefined });
                componentUnderTest.onRemoveButtonClick();
                expect(componentUnderTest.save.emit).toHaveBeenCalledWith({ in: undefined, out: undefined });
            });
        });
        describe('assetHasMarkers getter', function () {
            it('returns true if the asset is subclipped', function () {
                componentUnderTest.enhancedAsset = { isSubclipped: true };
                expect(componentUnderTest.assetHasMarkers).toBe(true);
            });
            it('returns false if the asset is not subclipped', function () {
                componentUnderTest.enhancedAsset = { isSubclipped: false };
                expect(componentUnderTest.assetHasMarkers).toBe(false);
            });
        });
        describe('assetInMarker getter', function () {
            it('returns the asset\'s in marker Frame object', function () {
                componentUnderTest.enhancedAsset = { subclipMarkers: { in: inMarkerFrame, out: outMarkerFrame } };
                expect(componentUnderTest.assetInMarker).toEqual(inMarkerFrame);
            });
        });
        describe('assetOutMarker getter', function () {
            it('returns the asset\'s out marker Frame object', function () {
                componentUnderTest.enhancedAsset = { subclipMarkers: { in: inMarkerFrame, out: outMarkerFrame } };
                expect(componentUnderTest.assetOutMarker).toEqual(outMarkerFrame);
            });
        });
        describe('playerInMarker getter', function () {
            it('returns the player\'s in marker Frame object', function () {
                componentUnderTest.onPlayerMarkerChange({ in: inMarkerFrame, out: outMarkerFrame });
                expect(componentUnderTest.playerInMarker).toEqual(inMarkerFrame);
            });
        });
        describe('playerOutMarker getter', function () {
            it('returns the player\'s out marker Frame object', function () {
                componentUnderTest.onPlayerMarkerChange({ in: inMarkerFrame, out: outMarkerFrame });
                expect(componentUnderTest.playerOutMarker).toEqual(outMarkerFrame);
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvY29tcG9uZW50cy93ei1zdWJjbGlwLWVkaXRvci93ei5zdWJjbGlwLWVkaXRvci5jb21wb25lbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZFQUF5RTtBQUN6RSxtRUFBa0U7QUFJbEU7SUFDRSxRQUFRLENBQUMsNkJBQTZCLEVBQUU7UUFDdEMsSUFBSSxrQkFBNEMsQ0FBQztRQUNqRCxJQUFJLGFBQWEsR0FBVSxJQUFJLGFBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNuRSxJQUFJLGtCQUFrQixHQUFVLElBQUksYUFBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3hFLElBQUksY0FBYyxHQUFVLElBQUksYUFBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RFLElBQUksbUJBQW1CLEdBQVUsSUFBSSxhQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFM0UsVUFBVSxDQUFDO1lBQ1Qsa0JBQWtCLEdBQUcsSUFBSSxzREFBd0IsRUFBRSxDQUFDO1lBQ3BELGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ3JFLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNuRSxDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyw0QkFBNEIsRUFBRTtZQUNyQyxJQUFNLEtBQUssR0FBRztnQkFDWixFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSx3QkFBd0IsRUFBRSxjQUFjLEVBQUUs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LGNBQWMsQ0FBQyxDQUFDO1lBQ3JFLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFsakJELG9CQWtqQkMiLCJmaWxlIjoiYXBwL3NoYXJlZC9jb21wb25lbnRzL3d6LXN1YmNsaXAtZWRpdG9yL3d6LnN1YmNsaXAtZWRpdG9yLmNvbXBvbmVudC5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgV3pTdWJjbGlwRWRpdG9yQ29tcG9uZW50IH0gZnJvbSAnLi93ei5zdWJjbGlwLWVkaXRvci5jb21wb25lbnQnO1xuaW1wb3J0IHsgRnJhbWUgfSBmcm9tICcuLi8uLi9tb2R1bGVzL3dhemVlLWZyYW1lLWZvcm1hdHRlci9pbmRleCc7XG5pbXBvcnQgeyBFbmhhbmNlZEFzc2V0IH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9lbmhhbmNlZC1hc3NldCc7XG5pbXBvcnQgeyBTdWJjbGlwTWFya2VycyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvc3ViY2xpcC1tYXJrZXJzJztcblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIGRlc2NyaWJlKCdXeiBTdWJjbGlwIEVkaXRvciBDb21wb25lbnQnLCAoKSA9PiB7XG4gICAgbGV0IGNvbXBvbmVudFVuZGVyVGVzdDogV3pTdWJjbGlwRWRpdG9yQ29tcG9uZW50O1xuICAgIGxldCBpbk1hcmtlckZyYW1lOiBGcmFtZSA9IG5ldyBGcmFtZSgyOS45Nykuc2V0RnJvbUZyYW1lTnVtYmVyKDQyKTtcbiAgICBsZXQgb3RoZXJJbk1hcmtlckZyYW1lOiBGcmFtZSA9IG5ldyBGcmFtZSgyOS45Nykuc2V0RnJvbUZyYW1lTnVtYmVyKDQzKTtcbiAgICBsZXQgb3V0TWFya2VyRnJhbWU6IEZyYW1lID0gbmV3IEZyYW1lKDI5Ljk3KS5zZXRGcm9tRnJhbWVOdW1iZXIoNDI0Mik7XG4gICAgbGV0IG90aGVyT3V0TWFya2VyRnJhbWU6IEZyYW1lID0gbmV3IEZyYW1lKDI5Ljk3KS5zZXRGcm9tRnJhbWVOdW1iZXIoNDM0Myk7XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgIGNvbXBvbmVudFVuZGVyVGVzdCA9IG5ldyBXelN1YmNsaXBFZGl0b3JDb21wb25lbnQoKTtcbiAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5jYW5jZWwuZW1pdCA9IGphc21pbmUuY3JlYXRlU3B5KCdjYW5jZWwgZW1pdHRlcicpO1xuICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnNhdmUuZW1pdCA9IGphc21pbmUuY3JlYXRlU3B5KCdzYXZlIGVtaXR0ZXInKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdtYXJrZXJzQXJlUmVtb3ZhYmxlIGdldHRlcicsICgpID0+IHtcbiAgICAgIGNvbnN0IHRlc3RzID0gW1xuICAgICAgICB7IGlzU3ViY2xpcHBlZDogZmFsc2UsIGluOiB1bmRlZmluZWQsIG91dDogdW5kZWZpbmVkLCBzdGF0ZTogJ21hcmtlcnMgYXJlIGJvdGggdW5zZXQnLCBleHBlY3RlZFJlc3VsdDogZmFsc2UgfSxcbiAgICAgICAgeyBpc1N1YmNsaXBwZWQ6IGZhbHNlLCBpbjogdW5kZWZpbmVkLCBvdXQ6IG91dE1hcmtlckZyYW1lLCBzdGF0ZTogJ291dCBtYXJrZXIgaXMgc2V0JywgZXhwZWN0ZWRSZXN1bHQ6IGZhbHNlIH0sXG4gICAgICAgIHsgaXNTdWJjbGlwcGVkOiBmYWxzZSwgaW46IGluTWFya2VyRnJhbWUsIG91dDogdW5kZWZpbmVkLCBzdGF0ZTogJ2luIG1hcmtlciBpcyBzZXQnLCBleHBlY3RlZFJlc3VsdDogZmFsc2UgfSxcbiAgICAgICAgeyBpc1N1YmNsaXBwZWQ6IGZhbHNlLCBpbjogaW5NYXJrZXJGcmFtZSwgb3V0OiBvdXRNYXJrZXJGcmFtZSwgc3RhdGU6ICdtYXJrZXJzIGFyZSBib3RoIHNldCcsIGV4cGVjdGVkUmVzdWx0OiBmYWxzZSB9LFxuXG4gICAgICAgIHsgaXNTdWJjbGlwcGVkOiB0cnVlLCBpbjogdW5kZWZpbmVkLCBvdXQ6IHVuZGVmaW5lZCwgc3RhdGU6ICdtYXJrZXJzIGFyZSBib3RoIHVuc2V0JywgZXhwZWN0ZWRSZXN1bHQ6IHRydWUgfSxcbiAgICAgICAgeyBpc1N1YmNsaXBwZWQ6IHRydWUsIGluOiB1bmRlZmluZWQsIG91dDogb3V0TWFya2VyRnJhbWUsIHN0YXRlOiAnb3V0IG1hcmtlciBpcyBzZXQnLCBleHBlY3RlZFJlc3VsdDogZmFsc2UgfSxcbiAgICAgICAgeyBpc1N1YmNsaXBwZWQ6IHRydWUsIGluOiBpbk1hcmtlckZyYW1lLCBvdXQ6IHVuZGVmaW5lZCwgc3RhdGU6ICdpbiBtYXJrZXIgaXMgc2V0JywgZXhwZWN0ZWRSZXN1bHQ6IGZhbHNlIH0sXG4gICAgICAgIHsgaXNTdWJjbGlwcGVkOiB0cnVlLCBpbjogaW5NYXJrZXJGcmFtZSwgb3V0OiBvdXRNYXJrZXJGcmFtZSwgc3RhdGU6ICdtYXJrZXJzIGFyZSBib3RoIHNldCcsIGV4cGVjdGVkUmVzdWx0OiBmYWxzZSB9XG4gICAgICBdO1xuXG4gICAgICB0ZXN0cy5mb3JFYWNoKHRlc3QgPT4ge1xuICAgICAgICBkZXNjcmliZShgd2hlbiB0aGUgYXNzZXQgJHt0ZXN0LmlzU3ViY2xpcHBlZCA/ICdpcycgOiAnaXMgbm90J30gc3ViY2xpcHBlZGAsICgpID0+IHtcbiAgICAgICAgICBpdChgcmV0dXJucyAke3Rlc3QuZXhwZWN0ZWRSZXN1bHR9IHdoZW4gcGxheWVyICR7dGVzdC5zdGF0ZX1gLCAoKSA9PiB7XG4gICAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuZW5oYW5jZWRBc3NldCA9IHsgaXNTdWJjbGlwcGVkOiB0ZXN0LmlzU3ViY2xpcHBlZCB9IGFzIEVuaGFuY2VkQXNzZXQ7XG4gICAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3Qub25QbGF5ZXJNYXJrZXJDaGFuZ2UoeyBpbjogdGVzdC5pbiwgb3V0OiB0ZXN0Lm91dCB9KTtcblxuICAgICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5tYXJrZXJzQXJlUmVtb3ZhYmxlKS50b0JlKHRlc3QuZXhwZWN0ZWRSZXN1bHQpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ21hcmtlcnNBcmVTYXZhYmxlIGFuZCBtYXJrZXJzU2F2ZUJ1dHRvbkhvdmVyVGV4dEtleSBnZXR0ZXJzJywgKCkgPT4ge1xuICAgICAgLy8gTk9URSB0aGF0IHNvbWUgb2YgdGhlc2UgdGVzdCBjYXNlcyB0ZWNobmljYWxseSBjYW4ndCBoYXBwZW5cbiAgICAgIC8vIChsaWtlIGlzU3ViY2xpcHBlZDogZmFsc2UsIHBsYXllck1hcmtlcnNTZXQ6ICdib3RoJywgYXNzZXRNYXJrZXJzOiAnYm90aFNhbWUnLCB3aGljaCBtZWFucyB0aGF0IHBsYXllciBtYXJrZXJzXG4gICAgICAvLyBhcmUgc2V0LCBhbmQgdGhlIGFzc2V0IGlzbid0IHN1YmNsaXBwZWQsIGFuZCB0aGUgYXNzZXQgbWFya2VycyBhcmUgdGhlIHNhbWUgYXMgdGhlIHBsYXllciBtYXJrZXJzLiAgQnV0IHRoZVxuICAgICAgLy8gdGVzdCBleGlzdHMgZm9yIGNvbXBsZXRlbmVzcywgYW5kIHdlIHNob3VsZCBkbyB0aGUgcmlnaHQgdGhpbmcgaW4gdGhhdCB1bmxpa2VseSAoaW1wb3NzaWJsZSkgZXZlbnQgYW55d2F5LlxuICAgICAgY29uc3QgdGVzdHMgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICBpc1N1YmNsaXBwZWQ6IGZhbHNlLCBwbGF5ZXJNYXJrZXJzU2V0OiAnbmVpdGhlcicsIGFzc2V0TWFya2VyczogJ2JvdGhTYW1lJywgYWxyZWFkeVVzZWQ6IGZhbHNlLFxuICAgICAgICAgIGV4cGVjdGVkUmVzdWx0OiBmYWxzZSwgZXhwZWN0ZWRIb3ZlclRleHRLZXk6ICdBU1NFVC5TQVZFX1NVQkNMSVAuQUNUSU9OX0JVVFRPTi5TQVZFLlRJVExFLkFERC5OT1RfUkVBRFknXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBpc1N1YmNsaXBwZWQ6IGZhbHNlLCBwbGF5ZXJNYXJrZXJzU2V0OiAnbmVpdGhlcicsIGFzc2V0TWFya2VyczogJ2JvdGhTYW1lJywgYWxyZWFkeVVzZWQ6IHRydWUsXG4gICAgICAgICAgZXhwZWN0ZWRSZXN1bHQ6IGZhbHNlLCBleHBlY3RlZEhvdmVyVGV4dEtleTogJ0FTU0VULlNBVkVfU1VCQ0xJUC5BQ1RJT05fQlVUVE9OLlNBVkUuVElUTEUuQURELk5PVF9SRUFEWSdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGlzU3ViY2xpcHBlZDogZmFsc2UsIHBsYXllck1hcmtlcnNTZXQ6ICduZWl0aGVyJywgYXNzZXRNYXJrZXJzOiAnb3V0U2FtZScsIGFscmVhZHlVc2VkOiBmYWxzZSxcbiAgICAgICAgICBleHBlY3RlZFJlc3VsdDogZmFsc2UsIGV4cGVjdGVkSG92ZXJUZXh0S2V5OiAnQVNTRVQuU0FWRV9TVUJDTElQLkFDVElPTl9CVVRUT04uU0FWRS5USVRMRS5BREQuTk9UX1JFQURZJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgaXNTdWJjbGlwcGVkOiBmYWxzZSwgcGxheWVyTWFya2Vyc1NldDogJ25laXRoZXInLCBhc3NldE1hcmtlcnM6ICdvdXRTYW1lJywgYWxyZWFkeVVzZWQ6IHRydWUsXG4gICAgICAgICAgZXhwZWN0ZWRSZXN1bHQ6IGZhbHNlLCBleHBlY3RlZEhvdmVyVGV4dEtleTogJ0FTU0VULlNBVkVfU1VCQ0xJUC5BQ1RJT05fQlVUVE9OLlNBVkUuVElUTEUuQURELk5PVF9SRUFEWSdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGlzU3ViY2xpcHBlZDogZmFsc2UsIHBsYXllck1hcmtlcnNTZXQ6ICduZWl0aGVyJywgYXNzZXRNYXJrZXJzOiAnaW5TYW1lJywgYWxyZWFkeVVzZWQ6IGZhbHNlLFxuICAgICAgICAgIGV4cGVjdGVkUmVzdWx0OiBmYWxzZSwgZXhwZWN0ZWRIb3ZlclRleHRLZXk6ICdBU1NFVC5TQVZFX1NVQkNMSVAuQUNUSU9OX0JVVFRPTi5TQVZFLlRJVExFLkFERC5OT1RfUkVBRFknXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBpc1N1YmNsaXBwZWQ6IGZhbHNlLCBwbGF5ZXJNYXJrZXJzU2V0OiAnbmVpdGhlcicsIGFzc2V0TWFya2VyczogJ2luU2FtZScsIGFscmVhZHlVc2VkOiB0cnVlLFxuICAgICAgICAgIGV4cGVjdGVkUmVzdWx0OiBmYWxzZSwgZXhwZWN0ZWRIb3ZlclRleHRLZXk6ICdBU1NFVC5TQVZFX1NVQkNMSVAuQUNUSU9OX0JVVFRPTi5TQVZFLlRJVExFLkFERC5OT1RfUkVBRFknXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBpc1N1YmNsaXBwZWQ6IGZhbHNlLCBwbGF5ZXJNYXJrZXJzU2V0OiAnbmVpdGhlcicsIGFzc2V0TWFya2VyczogJ25laXRoZXJTYW1lJywgYWxyZWFkeVVzZWQ6IGZhbHNlLFxuICAgICAgICAgIGV4cGVjdGVkUmVzdWx0OiBmYWxzZSwgZXhwZWN0ZWRIb3ZlclRleHRLZXk6ICdBU1NFVC5TQVZFX1NVQkNMSVAuQUNUSU9OX0JVVFRPTi5TQVZFLlRJVExFLkFERC5OT1RfUkVBRFknXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBpc1N1YmNsaXBwZWQ6IGZhbHNlLCBwbGF5ZXJNYXJrZXJzU2V0OiAnbmVpdGhlcicsIGFzc2V0TWFya2VyczogJ25laXRoZXJTYW1lJywgYWxyZWFkeVVzZWQ6IHRydWUsXG4gICAgICAgICAgZXhwZWN0ZWRSZXN1bHQ6IGZhbHNlLCBleHBlY3RlZEhvdmVyVGV4dEtleTogJ0FTU0VULlNBVkVfU1VCQ0xJUC5BQ1RJT05fQlVUVE9OLlNBVkUuVElUTEUuQURELk5PVF9SRUFEWSdcbiAgICAgICAgfSxcblxuICAgICAgICB7XG4gICAgICAgICAgaXNTdWJjbGlwcGVkOiBmYWxzZSwgcGxheWVyTWFya2Vyc1NldDogJ291dE9ubHknLCBhc3NldE1hcmtlcnM6ICdib3RoU2FtZScsIGFscmVhZHlVc2VkOiBmYWxzZSxcbiAgICAgICAgICBleHBlY3RlZFJlc3VsdDogZmFsc2UsIGV4cGVjdGVkSG92ZXJUZXh0S2V5OiAnQVNTRVQuU0FWRV9TVUJDTElQLkFDVElPTl9CVVRUT04uU0FWRS5USVRMRS5BREQuTk9UX1JFQURZJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgaXNTdWJjbGlwcGVkOiBmYWxzZSwgcGxheWVyTWFya2Vyc1NldDogJ291dE9ubHknLCBhc3NldE1hcmtlcnM6ICdib3RoU2FtZScsIGFscmVhZHlVc2VkOiB0cnVlLFxuICAgICAgICAgIGV4cGVjdGVkUmVzdWx0OiBmYWxzZSwgZXhwZWN0ZWRIb3ZlclRleHRLZXk6ICdBU1NFVC5TQVZFX1NVQkNMSVAuQUNUSU9OX0JVVFRPTi5TQVZFLlRJVExFLkFERC5OT1RfUkVBRFknXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBpc1N1YmNsaXBwZWQ6IGZhbHNlLCBwbGF5ZXJNYXJrZXJzU2V0OiAnb3V0T25seScsIGFzc2V0TWFya2VyczogJ291dFNhbWUnLCBhbHJlYWR5VXNlZDogZmFsc2UsXG4gICAgICAgICAgZXhwZWN0ZWRSZXN1bHQ6IGZhbHNlLCBleHBlY3RlZEhvdmVyVGV4dEtleTogJ0FTU0VULlNBVkVfU1VCQ0xJUC5BQ1RJT05fQlVUVE9OLlNBVkUuVElUTEUuQURELk5PVF9SRUFEWSdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGlzU3ViY2xpcHBlZDogZmFsc2UsIHBsYXllck1hcmtlcnNTZXQ6ICdvdXRPbmx5JywgYXNzZXRNYXJrZXJzOiAnb3V0U2FtZScsIGFscmVhZHlVc2VkOiB0cnVlLFxuICAgICAgICAgIGV4cGVjdGVkUmVzdWx0OiBmYWxzZSwgZXhwZWN0ZWRIb3ZlclRleHRLZXk6ICdBU1NFVC5TQVZFX1NVQkNMSVAuQUNUSU9OX0JVVFRPTi5TQVZFLlRJVExFLkFERC5OT1RfUkVBRFknXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBpc1N1YmNsaXBwZWQ6IGZhbHNlLCBwbGF5ZXJNYXJrZXJzU2V0OiAnb3V0T25seScsIGFzc2V0TWFya2VyczogJ2luU2FtZScsIGFscmVhZHlVc2VkOiBmYWxzZSxcbiAgICAgICAgICBleHBlY3RlZFJlc3VsdDogZmFsc2UsIGV4cGVjdGVkSG92ZXJUZXh0S2V5OiAnQVNTRVQuU0FWRV9TVUJDTElQLkFDVElPTl9CVVRUT04uU0FWRS5USVRMRS5BREQuTk9UX1JFQURZJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgaXNTdWJjbGlwcGVkOiBmYWxzZSwgcGxheWVyTWFya2Vyc1NldDogJ291dE9ubHknLCBhc3NldE1hcmtlcnM6ICdpblNhbWUnLCBhbHJlYWR5VXNlZDogdHJ1ZSxcbiAgICAgICAgICBleHBlY3RlZFJlc3VsdDogZmFsc2UsIGV4cGVjdGVkSG92ZXJUZXh0S2V5OiAnQVNTRVQuU0FWRV9TVUJDTElQLkFDVElPTl9CVVRUT04uU0FWRS5USVRMRS5BREQuTk9UX1JFQURZJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgaXNTdWJjbGlwcGVkOiBmYWxzZSwgcGxheWVyTWFya2Vyc1NldDogJ291dE9ubHknLCBhc3NldE1hcmtlcnM6ICduZWl0aGVyU2FtZScsIGFscmVhZHlVc2VkOiBmYWxzZSxcbiAgICAgICAgICBleHBlY3RlZFJlc3VsdDogZmFsc2UsIGV4cGVjdGVkSG92ZXJUZXh0S2V5OiAnQVNTRVQuU0FWRV9TVUJDTElQLkFDVElPTl9CVVRUT04uU0FWRS5USVRMRS5BREQuTk9UX1JFQURZJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgaXNTdWJjbGlwcGVkOiBmYWxzZSwgcGxheWVyTWFya2Vyc1NldDogJ291dE9ubHknLCBhc3NldE1hcmtlcnM6ICduZWl0aGVyU2FtZScsIGFscmVhZHlVc2VkOiB0cnVlLFxuICAgICAgICAgIGV4cGVjdGVkUmVzdWx0OiBmYWxzZSwgZXhwZWN0ZWRIb3ZlclRleHRLZXk6ICdBU1NFVC5TQVZFX1NVQkNMSVAuQUNUSU9OX0JVVFRPTi5TQVZFLlRJVExFLkFERC5OT1RfUkVBRFknXG4gICAgICAgIH0sXG5cbiAgICAgICAge1xuICAgICAgICAgIGlzU3ViY2xpcHBlZDogZmFsc2UsIHBsYXllck1hcmtlcnNTZXQ6ICdpbk9ubHknLCBhc3NldE1hcmtlcnM6ICdib3RoU2FtZScsIGFscmVhZHlVc2VkOiBmYWxzZSxcbiAgICAgICAgICBleHBlY3RlZFJlc3VsdDogZmFsc2UsIGV4cGVjdGVkSG92ZXJUZXh0S2V5OiAnQVNTRVQuU0FWRV9TVUJDTElQLkFDVElPTl9CVVRUT04uU0FWRS5USVRMRS5BREQuTk9UX1JFQURZJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgaXNTdWJjbGlwcGVkOiBmYWxzZSwgcGxheWVyTWFya2Vyc1NldDogJ2luT25seScsIGFzc2V0TWFya2VyczogJ2JvdGhTYW1lJywgYWxyZWFkeVVzZWQ6IHRydWUsXG4gICAgICAgICAgZXhwZWN0ZWRSZXN1bHQ6IGZhbHNlLCBleHBlY3RlZEhvdmVyVGV4dEtleTogJ0FTU0VULlNBVkVfU1VCQ0xJUC5BQ1RJT05fQlVUVE9OLlNBVkUuVElUTEUuQURELk5PVF9SRUFEWSdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGlzU3ViY2xpcHBlZDogZmFsc2UsIHBsYXllck1hcmtlcnNTZXQ6ICdpbk9ubHknLCBhc3NldE1hcmtlcnM6ICdvdXRTYW1lJywgYWxyZWFkeVVzZWQ6IGZhbHNlLFxuICAgICAgICAgIGV4cGVjdGVkUmVzdWx0OiBmYWxzZSwgZXhwZWN0ZWRIb3ZlclRleHRLZXk6ICdBU1NFVC5TQVZFX1NVQkNMSVAuQUNUSU9OX0JVVFRPTi5TQVZFLlRJVExFLkFERC5OT1RfUkVBRFknXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBpc1N1YmNsaXBwZWQ6IGZhbHNlLCBwbGF5ZXJNYXJrZXJzU2V0OiAnaW5Pbmx5JywgYXNzZXRNYXJrZXJzOiAnb3V0U2FtZScsIGFscmVhZHlVc2VkOiB0cnVlLFxuICAgICAgICAgIGV4cGVjdGVkUmVzdWx0OiBmYWxzZSwgZXhwZWN0ZWRIb3ZlclRleHRLZXk6ICdBU1NFVC5TQVZFX1NVQkNMSVAuQUNUSU9OX0JVVFRPTi5TQVZFLlRJVExFLkFERC5OT1RfUkVBRFknXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBpc1N1YmNsaXBwZWQ6IGZhbHNlLCBwbGF5ZXJNYXJrZXJzU2V0OiAnaW5Pbmx5JywgYXNzZXRNYXJrZXJzOiAnaW5TYW1lJywgYWxyZWFkeVVzZWQ6IGZhbHNlLFxuICAgICAgICAgIGV4cGVjdGVkUmVzdWx0OiBmYWxzZSwgZXhwZWN0ZWRIb3ZlclRleHRLZXk6ICdBU1NFVC5TQVZFX1NVQkNMSVAuQUNUSU9OX0JVVFRPTi5TQVZFLlRJVExFLkFERC5OT1RfUkVBRFknXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBpc1N1YmNsaXBwZWQ6IGZhbHNlLCBwbGF5ZXJNYXJrZXJzU2V0OiAnaW5Pbmx5JywgYXNzZXRNYXJrZXJzOiAnaW5TYW1lJywgYWxyZWFkeVVzZWQ6IHRydWUsXG4gICAgICAgICAgZXhwZWN0ZWRSZXN1bHQ6IGZhbHNlLCBleHBlY3RlZEhvdmVyVGV4dEtleTogJ0FTU0VULlNBVkVfU1VCQ0xJUC5BQ1RJT05fQlVUVE9OLlNBVkUuVElUTEUuQURELk5PVF9SRUFEWSdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGlzU3ViY2xpcHBlZDogZmFsc2UsIHBsYXllck1hcmtlcnNTZXQ6ICdpbk9ubHknLCBhc3NldE1hcmtlcnM6ICduZWl0aGVyU2FtZScsIGFscmVhZHlVc2VkOiBmYWxzZSxcbiAgICAgICAgICBleHBlY3RlZFJlc3VsdDogZmFsc2UsIGV4cGVjdGVkSG92ZXJUZXh0S2V5OiAnQVNTRVQuU0FWRV9TVUJDTElQLkFDVElPTl9CVVRUT04uU0FWRS5USVRMRS5BREQuTk9UX1JFQURZJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgaXNTdWJjbGlwcGVkOiBmYWxzZSwgcGxheWVyTWFya2Vyc1NldDogJ2luT25seScsIGFzc2V0TWFya2VyczogJ25laXRoZXJTYW1lJywgYWxyZWFkeVVzZWQ6IHRydWUsXG4gICAgICAgICAgZXhwZWN0ZWRSZXN1bHQ6IGZhbHNlLCBleHBlY3RlZEhvdmVyVGV4dEtleTogJ0FTU0VULlNBVkVfU1VCQ0xJUC5BQ1RJT05fQlVUVE9OLlNBVkUuVElUTEUuQURELk5PVF9SRUFEWSdcbiAgICAgICAgfSxcblxuICAgICAgICB7XG4gICAgICAgICAgaXNTdWJjbGlwcGVkOiBmYWxzZSwgcGxheWVyTWFya2Vyc1NldDogJ2JvdGgnLCBhc3NldE1hcmtlcnM6ICdib3RoU2FtZScsIGFscmVhZHlVc2VkOiBmYWxzZSxcbiAgICAgICAgICBleHBlY3RlZFJlc3VsdDogZmFsc2UsIGV4cGVjdGVkSG92ZXJUZXh0S2V5OiAnQVNTRVQuU0FWRV9TVUJDTElQLkFDVElPTl9CVVRUT04uU0FWRS5USVRMRS5OT1RfQ0hBTkdFRCdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGlzU3ViY2xpcHBlZDogZmFsc2UsIHBsYXllck1hcmtlcnNTZXQ6ICdib3RoJywgYXNzZXRNYXJrZXJzOiAnYm90aFNhbWUnLCBhbHJlYWR5VXNlZDogdHJ1ZSxcbiAgICAgICAgICBleHBlY3RlZFJlc3VsdDogZmFsc2UsIGV4cGVjdGVkSG92ZXJUZXh0S2V5OiAnQVNTRVQuU0FWRV9TVUJDTElQLkFDVElPTl9CVVRUT04uU0FWRS5USVRMRS5OT1RfQ0hBTkdFRCdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGlzU3ViY2xpcHBlZDogZmFsc2UsIHBsYXllck1hcmtlcnNTZXQ6ICdib3RoJywgYXNzZXRNYXJrZXJzOiAnb3V0U2FtZScsIGFscmVhZHlVc2VkOiBmYWxzZSxcbiAgICAgICAgICBleHBlY3RlZFJlc3VsdDogdHJ1ZSwgZXhwZWN0ZWRIb3ZlclRleHRLZXk6ICdBU1NFVC5TQVZFX1NVQkNMSVAuQUNUSU9OX0JVVFRPTi5TQVZFLlRJVExFLkFERC5SRUFEWSdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGlzU3ViY2xpcHBlZDogZmFsc2UsIHBsYXllck1hcmtlcnNTZXQ6ICdib3RoJywgYXNzZXRNYXJrZXJzOiAnb3V0U2FtZScsIGFscmVhZHlVc2VkOiB0cnVlLFxuICAgICAgICAgIGV4cGVjdGVkUmVzdWx0OiBmYWxzZSwgZXhwZWN0ZWRIb3ZlclRleHRLZXk6ICdBU1NFVC5TQVZFX1NVQkNMSVAuQUNUSU9OX0JVVFRPTi5TQVZFLlRJVExFLkFMUkVBRFlfVVNFRCdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGlzU3ViY2xpcHBlZDogZmFsc2UsIHBsYXllck1hcmtlcnNTZXQ6ICdib3RoJywgYXNzZXRNYXJrZXJzOiAnaW5TYW1lJywgYWxyZWFkeVVzZWQ6IGZhbHNlLFxuICAgICAgICAgIGV4cGVjdGVkUmVzdWx0OiB0cnVlLCBleHBlY3RlZEhvdmVyVGV4dEtleTogJ0FTU0VULlNBVkVfU1VCQ0xJUC5BQ1RJT05fQlVUVE9OLlNBVkUuVElUTEUuQURELlJFQURZJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgaXNTdWJjbGlwcGVkOiBmYWxzZSwgcGxheWVyTWFya2Vyc1NldDogJ2JvdGgnLCBhc3NldE1hcmtlcnM6ICdpblNhbWUnLCBhbHJlYWR5VXNlZDogdHJ1ZSxcbiAgICAgICAgICBleHBlY3RlZFJlc3VsdDogZmFsc2UsIGV4cGVjdGVkSG92ZXJUZXh0S2V5OiAnQVNTRVQuU0FWRV9TVUJDTElQLkFDVElPTl9CVVRUT04uU0FWRS5USVRMRS5BTFJFQURZX1VTRUQnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBpc1N1YmNsaXBwZWQ6IGZhbHNlLCBwbGF5ZXJNYXJrZXJzU2V0OiAnYm90aCcsIGFzc2V0TWFya2VyczogJ25laXRoZXJTYW1lJywgYWxyZWFkeVVzZWQ6IGZhbHNlLFxuICAgICAgICAgIGV4cGVjdGVkUmVzdWx0OiB0cnVlLCBleHBlY3RlZEhvdmVyVGV4dEtleTogJ0FTU0VULlNBVkVfU1VCQ0xJUC5BQ1RJT05fQlVUVE9OLlNBVkUuVElUTEUuQURELlJFQURZJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgaXNTdWJjbGlwcGVkOiBmYWxzZSwgcGxheWVyTWFya2Vyc1NldDogJ2JvdGgnLCBhc3NldE1hcmtlcnM6ICduZWl0aGVyU2FtZScsIGFscmVhZHlVc2VkOiB0cnVlLFxuICAgICAgICAgIGV4cGVjdGVkUmVzdWx0OiBmYWxzZSwgZXhwZWN0ZWRIb3ZlclRleHRLZXk6ICdBU1NFVC5TQVZFX1NVQkNMSVAuQUNUSU9OX0JVVFRPTi5TQVZFLlRJVExFLkFMUkVBRFlfVVNFRCdcbiAgICAgICAgfSxcblxuICAgICAgICB7XG4gICAgICAgICAgaXNTdWJjbGlwcGVkOiB0cnVlLCBwbGF5ZXJNYXJrZXJzU2V0OiAnbmVpdGhlcicsIGFzc2V0TWFya2VyczogJ2JvdGhTYW1lJywgYWxyZWFkeVVzZWQ6IGZhbHNlLFxuICAgICAgICAgIGV4cGVjdGVkUmVzdWx0OiBmYWxzZSwgZXhwZWN0ZWRIb3ZlclRleHRLZXk6ICdBU1NFVC5TQVZFX1NVQkNMSVAuQUNUSU9OX0JVVFRPTi5TQVZFLlRJVExFLlVQREFURS5OT1RfUkVBRFknXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBpc1N1YmNsaXBwZWQ6IHRydWUsIHBsYXllck1hcmtlcnNTZXQ6ICduZWl0aGVyJywgYXNzZXRNYXJrZXJzOiAnYm90aFNhbWUnLCBhbHJlYWR5VXNlZDogdHJ1ZSxcbiAgICAgICAgICBleHBlY3RlZFJlc3VsdDogZmFsc2UsIGV4cGVjdGVkSG92ZXJUZXh0S2V5OiAnQVNTRVQuU0FWRV9TVUJDTElQLkFDVElPTl9CVVRUT04uU0FWRS5USVRMRS5VUERBVEUuTk9UX1JFQURZJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgaXNTdWJjbGlwcGVkOiB0cnVlLCBwbGF5ZXJNYXJrZXJzU2V0OiAnbmVpdGhlcicsIGFzc2V0TWFya2VyczogJ291dFNhbWUnLCBhbHJlYWR5VXNlZDogZmFsc2UsXG4gICAgICAgICAgZXhwZWN0ZWRSZXN1bHQ6IGZhbHNlLCBleHBlY3RlZEhvdmVyVGV4dEtleTogJ0FTU0VULlNBVkVfU1VCQ0xJUC5BQ1RJT05fQlVUVE9OLlNBVkUuVElUTEUuVVBEQVRFLk5PVF9SRUFEWSdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGlzU3ViY2xpcHBlZDogdHJ1ZSwgcGxheWVyTWFya2Vyc1NldDogJ25laXRoZXInLCBhc3NldE1hcmtlcnM6ICdvdXRTYW1lJywgYWxyZWFkeVVzZWQ6IHRydWUsXG4gICAgICAgICAgZXhwZWN0ZWRSZXN1bHQ6IGZhbHNlLCBleHBlY3RlZEhvdmVyVGV4dEtleTogJ0FTU0VULlNBVkVfU1VCQ0xJUC5BQ1RJT05fQlVUVE9OLlNBVkUuVElUTEUuVVBEQVRFLk5PVF9SRUFEWSdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGlzU3ViY2xpcHBlZDogdHJ1ZSwgcGxheWVyTWFya2Vyc1NldDogJ25laXRoZXInLCBhc3NldE1hcmtlcnM6ICdpblNhbWUnLCBhbHJlYWR5VXNlZDogZmFsc2UsXG4gICAgICAgICAgZXhwZWN0ZWRSZXN1bHQ6IGZhbHNlLCBleHBlY3RlZEhvdmVyVGV4dEtleTogJ0FTU0VULlNBVkVfU1VCQ0xJUC5BQ1RJT05fQlVUVE9OLlNBVkUuVElUTEUuVVBEQVRFLk5PVF9SRUFEWSdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGlzU3ViY2xpcHBlZDogdHJ1ZSwgcGxheWVyTWFya2Vyc1NldDogJ25laXRoZXInLCBhc3NldE1hcmtlcnM6ICdpblNhbWUnLCBhbHJlYWR5VXNlZDogdHJ1ZSxcbiAgICAgICAgICBleHBlY3RlZFJlc3VsdDogZmFsc2UsIGV4cGVjdGVkSG92ZXJUZXh0S2V5OiAnQVNTRVQuU0FWRV9TVUJDTElQLkFDVElPTl9CVVRUT04uU0FWRS5USVRMRS5VUERBVEUuTk9UX1JFQURZJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgaXNTdWJjbGlwcGVkOiB0cnVlLCBwbGF5ZXJNYXJrZXJzU2V0OiAnbmVpdGhlcicsIGFzc2V0TWFya2VyczogJ25laXRoZXJTYW1lJywgYWxyZWFkeVVzZWQ6IGZhbHNlLFxuICAgICAgICAgIGV4cGVjdGVkUmVzdWx0OiBmYWxzZSwgZXhwZWN0ZWRIb3ZlclRleHRLZXk6ICdBU1NFVC5TQVZFX1NVQkNMSVAuQUNUSU9OX0JVVFRPTi5TQVZFLlRJVExFLlVQREFURS5OT1RfUkVBRFknXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBpc1N1YmNsaXBwZWQ6IHRydWUsIHBsYXllck1hcmtlcnNTZXQ6ICduZWl0aGVyJywgYXNzZXRNYXJrZXJzOiAnbmVpdGhlclNhbWUnLCBhbHJlYWR5VXNlZDogdHJ1ZSxcbiAgICAgICAgICBleHBlY3RlZFJlc3VsdDogZmFsc2UsIGV4cGVjdGVkSG92ZXJUZXh0S2V5OiAnQVNTRVQuU0FWRV9TVUJDTElQLkFDVElPTl9CVVRUT04uU0FWRS5USVRMRS5VUERBVEUuTk9UX1JFQURZJ1xuICAgICAgICB9LFxuXG4gICAgICAgIHtcbiAgICAgICAgICBpc1N1YmNsaXBwZWQ6IHRydWUsIHBsYXllck1hcmtlcnNTZXQ6ICdvdXRPbmx5JywgYXNzZXRNYXJrZXJzOiAnYm90aFNhbWUnLCBhbHJlYWR5VXNlZDogZmFsc2UsXG4gICAgICAgICAgZXhwZWN0ZWRSZXN1bHQ6IGZhbHNlLCBleHBlY3RlZEhvdmVyVGV4dEtleTogJ0FTU0VULlNBVkVfU1VCQ0xJUC5BQ1RJT05fQlVUVE9OLlNBVkUuVElUTEUuVVBEQVRFLk5PVF9SRUFEWSdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGlzU3ViY2xpcHBlZDogdHJ1ZSwgcGxheWVyTWFya2Vyc1NldDogJ291dE9ubHknLCBhc3NldE1hcmtlcnM6ICdib3RoU2FtZScsIGFscmVhZHlVc2VkOiB0cnVlLFxuICAgICAgICAgIGV4cGVjdGVkUmVzdWx0OiBmYWxzZSwgZXhwZWN0ZWRIb3ZlclRleHRLZXk6ICdBU1NFVC5TQVZFX1NVQkNMSVAuQUNUSU9OX0JVVFRPTi5TQVZFLlRJVExFLlVQREFURS5OT1RfUkVBRFknXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBpc1N1YmNsaXBwZWQ6IHRydWUsIHBsYXllck1hcmtlcnNTZXQ6ICdvdXRPbmx5JywgYXNzZXRNYXJrZXJzOiAnb3V0U2FtZScsIGFscmVhZHlVc2VkOiBmYWxzZSxcbiAgICAgICAgICBleHBlY3RlZFJlc3VsdDogZmFsc2UsIGV4cGVjdGVkSG92ZXJUZXh0S2V5OiAnQVNTRVQuU0FWRV9TVUJDTElQLkFDVElPTl9CVVRUT04uU0FWRS5USVRMRS5VUERBVEUuTk9UX1JFQURZJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgaXNTdWJjbGlwcGVkOiB0cnVlLCBwbGF5ZXJNYXJrZXJzU2V0OiAnb3V0T25seScsIGFzc2V0TWFya2VyczogJ291dFNhbWUnLCBhbHJlYWR5VXNlZDogdHJ1ZSxcbiAgICAgICAgICBleHBlY3RlZFJlc3VsdDogZmFsc2UsIGV4cGVjdGVkSG92ZXJUZXh0S2V5OiAnQVNTRVQuU0FWRV9TVUJDTElQLkFDVElPTl9CVVRUT04uU0FWRS5USVRMRS5VUERBVEUuTk9UX1JFQURZJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgaXNTdWJjbGlwcGVkOiB0cnVlLCBwbGF5ZXJNYXJrZXJzU2V0OiAnb3V0T25seScsIGFzc2V0TWFya2VyczogJ2luU2FtZScsIGFscmVhZHlVc2VkOiBmYWxzZSxcbiAgICAgICAgICBleHBlY3RlZFJlc3VsdDogZmFsc2UsIGV4cGVjdGVkSG92ZXJUZXh0S2V5OiAnQVNTRVQuU0FWRV9TVUJDTElQLkFDVElPTl9CVVRUT04uU0FWRS5USVRMRS5VUERBVEUuTk9UX1JFQURZJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgaXNTdWJjbGlwcGVkOiB0cnVlLCBwbGF5ZXJNYXJrZXJzU2V0OiAnb3V0T25seScsIGFzc2V0TWFya2VyczogJ2luU2FtZScsIGFscmVhZHlVc2VkOiB0cnVlLFxuICAgICAgICAgIGV4cGVjdGVkUmVzdWx0OiBmYWxzZSwgZXhwZWN0ZWRIb3ZlclRleHRLZXk6ICdBU1NFVC5TQVZFX1NVQkNMSVAuQUNUSU9OX0JVVFRPTi5TQVZFLlRJVExFLlVQREFURS5OT1RfUkVBRFknXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBpc1N1YmNsaXBwZWQ6IHRydWUsIHBsYXllck1hcmtlcnNTZXQ6ICdvdXRPbmx5JywgYXNzZXRNYXJrZXJzOiAnbmVpdGhlclNhbWUnLCBhbHJlYWR5VXNlZDogZmFsc2UsXG4gICAgICAgICAgZXhwZWN0ZWRSZXN1bHQ6IGZhbHNlLCBleHBlY3RlZEhvdmVyVGV4dEtleTogJ0FTU0VULlNBVkVfU1VCQ0xJUC5BQ1RJT05fQlVUVE9OLlNBVkUuVElUTEUuVVBEQVRFLk5PVF9SRUFEWSdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGlzU3ViY2xpcHBlZDogdHJ1ZSwgcGxheWVyTWFya2Vyc1NldDogJ291dE9ubHknLCBhc3NldE1hcmtlcnM6ICduZWl0aGVyU2FtZScsIGFscmVhZHlVc2VkOiB0cnVlLFxuICAgICAgICAgIGV4cGVjdGVkUmVzdWx0OiBmYWxzZSwgZXhwZWN0ZWRIb3ZlclRleHRLZXk6ICdBU1NFVC5TQVZFX1NVQkNMSVAuQUNUSU9OX0JVVFRPTi5TQVZFLlRJVExFLlVQREFURS5OT1RfUkVBRFknXG4gICAgICAgIH0sXG5cbiAgICAgICAge1xuICAgICAgICAgIGlzU3ViY2xpcHBlZDogdHJ1ZSwgcGxheWVyTWFya2Vyc1NldDogJ2luT25seScsIGFzc2V0TWFya2VyczogJ2JvdGhTYW1lJywgYWxyZWFkeVVzZWQ6IGZhbHNlLFxuICAgICAgICAgIGV4cGVjdGVkUmVzdWx0OiBmYWxzZSwgZXhwZWN0ZWRIb3ZlclRleHRLZXk6ICdBU1NFVC5TQVZFX1NVQkNMSVAuQUNUSU9OX0JVVFRPTi5TQVZFLlRJVExFLlVQREFURS5OT1RfUkVBRFknXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBpc1N1YmNsaXBwZWQ6IHRydWUsIHBsYXllck1hcmtlcnNTZXQ6ICdpbk9ubHknLCBhc3NldE1hcmtlcnM6ICdib3RoU2FtZScsIGFscmVhZHlVc2VkOiB0cnVlLFxuICAgICAgICAgIGV4cGVjdGVkUmVzdWx0OiBmYWxzZSwgZXhwZWN0ZWRIb3ZlclRleHRLZXk6ICdBU1NFVC5TQVZFX1NVQkNMSVAuQUNUSU9OX0JVVFRPTi5TQVZFLlRJVExFLlVQREFURS5OT1RfUkVBRFknXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBpc1N1YmNsaXBwZWQ6IHRydWUsIHBsYXllck1hcmtlcnNTZXQ6ICdpbk9ubHknLCBhc3NldE1hcmtlcnM6ICdvdXRTYW1lJywgYWxyZWFkeVVzZWQ6IGZhbHNlLFxuICAgICAgICAgIGV4cGVjdGVkUmVzdWx0OiBmYWxzZSwgZXhwZWN0ZWRIb3ZlclRleHRLZXk6ICdBU1NFVC5TQVZFX1NVQkNMSVAuQUNUSU9OX0JVVFRPTi5TQVZFLlRJVExFLlVQREFURS5OT1RfUkVBRFknXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBpc1N1YmNsaXBwZWQ6IHRydWUsIHBsYXllck1hcmtlcnNTZXQ6ICdpbk9ubHknLCBhc3NldE1hcmtlcnM6ICdvdXRTYW1lJywgYWxyZWFkeVVzZWQ6IHRydWUsXG4gICAgICAgICAgZXhwZWN0ZWRSZXN1bHQ6IGZhbHNlLCBleHBlY3RlZEhvdmVyVGV4dEtleTogJ0FTU0VULlNBVkVfU1VCQ0xJUC5BQ1RJT05fQlVUVE9OLlNBVkUuVElUTEUuVVBEQVRFLk5PVF9SRUFEWSdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGlzU3ViY2xpcHBlZDogdHJ1ZSwgcGxheWVyTWFya2Vyc1NldDogJ2luT25seScsIGFzc2V0TWFya2VyczogJ2luU2FtZScsIGFscmVhZHlVc2VkOiBmYWxzZSxcbiAgICAgICAgICBleHBlY3RlZFJlc3VsdDogZmFsc2UsIGV4cGVjdGVkSG92ZXJUZXh0S2V5OiAnQVNTRVQuU0FWRV9TVUJDTElQLkFDVElPTl9CVVRUT04uU0FWRS5USVRMRS5VUERBVEUuTk9UX1JFQURZJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgaXNTdWJjbGlwcGVkOiB0cnVlLCBwbGF5ZXJNYXJrZXJzU2V0OiAnaW5Pbmx5JywgYXNzZXRNYXJrZXJzOiAnaW5TYW1lJywgYWxyZWFkeVVzZWQ6IHRydWUsXG4gICAgICAgICAgZXhwZWN0ZWRSZXN1bHQ6IGZhbHNlLCBleHBlY3RlZEhvdmVyVGV4dEtleTogJ0FTU0VULlNBVkVfU1VCQ0xJUC5BQ1RJT05fQlVUVE9OLlNBVkUuVElUTEUuVVBEQVRFLk5PVF9SRUFEWSdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGlzU3ViY2xpcHBlZDogdHJ1ZSwgcGxheWVyTWFya2Vyc1NldDogJ2luT25seScsIGFzc2V0TWFya2VyczogJ25laXRoZXJTYW1lJywgYWxyZWFkeVVzZWQ6IGZhbHNlLFxuICAgICAgICAgIGV4cGVjdGVkUmVzdWx0OiBmYWxzZSwgZXhwZWN0ZWRIb3ZlclRleHRLZXk6ICdBU1NFVC5TQVZFX1NVQkNMSVAuQUNUSU9OX0JVVFRPTi5TQVZFLlRJVExFLlVQREFURS5OT1RfUkVBRFknXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBpc1N1YmNsaXBwZWQ6IHRydWUsIHBsYXllck1hcmtlcnNTZXQ6ICdpbk9ubHknLCBhc3NldE1hcmtlcnM6ICduZWl0aGVyU2FtZScsIGFscmVhZHlVc2VkOiB0cnVlLFxuICAgICAgICAgIGV4cGVjdGVkUmVzdWx0OiBmYWxzZSwgZXhwZWN0ZWRIb3ZlclRleHRLZXk6ICdBU1NFVC5TQVZFX1NVQkNMSVAuQUNUSU9OX0JVVFRPTi5TQVZFLlRJVExFLlVQREFURS5OT1RfUkVBRFknXG4gICAgICAgIH0sXG5cbiAgICAgICAge1xuICAgICAgICAgIGlzU3ViY2xpcHBlZDogdHJ1ZSwgcGxheWVyTWFya2Vyc1NldDogJ2JvdGgnLCBhc3NldE1hcmtlcnM6ICdib3RoU2FtZScsIGFscmVhZHlVc2VkOiBmYWxzZSxcbiAgICAgICAgICBleHBlY3RlZFJlc3VsdDogZmFsc2UsIGV4cGVjdGVkSG92ZXJUZXh0S2V5OiAnQVNTRVQuU0FWRV9TVUJDTElQLkFDVElPTl9CVVRUT04uU0FWRS5USVRMRS5OT1RfQ0hBTkdFRCdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGlzU3ViY2xpcHBlZDogdHJ1ZSwgcGxheWVyTWFya2Vyc1NldDogJ2JvdGgnLCBhc3NldE1hcmtlcnM6ICdib3RoU2FtZScsIGFscmVhZHlVc2VkOiB0cnVlLFxuICAgICAgICAgIGV4cGVjdGVkUmVzdWx0OiBmYWxzZSwgZXhwZWN0ZWRIb3ZlclRleHRLZXk6ICdBU1NFVC5TQVZFX1NVQkNMSVAuQUNUSU9OX0JVVFRPTi5TQVZFLlRJVExFLk5PVF9DSEFOR0VEJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgaXNTdWJjbGlwcGVkOiB0cnVlLCBwbGF5ZXJNYXJrZXJzU2V0OiAnYm90aCcsIGFzc2V0TWFya2VyczogJ291dFNhbWUnLCBhbHJlYWR5VXNlZDogZmFsc2UsXG4gICAgICAgICAgZXhwZWN0ZWRSZXN1bHQ6IHRydWUsIGV4cGVjdGVkSG92ZXJUZXh0S2V5OiAnQVNTRVQuU0FWRV9TVUJDTElQLkFDVElPTl9CVVRUT04uU0FWRS5USVRMRS5VUERBVEUuUkVBRFknXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBpc1N1YmNsaXBwZWQ6IHRydWUsIHBsYXllck1hcmtlcnNTZXQ6ICdib3RoJywgYXNzZXRNYXJrZXJzOiAnb3V0U2FtZScsIGFscmVhZHlVc2VkOiB0cnVlLFxuICAgICAgICAgIGV4cGVjdGVkUmVzdWx0OiBmYWxzZSwgZXhwZWN0ZWRIb3ZlclRleHRLZXk6ICdBU1NFVC5TQVZFX1NVQkNMSVAuQUNUSU9OX0JVVFRPTi5TQVZFLlRJVExFLkFMUkVBRFlfVVNFRCdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGlzU3ViY2xpcHBlZDogdHJ1ZSwgcGxheWVyTWFya2Vyc1NldDogJ2JvdGgnLCBhc3NldE1hcmtlcnM6ICdpblNhbWUnLCBhbHJlYWR5VXNlZDogZmFsc2UsXG4gICAgICAgICAgZXhwZWN0ZWRSZXN1bHQ6IHRydWUsIGV4cGVjdGVkSG92ZXJUZXh0S2V5OiAnQVNTRVQuU0FWRV9TVUJDTElQLkFDVElPTl9CVVRUT04uU0FWRS5USVRMRS5VUERBVEUuUkVBRFknXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBpc1N1YmNsaXBwZWQ6IHRydWUsIHBsYXllck1hcmtlcnNTZXQ6ICdib3RoJywgYXNzZXRNYXJrZXJzOiAnaW5TYW1lJywgYWxyZWFkeVVzZWQ6IHRydWUsXG4gICAgICAgICAgZXhwZWN0ZWRSZXN1bHQ6IGZhbHNlLCBleHBlY3RlZEhvdmVyVGV4dEtleTogJ0FTU0VULlNBVkVfU1VCQ0xJUC5BQ1RJT05fQlVUVE9OLlNBVkUuVElUTEUuQUxSRUFEWV9VU0VEJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgaXNTdWJjbGlwcGVkOiB0cnVlLCBwbGF5ZXJNYXJrZXJzU2V0OiAnYm90aCcsIGFzc2V0TWFya2VyczogJ25laXRoZXJTYW1lJywgYWxyZWFkeVVzZWQ6IGZhbHNlLFxuICAgICAgICAgIGV4cGVjdGVkUmVzdWx0OiB0cnVlLCBleHBlY3RlZEhvdmVyVGV4dEtleTogJ0FTU0VULlNBVkVfU1VCQ0xJUC5BQ1RJT05fQlVUVE9OLlNBVkUuVElUTEUuVVBEQVRFLlJFQURZJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgaXNTdWJjbGlwcGVkOiB0cnVlLCBwbGF5ZXJNYXJrZXJzU2V0OiAnYm90aCcsIGFzc2V0TWFya2VyczogJ25laXRoZXJTYW1lJywgYWxyZWFkeVVzZWQ6IHRydWUsXG4gICAgICAgICAgZXhwZWN0ZWRSZXN1bHQ6IGZhbHNlLCBleHBlY3RlZEhvdmVyVGV4dEtleTogJ0FTU0VULlNBVkVfU1VCQ0xJUC5BQ1RJT05fQlVUVE9OLlNBVkUuVElUTEUuQUxSRUFEWV9VU0VEJ1xuICAgICAgICB9XG4gICAgICBdO1xuXG4gICAgICB0ZXN0cy5mb3JFYWNoKHRlc3QgPT4ge1xuICAgICAgICBkZXNjcmliZShgd2hlbiBhc3NldCAke3Rlc3QuaXNTdWJjbGlwcGVkID8gJ2lzJyA6ICdpcyBub3QnfSBzdWJjbGlwcGVkYCwgKCkgPT4ge1xuICAgICAgICAgIGxldCBwbGF5ZXJNYXJrZXJzU3RhdGU6IHN0cmluZztcbiAgICAgICAgICBsZXQgcGxheWVyTWFya2VyczogU3ViY2xpcE1hcmtlcnM7XG5cbiAgICAgICAgICBzd2l0Y2ggKHRlc3QucGxheWVyTWFya2Vyc1NldCkge1xuICAgICAgICAgICAgY2FzZSAnbmVpdGhlcic6XG4gICAgICAgICAgICAgIHBsYXllck1hcmtlcnNTdGF0ZSA9ICdtYXJrZXJzIGFyZSBib3RoIHVuc2V0JztcbiAgICAgICAgICAgICAgcGxheWVyTWFya2VycyA9IHsgaW46IHVuZGVmaW5lZCwgb3V0OiB1bmRlZmluZWQgfTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdvdXRPbmx5JzpcbiAgICAgICAgICAgICAgcGxheWVyTWFya2Vyc1N0YXRlID0gJ291dCBtYXJrZXIgaXMgc2V0JztcbiAgICAgICAgICAgICAgcGxheWVyTWFya2VycyA9IHsgaW46IHVuZGVmaW5lZCwgb3V0OiBvdXRNYXJrZXJGcmFtZSB9O1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2luT25seSc6XG4gICAgICAgICAgICAgIHBsYXllck1hcmtlcnNTdGF0ZSA9ICdpbiBtYXJrZXIgaXMgc2V0JztcbiAgICAgICAgICAgICAgcGxheWVyTWFya2VycyA9IHsgaW46IGluTWFya2VyRnJhbWUsIG91dDogdW5kZWZpbmVkIH07XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnYm90aCc6XG4gICAgICAgICAgICAgIHBsYXllck1hcmtlcnNTdGF0ZSA9ICdtYXJrZXJzIGFyZSBib3RoIHNldCc7XG4gICAgICAgICAgICAgIHBsYXllck1hcmtlcnMgPSB7IGluOiBpbk1hcmtlckZyYW1lLCBvdXQ6IG91dE1hcmtlckZyYW1lIH07XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDogdGhyb3cgbmV3IEVycm9yKCdCYWQgdmFsdWUgZm9yIHRlc3QucGxheWVyTWFya2Vyc1NldCEnKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBkZXNjcmliZShgd2hlbiBwbGF5ZXIgJHtwbGF5ZXJNYXJrZXJzU3RhdGV9YCwgKCkgPT4ge1xuICAgICAgICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5vblBsYXllck1hcmtlckNoYW5nZShwbGF5ZXJNYXJrZXJzKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBsZXQgYXNzZXRNYXJrZXJzRGVzY3JpcHRpb246IHN0cmluZztcbiAgICAgICAgICAgIGxldCBhc3NldEluOiBGcmFtZTtcbiAgICAgICAgICAgIGxldCBhc3NldE91dDogRnJhbWU7XG5cbiAgICAgICAgICAgIHN3aXRjaCAodGVzdC5hc3NldE1hcmtlcnMpIHtcbiAgICAgICAgICAgICAgY2FzZSAnYm90aFNhbWUnOlxuICAgICAgICAgICAgICAgIGFzc2V0TWFya2Vyc0Rlc2NyaXB0aW9uID0gJ2JvdGggbWF0Y2ggcGxheWVyIG1hcmtlcnMnO1xuICAgICAgICAgICAgICAgIGFzc2V0SW4gPSBwbGF5ZXJNYXJrZXJzLmluO1xuICAgICAgICAgICAgICAgIGFzc2V0T3V0ID0gcGxheWVyTWFya2Vycy5vdXQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgJ291dFNhbWUnOlxuICAgICAgICAgICAgICAgIGFzc2V0TWFya2Vyc0Rlc2NyaXB0aW9uID0gJ21hdGNoIHBsYXllciBvdXQgbWFya2VyJztcbiAgICAgICAgICAgICAgICBhc3NldEluID0gb3RoZXJJbk1hcmtlckZyYW1lO1xuICAgICAgICAgICAgICAgIGFzc2V0T3V0ID0gcGxheWVyTWFya2Vycy5vdXQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgJ2luU2FtZSc6XG4gICAgICAgICAgICAgICAgYXNzZXRNYXJrZXJzRGVzY3JpcHRpb24gPSAnbWF0Y2ggcGxheWVyIGluIG1hcmtlcic7XG4gICAgICAgICAgICAgICAgYXNzZXRJbiA9IHBsYXllck1hcmtlcnMuaW47XG4gICAgICAgICAgICAgICAgYXNzZXRPdXQgPSBvdGhlck91dE1hcmtlckZyYW1lO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlICduZWl0aGVyU2FtZSc6XG4gICAgICAgICAgICAgICAgYXNzZXRNYXJrZXJzRGVzY3JpcHRpb24gPSAnZG9uXFwndCBtYXRjaCBlaXRoZXIgcGxheWVyIG1hcmtlcic7XG4gICAgICAgICAgICAgICAgYXNzZXRJbiA9IG90aGVySW5NYXJrZXJGcmFtZTtcbiAgICAgICAgICAgICAgICBhc3NldE91dCA9IG90aGVyT3V0TWFya2VyRnJhbWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGRlZmF1bHQ6IHRocm93IG5ldyBFcnJvcignQmFkIHZhbHVlIGZvciB0ZXN0LmFzc2V0TWFya2VycyEnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZGVzY3JpYmUoYHdoZW4gYXNzZXQgbWFya2VycyAke2Fzc2V0TWFya2Vyc0Rlc2NyaXB0aW9ufWAsICgpID0+IHtcbiAgICAgICAgICAgICAgaXQoYHJldHVybnMgJHt0ZXN0LmV4cGVjdGVkUmVzdWx0fSB3aGVuIHBsYXllciBtYXJrZXJzICR7dGVzdC5hbHJlYWR5VXNlZCA/ICdhcmUnIDogJ2FyZSBub3QnfSBhbHJlYWR5IHVzZWRgLFxuICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5lbmhhbmNlZEFzc2V0ID0ge1xuICAgICAgICAgICAgICAgICAgICBpc1N1YmNsaXBwZWQ6IHRlc3QuaXNTdWJjbGlwcGVkLFxuICAgICAgICAgICAgICAgICAgICBpbk1hcmtlckZyYW1lOiBhc3NldEluLFxuICAgICAgICAgICAgICAgICAgICBvdXRNYXJrZXJGcmFtZTogYXNzZXRPdXQsXG4gICAgICAgICAgICAgICAgICAgIHN1YmNsaXBNYXJrZXJzOiB7IGluOiBhc3NldEluLCBvdXQ6IGFzc2V0T3V0IH1cbiAgICAgICAgICAgICAgICAgIH0gYXMgYW55O1xuXG4gICAgICAgICAgICAgICAgICBpZiAodGVzdC5hbHJlYWR5VXNlZCkgY29tcG9uZW50VW5kZXJUZXN0LmFscmVhZHlVc2VkTWFya2Vyc0xpc3QgPSBbcGxheWVyTWFya2Vyc107XG5cbiAgICAgICAgICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QubWFya2Vyc0FyZVNhdmFibGUpLnRvQmUodGVzdC5leHBlY3RlZFJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0Lm1hcmtlcnNTYXZlQnV0dG9uSG92ZXJUZXh0S2V5KS50b0JlKHRlc3QuZXhwZWN0ZWRIb3ZlclRleHRLZXkpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnbWFya2Vyc0FyZUFscmVhZHlVc2VkIGdldHRlcicsICgpID0+IHtcbiAgICAgIGRlc2NyaWJlKCd3aGVuIHBsYXllciBtYXJrZXJzIGFyZSBzZXQnLCAoKSA9PiB7XG4gICAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5vblBsYXllck1hcmtlckNoYW5nZSh7IGluOiBpbk1hcmtlckZyYW1lLCBvdXQ6IG91dE1hcmtlckZyYW1lIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyB0cnVlIHdoZW4gdGhlIHBsYXllciBtYXJrZXJzIGFyZSBwcmVzZW50IGluIHRoZSBhbHJlYWR5VXNlZE1hcmtlcnNMaXN0IEBJbnB1dCcsICgpID0+IHtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuYWxyZWFkeVVzZWRNYXJrZXJzTGlzdCA9IFt7IGluOiBpbk1hcmtlckZyYW1lLCBvdXQ6IG91dE1hcmtlckZyYW1lIH1dO1xuXG4gICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5tYXJrZXJzQXJlQWxyZWFkeVVzZWQpLnRvQmUodHJ1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIHdoZW4gdGhlIHBsYXllciBtYXJrZXJzIGFyZSBub3QgcHJlc2VudCBpbiB0aGUgYWxyZWFkeVVzZWRNYXJrZXJzTGlzdCBASW5wdXQnLCAoKSA9PiB7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmFscmVhZHlVc2VkTWFya2Vyc0xpc3QgPSBbeyBpbjogb3RoZXJJbk1hcmtlckZyYW1lLCBvdXQ6IG90aGVyT3V0TWFya2VyRnJhbWUgfV07XG5cbiAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0Lm1hcmtlcnNBcmVBbHJlYWR5VXNlZCkudG9CZShmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIHdoZW4gdGhlIGFscmVhZHlVc2VkTWFya2Vyc0xpc3QgQElucHV0IGlzIGVtcHR5JywgKCkgPT4ge1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5hbHJlYWR5VXNlZE1hcmtlcnNMaXN0ID0gW107XG5cbiAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0Lm1hcmtlcnNBcmVBbHJlYWR5VXNlZCkudG9CZShmYWxzZSk7XG5cbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgZGVzY3JpYmUoJ3doZW4gcGxheWVyIG1hcmtlcnMgYXJlIG5vdCBzZXQnLCAoKSA9PiB7XG4gICAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5vblBsYXllck1hcmtlckNoYW5nZSh7IGluOiB1bmRlZmluZWQsIG91dDogdW5kZWZpbmVkIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyB0cnVlIHdoZW4gdW5zZXQgbWFya2VycyBhcmUgcHJlc2VudCBpbiB0aGUgYWxyZWFkeVVzZWRNYXJrZXJzTGlzdCBASW5wdXQgKGZ1bGwgYXNzZXQpJywgKCkgPT4ge1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5hbHJlYWR5VXNlZE1hcmtlcnNMaXN0ID0gW3sgaW46IHVuZGVmaW5lZCwgb3V0OiB1bmRlZmluZWQgfV07XG5cbiAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0Lm1hcmtlcnNBcmVBbHJlYWR5VXNlZCkudG9CZSh0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgZmFsc2Ugd2hlbiBvdGhlciBtYXJrZXJzIGFyZSBwcmVzZW50IGluIHRoZSBhbHJlYWR5VXNlZE1hcmtlcnNMaXN0IEBJbnB1dCcsICgpID0+IHtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuYWxyZWFkeVVzZWRNYXJrZXJzTGlzdCA9IFt7IGluOiBpbk1hcmtlckZyYW1lLCBvdXQ6IG91dE1hcmtlckZyYW1lIH1dO1xuXG4gICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5tYXJrZXJzQXJlQWxyZWFkeVVzZWQpLnRvQmUoZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSB3aGVuIHRoZSBhbHJlYWR5VXNlZE1hcmtlcnNMaXN0IEBJbnB1dCBpcyBlbXB0eScsICgpID0+IHtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuYWxyZWFkeVVzZWRNYXJrZXJzTGlzdCA9IFtdO1xuXG4gICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5tYXJrZXJzQXJlQWxyZWFkeVVzZWQpLnRvQmUoZmFsc2UpO1xuXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnY2FuY2VsQnV0dG9uSG92ZXJUZXh0S2V5IGdldHRlcicsICgpID0+IHtcbiAgICAgIGl0KCdyZXR1cm5zIHRoZSBleHBlY3RlZCBrZXkgd2hlbiB0aGUgYXNzZXQgaXMgc3ViY2xpcHBlZCcsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmVuaGFuY2VkQXNzZXQgPSB7IGlzU3ViY2xpcHBlZDogdHJ1ZSB9IGFzIGFueTtcblxuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmNhbmNlbEJ1dHRvbkhvdmVyVGV4dEtleSkudG9CZSgnQVNTRVQuU0FWRV9TVUJDTElQLkFDVElPTl9CVVRUT04uQ0FOQ0VMLlRJVExFLlVQREFURScpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIHRoZSBleHBlY3RlZCBrZXkgd2hlbiB0aGUgYXNzZXQgaXMgbm90IHN1YmNsaXBwZWQnLCAoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5lbmhhbmNlZEFzc2V0ID0geyBpc1N1YmNsaXBwZWQ6IGZhbHNlIH0gYXMgYW55O1xuXG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuY2FuY2VsQnV0dG9uSG92ZXJUZXh0S2V5KS50b0JlKCdBU1NFVC5TQVZFX1NVQkNMSVAuQUNUSU9OX0JVVFRPTi5DQU5DRUwuVElUTEUuQUREJyk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdtYXJrZXJzU2F2ZUJ1dHRvbkxhYmVsS2V5IGdldHRlcicsICgpID0+IHtcbiAgICAgIGl0KCdyZXR1cm5zIHRoZSBleHBlY3RlZCBrZXkgd2hlbiB0aGUgYXNzZXQgaXMgc3ViY2xpcHBlZCcsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmVuaGFuY2VkQXNzZXQgPSB7IGlzU3ViY2xpcHBlZDogdHJ1ZSB9IGFzIGFueTtcblxuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0Lm1hcmtlcnNTYXZlQnV0dG9uTGFiZWxLZXkpLnRvQmUoJ0FTU0VULlNBVkVfU1VCQ0xJUC5BQ1RJT05fQlVUVE9OLlNBVkUuTEFCRUwuVVBEQVRFJyk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3JldHVybnMgdGhlIGV4cGVjdGVkIGtleSB3aGVuIHRoZSBhc3NldCBpcyBub3Qgc3ViY2xpcHBlZCcsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmVuaGFuY2VkQXNzZXQgPSB7IGlzU3ViY2xpcHBlZDogZmFsc2UgfSBhcyBhbnk7XG5cbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5tYXJrZXJzU2F2ZUJ1dHRvbkxhYmVsS2V5KS50b0JlKCdBU1NFVC5TQVZFX1NVQkNMSVAuQUNUSU9OX0JVVFRPTi5TQVZFLkxBQkVMLkFERCcpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnbWFya2Vyc1JlbW92ZUJ1dHRvbkhvdmVyVGV4dEtleSBnZXR0ZXInLCAoKSA9PiB7XG4gICAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm9uUGxheWVyTWFya2VyQ2hhbmdlKHsgaW46IGluTWFya2VyRnJhbWUsIG91dDogb3V0TWFya2VyRnJhbWUgfSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3JldHVybnMgdGhlIGV4cGVjdGVkIGtleSB3aGVuIHRoZSBwbGF5ZXIgbWFya2VycyBhcmUgYWxyZWFkeSB1c2VkJywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuYWxyZWFkeVVzZWRNYXJrZXJzTGlzdCA9IFt7IGluOiBpbk1hcmtlckZyYW1lLCBvdXQ6IG91dE1hcmtlckZyYW1lIH1dO1xuXG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QubWFya2Vyc1JlbW92ZUJ1dHRvbkhvdmVyVGV4dEtleSlcbiAgICAgICAgICAudG9CZSgnQVNTRVQuU0FWRV9TVUJDTElQLkFDVElPTl9CVVRUT04uUkVNT1ZFLlRJVExFLkFMUkVBRFlfVVNFRCcpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIHRoZSBleHBlY3RlZCBrZXkgd2hlbiB0aGUgcGxheWVyIG1hcmtlcnMgYXJlIG5vdCBhbHJlYWR5IHVzZWQnLCAoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5hbHJlYWR5VXNlZE1hcmtlcnNMaXN0ID0gW107XG5cbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5tYXJrZXJzUmVtb3ZlQnV0dG9uSG92ZXJUZXh0S2V5KS50b0JlKCdBU1NFVC5TQVZFX1NVQkNMSVAuQUNUSU9OX0JVVFRPTi5SRU1PVkUuVElUTEUuUkVBRFknKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ29uQ2FuY2VsQnV0dG9uQ2xpY2soKScsICgpID0+IHtcbiAgICAgIGl0KCdlbWl0cyBhIGNhbmNlbCBldmVudCcsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm9uQ2FuY2VsQnV0dG9uQ2xpY2soKTtcblxuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmNhbmNlbC5lbWl0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aCgpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnb25TYXZlQnV0dG9uQ2xpY2soKScsICgpID0+IHtcbiAgICAgIGl0KCdlbWl0cyB0aGUgdXBkYXRlZCBtYXJrZXJzJywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3Qub25QbGF5ZXJNYXJrZXJDaGFuZ2UoeyBpbjogaW5NYXJrZXJGcmFtZSwgb3V0OiBvdXRNYXJrZXJGcmFtZSB9KTtcblxuICAgICAgICBjb21wb25lbnRVbmRlclRlc3Qub25TYXZlQnV0dG9uQ2xpY2soKTtcblxuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnNhdmUuZW1pdCkudG9IYXZlQmVlbkNhbGxlZFdpdGgoeyBpbjogaW5NYXJrZXJGcmFtZSwgb3V0OiBvdXRNYXJrZXJGcmFtZSB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ29uUmVtb3ZlQnV0dG9uQ2xpY2soKScsICgpID0+IHtcbiAgICAgIGl0KCdlbWl0cyB0aGUgdXBkYXRlZCBtYXJrZXJzJywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3Qub25QbGF5ZXJNYXJrZXJDaGFuZ2UoeyBpbjogdW5kZWZpbmVkLCBvdXQ6IHVuZGVmaW5lZCB9KTtcblxuICAgICAgICBjb21wb25lbnRVbmRlclRlc3Qub25SZW1vdmVCdXR0b25DbGljaygpO1xuXG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3Quc2F2ZS5lbWl0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aCh7IGluOiB1bmRlZmluZWQsIG91dDogdW5kZWZpbmVkIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnYXNzZXRIYXNNYXJrZXJzIGdldHRlcicsICgpID0+IHtcbiAgICAgIGl0KCdyZXR1cm5zIHRydWUgaWYgdGhlIGFzc2V0IGlzIHN1YmNsaXBwZWQnLCAoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5lbmhhbmNlZEFzc2V0ID0geyBpc1N1YmNsaXBwZWQ6IHRydWUgfSBhcyBhbnk7XG5cbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5hc3NldEhhc01hcmtlcnMpLnRvQmUodHJ1ZSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgdGhlIGFzc2V0IGlzIG5vdCBzdWJjbGlwcGVkJywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuZW5oYW5jZWRBc3NldCA9IHsgaXNTdWJjbGlwcGVkOiBmYWxzZSB9IGFzIGFueTtcblxuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmFzc2V0SGFzTWFya2VycykudG9CZShmYWxzZSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdhc3NldEluTWFya2VyIGdldHRlcicsICgpID0+IHtcbiAgICAgIGl0KCdyZXR1cm5zIHRoZSBhc3NldFxcJ3MgaW4gbWFya2VyIEZyYW1lIG9iamVjdCcsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmVuaGFuY2VkQXNzZXQgPSB7IHN1YmNsaXBNYXJrZXJzOiB7IGluOiBpbk1hcmtlckZyYW1lLCBvdXQ6IG91dE1hcmtlckZyYW1lIH0gfSBhcyBhbnk7XG5cbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5hc3NldEluTWFya2VyKS50b0VxdWFsKGluTWFya2VyRnJhbWUpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnYXNzZXRPdXRNYXJrZXIgZ2V0dGVyJywgKCkgPT4ge1xuICAgICAgaXQoJ3JldHVybnMgdGhlIGFzc2V0XFwncyBvdXQgbWFya2VyIEZyYW1lIG9iamVjdCcsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmVuaGFuY2VkQXNzZXQgPSB7IHN1YmNsaXBNYXJrZXJzOiB7IGluOiBpbk1hcmtlckZyYW1lLCBvdXQ6IG91dE1hcmtlckZyYW1lIH0gfSBhcyBhbnk7XG5cbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5hc3NldE91dE1hcmtlcikudG9FcXVhbChvdXRNYXJrZXJGcmFtZSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdwbGF5ZXJJbk1hcmtlciBnZXR0ZXInLCAoKSA9PiB7XG4gICAgICBpdCgncmV0dXJucyB0aGUgcGxheWVyXFwncyBpbiBtYXJrZXIgRnJhbWUgb2JqZWN0JywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3Qub25QbGF5ZXJNYXJrZXJDaGFuZ2UoeyBpbjogaW5NYXJrZXJGcmFtZSwgb3V0OiBvdXRNYXJrZXJGcmFtZSB9KTtcblxuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnBsYXllckluTWFya2VyKS50b0VxdWFsKGluTWFya2VyRnJhbWUpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgncGxheWVyT3V0TWFya2VyIGdldHRlcicsICgpID0+IHtcbiAgICAgIGl0KCdyZXR1cm5zIHRoZSBwbGF5ZXJcXCdzIG91dCBtYXJrZXIgRnJhbWUgb2JqZWN0JywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3Qub25QbGF5ZXJNYXJrZXJDaGFuZ2UoeyBpbjogaW5NYXJrZXJGcmFtZSwgb3V0OiBvdXRNYXJrZXJGcmFtZSB9KTtcblxuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnBsYXllck91dE1hcmtlcikudG9FcXVhbChvdXRNYXJrZXJGcmFtZSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59XG4iXX0=
