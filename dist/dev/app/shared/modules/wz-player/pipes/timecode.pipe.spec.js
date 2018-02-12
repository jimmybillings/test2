"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var timecode_pipe_1 = require("./timecode.pipe");
var index_1 = require("../../wazee-frame-formatter/index");
function main() {
    describe('Timecode Pipe', function () {
        var pipeUnderTest;
        beforeEach(function () {
            pipeUnderTest = new timecode_pipe_1.TimecodePipe();
        });
        it('transforms a Frame object to a timecode string', function () {
            expect(pipeUnderTest.transform(new index_1.Frame(29.97).setFromFrameNumber(47))).toEqual('00:00:01;17');
        });
        it('transforms undefined to an empty string', function () {
            expect(pipeUnderTest.transform(undefined)).toEqual('');
        });
        it('transforms null to an empty string', function () {
            expect(pipeUnderTest.transform(null)).toEqual('');
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kdWxlcy93ei1wbGF5ZXIvcGlwZXMvdGltZWNvZGUucGlwZS5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaURBQStDO0FBQy9DLDJEQUEwRDtBQUUxRDtJQUNFLFFBQVEsQ0FBQyxlQUFlLEVBQUU7UUFDeEIsSUFBSSxhQUEyQixDQUFDO1FBRWhDLFVBQVUsQ0FBQztZQUNULGFBQWEsR0FBRyxJQUFJLDRCQUFZLEVBQUUsQ0FBQztRQUNyQyxDQUFDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyxnREFBZ0QsRUFBRTtZQUNuRCxNQUFNLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxJQUFJLGFBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ2xHLENBQUMsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLHlDQUF5QyxFQUFFO1lBQzVDLE1BQU0sQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3pELENBQUMsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLG9DQUFvQyxFQUFFO1lBQ3ZDLE1BQU0sQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3BELENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBcEJELG9CQW9CQyIsImZpbGUiOiJhcHAvc2hhcmVkL21vZHVsZXMvd3otcGxheWVyL3BpcGVzL3RpbWVjb2RlLnBpcGUuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRpbWVjb2RlUGlwZSB9IGZyb20gJy4vdGltZWNvZGUucGlwZSc7XG5pbXBvcnQgeyBGcmFtZSB9IGZyb20gJy4uLy4uL3dhemVlLWZyYW1lLWZvcm1hdHRlci9pbmRleCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBkZXNjcmliZSgnVGltZWNvZGUgUGlwZScsICgpID0+IHtcbiAgICBsZXQgcGlwZVVuZGVyVGVzdDogVGltZWNvZGVQaXBlO1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICBwaXBlVW5kZXJUZXN0ID0gbmV3IFRpbWVjb2RlUGlwZSgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3RyYW5zZm9ybXMgYSBGcmFtZSBvYmplY3QgdG8gYSB0aW1lY29kZSBzdHJpbmcnLCAoKSA9PiB7XG4gICAgICBleHBlY3QocGlwZVVuZGVyVGVzdC50cmFuc2Zvcm0obmV3IEZyYW1lKDI5Ljk3KS5zZXRGcm9tRnJhbWVOdW1iZXIoNDcpKSkudG9FcXVhbCgnMDA6MDA6MDE7MTcnKTtcbiAgICB9KTtcblxuICAgIGl0KCd0cmFuc2Zvcm1zIHVuZGVmaW5lZCB0byBhbiBlbXB0eSBzdHJpbmcnLCAoKSA9PiB7XG4gICAgICBleHBlY3QocGlwZVVuZGVyVGVzdC50cmFuc2Zvcm0odW5kZWZpbmVkKSkudG9FcXVhbCgnJyk7XG4gICAgfSk7XG5cbiAgICBpdCgndHJhbnNmb3JtcyBudWxsIHRvIGFuIGVtcHR5IHN0cmluZycsICgpID0+IHtcbiAgICAgIGV4cGVjdChwaXBlVW5kZXJUZXN0LnRyYW5zZm9ybShudWxsKSkudG9FcXVhbCgnJyk7XG4gICAgfSk7XG4gIH0pO1xufVxuIl19
