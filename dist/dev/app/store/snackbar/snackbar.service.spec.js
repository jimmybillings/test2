"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
var snackbar_service_1 = require("./snackbar.service");
function main() {
    describe('Snackbar Service', function () {
        var serviceUnderTest;
        var mockTranslateService;
        var mockSnackBar;
        beforeEach(function () {
            mockTranslateService = {
                get: jasmine.createSpy('translateService').and.returnValue(Observable_1.Observable.of('someTranslatedString'))
            };
            mockSnackBar = { open: jasmine.createSpy('open') };
            serviceUnderTest = new snackbar_service_1.SnackbarService(mockTranslateService, mockSnackBar);
        });
        describe('display()', function () {
            it('calls the translate service with the expected arguments', function () {
                serviceUnderTest.display('some key', { some: 'parameters' });
                expect(mockTranslateService.get).toHaveBeenCalledWith('some key', { some: 'parameters' });
            });
            it('opens the snackbar with the translated string', function () {
                serviceUnderTest.display('some key', { some: 'parameters' }).subscribe(function () {
                    expect(mockSnackBar.open).toHaveBeenCalledWith('someTranslatedString', '', {
                        duration: jasmine.any(Number),
                        verticalPosition: 'top',
                        horizontalPosition: 'left',
                        extraClasses: ['wz-snackbar']
                    });
                });
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9zbmFja2Jhci9zbmFja2Jhci5zZXJ2aWNlLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw4Q0FBNkM7QUFFN0MsdURBQXFEO0FBRXJEO0lBQ0UsUUFBUSxDQUFDLGtCQUFrQixFQUFFO1FBQzNCLElBQUksZ0JBQWlDLENBQUM7UUFDdEMsSUFBSSxvQkFBeUIsQ0FBQztRQUM5QixJQUFJLFlBQWlCLENBQUM7UUFFdEIsVUFBVSxDQUFDO1lBQ1Qsb0JBQW9CLEdBQUc7Z0JBQ3JCLEdBQUcsRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyx1QkFBVSxDQUFDLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO2FBQ2xHLENBQUM7WUFDRixZQUFZLEdBQUcsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1lBRW5ELGdCQUFnQixHQUFHLElBQUksa0NBQWUsQ0FBQyxvQkFBb0IsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUM3RSxDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxXQUFXLEVBQUU7WUFDcEIsRUFBRSxDQUFDLHlEQUF5RCxFQUFFO2dCQUM1RCxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxDQUFDLENBQUM7Z0JBRTdELE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxVQUFVLEVBQUUsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLENBQUMsQ0FBQztZQUM1RixDQUFDLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQywrQ0FBK0MsRUFBRTtnQkFDbEQsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQztvQkFDckUsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxzQkFBc0IsRUFBRSxFQUFFLEVBQUU7d0JBQ3pFLFFBQVEsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQzt3QkFDN0IsZ0JBQWdCLEVBQUUsS0FBSzt3QkFDdkIsa0JBQWtCLEVBQUUsTUFBTTt3QkFDMUIsWUFBWSxFQUFFLENBQUMsYUFBYSxDQUFDO3FCQUM5QixDQUFDLENBQUM7Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBbENELG9CQWtDQyIsImZpbGUiOiJhcHAvc3RvcmUvc25hY2tiYXIvc25hY2tiYXIuc2VydmljZS5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5cbmltcG9ydCB7IFNuYWNrYmFyU2VydmljZSB9IGZyb20gJy4vc25hY2tiYXIuc2VydmljZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBkZXNjcmliZSgnU25hY2tiYXIgU2VydmljZScsICgpID0+IHtcbiAgICBsZXQgc2VydmljZVVuZGVyVGVzdDogU25hY2tiYXJTZXJ2aWNlO1xuICAgIGxldCBtb2NrVHJhbnNsYXRlU2VydmljZTogYW55O1xuICAgIGxldCBtb2NrU25hY2tCYXI6IGFueTtcblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgbW9ja1RyYW5zbGF0ZVNlcnZpY2UgPSB7XG4gICAgICAgIGdldDogamFzbWluZS5jcmVhdGVTcHkoJ3RyYW5zbGF0ZVNlcnZpY2UnKS5hbmQucmV0dXJuVmFsdWUoT2JzZXJ2YWJsZS5vZignc29tZVRyYW5zbGF0ZWRTdHJpbmcnKSlcbiAgICAgIH07XG4gICAgICBtb2NrU25hY2tCYXIgPSB7IG9wZW46IGphc21pbmUuY3JlYXRlU3B5KCdvcGVuJykgfTtcblxuICAgICAgc2VydmljZVVuZGVyVGVzdCA9IG5ldyBTbmFja2JhclNlcnZpY2UobW9ja1RyYW5zbGF0ZVNlcnZpY2UsIG1vY2tTbmFja0Jhcik7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZGlzcGxheSgpJywgKCkgPT4ge1xuICAgICAgaXQoJ2NhbGxzIHRoZSB0cmFuc2xhdGUgc2VydmljZSB3aXRoIHRoZSBleHBlY3RlZCBhcmd1bWVudHMnLCAoKSA9PiB7XG4gICAgICAgIHNlcnZpY2VVbmRlclRlc3QuZGlzcGxheSgnc29tZSBrZXknLCB7IHNvbWU6ICdwYXJhbWV0ZXJzJyB9KTtcblxuICAgICAgICBleHBlY3QobW9ja1RyYW5zbGF0ZVNlcnZpY2UuZ2V0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aCgnc29tZSBrZXknLCB7IHNvbWU6ICdwYXJhbWV0ZXJzJyB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnb3BlbnMgdGhlIHNuYWNrYmFyIHdpdGggdGhlIHRyYW5zbGF0ZWQgc3RyaW5nJywgKCkgPT4ge1xuICAgICAgICBzZXJ2aWNlVW5kZXJUZXN0LmRpc3BsYXkoJ3NvbWUga2V5JywgeyBzb21lOiAncGFyYW1ldGVycycgfSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICBleHBlY3QobW9ja1NuYWNrQmFyLm9wZW4pLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKCdzb21lVHJhbnNsYXRlZFN0cmluZycsICcnLCB7XG4gICAgICAgICAgICBkdXJhdGlvbjogamFzbWluZS5hbnkoTnVtYmVyKSxcbiAgICAgICAgICAgIHZlcnRpY2FsUG9zaXRpb246ICd0b3AnLFxuICAgICAgICAgICAgaG9yaXpvbnRhbFBvc2l0aW9uOiAnbGVmdCcsXG4gICAgICAgICAgICBleHRyYUNsYXNzZXM6IFsnd3otc25hY2tiYXInXVxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn1cbiJdfQ==
