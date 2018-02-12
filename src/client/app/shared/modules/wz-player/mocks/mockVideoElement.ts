interface MockVideoCallbacks {
  [propertyName: string]: Function[];
}

export type MockVideoEventName =
  'durationchange' | 'ended' | 'pause' | 'playing' | 'ratechange' | 'timeupdate' | 'seeked' | 'seeking' | 'volumechange';

export class MockVideoElement {
  public paused: boolean = false;
  public ended: boolean = false;
  public oncontextmenu: Function;
  private _currentTime: number = 0;
  private _duration: number = 0;
  private _playbackRate: number = 1;
  private seekingTo: number = null;
  private _volume: number = 1;
  private _muted: boolean = false;

  private eventCallbacks: MockVideoCallbacks = {
    durationchange: new Array<Function>(),
    ended: new Array<Function>(),
    pause: new Array<Function>(),
    playing: new Array<Function>(),
    ratechange: new Array<Function>(),
    timeupdate: new Array<Function>(),
    seeked: new Array<Function>(),
    seeking: new Array<Function>(),
    volumechange: new Array<Function>()
  };

  constructor(autoplay: boolean) {
    this.paused = !autoplay;
  }

  public play(): void {
    if (!this.paused) return;

    this.paused = false;
    this.ended = false;
    this.trigger('playing');
  }

  public pause(): void {
    if (this.paused) return;

    this.paused = true;
    this.trigger('pause');
  }

  public get duration() {
    return this._duration;
  }

  public set currentTime(newTime: number) {
    this.seekingTo = newTime;
    this.trigger('seeking');
  }

  public get currentTime() {
    return this._currentTime;
  }

  public set playbackRate(newRate: number) {
    this._playbackRate = newRate;
    this.trigger('ratechange');
  }

  public get playbackRate(): number {
    return this._playbackRate;
  }

  public get volume(): number {
    return this._volume;
  }

  public set volume(newVolume: number) {
    this._volume = newVolume;
    this.trigger('volumechange');
  }

  public get muted(): boolean {
    return this._muted;
  }

  public set muted(newValue: boolean) {
    this._muted = newValue;
    this.trigger('volumechange');
  }

  public simulateDurationChangeTo(newDuration: number) {
    this._duration = newDuration;
    this.trigger('durationchange');
  }

  public simulateTimeChangeTo(newTime: number) {
    this._currentTime = newTime;
    this.trigger('timeupdate');
  }

  public simulateSeekCompletion() {
    if (!this.seekingTo) throw new Error('Tried to simulate seek completion, but not currently seeking!');

    this._currentTime = this.seekingTo;
    this.seekingTo = null;
    this.trigger('seeked');
    this.trigger('timeupdate');
  }

  public simulatePlaybackEnded() {
    this.paused = true;
    this.ended = true;
    this.trigger('ended');
    this.trigger('pause');
  }

  public get numberOfDefinedEventCallbacks(): number {
    return Object.keys(this.eventCallbacks)
      .map(eventName => this.eventCallbacks[eventName].length)
      .reduce((a, b) => a + b, 0);
  }

  public on(eventName: MockVideoEventName, callback: Function): MockVideoElement {
    this.eventCallbacks[eventName].push(callback);
    return this;
  }

  public off(eventName: MockVideoEventName): MockVideoElement {
    this.eventCallbacks[eventName] = [];
    return this;
  }

  public trigger(eventName: MockVideoEventName): MockVideoElement {
    this.eventCallbacks[eventName].forEach((callback: Function) => callback());
    return this;
  }
}
