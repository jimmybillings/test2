"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var quote_show_actions_1 = require("./quote-show.actions");
var actions_spec_helper_1 = require("../spec-helpers/actions.spec-helper");
function main() {
    describe('Quote Show Action Factory', function () {
        var actionsSpecHelper = new actions_spec_helper_1.ActionsSpecHelper();
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: quote_show_actions_1.ActionFactory,
                name: 'load',
                parameters: [42]
            },
            expectedAction: {
                type: '[Quote Show] Load',
                quoteId: 42
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: quote_show_actions_1.InternalActionFactory,
                name: 'loadSuccess',
                parameters: [{ some: 'quote' }]
            },
            expectedAction: {
                type: '[Quote Show] Load Success',
                quote: { some: 'quote' }
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: quote_show_actions_1.InternalActionFactory,
                name: 'loadFailure',
                parameters: [{ some: 'error' }]
            },
            expectedAction: {
                type: '[Quote Show] Load Failure',
                error: { some: 'error' }
            }
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9xdW90ZS1zaG93L3F1b3RlLXNob3cuYWN0aW9ucy5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkRBQTRFO0FBQzVFLDJFQUF3RTtBQUV4RTtJQUNFLFFBQVEsQ0FBQywyQkFBMkIsRUFBRTtRQUNwQyxJQUFJLGlCQUFpQixHQUFzQixJQUFJLHVDQUFpQixFQUFFLENBQUM7UUFFbkUsaUJBQWlCLENBQUMsZUFBZSxDQUFDO1lBQ2hDLGFBQWEsRUFBRTtnQkFDYixLQUFLLEVBQUUsa0NBQWE7Z0JBQ3BCLElBQUksRUFBRSxNQUFNO2dCQUNaLFVBQVUsRUFBRSxDQUFDLEVBQUUsQ0FBQzthQUNqQjtZQUNELGNBQWMsRUFBRTtnQkFDZCxJQUFJLEVBQUUsbUJBQW1CO2dCQUN6QixPQUFPLEVBQUUsRUFBRTthQUNaO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsaUJBQWlCLENBQUMsZUFBZSxDQUFDO1lBQ2hDLGFBQWEsRUFBRTtnQkFDYixLQUFLLEVBQUUsMENBQXFCO2dCQUM1QixJQUFJLEVBQUUsYUFBYTtnQkFDbkIsVUFBVSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUM7YUFDaEM7WUFDRCxjQUFjLEVBQUU7Z0JBQ2QsSUFBSSxFQUFFLDJCQUEyQjtnQkFDakMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRTthQUN6QjtTQUNGLENBQUMsQ0FBQztRQUVILGlCQUFpQixDQUFDLGVBQWUsQ0FBQztZQUNoQyxhQUFhLEVBQUU7Z0JBQ2IsS0FBSyxFQUFFLDBDQUFxQjtnQkFDNUIsSUFBSSxFQUFFLGFBQWE7Z0JBQ25CLFVBQVUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDO2FBQ2hDO1lBQ0QsY0FBYyxFQUFFO2dCQUNkLElBQUksRUFBRSwyQkFBMkI7Z0JBQ2pDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUU7YUFDekI7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUF4Q0Qsb0JBd0NDIiwiZmlsZSI6ImFwcC9zdG9yZS9xdW90ZS1zaG93L3F1b3RlLXNob3cuYWN0aW9ucy5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWN0aW9uRmFjdG9yeSwgSW50ZXJuYWxBY3Rpb25GYWN0b3J5IH0gZnJvbSAnLi9xdW90ZS1zaG93LmFjdGlvbnMnO1xuaW1wb3J0IHsgQWN0aW9uc1NwZWNIZWxwZXIgfSBmcm9tICcuLi9zcGVjLWhlbHBlcnMvYWN0aW9ucy5zcGVjLWhlbHBlcic7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBkZXNjcmliZSgnUXVvdGUgU2hvdyBBY3Rpb24gRmFjdG9yeScsICgpID0+IHtcbiAgICBsZXQgYWN0aW9uc1NwZWNIZWxwZXI6IEFjdGlvbnNTcGVjSGVscGVyID0gbmV3IEFjdGlvbnNTcGVjSGVscGVyKCk7XG5cbiAgICBhY3Rpb25zU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RGb3Ioe1xuICAgICAgZmFjdG9yeU1ldGhvZDoge1xuICAgICAgICBjbGFzczogQWN0aW9uRmFjdG9yeSxcbiAgICAgICAgbmFtZTogJ2xvYWQnLFxuICAgICAgICBwYXJhbWV0ZXJzOiBbNDJdXG4gICAgICB9LFxuICAgICAgZXhwZWN0ZWRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogJ1tRdW90ZSBTaG93XSBMb2FkJyxcbiAgICAgICAgcXVvdGVJZDogNDJcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGFjdGlvbnNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdEZvcih7XG4gICAgICBmYWN0b3J5TWV0aG9kOiB7XG4gICAgICAgIGNsYXNzOiBJbnRlcm5hbEFjdGlvbkZhY3RvcnksXG4gICAgICAgIG5hbWU6ICdsb2FkU3VjY2VzcycsXG4gICAgICAgIHBhcmFtZXRlcnM6IFt7IHNvbWU6ICdxdW90ZScgfV1cbiAgICAgIH0sXG4gICAgICBleHBlY3RlZEFjdGlvbjoge1xuICAgICAgICB0eXBlOiAnW1F1b3RlIFNob3ddIExvYWQgU3VjY2VzcycsXG4gICAgICAgIHF1b3RlOiB7IHNvbWU6ICdxdW90ZScgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgYWN0aW9uc1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0Rm9yKHtcbiAgICAgIGZhY3RvcnlNZXRob2Q6IHtcbiAgICAgICAgY2xhc3M6IEludGVybmFsQWN0aW9uRmFjdG9yeSxcbiAgICAgICAgbmFtZTogJ2xvYWRGYWlsdXJlJyxcbiAgICAgICAgcGFyYW1ldGVyczogW3sgc29tZTogJ2Vycm9yJyB9XVxuICAgICAgfSxcbiAgICAgIGV4cGVjdGVkQWN0aW9uOiB7XG4gICAgICAgIHR5cGU6ICdbUXVvdGUgU2hvd10gTG9hZCBGYWlsdXJlJyxcbiAgICAgICAgZXJyb3I6IHsgc29tZTogJ2Vycm9yJyB9XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuIl19
