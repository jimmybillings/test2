"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sharing_service_1 = require("./sharing.service");
var mock_api_service_1 = require("../spec-helpers/mock-api.service");
var api_interface_1 = require("../../shared/interfaces/api.interface");
var index_1 = require("../../shared/modules/wazee-frame-formatter/index");
function main() {
    describe('Sharing Service', function () {
        var serviceUnderTest, mockApiService;
        beforeEach(function () {
            jasmine.clock().install();
            jasmine.clock().mockDate(new Date(2017, 10, 12, 13, 14, 15, 16));
            jasmine.addMatchers(mock_api_service_1.mockApiMatchers);
            mockApiService = new mock_api_service_1.MockApiService();
            serviceUnderTest = new sharing_service_1.SharingService(mockApiService.injector, { state: { emailAddress: 'test@gmail.com' } });
        });
        afterEach(function () {
            jasmine.clock().uninstall();
        });
        describe('createAssetShareLink()', function () {
            it('Should call the api correctly to create a share link', function () {
                serviceUnderTest.createAssetShareLink(1234, {
                    in: undefined,
                    out: undefined
                }).subscribe();
                expect(mockApiService.post).toHaveBeenCalledWithApi(api_interface_1.Api.Identities);
                expect(mockApiService.post).toHaveBeenCalledWithEndpoint('accessInfo');
                expect(mockApiService.post).toHaveBeenCalledWithBody({
                    type: 'asset',
                    accessInfo: '1234',
                    accessStartDate: '2017-11-12T13:14:15-07:00',
                    accessEndDate: '2017-11-22T13:14:15-07:00',
                    properties: null
                });
            });
        });
        describe('emailAssetShareLink()', function () {
            it('Should call the api correctly to create a share link', function () {
                serviceUnderTest.emailAssetShareLink(1234, {
                    in: undefined,
                    out: undefined
                }, {
                    recipientEmails: 'james.billings@wazeedigital.com',
                    comment: 'Some Comment',
                    copyMe: true
                }, {
                    some: 'properties'
                }).subscribe();
                expect(mockApiService.post).toHaveBeenCalledWithApi(api_interface_1.Api.Identities);
                expect(mockApiService.post).toHaveBeenCalledWithEndpoint('accessInfo');
                expect(mockApiService.post).toHaveBeenCalledWithBody({
                    type: 'asset',
                    accessInfo: '1234',
                    accessStartDate: '2017-11-12T13:14:15-07:00',
                    accessEndDate: '2017-11-22T13:14:15-07:00',
                    properties: { some: 'properties' },
                    recipientEmails: [
                        'james.billings@wazeedigital.com', 'test@gmail.com'
                    ],
                    comment: 'Some Comment'
                });
            });
            it('handles specified markers', function () {
                serviceUnderTest.emailAssetShareLink(1234, {
                    in: new index_1.Frame(30).setFromSeconds(1),
                    out: new index_1.Frame(30).setFromSeconds(2)
                }, {
                    recipientEmails: 'james.billings@wazeedigital.com',
                    comment: 'Some Comment',
                    copyMe: true
                }, {
                    some: 'properties'
                }).subscribe();
                expect(mockApiService.post).toHaveBeenCalledWithBody({
                    type: 'asset',
                    accessInfo: '1234',
                    accessStartDate: '2017-11-12T13:14:15-07:00',
                    accessEndDate: '2017-11-22T13:14:15-07:00',
                    properties: {
                        timeStart: 1000,
                        timeEnd: 2000,
                        some: 'properties'
                    },
                    recipientEmails: [
                        'james.billings@wazeedigital.com', 'test@gmail.com'
                    ],
                    comment: 'Some Comment'
                });
            });
            it('handles undefined markers', function () {
                serviceUnderTest.emailAssetShareLink(1234, undefined, {
                    recipientEmails: 'james.billings@wazeedigital.com',
                    comment: 'Some Comment',
                    copyMe: true
                }, {
                    some: 'properties'
                }).subscribe();
                expect(mockApiService.post).toHaveBeenCalledWithBody({
                    type: 'asset',
                    accessInfo: '1234',
                    accessStartDate: '2017-11-12T13:14:15-07:00',
                    accessEndDate: '2017-11-22T13:14:15-07:00',
                    properties: { some: 'properties' },
                    recipientEmails: [
                        'james.billings@wazeedigital.com', 'test@gmail.com'
                    ],
                    comment: 'Some Comment'
                });
            });
            it('handles null markers', function () {
                serviceUnderTest.emailAssetShareLink(1234, null, {
                    recipientEmails: 'james.billings@wazeedigital.com',
                    comment: 'Some Comment',
                    copyMe: true
                }, {
                    some: 'properties'
                }).subscribe();
                expect(mockApiService.post).toHaveBeenCalledWithBody({
                    type: 'asset',
                    accessInfo: '1234',
                    accessStartDate: '2017-11-12T13:14:15-07:00',
                    accessEndDate: '2017-11-22T13:14:15-07:00',
                    properties: { some: 'properties' },
                    recipientEmails: [
                        'james.billings@wazeedigital.com', 'test@gmail.com'
                    ],
                    comment: 'Some Comment'
                });
            });
            it('handles copyMe = false', function () {
                serviceUnderTest.emailAssetShareLink(1234, null, {
                    recipientEmails: 'james.billings@wazeedigital.com',
                    comment: 'Some Comment',
                    copyMe: false
                }, {
                    some: 'properties'
                }).subscribe();
                expect(mockApiService.post).toHaveBeenCalledWithBody({
                    type: 'asset',
                    accessInfo: '1234',
                    accessStartDate: '2017-11-12T13:14:15-07:00',
                    accessEndDate: '2017-11-22T13:14:15-07:00',
                    properties: { some: 'properties' },
                    recipientEmails: [
                        'james.billings@wazeedigital.com'
                    ],
                    comment: 'Some Comment'
                });
            });
        });
        describe('emailCollectionShareLink()', function () {
            it('Should call the api correctly to share a collection', function () {
                serviceUnderTest.emailCollectionShareLink(1, {
                    recipientEmails: 'james.billings@wazeedigital.com',
                    accessLevel: 'Viewer',
                    comment: 'Some Comment'
                }).subscribe();
                expect(mockApiService.post).toHaveBeenCalledWithApi(api_interface_1.Api.Identities);
                expect(mockApiService.post).toHaveBeenCalledWithEndpoint('collection/share');
                expect(mockApiService.post).toHaveBeenCalledWithBody({
                    userEmail: [
                        'james.billings@wazeedigital.com'
                    ],
                    collections: [
                        1
                    ],
                    accessLevel: 'Viewer',
                    comment: 'Some Comment'
                });
                expect(mockApiService.post).toHaveBeenCalledWithLoading('onBeforeRequest');
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9zaGFyaW5nL3NoYXJpbmcuc2VydmljZS5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscURBQW1EO0FBQ25ELHFFQUFtRjtBQUNuRix1RUFBNEQ7QUFDNUQsMEVBQXlFO0FBRXpFO0lBQ0UsUUFBUSxDQUFDLGlCQUFpQixFQUFFO1FBQzFCLElBQUksZ0JBQWdDLEVBQUUsY0FBOEIsQ0FBQztRQUVyRSxVQUFVLENBQUM7WUFDVCxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7WUFTMUIsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBRWpFLE9BQU8sQ0FBQyxXQUFXLENBQUMsa0NBQWUsQ0FBQyxDQUFDO1lBQ3JDLGNBQWMsR0FBRyxJQUFJLGlDQUFjLEVBQUUsQ0FBQztZQUN0QyxnQkFBZ0IsR0FBRyxJQUFJLGdDQUFjLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLFlBQVksRUFBRSxnQkFBZ0IsRUFBRSxFQUFTLENBQUMsQ0FBQztRQUN2SCxDQUFDLENBQUMsQ0FBQztRQUVILFNBQVMsQ0FBQztZQUNSLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUM5QixDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyx3QkFBd0IsRUFBRTtZQUNqQyxFQUFFLENBQUMsc0RBQXNELEVBQUU7Z0JBQ3pELGdCQUFnQixDQUFDLG9CQUFvQixDQUFDLElBQUksRUFBRTtvQkFDMUMsRUFBRSxFQUFFLFNBQVM7b0JBQ2IsR0FBRyxFQUFFLFNBQVM7aUJBQ2YsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO2dCQUVmLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFB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LENBQUMsQ0FBQztnQkFDN0UsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyx3QkFBd0IsQ0FBQztvQkFDbkQsU0FBUyxFQUFFO3dCQUNULGlDQUFpQztxQkFDbEM7b0JBQ0QsV0FBVyxFQUFFO3dCQUNYLENBQUM7cUJBQ0Y7b0JBQ0QsV0FBVyxFQUFFLFFBQVE7b0JBQ3JCLE9BQU8sRUFBRSxjQUFjO2lCQUN4QixDQUFDLENBQUM7Z0JBQ0gsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQywyQkFBMkIsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQzdFLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUF4TkQsb0JBd05DIiwiZmlsZSI6ImFwcC9zdG9yZS9zaGFyaW5nL3NoYXJpbmcuc2VydmljZS5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2hhcmluZ1NlcnZpY2UgfSBmcm9tICcuL3NoYXJpbmcuc2VydmljZSc7XG5pbXBvcnQgeyBNb2NrQXBpU2VydmljZSwgbW9ja0FwaU1hdGNoZXJzIH0gZnJvbSAnLi4vc3BlYy1oZWxwZXJzL21vY2stYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXBpIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvYXBpLmludGVyZmFjZSc7XG5pbXBvcnQgeyBGcmFtZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9tb2R1bGVzL3dhemVlLWZyYW1lLWZvcm1hdHRlci9pbmRleCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBkZXNjcmliZSgnU2hhcmluZyBTZXJ2aWNlJywgKCkgPT4ge1xuICAgIGxldCBzZXJ2aWNlVW5kZXJUZXN0OiBTaGFyaW5nU2VydmljZSwgbW9ja0FwaVNlcnZpY2U6IE1vY2tBcGlTZXJ2aWNlO1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICBqYXNtaW5lLmNsb2NrKCkuaW5zdGFsbCgpO1xuXG4gICAgICAvLyBtb2NrIFwibm93XCIgPT09IE5vdmVtYmVyIDEyLCAyMDE3IGF0IDEzOjE0OjE1IGFuZCAxNiBtc1xuICAgICAgLy9cbiAgICAgIC8vIFNvbWVvbmUgbmVlZHMgdG8gc21hY2sgd2hvbWV2ZXIgY3JlYXRlZCBKUydzIERhdGUoKSBhbmQgZGVjaWRlZCB0aGF0IG1vbnRocyBhcmUgemVyby1iYXNlZCwgYnV0IGFsbCBvdGhlciB2YWx1ZXMgYXJlXG4gICAgICAvLyBvbmUtYmFzZWQuICBUaGF0J3Mgd2h5IE5vdmVtYmVyIGlzIHNwZWNpZmllZCBhcyAxMC5cbiAgICAgIC8vXG4gICAgICAvLyBOT1RFIGFsc28gdGhhdCB0aGVyZSBpcyBubyBkaXJlY3Qgd2F5IHRvIHNwZWNpZnkgYSBtb2NrIHRpbWUgem9uZSBpbiBKYXNtaW5lJ3MgY2xvY2soKS4gIFRodXMsIHRoaXMgc3BlYyB3aWxsIGZhaWxcbiAgICAgIC8vIGlmIHJ1biBvdXRzaWRlIHRoZSBNb3VudGFpbiB0aW1lIHpvbmUuXG4gICAgICBqYXNtaW5lLmNsb2NrKCkubW9ja0RhdGUobmV3IERhdGUoMjAxNywgMTAsIDEyLCAxMywgMTQsIDE1LCAxNikpO1xuXG4gICAgICBqYXNtaW5lLmFkZE1hdGNoZXJzKG1vY2tBcGlNYXRjaGVycyk7XG4gICAgICBtb2NrQXBpU2VydmljZSA9IG5ldyBNb2NrQXBpU2VydmljZSgpO1xuICAgICAgc2VydmljZVVuZGVyVGVzdCA9IG5ldyBTaGFyaW5nU2VydmljZShtb2NrQXBpU2VydmljZS5pbmplY3RvciwgeyBzdGF0ZTogeyBlbWFpbEFkZHJlc3M6ICd0ZXN0QGdtYWlsLmNvbScgfSB9IGFzIGFueSk7XG4gICAgfSk7XG5cbiAgICBhZnRlckVhY2goKCkgPT4ge1xuICAgICAgamFzbWluZS5jbG9jaygpLnVuaW5zdGFsbCgpO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2NyZWF0ZUFzc2V0U2hhcmVMaW5rKCknLCAoKSA9PiB7XG4gICAgICBpdCgnU2hvdWxkIGNhbGwgdGhlIGFwaSBjb3JyZWN0bHkgdG8gY3JlYXRlIGEgc2hhcmUgbGluaycsICgpID0+IHtcbiAgICAgICAgc2VydmljZVVuZGVyVGVzdC5jcmVhdGVBc3NldFNoYXJlTGluaygxMjM0LCB7XG4gICAgICAgICAgaW46IHVuZGVmaW5lZCxcbiAgICAgICAgICBvdXQ6IHVuZGVmaW5lZFxuICAgICAgICB9KS5zdWJzY3JpYmUoKTtcblxuICAgICAgICBleHBlY3QobW9ja0FwaVNlcnZpY2UucG9zdCkudG9IYXZlQmVlbkNhbGxlZFdpdGhBcGkoQXBpLklkZW50aXRpZXMpO1xuICAgICAgICBleHBlY3QobW9ja0FwaVNlcnZpY2UucG9zdCkudG9IYXZlQmVlbkNhbGxlZFdpdGhFbmRwb2ludCgnYWNjZXNzSW5mbycpO1xuICAgICAgICBleHBlY3QobW9ja0FwaVNlcnZpY2UucG9zdCkudG9IYXZlQmVlbkNhbGxlZFdpdGhCb2R5KHtcbiAgICAgICAgICB0eXBlOiAnYXNzZXQnLFxuICAgICAgICAgIGFjY2Vzc0luZm86ICcxMjM0JyxcbiAgICAgICAgICBhY2Nlc3NTdGFydERhdGU6ICcyMDE3LTExLTEyVDEzOjE0OjE1LTA3OjAwJyxcbiAgICAgICAgICBhY2Nlc3NFbmREYXRlOiAnMjAxNy0xMS0yMlQxMzoxNDoxNS0wNzowMCcsXG4gICAgICAgICAgcHJvcGVydGllczogbnVsbFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2VtYWlsQXNzZXRTaGFyZUxpbmsoKScsICgpID0+IHtcbiAgICAgIGl0KCdTaG91bGQgY2FsbCB0aGUgYXBpIGNvcnJlY3RseSB0byBjcmVhdGUgYSBzaGFyZSBsaW5rJywgKCkgPT4ge1xuICAgICAgICBzZXJ2aWNlVW5kZXJUZXN0LmVtYWlsQXNzZXRTaGFyZUxpbmsoXG4gICAgICAgICAgMTIzNCxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpbjogdW5kZWZpbmVkLFxuICAgICAgICAgICAgb3V0OiB1bmRlZmluZWRcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHJlY2lwaWVudEVtYWlsczogJ2phbWVzLmJpbGxpbmdzQHdhemVlZGlnaXRhbC5jb20nLFxuICAgICAgICAgICAgY29tbWVudDogJ1NvbWUgQ29tbWVudCcsXG4gICAgICAgICAgICBjb3B5TWU6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNvbWU6ICdwcm9wZXJ0aWVzJ1xuICAgICAgICAgIH1cbiAgICAgICAgKS5zdWJzY3JpYmUoKTtcblxuICAgICAgICBleHBlY3QobW9ja0FwaVNlcnZpY2UucG9zdCkudG9IYXZlQmVlbkNhbGxlZFdpdGhBcGkoQXBpLklkZW50aXRpZXMpO1xuICAgICAgICBleHBlY3QobW9ja0FwaVNlcnZpY2UucG9zdCkudG9IYXZlQmVlbkNhbGxlZFdpdGhFbmRwb2ludCgnYWNjZXNzSW5mbycpO1xuICAgICAgICBleHBlY3QobW9ja0FwaVNlcnZpY2UucG9zdCkudG9IYXZlQmVlbkNhbGxlZFdpdGhCb2R5KHtcbiAgICAgICAgICB0eXBlOiAnYXNzZXQnLFxuICAgICAgICAgIGFjY2Vzc0luZm86ICcxMjM0JyxcbiAgICAgICAgICBhY2Nlc3NTdGFydERhdGU6ICcyMDE3LTExLTEyVDEzOjE0OjE1LTA3OjAwJyxcbiAgICAgICAgICBhY2Nlc3NFbmREYXRlOiAnMjAxNy0xMS0yMlQxMzoxNDoxNS0wNzowMCcsXG4gICAgICAgICAgcHJvcGVydGllczogeyBzb21lOiAncHJvcGVydGllcycgfSxcbiAgICAgICAgICByZWNpcGllbnRFbWFpbHM6IFtcbiAgICAgICAgICAgICdqYW1lcy5iaWxsaW5nc0B3YXplZWRpZ2l0YWwuY29tJywgJ3Rlc3RAZ21haWwuY29tJ1xuICAgICAgICAgIF0sXG4gICAgICAgICAgY29tbWVudDogJ1NvbWUgQ29tbWVudCdcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ2hhbmRsZXMgc3BlY2lmaWVkIG1hcmtlcnMnLCAoKSA9PiB7XG4gICAgICAgIHNlcnZpY2VVbmRlclRlc3QuZW1haWxBc3NldFNoYXJlTGluayhcbiAgICAgICAgICAxMjM0LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGluOiBuZXcgRnJhbWUoMzApLnNldEZyb21TZWNvbmRzKDEpLFxuICAgICAgICAgICAgb3V0OiBuZXcgRnJhbWUoMzApLnNldEZyb21TZWNvbmRzKDIpXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICByZWNpcGllbnRFbWFpbHM6ICdqYW1lcy5iaWxsaW5nc0B3YXplZWRpZ2l0YWwuY29tJyxcbiAgICAgICAgICAgIGNvbW1lbnQ6ICdTb21lIENvbW1lbnQnLFxuICAgICAgICAgICAgY29weU1lOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzb21lOiAncHJvcGVydGllcydcbiAgICAgICAgICB9XG4gICAgICAgICkuc3Vic2NyaWJlKCk7XG5cbiAgICAgICAgZXhwZWN0KG1vY2tBcGlTZXJ2aWNlLnBvc3QpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoQm9keSh7XG4gICAgICAgICAgdHlwZTogJ2Fzc2V0JyxcbiAgICAgICAgICBhY2Nlc3NJbmZvOiAnMTIzNCcsXG4gICAgICAgICAgYWNjZXNzU3RhcnREYXRlOiAnMjAxNy0xMS0xMlQxMzoxNDoxNS0wNzowMCcsXG4gICAgICAgICAgYWNjZXNzRW5kRGF0ZTogJzIwMTctMTEtMjJUMTM6MTQ6MTUtMDc6MDAnLFxuICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgIHRpbWVTdGFydDogMTAwMCxcbiAgICAgICAgICAgIHRpbWVFbmQ6IDIwMDAsXG4gICAgICAgICAgICBzb21lOiAncHJvcGVydGllcydcbiAgICAgICAgICB9LFxuICAgICAgICAgIHJlY2lwaWVudEVtYWlsczogW1xuICAgICAgICAgICAgJ2phbWVzLmJpbGxpbmdzQHdhemVlZGlnaXRhbC5jb20nLCAndGVzdEBnbWFpbC5jb20nXG4gICAgICAgICAgXSxcbiAgICAgICAgICBjb21tZW50OiAnU29tZSBDb21tZW50J1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnaGFuZGxlcyB1bmRlZmluZWQgbWFya2VycycsICgpID0+IHtcbiAgICAgICAgc2VydmljZVVuZGVyVGVzdC5lbWFpbEFzc2V0U2hhcmVMaW5rKFxuICAgICAgICAgIDEyMzQsXG4gICAgICAgICAgdW5kZWZpbmVkLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHJlY2lwaWVudEVtYWlsczogJ2phbWVzLmJpbGxpbmdzQHdhemVlZGlnaXRhbC5jb20nLFxuICAgICAgICAgICAgY29tbWVudDogJ1NvbWUgQ29tbWVudCcsXG4gICAgICAgICAgICBjb3B5TWU6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNvbWU6ICdwcm9wZXJ0aWVzJ1xuICAgICAgICAgIH1cbiAgICAgICAgKS5zdWJzY3JpYmUoKTtcblxuICAgICAgICBleHBlY3QobW9ja0FwaVNlcnZpY2UucG9zdCkudG9IYXZlQmVlbkNhbGxlZFdpdGhCb2R5KHtcbiAgICAgICAgICB0eXBlOiAnYXNzZXQnLFxuICAgICAgICAgIGFjY2Vzc0luZm86ICcxMjM0JyxcbiAgICAgICAgICBhY2Nlc3NTdGFydERhdGU6ICcyMDE3LTExLTEyVDEzOjE0OjE1LTA3OjAwJyxcbiAgICAgICAgICBhY2Nlc3NFbmREYXRlOiAnMjAxNy0xMS0yMlQxMzoxNDoxNS0wNzowMCcsXG4gICAgICAgICAgcHJvcGVydGllczogeyBzb21lOiAncHJvcGVydGllcycgfSxcbiAgICAgICAgICByZWNpcGllbnRFbWFpbHM6IFtcbiAgICAgICAgICAgICdqYW1lcy5iaWxsaW5nc0B3YXplZWRpZ2l0YWwuY29tJywgJ3Rlc3RAZ21haWwuY29tJ1xuICAgICAgICAgIF0sXG4gICAgICAgICAgY29tbWVudDogJ1NvbWUgQ29tbWVudCdcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ2hhbmRsZXMgbnVsbCBtYXJrZXJzJywgKCkgPT4ge1xuICAgICAgICBzZXJ2aWNlVW5kZXJUZXN0LmVtYWlsQXNzZXRTaGFyZUxpbmsoXG4gICAgICAgICAgMTIzNCxcbiAgICAgICAgICBudWxsLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHJlY2lwaWVudEVtYWlsczogJ2phbWVzLmJpbGxpbmdzQHdhemVlZGlnaXRhbC5jb20nLFxuICAgICAgICAgICAgY29tbWVudDogJ1NvbWUgQ29tbWVudCcsXG4gICAgICAgICAgICBjb3B5TWU6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNvbWU6ICdwcm9wZXJ0aWVzJ1xuICAgICAgICAgIH1cbiAgICAgICAgKS5zdWJzY3JpYmUoKTtcblxuICAgICAgICBleHBlY3QobW9ja0FwaVNlcnZpY2UucG9zdCkudG9IYXZlQmVlbkNhbGxlZFdpdGhCb2R5KHtcbiAgICAgICAgICB0eXBlOiAnYXNzZXQnLFxuICAgICAgICAgIGFjY2Vzc0luZm86ICcxMjM0JyxcbiAgICAgICAgICBhY2Nlc3NTdGFydERhdGU6ICcyMDE3LTExLTEyVDEzOjE0OjE1LTA3OjAwJyxcbiAgICAgICAgICBhY2Nlc3NFbmREYXRlOiAnMjAxNy0xMS0yMlQxMzoxNDoxNS0wNzowMCcsXG4gICAgICAgICAgcHJvcGVydGllczogeyBzb21lOiAncHJvcGVydGllcycgfSxcbiAgICAgICAgICByZWNpcGllbnRFbWFpbHM6IFtcbiAgICAgICAgICAgICdqYW1lcy5iaWxsaW5nc0B3YXplZWRpZ2l0YWwuY29tJywgJ3Rlc3RAZ21haWwuY29tJ1xuICAgICAgICAgIF0sXG4gICAgICAgICAgY29tbWVudDogJ1NvbWUgQ29tbWVudCdcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ2hhbmRsZXMgY29weU1lID0gZmFsc2UnLCAoKSA9PiB7XG4gICAgICAgIHNlcnZpY2VVbmRlclRlc3QuZW1haWxBc3NldFNoYXJlTGluayhcbiAgICAgICAgICAxMjM0LFxuICAgICAgICAgIG51bGwsXG4gICAgICAgICAge1xuICAgICAgICAgICAgcmVjaXBpZW50RW1haWxzOiAnamFtZXMuYmlsbGluZ3NAd2F6ZWVkaWdpdGFsLmNvbScsXG4gICAgICAgICAgICBjb21tZW50OiAnU29tZSBDb21tZW50JyxcbiAgICAgICAgICAgIGNvcHlNZTogZmFsc2VcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNvbWU6ICdwcm9wZXJ0aWVzJ1xuICAgICAgICAgIH1cbiAgICAgICAgKS5zdWJzY3JpYmUoKTtcblxuICAgICAgICBleHBlY3QobW9ja0FwaVNlcnZpY2UucG9zdCkudG9IYXZlQmVlbkNhbGxlZFdpdGhCb2R5KHtcbiAgICAgICAgICB0eXBlOiAnYXNzZXQnLFxuICAgICAgICAgIGFjY2Vzc0luZm86ICcxMjM0JyxcbiAgICAgICAgICBhY2Nlc3NTdGFydERhdGU6ICcyMDE3LTExLTEyVDEzOjE0OjE1LTA3OjAwJyxcbiAgICAgICAgICBhY2Nlc3NFbmREYXRlOiAnMjAxNy0xMS0yMlQxMzoxNDoxNS0wNzowMCcsXG4gICAgICAgICAgcHJvcGVydGllczogeyBzb21lOiAncHJvcGVydGllcycgfSxcbiAgICAgICAgICByZWNpcGllbnRFbWFpbHM6IFtcbiAgICAgICAgICAgICdqYW1lcy5iaWxsaW5nc0B3YXplZWRpZ2l0YWwuY29tJ1xuICAgICAgICAgIF0sXG4gICAgICAgICAgY29tbWVudDogJ1NvbWUgQ29tbWVudCdcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdlbWFpbENvbGxlY3Rpb25TaGFyZUxpbmsoKScsICgpID0+IHtcbiAgICAgIGl0KCdTaG91bGQgY2FsbCB0aGUgYXBpIGNvcnJlY3RseSB0byBzaGFyZSBhIGNvbGxlY3Rpb24nLCAoKSA9PiB7XG4gICAgICAgIHNlcnZpY2VVbmRlclRlc3QuZW1haWxDb2xsZWN0aW9uU2hhcmVMaW5rKDEsIHtcbiAgICAgICAgICByZWNpcGllbnRFbWFpbHM6ICdqYW1lcy5iaWxsaW5nc0B3YXplZWRpZ2l0YWwuY29tJyxcbiAgICAgICAgICBhY2Nlc3NMZXZlbDogJ1ZpZXdlcicsXG4gICAgICAgICAgY29tbWVudDogJ1NvbWUgQ29tbWVudCdcbiAgICAgICAgfSkuc3Vic2NyaWJlKCk7XG4gICAgICAgIGV4cGVjdChtb2NrQXBpU2VydmljZS5wb3N0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aEFwaShBcGkuSWRlbnRpdGllcyk7XG4gICAgICAgIGV4cGVjdChtb2NrQXBpU2VydmljZS5wb3N0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aEVuZHBvaW50KCdjb2xsZWN0aW9uL3NoYXJlJyk7XG4gICAgICAgIGV4cGVjdChtb2NrQXBpU2VydmljZS5wb3N0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aEJvZHkoe1xuICAgICAgICAgIHVzZXJFbWFpbDogW1xuICAgICAgICAgICAgJ2phbWVzLmJpbGxpbmdzQHdhemVlZGlnaXRhbC5jb20nXG4gICAgICAgICAgXSxcbiAgICAgICAgICBjb2xsZWN0aW9uczogW1xuICAgICAgICAgICAgMVxuICAgICAgICAgIF0sXG4gICAgICAgICAgYWNjZXNzTGV2ZWw6ICdWaWV3ZXInLFxuICAgICAgICAgIGNvbW1lbnQ6ICdTb21lIENvbW1lbnQnXG4gICAgICAgIH0pO1xuICAgICAgICBleHBlY3QobW9ja0FwaVNlcnZpY2UucG9zdCkudG9IYXZlQmVlbkNhbGxlZFdpdGhMb2FkaW5nKCdvbkJlZm9yZVJlcXVlc3QnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn1cbiJdfQ==
