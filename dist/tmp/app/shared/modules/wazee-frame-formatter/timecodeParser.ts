import { Time } from './time';
import { TimecodeFormat } from './timecodeFormat';
import { TimecodeGenerator } from './timecodeGenerator';

export class TimecodeParser {
  public timecodeGenerator: TimecodeGenerator;
  public framesPerSecond: number;
  public accurateFramesPerSecond: number;

  private timePieces: string[];
  private time: Time;

  constructor(framesPerSecond: number) {
    this.framesPerSecond = framesPerSecond;
    this.timecodeGenerator = new TimecodeGenerator(framesPerSecond);
    this.time = new Time(framesPerSecond);

    const integralFramesPerSecond = Math.round(framesPerSecond);
    this.accurateFramesPerSecond =
      framesPerSecond === integralFramesPerSecond ? framesPerSecond : integralFramesPerSecond * 1000 / 1001;
  }

  public asFrameNumber(string: string, format: TimecodeFormat): number {
    this.parseTimeFrom(string, format);
    this.adjustFramesFor(format);

    return this.time.asFrameNumber();
  }

  private parseTimeFrom(string: string, format: TimecodeFormat): TimecodeParser {
    if (format === TimecodeFormat.SECONDS) {
      this.time.clear();
      this.time.frames = Math.round(parseFloat(string) * this.accurateFramesPerSecond);
      return this;
    }

    if (format === TimecodeFormat.MINIMAL_TIME_CONVERSION) {
      string = this.convertToFullTimecode(string);
    }

    this.timePieces = string.replace(';', ':').split(':').reverse();

    while (this.timePieces.length < 4) {
      this.timePieces.push('0');
    }

    this.time.clear();
    this.time.hours = this.getTimePieceAtIndex(3);
    this.time.minutes = this.getTimePieceAtIndex(2);
    this.time.seconds = this.getTimePieceAtIndex(1);
    this.time.frames = this.getTimePieceAtIndex(0);

    return this;
  }

  private convertToFullTimecode(timecode: string): string {
    if (timecode.indexOf(';') >= 0) return timecode;

    const colons = timecode.match(/:/g);
    if (colons && colons.length === 3) return timecode;

    return timecode + ';00';
  }

  private getTimePieceAtIndex(index: number): number {
    return parseInt(this.timePieces[index], 10) || 0;
  }

  private adjustFramesFor(format: TimecodeFormat): TimecodeParser {
    switch (format) {
      case TimecodeFormat.DROPFRAME:
        this.time.addFrames(-TimecodeGenerator.extraFramesNeededForDropFrame(this.framesPerSecond, this.time));
        break;

      case TimecodeFormat.SIMPLE_TIME_CONVERSION:
      case TimecodeFormat.MINIMAL_TIME_CONVERSION:
        const adjustedFrames = Math.round(this.time.totalWholeSeconds() * this.accurateFramesPerSecond) + this.time.frames;

        this.time.clear();
        this.time.frames = adjustedFrames;
    }

    return this;
  }
}
