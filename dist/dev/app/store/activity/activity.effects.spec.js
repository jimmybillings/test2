"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var activity_effects_1 = require("./activity.effects");
var ActivityActions = require("./activity.actions");
var effects_spec_helper_1 = require("../spec-helpers/effects.spec-helper");
function main() {
    describe('Activity Effects', function () {
        var effectsSpecHelper = new effects_spec_helper_1.EffectsSpecHelper();
        function instantiator() {
            return new activity_effects_1.ActivityEffects(effectsSpecHelper.mockNgrxEffectsActions, effectsSpecHelper.mockService);
        }
        effectsSpecHelper.generateTestsFor({
            effectName: 'record',
            effectsInstantiator: instantiator,
            inputAction: {
                type: ActivityActions.Record.Type,
                options: { some: 'options' }
            },
            serviceMethod: {
                name: 'record',
                expectedArguments: [{ some: 'options' }]
            }
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9hY3Rpdml0eS9hY3Rpdml0eS5lZmZlY3RzLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1REFBcUQ7QUFDckQsb0RBQXNEO0FBQ3RELDJFQUE4RjtBQUU5RjtJQUNFLFFBQVEsQ0FBQyxrQkFBa0IsRUFBRTtRQUMzQixJQUFNLGlCQUFpQixHQUFzQixJQUFJLHVDQUFpQixFQUFFLENBQUM7UUFFckU7WUFDRSxNQUFNLENBQUMsSUFBSSxrQ0FBZSxDQUN4QixpQkFBaUIsQ0FBQyxzQkFBc0IsRUFBRSxpQkFBaUIsQ0FBQyxXQUFXLENBQ3hFLENBQUM7UUFDSixDQUFDO1FBRUQsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUM7WUFDakMsVUFBVSxFQUFFLFFBQVE7WUFDcEIsbUJBQW1CLEVBQUUsWUFBWTtZQUNqQyxXQUFXLEVBQUU7Z0JBQ1gsSUFBSSxFQUFFLGVBQWUsQ0FBQyxNQUFNLENBQUMsSUFBSTtnQkFDakMsT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRTthQUM3QjtZQUNELGFBQWEsRUFBRTtnQkFDYixJQUFJLEVBQUUsUUFBUTtnQkFDZCxpQkFBaUIsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDO2FBQ3pDO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBdkJELG9CQXVCQyIsImZpbGUiOiJhcHAvc3RvcmUvYWN0aXZpdHkvYWN0aXZpdHkuZWZmZWN0cy5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWN0aXZpdHlFZmZlY3RzIH0gZnJvbSAnLi9hY3Rpdml0eS5lZmZlY3RzJztcbmltcG9ydCAqIGFzIEFjdGl2aXR5QWN0aW9ucyBmcm9tICcuL2FjdGl2aXR5LmFjdGlvbnMnO1xuaW1wb3J0IHsgRWZmZWN0c1NwZWNIZWxwZXIsIEVmZmVjdFRlc3RQYXJhbWV0ZXJzIH0gZnJvbSAnLi4vc3BlYy1oZWxwZXJzL2VmZmVjdHMuc3BlYy1oZWxwZXInO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcbiAgZGVzY3JpYmUoJ0FjdGl2aXR5IEVmZmVjdHMnLCAoKSA9PiB7XG4gICAgY29uc3QgZWZmZWN0c1NwZWNIZWxwZXI6IEVmZmVjdHNTcGVjSGVscGVyID0gbmV3IEVmZmVjdHNTcGVjSGVscGVyKCk7XG5cbiAgICBmdW5jdGlvbiBpbnN0YW50aWF0b3IoKTogQWN0aXZpdHlFZmZlY3RzIHtcbiAgICAgIHJldHVybiBuZXcgQWN0aXZpdHlFZmZlY3RzKFxuICAgICAgICBlZmZlY3RzU3BlY0hlbHBlci5tb2NrTmdyeEVmZmVjdHNBY3Rpb25zLCBlZmZlY3RzU3BlY0hlbHBlci5tb2NrU2VydmljZVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBlZmZlY3RzU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGVmZmVjdE5hbWU6ICdyZWNvcmQnLFxuICAgICAgZWZmZWN0c0luc3RhbnRpYXRvcjogaW5zdGFudGlhdG9yLFxuICAgICAgaW5wdXRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogQWN0aXZpdHlBY3Rpb25zLlJlY29yZC5UeXBlLFxuICAgICAgICBvcHRpb25zOiB7IHNvbWU6ICdvcHRpb25zJyB9XG4gICAgICB9LFxuICAgICAgc2VydmljZU1ldGhvZDoge1xuICAgICAgICBuYW1lOiAncmVjb3JkJyxcbiAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IFt7IHNvbWU6ICdvcHRpb25zJyB9XVxuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn1cbiJdfQ==
