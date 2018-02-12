interface MockJwCallbacks {
  [propertyName: string]: Function[];
}

type MockJwState = 'idle' | 'buffering' | 'playing' | 'paused';

export class MockJwPlayer {
  public autoplay: boolean = true;

  public setup: jasmine.Spy = jasmine.createSpy('setup').and.callFake((options: any) => {
    this.autoplay = options.autostart;
    this.controlsActive = options.controls;
  });

  public remove: jasmine.Spy = jasmine.createSpy('remove');

  public getState: jasmine.Spy = jasmine.createSpy('getState').and.callFake(() => this.state);

  public play: jasmine.Spy = jasmine.createSpy('play').and.callFake((shouldPlay: boolean | 'toggle' = 'toggle') => {
    if (shouldPlay === 'toggle') shouldPlay = this.state !== 'playing';

    if (shouldPlay && this.state !== 'playing') {
      this.state = 'playing';
      this.trigger('play');
    } else if (!shouldPlay && this.state === 'playing') {
      this.state = 'paused';
      this.trigger('pause');
    }

    return this;
  });

  public pause: jasmine.Spy = jasmine.createSpy('pause').and.callFake((shouldPause: boolean | 'toggle' = 'toggle') => {
    if (shouldPause === 'toggle') shouldPause = this.state === 'playing';

    if (shouldPause && this.state === 'playing') {
      this.state = 'paused';
      this.trigger('pause');
    } else if (!shouldPause && this.state !== 'playing') {
      this.state = 'playing';
      this.trigger('play');
    }

    return this;
  });

  public seek: jasmine.Spy = jasmine.createSpy('seek').and.callFake(() => {
    // Trigger 'seek' here, but not 'seeked', because individual test suites need
    // to be able to test that things happen before/after 'seeked' is triggered.
    this.trigger('seek');

    // Simulate autoplay on seek.
    if (this.state !== 'playing') {
      this.state = 'playing';
      this.trigger('play');
    }

    return this;
  });

  public on: jasmine.Spy = jasmine.createSpy('on').and.callFake((eventName: string, callback: Function) => {
    this.onCallbacks[eventName].push(callback);

    return this;
  });

  public once: jasmine.Spy = jasmine.createSpy('once').and.callFake((eventName: string, callback: Function) => {
    this.onceCallbacks[eventName].push(callback);

    return this;
  });

  public off: jasmine.Spy = jasmine.createSpy('off').and.callFake((eventName: string) => {
    this.onCallbacks[eventName] = [];
    this.onceCallbacks[eventName] = [];

    return this;
  });

  private state: MockJwState = 'playing';  // Assumes autoplay is configured.
  private provider: Object = null;
  private controlsActive: boolean = false;

  private onCallbacks: MockJwCallbacks = {
    ready: new Array<Function>(),
    play: new Array<Function>(),
    pause: new Array<Function>(),
    complete: new Array<Function>(),
    seek: new Array<Function>(),
    seeked: new Array<Function>(),
    time: new Array<Function>(),
    displayClick: new Array<Function>()
  };

  private onceCallbacks: MockJwCallbacks = {
    ready: new Array<Function>(),
    play: new Array<Function>(),
    pause: new Array<Function>(),
    complete: new Array<Function>(),
    seek: new Array<Function>(),
    seeked: new Array<Function>(),
    time: new Array<Function>(),
    displayClick: new Array<Function>()
  };

  public getProvider(): Object {
    return this.provider;
  }

  public setProviderNameTo(name: string): void {
    this.provider = { name: name };
  }

  public setControls(active: boolean) {
    this.controlsActive = active;
  }

  public getControls(): boolean {
    return this.controlsActive;
  }

  public simulateDisplayClick(): void {
    this.trigger('displayClick');
  }

  public trigger(eventName: string, args?: any): MockJwPlayer {
    this.onceCallbacks[eventName].forEach((callback: Function) => args ? callback(args) : callback());
    this.onceCallbacks[eventName] = [];
    this.onCallbacks[eventName].forEach((callback: Function) => args ? callback(args) : callback());

    return this;
  }
}
