import { Action } from '@ngrx/store';

export interface ParameterizedAction extends Action {
  [parameterName: string]: any;
}

export interface ActionFactoryTestParameters {
  comment?: string;
  factoryMethod: {
    class: any;
    name: string;
    parameters: any[];
  };
  expectedAction: ParameterizedAction;
}

export class ActionsSpecHelper {
  public generateTestFor(parameters: ActionFactoryTestParameters): void {
    const methodName: string = parameters.factoryMethod.name;
    const optionalComment: string = parameters.comment ? ` (${parameters.comment})` : '';

    describe(`${methodName}()`, () => {
      it(`creates the expected action${optionalComment}`, () => {
        const factoryMethod = (new parameters.factoryMethod.class() as any)[methodName];

        if (!factoryMethod) {
          fail(`Could not find a method named '${methodName}' in the specified action factory.`);
        }

        const createdAction: any = factoryMethod(...parameters.factoryMethod.parameters);
        const createdActionParameterCount: number = Object.keys(createdAction).length - 1; // exclude 'type'
        const expectedActionParameterCount: number = Object.keys(parameters.expectedAction).length - 1; // exclude 'type'

        if (createdActionParameterCount !== expectedActionParameterCount) {
          fail(`Expected created action to have`
            + ` ${expectedActionParameterCount} parameter${expectedActionParameterCount === 1 ? '' : 's'},`
            + ` but it had ${createdActionParameterCount}.`
          );
        }

        Object.keys(createdAction).forEach(key => {
          expect(createdAction[key]).toEqual(parameters.expectedAction[key]);
        });
      });
    });
  }
}
