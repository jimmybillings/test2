"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SnackbarActions = require("./snackbar.actions");
var SnackbarState = require("./snackbar.state");
var state_spec_helper_1 = require("../spec-helpers/state.spec-helper");
function main() {
    var stateSpecHelper = new state_spec_helper_1.StateSpecHelper();
    describe('Snackbar Reducer', function () {
        stateSpecHelper.setReducerTestModules({
            actions: SnackbarActions,
            state: SnackbarState,
        });
        stateSpecHelper.generateTestsFor({
            actionClassName: 'Display',
            customTests: [
                {
                    it: 'with previous state and message parameters, returns new state with message key and message parameters',
                    previousState: {
                        messageKey: 'old key',
                        messageParameters: { some: 'old parameters' },
                        translatedMessage: 'old translation'
                    },
                    actionParameters: { messageKey: 'new key', messageParameters: { some: 'new parameters' } },
                    expectedNextState: { messageKey: 'new key', messageParameters: { some: 'new parameters' }, translatedMessage: '' }
                },
                {
                    it: 'with previous state and no message parameters, returns new state with message key',
                    previousState: {
                        messageKey: 'old key',
                        messageParameters: { some: 'old parameters' },
                        translatedMessage: 'old translation'
                    },
                    actionParameters: { messageKey: 'new key' },
                    expectedNextState: { messageKey: 'new key', messageParameters: undefined, translatedMessage: '' }
                },
                {
                    it: 'without previous state and with message parameters, returns new state with message key and message parameters',
                    actionParameters: { messageKey: 'new key', messageParameters: { some: 'new parameters' } },
                    expectedNextState: { messageKey: 'new key', messageParameters: { some: 'new parameters' }, translatedMessage: '' }
                },
                {
                    it: 'without previous state or message parameters, returns new state with message key',
                    actionParameters: { messageKey: 'new key' },
                    expectedNextState: { messageKey: 'new key', messageParameters: undefined, translatedMessage: '' }
                }
            ]
        });
        stateSpecHelper.generateTestsFor({
            actionClassName: 'DisplaySuccess',
            customTests: [
                {
                    it: 'with previous state, returns previous state with translated message',
                    previousState: {
                        messageKey: 'old key',
                        messageParameters: { some: 'old parameters' },
                        translatedMessage: 'old translation'
                    },
                    actionParameters: { translatedMessage: 'new translation' },
                    expectedNextState: {
                        messageKey: 'old key',
                        messageParameters: { some: 'old parameters' },
                        translatedMessage: 'new translation'
                    }
                },
                {
                    it: 'without previous state, returns initial state with translated message',
                    actionParameters: { translatedMessage: 'new translation' },
                    expectedNextState: { messageKey: '', messageParameters: {}, translatedMessage: 'new translation' }
                }
            ]
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9zbmFja2Jhci9zbmFja2Jhci5zdGF0ZS5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsb0RBQXNEO0FBQ3RELGdEQUFrRDtBQUNsRCx1RUFBb0U7QUFFcEU7SUFDRSxJQUFNLGVBQWUsR0FBb0IsSUFBSSxtQ0FBZSxFQUFFLENBQUM7SUFFL0QsUUFBUSxDQUFDLGtCQUFrQixFQUFFO1FBQzNCLGVBQWUsQ0FBQyxxQkFBcUIsQ0FBQztZQUNwQyxPQUFPLEVBQUUsZUFBZTtZQUN4QixLQUFLLEVBQUUsYUFBYTtTQUNyQixDQUFDLENBQUM7UUFFSCxlQUFlLENBQUMsZ0JBQWdCLENBQUM7WUFDL0IsZUFBZSxFQUFFLFNBQVM7WUFDMUIsV0FBVyxFQUFFO2dCQUNYO29CQUNFLEVBQUUsRUFBRSx1R0FBdUc7b0JBQzNHLGFBQWEsRUFBRTt3QkFDYixVQUFVLEVBQUUsU0FBUzt3QkFDckIsaUJBQWlCLEVBQUUsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUU7d0JBQzdDLGlCQUFpQixFQUFFLGlCQUFpQjtxQkFDckM7b0JBQ0QsZ0JBQWdCLEVBQUUsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixFQUFFLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLEVBQUU7b0JBQzFGLGlCQUFpQixFQUFFLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFBRSxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxFQUFFLGlCQUFpQixFQUFFLEVBQUUsRUFBRTtpQkFDbkg7Z0JBQ0Q7b0JBQ0UsRUFBRSxFQUFFLG1GQUFtRjtvQkFDdkYsYUFBYSxFQUFFO3dCQUNiLFVBQVUsRUFBRSxTQUFTO3dCQUNyQixpQkFBaUIsRUFBRSxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRTt3QkFDN0MsaUJBQWlCLEVBQUUsaUJBQWlCO3FCQUNyQztvQkFDRCxnQkFBZ0IsRUFBRSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUU7b0JBQzNDLGlCQUFpQixFQUFFLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsRUFBRSxFQUFFO2lCQUNsRztnQkFDRDtvQkFDRSxFQUFFLEVBQUUsK0dBQStHO29CQUNuSCxnQkFBZ0IsRUFBRSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsRUFBRTtvQkFDMUYsaUJBQWlCLEVBQUUsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixFQUFFLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLEVBQUUsaUJBQWlCLEVBQUUsRUFBRSxFQUFFO2lCQUNuSDtnQkFDRDtvQkFDRSxFQUFFLEVBQUUsa0ZBQWtGO29CQUN0RixnQkFBZ0IsRUFBRSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUU7b0JBQzNDLGlCQUFpQixFQUFFLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsRUFBRSxFQUFFO2lCQUNsRzthQUNGO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsZUFBZSxDQUFDLGdCQUFnQixDQUFDO1lBQy9CLGVBQWUsRUFBRSxnQkFBZ0I7WUFDakMsV0FBVyxFQUFFO2dCQUNYO29CQUNFLEVBQUUsRUFBRSxxRUFBcUU7b0JBQ3pFLGFBQWEsRUFBRTt3QkFDYixVQUFVLEVBQUUsU0FBUzt3QkFDckIsaUJBQWlCLEVBQUUsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUU7d0JBQzdDLGlCQUFpQixFQUFFLGlCQUFpQjtxQkFDckM7b0JBQ0QsZ0JBQWdCLEVBQUUsRUFBRSxpQkFBaUIsRUFBRSxpQkFBaUIsRUFBRTtvQkFDMUQsaUJBQWlCLEVBQUU7d0JBQ2pCLFVBQVUsRUFBRSxTQUFTO3dCQUNyQixpQkFBaUIsRUFBRSxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRTt3QkFDN0MsaUJBQWlCLEVBQUUsaUJBQWlCO3FCQUNyQztpQkFDRjtnQkFDRDtvQkFDRSxFQUFFLEVBQUUsdUVBQXVFO29CQUMzRSxnQkFBZ0IsRUFBRSxFQUFFLGlCQUFpQixFQUFFLGlCQUFpQixFQUFFO29CQUMxRCxpQkFBaUIsRUFBRSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsaUJBQWlCLEVBQUUsRUFBRSxFQUFFLGlCQUFpQixFQUFFLGlCQUFpQixFQUFFO2lCQUNuRzthQUNGO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBdEVELG9CQXNFQyIsImZpbGUiOiJhcHAvc3RvcmUvc25hY2tiYXIvc25hY2tiYXIuc3RhdGUuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFNuYWNrYmFyQWN0aW9ucyBmcm9tICcuL3NuYWNrYmFyLmFjdGlvbnMnO1xuaW1wb3J0ICogYXMgU25hY2tiYXJTdGF0ZSBmcm9tICcuL3NuYWNrYmFyLnN0YXRlJztcbmltcG9ydCB7IFN0YXRlU3BlY0hlbHBlciB9IGZyb20gJy4uL3NwZWMtaGVscGVycy9zdGF0ZS5zcGVjLWhlbHBlcic7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBjb25zdCBzdGF0ZVNwZWNIZWxwZXI6IFN0YXRlU3BlY0hlbHBlciA9IG5ldyBTdGF0ZVNwZWNIZWxwZXIoKTtcblxuICBkZXNjcmliZSgnU25hY2tiYXIgUmVkdWNlcicsICgpID0+IHtcbiAgICBzdGF0ZVNwZWNIZWxwZXIuc2V0UmVkdWNlclRlc3RNb2R1bGVzKHtcbiAgICAgIGFjdGlvbnM6IFNuYWNrYmFyQWN0aW9ucyxcbiAgICAgIHN0YXRlOiBTbmFja2JhclN0YXRlLFxuICAgIH0pO1xuXG4gICAgc3RhdGVTcGVjSGVscGVyLmdlbmVyYXRlVGVzdHNGb3Ioe1xuICAgICAgYWN0aW9uQ2xhc3NOYW1lOiAnRGlzcGxheScsXG4gICAgICBjdXN0b21UZXN0czogW1xuICAgICAgICB7XG4gICAgICAgICAgaXQ6ICd3aXRoIHByZXZpb3VzIHN0YXRlIGFuZCBtZXNzYWdlIHBhcmFtZXRlcnMsIHJldHVybnMgbmV3IHN0YXRlIHdpdGggbWVzc2FnZSBrZXkgYW5kIG1lc3NhZ2UgcGFyYW1ldGVycycsXG4gICAgICAgICAgcHJldmlvdXNTdGF0ZToge1xuICAgICAgICAgICAgbWVzc2FnZUtleTogJ29sZCBrZXknLFxuICAgICAgICAgICAgbWVzc2FnZVBhcmFtZXRlcnM6IHsgc29tZTogJ29sZCBwYXJhbWV0ZXJzJyB9LFxuICAgICAgICAgICAgdHJhbnNsYXRlZE1lc3NhZ2U6ICdvbGQgdHJhbnNsYXRpb24nXG4gICAgICAgICAgfSxcbiAgICAgICAgICBhY3Rpb25QYXJhbWV0ZXJzOiB7IG1lc3NhZ2VLZXk6ICduZXcga2V5JywgbWVzc2FnZVBhcmFtZXRlcnM6IHsgc29tZTogJ25ldyBwYXJhbWV0ZXJzJyB9IH0sXG4gICAgICAgICAgZXhwZWN0ZWROZXh0U3RhdGU6IHsgbWVzc2FnZUtleTogJ25ldyBrZXknLCBtZXNzYWdlUGFyYW1ldGVyczogeyBzb21lOiAnbmV3IHBhcmFtZXRlcnMnIH0sIHRyYW5zbGF0ZWRNZXNzYWdlOiAnJyB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBpdDogJ3dpdGggcHJldmlvdXMgc3RhdGUgYW5kIG5vIG1lc3NhZ2UgcGFyYW1ldGVycywgcmV0dXJucyBuZXcgc3RhdGUgd2l0aCBtZXNzYWdlIGtleScsXG4gICAgICAgICAgcHJldmlvdXNTdGF0ZToge1xuICAgICAgICAgICAgbWVzc2FnZUtleTogJ29sZCBrZXknLFxuICAgICAgICAgICAgbWVzc2FnZVBhcmFtZXRlcnM6IHsgc29tZTogJ29sZCBwYXJhbWV0ZXJzJyB9LFxuICAgICAgICAgICAgdHJhbnNsYXRlZE1lc3NhZ2U6ICdvbGQgdHJhbnNsYXRpb24nXG4gICAgICAgICAgfSxcbiAgICAgICAgICBhY3Rpb25QYXJhbWV0ZXJzOiB7IG1lc3NhZ2VLZXk6ICduZXcga2V5JyB9LFxuICAgICAgICAgIGV4cGVjdGVkTmV4dFN0YXRlOiB7IG1lc3NhZ2VLZXk6ICduZXcga2V5JywgbWVzc2FnZVBhcmFtZXRlcnM6IHVuZGVmaW5lZCwgdHJhbnNsYXRlZE1lc3NhZ2U6ICcnIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGl0OiAnd2l0aG91dCBwcmV2aW91cyBzdGF0ZSBhbmQgd2l0aCBtZXNzYWdlIHBhcmFtZXRlcnMsIHJldHVybnMgbmV3IHN0YXRlIHdpdGggbWVzc2FnZSBrZXkgYW5kIG1lc3NhZ2UgcGFyYW1ldGVycycsXG4gICAgICAgICAgYWN0aW9uUGFyYW1ldGVyczogeyBtZXNzYWdlS2V5OiAnbmV3IGtleScsIG1lc3NhZ2VQYXJhbWV0ZXJzOiB7IHNvbWU6ICduZXcgcGFyYW1ldGVycycgfSB9LFxuICAgICAgICAgIGV4cGVjdGVkTmV4dFN0YXRlOiB7IG1lc3NhZ2VLZXk6ICduZXcga2V5JywgbWVzc2FnZVBhcmFtZXRlcnM6IHsgc29tZTogJ25ldyBwYXJhbWV0ZXJzJyB9LCB0cmFuc2xhdGVkTWVzc2FnZTogJycgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgaXQ6ICd3aXRob3V0IHByZXZpb3VzIHN0YXRlIG9yIG1lc3NhZ2UgcGFyYW1ldGVycywgcmV0dXJucyBuZXcgc3RhdGUgd2l0aCBtZXNzYWdlIGtleScsXG4gICAgICAgICAgYWN0aW9uUGFyYW1ldGVyczogeyBtZXNzYWdlS2V5OiAnbmV3IGtleScgfSxcbiAgICAgICAgICBleHBlY3RlZE5leHRTdGF0ZTogeyBtZXNzYWdlS2V5OiAnbmV3IGtleScsIG1lc3NhZ2VQYXJhbWV0ZXJzOiB1bmRlZmluZWQsIHRyYW5zbGF0ZWRNZXNzYWdlOiAnJyB9XG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9KTtcblxuICAgIHN0YXRlU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGFjdGlvbkNsYXNzTmFtZTogJ0Rpc3BsYXlTdWNjZXNzJyxcbiAgICAgIGN1c3RvbVRlc3RzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBpdDogJ3dpdGggcHJldmlvdXMgc3RhdGUsIHJldHVybnMgcHJldmlvdXMgc3RhdGUgd2l0aCB0cmFuc2xhdGVkIG1lc3NhZ2UnLFxuICAgICAgICAgIHByZXZpb3VzU3RhdGU6IHtcbiAgICAgICAgICAgIG1lc3NhZ2VLZXk6ICdvbGQga2V5JyxcbiAgICAgICAgICAgIG1lc3NhZ2VQYXJhbWV0ZXJzOiB7IHNvbWU6ICdvbGQgcGFyYW1ldGVycycgfSxcbiAgICAgICAgICAgIHRyYW5zbGF0ZWRNZXNzYWdlOiAnb2xkIHRyYW5zbGF0aW9uJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgYWN0aW9uUGFyYW1ldGVyczogeyB0cmFuc2xhdGVkTWVzc2FnZTogJ25ldyB0cmFuc2xhdGlvbicgfSxcbiAgICAgICAgICBleHBlY3RlZE5leHRTdGF0ZToge1xuICAgICAgICAgICAgbWVzc2FnZUtleTogJ29sZCBrZXknLFxuICAgICAgICAgICAgbWVzc2FnZVBhcmFtZXRlcnM6IHsgc29tZTogJ29sZCBwYXJhbWV0ZXJzJyB9LFxuICAgICAgICAgICAgdHJhbnNsYXRlZE1lc3NhZ2U6ICduZXcgdHJhbnNsYXRpb24nXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgaXQ6ICd3aXRob3V0IHByZXZpb3VzIHN0YXRlLCByZXR1cm5zIGluaXRpYWwgc3RhdGUgd2l0aCB0cmFuc2xhdGVkIG1lc3NhZ2UnLFxuICAgICAgICAgIGFjdGlvblBhcmFtZXRlcnM6IHsgdHJhbnNsYXRlZE1lc3NhZ2U6ICduZXcgdHJhbnNsYXRpb24nIH0sXG4gICAgICAgICAgZXhwZWN0ZWROZXh0U3RhdGU6IHsgbWVzc2FnZUtleTogJycsIG1lc3NhZ2VQYXJhbWV0ZXJzOiB7fSwgdHJhbnNsYXRlZE1lc3NhZ2U6ICduZXcgdHJhbnNsYXRpb24nIH1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0pO1xuICB9KTtcbn1cbiJdfQ==
