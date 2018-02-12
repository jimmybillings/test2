"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commerce_header_component_1 = require("./commerce-header.component");
function main() {
    describe('Commerce Header Component', function () {
        var componentUnderTest;
        beforeEach(function () {
            componentUnderTest = new commerce_header_component_1.CommerceHeaderComponent();
        });
        describe('toggleSearchButton()', function () {
            it('should toggle the itemSearchIsShowingBoolean', function () {
                expect(componentUnderTest.itemSearchIsShowing).toBe(false);
                componentUnderTest.toggleSearch();
                expect(componentUnderTest.itemSearchIsShowing).toBe(true);
                componentUnderTest.toggleSearch();
                expect(componentUnderTest.itemSearchIsShowing).toBe(false);
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvY29tcG9uZW50cy9jb21tZXJjZS1oZWFkZXIvY29tbWVyY2UtaGVhZGVyLmNvbXBvbmVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEseUVBQXNFO0FBRXRFO0lBQ0UsUUFBUSxDQUFDLDJCQUEyQixFQUFFO1FBQ3BDLElBQUksa0JBQTJDLENBQUM7UUFFaEQsVUFBVSxDQUFDO1lBQ1Qsa0JBQWtCLEdBQUcsSUFBSSxtREFBdUIsRUFBRSxDQUFDO1FBQ3JELENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLHNCQUFzQixFQUFFO1lBQy9CLEVBQUUsQ0FBQyw4Q0FBOEMsRUFBRTtnQkFDakQsTUFBTSxDQUFDLGtCQUFrQixDQUFDLG1CQUFtQixDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUMzRCxrQkFBa0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztnQkFDbEMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLG1CQUFtQixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUMxRCxrQkFBa0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztnQkFDbEMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLG1CQUFtQixDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzdELENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFsQkQsb0JBa0JDIiwiZmlsZSI6ImFwcC8rY29tbWVyY2UvY29tcG9uZW50cy9jb21tZXJjZS1oZWFkZXIvY29tbWVyY2UtaGVhZGVyLmNvbXBvbmVudC5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbWVyY2VIZWFkZXJDb21wb25lbnQgfSBmcm9tICcuL2NvbW1lcmNlLWhlYWRlci5jb21wb25lbnQnO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcbiAgZGVzY3JpYmUoJ0NvbW1lcmNlIEhlYWRlciBDb21wb25lbnQnLCAoKSA9PiB7XG4gICAgbGV0IGNvbXBvbmVudFVuZGVyVGVzdDogQ29tbWVyY2VIZWFkZXJDb21wb25lbnQ7XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgIGNvbXBvbmVudFVuZGVyVGVzdCA9IG5ldyBDb21tZXJjZUhlYWRlckNvbXBvbmVudCgpO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3RvZ2dsZVNlYXJjaEJ1dHRvbigpJywgKCkgPT4ge1xuICAgICAgaXQoJ3Nob3VsZCB0b2dnbGUgdGhlIGl0ZW1TZWFyY2hJc1Nob3dpbmdCb29sZWFuJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0Lml0ZW1TZWFyY2hJc1Nob3dpbmcpLnRvQmUoZmFsc2UpO1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QudG9nZ2xlU2VhcmNoKCk7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuaXRlbVNlYXJjaElzU2hvd2luZykudG9CZSh0cnVlKTtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnRvZ2dsZVNlYXJjaCgpO1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0Lml0ZW1TZWFyY2hJc1Nob3dpbmcpLnRvQmUoZmFsc2UpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufVxuIl19
