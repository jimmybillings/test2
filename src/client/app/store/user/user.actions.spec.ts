import { ActionFactory, InternalActionFactory } from './user.actions';
import { ActionsSpecHelper } from '../spec-helpers/actions.spec-helper';

export function main() {
  describe('User Actions', () => {
    let actionsSpecHelper: ActionsSpecHelper = new ActionsSpecHelper();

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'getAllUsersByAccountId',
        parameters: [1]
      },
      expectedAction: {
        type: '[User] Get All Users By Account Id',
        accountId: 1
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: InternalActionFactory,
        name: 'getAllUsersByAccountIdSuccess',
        parameters: [{ users: 'lots of users' }]
      },
      expectedAction: {
        type: '[User] Get All Users By Account Id Success',
        users: { users: 'lots of users' }
      }
    });

  });


}
