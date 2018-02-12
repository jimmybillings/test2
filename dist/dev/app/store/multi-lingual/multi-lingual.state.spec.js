"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MultiLingualState = require("./multi-lingual.state");
var MultiLingualActions = require("./multi-lingual.actions");
var state_spec_helper_1 = require("../spec-helpers/state.spec-helper");
function main() {
    var stateSpecHelper = new state_spec_helper_1.StateSpecHelper();
    describe('Multilingual Reducer', function () {
        stateSpecHelper.setReducerTestModules({
            state: MultiLingualState,
            actions: MultiLingualActions
        });
        stateSpecHelper.generateTestsFor({
            actionClassName: 'SetLanguage',
            customTests: [
                {
                    it: 'returns the state with a correct language code',
                    actionParameters: { lang: 'fr' },
                    previousState: MultiLingualState.initialState,
                    expectedNextState: { lang: 'fr' }
                }
            ]
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9tdWx0aS1saW5ndWFsL211bHRpLWxpbmd1YWwuc3RhdGUuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHlEQUEyRDtBQUMzRCw2REFBK0Q7QUFDL0QsdUVBQW9FO0FBRXBFO0lBQ0UsSUFBTSxlQUFlLEdBQW9CLElBQUksbUNBQWUsRUFBRSxDQUFDO0lBRS9ELFFBQVEsQ0FBQyxzQkFBc0IsRUFBRTtRQUMvQixlQUFlLENBQUMscUJBQXFCLENBQUM7WUFDcEMsS0FBSyxFQUFFLGlCQUFpQjtZQUN4QixPQUFPLEVBQUUsbUJBQW1CO1NBQzdCLENBQUMsQ0FBQztRQUVILGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQztZQUMvQixlQUFlLEVBQUUsYUFBYTtZQUM5QixXQUFXLEVBQUU7Z0JBQ1g7b0JBQ0UsRUFBRSxFQUFFLGdEQUFnRDtvQkFDcEQsZ0JBQWdCLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFO29CQUNoQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsWUFBWTtvQkFDN0MsaUJBQWlCLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFO2lCQUNsQzthQUNGO1NBQ0YsQ0FBQyxDQUFDO0lBRUwsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBdEJELG9CQXNCQyIsImZpbGUiOiJhcHAvc3RvcmUvbXVsdGktbGluZ3VhbC9tdWx0aS1saW5ndWFsLnN0YXRlLnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBNdWx0aUxpbmd1YWxTdGF0ZSBmcm9tICcuL211bHRpLWxpbmd1YWwuc3RhdGUnO1xuaW1wb3J0ICogYXMgTXVsdGlMaW5ndWFsQWN0aW9ucyBmcm9tICcuL211bHRpLWxpbmd1YWwuYWN0aW9ucyc7XG5pbXBvcnQgeyBTdGF0ZVNwZWNIZWxwZXIgfSBmcm9tICcuLi9zcGVjLWhlbHBlcnMvc3RhdGUuc3BlYy1oZWxwZXInO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcbiAgY29uc3Qgc3RhdGVTcGVjSGVscGVyOiBTdGF0ZVNwZWNIZWxwZXIgPSBuZXcgU3RhdGVTcGVjSGVscGVyKCk7XG5cbiAgZGVzY3JpYmUoJ011bHRpbGluZ3VhbCBSZWR1Y2VyJywgKCkgPT4ge1xuICAgIHN0YXRlU3BlY0hlbHBlci5zZXRSZWR1Y2VyVGVzdE1vZHVsZXMoe1xuICAgICAgc3RhdGU6IE11bHRpTGluZ3VhbFN0YXRlLFxuICAgICAgYWN0aW9uczogTXVsdGlMaW5ndWFsQWN0aW9uc1xuICAgIH0pO1xuXG4gICAgc3RhdGVTcGVjSGVscGVyLmdlbmVyYXRlVGVzdHNGb3Ioe1xuICAgICAgYWN0aW9uQ2xhc3NOYW1lOiAnU2V0TGFuZ3VhZ2UnLFxuICAgICAgY3VzdG9tVGVzdHM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGl0OiAncmV0dXJucyB0aGUgc3RhdGUgd2l0aCBhIGNvcnJlY3QgbGFuZ3VhZ2UgY29kZScsXG4gICAgICAgICAgYWN0aW9uUGFyYW1ldGVyczogeyBsYW5nOiAnZnInIH0sXG4gICAgICAgICAgcHJldmlvdXNTdGF0ZTogTXVsdGlMaW5ndWFsU3RhdGUuaW5pdGlhbFN0YXRlLFxuICAgICAgICAgIGV4cGVjdGVkTmV4dFN0YXRlOiB7IGxhbmc6ICdmcicgfVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSk7XG5cbiAgfSk7XG59XG4iXX0=
