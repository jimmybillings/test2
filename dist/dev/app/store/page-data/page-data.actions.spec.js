"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var page_data_actions_1 = require("./page-data.actions");
var actions_spec_helper_1 = require("../spec-helpers/actions.spec-helper");
function main() {
    describe('Page Data Actions', function () {
        var actionsSpecHelper = new actions_spec_helper_1.ActionsSpecHelper();
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: page_data_actions_1.ActionFactory,
                name: 'updateTitle',
                parameters: ['key', { some: 'params' }]
            },
            expectedAction: {
                type: '[Page Data] Update Title',
                trKey: 'key',
                trParams: { some: 'params' }
            }
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9wYWdlLWRhdGEvcGFnZS1kYXRhLmFjdGlvbnMuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHlEQUEyRTtBQUMzRSwyRUFBd0U7QUFFeEU7SUFDRSxRQUFRLENBQUMsbUJBQW1CLEVBQUU7UUFDNUIsSUFBSSxpQkFBaUIsR0FBc0IsSUFBSSx1Q0FBaUIsRUFBRSxDQUFDO1FBRW5FLGlCQUFpQixDQUFDLGVBQWUsQ0FBQztZQUNoQyxhQUFhLEVBQUU7Z0JBQ2IsS0FBSyxFQUFFLGlDQUFhO2dCQUNwQixJQUFJLEVBQUUsYUFBYTtnQkFDbkIsVUFBVSxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxDQUFDO2FBQ3hDO1lBQ0QsY0FBYyxFQUFFO2dCQUNkLElBQUksRUFBRSwwQkFBMEI7Z0JBQ2hDLEtBQUssRUFBRSxLQUFLO2dCQUNaLFFBQVEsRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7YUFDN0I7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFqQkQsb0JBaUJDIiwiZmlsZSI6ImFwcC9zdG9yZS9wYWdlLWRhdGEvcGFnZS1kYXRhLmFjdGlvbnMuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFjdGlvbkZhY3RvcnksIEludGVybmFsQWN0aW9uRmFjdG9yeSB9IGZyb20gJy4vcGFnZS1kYXRhLmFjdGlvbnMnO1xuaW1wb3J0IHsgQWN0aW9uc1NwZWNIZWxwZXIgfSBmcm9tICcuLi9zcGVjLWhlbHBlcnMvYWN0aW9ucy5zcGVjLWhlbHBlcic7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBkZXNjcmliZSgnUGFnZSBEYXRhIEFjdGlvbnMnLCAoKSA9PiB7XG4gICAgbGV0IGFjdGlvbnNTcGVjSGVscGVyOiBBY3Rpb25zU3BlY0hlbHBlciA9IG5ldyBBY3Rpb25zU3BlY0hlbHBlcigpO1xuXG4gICAgYWN0aW9uc1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0Rm9yKHtcbiAgICAgIGZhY3RvcnlNZXRob2Q6IHtcbiAgICAgICAgY2xhc3M6IEFjdGlvbkZhY3RvcnksXG4gICAgICAgIG5hbWU6ICd1cGRhdGVUaXRsZScsXG4gICAgICAgIHBhcmFtZXRlcnM6IFsna2V5JywgeyBzb21lOiAncGFyYW1zJyB9XVxuICAgICAgfSxcbiAgICAgIGV4cGVjdGVkQWN0aW9uOiB7XG4gICAgICAgIHR5cGU6ICdbUGFnZSBEYXRhXSBVcGRhdGUgVGl0bGUnLFxuICAgICAgICB0cktleTogJ2tleScsXG4gICAgICAgIHRyUGFyYW1zOiB7IHNvbWU6ICdwYXJhbXMnIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG4iXX0=
