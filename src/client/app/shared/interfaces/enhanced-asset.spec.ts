import { Frame } from '../../shared/modules/wazee-frame-formatter/index';
import { EnhancedAsset } from './enhanced-asset';

export function main() {
  describe('Enhanced Asset', () => {
    let assetUnderTest: EnhancedAsset;
    const frameRate: number = 30;
    const frameRateMetadatum: string = `${frameRate} fps`;
    const durationInMilliseconds: number = 9000;
    const durationInFrames: number = durationInMilliseconds * frameRate / 1000;

    const generateFrameTestsFrom: Function = (
      tests: any[],
      frameGetterName: string,
      frameNumberGetterName: string,
      millisecondsGetterName: string = undefined,
      percentageGetterName: string = undefined
    ) => {
      for (const test of tests) {
        const expectedResultDescription: string = test.expected ? 'its expected value' : 'undefined';

        it(`returns ${expectedResultDescription} when the asset ${test.condition}`, () => {
          Object.assign(
            assetUnderTest,
            { metadata: [] },
            test.hasOwnProperty('timeStart') ? { timeStart: test.timeStart } : null,
            test.hasOwnProperty('timeEnd') ? { timeEnd: test.timeEnd } : null
          );

          if (test.frameRate) assetUnderTest.metadata[0] = { name: 'Format.FrameRate', value: frameRateMetadatum };
          if (test.duration) assetUnderTest.metadata[1] = { name: 'Format.Duration', value: `${durationInMilliseconds}` };

          if (test.expectedMilliseconds >= 0) {
            const expectedFrame: Frame = new Frame(frameRate).setFromSeconds(test.expectedMilliseconds / 1000);

            expect((assetUnderTest as any)[frameGetterName]).toEqual(expectedFrame);
            expect((assetUnderTest as any)[frameNumberGetterName]).toEqual(expectedFrame.frameNumber);
            if (millisecondsGetterName) {
              expect((assetUnderTest as any)[millisecondsGetterName]).toEqual(test.expectedMilliseconds);
            }
            if (percentageGetterName) {
              expect((assetUnderTest as any)[percentageGetterName])
                .toEqual(test.duration ? test.expectedMilliseconds * 100 / durationInMilliseconds : 0);
            }
          } else {
            expect((assetUnderTest as any)[frameGetterName]).toBeUndefined();
            expect((assetUnderTest as any)[frameNumberGetterName]).toBeUndefined();
            if (millisecondsGetterName) {
              expect((assetUnderTest as any)[millisecondsGetterName]).toBeUndefined();
            }
            if (percentageGetterName) {
              expect((assetUnderTest as any)[percentageGetterName]).toBe(0);
            }
          }
        });
      }
    };

    const generateMetadataTestsFor: Function = (
      getterName: string,
      metadataName: string,
      getterReturnValues: { [metadataValue: string]: any },
      index: number = -1
    ) => {
      const isIndexed: boolean = index >= 0;

      for (const metadataValue of Object.keys(getterReturnValues)) {
        const getterReturnValue: any = getterReturnValues[metadataValue];

        it(`returns the ${isIndexed ? `metadata value at index ${index}` : `${metadataName} metadata value`}`, () => {
          const metadata = [];
          metadata[isIndexed ? index : 0] = { name: metadataName, value: metadataValue };
          Object.assign(assetUnderTest, { metadata: metadata });

          expect((assetUnderTest as any)[getterName]).toEqual(getterReturnValue);
        });

        if (isIndexed) {
          it('does not care about the metadata name', () => {
            const metadata = [];
            metadata[isIndexed ? index : 0] = { name: `Not.${metadataName}`, value: metadataValue };
            Object.assign(assetUnderTest, { metadata: metadata });

            expect((assetUnderTest as any)[getterName]).toEqual(getterReturnValue);
          });
        }
      }

      it('returns undefined if the asset is missing the requested metadata', () => {
        expect((assetUnderTest as any)[getterName]).toBeUndefined();
      });

      if (isIndexed) {
        it('returns undefined if the asset has the requested metadata at a different index', () => {
          const metadata = [];
          metadata[(isIndexed ? index : 0) + 1] = { name: metadataName, value: 'the metadata value' };
          Object.assign(assetUnderTest, { metadata: metadata });

          expect((assetUnderTest as any)[getterName]).toBeUndefined();
        });
      }

      if (!isIndexed) {
        it('caches its value', () => {
          const metadata = [];
          metadata[isIndexed ? index : 0] = { name: metadataName, value: 'the metadata value' };
          Object.assign(assetUnderTest, { metadata: metadata });

          spyOn(assetUnderTest, 'getMetadataValueFor');

          let value: any = (assetUnderTest as any)[getterName];
          value = (assetUnderTest as any)[getterName];

          expect(assetUnderTest.getMetadataValueFor).toHaveBeenCalledTimes(1);
        });
      }
    };

    beforeEach(() => {
      assetUnderTest = new EnhancedAsset();
    });

    describe('each getter in [durationFrame, durationFrameNumber]', () => {
      const tests: any = [
        { condition: 'has no duration and no frame rate', expectedMilliseconds: undefined },
        { condition: 'has only a frame rate', frameRate: true, expectedMilliseconds: undefined },
        { condition: 'has only a duration', duration: true, expectedMilliseconds: undefined },
        {
          condition: 'has a duration and a frame rate',
          duration: true, frameRate: true, expectedMilliseconds: durationInMilliseconds
        },
      ];

      generateFrameTestsFrom(tests, 'durationFrame', 'durationFrameNumber');
    });

    describe('durationMilliseconds getter', () => {
      generateMetadataTestsFor(
        'durationMilliseconds',
        'Format.Duration',
        { '12345678': 12345678, '12345678.9': 12345678, '00:01:00': undefined }
      );

      it('can handle HH:MM:SS duration metadata when a frame rate is defined', () => {
        Object.assign(
          assetUnderTest,
          { metadata: [{ name: 'Format.FrameRate', value: '30 fps' }, { name: 'Format.Duration', value: '00:01:00' }] }
        );

        expect(assetUnderTest.durationMilliseconds).toBe(60000);
      });
    });

    describe(
      'each getter in [subclipDurationFrame, subclipDurationFrameNumber, subclipDurationMilliseconds, subclipDurationPercentage]',
      () => {
        const tests: any = [
          { condition: 'has no timeStart, no timeEnd, no duration, and no frame rate', expectedMilliseconds: undefined },
          { condition: 'has only a frame rate', frameRate: true, expectedMilliseconds: undefined },
          { condition: 'has only a duration', duration: true, expectedMilliseconds: undefined },
          {
            condition: 'has a duration and a frame rate',
            duration: true, frameRate: true, expectedMilliseconds: durationInMilliseconds
          },
          { condition: 'has only a timeEnd', timeEnd: 6000, expectedMilliseconds: undefined },
          {
            condition: 'has a timeEnd and a frame rate', timeEnd: 6000, frameRate: true, expectedMilliseconds: 6000 - 0
          },
          { condition: 'has a timeEnd and a duration', timeEnd: 6000, duration: true, expectedMilliseconds: undefined },
          {
            condition: 'has a timeEnd, a duration, and a frame rate',
            timeEnd: 6000, duration: true, frameRate: true, expectedMilliseconds: 6000 - 0
          },
          { condition: 'has only a timeStart', timeStart: 3000, expectedMilliseconds: undefined },
          { condition: 'has a timeStart and a frame rate', timeStart: 3000, frameRate: true, expectedMilliseconds: undefined },
          { condition: 'has a timeStart and a duration', timeStart: 3000, duration: true, expectedMilliseconds: undefined },
          {
            condition: 'has a timeStart, a frame rate, and a duration',
            timeStart: 3000, frameRate: true, duration: true, expectedMilliseconds: durationInMilliseconds - 3000
          },
          { condition: 'has a timeStart and a timeEnd', timeStart: 3000, timeEnd: 6000, expectedMilliseconds: undefined },
          {
            condition: 'has a timeStart, a timeEnd, and a frame rate',
            timeStart: 3000, timeEnd: 6000, frameRate: true, expectedMilliseconds: 6000 - 3000
          },
          {
            condition: 'has a timeStart, a timeEnd, and a duration',
            timeStart: 3000, timeEnd: 6000, duration: true, expectedMilliseconds: undefined
          },
          {
            condition: 'has a timeStart, a timeEnd, a duration, and a frame rate',
            timeStart: 3000, timeEnd: 6000, duration: true, frameRate: true, expectedMilliseconds: 6000 - 3000
          }
        ];

        generateFrameTestsFrom(
          tests, 'subclipDurationFrame', 'subclipDurationFrameNumber', 'subclipDurationMilliseconds', 'subclipDurationPercentage'
        );
      });

    describe('each getter in [inMarkerFrame, inMarkerFrameNumber, inMarkerMilliseconds, inMarkerPercentage]', () => {
      const tests: any = [
        { condition: 'has no timeStart and no frame rate', expectedMilliseconds: undefined },
        { condition: 'has only a frame rate', frameRate: true, expectedMilliseconds: 0 },
        { condition: 'has only a positive timeStart', timeStart: 3000, expectedMilliseconds: undefined },
        { condition: 'has a positive timeStart and a frame rate', timeStart: 3000, frameRate: true, expectedMilliseconds: 3000 },
        { condition: 'has only a zero timeStart', timeStart: 0, expectedMilliseconds: undefined },
        { condition: 'has a zero timeStart and a frame rate', timeStart: 0, frameRate: true, expectedMilliseconds: 0 },
        { condition: 'has only a negative timeStart', timeStart: -1, expectedMilliseconds: undefined },
        { condition: 'has a negative timeStart and a frame rate', timeStart: -1, frameRate: true, expectedMilliseconds: 0 }
      ];

      generateFrameTestsFrom(tests, 'inMarkerFrame', 'inMarkerFrameNumber', 'inMarkerMilliseconds', 'inMarkerPercentage');
    });

    describe('each getter in [outMarkerFrame, outMarkerFrameNumber, outMarkerMilliseconds, outMarkerPercentage]', () => {
      const tests: any = [
        { condition: 'has no timeEnd, no duration, and no frame rate', expectedMilliseconds: undefined },
        { condition: 'has only a frame rate', frameRate: true, expectedMilliseconds: undefined },
        { condition: 'has only a duration', duration: true, expectedMilliseconds: undefined },
        {
          condition: 'has a duration and a frame rate',
          duration: true, frameRate: true, expectedMilliseconds: durationInMilliseconds
        },
        { condition: 'has only a positive timeEnd', timeEnd: 6000, expectedMilliseconds: undefined },
        { condition: 'has a positive timeEnd and a frame rate', timeEnd: 6000, frameRate: true, expectedMilliseconds: 6000 },
        { condition: 'has a positive timeEnd and a duration', timeEnd: 6000, duration: true, expectedMilliseconds: undefined },
        {
          condition: 'has a positive timeEnd, a duration, and a frame rate',
          timeEnd: 6000, duration: true, frameRate: true, expectedMilliseconds: 6000
        },
        { condition: 'has only a zero timeEnd', timeEnd: 0, expectedMilliseconds: undefined },
        { condition: 'has a zero timeEnd and a frame rate', timeEnd: 0, frameRate: true, expectedMilliseconds: 0 },
        { condition: 'has a zero timeEnd and a duration', timeEnd: 0, duration: true, expectedMilliseconds: undefined },
        {
          condition: 'has a zero timeEnd, a duration, and a frame rate',
          timeEnd: 0, duration: true, frameRate: true, expectedMilliseconds: 0
        },
        { condition: 'has only a negative timeEnd', timeEnd: -2, expectedMilliseconds: undefined },
        { condition: 'has a negative timeEnd and a frame rate', timeEnd: -2, frameRate: true, expectedMilliseconds: undefined },
        { condition: 'has a negative timeEnd and a duration', timeEnd: -2, duration: true, expectedMilliseconds: undefined },
        {
          condition: 'has a negative timeEnd, a duration, and a frame rate',
          timeEnd: -2, duration: true, frameRate: true, expectedMilliseconds: durationInMilliseconds
        }
      ];

      generateFrameTestsFrom(tests, 'outMarkerFrame', 'outMarkerFrameNumber', 'outMarkerMilliseconds', 'outMarkerPercentage');
    });

    describe('getMetadataValueFor()', () => {
      beforeEach(() => {
        Object.assign(assetUnderTest, { metadata: [] });
        assetUnderTest.metadata[42] = { name: 'Some.Name', value: 'some value' };
        assetUnderTest.metadata[47] = { name: 'Some.Other.Name', value: 'some other value' };
      });

      it('returns the expected metadata', () => {
        expect(assetUnderTest.getMetadataValueFor('Some.Name')).toEqual('some value');
        expect(assetUnderTest.getMetadataValueFor('Some.Other.Name')).toEqual('some other value');
      });

      it('returns undefined for a name that doesn\'t exist', () => {
        expect(assetUnderTest.getMetadataValueFor('Some.Nonexistent.Name')).toBeUndefined();
      });

      it('returns undefined for a name that doesn\'t have a value', () => {
        assetUnderTest.metadata[0] = { name: 'Yet.Another.Name' } as any;

        expect(assetUnderTest.getMetadataValueFor('Yet.Another.Name')).toBeUndefined();
      });

      it('is not confused by empty elements in the metadata array', () => {
        assetUnderTest.metadata[0] = {} as any;

        expect(assetUnderTest.getMetadataValueFor('Some.Name')).toEqual('some value');
      });

      it('is not confused by undefined elements in the metadata array', () => {
        assetUnderTest.metadata[0] = undefined;

        expect(assetUnderTest.getMetadataValueFor('Some.Name')).toEqual('some value');
      });

      it('is not confused by null elements in the metadata array', () => {
        assetUnderTest.metadata[0] = null;

        expect(assetUnderTest.getMetadataValueFor('Some.Name')).toEqual('some value');
      });

      it('is not confused by unexpected properties in the metadata object', () => {
        assetUnderTest.metadata[42] = { name: 'Some.Name', value: 'some value', other: 'junk', and: 'things' } as any;

        expect(assetUnderTest.getMetadataValueFor('Some.Name')).toEqual('some value');
      });
    });

    describe('convertMetadataValueFor()', () => {
      beforeEach(() => {
        Object.assign(assetUnderTest, { metadata: [] });
      });

      it('returns the return value of the passed-in function applied to the metadata value', () => {
        Object.assign(assetUnderTest, { metadata: [{ name: 'Some.Name', value: '3.14 bottles of beer on the wall' }] });

        expect(assetUnderTest.convertMetadataValueFor('Some.Name', value => parseFloat(value) * 2)).toEqual(6.28);
      });

      it('returns undefined if the asset is missing the requested metadata', () => {
        expect(assetUnderTest.convertMetadataValueFor('Some.Name', value => parseFloat(value) * 2)).toBeUndefined();
      });
    });

    describe('subclipMarkers getter', () => {
      const tests: { hasFrameRate: boolean, timeStart: number, timeEnd: number, expectedIn: boolean, expectedOut: boolean }[] = [
        { hasFrameRate: false, timeStart: undefined, timeEnd: undefined, expectedIn: false, expectedOut: false },
        { hasFrameRate: false, timeStart: undefined, timeEnd: null, expectedIn: false, expectedOut: false },
        { hasFrameRate: false, timeStart: undefined, timeEnd: -2, expectedIn: false, expectedOut: false },
        { hasFrameRate: false, timeStart: undefined, timeEnd: 2000, expectedIn: false, expectedOut: false },

        { hasFrameRate: false, timeStart: null, timeEnd: undefined, expectedIn: false, expectedOut: false },
        { hasFrameRate: false, timeStart: null, timeEnd: null, expectedIn: false, expectedOut: false },
        { hasFrameRate: false, timeStart: null, timeEnd: -2, expectedIn: false, expectedOut: false },
        { hasFrameRate: false, timeStart: null, timeEnd: 2000, expectedIn: false, expectedOut: false },

        { hasFrameRate: false, timeStart: -1, timeEnd: undefined, expectedIn: false, expectedOut: false },
        { hasFrameRate: false, timeStart: -1, timeEnd: null, expectedIn: false, expectedOut: false },
        { hasFrameRate: false, timeStart: -1, timeEnd: -2, expectedIn: false, expectedOut: false },
        { hasFrameRate: false, timeStart: -1, timeEnd: 2000, expectedIn: false, expectedOut: false },

        { hasFrameRate: false, timeStart: 1000, timeEnd: undefined, expectedIn: false, expectedOut: false },
        { hasFrameRate: false, timeStart: 1000, timeEnd: null, expectedIn: false, expectedOut: false },
        { hasFrameRate: false, timeStart: 1000, timeEnd: -2, expectedIn: false, expectedOut: false },
        { hasFrameRate: false, timeStart: 1000, timeEnd: 2000, expectedIn: false, expectedOut: false },

        { hasFrameRate: true, timeStart: undefined, timeEnd: undefined, expectedIn: false, expectedOut: false },
        { hasFrameRate: true, timeStart: undefined, timeEnd: null, expectedIn: false, expectedOut: false },
        { hasFrameRate: true, timeStart: undefined, timeEnd: -2, expectedIn: false, expectedOut: false },
        { hasFrameRate: true, timeStart: undefined, timeEnd: 2000, expectedIn: false, expectedOut: true },

        { hasFrameRate: true, timeStart: null, timeEnd: undefined, expectedIn: false, expectedOut: false },
        { hasFrameRate: true, timeStart: null, timeEnd: null, expectedIn: false, expectedOut: false },
        { hasFrameRate: true, timeStart: null, timeEnd: -2, expectedIn: false, expectedOut: false },
        { hasFrameRate: true, timeStart: null, timeEnd: 2000, expectedIn: false, expectedOut: true },

        { hasFrameRate: true, timeStart: -1, timeEnd: undefined, expectedIn: false, expectedOut: false },
        { hasFrameRate: true, timeStart: -1, timeEnd: null, expectedIn: false, expectedOut: false },
        { hasFrameRate: true, timeStart: -1, timeEnd: -2, expectedIn: false, expectedOut: false },
        { hasFrameRate: true, timeStart: -1, timeEnd: 2000, expectedIn: false, expectedOut: true },

        { hasFrameRate: true, timeStart: 1000, timeEnd: undefined, expectedIn: true, expectedOut: false },
        { hasFrameRate: true, timeStart: 1000, timeEnd: null, expectedIn: true, expectedOut: false },
        { hasFrameRate: true, timeStart: 1000, timeEnd: -2, expectedIn: true, expectedOut: false },
        { hasFrameRate: true, timeStart: 1000, timeEnd: 2000, expectedIn: true, expectedOut: true },
      ];

      tests.forEach(test => {
        const inMarkerFrame = new Frame(30).setFromFrameNumber(30);
        const outMarkerFrame = new Frame(30).setFromFrameNumber(60);

        describe(`when asset has ${test.hasFrameRate ? 'a' : 'no'} frame rate`, () => {
          it(`has ${test.expectedIn ? 'an' : 'no'} in marker and ${test.expectedIn ? 'an' : 'no'} out marker` +
            ` when timeStart = ${test.timeStart} and timeEnd = ${test.timeEnd}`, () => {
              if (test.hasFrameRate) {
                Object.assign(assetUnderTest, { metadata: [] });
                assetUnderTest.metadata[0] = { name: 'Format.FrameRate', value: '30 fps' };
              }

              Object.assign(assetUnderTest, { timeStart: test.timeStart, timeEnd: test.timeEnd });

              expect(assetUnderTest.subclipMarkers).toEqual({
                in: test.expectedIn ? inMarkerFrame : undefined,
                out: test.expectedOut ? outMarkerFrame : undefined
              });
            });
        });
      });
    });

    describe('title getter', () => {
      generateMetadataTestsFor('title', 'Title', { 'This Is a Title': 'This Is a Title' }, 0);
    });

    describe('description getter', () => {
      generateMetadataTestsFor('description', 'Description', { 'This is a description.': 'This is a description.' }, 1);
    });

    describe('formatType getter', () => {
      generateMetadataTestsFor('formatType', 'TE.DigitalFormat', { 'High Definition': 'High Definition' });
    });

    describe('isImage getter', () => {
      it('returns true for an image', () => {
        Object.assign(assetUnderTest, { resourceClass: 'Image' });

        expect(assetUnderTest.isImage).toBe(true);
      });

      it('returns false for a non-image', () => {
        Object.assign(assetUnderTest, { resourceClass: 'blah' });

        expect(assetUnderTest.isImage).toBe(false);
      });

      it('returns false if the asset is missing resourceClass', () => {
        expect(assetUnderTest.isImage).toBe(false);
      });
    });

    describe('framesPerSecond getter', () => {
      generateMetadataTestsFor('framesPerSecond', 'Format.FrameRate', { '29.97 fps': 29.97 });
    });

    describe('isSubclipped getter', () => {
      const tests: any = [
        { condition: 'has no timeStart and no timeEnd', expectedResult: false },
        { condition: 'has only a positive timeStart', timeStart: 3000, expectedResult: true },
        { condition: 'has only a zero timeStart', timeStart: 0, expectedResult: true },
        { condition: 'has only a negative timeStart', timeStart: -1, expectedResult: false },
        { condition: 'has only a positive timeEnd', timeEnd: 6000, expectedResult: true },
        { condition: 'has only a zero timeEnd', timeEnd: 0, expectedResult: true },
        { condition: 'has only a negative timeEnd', timeEnd: -2, expectedResult: false },
        { condition: 'has a positive timeStart and a positive timeEnd', timeStart: 3000, timeEnd: 6000, expectedResult: true },
        { condition: 'has a zero timeStart and a positive timeEnd', timeStart: 0, timeEnd: 6000, expectedResult: true },
        { condition: 'has a negative timeStart and a positive timeEnd', timeStart: -1, timeEnd: 6000, expectedResult: true },
        { condition: 'has a positive timeStart and a zero timeEnd', timeStart: 3000, timeEnd: 0, expectedResult: true },
        { condition: 'has a zero timeStart and a zero timeEnd', timeStart: 0, timeEnd: 0, expectedResult: true },
        { condition: 'has a negative timeStart and a zero timeEnd', timeStart: -1, timeEnd: 0, expectedResult: true },
        { condition: 'has a positive timeStart and a negative timeEnd', timeStart: 3000, timeEnd: -2, expectedResult: true },
        { condition: 'has a zero timeStart and a negative timeEnd', timeStart: 0, timeEnd: -2, expectedResult: true },
        { condition: 'has a negative timeStart and a negative timeEnd', timeStart: -1, timeEnd: -2, expectedResult: false }
      ];

      for (const test of tests) {
        it(`returns ${test.expectedResult} for an asset that ${test.condition}`, () => {
          Object.assign(
            assetUnderTest,
            { metadata: [] },
            test.hasOwnProperty('timeStart') ? { timeStart: test.timeStart } : null,
            test.hasOwnProperty('timeEnd') ? { timeEnd: test.timeEnd } : null
          );

          expect(assetUnderTest.isSubclipped).toBe(test.expectedResult);
        });
      }
    });

    describe('routerLink()', () => {

      it('Returns correct path for a collection asset', () => {
        Object.assign(
          assetUnderTest,
          {
            assetId: 47,
            uuid: 'aabb-ccdd-eeff-gghh',
            type: 'collection',
            parentId: 1
          }
        );
        expect(assetUnderTest.routerLink).toEqual([`/collections/1/asset/aabb-ccdd-eeff-gghh`]);
      });

      it('Returns correct path for a quote edit asset', () => {
        Object.assign(
          assetUnderTest,
          {
            assetId: 47,
            uuid: 'aabb-ccdd-eeff-gghh',
            type: 'quoteEdit'
          }
        );
        expect(assetUnderTest.routerLink).toEqual([`/active-quote/asset/aabb-ccdd-eeff-gghh`]);
      });

      it('Returns correct path for a search asset', () => {
        Object.assign(
          assetUnderTest,
          { assetId: 47, type: 'search' }
        );
        expect(assetUnderTest.routerLink).toEqual([`/search/asset/47`]);
      });

      it('Returns correct path for a quote show asset', () => {
        Object.assign(
          assetUnderTest,
          {
            assetId: 47,
            uuid: 'aabb-ccdd-eeff-gghh',
            type: 'quoteShow',
            parentId: 1
          }
        );
        expect(assetUnderTest.routerLink).toEqual([`/quotes/1/asset/aabb-ccdd-eeff-gghh`]);
      });

      it('Returns correct path for a order asset', () => {
        Object.assign(
          assetUnderTest,
          {
            assetId: 47,
            uuid: 'aabb-ccdd-eeff-gghh',
            type: 'order',
            parentId: 1
          }
        );
        expect(assetUnderTest.routerLink).toEqual([`/orders/1/asset/aabb-ccdd-eeff-gghh`]);
      });

      it('Returns correct path for a cart asset', () => {
        Object.assign(
          assetUnderTest,
          {
            assetId: 47,
            uuid: 'aabb-ccdd-eeff-gghh',
            type: 'cart'
          }
        );
        expect(assetUnderTest.routerLink).toEqual([`/cart/asset/aabb-ccdd-eeff-gghh`]);
      });
    });

    describe('normalize()', () => {
      it('returns its containing object to enable chaining', () => {
        expect(assetUnderTest.normalize()).toEqual(assetUnderTest);
      });

      describe('name', () => {
        it('is not changed if it already exists', () => {
          Object.assign(assetUnderTest, { name: 'some name', assetName: 'some other name' });

          assetUnderTest.normalize();

          expect(assetUnderTest.name).toEqual('some name');
        });

        it('is updated if it doesn\'t already exist', () => {
          Object.assign(assetUnderTest, { assetName: 'some other name' });

          assetUnderTest.normalize();

          expect(assetUnderTest.name).toEqual('some other name');
        });
      });

      describe('thumbnailUrl', () => {
        it('is not changed if it already exists', () => {
          Object.assign(assetUnderTest, { thumbnailUrl: 'some URL', thumbnail: { urls: { https: 'some other URL' } } });

          assetUnderTest.normalize();

          expect(assetUnderTest.thumbnailUrl).toEqual('some URL');
        });

        it('is updated from the deeply nested object if it doesn\'t already exist', () => {
          Object.assign(assetUnderTest, { thumbnail: { urls: { https: 'some other URL' } } });

          assetUnderTest.normalize();

          expect(assetUnderTest.thumbnailUrl).toEqual('some other URL');
        });

        it('is updated from clipThumbnailUrl if it doesn\'t already exist', () => {
          Object.assign(assetUnderTest, { clipThumbnailUrl: 'yet another URL' });

          assetUnderTest.normalize();

          expect(assetUnderTest.thumbnailUrl).toEqual('yet another URL');
        });

        it('is updated from the deeply nested object if it AND clipThumbnailUrl are both defined for some reason', () => {
          Object.assign(
            assetUnderTest,
            { thumbnail: { urls: { https: 'some other URL' } }, clipThumbnailUrl: 'yet another URL' }
          );

          assetUnderTest.normalize();

          expect(assetUnderTest.thumbnailUrl).toEqual('some other URL');
        });

        describe('resourceClass', () => {
          it('is not changed if it already exists', () => {
            Object.assign(
              assetUnderTest,
              { resourceClass: 'some resourceClass', metadata: [{ name: 'Resource.Class', value: 'some other resourceClass' }] }
            );

            assetUnderTest.normalize();

            expect(assetUnderTest.resourceClass).toEqual('some resourceClass');
          });

          it('is updated from metadata if it doesn\'t already exist', () => {
            Object.assign(
              assetUnderTest,
              { metadata: [{ name: 'Resource.Class', value: 'some other resourceClass' }] }
            );

            assetUnderTest.normalize();

            expect(assetUnderTest.resourceClass).toEqual('some other resourceClass');
          });

          it('is undefined if it doesn\'t already exist and is not found in metadata', () => {
            assetUnderTest.normalize();

            expect(assetUnderTest.resourceClass).toBeUndefined();
          });
        });
      });

      describe('timeStart', () => {
        it('is a number if it was defined as a number', () => {
          Object.assign(assetUnderTest, { timeStart: 42 });

          assetUnderTest.normalize();

          expect(assetUnderTest.timeStart).toEqual(42);
          expect(assetUnderTest.timeStart).toEqual(jasmine.any(Number));
        });

        it('is a number if it was defined as a string', () => {
          Object.assign(assetUnderTest, { timeStart: '42' });

          assetUnderTest.normalize();

          expect(assetUnderTest.timeStart).toEqual(42);
          expect(assetUnderTest.timeStart).toEqual(jasmine.any(Number));
        });
      });

      describe('timeEnd', () => {
        it('is a number if it was defined as a number', () => {
          Object.assign(assetUnderTest, { timeEnd: 99 });

          assetUnderTest.normalize();

          expect(assetUnderTest.timeEnd).toEqual(99);
        });

        it('is a number if it was defined as a string', () => {
          Object.assign(assetUnderTest, { timeEnd: '99' });

          assetUnderTest.normalize();

          expect(assetUnderTest.timeEnd).toEqual(99);
        });
      });

      describe('metadata', () => {
        it('is not changed if it already exists', () => {
          Object.assign(
            assetUnderTest,
            { metadata: 'some metadata', metaData: 'some other metadata', primary: 'yet another metadata' }
          );

          assetUnderTest.normalize();

          expect(assetUnderTest.metadata).toEqual('some metadata');
        });

        it('is updated from metaData (uppercase D) if metadata (lowercase d) doesn\'t already exist', () => {
          Object.assign(assetUnderTest, { metaData: 'some other metadata' });

          assetUnderTest.normalize();

          expect(assetUnderTest.metadata).toEqual('some other metadata');
        });

        it('is updated from primary if metadata doesn\'t already exist', () => {
          Object.assign(assetUnderTest, { primary: 'yet another metadata' });

          assetUnderTest.normalize();

          expect(assetUnderTest.metadata).toEqual('yet another metadata');
        });

        it('favors metaData (uppercase D) over primary if both are defined somehow', () => {
          Object.assign(assetUnderTest, { metaData: 'some other metadata', primary: 'yet another metadata' });

          assetUnderTest.normalize();

          expect(assetUnderTest.metadata).toEqual('some other metadata');
        });
      });

      describe('isViewable getter', () => {
        it('is true when the asset\'s accessPath value is \'ContentFilter\'', () => {
          Object.assign(assetUnderTest, { accessPath: 'ContentFilter' });

          expect(assetUnderTest.isViewable).toBe(true);
        });

        it('is false when the asset\'s accessPath value is not \'ContentFilter\'', () => {
          Object.assign(assetUnderTest, { accessPath: 'NotContentFilter' });

          expect(assetUnderTest.isViewable).toBe(false);
        });
      });

      describe('isChildOfViewableObject getter', () => {
        it('is true when the asset\'s accessPath value is \'ParentObject\'', () => {
          Object.assign(assetUnderTest, { accessPath: 'ParentObject' });

          expect(assetUnderTest.isChildOfViewableObject).toBe(true);
        });

        it('is false when the asset\'s accessPath value is not \'ParentObject\'', () => {
          Object.assign(assetUnderTest, { accessPath: 'NotParentObject' });

          expect(assetUnderTest.isChildOfViewableObject).toBe(false);
        });
      });
    });
  });
}
