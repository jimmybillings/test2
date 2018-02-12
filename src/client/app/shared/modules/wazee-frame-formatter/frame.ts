import { TimecodeGenerator } from './timecodeGenerator';
import { TimecodeFormat } from './timecodeFormat';
import { TimecodeParser } from './timecodeParser';
import { TimecodeBase } from './timecodeBase';

const MATH = Math;

export class Frame {
  public framesPerSecond: number;
  public sourceBasedOffsetFrames: any;
  public frameNumber: number;

  private timecodeGenerator: TimecodeGenerator;
  private timecodeParser: TimecodeParser;

  public static stringToFrameNumber(
    framesPerSecond: number,
    string: string,
    format: TimecodeFormat = TimecodeFormat.SIMPLE_TIME_CONVERSION,
    base: TimecodeBase = TimecodeBase.STREAM_BASED
  ): number {
    return new Frame(framesPerSecond).setFromString(string, format, base).asFrameNumber();
  };

  constructor(framesPerSecond: number, sourceBasedOffset: number | string = 0) {
    this.setFramesPerSecondTo(framesPerSecond);
    this.setSourceBasedOffsetTo(sourceBasedOffset);
  }

  public setFramesPerSecondTo(value: number): Frame {
    if (!value) return this;

    this.framesPerSecond = value;
    if (this.framesPerSecond === 23.98) this.framesPerSecond = 23.976;

    this.timecodeGenerator = new TimecodeGenerator(this.framesPerSecond);
    this.timecodeParser = new TimecodeParser(this.framesPerSecond);

    return this;
  };

  public setSourceBasedOffsetTo(value: number | string): Frame {
    this.sourceBasedOffsetFrames = typeof value === 'string' ? Frame.stringToFrameNumber(this.framesPerSecond, value) : value;

    return this;
  };

  public setFromFrameNumber(frameNumber: number, base: TimecodeBase = TimecodeBase.STREAM_BASED): Frame {
    this.frameNumber = frameNumber;

    if (base === TimecodeBase.SOURCE_BASED) this.addFrames(-this.sourceBasedOffsetFrames);

    if (this.frameNumber < 0) this.frameNumber = 0;

    return this;
  };

  public setFromSeconds(value: number, base: TimecodeBase = TimecodeBase.STREAM_BASED): Frame {
    return this.setFromFrameNumber(MATH.round(this.framesPerSecond * value), base);
  };

  public setFromString(string: string, format: TimecodeFormat, base: TimecodeBase = TimecodeBase.STREAM_BASED): Frame {
    return this.setFromFrameNumber(this.timecodeParser.asFrameNumber(string, format), base);
  };

  public addFrames(numberOfFrames: number): Frame {
    this.frameNumber += numberOfFrames;

    return this;
  };

  public asFrameNumber(base: TimecodeBase = TimecodeBase.STREAM_BASED): number {
    return this.frameNumberFor(base);
  };

  public asSeconds(digitsAfterDecimal: number = -1, base: TimecodeBase = TimecodeBase.STREAM_BASED): number {
    const seconds = this.frameNumberFor(base) / this.framesPerSecond;
    if (digitsAfterDecimal < 0) return seconds;

    const multiplier = MATH.pow(10, digitsAfterDecimal);

    return MATH.round(multiplier * seconds) / multiplier;
  };

  public asMilliseconds(digitsAfterDecimal: number = 0, base: TimecodeBase = TimecodeBase.STREAM_BASED): number {
    const multiplier = MATH.pow(10, digitsAfterDecimal);
    const seconds = this.frameNumberFor(base) / this.framesPerSecond;

    return MATH.round(1000 * multiplier * seconds) / multiplier;
  };

  public asString(format: TimecodeFormat, base: TimecodeBase = TimecodeBase.STREAM_BASED) {
    switch (format) {
      case TimecodeFormat.FRAMECOUNT:
        return this.asFrameNumber(base) + '';
      case TimecodeFormat.SECONDS:
        return this.asSeconds(3, base).toFixed(3) + '';
      default:
        return this.timecodeGenerator.setFromFrameNumber(this.frameNumberFor(base)).asString(format);
    }
  };

  private frameNumberFor(base: TimecodeBase): number {
    return this.frameNumber + (base === TimecodeBase.SOURCE_BASED ? this.sourceBasedOffsetFrames : 0);
  };
}
