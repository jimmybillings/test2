"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SharingState = require("./sharing.state");
var SharingActions = require("./sharing.actions");
var state_spec_helper_1 = require("../spec-helpers/state.spec-helper");
function main() {
    var stateSpecHelper = new state_spec_helper_1.StateSpecHelper();
    describe('Sharing Reducer', function () {
        stateSpecHelper.setReducerTestModules({
            actions: SharingActions,
            state: SharingState,
        });
    });
    stateSpecHelper.generateTestsFor({
        actionClassName: 'CreateAssetShareLinkSuccess',
        customTests: [
            {
                it: 'with previous state, returns previous state with assetLink',
                previousState: {
                    assetLink: 'old link',
                },
                actionParameters: { link: 'new link' },
                expectedNextState: {
                    assetLink: 'new link',
                }
            }
        ]
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9zaGFyaW5nL3NoYXJpbmcuc3RhdGUuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDhDQUFnRDtBQUNoRCxrREFBb0Q7QUFDcEQsdUVBQW9FO0FBRXBFO0lBQ0UsSUFBTSxlQUFlLEdBQW9CLElBQUksbUNBQWUsRUFBRSxDQUFDO0lBRS9ELFFBQVEsQ0FBQyxpQkFBaUIsRUFBRTtRQUMxQixlQUFlLENBQUMscUJBQXFCLENBQUM7WUFDcEMsT0FBTyxFQUFFLGNBQWM7WUFDdkIsS0FBSyxFQUFFLFlBQVk7U0FDcEIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxlQUFlLENBQUMsZ0JBQWdCLENBQUM7UUFDL0IsZUFBZSxFQUFFLDZCQUE2QjtRQUM5QyxXQUFXLEVBQUU7WUFDWDtnQkFDRSxFQUFFLEVBQUUsNERBQTREO2dCQUNoRSxhQUFhLEVBQUU7b0JBQ2IsU0FBUyxFQUFFLFVBQVU7aUJBQ3RCO2dCQUNELGdCQUFnQixFQUFFLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRTtnQkFDdEMsaUJBQWlCLEVBQUU7b0JBQ2pCLFNBQVMsRUFBRSxVQUFVO2lCQUN0QjthQUNGO1NBQ0Y7S0FDRixDQUFDLENBQUM7QUFDTCxDQUFDO0FBekJELG9CQXlCQyIsImZpbGUiOiJhcHAvc3RvcmUvc2hhcmluZy9zaGFyaW5nLnN0YXRlLnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBTaGFyaW5nU3RhdGUgZnJvbSAnLi9zaGFyaW5nLnN0YXRlJztcbmltcG9ydCAqIGFzIFNoYXJpbmdBY3Rpb25zIGZyb20gJy4vc2hhcmluZy5hY3Rpb25zJztcbmltcG9ydCB7IFN0YXRlU3BlY0hlbHBlciB9IGZyb20gJy4uL3NwZWMtaGVscGVycy9zdGF0ZS5zcGVjLWhlbHBlcic7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBjb25zdCBzdGF0ZVNwZWNIZWxwZXI6IFN0YXRlU3BlY0hlbHBlciA9IG5ldyBTdGF0ZVNwZWNIZWxwZXIoKTtcblxuICBkZXNjcmliZSgnU2hhcmluZyBSZWR1Y2VyJywgKCkgPT4ge1xuICAgIHN0YXRlU3BlY0hlbHBlci5zZXRSZWR1Y2VyVGVzdE1vZHVsZXMoe1xuICAgICAgYWN0aW9uczogU2hhcmluZ0FjdGlvbnMsXG4gICAgICBzdGF0ZTogU2hhcmluZ1N0YXRlLFxuICAgIH0pO1xuICB9KTtcblxuICBzdGF0ZVNwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgYWN0aW9uQ2xhc3NOYW1lOiAnQ3JlYXRlQXNzZXRTaGFyZUxpbmtTdWNjZXNzJyxcbiAgICBjdXN0b21UZXN0czogW1xuICAgICAge1xuICAgICAgICBpdDogJ3dpdGggcHJldmlvdXMgc3RhdGUsIHJldHVybnMgcHJldmlvdXMgc3RhdGUgd2l0aCBhc3NldExpbmsnLFxuICAgICAgICBwcmV2aW91c1N0YXRlOiB7XG4gICAgICAgICAgYXNzZXRMaW5rOiAnb2xkIGxpbmsnLFxuICAgICAgICB9LFxuICAgICAgICBhY3Rpb25QYXJhbWV0ZXJzOiB7IGxpbms6ICduZXcgbGluaycgfSxcbiAgICAgICAgZXhwZWN0ZWROZXh0U3RhdGU6IHtcbiAgICAgICAgICBhc3NldExpbms6ICduZXcgbGluaycsXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICBdXG4gIH0pO1xufVxuIl19
