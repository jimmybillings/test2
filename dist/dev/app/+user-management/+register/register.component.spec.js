"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
var register_component_1 = require("./register.component");
var http_1 = require("@angular/http");
var mock_app_store_1 = require("../../store/spec-helpers/mock-app.store");
var user = {
    emailAddress: 'jamesbonline@yahoo.com', firstName: 'james',
    lastName: 'billigns', password: '3978f324e14ac256b2994b754586e05f'
};
function main() {
    describe('Register Component', function () {
        var mockUserService;
        var mockDialogService;
        var mockRef;
        var componentUnderTest;
        var mockStore;
        beforeEach(function () {
            mockRef = { markForCheck: function () { } };
            mockUserService = {
                create: jasmine.createSpy('create').and.returnValue(Observable_1.Observable.of(user)),
                downloadActiveTosDocument: jasmine.createSpy('downloadActiveTosDocument').and.returnValue(Observable_1.Observable.of('some-terms'))
            };
            mockDialogService = {
                openComponentInDialog: jasmine.createSpy('openComponentInDialog').and.returnValue(Observable_1.Observable.of({}))
            };
            mockStore = new mock_app_store_1.MockAppStore();
            mockStore.createStateSection('uiConfig', { components: { register: { config: { someConfig: 'test' } } } });
            componentUnderTest = new register_component_1.RegisterComponent(mockUserService, mockStore, mockDialogService, mockRef);
        });
        describe('ngOnInit()', function () {
            it('Grabs the component config and assigns to an instance variable', function () {
                componentUnderTest.ngOnInit();
                expect(componentUnderTest.config).toEqual({ someConfig: 'test' });
                expect(mockUserService.downloadActiveTosDocument).toHaveBeenCalled();
            });
        });
        describe('onSubmit()', function () {
            it('Calls the server with user body to create user', function () {
                componentUnderTest.onSubmit(user);
                expect(componentUnderTest.userService.create).toHaveBeenCalledWith(user);
            });
            it('Sets a component variable flag to show a success dialog to user', function () {
                componentUnderTest.onSubmit(user);
                expect(componentUnderTest.successfullySubmitted).toEqual(true);
            });
            it('Assigns success user response to instance variable for screen display', function () {
                componentUnderTest.onSubmit(user);
                expect(componentUnderTest.newUser).toEqual(user);
            });
            it('Sets a errors variable to display errors if the server doesnt pass', function () {
                var errorResponse = new http_1.Response(new http_1.ResponseOptions({ body: JSON.stringify({ email: 'Not Unique' }) }));
                mockUserService = { create: jasmine.createSpy('create').and.returnValue(Observable_1.Observable.throw(errorResponse)) };
                componentUnderTest = new register_component_1.RegisterComponent(mockUserService, mockStore, mockDialogService, mockRef);
                componentUnderTest.onSubmit(user);
                expect(componentUnderTest.serverErrors).toEqual({ email: 'Not Unique' });
            });
            it('Does not set errors variable if the status was 451', function () {
                var errorResponse = new http_1.Response(new http_1.ResponseOptions({ status: 451, body: JSON.stringify({ email: 'Not Unique' }) }));
                mockUserService = { create: jasmine.createSpy('create').and.returnValue(Observable_1.Observable.throw(errorResponse)) };
                componentUnderTest = new register_component_1.RegisterComponent(mockUserService, mockStore, mockDialogService, mockRef);
                componentUnderTest.onSubmit(user);
                expect(componentUnderTest.serverErrors).toEqual(null);
            });
        });
        describe('openTermsDialog()', function () {
            it('opens the component in the dialog service', function () {
                componentUnderTest.ngOnInit();
                componentUnderTest.openTermsDialog();
                expect(mockDialogService.openComponentInDialog).toHaveBeenCalledWith({
                    componentType: jasmine.any(Function),
                    inputOptions: {
                        terms: 'some-terms',
                        btnLabel: 'REGISTER.CLOSE_TOS_DIALOG',
                        header: 'REGISTER.TOS_TITLE'
                    }
                });
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rdXNlci1tYW5hZ2VtZW50LytyZWdpc3Rlci9yZWdpc3Rlci5jb21wb25lbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDhDQUE2QztBQUM3QywyREFBeUQ7QUFDekQsc0NBQTBEO0FBQzFELDBFQUF1RTtBQUV2RSxJQUFNLElBQUksR0FBUTtJQUNoQixZQUFZLEVBQUUsd0JBQXdCLEVBQUUsU0FBUyxFQUFFLE9BQU87SUFDMUQsUUFBUSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsa0NBQWtDO0NBQ25FLENBQUM7QUFFRjtJQUNFLFFBQVEsQ0FBQyxvQkFBb0IsRUFBRTtRQUM3QixJQUFJLGVBQW9CLENBQUM7UUFDekIsSUFBSSxpQkFBc0IsQ0FBQztRQUMzQixJQUFJLE9BQVksQ0FBQztRQUNqQixJQUFJLGtCQUFxQyxDQUFDO1FBQzFDLElBQUksU0FBdUIsQ0FBQztRQUU1QixVQUFVLENBQUM7WUFDVCxPQUFPLEdBQUcsRUFBRSxZQUFZLEVBQUUsY0FBYyxDQUFDLEVBQUUsQ0FBQztZQUU1QyxlQUFlLEdBQUc7Z0JBQ2hCLE1BQU0sRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsdUJBQVUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3hFLHlCQUF5QixFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsMkJBQTJCLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLHVCQUFVLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQ3ZILENBQUM7WUFFRixpQkFBaUIsR0FBRztnQkFDbEIscUJBQXFCLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsdUJBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDckcsQ0FBQztZQUVGLFNBQVMsR0FBRyxJQUFJLDZCQUFZ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LE9BQU8sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyx1QkFBVSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUM7Z0JBQzNHLGtCQUFrQixHQUFHLElBQUksc0NBQWlCLENBQUMsZUFBZSxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDbkcsa0JBQWtCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNsQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsWUFBWSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3hELENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsbUJBQW1CLEVBQUU7WUFDNUIsRUFBRSxDQUFDLDJDQUEyQyxFQUFFO2dCQUM5QyxrQkFBa0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDOUIsa0JBQWtCLENBQUMsZUFBZSxFQUFFLENBQUM7Z0JBQ3JDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLG9CQUFvQixDQUFDO29CQUNuRSxhQUFhLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUM7b0JBQ3BDLFlBQVksRUFBRTt3QkFDWixLQUFLLEVBQUUsWUFBWTt3QkFDbkIsUUFBUSxFQUFFLDJCQUEyQjt3QkFDckMsTUFBTSxFQUFFLG9CQUFvQjtxQkFDN0I7aUJBQ0YsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQXBGRCxvQkFvRkMiLCJmaWxlIjoiYXBwLyt1c2VyLW1hbmFnZW1lbnQvK3JlZ2lzdGVyL3JlZ2lzdGVyLmNvbXBvbmVudC5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBSZWdpc3RlckNvbXBvbmVudCB9IGZyb20gJy4vcmVnaXN0ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFJlc3BvbnNlLCBSZXNwb25zZU9wdGlvbnMgfSBmcm9tICdAYW5ndWxhci9odHRwJztcbmltcG9ydCB7IE1vY2tBcHBTdG9yZSB9IGZyb20gJy4uLy4uL3N0b3JlL3NwZWMtaGVscGVycy9tb2NrLWFwcC5zdG9yZSc7XG5cbmNvbnN0IHVzZXI6IGFueSA9IHtcbiAgZW1haWxBZGRyZXNzOiAnamFtZXNib25saW5lQHlhaG9vLmNvbScsIGZpcnN0TmFtZTogJ2phbWVzJyxcbiAgbGFzdE5hbWU6ICdiaWxsaWducycsIHBhc3N3b3JkOiAnMzk3OGYzMjRlMTRhYzI1NmIyOTk0Yjc1NDU4NmUwNWYnXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcbiAgZGVzY3JpYmUoJ1JlZ2lzdGVyIENvbXBvbmVudCcsICgpID0+IHtcbiAgICBsZXQgbW9ja1VzZXJTZXJ2aWNlOiBhbnk7XG4gICAgbGV0IG1vY2tEaWFsb2dTZXJ2aWNlOiBhbnk7XG4gICAgbGV0IG1vY2tSZWY6IGFueTtcbiAgICBsZXQgY29tcG9uZW50VW5kZXJUZXN0OiBSZWdpc3RlckNvbXBvbmVudDtcbiAgICBsZXQgbW9ja1N0b3JlOiBNb2NrQXBwU3RvcmU7XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgIG1vY2tSZWYgPSB7IG1hcmtGb3JDaGVjazogZnVuY3Rpb24gKCkgeyB9IH07XG5cbiAgICAgIG1vY2tVc2VyU2VydmljZSA9IHtcbiAgICAgICAgY3JlYXRlOiBqYXNtaW5lLmNyZWF0ZVNweSgnY3JlYXRlJykuYW5kLnJldHVyblZhbHVlKE9ic2VydmFibGUub2YodXNlcikpLFxuICAgICAgICBkb3dubG9hZEFjdGl2ZVRvc0RvY3VtZW50OiBqYXNtaW5lLmNyZWF0ZVNweSgnZG93bmxvYWRBY3RpdmVUb3NEb2N1bWVudCcpLmFuZC5yZXR1cm5WYWx1ZShPYnNlcnZhYmxlLm9mKCdzb21lLXRlcm1zJykpXG4gICAgICB9O1xuXG4gICAgICBtb2NrRGlhbG9nU2VydmljZSA9IHtcbiAgICAgICAgb3BlbkNvbXBvbmVudEluRGlhbG9nOiBqYXNtaW5lLmNyZWF0ZVNweSgnb3BlbkNvbXBvbmVudEluRGlhbG9nJykuYW5kLnJldHVyblZhbHVlKE9ic2VydmFibGUub2Yoe30pKVxuICAgICAgfTtcblxuICAgICAgbW9ja1N0b3JlID0gbmV3IE1vY2tBcHBTdG9yZSgpO1xuICAgICAgbW9ja1N0b3JlLmNyZWF0ZVN0YXRlU2VjdGlvbigndWlDb25maWcnLCB7IGNvbXBvbmVudHM6IHsgcmVnaXN0ZXI6IHsgY29uZmlnOiB7IHNvbWVDb25maWc6ICd0ZXN0JyB9IH0gfSB9KTtcblxuICAgICAgY29tcG9uZW50VW5kZXJUZXN0ID0gbmV3IFJlZ2lzdGVyQ29tcG9uZW50KG1vY2tVc2VyU2VydmljZSwgbW9ja1N0b3JlLCBtb2NrRGlhbG9nU2VydmljZSwgbW9ja1JlZik7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnbmdPbkluaXQoKScsICgpID0+IHtcbiAgICAgIGl0KCdHcmFicyB0aGUgY29tcG9uZW50IGNvbmZpZyBhbmQgYXNzaWducyB0byBhbiBpbnN0YW5jZSB2YXJpYWJsZScsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm5nT25Jbml0KCk7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuY29uZmlnKS50b0VxdWFsKHsgc29tZUNvbmZpZzogJ3Rlc3QnIH0pO1xuICAgICAgICBleHBlY3QobW9ja1VzZXJTZXJ2aWNlLmRvd25sb2FkQWN0aXZlVG9zRG9jdW1lbnQpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ29uU3VibWl0KCknLCAoKSA9PiB7XG4gICAgICBpdCgnQ2FsbHMgdGhlIHNlcnZlciB3aXRoIHVzZXIgYm9keSB0byBjcmVhdGUgdXNlcicsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm9uU3VibWl0KHVzZXIpO1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnVzZXJTZXJ2aWNlLmNyZWF0ZSkudG9IYXZlQmVlbkNhbGxlZFdpdGgodXNlcik7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ1NldHMgYSBjb21wb25lbnQgdmFyaWFibGUgZmxhZyB0byBzaG93IGEgc3VjY2VzcyBkaWFsb2cgdG8gdXNlcicsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm9uU3VibWl0KHVzZXIpO1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnN1Y2Nlc3NmdWxseVN1Ym1pdHRlZCkudG9FcXVhbCh0cnVlKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnQXNzaWducyBzdWNjZXNzIHVzZXIgcmVzcG9uc2UgdG8gaW5zdGFuY2UgdmFyaWFibGUgZm9yIHNjcmVlbiBkaXNwbGF5JywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3Qub25TdWJtaXQodXNlcik7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QubmV3VXNlcikudG9FcXVhbCh1c2VyKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnU2V0cyBhIGVycm9ycyB2YXJpYWJsZSB0byBkaXNwbGF5IGVycm9ycyBpZiB0aGUgc2VydmVyIGRvZXNudCBwYXNzJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBlcnJvclJlc3BvbnNlOiBSZXNwb25zZSA9IG5ldyBSZXNwb25zZShuZXcgUmVzcG9uc2VPcHRpb25zKHsgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBlbWFpbDogJ05vdCBVbmlxdWUnIH0pIH0pKTtcbiAgICAgICAgbW9ja1VzZXJTZXJ2aWNlID0geyBjcmVhdGU6IGphc21pbmUuY3JlYXRlU3B5KCdjcmVhdGUnKS5hbmQucmV0dXJuVmFsdWUoT2JzZXJ2YWJsZS50aHJvdyhlcnJvclJlc3BvbnNlKSkgfTtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0ID0gbmV3IFJlZ2lzdGVyQ29tcG9uZW50KG1vY2tVc2VyU2VydmljZSwgbW9ja1N0b3JlLCBtb2NrRGlhbG9nU2VydmljZSwgbW9ja1JlZik7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5vblN1Ym1pdCh1c2VyKTtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5zZXJ2ZXJFcnJvcnMpLnRvRXF1YWwoeyBlbWFpbDogJ05vdCBVbmlxdWUnIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdEb2VzIG5vdCBzZXQgZXJyb3JzIHZhcmlhYmxlIGlmIHRoZSBzdGF0dXMgd2FzIDQ1MScsICgpID0+IHtcbiAgICAgICAgY29uc3QgZXJyb3JSZXNwb25zZTogUmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UoXG4gICAgICAgICAgbmV3IFJlc3BvbnNlT3B0aW9ucyh7IHN0YXR1czogNDUxLCBib2R5OiBKU09OLnN0cmluZ2lmeSh7IGVtYWlsOiAnTm90IFVuaXF1ZScgfSkgfSlcbiAgICAgICAgKTtcbiAgICAgICAgbW9ja1VzZXJTZXJ2aWNlID0geyBjcmVhdGU6IGphc21pbmUuY3JlYXRlU3B5KCdjcmVhdGUnKS5hbmQucmV0dXJuVmFsdWUoT2JzZXJ2YWJsZS50aHJvdyhlcnJvclJlc3BvbnNlKSkgfTtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0ID0gbmV3IFJlZ2lzdGVyQ29tcG9uZW50KG1vY2tVc2VyU2VydmljZSwgbW9ja1N0b3JlLCBtb2NrRGlhbG9nU2VydmljZSwgbW9ja1JlZik7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5vblN1Ym1pdCh1c2VyKTtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5zZXJ2ZXJFcnJvcnMpLnRvRXF1YWwobnVsbCk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdvcGVuVGVybXNEaWFsb2coKScsICgpID0+IHtcbiAgICAgIGl0KCdvcGVucyB0aGUgY29tcG9uZW50IGluIHRoZSBkaWFsb2cgc2VydmljZScsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm5nT25Jbml0KCk7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5vcGVuVGVybXNEaWFsb2coKTtcbiAgICAgICAgZXhwZWN0KG1vY2tEaWFsb2dTZXJ2aWNlLm9wZW5Db21wb25lbnRJbkRpYWxvZykudG9IYXZlQmVlbkNhbGxlZFdpdGgoe1xuICAgICAgICAgIGNvbXBvbmVudFR5cGU6IGphc21pbmUuYW55KEZ1bmN0aW9uKSxcbiAgICAgICAgICBpbnB1dE9wdGlvbnM6IHtcbiAgICAgICAgICAgIHRlcm1zOiAnc29tZS10ZXJtcycsXG4gICAgICAgICAgICBidG5MYWJlbDogJ1JFR0lTVEVSLkNMT1NFX1RPU19ESUFMT0cnLFxuICAgICAgICAgICAgaGVhZGVyOiAnUkVHSVNURVIuVE9TX1RJVExFJ1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59XG4iXX0=
