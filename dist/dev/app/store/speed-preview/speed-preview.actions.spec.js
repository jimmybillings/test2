"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var speed_preview_actions_1 = require("./speed-preview.actions");
var actions_spec_helper_1 = require("../spec-helpers/actions.spec-helper");
function main() {
    describe('Speed Preview Action Factory', function () {
        var actionsSpecHelper = new actions_spec_helper_1.ActionsSpecHelper();
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: speed_preview_actions_1.ActionFactory,
                name: 'load',
                parameters: [{ asset: { assetId: 1 } }]
            },
            expectedAction: {
                type: '[SpeedPreview] Load',
                asset: { asset: { assetId: 1 } }
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: speed_preview_actions_1.InternalActionFactory,
                name: 'loadSuccess',
                parameters: [{ 'speedViewData': 'test speed view data' }, 1]
            },
            expectedAction: {
                type: '[SpeedPreview] Load Success',
                speedViewData: { 'speedViewData': 'test speed view data' },
                assetId: 1
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: speed_preview_actions_1.InternalActionFactory,
                name: 'loadFailure',
                parameters: [1]
            },
            expectedAction: {
                type: '[SpeedPreview] Load Failure',
                assetId: 1
            }
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9zcGVlZC1wcmV2aWV3L3NwZWVkLXByZXZpZXcuYWN0aW9ucy5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaUVBQStFO0FBQy9FLDJFQUF3RTtBQUV4RTtJQUNFLFFBQVEsQ0FBQyw4QkFBOEIsRUFBRTtRQUN2QyxJQUFJLGlCQUFpQixHQUFzQixJQUFJLHVDQUFpQixFQUFFLENBQUM7UUFFbkUsaUJBQWlCLENBQUMsZUFBZSxDQUFDO1lBQ2hDLGFBQWEsRUFBRTtnQkFDYixLQUFLLEVBQUUscUNBQWE7Z0JBQ3BCLElBQUksRUFBRSxNQUFNO2dCQUNaLFVBQVUsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7YUFDeEM7WUFDRCxjQUFjLEVBQUU7Z0JBQ2QsSUFBSSxFQUFFLHFCQUFxQjtnQkFDM0IsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxFQUFFO2FBQ2pDO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsaUJBQWlCLENBQUMsZUFBZSxDQUFDO1lBQ2hDLGFBQWEsRUFBRTtnQkFDYixLQUFLLEVBQUUsNkNBQXFCO2dCQUM1QixJQUFJLEVBQUUsYUFBYTtnQkFDbkIsVUFBVSxFQUFFLENBQUMsRUFBRSxlQUFlLEVBQUUsc0JBQXNCLEVBQUUsRUFBRSxDQUFDLENBQUM7YUFDN0Q7WUFDRCxjQUFjLEVBQUU7Z0JBQ2QsSUFBSSxFQUFFLDZCQUE2QjtnQkFDbkMsYUFBYSxFQUFFLEVBQUUsZUFBZSxFQUFFLHNCQUFzQixFQUFFO2dCQUMxRCxPQUFPLEVBQUUsQ0FBQzthQUNYO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsaUJBQWlCLENBQUMsZUFBZSxDQUFDO1lBQ2hDLGFBQWEsRUFBRTtnQkFDYixLQUFLLEVBQUUsNkNBQXFCO2dCQUM1QixJQUFJLEVBQUUsYUFBYTtnQkFDbkIsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQ2hCO1lBQ0QsY0FBYyxFQUFFO2dCQUNkLElBQUksRUFBRSw2QkFBNkI7Z0JBQ25DLE9BQU8sRUFBRSxDQUFDO2FBQ1g7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUVMLENBQUM7QUExQ0Qsb0JBMENDIiwiZmlsZSI6ImFwcC9zdG9yZS9zcGVlZC1wcmV2aWV3L3NwZWVkLXByZXZpZXcuYWN0aW9ucy5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWN0aW9uRmFjdG9yeSwgSW50ZXJuYWxBY3Rpb25GYWN0b3J5IH0gZnJvbSAnLi9zcGVlZC1wcmV2aWV3LmFjdGlvbnMnO1xuaW1wb3J0IHsgQWN0aW9uc1NwZWNIZWxwZXIgfSBmcm9tICcuLi9zcGVjLWhlbHBlcnMvYWN0aW9ucy5zcGVjLWhlbHBlcic7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBkZXNjcmliZSgnU3BlZWQgUHJldmlldyBBY3Rpb24gRmFjdG9yeScsICgpID0+IHtcbiAgICBsZXQgYWN0aW9uc1NwZWNIZWxwZXI6IEFjdGlvbnNTcGVjSGVscGVyID0gbmV3IEFjdGlvbnNTcGVjSGVscGVyKCk7XG5cbiAgICBhY3Rpb25zU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RGb3Ioe1xuICAgICAgZmFjdG9yeU1ldGhvZDoge1xuICAgICAgICBjbGFzczogQWN0aW9uRmFjdG9yeSxcbiAgICAgICAgbmFtZTogJ2xvYWQnLFxuICAgICAgICBwYXJhbWV0ZXJzOiBbeyBhc3NldDogeyBhc3NldElkOiAxIH0gfV1cbiAgICAgIH0sXG4gICAgICBleHBlY3RlZEFjdGlvbjoge1xuICAgICAgICB0eXBlOiAnW1NwZWVkUHJldmlld10gTG9hZCcsXG4gICAgICAgIGFzc2V0OiB7IGFzc2V0OiB7IGFzc2V0SWQ6IDEgfSB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBhY3Rpb25zU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RGb3Ioe1xuICAgICAgZmFjdG9yeU1ldGhvZDoge1xuICAgICAgICBjbGFzczogSW50ZXJuYWxBY3Rpb25GYWN0b3J5LFxuICAgICAgICBuYW1lOiAnbG9hZFN1Y2Nlc3MnLFxuICAgICAgICBwYXJhbWV0ZXJzOiBbeyAnc3BlZWRWaWV3RGF0YSc6ICd0ZXN0IHNwZWVkIHZpZXcgZGF0YScgfSwgMV1cbiAgICAgIH0sXG4gICAgICBleHBlY3RlZEFjdGlvbjoge1xuICAgICAgICB0eXBlOiAnW1NwZWVkUHJldmlld10gTG9hZCBTdWNjZXNzJyxcbiAgICAgICAgc3BlZWRWaWV3RGF0YTogeyAnc3BlZWRWaWV3RGF0YSc6ICd0ZXN0IHNwZWVkIHZpZXcgZGF0YScgfSxcbiAgICAgICAgYXNzZXRJZDogMVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgYWN0aW9uc1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0Rm9yKHtcbiAgICAgIGZhY3RvcnlNZXRob2Q6IHtcbiAgICAgICAgY2xhc3M6IEludGVybmFsQWN0aW9uRmFjdG9yeSxcbiAgICAgICAgbmFtZTogJ2xvYWRGYWlsdXJlJyxcbiAgICAgICAgcGFyYW1ldGVyczogWzFdXG4gICAgICB9LFxuICAgICAgZXhwZWN0ZWRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogJ1tTcGVlZFByZXZpZXddIExvYWQgRmFpbHVyZScsXG4gICAgICAgIGFzc2V0SWQ6IDFcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG5cbn1cblxuIl19
