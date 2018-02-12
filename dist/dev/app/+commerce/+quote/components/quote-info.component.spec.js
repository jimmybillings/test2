"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var quote_info_component_1 = require("./quote-info.component");
function main() {
    describe('Quote Info Component', function () {
        var componentUnderTest;
        beforeEach(function () {
            componentUnderTest = new quote_info_component_1.QuoteInfoComponent();
        });
        describe('isExpired()', function () {
            it('is true when quote status is expired', function () {
                componentUnderTest.salesManager = { expirationDate: '2017-12-28T05:00:00Z' };
                expect(componentUnderTest.isExpired).toBe(true);
            });
            it('is false when quote status is not expired', function () {
                var d = new Date(3000, 1, 1).toISOString();
                componentUnderTest.salesManager = { expirationDate: d };
                expect(componentUnderTest.isExpired).toBe(false);
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvK3F1b3RlL2NvbXBvbmVudHMvcXVvdGUtaW5mby5jb21wb25lbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtEQUE0RDtBQUU1RDtJQUNFLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRTtRQUMvQixJQUFJLGtCQUFzQyxDQUFDO1FBRTNDLFVBQVUsQ0FBQztZQUNULGtCQUFrQixHQUFHLElBQUkseUNBQWtCLEVBQUUsQ0FBQztRQUNoRCxDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxhQUFhLEVBQUU7WUFDdEIsRUFBRSxDQUFDLHNDQUFzQyxFQUFFO2dCQUN6QyxrQkFBa0IsQ0FBQyxZQUFZLEdBQUcsRUFBRSxjQUFjLEVBQUUsc0JBQXNCLEVBQUUsQ0FBQztnQkFDN0UsTUFBTSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsRCxDQUFDLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQywyQ0FBMkMsRUFBRTtnQkFDOUMsSUFBSSxDQUFDLEdBQVcsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDbkQsa0JBQWtCLENBQUMsWUFBWSxHQUFHLEVBQUUsY0FBYyxFQUFFLENBQUMsRUFBRSxDQUFDO2dCQUN4RCxNQUFNLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25ELENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFyQkQsb0JBcUJDIiwiZmlsZSI6ImFwcC8rY29tbWVyY2UvK3F1b3RlL2NvbXBvbmVudHMvcXVvdGUtaW5mby5jb21wb25lbnQuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFF1b3RlSW5mb0NvbXBvbmVudCB9IGZyb20gJy4vcXVvdGUtaW5mby5jb21wb25lbnQnO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcbiAgZGVzY3JpYmUoJ1F1b3RlIEluZm8gQ29tcG9uZW50JywgKCkgPT4ge1xuICAgIGxldCBjb21wb25lbnRVbmRlclRlc3Q6IFF1b3RlSW5mb0NvbXBvbmVudDtcblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgY29tcG9uZW50VW5kZXJUZXN0ID0gbmV3IFF1b3RlSW5mb0NvbXBvbmVudCgpO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2lzRXhwaXJlZCgpJywgKCkgPT4ge1xuICAgICAgaXQoJ2lzIHRydWUgd2hlbiBxdW90ZSBzdGF0dXMgaXMgZXhwaXJlZCcsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnNhbGVzTWFuYWdlciA9IHsgZXhwaXJhdGlvbkRhdGU6ICcyMDE3LTEyLTI4VDA1OjAwOjAwWicgfTtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5pc0V4cGlyZWQpLnRvQmUodHJ1ZSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ2lzIGZhbHNlIHdoZW4gcXVvdGUgc3RhdHVzIGlzIG5vdCBleHBpcmVkJywgKCkgPT4ge1xuICAgICAgICBsZXQgZDogc3RyaW5nID0gbmV3IERhdGUoMzAwMCwgMSwgMSkudG9JU09TdHJpbmcoKTtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnNhbGVzTWFuYWdlciA9IHsgZXhwaXJhdGlvbkRhdGU6IGQgfTtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5pc0V4cGlyZWQpLnRvQmUoZmFsc2UpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufVxuIl19
