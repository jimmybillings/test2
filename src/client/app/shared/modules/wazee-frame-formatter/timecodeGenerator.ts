import { TimecodeFormat } from './timecodeFormat';
import { Time } from './time';

export const DEFAULT_TIME_CODE_LENGTH = 'hh:mm:ss:ff'.length;

export class TimecodeGenerator {
  public framesPerSecond: number;
  public accurateFramesPerSecond: number;
  public frameNumber: number;

  private time: Time;

  // ------- STATIC (CLASS) METHODS -------

  public static extraFramesNeededForDropFrame(framesPerSecond: number, time: Time): number {
    switch (framesPerSecond) {
      case 29.97: return TimecodeGenerator.extraFramesNeededFor2997DropFrame(time);
      case 59.94: return TimecodeGenerator.extraFramesNeededFor5994DropFrame(time);
      case 23.976: return TimecodeGenerator.extraFramesNeededFor23976DropFrame(time);
      default: return 0;
    }
  }

  public static extraFramesNeededFor2997DropFrame(time: Time): number {
    const minutes = time.minutes;
    const minutesTensDigit = Math.floor(minutes / 10);
    const minutesOnesDigit = minutes % 10;

    return (time.hours * 108) + (minutesTensDigit * 18) + (minutesOnesDigit * 2);
  }

  public static extraFramesNeededFor5994DropFrame(time: Time): number {
    return TimecodeGenerator.extraFramesNeededFor2997DropFrame(time) * 2;
  }

  public static extraFramesNeededFor23976DropFrame(time: Time): number {
    const hours = time.hours;
    const minutes = time.minutes;

    let extra = hours * 60;
    extra += (Math.floor((hours + 1) / 3) + Math.floor(hours / 3)) * 26;
    extra += minutes;

    if (!time.hoursMultipleOf(3)) {
      extra += Math.floor(minutes * 0.5);

      [16, 30, 44].forEach(specialMinute => { if (minutes >= specialMinute) extra -= 1; });
    }

    return extra;
  }

  // ------- PUBLIC INTERFACE -------

  constructor(framesPerSecond: number) {
    this.framesPerSecond = framesPerSecond;
    this.time = new Time(this.framesPerSecond);

    const integralFramesPerSecond = Math.round(this.framesPerSecond);
    this.accurateFramesPerSecond =
      this.framesPerSecond === integralFramesPerSecond ? this.framesPerSecond : integralFramesPerSecond * 1000 / 1001;
  }

  public setFromFrameNumber(frameNumber: number): TimecodeGenerator {
    this.frameNumber = frameNumber;
    return this;
  }

  public asString(format: TimecodeFormat, minLength: number = DEFAULT_TIME_CODE_LENGTH): string {
    let frameDelimiter = ':';
    this.time.clear();

    switch (format) {
      case TimecodeFormat.NONDROPFRAME:
        this.time.frames = this.frameNumber;
        break;

      case TimecodeFormat.DROPFRAME:
        this.time.frames = this.frameNumber;
        this.addDropFramesIfNecessary();
        frameDelimiter = ';';
        break;

      case TimecodeFormat.SIMPLE_TIME_CONVERSION:
      case TimecodeFormat.MINIMAL_TIME_CONVERSION:
        const rawSeconds = this.frameNumber / this.accurateFramesPerSecond;
        const truncatedSeconds = Math.floor(rawSeconds);

        this.time.seconds = truncatedSeconds;
        this.time.frames = Math.round((rawSeconds - truncatedSeconds) * this.framesPerSecond);;
        frameDelimiter = ';';
    }

    return format === TimecodeFormat.MINIMAL_TIME_CONVERSION
      ? this.minimallyFormatTime()
      : this.formatTime(minLength, frameDelimiter);
  }

  // ------- PRIVATE METHODS -------

  private addDropFramesIfNecessary(): void {
    const originalHours: number = this.time.hours;
    const originalMinutes: number = this.time.minutes;
    const extraFrames: number = TimecodeGenerator.extraFramesNeededForDropFrame(this.framesPerSecond, this.time);

    if (extraFrames <= 0) return null;

    this.time.addFrames(extraFrames);
    const newHours = this.time.hours;
    const newMinutes = this.time.minutes;

    switch (this.framesPerSecond) {
      case 29.97:
        if (newMinutes > originalMinutes && !this.time.minutesMultipleOf(10)) this.time.addFrames(2);
        break;

      case 59.94:
        if (newMinutes > originalMinutes && !this.time.minutesMultipleOf(10)) this.time.addFrames(4);
        break;

      case 23.976:
        let extraExtraFrames = 0;

        if (newMinutes > originalMinutes) {
          extraExtraFrames += newMinutes - originalMinutes;
          if (!this.time.hoursMultipleOf(3) && this.time.minutesMultipleOf(2) && !this.time.minutesOneOf(0, 16, 30, 44)) {
            extraExtraFrames += 1;
          }
        }

        if (newHours > originalHours) {
          extraExtraFrames += 1;
        }

        this.time.addFrames(extraExtraFrames);
    }
  }

  private formatTime(minLength: number, frameDelimiter: string = ':'): string {
    const timecode: string =
      [
        this.time.hours,
        ':',
        this.zeroFillTo(2, this.time.minutes),
        ':',
        this.zeroFillTo(2, this.time.seconds),
        frameDelimiter,
        this.zeroFillTo(2, this.time.frames)
      ].join('');

    return this.zeroFillTo(minLength, timecode);
  }

  private minimallyFormatTime(): string {
    const { hours, minutes, seconds, frames } = this.time;

    let outputPieces: string[] = [this.zeroFillTo(2, seconds)];
    if (minutes > 0) outputPieces.unshift(this.zeroFillTo(2, minutes) + ':');
    if (hours > 0) outputPieces.unshift(this.zeroFillTo(2, hours) + ':');
    if (frames > 0) outputPieces.push(';' + this.zeroFillTo(2, frames));

    return outputPieces.join('');
  }

  private zeroFillTo(minNumberOfDigits: number, input: number | string): string {
    let output: string = String(input);

    while (output.length < minNumberOfDigits) {
      output = `0${output}`;
    }

    return output;
  }
}
