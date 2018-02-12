"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mock_api_service_1 = require("./mock-api.service");
var api_service_1 = require("../services/api.service");
var api_interface_1 = require("../interfaces/api.interface");
function main() {
    describe('Mock Api Service', function () {
        var whateverApi = 10836;
        var whateverEndpoint = 'dont_care';
        var mockApi;
        beforeEach(function () { return mockApi = new mock_api_service_1.MockApiService(); });
        describe('mockApi.injector', function () {
            it('is an instance of ApiService', function () {
                expect(mockApi.injector instanceof api_service_1.ApiService).toBe(true);
            });
            it('includes get()', function () {
                mockApi.injector.get(whateverApi, whateverEndpoint);
                expect(mockApi.get).toHaveBeenCalled();
            });
            it('includes post()', function () {
                mockApi.injector.post(whateverApi, whateverEndpoint);
                expect(mockApi.post).toHaveBeenCalled();
            });
            it('includes put()', function () {
                mockApi.injector.put(whateverApi, whateverEndpoint);
                expect(mockApi.put).toHaveBeenCalled();
            });
            it('includes delete()', function () {
                mockApi.injector.delete(whateverApi, whateverEndpoint);
                expect(mockApi.delete).toHaveBeenCalled();
            });
        });
        describe('Response', function () {
            var actualResponse;
            describe('for get()', function () {
                it('has a default value', function () {
                    mockApi.injector.get(whateverApi, whateverEndpoint)
                        .subscribe(function (response) { return actualResponse = response; });
                    expect(actualResponse).toBe(mockApi.getResponse);
                });
                it('can be customized - as an object', function () {
                    mockApi.getResponse = { a: 'b' };
                    mockApi.injector.get(whateverApi, whateverEndpoint)
                        .subscribe(function (response) { return actualResponse = response; });
                    expect(actualResponse).toEqual({ a: 'b' });
                });
                it('can be customized - as an array - single index', function () {
                    mockApi.getResponse = [{ a: 'b' }];
                    mockApi.injector.get(whateverApi, whateverEndpoint)
                        .subscribe(function (response) { return actualResponse = response; });
                    expect(actualResponse).toEqual({ a: 'b' });
                });
                it('can be customized - as an array - multi index', function () {
                    mockApi.getResponse = [{ a: 'b' }, { c: 'd' }];
                    expect(mockApi.getResponse).toEqual([{ a: 'b' }, { c: 'd' }]);
                    mockApi.injector.get(whateverApi, whateverEndpoint)
                        .subscribe(function (response) { return actualResponse = response; });
                    expect(actualResponse).toEqual({ a: 'b' });
                    mockApi.injector.get(whateverApi, whateverEndpoint)
                        .subscribe(function (response) { return actualResponse = response; });
                    expect(actualResponse).toEqual({ c: 'd' });
                });
            });
            describe('for post()', function () {
                it('has a default value', function () {
                    mockApi.injector.post(whateverApi, whateverEndpoint)
                        .subscribe(function (response) { return actualResponse = response; });
                    expect(actualResponse).toBe(mockApi.postResponse);
                });
                it('can be customized', function () {
                    mockApi.postResponse = { a: 'b' };
                    mockApi.injector.post(whateverApi, whateverEndpoint)
                        .subscribe(function (response) { return actualResponse = response; });
                    expect(actualResponse).toEqual({ a: 'b' });
                });
                it('can be customized - as an array - single index', function () {
                    mockApi.postResponse = [{ a: 'b' }];
                    mockApi.injector.post(whateverApi, whateverEndpoint)
                        .subscribe(function (response) { return actualResponse = response; });
                    expect(actualResponse).toEqual({ a: 'b' });
                });
                it('can be customized - as an array - multi index', function () {
                    mockApi.postResponse = [{ a: 'b' }, { c: 'd' }];
                    expect(mockApi.postResponse).toEqual([{ a: 'b' }, { c: 'd' }]);
                    mockApi.injector.post(whateverApi, whateverEndpoint)
                        .subscribe(function (response) { return actualResponse = response; });
                    expect(actualResponse).toEqual({ a: 'b' });
                    mockApi.injector.post(whateverApi, whateverEndpoint)
                        .subscribe(function (response) { return actualResponse = response; });
                    expect(actualResponse).toEqual({ c: 'd' });
                });
            });
            describe('for put()', function () {
                it('has a default value', function () {
                    mockApi.injector.put(whateverApi, whateverEndpoint)
                        .subscribe(function (response) { return actualResponse = response; });
                    expect(actualResponse).toBe(mockApi.putResponse);
                });
                it('can be customized', function () {
                    mockApi.putResponse = { a: 'b' };
                    mockApi.injector.put(whateverApi, whateverEndpoint)
                        .subscribe(function (response) { return actualResponse = response; });
                    expect(actualResponse).toEqual({ a: 'b' });
                });
                it('can be customized - as an array - single index', function () {
                    mockApi.putResponse = [{ a: 'b' }];
                    mockApi.injector.put(whateverApi, whateverEndpoint)
                        .subscribe(function (response) { return actualResponse = response; });
                    expect(actualResponse).toEqual({ a: 'b' });
                });
                it('can be customized - as an array - multi index', function () {
                    mockApi.putResponse = [{ a: 'b' }, { c: 'd' }];
                    expect(mockApi.putResponse).toEqual([{ a: 'b' }, { c: 'd' }]);
                    mockApi.injector.put(whateverApi, whateverEndpoint)
                        .subscribe(function (response) { return actualResponse = response; });
                    expect(actualResponse).toEqual({ a: 'b' });
                    mockApi.injector.put(whateverApi, whateverEndpoint)
                        .subscribe(function (response) { return actualResponse = response; });
                    expect(actualResponse).toEqual({ c: 'd' });
                });
            });
            describe('for delete()', function () {
                it('has a default value', function () {
                    mockApi.injector.delete(whateverApi, whateverEndpoint)
                        .subscribe(function (response) { return actualResponse = response; });
                    expect(actualResponse).toBe(mockApi.deleteResponse);
                });
                it('can be customized', function () {
                    mockApi.deleteResponse = { a: 'b' };
                    mockApi.injector.delete(whateverApi, whateverEndpoint)
                        .subscribe(function (response) { return actualResponse = response; });
                    expect(actualResponse).toEqual({ a: 'b' });
                });
                it('can be customized - as an array - single index', function () {
                    mockApi.deleteResponse = [{ a: 'b' }];
                    mockApi.injector.delete(whateverApi, whateverEndpoint)
                        .subscribe(function (response) { return actualResponse = response; });
                    expect(actualResponse).toEqual({ a: 'b' });
                });
                it('can be customized - as an array - multi index', function () {
                    mockApi.deleteResponse = [{ a: 'b' }, { c: 'd' }];
                    expect(mockApi.deleteResponse).toEqual([{ a: 'b' }, { c: 'd' }]);
                    mockApi.injector.delete(whateverApi, whateverEndpoint)
                        .subscribe(function (response) { return actualResponse = response; });
                    expect(actualResponse).toEqual({ a: 'b' });
                    mockApi.injector.delete(whateverApi, whateverEndpoint)
                        .subscribe(function (response) { return actualResponse = response; });
                    expect(actualResponse).toEqual({ c: 'd' });
                });
            });
        });
        describe('Error', function () {
            var actualError;
            describe('for get()', function () {
                it('can be set', function () {
                    mockApi.getError = { a: 'b' };
                    mockApi.injector.get(whateverApi, whateverEndpoint)
                        .subscribe(function (response) { return fail(); }, function (error) { return actualError = error; });
                    expect(actualError).toEqual({ a: 'b' });
                });
            });
            describe('for post()', function () {
                it('can be set', function () {
                    mockApi.postError = { a: 'b' };
                    mockApi.injector.post(whateverApi, whateverEndpoint)
                        .subscribe(function (response) { return fail(); }, function (error) { return actualError = error; });
                    expect(actualError).toEqual({ a: 'b' });
                });
            });
            describe('for put()', function () {
                it('can be set', function () {
                    mockApi.putError = { a: 'b' };
                    mockApi.injector.put(whateverApi, whateverEndpoint)
                        .subscribe(function (response) { return fail(); }, function (error) { return actualError = error; });
                    expect(actualError).toEqual({ a: 'b' });
                });
            });
            describe('for delete()', function () {
                it('can be set', function () {
                    mockApi.deleteError = { a: 'b' };
                    mockApi.injector.delete(whateverApi, whateverEndpoint)
                        .subscribe(function (response) { return fail(); }, function (error) { return actualError = error; });
                    expect(actualError).toEqual({ a: 'b' });
                });
            });
        });
        describe('Custom matchers', function () {
            beforeEach(function () { return jasmine.addMatchers(mock_api_service_1.mockApiMatchers); });
            describe('toHaveBeenCalledWithApi()', function () {
                it('works with a positive test and a matching call', function () {
                    mockApi.injector.get(api_interface_1.Api.Identities, 'some/endpoint');
                    expect(mockApi.get).toHaveBeenCalledWithApi(api_interface_1.Api.Identities);
                });
                it('works with a negative test and no call at all', function () {
                    expect(mockApi.get).not.toHaveBeenCalledWithApi(api_interface_1.Api.Assets);
                });
                it('works with a negative test and a non-matching call', function () {
                    mockApi.injector.get(api_interface_1.Api.Identities, 'some/endpoint');
                    expect(mockApi.get).not.toHaveBeenCalledWithApi(api_interface_1.Api.Assets);
                });
            });
            describe('toHaveBeenCalledWithEndpoint()', function () {
                it('works with a positive test and a matching call', function () {
                    mockApi.injector.get(api_interface_1.Api.Identities, 'some/endpoint');
                    expect(mockApi.get).toHaveBeenCalledWithEndpoint('some/endpoint');
                });
                it('works with a negative test and no call at all', function () {
                    expect(mockApi.get).not.toHaveBeenCalledWithEndpoint('some/endpoint');
                });
                it('works with a negative test and a non-matching call', function () {
                    mockApi.injector.get(api_interface_1.Api.Identities, 'another/endpoint');
                    expect(mockApi.get).not.toHaveBeenCalledWithEndpoint('some/endpoint');
                });
            });
            describe('toHaveBeenCalledWithBody()', function () {
                describe('with a specific expectation', function () {
                    it('works with positive test and a matching call', function () {
                        mockApi.injector.get(api_interface_1.Api.Identities, 'some/endpoint', { body: { a: 'b' } });
                        expect(mockApi.get).toHaveBeenCalledWithBody({ a: 'b' });
                    });
                    it('works with a negative test and no call at all', function () {
                        expect(mockApi.get).not.toHaveBeenCalledWithBody({ a: 'b' });
                    });
                    it('works with a negative test and a call with no option', function () {
                        mockApi.injector.get(api_interface_1.Api.Identities, 'some/endpoint');
                        expect(mockApi.get).not.toHaveBeenCalledWithBody({ a: 'b' });
                    });
                    it('works with a negative test and a non-matching call', function () {
                        mockApi.injector.get(api_interface_1.Api.Identities, 'some/endpoint', { body: { c: 'd' } });
                        expect(mockApi.get).not.toHaveBeenCalledWithBody({ a: 'b' });
                    });
                });
                describe('without a specific expectation', function () {
                    it('works with a positive test and any matching option', function () {
                        mockApi.injector.get(api_interface_1.Api.Identities, 'some/endpoint', { body: { a: 'b' } });
                        expect(mockApi.get).toHaveBeenCalledWithBody();
                    });
                    it('works with a negative test and no call at all', function () {
                        expect(mockApi.get).not.toHaveBeenCalledWithBody();
                    });
                    it('works with a negative test and a call with no option', function () {
                        mockApi.injector.get(api_interface_1.Api.Identities, 'some/endpoint');
                        expect(mockApi.get).not.toHaveBeenCalledWithBody();
                    });
                });
            });
            describe('toHaveBeenCalledWithParameters()', function () {
                describe('with a specific expectation', function () {
                    it('works with positive test and a matching call', function () {
                        mockApi.injector.get(api_interface_1.Api.Identities, 'some/endpoint', { parameters: { a: 'b' } });
                        expect(mockApi.get).toHaveBeenCalledWithParameters({ a: 'b' });
                    });
                    it('works with a negative test and no call at all', function () {
                        expect(mockApi.get).not.toHaveBeenCalledWithParameters({ a: 'b' });
                    });
                    it('works with a negative test and a call with no option', function () {
                        mockApi.injector.get(api_interface_1.Api.Identities, 'some/endpoint');
                        expect(mockApi.get).not.toHaveBeenCalledWithParameters({ a: 'b' });
                    });
                    it('works with a negative test and a non-matching call', function () {
                        mockApi.injector.get(api_interface_1.Api.Identities, 'some/endpoint', { parameters: { c: 'd' } });
                        expect(mockApi.get).not.toHaveBeenCalledWithParameters({ a: 'b' });
                    });
                });
                describe('without a specific expectation', function () {
                    it('works with a positive test and any matching option', function () {
                        mockApi.injector.get(api_interface_1.Api.Identities, 'some/endpoint', { parameters: { a: 'b' } });
                        expect(mockApi.get).toHaveBeenCalledWithParameters();
                    });
                    it('works with a negative test and no call at all', function () {
                        expect(mockApi.get).not.toHaveBeenCalledWithParameters();
                    });
                    it('works with a negative test and a call with no option', function () {
                        mockApi.injector.get(api_interface_1.Api.Identities, 'some/endpoint');
                        expect(mockApi.get).not.toHaveBeenCalledWithParameters();
                    });
                });
            });
            describe('toHaveBeenCalledWithLoading()', function () {
                describe('with a specific expectation', function () {
                    it('works with positive test and a matching call', function () {
                        mockApi.injector.get(api_interface_1.Api.Identities, 'some/endpoint', { loadingIndicator: true });
                        expect(mockApi.get).toHaveBeenCalledWithLoading(true);
                    });
                    it('works with a negative test and no call at all', function () {
                        expect(mockApi.get).not.toHaveBeenCalledWithLoading(true);
                    });
                    it('works with a negative test and a call with no option', function () {
                        mockApi.injector.get(api_interface_1.Api.Identities, 'some/endpoint');
                        expect(mockApi.get).not.toHaveBeenCalledWithLoading(true);
                    });
                    it('works with a negative test and a non-matching call', function () {
                        mockApi.injector.get(api_interface_1.Api.Identities, 'some/endpoint', { loadingIndicator: true });
                        expect(mockApi.get).not.toHaveBeenCalledWithLoading(false);
                    });
                });
                describe('without a specific expectation', function () {
                    it('works with a positive test and any matching option', function () {
                        mockApi.injector.get(api_interface_1.Api.Identities, 'some/endpoint', { loadingIndicator: true });
                        expect(mockApi.get).toHaveBeenCalledWithLoading();
                    });
                    it('works with a negative test and no call at all', function () {
                        expect(mockApi.get).not.toHaveBeenCalledWithLoading();
                    });
                    it('works with a negative test and a call with no option', function () {
                        mockApi.injector.get(api_interface_1.Api.Identities, 'some/endpoint');
                        expect(mockApi.get).not.toHaveBeenCalledWithLoading();
                    });
                });
            });
            describe('toHaveBeenCalledWithOverridingToken()', function () {
                describe('with a specific expectation', function () {
                    it('works with positive test and a matching call', function () {
                        mockApi.injector.get(api_interface_1.Api.Identities, 'some/endpoint', { overridingToken: 'some token' });
                        expect(mockApi.get).toHaveBeenCalledWithOverridingToken('some token');
                    });
                    it('works with a negative test and no call at all', function () {
                        expect(mockApi.get).not.toHaveBeenCalledWithOverridingToken('some token');
                    });
                    it('works with a negative test and a call with no option', function () {
                        mockApi.injector.get(api_interface_1.Api.Identities, 'some/endpoint');
                        expect(mockApi.get).not.toHaveBeenCalledWithOverridingToken('some token');
                    });
                    it('works with a negative test and a non-matching call', function () {
                        mockApi.injector.get(api_interface_1.Api.Identities, 'some/endpoint', { overridingToken: 'some other token' });
                        expect(mockApi.get).not.toHaveBeenCalledWithOverridingToken('some token');
                    });
                });
                describe('without a specific expectation', function () {
                    it('works with a positive test and any matching option', function () {
                        mockApi.injector.get(api_interface_1.Api.Identities, 'some/endpoint', { overridingToken: 'some token' });
                        expect(mockApi.get).toHaveBeenCalledWithOverridingToken();
                    });
                    it('works with a negative test and no call at all', function () {
                        expect(mockApi.get).not.toHaveBeenCalledWithOverridingToken();
                    });
                    it('works with a negative test and a call with no option', function () {
                        mockApi.injector.get(api_interface_1.Api.Identities, 'some/endpoint');
                        expect(mockApi.get).not.toHaveBeenCalledWithOverridingToken();
                    });
                });
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9ja3MvbW9jay1hcGkuc2VydmljZS5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdURBQXFFO0FBQ3JFLHVEQUFxRDtBQUNyRCw2REFBK0Q7QUFFL0Q7SUFDRSxRQUFRLENBQUMsa0JBQWtCLEVBQUU7UUFDM0IsSUFBTSxXQUFXLEdBQVEsS0FBWSxDQUFDO1FBQ3RDLElBQU0sZ0JBQWdCLEdBQVcsV0FBVyxDQUFDO1FBRTdDLElBQUksT0FBdUIsQ0FBQztRQUU1QixVQUFVLENBQUMsY0FBTSxPQUFBLE9BQU8sR0FBRyxJQUFJLGlDQUFjLEVBQUUsRUFBOUIsQ0FBOEIsQ0FBQyxDQUFDO1FBRWpELFFBQVEsQ0FBQyxrQkFBa0IsRUFBRTtZQUMzQixFQUFFLENBQUMsOEJBQThCLEVBQUU7Z0JBQ2pDLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxZQUFZLHdCQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDNUQsQ0FBQyxDQUFDLENBQUM7WUFFSCxFQUFFLENBQUMsZ0JBQWdCLEVBQUU7Z0JBQ25CLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO2dCQUVwRCxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDekMsQ0FBQyxDQUFDLENBQUM7WUFFSCxFQUFFLENBQUMsaUJBQWlCLEVBQUU7Z0JBQ3BCLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO2dCQUVyRCxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDMUMsQ0FBQyxDQUFDLENBQUM7WUFFSCxFQUFFLENBQUMsZ0JBQWdCLEVBQUU7Z0JBQ25CLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxnQkFB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QUFHLENBQUMsbUNBQW1DLENBQUMsWUFBWSxDQUFDLENBQUM7b0JBQzVFLENBQUMsQ0FBQyxDQUFDO2dCQUNMLENBQUMsQ0FBQyxDQUFDO2dCQUVILFFBQVEsQ0FBQyxnQ0FBZ0MsRUFBRTtvQkFDekMsRUFBRSxDQUFDLG9EQUFvRCxFQUFFO3dCQUN2RCxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxtQkFBRyxDQUFDLFVBQVUsRUFBRSxlQUFlLEVBQUUsRUFBRSxlQUFlLEVBQUUsWUFBWSxFQUFFLENBQUMsQ0FBQzt3QkFFekYsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxtQ0FBbUMsRUFBRSxDQUFDO29CQUM1RCxDQUFDLENBQUMsQ0FBQztvQkFFSCxFQUFFLENBQUMsK0NBQStDLEVBQUU7d0JBQ2xELE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLG1DQUFtQyxFQUFFLENBQUM7b0JBQ2hFLENBQUMsQ0FBQyxDQUFDO29CQUVILEVBQUUsQ0FBQyxzREFBc0QsRUFBRTt3QkFDekQsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsbUJBQUcsQ0FBQyxVQUFVLEVBQUUsZUFBZSxDQUFDLENBQUM7d0JBRXRELE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLG1DQUFtQyxFQUFFLENBQUM7b0JBQ2hFLENBQUMsQ0FBQyxDQUFDO2dCQUNMLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQXhlRCxvQkF3ZUMiLCJmaWxlIjoiYXBwL3NoYXJlZC9tb2Nrcy9tb2NrLWFwaS5zZXJ2aWNlLnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNb2NrQXBpU2VydmljZSwgbW9ja0FwaU1hdGNoZXJzIH0gZnJvbSAnLi9tb2NrLWFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IEFwaVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBBcGksIEFwaVJlc3BvbnNlIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9hcGkuaW50ZXJmYWNlJztcblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIGRlc2NyaWJlKCdNb2NrIEFwaSBTZXJ2aWNlJywgKCkgPT4ge1xuICAgIGNvbnN0IHdoYXRldmVyQXBpOiBBcGkgPSAxMDgzNiBhcyBBcGk7XG4gICAgY29uc3Qgd2hhdGV2ZXJFbmRwb2ludDogc3RyaW5nID0gJ2RvbnRfY2FyZSc7XG5cbiAgICBsZXQgbW9ja0FwaTogTW9ja0FwaVNlcnZpY2U7XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IG1vY2tBcGkgPSBuZXcgTW9ja0FwaVNlcnZpY2UoKSk7XG5cbiAgICBkZXNjcmliZSgnbW9ja0FwaS5pbmplY3RvcicsICgpID0+IHtcbiAgICAgIGl0KCdpcyBhbiBpbnN0YW5jZSBvZiBBcGlTZXJ2aWNlJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QobW9ja0FwaS5pbmplY3RvciBpbnN0YW5jZW9mIEFwaVNlcnZpY2UpLnRvQmUodHJ1ZSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ2luY2x1ZGVzIGdldCgpJywgKCkgPT4ge1xuICAgICAgICBtb2NrQXBpLmluamVjdG9yLmdldCh3aGF0ZXZlckFwaSwgd2hhdGV2ZXJFbmRwb2ludCk7XG5cbiAgICAgICAgZXhwZWN0KG1vY2tBcGkuZ2V0KS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ2luY2x1ZGVzIHBvc3QoKScsICgpID0+IHtcbiAgICAgICAgbW9ja0FwaS5pbmplY3Rvci5wb3N0KHdoYXRldmVyQXBpLCB3aGF0ZXZlckVuZHBvaW50KTtcblxuICAgICAgICBleHBlY3QobW9ja0FwaS5wb3N0KS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ2luY2x1ZGVzIHB1dCgpJywgKCkgPT4ge1xuICAgICAgICBtb2NrQXBpLmluamVjdG9yLnB1dCh3aGF0ZXZlckFwaSwgd2hhdGV2ZXJFbmRwb2ludCk7XG5cbiAgICAgICAgZXhwZWN0KG1vY2tBcGkucHV0KS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ2luY2x1ZGVzIGRlbGV0ZSgpJywgKCkgPT4ge1xuICAgICAgICBtb2NrQXBpLmluamVjdG9yLmRlbGV0ZSh3aGF0ZXZlckFwaSwgd2hhdGV2ZXJFbmRwb2ludCk7XG5cbiAgICAgICAgZXhwZWN0KG1vY2tBcGkuZGVsZXRlKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdSZXNwb25zZScsICgpID0+IHtcbiAgICAgIGxldCBhY3R1YWxSZXNwb25zZTogQXBpUmVzcG9uc2U7XG5cbiAgICAgIGRlc2NyaWJlKCdmb3IgZ2V0KCknLCAoKSA9PiB7XG4gICAgICAgIGl0KCdoYXMgYSBkZWZhdWx0IHZhbHVlJywgKCkgPT4ge1xuICAgICAgICAgIG1vY2tBcGkuaW5qZWN0b3IuZ2V0KHdoYXRldmVyQXBpLCB3aGF0ZXZlckVuZHBvaW50KVxuICAgICAgICAgICAgLnN1YnNjcmliZShyZXNwb25zZSA9PiBhY3R1YWxSZXNwb25zZSA9IHJlc3BvbnNlKTtcblxuICAgICAgICAgIGV4cGVjdChhY3R1YWxSZXNwb25zZSkudG9CZShtb2NrQXBpLmdldFJlc3BvbnNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2NhbiBiZSBjdXN0b21pemVkIC0gYXMgYW4gb2JqZWN0JywgKCkgPT4ge1xuICAgICAgICAgIG1vY2tBcGkuZ2V0UmVzcG9uc2UgPSB7IGE6ICdiJyB9O1xuXG4gICAgICAgICAgbW9ja0FwaS5pbmplY3Rvci5nZXQod2hhdGV2ZXJBcGksIHdoYXRldmVyRW5kcG9pbnQpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHJlc3BvbnNlID0+IGFjdHVhbFJlc3BvbnNlID0gcmVzcG9uc2UpO1xuXG4gICAgICAgICAgZXhwZWN0KGFjdHVhbFJlc3BvbnNlKS50b0VxdWFsKHsgYTogJ2InIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnY2FuIGJlIGN1c3RvbWl6ZWQgLSBhcyBhbiBhcnJheSAtIHNpbmdsZSBpbmRleCcsICgpID0+IHtcbiAgICAgICAgICBtb2NrQXBpLmdldFJlc3BvbnNlID0gW3sgYTogJ2InIH1dO1xuXG4gICAgICAgICAgbW9ja0FwaS5pbmplY3Rvci5nZXQod2hhdGV2ZXJBcGksIHdoYXRldmVyRW5kcG9pbnQpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHJlc3BvbnNlID0+IGFjdHVhbFJlc3BvbnNlID0gcmVzcG9uc2UpO1xuXG4gICAgICAgICAgZXhwZWN0KGFjdHVhbFJlc3BvbnNlKS50b0VxdWFsKHsgYTogJ2InIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnY2FuIGJlIGN1c3RvbWl6ZWQgLSBhcyBhbiBhcnJheSAtIG11bHRpIGluZGV4JywgKCkgPT4ge1xuICAgICAgICAgIG1vY2tBcGkuZ2V0UmVzcG9uc2UgPSBbeyBhOiAnYicgfSwgeyBjOiAnZCcgfV07XG5cbiAgICAgICAgICAvLyBTb3J0IG9mIGEgZHVtbXkgYXNzZXJ0aW9uIHRvIGtlZXAgYnJhbmNoIGNvdmVyYWdlIGF0IDEwMCVcbiAgICAgICAgICBleHBlY3QobW9ja0FwaS5nZXRSZXNwb25zZSkudG9FcXVhbChbeyBhOiAnYicgfSwgeyBjOiAnZCcgfV0pO1xuXG4gICAgICAgICAgbW9ja0FwaS5pbmplY3Rvci5nZXQod2hhdGV2ZXJBcGksIHdoYXRldmVyRW5kcG9pbnQpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHJlc3BvbnNlID0+IGFjdHVhbFJlc3BvbnNlID0gcmVzcG9uc2UpO1xuXG4gICAgICAgICAgZXhwZWN0KGFjdHVhbFJlc3BvbnNlKS50b0VxdWFsKHsgYTogJ2InIH0pO1xuXG4gICAgICAgICAgbW9ja0FwaS5pbmplY3Rvci5nZXQod2hhdGV2ZXJBcGksIHdoYXRldmVyRW5kcG9pbnQpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHJlc3BvbnNlID0+IGFjdHVhbFJlc3BvbnNlID0gcmVzcG9uc2UpO1xuXG4gICAgICAgICAgZXhwZWN0KGFjdHVhbFJlc3BvbnNlKS50b0VxdWFsKHsgYzogJ2QnIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBkZXNjcmliZSgnZm9yIHBvc3QoKScsICgpID0+IHtcbiAgICAgICAgaXQoJ2hhcyBhIGRlZmF1bHQgdmFsdWUnLCAoKSA9PiB7XG4gICAgICAgICAgbW9ja0FwaS5pbmplY3Rvci5wb3N0KHdoYXRldmVyQXBpLCB3aGF0ZXZlckVuZHBvaW50KVxuICAgICAgICAgICAgLnN1YnNjcmliZShyZXNwb25zZSA9PiBhY3R1YWxSZXNwb25zZSA9IHJlc3BvbnNlKTtcblxuICAgICAgICAgIGV4cGVjdChhY3R1YWxSZXNwb25zZSkudG9CZShtb2NrQXBpLnBvc3RSZXNwb25zZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdjYW4gYmUgY3VzdG9taXplZCcsICgpID0+IHtcbiAgICAgICAgICBtb2NrQXBpLnBvc3RSZXNwb25zZSA9IHsgYTogJ2InIH07XG5cbiAgICAgICAgICBtb2NrQXBpLmluamVjdG9yLnBvc3Qod2hhdGV2ZXJBcGksIHdoYXRldmVyRW5kcG9pbnQpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHJlc3BvbnNlID0+IGFjdHVhbFJlc3BvbnNlID0gcmVzcG9uc2UpO1xuXG4gICAgICAgICAgZXhwZWN0KGFjdHVhbFJlc3BvbnNlKS50b0VxdWFsKHsgYTogJ2InIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnY2FuIGJlIGN1c3RvbWl6ZWQgLSBhcyBhbiBhcnJheSAtIHNpbmdsZSBpbmRleCcsICgpID0+IHtcbiAgICAgICAgICBtb2NrQXBpLnBvc3RSZXNwb25zZSA9IFt7IGE6ICdiJyB9XTtcblxuICAgICAgICAgIG1vY2tBcGkuaW5qZWN0b3IucG9zdCh3aGF0ZXZlckFwaSwgd2hhdGV2ZXJFbmRwb2ludClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUocmVzcG9uc2UgPT4gYWN0dWFsUmVzcG9uc2UgPSByZXNwb25zZSk7XG5cbiAgICAgICAgICBleHBlY3QoYWN0dWFsUmVzcG9uc2UpLnRvRXF1YWwoeyBhOiAnYicgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdjYW4gYmUgY3VzdG9taXplZCAtIGFzIGFuIGFycmF5IC0gbXVsdGkgaW5kZXgnLCAoKSA9PiB7XG4gICAgICAgICAgbW9ja0FwaS5wb3N0UmVzcG9uc2UgPSBbeyBhOiAnYicgfSwgeyBjOiAnZCcgfV07XG5cbiAgICAgICAgICAvLyBTb3J0IG9mIGEgZHVtbXkgYXNzZXJ0aW9uIHRvIGtlZXAgYnJhbmNoIGNvdmVyYWdlIGF0IDEwMCVcbiAgICAgICAgICBleHBlY3QobW9ja0FwaS5wb3N0UmVzcG9uc2UpLnRvRXF1YWwoW3sgYTogJ2InIH0sIHsgYzogJ2QnIH1dKTtcblxuICAgICAgICAgIG1vY2tBcGkuaW5qZWN0b3IucG9zdCh3aGF0ZXZlckFwaSwgd2hhdGV2ZXJFbmRwb2ludClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUocmVzcG9uc2UgPT4gYWN0dWFsUmVzcG9uc2UgPSByZXNwb25zZSk7XG5cbiAgICAgICAgICBleHBlY3QoYWN0dWFsUmVzcG9uc2UpLnRvRXF1YWwoeyBhOiAnYicgfSk7XG5cbiAgICAgICAgICBtb2NrQXBpLmluamVjdG9yLnBvc3Qod2hhdGV2ZXJBcGksIHdoYXRldmVyRW5kcG9pbnQpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHJlc3BvbnNlID0+IGFjdHVhbFJlc3BvbnNlID0gcmVzcG9uc2UpO1xuXG4gICAgICAgICAgZXhwZWN0KGFjdHVhbFJlc3BvbnNlKS50b0VxdWFsKHsgYzogJ2QnIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBkZXNjcmliZSgnZm9yIHB1dCgpJywgKCkgPT4ge1xuICAgICAgICBpdCgnaGFzIGEgZGVmYXVsdCB2YWx1ZScsICgpID0+IHtcbiAgICAgICAgICBtb2NrQXBpLmluamVjdG9yLnB1dCh3aGF0ZXZlckFwaSwgd2hhdGV2ZXJFbmRwb2ludClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUocmVzcG9uc2UgPT4gYWN0dWFsUmVzcG9uc2UgPSByZXNwb25zZSk7XG5cbiAgICAgICAgICBleHBlY3QoYWN0dWFsUmVzcG9uc2UpLnRvQmUobW9ja0FwaS5wdXRSZXNwb25zZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdjYW4gYmUgY3VzdG9taXplZCcsICgpID0+IHtcbiAgICAgICAgICBtb2NrQXBpLnB1dFJlc3BvbnNlID0geyBhOiAnYicgfTtcblxuICAgICAgICAgIG1vY2tBcGkuaW5qZWN0b3IucHV0KHdoYXRldmVyQXBpLCB3aGF0ZXZlckVuZHBvaW50KVxuICAgICAgICAgICAgLnN1YnNjcmliZShyZXNwb25zZSA9PiBhY3R1YWxSZXNwb25zZSA9IHJlc3BvbnNlKTtcblxuICAgICAgICAgIGV4cGVjdChhY3R1YWxSZXNwb25zZSkudG9FcXVhbCh7IGE6ICdiJyB9KTtcbiAgICAgICAgfSk7XG5cblxuICAgICAgICBpdCgnY2FuIGJlIGN1c3RvbWl6ZWQgLSBhcyBhbiBhcnJheSAtIHNpbmdsZSBpbmRleCcsICgpID0+IHtcbiAgICAgICAgICBtb2NrQXBpLnB1dFJlc3BvbnNlID0gW3sgYTogJ2InIH1dO1xuXG4gICAgICAgICAgbW9ja0FwaS5pbmplY3Rvci5wdXQod2hhdGV2ZXJBcGksIHdoYXRldmVyRW5kcG9pbnQpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHJlc3BvbnNlID0+IGFjdHVhbFJlc3BvbnNlID0gcmVzcG9uc2UpO1xuXG4gICAgICAgICAgZXhwZWN0KGFjdHVhbFJlc3BvbnNlKS50b0VxdWFsKHsgYTogJ2InIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnY2FuIGJlIGN1c3RvbWl6ZWQgLSBhcyBhbiBhcnJheSAtIG11bHRpIGluZGV4JywgKCkgPT4ge1xuICAgICAgICAgIG1vY2tBcGkucHV0UmVzcG9uc2UgPSBbeyBhOiAnYicgfSwgeyBjOiAnZCcgfV07XG5cbiAgICAgICAgICAvLyBTb3J0IG9mIGEgZHVtbXkgYXNzZXJ0aW9uIHRvIGtlZXAgYnJhbmNoIGNvdmVyYWdlIGF0IDEwMCVcbiAgICAgICAgICBleHBlY3QobW9ja0FwaS5wdXRSZXNwb25zZSkudG9FcXVhbChbeyBhOiAnYicgfSwgeyBjOiAnZCcgfV0pO1xuXG4gICAgICAgICAgbW9ja0FwaS5pbmplY3Rvci5wdXQod2hhdGV2ZXJBcGksIHdoYXRldmVyRW5kcG9pbnQpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHJlc3BvbnNlID0+IGFjdHVhbFJlc3BvbnNlID0gcmVzcG9uc2UpO1xuXG4gICAgICAgICAgZXhwZWN0KGFjdHVhbFJlc3BvbnNlKS50b0VxdWFsKHsgYTogJ2InIH0pO1xuXG4gICAgICAgICAgbW9ja0FwaS5pbmplY3Rvci5wdXQod2hhdGV2ZXJBcGksIHdoYXRldmVyRW5kcG9pbnQpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHJlc3BvbnNlID0+IGFjdHVhbFJlc3BvbnNlID0gcmVzcG9uc2UpO1xuXG4gICAgICAgICAgZXhwZWN0KGFjdHVhbFJlc3BvbnNlKS50b0VxdWFsKHsgYzogJ2QnIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBkZXNjcmliZSgnZm9yIGRlbGV0ZSgpJywgKCkgPT4ge1xuICAgICAgICBpdCgnaGFzIGEgZGVmYXVsdCB2YWx1ZScsICgpID0+IHtcbiAgICAgICAgICBtb2NrQXBpLmluamVjdG9yLmRlbGV0ZSh3aGF0ZXZlckFwaSwgd2hhdGV2ZXJFbmRwb2ludClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUocmVzcG9uc2UgPT4gYWN0dWFsUmVzcG9uc2UgPSByZXNwb25zZSk7XG5cbiAgICAgICAgICBleHBlY3QoYWN0dWFsUmVzcG9uc2UpLnRvQmUobW9ja0FwaS5kZWxldGVSZXNwb25zZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdjYW4gYmUgY3VzdG9taXplZCcsICgpID0+IHtcbiAgICAgICAgICBtb2NrQXBpLmRlbGV0ZVJlc3BvbnNlID0geyBhOiAnYicgfTtcblxuICAgICAgICAgIG1vY2tBcGkuaW5qZWN0b3IuZGVsZXRlKHdoYXRldmVyQXBpLCB3aGF0ZXZlckVuZHBvaW50KVxuICAgICAgICAgICAgLnN1YnNjcmliZShyZXNwb25zZSA9PiBhY3R1YWxSZXNwb25zZSA9IHJlc3BvbnNlKTtcblxuICAgICAgICAgIGV4cGVjdChhY3R1YWxSZXNwb25zZSkudG9FcXVhbCh7IGE6ICdiJyB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2NhbiBiZSBjdXN0b21pemVkIC0gYXMgYW4gYXJyYXkgLSBzaW5nbGUgaW5kZXgnLCAoKSA9PiB7XG4gICAgICAgICAgbW9ja0FwaS5kZWxldGVSZXNwb25zZSA9IFt7IGE6ICdiJyB9XTtcblxuICAgICAgICAgIG1vY2tBcGkuaW5qZWN0b3IuZGVsZXRlKHdoYXRldmVyQXBpLCB3aGF0ZXZlckVuZHBvaW50KVxuICAgICAgICAgICAgLnN1YnNjcmliZShyZXNwb25zZSA9PiBhY3R1YWxSZXNwb25zZSA9IHJlc3BvbnNlKTtcblxuICAgICAgICAgIGV4cGVjdChhY3R1YWxSZXNwb25zZSkudG9FcXVhbCh7IGE6ICdiJyB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2NhbiBiZSBjdXN0b21pemVkIC0gYXMgYW4gYXJyYXkgLSBtdWx0aSBpbmRleCcsICgpID0+IHtcbiAgICAgICAgICBtb2NrQXBpLmRlbGV0ZVJlc3BvbnNlID0gW3sgYTogJ2InIH0sIHsgYzogJ2QnIH1dO1xuXG4gICAgICAgICAgLy8gU29ydCBvZiBhIGR1bW15IGFzc2VydGlvbiB0byBrZWVwIGJyYW5jaCBjb3ZlcmFnZSBhdCAxMDAlXG4gICAgICAgICAgZXhwZWN0KG1vY2tBcGkuZGVsZXRlUmVzcG9uc2UpLnRvRXF1YWwoW3sgYTogJ2InIH0sIHsgYzogJ2QnIH1dKTtcblxuICAgICAgICAgIG1vY2tBcGkuaW5qZWN0b3IuZGVsZXRlKHdoYXRldmVyQXBpLCB3aGF0ZXZlckVuZHBvaW50KVxuICAgICAgICAgICAgLnN1YnNjcmliZShyZXNwb25zZSA9PiBhY3R1YWxSZXNwb25zZSA9IHJlc3BvbnNlKTtcblxuICAgICAgICAgIGV4cGVjdChhY3R1YWxSZXNwb25zZSkudG9FcXVhbCh7IGE6ICdiJyB9KTtcblxuICAgICAgICAgIG1vY2tBcGkuaW5qZWN0b3IuZGVsZXRlKHdoYXRldmVyQXBpLCB3aGF0ZXZlckVuZHBvaW50KVxuICAgICAgICAgICAgLnN1YnNjcmliZShyZXNwb25zZSA9PiBhY3R1YWxSZXNwb25zZSA9IHJlc3BvbnNlKTtcblxuICAgICAgICAgIGV4cGVjdChhY3R1YWxSZXNwb25zZSkudG9FcXVhbCh7IGM6ICdkJyB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdFcnJvcicsICgpID0+IHtcbiAgICAgIGxldCBhY3R1YWxFcnJvcjogYW55O1xuXG4gICAgICBkZXNjcmliZSgnZm9yIGdldCgpJywgKCkgPT4ge1xuICAgICAgICBpdCgnY2FuIGJlIHNldCcsICgpID0+IHtcbiAgICAgICAgICBtb2NrQXBpLmdldEVycm9yID0geyBhOiAnYicgfTtcblxuICAgICAgICAgIG1vY2tBcGkuaW5qZWN0b3IuZ2V0KHdoYXRldmVyQXBpLCB3aGF0ZXZlckVuZHBvaW50KVxuICAgICAgICAgICAgLnN1YnNjcmliZShyZXNwb25zZSA9PiBmYWlsKCksIGVycm9yID0+IGFjdHVhbEVycm9yID0gZXJyb3IpO1xuXG4gICAgICAgICAgZXhwZWN0KGFjdHVhbEVycm9yKS50b0VxdWFsKHsgYTogJ2InIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBkZXNjcmliZSgnZm9yIHBvc3QoKScsICgpID0+IHtcbiAgICAgICAgaXQoJ2NhbiBiZSBzZXQnLCAoKSA9PiB7XG4gICAgICAgICAgbW9ja0FwaS5wb3N0RXJyb3IgPSB7IGE6ICdiJyB9O1xuXG4gICAgICAgICAgbW9ja0FwaS5pbmplY3Rvci5wb3N0KHdoYXRldmVyQXBpLCB3aGF0ZXZlckVuZHBvaW50KVxuICAgICAgICAgICAgLnN1YnNjcmliZShyZXNwb25zZSA9PiBmYWlsKCksIGVycm9yID0+IGFjdHVhbEVycm9yID0gZXJyb3IpO1xuXG4gICAgICAgICAgZXhwZWN0KGFjdHVhbEVycm9yKS50b0VxdWFsKHsgYTogJ2InIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBkZXNjcmliZSgnZm9yIHB1dCgpJywgKCkgPT4ge1xuICAgICAgICBpdCgnY2FuIGJlIHNldCcsICgpID0+IHtcbiAgICAgICAgICBtb2NrQXBpLnB1dEVycm9yID0geyBhOiAnYicgfTtcblxuICAgICAgICAgIG1vY2tBcGkuaW5qZWN0b3IucHV0KHdoYXRldmVyQXBpLCB3aGF0ZXZlckVuZHBvaW50KVxuICAgICAgICAgICAgLnN1YnNjcmliZShyZXNwb25zZSA9PiBmYWlsKCksIGVycm9yID0+IGFjdHVhbEVycm9yID0gZXJyb3IpO1xuXG4gICAgICAgICAgZXhwZWN0KGFjdHVhbEVycm9yKS50b0VxdWFsKHsgYTogJ2InIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBkZXNjcmliZSgnZm9yIGRlbGV0ZSgpJywgKCkgPT4ge1xuICAgICAgICBpdCgnY2FuIGJlIHNldCcsICgpID0+IHtcbiAgICAgICAgICBtb2NrQXBpLmRlbGV0ZUVycm9yID0geyBhOiAnYicgfTtcblxuICAgICAgICAgIG1vY2tBcGkuaW5qZWN0b3IuZGVsZXRlKHdoYXRldmVyQXBpLCB3aGF0ZXZlckVuZHBvaW50KVxuICAgICAgICAgICAgLnN1YnNjcmliZShyZXNwb25zZSA9PiBmYWlsKCksIGVycm9yID0+IGFjdHVhbEVycm9yID0gZXJyb3IpO1xuXG4gICAgICAgICAgZXhwZWN0KGFjdHVhbEVycm9yKS50b0VxdWFsKHsgYTogJ2InIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ0N1c3RvbSBtYXRjaGVycycsICgpID0+IHtcbiAgICAgIC8vIEJ5IGRlZmluaXRpb24sIG1hdGNoZXJzIHdvcmsgd2l0aCBhbnkgc3B5LlxuICAgICAgLy8gU28gZm9yIHRoaXMgc2VjdGlvbiwgd2UnbGwganVzdCBjYWxsIG1vY2tBcGkuaW5zdGFuY2UuZ2V0KClcbiAgICAgIC8vIGFuZCBydW4gb3VyIGV4cGVjdGF0aW9ucyBvbiBtb2NrQXBpLmdldCgpLlxuXG4gICAgICBiZWZvcmVFYWNoKCgpID0+IGphc21pbmUuYWRkTWF0Y2hlcnMobW9ja0FwaU1hdGNoZXJzKSk7XG5cbiAgICAgIGRlc2NyaWJlKCd0b0hhdmVCZWVuQ2FsbGVkV2l0aEFwaSgpJywgKCkgPT4ge1xuICAgICAgICBpdCgnd29ya3Mgd2l0aCBhIHBvc2l0aXZlIHRlc3QgYW5kIGEgbWF0Y2hpbmcgY2FsbCcsICgpID0+IHtcbiAgICAgICAgICBtb2NrQXBpLmluamVjdG9yLmdldChBcGkuSWRlbnRpdGllcywgJ3NvbWUvZW5kcG9pbnQnKTtcblxuICAgICAgICAgIGV4cGVjdChtb2NrQXBpLmdldCkudG9IYXZlQmVlbkNhbGxlZFdpdGhBcGkoQXBpLklkZW50aXRpZXMpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnd29ya3Mgd2l0aCBhIG5lZ2F0aXZlIHRlc3QgYW5kIG5vIGNhbGwgYXQgYWxsJywgKCkgPT4ge1xuICAgICAgICAgIGV4cGVjdChtb2NrQXBpLmdldCkubm90LnRvSGF2ZUJlZW5DYWxsZWRXaXRoQXBpKEFwaS5Bc3NldHMpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnd29ya3Mgd2l0aCBhIG5lZ2F0aXZlIHRlc3QgYW5kIGEgbm9uLW1hdGNoaW5nIGNhbGwnLCAoKSA9PiB7XG4gICAgICAgICAgbW9ja0FwaS5pbmplY3Rvci5nZXQoQXBpLklkZW50aXRpZXMsICdzb21lL2VuZHBvaW50Jyk7XG5cbiAgICAgICAgICBleHBlY3QobW9ja0FwaS5nZXQpLm5vdC50b0hhdmVCZWVuQ2FsbGVkV2l0aEFwaShBcGkuQXNzZXRzKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgZGVzY3JpYmUoJ3RvSGF2ZUJlZW5DYWxsZWRXaXRoRW5kcG9pbnQoKScsICgpID0+IHtcbiAgICAgICAgaXQoJ3dvcmtzIHdpdGggYSBwb3NpdGl2ZSB0ZXN0IGFuZCBhIG1hdGNoaW5nIGNhbGwnLCAoKSA9PiB7XG4gICAgICAgICAgbW9ja0FwaS5pbmplY3Rvci5nZXQoQXBpLklkZW50aXRpZXMsICdzb21lL2VuZHBvaW50Jyk7XG5cbiAgICAgICAgICBleHBlY3QobW9ja0FwaS5nZXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoRW5kcG9pbnQoJ3NvbWUvZW5kcG9pbnQnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3dvcmtzIHdpdGggYSBuZWdhdGl2ZSB0ZXN0IGFuZCBubyBjYWxsIGF0IGFsbCcsICgpID0+IHtcbiAgICAgICAgICBleHBlY3QobW9ja0FwaS5nZXQpLm5vdC50b0hhdmVCZWVuQ2FsbGVkV2l0aEVuZHBvaW50KCdzb21lL2VuZHBvaW50Jyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCd3b3JrcyB3aXRoIGEgbmVnYXRpdmUgdGVzdCBhbmQgYSBub24tbWF0Y2hpbmcgY2FsbCcsICgpID0+IHtcbiAgICAgICAgICBtb2NrQXBpLmluamVjdG9yLmdldChBcGkuSWRlbnRpdGllcywgJ2Fub3RoZXIvZW5kcG9pbnQnKTtcblxuICAgICAgICAgIGV4cGVjdChtb2NrQXBpLmdldCkubm90LnRvSGF2ZUJlZW5DYWxsZWRXaXRoRW5kcG9pbnQoJ3NvbWUvZW5kcG9pbnQnKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgZGVzY3JpYmUoJ3RvSGF2ZUJlZW5DYWxsZWRXaXRoQm9keSgpJywgKCkgPT4ge1xuICAgICAgICBkZXNjcmliZSgnd2l0aCBhIHNwZWNpZmljIGV4cGVjdGF0aW9uJywgKCkgPT4ge1xuICAgICAgICAgIGl0KCd3b3JrcyB3aXRoIHBvc2l0aXZlIHRlc3QgYW5kIGEgbWF0Y2hpbmcgY2FsbCcsICgpID0+IHtcbiAgICAgICAgICAgIG1vY2tBcGkuaW5qZWN0b3IuZ2V0KEFwaS5JZGVudGl0aWVzLCAnc29tZS9lbmRwb2ludCcsIHsgYm9keTogeyBhOiAnYicgfSB9KTtcblxuICAgICAgICAgICAgZXhwZWN0KG1vY2tBcGkuZ2V0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aEJvZHkoeyBhOiAnYicgfSk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBpdCgnd29ya3Mgd2l0aCBhIG5lZ2F0aXZlIHRlc3QgYW5kIG5vIGNhbGwgYXQgYWxsJywgKCkgPT4ge1xuICAgICAgICAgICAgZXhwZWN0KG1vY2tBcGkuZ2V0KS5ub3QudG9IYXZlQmVlbkNhbGxlZFdpdGhCb2R5KHsgYTogJ2InIH0pO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgaXQoJ3dvcmtzIHdpdGggYSBuZWdhdGl2ZSB0ZXN0IGFuZCBhIGNhbGwgd2l0aCBubyBvcHRpb24nLCAoKSA9PiB7XG4gICAgICAgICAgICBtb2NrQXBpLmluamVjdG9yLmdldChBcGkuSWRlbnRpdGllcywgJ3NvbWUvZW5kcG9pbnQnKTtcblxuICAgICAgICAgICAgZXhwZWN0KG1vY2tBcGkuZ2V0KS5ub3QudG9IYXZlQmVlbkNhbGxlZFdpdGhCb2R5KHsgYTogJ2InIH0pO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgaXQoJ3dvcmtzIHdpdGggYSBuZWdhdGl2ZSB0ZXN0IGFuZCBhIG5vbi1tYXRjaGluZyBjYWxsJywgKCkgPT4ge1xuICAgICAgICAgICAgbW9ja0FwaS5pbmplY3Rvci5nZXQoQXBpLklkZW50aXRpZXMsICdzb21lL2VuZHBvaW50JywgeyBib2R5OiB7IGM6ICdkJyB9IH0pO1xuXG4gICAgICAgICAgICBleHBlY3QobW9ja0FwaS5nZXQpLm5vdC50b0hhdmVCZWVuQ2FsbGVkV2l0aEJvZHkoeyBhOiAnYicgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRlc2NyaWJlKCd3aXRob3V0IGEgc3BlY2lmaWMgZXhwZWN0YXRpb24nLCAoKSA9PiB7XG4gICAgICAgICAgaXQoJ3dvcmtzIHdpdGggYSBwb3NpdGl2ZSB0ZXN0IGFuZCBhbnkgbWF0Y2hpbmcgb3B0aW9uJywgKCkgPT4ge1xuICAgICAgICAgICAgbW9ja0FwaS5pbmplY3Rvci5nZXQoQXBpLklkZW50aXRpZXMsICdzb21lL2VuZHBvaW50JywgeyBib2R5OiB7IGE6ICdiJyB9IH0pO1xuXG4gICAgICAgICAgICBleHBlY3QobW9ja0FwaS5nZXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoQm9keSgpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgaXQoJ3dvcmtzIHdpdGggYSBuZWdhdGl2ZSB0ZXN0IGFuZCBubyBjYWxsIGF0IGFsbCcsICgpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdChtb2NrQXBpLmdldCkubm90LnRvSGF2ZUJlZW5DYWxsZWRXaXRoQm9keSgpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgaXQoJ3dvcmtzIHdpdGggYSBuZWdhdGl2ZSB0ZXN0IGFuZCBhIGNhbGwgd2l0aCBubyBvcHRpb24nLCAoKSA9PiB7XG4gICAgICAgICAgICBtb2NrQXBpLmluamVjdG9yLmdldChBcGkuSWRlbnRpdGllcywgJ3NvbWUvZW5kcG9pbnQnKTtcblxuICAgICAgICAgICAgZXhwZWN0KG1vY2tBcGkuZ2V0KS5ub3QudG9IYXZlQmVlbkNhbGxlZFdpdGhCb2R5KCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGRlc2NyaWJlKCd0b0hhdmVCZWVuQ2FsbGVkV2l0aFBhcmFtZXRlcnMoKScsICgpID0+IHtcbiAgICAgICAgZGVzY3JpYmUoJ3dpdGggYSBzcGVjaWZpYyBleHBlY3RhdGlvbicsICgpID0+IHtcbiAgICAgICAgICBpdCgnd29ya3Mgd2l0aCBwb3NpdGl2ZSB0ZXN0IGFuZCBhIG1hdGNoaW5nIGNhbGwnLCAoKSA9PiB7XG4gICAgICAgICAgICBtb2NrQXBpLmluamVjdG9yLmdldChBcGkuSWRlbnRpdGllcywgJ3NvbWUvZW5kcG9pbnQnLCB7IHBhcmFtZXRlcnM6IHsgYTogJ2InIH0gfSk7XG5cbiAgICAgICAgICAgIGV4cGVjdChtb2NrQXBpLmdldCkudG9IYXZlQmVlbkNhbGxlZFdpdGhQYXJhbWV0ZXJzKHsgYTogJ2InIH0pO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgaXQoJ3dvcmtzIHdpdGggYSBuZWdhdGl2ZSB0ZXN0IGFuZCBubyBjYWxsIGF0IGFsbCcsICgpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdChtb2NrQXBpLmdldCkubm90LnRvSGF2ZUJlZW5DYWxsZWRXaXRoUGFyYW1ldGVycyh7IGE6ICdiJyB9KTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGl0KCd3b3JrcyB3aXRoIGEgbmVnYXRpdmUgdGVzdCBhbmQgYSBjYWxsIHdpdGggbm8gb3B0aW9uJywgKCkgPT4ge1xuICAgICAgICAgICAgbW9ja0FwaS5pbmplY3Rvci5nZXQoQXBpLklkZW50aXRpZXMsICdzb21lL2VuZHBvaW50Jyk7XG5cbiAgICAgICAgICAgIGV4cGVjdChtb2NrQXBpLmdldCkubm90LnRvSGF2ZUJlZW5DYWxsZWRXaXRoUGFyYW1ldGVycyh7IGE6ICdiJyB9KTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGl0KCd3b3JrcyB3aXRoIGEgbmVnYXRpdmUgdGVzdCBhbmQgYSBub24tbWF0Y2hpbmcgY2FsbCcsICgpID0+IHtcbiAgICAgICAgICAgIG1vY2tBcGkuaW5qZWN0b3IuZ2V0KEFwaS5JZGVudGl0aWVzLCAnc29tZS9lbmRwb2ludCcsIHsgcGFyYW1ldGVyczogeyBjOiAnZCcgfSB9KTtcblxuICAgICAgICAgICAgZXhwZWN0KG1vY2tBcGkuZ2V0KS5ub3QudG9IYXZlQmVlbkNhbGxlZFdpdGhQYXJhbWV0ZXJzKHsgYTogJ2InIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBkZXNjcmliZSgnd2l0aG91dCBhIHNwZWNpZmljIGV4cGVjdGF0aW9uJywgKCkgPT4ge1xuICAgICAgICAgIGl0KCd3b3JrcyB3aXRoIGEgcG9zaXRpdmUgdGVzdCBhbmQgYW55IG1hdGNoaW5nIG9wdGlvbicsICgpID0+IHtcbiAgICAgICAgICAgIG1vY2tBcGkuaW5qZWN0b3IuZ2V0KEFwaS5JZGVudGl0aWVzLCAnc29tZS9lbmRwb2ludCcsIHsgcGFyYW1ldGVyczogeyBhOiAnYicgfSB9KTtcblxuICAgICAgICAgICAgZXhwZWN0KG1vY2tBcGkuZ2V0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aFBhcmFtZXRlcnMoKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGl0KCd3b3JrcyB3aXRoIGEgbmVnYXRpdmUgdGVzdCBhbmQgbm8gY2FsbCBhdCBhbGwnLCAoKSA9PiB7XG4gICAgICAgICAgICBleHBlY3QobW9ja0FwaS5nZXQpLm5vdC50b0hhdmVCZWVuQ2FsbGVkV2l0aFBhcmFtZXRlcnMoKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGl0KCd3b3JrcyB3aXRoIGEgbmVnYXRpdmUgdGVzdCBhbmQgYSBjYWxsIHdpdGggbm8gb3B0aW9uJywgKCkgPT4ge1xuICAgICAgICAgICAgbW9ja0FwaS5pbmplY3Rvci5nZXQoQXBpLklkZW50aXRpZXMsICdzb21lL2VuZHBvaW50Jyk7XG5cbiAgICAgICAgICAgIGV4cGVjdChtb2NrQXBpLmdldCkubm90LnRvSGF2ZUJlZW5DYWxsZWRXaXRoUGFyYW1ldGVycygpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBkZXNjcmliZSgndG9IYXZlQmVlbkNhbGxlZFdpdGhMb2FkaW5nKCknLCAoKSA9PiB7XG4gICAgICAgIGRlc2NyaWJlKCd3aXRoIGEgc3BlY2lmaWMgZXhwZWN0YXRpb24nLCAoKSA9PiB7XG4gICAgICAgICAgaXQoJ3dvcmtzIHdpdGggcG9zaXRpdmUgdGVzdCBhbmQgYSBtYXRjaGluZyBjYWxsJywgKCkgPT4ge1xuICAgICAgICAgICAgbW9ja0FwaS5pbmplY3Rvci5nZXQoQXBpLklkZW50aXRpZXMsICdzb21lL2VuZHBvaW50JywgeyBsb2FkaW5nSW5kaWNhdG9yOiB0cnVlIH0pO1xuXG4gICAgICAgICAgICBleHBlY3QobW9ja0FwaS5nZXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoTG9hZGluZyh0cnVlKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGl0KCd3b3JrcyB3aXRoIGEgbmVnYXRpdmUgdGVzdCBhbmQgbm8gY2FsbCBhdCBhbGwnLCAoKSA9PiB7XG4gICAgICAgICAgICBleHBlY3QobW9ja0FwaS5nZXQpLm5vdC50b0hhdmVCZWVuQ2FsbGVkV2l0aExvYWRpbmcodHJ1ZSk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBpdCgnd29ya3Mgd2l0aCBhIG5lZ2F0aXZlIHRlc3QgYW5kIGEgY2FsbCB3aXRoIG5vIG9wdGlvbicsICgpID0+IHtcbiAgICAgICAgICAgIG1vY2tBcGkuaW5qZWN0b3IuZ2V0KEFwaS5JZGVudGl0aWVzLCAnc29tZS9lbmRwb2ludCcpO1xuXG4gICAgICAgICAgICBleHBlY3QobW9ja0FwaS5nZXQpLm5vdC50b0hhdmVCZWVuQ2FsbGVkV2l0aExvYWRpbmcodHJ1ZSk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBpdCgnd29ya3Mgd2l0aCBhIG5lZ2F0aXZlIHRlc3QgYW5kIGEgbm9uLW1hdGNoaW5nIGNhbGwnLCAoKSA9PiB7XG4gICAgICAgICAgICBtb2NrQXBpLmluamVjdG9yLmdldChBcGkuSWRlbnRpdGllcywgJ3NvbWUvZW5kcG9pbnQnLCB7IGxvYWRpbmdJbmRpY2F0b3I6IHRydWUgfSk7XG5cbiAgICAgICAgICAgIGV4cGVjdChtb2NrQXBpLmdldCkubm90LnRvSGF2ZUJlZW5DYWxsZWRXaXRoTG9hZGluZyhmYWxzZSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRlc2NyaWJlKCd3aXRob3V0IGEgc3BlY2lmaWMgZXhwZWN0YXRpb24nLCAoKSA9PiB7XG4gICAgICAgICAgaXQoJ3dvcmtzIHdpdGggYSBwb3NpdGl2ZSB0ZXN0IGFuZCBhbnkgbWF0Y2hpbmcgb3B0aW9uJywgKCkgPT4ge1xuICAgICAgICAgICAgbW9ja0FwaS5pbmplY3Rvci5nZXQoQXBpLklkZW50aXRpZXMsICdzb21lL2VuZHBvaW50JywgeyBsb2FkaW5nSW5kaWNhdG9yOiB0cnVlIH0pO1xuXG4gICAgICAgICAgICBleHBlY3QobW9ja0FwaS5nZXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoTG9hZGluZygpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgaXQoJ3dvcmtzIHdpdGggYSBuZWdhdGl2ZSB0ZXN0IGFuZCBubyBjYWxsIGF0IGFsbCcsICgpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdChtb2NrQXBpLmdldCkubm90LnRvSGF2ZUJlZW5DYWxsZWRXaXRoTG9hZGluZygpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgaXQoJ3dvcmtzIHdpdGggYSBuZWdhdGl2ZSB0ZXN0IGFuZCBhIGNhbGwgd2l0aCBubyBvcHRpb24nLCAoKSA9PiB7XG4gICAgICAgICAgICBtb2NrQXBpLmluamVjdG9yLmdldChBcGkuSWRlbnRpdGllcywgJ3NvbWUvZW5kcG9pbnQnKTtcblxuICAgICAgICAgICAgZXhwZWN0KG1vY2tBcGkuZ2V0KS5ub3QudG9IYXZlQmVlbkNhbGxlZFdpdGhMb2FkaW5nKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGRlc2NyaWJlKCd0b0hhdmVCZWVuQ2FsbGVkV2l0aE92ZXJyaWRpbmdUb2tlbigpJywgKCkgPT4ge1xuICAgICAgICBkZXNjcmliZSgnd2l0aCBhIHNwZWNpZmljIGV4cGVjdGF0aW9uJywgKCkgPT4ge1xuICAgICAgICAgIGl0KCd3b3JrcyB3aXRoIHBvc2l0aXZlIHRlc3QgYW5kIGEgbWF0Y2hpbmcgY2FsbCcsICgpID0+IHtcbiAgICAgICAgICAgIG1vY2tBcGkuaW5qZWN0b3IuZ2V0KEFwaS5JZGVudGl0aWVzLCAnc29tZS9lbmRwb2ludCcsIHsgb3ZlcnJpZGluZ1Rva2VuOiAnc29tZSB0b2tlbicgfSk7XG5cbiAgICAgICAgICAgIGV4cGVjdChtb2NrQXBpLmdldCkudG9IYXZlQmVlbkNhbGxlZFdpdGhPdmVycmlkaW5nVG9rZW4oJ3NvbWUgdG9rZW4nKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGl0KCd3b3JrcyB3aXRoIGEgbmVnYXRpdmUgdGVzdCBhbmQgbm8gY2FsbCBhdCBhbGwnLCAoKSA9PiB7XG4gICAgICAgICAgICBleHBlY3QobW9ja0FwaS5nZXQpLm5vdC50b0hhdmVCZWVuQ2FsbGVkV2l0aE92ZXJyaWRpbmdUb2tlbignc29tZSB0b2tlbicpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgaXQoJ3dvcmtzIHdpdGggYSBuZWdhdGl2ZSB0ZXN0IGFuZCBhIGNhbGwgd2l0aCBubyBvcHRpb24nLCAoKSA9PiB7XG4gICAgICAgICAgICBtb2NrQXBpLmluamVjdG9yLmdldChBcGkuSWRlbnRpdGllcywgJ3NvbWUvZW5kcG9pbnQnKTtcblxuICAgICAgICAgICAgZXhwZWN0KG1vY2tBcGkuZ2V0KS5ub3QudG9IYXZlQmVlbkNhbGxlZFdpdGhPdmVycmlkaW5nVG9rZW4oJ3NvbWUgdG9rZW4nKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGl0KCd3b3JrcyB3aXRoIGEgbmVnYXRpdmUgdGVzdCBhbmQgYSBub24tbWF0Y2hpbmcgY2FsbCcsICgpID0+IHtcbiAgICAgICAgICAgIG1vY2tBcGkuaW5qZWN0b3IuZ2V0KEFwaS5JZGVudGl0aWVzLCAnc29tZS9lbmRwb2ludCcsIHsgb3ZlcnJpZGluZ1Rva2VuOiAnc29tZSBvdGhlciB0b2tlbicgfSk7XG5cbiAgICAgICAgICAgIGV4cGVjdChtb2NrQXBpLmdldCkubm90LnRvSGF2ZUJlZW5DYWxsZWRXaXRoT3ZlcnJpZGluZ1Rva2VuKCdzb21lIHRva2VuJyk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRlc2NyaWJlKCd3aXRob3V0IGEgc3BlY2lmaWMgZXhwZWN0YXRpb24nLCAoKSA9PiB7XG4gICAgICAgICAgaXQoJ3dvcmtzIHdpdGggYSBwb3NpdGl2ZSB0ZXN0IGFuZCBhbnkgbWF0Y2hpbmcgb3B0aW9uJywgKCkgPT4ge1xuICAgICAgICAgICAgbW9ja0FwaS5pbmplY3Rvci5nZXQoQXBpLklkZW50aXRpZXMsICdzb21lL2VuZHBvaW50JywgeyBvdmVycmlkaW5nVG9rZW46ICdzb21lIHRva2VuJyB9KTtcblxuICAgICAgICAgICAgZXhwZWN0KG1vY2tBcGkuZ2V0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aE92ZXJyaWRpbmdUb2tlbigpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgaXQoJ3dvcmtzIHdpdGggYSBuZWdhdGl2ZSB0ZXN0IGFuZCBubyBjYWxsIGF0IGFsbCcsICgpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdChtb2NrQXBpLmdldCkubm90LnRvSGF2ZUJlZW5DYWxsZWRXaXRoT3ZlcnJpZGluZ1Rva2VuKCk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBpdCgnd29ya3Mgd2l0aCBhIG5lZ2F0aXZlIHRlc3QgYW5kIGEgY2FsbCB3aXRoIG5vIG9wdGlvbicsICgpID0+IHtcbiAgICAgICAgICAgIG1vY2tBcGkuaW5qZWN0b3IuZ2V0KEFwaS5JZGVudGl0aWVzLCAnc29tZS9lbmRwb2ludCcpO1xuXG4gICAgICAgICAgICBleHBlY3QobW9ja0FwaS5nZXQpLm5vdC50b0hhdmVCZWVuQ2FsbGVkV2l0aE92ZXJyaWRpbmdUb2tlbigpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn1cbiJdfQ==
