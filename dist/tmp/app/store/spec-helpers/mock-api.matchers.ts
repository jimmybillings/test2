import { Api } from '../../shared/interfaces/api.interface';

const messageWith: Function = (expected: string, expectedValue: string, but: string, actualValues?: string): string => {
  return `${expected} ${expectedValue}, ${but}${actualValues ? ` ${actualValues}` : ''}.`;
};

const expectedCalledWith: string = 'Expected spy to have been called with';
const expectedNotCalledWith: string = 'Expected spy not to have been called with';
const butNeverCalled: string = 'but it was never called';
const butWas: string = 'but it was';
const butWasNot: string = 'but it was not';
const butCalledWith: string = `but it was called with`;

const apiToString: Function = (api: Api): string | Api => {
  return api.constructor.name === 'Number' ? `Api.${Api[api]}` : api;
};

const apiExpectationFormatterFor: Function = (displayName: string): Function => {
  return (expected: Api) => `${displayName} = ${apiToString(expected)}`;
};

const objectExpectationFormatterFor: Function = (displayName: string): Function => {
  return (expected: Object) => `${displayName} =\n${JSON.stringify(expected, null, 2)}\n`;
};

const booleanExpectationFormatterFor: Function = (displayName: string): Function => {
  return (expected: boolean) => `${displayName} = ${expected}`;
};

const stringExpectationFormatterFor: Function = (displayName: string): Function => {
  return (expected: string) => `${displayName} = '${expected}'`;
};

const objectArgumentMapperFor: Function = (optionKey: string): Function => {
  return (call: jasmine.CallInfo) => `\n${JSON.stringify(call.args[2][optionKey], null, 2)}`;
};

const objectJoiner: string = '\n- and -';

const apiArgumentMapperFor: Function = (argumentPosition: number) => {
  return (call: jasmine.CallInfo) => apiToString(call.args[argumentPosition]);
};

const booleanArgumentMapperFor: Function = (optionKey: string): Function => {
  return (call: jasmine.CallInfo) => call.args[2][optionKey];
};

const stringArgumentMapperFor: Function = (optionKeyOrArgumentPosition: string | number): Function => {
  if (typeof optionKeyOrArgumentPosition === 'number') {
    return (call: jasmine.CallInfo) => `'${call.args[optionKeyOrArgumentPosition]}'`;
  } else {
    return (call: jasmine.CallInfo) => `'${call.args[2][optionKeyOrArgumentPosition]}'`;
  }
};

const indefiniteArticleFor: Function = (noun: string): string => {
  return 'aeiou'.split('').indexOf(noun.charAt(0)) > -1 ? 'an' : 'a';
};

const matcherFor: Function = (
  argumentPosition: number,
  expectationFormatter: Function,
  argumentMapper: any
): jasmine.CustomMatcher => {
  return {
    compare: (spy: jasmine.Spy, expected: Api | string): jasmine.CustomMatcherResult => {
      const result: jasmine.CustomMatcherResult = { pass: false, message: '' };
      const allCalls: jasmine.CallInfo[] = spy.calls.all();
      const actualValues: string = allCalls.map(argumentMapper).join(', ');

      const expectedValue: string = expectationFormatter(expected);

      if (allCalls.length === 0) {
        result.pass = false;
        result.message = messageWith(expectedCalledWith, expectedValue, butNeverCalled);

        return result;
      }

      result.pass = allCalls.some(call => call.args[argumentPosition] === expected);
      result.message = result.pass ?
        messageWith(expectedNotCalledWith, expectedValue, butWas) :
        messageWith(expectedCalledWith, expectedValue, butCalledWith, actualValues);

      return result;
    }
  };
};

const optionMatcherFor: Function = (
  optionKey: string,
  expectationFormatter: Function,
  argumentMapper: any,
  argumentJoiner: string = ', '
): jasmine.CustomMatcher => {
  return {
    compare: (spy: jasmine.Spy, expected?: Object): jasmine.CustomMatcherResult => {
      const result: jasmine.CustomMatcherResult = { pass: false, message: '' };

      const allCalls: jasmine.CallInfo[] = spy.calls.all();
      const allCallsWithOption: jasmine.CallInfo[]
        = allCalls.filter(call => call.args.length > 2 && call.args[2].hasOwnProperty(optionKey));
      const actualValues: string = allCallsWithOption.map(argumentMapper).join(argumentJoiner);

      const expectationIsSpecific: boolean = typeof expected !== 'undefined';
      const specificValue: string = expectationFormatter(expected);
      const unspecificValue: string = `${indefiniteArticleFor(optionKey)} ${optionKey} option`;

      const butNeverCalledUnspecifically: string = `${butNeverCalled} with any ${optionKey} option`;

      if (allCalls.length === 0) {
        result.pass = false;
        result.message = messageWith(expectedCalledWith, expectationIsSpecific ? specificValue : unspecificValue, butNeverCalled);

        return result;
      }

      if (!expectationIsSpecific) {
        result.pass = allCallsWithOption.length > 0;
        result.message = result.pass ?
          messageWith(expectedNotCalledWith, unspecificValue, butCalledWith, actualValues) :
          messageWith(expectedCalledWith, unspecificValue, butWasNot);

        return result;
      }

      if (allCallsWithOption.length === 0) {
        result.pass = false;
        result.message = messageWith(expectedCalledWith, specificValue, butNeverCalledUnspecifically);

        return result;
      }

      result.pass = allCallsWithOption.some(call => JSON.stringify(call.args[2][optionKey]) === JSON.stringify(expected));
      result.message = result.pass ?
        messageWith(expectedNotCalledWith, specificValue, butWas) :
        messageWith(expectedCalledWith, specificValue, butCalledWith, actualValues);

      return result;
    }
  };
};

export const mockApiMatchers: jasmine.CustomMatcherFactories = {
  toHaveBeenCalledWithApi: (): jasmine.CustomMatcher => {
    return matcherFor(0, apiExpectationFormatterFor('api'), apiArgumentMapperFor(0));
  },

  toHaveBeenCalledWithEndpoint: (): jasmine.CustomMatcher => {
    return matcherFor(1, stringExpectationFormatterFor('endpoint'), stringArgumentMapperFor(1));
  },

  toHaveBeenCalledWithBody: (): jasmine.CustomMatcher => {
    return optionMatcherFor('body', objectExpectationFormatterFor('body'), objectArgumentMapperFor('body'), objectJoiner);
  },

  toHaveBeenCalledWithParameters: (): jasmine.CustomMatcher => {
    return optionMatcherFor('parameters', objectExpectationFormatterFor('parameters'), objectArgumentMapperFor('parameters'), objectJoiner);
  },

  toHaveBeenCalledWithLoading: (): jasmine.CustomMatcher => {
    return optionMatcherFor('loadingIndicator', booleanExpectationFormatterFor('loadingIndicator'),
      booleanArgumentMapperFor('loadingIndicator'));
  },

  toHaveBeenCalledWithHeaderType: (): jasmine.CustomMatcher => {
    return optionMatcherFor('headerType', stringExpectationFormatterFor('headerType'), stringArgumentMapperFor(1));
  },

  toHaveBeenCalledWithOverridingToken: (): jasmine.CustomMatcher => {
    return optionMatcherFor('overridingToken', stringExpectationFormatterFor('overridingToken'),
      stringArgumentMapperFor('overridingToken'));
  }
};
