"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var page_data_effects_1 = require("./page-data.effects");
var PageDataActions = require("./page-data.actions");
var effects_spec_helper_1 = require("../spec-helpers/effects.spec-helper");
function main() {
    describe('Page Data Effects', function () {
        var effectsSpecHelper = new effects_spec_helper_1.EffectsSpecHelper();
        function instantiator() {
            return new page_data_effects_1.PageDataEffects(effectsSpecHelper.mockNgrxEffectsActions, effectsSpecHelper.mockStore, effectsSpecHelper.mockService);
        }
        effectsSpecHelper.generateTestsFor({
            effectsInstantiator: instantiator,
            effectName: 'updateTitle',
            inputAction: {
                type: PageDataActions.UpdateTitle.Type,
                trKey: 'key',
                trParams: { some: 'params' }
            },
            serviceMethod: {
                name: 'updateTitle',
                expectedArguments: ['key', { some: 'params' }]
            }
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9wYWdlLWRhdGEvcGFnZS1kYXRhLmVmZmVjdHMuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHlEQUFzRDtBQUN0RCxxREFBdUQ7QUFDdkQsMkVBQThGO0FBRTlGO0lBQ0UsUUFBUSxDQUFDLG1CQUFtQixFQUFFO1FBQzVCLElBQU0saUJBQWlCLEdBQXNCLElBQUksdUNBQWlCLEVBQUUsQ0FBQztRQUVyRTtZQUNFLE1BQU0sQ0FBQyxJQUFJLG1DQUFlLENBQ3hCLGlCQUFpQixDQUFDLHNCQUFzQixFQUFFLGlCQUFpQixDQUFDLFNBQVMsRUFBRSxpQkFBaUIsQ0FBQyxXQUFXLENBQ3JHLENBQUM7UUFDSixDQUFDO1FBRUQsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUM7WUFDakMsbUJBQW1CLEVBQUUsWUFBWTtZQUNqQyxVQUFVLEVBQUUsYUFBYTtZQUN6QixXQUFXLEVBQUU7Z0JBQ1gsSUFBSSxFQUFFLGVBQWUsQ0FBQyxXQUFXLENBQUMsSUFBSTtnQkFDdEMsS0FBSyxFQUFFLEtBQUs7Z0JBQ1osUUFBUSxFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTthQUM3QjtZQUNELGFBQWEsRUFBRTtnQkFDYixJQUFJLEVBQUUsYUFBYTtnQkFDbkIsaUJBQWlCLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLENBQUM7YUFDL0M7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUF4QkQsb0JBd0JDIiwiZmlsZSI6ImFwcC9zdG9yZS9wYWdlLWRhdGEvcGFnZS1kYXRhLmVmZmVjdHMuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBhZ2VEYXRhRWZmZWN0cyB9IGZyb20gJy4vcGFnZS1kYXRhLmVmZmVjdHMnO1xuaW1wb3J0ICogYXMgUGFnZURhdGFBY3Rpb25zIGZyb20gJy4vcGFnZS1kYXRhLmFjdGlvbnMnO1xuaW1wb3J0IHsgRWZmZWN0c1NwZWNIZWxwZXIsIEVmZmVjdFRlc3RQYXJhbWV0ZXJzIH0gZnJvbSAnLi4vc3BlYy1oZWxwZXJzL2VmZmVjdHMuc3BlYy1oZWxwZXInO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcbiAgZGVzY3JpYmUoJ1BhZ2UgRGF0YSBFZmZlY3RzJywgKCkgPT4ge1xuICAgIGNvbnN0IGVmZmVjdHNTcGVjSGVscGVyOiBFZmZlY3RzU3BlY0hlbHBlciA9IG5ldyBFZmZlY3RzU3BlY0hlbHBlcigpO1xuXG4gICAgZnVuY3Rpb24gaW5zdGFudGlhdG9yKCk6IFBhZ2VEYXRhRWZmZWN0cyB7XG4gICAgICByZXR1cm4gbmV3IFBhZ2VEYXRhRWZmZWN0cyhcbiAgICAgICAgZWZmZWN0c1NwZWNIZWxwZXIubW9ja05ncnhFZmZlY3RzQWN0aW9ucywgZWZmZWN0c1NwZWNIZWxwZXIubW9ja1N0b3JlLCBlZmZlY3RzU3BlY0hlbHBlci5tb2NrU2VydmljZVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBlZmZlY3RzU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGVmZmVjdHNJbnN0YW50aWF0b3I6IGluc3RhbnRpYXRvcixcbiAgICAgIGVmZmVjdE5hbWU6ICd1cGRhdGVUaXRsZScsXG4gICAgICBpbnB1dEFjdGlvbjoge1xuICAgICAgICB0eXBlOiBQYWdlRGF0YUFjdGlvbnMuVXBkYXRlVGl0bGUuVHlwZSxcbiAgICAgICAgdHJLZXk6ICdrZXknLFxuICAgICAgICB0clBhcmFtczogeyBzb21lOiAncGFyYW1zJyB9XG4gICAgICB9LFxuICAgICAgc2VydmljZU1ldGhvZDoge1xuICAgICAgICBuYW1lOiAndXBkYXRlVGl0bGUnLFxuICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogWydrZXknLCB7IHNvbWU6ICdwYXJhbXMnIH1dXG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuIl19
