declare module jasmine {
  interface Matchers {
    // Note that the only reason for this definition is to keep the
    // build system from complaining that our custom Jasmine matchers
    // do not exist on the type Matchers.  The specific signatures don't
    // matter here (and in fact, using our custom types also breaks the
    // build!). so all we need to do is declare the actual function names,
    // and always give them the signature (...args: any[]): any;

    // for build testing only (at this point)
    toBeNumeric(): void;

    // from MockApiMatchers
    toHaveBeenCalledWithApi(...args: any[]): any;
    toHaveBeenCalledWithEndpoint(...args: any[]): any;
    toHaveBeenCalledWithBody(...args: any[]): any;
    toHaveBeenCalledWithParameters(...args: any[]): any;
    toHaveBeenCalledWithLoading(...args: any[]): any;
    toHaveBeenCalledWithHeaderType(...args: any[]): any;
    toHaveBeenCalledWithOverridingToken(...args: any[]): any;

    // from wazee-frame-formatter:
    toRoundTripViaStringForFrameNumber(...args: any[]): any;
  }

  interface SpyAnd {
    // This is part of Jasmine's language, but isn't defined in their index.d.ts file for whatever reason.
    /** Returns the "name" parameter that the Spy was created with */
    identity(): string;
  }
}
