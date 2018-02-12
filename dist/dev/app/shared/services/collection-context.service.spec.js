"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var collection_context_service_1 = require("./collection-context.service");
function main() {
    describe('Collection Context Service', function () {
        var serviceUnderTest;
        var mockStore;
        beforeEach(function () {
            mockStore = { select: function () { return {}; } };
            serviceUnderTest = new collection_context_service_1.CollectionContextService(mockStore);
        });
        it('***** HASN\'T BEEN TESTED YET! *****', function () {
            expect(true).toBe(true);
        });
    });
}
exports.main = main;
;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvc2VydmljZXMvY29sbGVjdGlvbi1jb250ZXh0LnNlcnZpY2Uuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJFQUF3RTtBQUV4RTtJQUNFLFFBQVEsQ0FBQyw0QkFBNEIsRUFBRTtRQUNyQyxJQUFJLGdCQUEwQyxDQUFDO1FBQy9DLElBQUksU0FBYyxDQUFDO1FBRW5CLFVBQVUsQ0FBQztZQUdULFNBQVMsR0FBRyxFQUFFLE1BQU0sRUFBRSxjQUFRLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUU3QyxnQkFBZ0IsR0FBRyxJQUFJLHFEQUF3QixDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzdELENBQUMsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLHNDQUFzQyxFQUFFO1lBQ3pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFqQkQsb0JBaUJDO0FBQUEsQ0FBQyIsImZpbGUiOiJhcHAvc2hhcmVkL3NlcnZpY2VzL2NvbGxlY3Rpb24tY29udGV4dC5zZXJ2aWNlLnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb2xsZWN0aW9uQ29udGV4dFNlcnZpY2UgfSBmcm9tICcuL2NvbGxlY3Rpb24tY29udGV4dC5zZXJ2aWNlJztcblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIGRlc2NyaWJlKCdDb2xsZWN0aW9uIENvbnRleHQgU2VydmljZScsICgpID0+IHtcbiAgICBsZXQgc2VydmljZVVuZGVyVGVzdDogQ29sbGVjdGlvbkNvbnRleHRTZXJ2aWNlO1xuICAgIGxldCBtb2NrU3RvcmU6IGFueTtcblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgLy8gVE9ETzogVGhpcyBpcyBhIG1pbmltYWwgbW9jayB0aGF0IGV4aXN0cyBzb2xlbHkgdG8gc3RvcFxuICAgICAgLy8gdGhlIGNvbnN0cnVjdG9yIGZyb20gZmFpbGluZy4gIEVuaGFuY2UgYXMgbmVlZGVkLlxuICAgICAgbW9ja1N0b3JlID0geyBzZWxlY3Q6ICgpID0+IHsgcmV0dXJuIHt9OyB9IH07XG5cbiAgICAgIHNlcnZpY2VVbmRlclRlc3QgPSBuZXcgQ29sbGVjdGlvbkNvbnRleHRTZXJ2aWNlKG1vY2tTdG9yZSk7XG4gICAgfSk7XG5cbiAgICBpdCgnKioqKiogSEFTTlxcJ1QgQkVFTiBURVNURUQgWUVUISAqKioqKicsICgpID0+IHtcbiAgICAgIGV4cGVjdCh0cnVlKS50b0JlKHRydWUpO1xuICAgIH0pO1xuICB9KTtcbn07XG4iXX0=
