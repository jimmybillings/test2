"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
var collections_resolver_1 = require("./collections.resolver");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
function main() {
    describe('Collections Resolver', function () {
        var resolverUnderTest;
        var mockCollectionsService;
        var mockState;
        var resolved;
        function instantiator(initialState) {
            mockState = new BehaviorSubject_1.BehaviorSubject({ items: [] });
            mockCollectionsService = {
                data: mockState.asObservable(),
                reset: jasmine.createSpy('reset').and.callFake(function () { mockState.next({ items: [] }); }),
                load: jasmine.createSpy('load').and.returnValue(Observable_1.Observable.of('whatever')),
            };
            resolverUnderTest = new collections_resolver_1.CollectionsResolver(mockCollectionsService);
            resolved = jasmine.createSpy('resolved');
        }
        describe('resolve()', function () {
            var tests = [
                { description: 'no items', initialState: { items: [] } },
                { description: 'items', initialState: { items: [{ some: 'collection' }] } }
            ];
            tests.forEach(function (test) {
                describe("when there are " + test.description + " in the store", function () {
                    beforeEach(function () {
                        instantiator(test.initialState);
                    });
                    it('should call reset() and load() on the collections service', function () {
                        resolverUnderTest.resolve().subscribe();
                        expect(mockCollectionsService.reset).toHaveBeenCalled();
                        expect(mockCollectionsService.load).toHaveBeenCalled();
                    });
                    it('should not resolve until the data is ready', function () {
                        resolverUnderTest.resolve().subscribe(resolved);
                        expect(resolved).not.toHaveBeenCalled();
                        mockState.next({ items: [{ some: 'collection' }] });
                        expect(resolved).toHaveBeenCalledTimes(1);
                    });
                });
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29sbGVjdGlvbi9zZXJ2aWNlcy9jb2xsZWN0aW9ucy5yZXNvbHZlci5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsOENBQTZDO0FBQzdDLCtEQUE2RDtBQUM3RCx3REFBdUQ7QUFFdkQ7SUFDRSxRQUFRLENBQUMsc0JBQXNCLEVBQUU7UUFDL0IsSUFBSSxpQkFBc0MsQ0FBQztRQUMzQyxJQUFJLHNCQUEyQixDQUFDO1FBQ2hDLElBQUksU0FBK0IsQ0FBQztRQUNwQyxJQUFJLFFBQXFCLENBQUM7UUFFMUIsc0JBQXNCLFlBQWlCO1lBQ3JDLFNBQVMsR0FBRyxJQUFJLGlDQUFlLENBQU0sRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUVwRCxzQkFBc0IsR0FBRztnQkFDdkIsSUFBSSxFQUFFLFNBQVMsQ0FBQyxZQUFZLEVBQUU7Z0JBQzlCLEtBQUssRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsY0FBUSxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hGLElBQUksRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsdUJBQVUsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDM0UsQ0FBQztZQUVGLGlCQUFpQixHQUFHLElBQUksMENBQW1CLENBQUMsc0JBQXNCLENBQUMsQ0FBQztZQUNwRSxRQUFRLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMzQyxDQUFDO1FBRUQsUUFBUSxDQUFDLFdBQVcsRUFBRTtZQUNwQixJQUFNLEtBQUssR0FBaUQ7Z0JBQzFELEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUU7Z0JBQ3hELEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsQ0FBQyxFQUFFLEVBQUU7YUFDNUUsQ0FBQztZQUVGLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJO2dCQUNoQixRQUFRLENBQUMsb0JBQWtCLElBQUksQ0FBQyxXQUFXLGtCQUFlLEVBQUU7b0JBQzFELFVBQVUsQ0FBQzt3QkFDVCxZQUFZLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO29CQUNsQyxDQUFDLENBQUMsQ0FBQztvQkFFSCxFQUFFLENBQUMsMkRBQTJELEVBQUU7d0JBQzlELGlCQUFpQixDQUFDLE9BQU8sRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDO3dCQUV4QyxNQUFNLENBQUMsc0JBQXNCLENBQUMsS0FBSyxDQUFDLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQzt3QkFDeEQsTUFBTSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxDQUFDLGdCQUFnQixFQUFFLENBQUM7b0JBQ3pELENBQUMsQ0FBQyxDQUFDO29CQUVILEVBQUUsQ0FBQyw0Q0FBNEMsRUFBRTt3QkFDL0MsaUJBQWlCLENBQUMsT0FBTyxFQUFFLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO3dCQUVoRCxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLENBQUM7d0JBRXhDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQzt3QkFFcEQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM1QyxDQUFDLENBQUMsQ0FBQztnQkFDTCxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFwREQsb0JBb0RDIiwiZmlsZSI6ImFwcC8rY29sbGVjdGlvbi9zZXJ2aWNlcy9jb2xsZWN0aW9ucy5yZXNvbHZlci5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBDb2xsZWN0aW9uc1Jlc29sdmVyIH0gZnJvbSAnLi9jb2xsZWN0aW9ucy5yZXNvbHZlcic7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzL0JlaGF2aW9yU3ViamVjdCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBkZXNjcmliZSgnQ29sbGVjdGlvbnMgUmVzb2x2ZXInLCAoKSA9PiB7XG4gICAgbGV0IHJlc29sdmVyVW5kZXJUZXN0OiBDb2xsZWN0aW9uc1Jlc29sdmVyO1xuICAgIGxldCBtb2NrQ29sbGVjdGlvbnNTZXJ2aWNlOiBhbnk7XG4gICAgbGV0IG1vY2tTdGF0ZTogQmVoYXZpb3JTdWJqZWN0PGFueT47XG4gICAgbGV0IHJlc29sdmVkOiBqYXNtaW5lLlNweTtcblxuICAgIGZ1bmN0aW9uIGluc3RhbnRpYXRvcihpbml0aWFsU3RhdGU6IGFueSkge1xuICAgICAgbW9ja1N0YXRlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxhbnk+KHsgaXRlbXM6IFtdIH0pO1xuXG4gICAgICBtb2NrQ29sbGVjdGlvbnNTZXJ2aWNlID0ge1xuICAgICAgICBkYXRhOiBtb2NrU3RhdGUuYXNPYnNlcnZhYmxlKCksXG4gICAgICAgIHJlc2V0OiBqYXNtaW5lLmNyZWF0ZVNweSgncmVzZXQnKS5hbmQuY2FsbEZha2UoKCkgPT4geyBtb2NrU3RhdGUubmV4dCh7IGl0ZW1zOiBbXSB9KTsgfSksXG4gICAgICAgIGxvYWQ6IGphc21pbmUuY3JlYXRlU3B5KCdsb2FkJykuYW5kLnJldHVyblZhbHVlKE9ic2VydmFibGUub2YoJ3doYXRldmVyJykpLFxuICAgICAgfTtcblxuICAgICAgcmVzb2x2ZXJVbmRlclRlc3QgPSBuZXcgQ29sbGVjdGlvbnNSZXNvbHZlcihtb2NrQ29sbGVjdGlvbnNTZXJ2aWNlKTtcbiAgICAgIHJlc29sdmVkID0gamFzbWluZS5jcmVhdGVTcHkoJ3Jlc29sdmVkJyk7XG4gICAgfVxuXG4gICAgZGVzY3JpYmUoJ3Jlc29sdmUoKScsICgpID0+IHtcbiAgICAgIGNvbnN0IHRlc3RzOiB7IGRlc2NyaXB0aW9uOiBzdHJpbmcsIGluaXRpYWxTdGF0ZTogYW55IH1bXSA9IFtcbiAgICAgICAgeyBkZXNjcmlwdGlvbjogJ25vIGl0ZW1zJywgaW5pdGlhbFN0YXRlOiB7IGl0ZW1zOiBbXSB9IH0sXG4gICAgICAgIHsgZGVzY3JpcHRpb246ICdpdGVtcycsIGluaXRpYWxTdGF0ZTogeyBpdGVtczogW3sgc29tZTogJ2NvbGxlY3Rpb24nIH1dIH0gfVxuICAgICAgXTtcblxuICAgICAgdGVzdHMuZm9yRWFjaCh0ZXN0ID0+IHtcbiAgICAgICAgZGVzY3JpYmUoYHdoZW4gdGhlcmUgYXJlICR7dGVzdC5kZXNjcmlwdGlvbn0gaW4gdGhlIHN0b3JlYCwgKCkgPT4ge1xuICAgICAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICAgICAgaW5zdGFudGlhdG9yKHRlc3QuaW5pdGlhbFN0YXRlKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGl0KCdzaG91bGQgY2FsbCByZXNldCgpIGFuZCBsb2FkKCkgb24gdGhlIGNvbGxlY3Rpb25zIHNlcnZpY2UnLCAoKSA9PiB7XG4gICAgICAgICAgICByZXNvbHZlclVuZGVyVGVzdC5yZXNvbHZlKCkuc3Vic2NyaWJlKCk7XG5cbiAgICAgICAgICAgIGV4cGVjdChtb2NrQ29sbGVjdGlvbnNTZXJ2aWNlLnJlc2V0KS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgICBleHBlY3QobW9ja0NvbGxlY3Rpb25zU2VydmljZS5sb2FkKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBpdCgnc2hvdWxkIG5vdCByZXNvbHZlIHVudGlsIHRoZSBkYXRhIGlzIHJlYWR5JywgKCkgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZXJVbmRlclRlc3QucmVzb2x2ZSgpLnN1YnNjcmliZShyZXNvbHZlZCk7XG5cbiAgICAgICAgICAgIGV4cGVjdChyZXNvbHZlZCkubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblxuICAgICAgICAgICAgbW9ja1N0YXRlLm5leHQoeyBpdGVtczogW3sgc29tZTogJ2NvbGxlY3Rpb24nIH1dIH0pO1xuXG4gICAgICAgICAgICBleHBlY3QocmVzb2x2ZWQpLnRvSGF2ZUJlZW5DYWxsZWRUaW1lcygxKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59XG4iXX0=
