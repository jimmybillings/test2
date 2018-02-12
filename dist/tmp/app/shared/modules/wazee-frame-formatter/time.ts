export class Time {
  private integralFramesPerSecond: number;
  private _hours: number;
  private _minutes: number;
  private _seconds: number;
  private _frames: number;

  private readonly MINUTES_IN_AN_HOUR = 60;
  private readonly SECONDS_IN_A_MINUTE = 60;
  private readonly SECONDS_IN_AN_HOUR = this.SECONDS_IN_A_MINUTE * this.MINUTES_IN_AN_HOUR;

  constructor(framesPerSecond: number) {
    this.clear();
    this.integralFramesPerSecond = Math.round(framesPerSecond);
  }

  public clear(): void {
    this._hours = this._minutes = this._seconds = this._frames = 0;
  };

  public set frames(frames: number) {
    this._frames = frames;
  };

  public get frames(): number {
    this.rollComponentsIfNecessary();
    return this._frames;
  };

  public addFrames(numberOfFrames: number): void {
    this._frames += numberOfFrames;
  };

  public set seconds(seconds: number) {
    this._seconds = seconds;
  };

  public get seconds(): number {
    this.rollComponentsIfNecessary();
    return this._seconds;
  };

  public set minutes(minutes: number) {
    this._minutes = minutes;
  };

  public get minutes(): number {
    this.rollComponentsIfNecessary();
    return this._minutes;
  };

  public set hours(hours: number) {
    this._hours = hours;
  };

  public get hours(): number {
    this.rollComponentsIfNecessary();
    return this._hours;
  };

  public hoursMultipleOf(value: number): boolean {
    return (this._hours % value) === 0;
  };

  public minutesMultipleOf(value: number): boolean {
    return (this._minutes % value) === 0;
  };

  public minutesOneOf(...minuteValues: number[]): boolean {
    return minuteValues.some(value => value === this._minutes);
  };

  public asFrameNumber(): number {
    return this.totalWholeSeconds() * this.integralFramesPerSecond + this._frames;
  };

  public totalWholeSeconds(): number {
    this.rollComponentsIfNecessary();
    return this._hours * this.SECONDS_IN_AN_HOUR + this._minutes * this.SECONDS_IN_A_MINUTE + this._seconds;
  };

  private rollComponentsIfNecessary(): void {
    while (this._frames < 0) {
      this._frames += this.integralFramesPerSecond;
      this._seconds -= 1;
    }

    while (this._seconds < 0) {
      this._seconds += this.SECONDS_IN_A_MINUTE;
      this._minutes -= 1;
    }

    while (this._minutes < 0) {
      this._minutes += this.MINUTES_IN_AN_HOUR;
      this._hours -= 1;
    }

    if (this._frames >= this.integralFramesPerSecond) {
      this._seconds += Math.floor(this._frames / this.integralFramesPerSecond);
      this._frames %= this.integralFramesPerSecond;
    }

    if (this._seconds >= this.SECONDS_IN_A_MINUTE) {
      this._minutes += Math.floor(this._seconds / this.SECONDS_IN_A_MINUTE);
      this._seconds %= this.SECONDS_IN_A_MINUTE;
    }

    if (this._minutes >= this.MINUTES_IN_AN_HOUR) {
      this._hours += Math.floor(this._minutes / this.MINUTES_IN_AN_HOUR);
      this._minutes %= this.MINUTES_IN_AN_HOUR;
    }
  };
};
