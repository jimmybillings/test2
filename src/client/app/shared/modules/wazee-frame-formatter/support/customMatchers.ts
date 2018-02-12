import { Frame } from '../frame';
import { TimecodeFormat } from '../timecodeFormat';

export const customMatchers = {
  toRoundTripViaStringForFrameNumber: () => {
    return {
      compare: (actual: Frame, expected: { frameNumber: number, format: TimecodeFormat }): jasmine.CustomMatcherResult => {
        const string = actual.setFromFrameNumber(expected.frameNumber).asString(expected.format);
        const frameNumberAfterRoundTrip = actual.setFromString(string, expected.format).asFrameNumber();
        let result: jasmine.CustomMatcherResult;

        result.pass = frameNumberAfterRoundTrip === expected.frameNumber;

        if (result.pass) {
          result.message =
            `expected frame  ${expected.frameNumber} not to round trip via '${string}' (${expected.format})`
            + ` at ${actual.framesPerSecond} fps, but it did`;
        } else {
          const stringAfterRoundTrip = actual.setFromFrameNumber(frameNumberAfterRoundTrip).asString(expected.format);

          result.message =
            `expected frame ${expected.frameNumber} to round trip via '${string}' (${expected.format})`
            + ` at ${actual.framesPerSecond} fps, but it ended up as ${frameNumberAfterRoundTrip},`
            + ` which translates to '${stringAfterRoundTrip}'`;
        }

        return result;
      }
    };
  }
};
