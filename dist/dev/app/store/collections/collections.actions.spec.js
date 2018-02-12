"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var collections_actions_1 = require("./collections.actions");
var actions_spec_helper_1 = require("../spec-helpers/actions.spec-helper");
function main() {
    describe('Collections Actions', function () {
        var actionsSpecHelper = new actions_spec_helper_1.ActionsSpecHelper();
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: collections_actions_1.ActionFactory,
                name: 'addAssetToCollection',
                parameters: [{ some: 'collection' }, { some: 'asset' }]
            },
            expectedAction: {
                type: '[Collections] add asset to collection',
                collection: { some: 'collection' },
                asset: { some: 'asset' }
            }
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9jb2xsZWN0aW9ucy9jb2xsZWN0aW9ucy5hY3Rpb25zLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2REFBNkU7QUFDN0UsMkVBQXdFO0FBRXhFO0lBQ0UsUUFBUSxDQUFDLHFCQUFxQixFQUFFO1FBQzlCLElBQUksaUJBQWlCLEdBQXNCLElBQUksdUNBQWlCLEVBQUUsQ0FBQztRQUVuRSxpQkFBaUIsQ0FBQyxlQUFlLENBQUM7WUFDaEMsYUFBYSxFQUFFO2dCQUNiLEtBQUssRUFBRSxtQ0FBYTtnQkFDcEIsSUFBSSxFQUFFLHNCQUFzQjtnQkFDNUIsVUFBVSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUM7YUFDeEQ7WUFDRCxjQUFjLEVBQUU7Z0JBQ2QsSUFBSSxFQUFFLHVDQUF1QztnQkFDN0MsVUFBVSxFQUFFLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRTtnQkFDbEMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRTthQUN6QjtTQUNGLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQWpCRCxvQkFpQkMiLCJmaWxlIjoiYXBwL3N0b3JlL2NvbGxlY3Rpb25zL2NvbGxlY3Rpb25zLmFjdGlvbnMuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFjdGlvbkZhY3RvcnksIEludGVybmFsQWN0aW9uRmFjdG9yeSB9IGZyb20gJy4vY29sbGVjdGlvbnMuYWN0aW9ucyc7XG5pbXBvcnQgeyBBY3Rpb25zU3BlY0hlbHBlciB9IGZyb20gJy4uL3NwZWMtaGVscGVycy9hY3Rpb25zLnNwZWMtaGVscGVyJztcblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIGRlc2NyaWJlKCdDb2xsZWN0aW9ucyBBY3Rpb25zJywgKCkgPT4ge1xuICAgIGxldCBhY3Rpb25zU3BlY0hlbHBlcjogQWN0aW9uc1NwZWNIZWxwZXIgPSBuZXcgQWN0aW9uc1NwZWNIZWxwZXIoKTtcblxuICAgIGFjdGlvbnNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdEZvcih7XG4gICAgICBmYWN0b3J5TWV0aG9kOiB7XG4gICAgICAgIGNsYXNzOiBBY3Rpb25GYWN0b3J5LFxuICAgICAgICBuYW1lOiAnYWRkQXNzZXRUb0NvbGxlY3Rpb24nLFxuICAgICAgICBwYXJhbWV0ZXJzOiBbeyBzb21lOiAnY29sbGVjdGlvbicgfSwgeyBzb21lOiAnYXNzZXQnIH1dXG4gICAgICB9LFxuICAgICAgZXhwZWN0ZWRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogJ1tDb2xsZWN0aW9uc10gYWRkIGFzc2V0IHRvIGNvbGxlY3Rpb24nLFxuICAgICAgICBjb2xsZWN0aW9uOiB7IHNvbWU6ICdjb2xsZWN0aW9uJyB9LFxuICAgICAgICBhc3NldDogeyBzb21lOiAnYXNzZXQnIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG4iXX0=
