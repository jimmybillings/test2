"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var multi_lingual_actions_1 = require("./multi-lingual.actions");
var actions_spec_helper_1 = require("../spec-helpers/actions.spec-helper");
function main() {
    describe('Multi-lingual Action Factory', function () {
        var actionsSpecHelper = new actions_spec_helper_1.ActionsSpecHelper();
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: multi_lingual_actions_1.ActionFactory,
                name: 'setLanguage',
                parameters: ['en']
            },
            expectedAction: {
                type: '[Multilingual] Set Language',
                lang: 'en'
            }
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9tdWx0aS1saW5ndWFsL211bHRpLWxpbmd1YWwuYWN0aW9ucy5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaUVBQXdEO0FBQ3hELDJFQUF3RTtBQUV4RTtJQUNFLFFBQVEsQ0FBQyw4QkFBOEIsRUFBRTtRQUN2QyxJQUFJLGlCQUFpQixHQUFzQixJQUFJLHVDQUFpQixFQUFFLENBQUM7UUFFbkUsaUJBQWlCLENBQUMsZUFBZSxDQUFDO1lBQ2hDLGFBQWEsRUFBRTtnQkFDYixLQUFLLEVBQUUscUNBQWE7Z0JBQ3BCLElBQUksRUFBRSxhQUFhO2dCQUNuQixVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUM7YUFDbkI7WUFDRCxjQUFjLEVBQUU7Z0JBQ2QsSUFBSSxFQUFFLDZCQUE2QjtnQkFDbkMsSUFBSSxFQUFFLElBQUk7YUFDWDtTQUNGLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQWhCRCxvQkFnQkMiLCJmaWxlIjoiYXBwL3N0b3JlL211bHRpLWxpbmd1YWwvbXVsdGktbGluZ3VhbC5hY3Rpb25zLnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBY3Rpb25GYWN0b3J5IH0gZnJvbSAnLi9tdWx0aS1saW5ndWFsLmFjdGlvbnMnO1xuaW1wb3J0IHsgQWN0aW9uc1NwZWNIZWxwZXIgfSBmcm9tICcuLi9zcGVjLWhlbHBlcnMvYWN0aW9ucy5zcGVjLWhlbHBlcic7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBkZXNjcmliZSgnTXVsdGktbGluZ3VhbCBBY3Rpb24gRmFjdG9yeScsICgpID0+IHtcbiAgICBsZXQgYWN0aW9uc1NwZWNIZWxwZXI6IEFjdGlvbnNTcGVjSGVscGVyID0gbmV3IEFjdGlvbnNTcGVjSGVscGVyKCk7XG5cbiAgICBhY3Rpb25zU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RGb3Ioe1xuICAgICAgZmFjdG9yeU1ldGhvZDoge1xuICAgICAgICBjbGFzczogQWN0aW9uRmFjdG9yeSxcbiAgICAgICAgbmFtZTogJ3NldExhbmd1YWdlJyxcbiAgICAgICAgcGFyYW1ldGVyczogWydlbiddXG4gICAgICB9LFxuICAgICAgZXhwZWN0ZWRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogJ1tNdWx0aWxpbmd1YWxdIFNldCBMYW5ndWFnZScsXG4gICAgICAgIGxhbmc6ICdlbidcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG5cbiJdfQ==
