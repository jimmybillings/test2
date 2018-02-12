"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var timecodeFormat_1 = require("./timecodeFormat");
var timecodeGenerator_1 = require("./timecodeGenerator");
function main() {
    describe('TimecodeGenerator', function () {
        var generatorUnderTest;
        describe('for 29.97 fps', function () {
            beforeEach(function () {
                generatorUnderTest = new timecodeGenerator_1.TimecodeGenerator(29.97);
            });
            describe('for frame number 1800', function () {
                beforeEach(function () {
                    generatorUnderTest.setFromFrameNumber(1800);
                });
                it('can generate a nondropframe timecode', function () {
                    expect(generatorUnderTest.asString(timecodeFormat_1.TimecodeFormat.NONDROPFRAME)).toEqual('00:01:00:00');
                });
                it('can generate a dropframe timecode', function () {
                    expect(generatorUnderTest.asString(timecodeFormat_1.TimecodeFormat.DROPFRAME)).toEqual('00:01:00;02');
                });
                it('can generate a simple time conversion timecode', function () {
                    expect(generatorUnderTest.asString(timecodeFormat_1.TimecodeFormat.SIMPLE_TIME_CONVERSION)).toEqual('00:01:00;02');
                });
                it('can generate a minimal time conversion timecode', function () {
                    expect(generatorUnderTest.asString(timecodeFormat_1.TimecodeFormat.MINIMAL_TIME_CONVERSION)).toEqual('01:00;02');
                });
            });
            describe('for frame number 3598', function () {
                beforeEach(function () {
                    generatorUnderTest.setFromFrameNumber(3598);
                });
                it('can generate a nondropframe timecode', function () {
                    expect(generatorUnderTest.asString(timecodeFormat_1.TimecodeFormat.NONDROPFRAME)).toEqual('00:01:59:28');
                });
                it('can generate a dropframe timecode', function () {
                    expect(generatorUnderTest.asString(timecodeFormat_1.TimecodeFormat.DROPFRAME)).toEqual('00:02:00;02');
                });
                it('can generate a simple time conversion timecode', function () {
                    expect(generatorUnderTest.asString(timecodeFormat_1.TimecodeFormat.SIMPLE_TIME_CONVERSION)).toEqual('00:02:00;02');
                });
                it('can generate a minimal time conversion timecode', function () {
                    expect(generatorUnderTest.asString(timecodeFormat_1.TimecodeFormat.MINIMAL_TIME_CONVERSION)).toEqual('02:00;02');
                });
            });
            describe('for frame number 18000', function () {
                beforeEach(function () {
                    return generatorUnderTest.setFromFrameNumber(18000);
                });
                it('can generate a nondropframe timecode', function () {
                    expect(generatorUnderTest.asString(timecodeFormat_1.TimecodeFormat.NONDROPFRAME)).toEqual('00:10:00:00');
                });
                it('can generate a dropframe timecode', function () {
                    expect(generatorUnderTest.asString(timecodeFormat_1.TimecodeFormat.DROPFRAME)).toEqual('00:10:00;18');
                });
                it('can generate a simple time conversion timecode', function () {
                    expect(generatorUnderTest.asString(timecodeFormat_1.TimecodeFormat.SIMPLE_TIME_CONVERSION)).toEqual('00:10:00;18');
                });
                it('can generate a minimal time conversion timecode', function () {
                    expect(generatorUnderTest.asString(timecodeFormat_1.TimecodeFormat.MINIMAL_TIME_CONVERSION)).toEqual('10:00;18');
                });
            });
            describe('for frame number 100000', function () {
                beforeEach(function () {
                    return generatorUnderTest.setFromFrameNumber(100000);
                });
                it('can generate a nondropframe timecode', function () {
                    expect(generatorUnderTest.asString(timecodeFormat_1.TimecodeFormat.NONDROPFRAME)).toEqual('00:55:33:10');
                });
                it('can generate a dropframe timecode', function () {
                    expect(generatorUnderTest.asString(timecodeFormat_1.TimecodeFormat.DROPFRAME)).toEqual('00:55:36;20');
                });
                it('can generate a simple time conversion timecode', function () {
                    expect(generatorUnderTest.asString(timecodeFormat_1.TimecodeFormat.SIMPLE_TIME_CONVERSION)).toEqual('00:55:36;20');
                });
            });
            describe('for frame number 111694', function () {
                beforeEach(function () {
                    return generatorUnderTest.setFromFrameNumber(111694);
                });
                it('can generate a nondropframe timecode', function () {
                    expect(generatorUnderTest.asString(timecodeFormat_1.TimecodeFormat.NONDROPFRAME)).toEqual('01:02:03:04');
                });
            });
            describe('for frame number 123456', function () {
                beforeEach(function () {
                    return generatorUnderTest.setFromFrameNumber(123456);
                });
                it('can generate a nondropframe timecode', function () {
                    expect(generatorUnderTest.asString(timecodeFormat_1.TimecodeFormat.NONDROPFRAME)).toEqual('01:08:35:06');
                });
                it('can generate a nondropframe timecode', function () {
                    expect(generatorUnderTest.asString(timecodeFormat_1.TimecodeFormat.DROPFRAME)).toEqual('01:08:39;10');
                });
                it('can generate a simple time conversion timecode', function () {
                    expect(generatorUnderTest.asString(timecodeFormat_1.TimecodeFormat.SIMPLE_TIME_CONVERSION)).toEqual('01:08:39;09');
                });
            });
        });
        describe('for 59.94 fps', function () {
            beforeEach(function () {
                return generatorUnderTest = new timecodeGenerator_1.TimecodeGenerator(59.94);
            });
            describe('for frame number 3600', function () {
                beforeEach(function () {
                    return generatorUnderTest.setFromFrameNumber(3600);
                });
                it('can generate a dropframe timecode', function () {
                    expect(generatorUnderTest.asString(timecodeFormat_1.TimecodeFormat.DROPFRAME)).toEqual('00:01:00;04');
                });
            });
            describe('for frame number 200000', function () {
                beforeEach(function () {
                    return generatorUnderTest.setFromFrameNumber(200000);
                });
                it('can generate a dropframe timecode', function () {
                    expect(generatorUnderTest.asString(timecodeFormat_1.TimecodeFormat.DROPFRAME)).toEqual('00:55:36;40');
                });
            });
        });
        describe('for 23.976 fps', function () {
            beforeEach(function () {
                return generatorUnderTest = new timecodeGenerator_1.TimecodeGenerator(23.976);
            });
            describe('for frame number 1127', function () {
                beforeEach(function () {
                    return generatorUnderTest.setFromFrameNumber(1127);
                });
                it('can generate a nondropframe timecode', function () {
                    expect(generatorUnderTest.asString(timecodeFormat_1.TimecodeFormat.NONDROPFRAME)).toEqual('00:00:46:23');
                });
                it('can generate a dropframe timecode', function () {
                    expect(generatorUnderTest.asString(timecodeFormat_1.TimecodeFormat.DROPFRAME)).toEqual('00:00:46;23');
                });
                it('can generate a simple time conversion timecode', function () {
                    expect(generatorUnderTest.asString(timecodeFormat_1.TimecodeFormat.SIMPLE_TIME_CONVERSION)).toEqual('00:00:47;00');
                });
                it('can generate a minimal time conversion timecode', function () {
                    expect(generatorUnderTest.asString(timecodeFormat_1.TimecodeFormat.MINIMAL_TIME_CONVERSION)).toEqual('47');
                });
            });
            describe('for frame number 1128', function () {
                beforeEach(function () {
                    return generatorUnderTest.setFromFrameNumber(1128);
                });
                it('can generate a nondropframe timecode', function () {
                    expect(generatorUnderTest.asString(timecodeFormat_1.TimecodeFormat.NONDROPFRAME)).toEqual('00:00:47:00');
                });
                it('can generate a dropframe timecode', function () {
                    expect(generatorUnderTest.asString(timecodeFormat_1.TimecodeFormat.DROPFRAME)).toEqual('00:00:47;00');
                });
                it('can generate a simple time conversion timecode', function () {
                    expect(generatorUnderTest.asString(timecodeFormat_1.TimecodeFormat.SIMPLE_TIME_CONVERSION)).toEqual('00:00:47;01');
                });
                it('can generate a minimal time conversion timecode', function () {
                    expect(generatorUnderTest.asString(timecodeFormat_1.TimecodeFormat.MINIMAL_TIME_CONVERSION)).toEqual('47;01');
                });
            });
            describe('for frame number 1440', function () {
                beforeEach(function () {
                    return generatorUnderTest.setFromFrameNumber(1440);
                });
                it('can generate a dropframe timecode', function () {
                    expect(generatorUnderTest.asString(timecodeFormat_1.TimecodeFormat.DROPFRAME)).toEqual('00:01:00;01');
                });
            });
            describe('for frame number 6498', function () {
                beforeEach(function () {
                    return generatorUnderTest.setFromFrameNumber(6498);
                });
                it('can generate a nondropframe timecode', function () {
                    expect(generatorUnderTest.asString(timecodeFormat_1.TimecodeFormat.NONDROPFRAME)).toEqual('00:04:30:18');
                });
                it('can generate a dropframe timecode', function () {
                    expect(generatorUnderTest.asString(timecodeFormat_1.TimecodeFormat.DROPFRAME)).toEqual('00:04:30;22');
                });
                it('can generate a simple time conversion timecode', function () {
                    expect(generatorUnderTest.asString(timecodeFormat_1.TimecodeFormat.SIMPLE_TIME_CONVERSION)).toEqual('00:04:31;00');
                });
            });
            describe('for frame number 56991', function () {
                beforeEach(function () {
                    return generatorUnderTest.setFromFrameNumber(56991);
                });
                it('can generate a nondropframe timecode', function () {
                    expect(generatorUnderTest.asString(timecodeFormat_1.TimecodeFormat.NONDROPFRAME)).toEqual('00:39:34:15');
                });
                it('can generate a dropframe timecode', function () {
                    expect(generatorUnderTest.asString(timecodeFormat_1.TimecodeFormat.DROPFRAME)).toEqual('00:39:36;06');
                });
                it('can generate a simple time conversion timecode', function () {
                    expect(generatorUnderTest.asString(timecodeFormat_1.TimecodeFormat.SIMPLE_TIME_CONVERSION)).toEqual('00:39:37;00');
                });
                it('can generate a minimal time conversion timecode', function () {
                    expect(generatorUnderTest.asString(timecodeFormat_1.TimecodeFormat.MINIMAL_TIME_CONVERSION)).toEqual('39:37');
                });
            });
            describe('for frame number 99359', function () {
                beforeEach(function () {
                    return generatorUnderTest.setFromFrameNumber(99359);
                });
                it('can generate a nondropframe timecode', function () {
                    expect(generatorUnderTest.asString(timecodeFormat_1.TimecodeFormat.NONDROPFRAME)).toEqual('01:08:59:23');
                });
                it('can generate a dropframe timecode', function () {
                    expect(generatorUnderTest.asString(timecodeFormat_1.TimecodeFormat.DROPFRAME)).toEqual('01:09:03;00');
                });
                it('can generate a simple time conversion timecode', function () {
                    expect(generatorUnderTest.asString(timecodeFormat_1.TimecodeFormat.SIMPLE_TIME_CONVERSION)).toEqual('01:09:04;02');
                });
            });
            describe('for frame number 100000', function () {
                beforeEach(function () {
                    return generatorUnderTest.setFromFrameNumber(100000);
                });
                it('can generate a dropframe timecode', function () {
                    expect(generatorUnderTest.asString(timecodeFormat_1.TimecodeFormat.DROPFRAME)).toEqual('01:09:29;17');
                });
            });
            describe('for frame number 99359', function () {
                beforeEach(function () {
                    return generatorUnderTest.setFromFrameNumber(99359);
                });
                it('can generate a nondropframe timecode', function () {
                    expect(generatorUnderTest.asString(timecodeFormat_1.TimecodeFormat.NONDROPFRAME)).toEqual('01:08:59:23');
                });
                it('can generate a dropframe timecode', function () {
                    expect(generatorUnderTest.asString(timecodeFormat_1.TimecodeFormat.DROPFRAME)).toEqual('01:09:03;00');
                });
                it('can generate a simple time conversion timecode', function () {
                    expect(generatorUnderTest.asString(timecodeFormat_1.TimecodeFormat.SIMPLE_TIME_CONVERSION)).toEqual('01:09:04;02');
                });
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kdWxlcy93YXplZS1mcmFtZS1mb3JtYXR0ZXIvdGltZWNvZGVHZW5lcmF0b3Iuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1EQUFrRDtBQUNsRCx5REFBd0Q7QUFFeEQ7SUFDRSxRQUFRLENBQUMsbUJBQW1CLEVBQUU7UUFDNUIsSUFBSSxrQkFBcUMsQ0FBQztRQUUxQyxRQUFRLENBQUMsZUFBZSxFQUFFO1lBQ3hCLFVBQVUsQ0FBQztnQkFDVCxrQkFBa0IsR0FBRyxJQUFJLHFDQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3BELENBQUMsQ0FBQyxDQUFDO1lBRUgsUUFBUSxDQUFDLHVCQUF1QixFQUFFO2dCQUNoQyxVQUFVLENBQUM7b0JBQ1Qsa0JBQWtCLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzlDLENBQUMsQ0FBQyxDQUFDO2dCQUVILEVBQUUsQ0FBQyxzQ0FBc0MsRUFBRTtvQkFDekMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQywrQkFBYyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUMxRixDQUFDLENBQUMsQ0FBQztnQkFFSCxFQUFFLENBQUMsbUNBQW1DLEVBQUU7b0JBQ3RDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsK0JBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDdkYsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsRUFBRSxDQUFDLGdEQUFnRCxFQUFFO29CQUNuRCxNQUFNLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLCtCQUFjLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDcEcsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsRUFBRSxDQUFDLGlEQUFpRCxFQUFFO29CQUNwRCxNQUFN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QUFDLCtCQUFjLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBQ3ZGLENBQUMsQ0FBQyxDQUFDO2dCQUVILEVBQUUsQ0FBQyxnREFBZ0QsRUFBRTtvQkFDbkQsTUFBTSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQywrQkFBYyxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBQ3BHLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQXhTRCxvQkF3U0MiLCJmaWxlIjoiYXBwL3NoYXJlZC9tb2R1bGVzL3dhemVlLWZyYW1lLWZvcm1hdHRlci90aW1lY29kZUdlbmVyYXRvci5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVGltZWNvZGVGb3JtYXQgfSBmcm9tICcuL3RpbWVjb2RlRm9ybWF0JztcbmltcG9ydCB7IFRpbWVjb2RlR2VuZXJhdG9yIH0gZnJvbSAnLi90aW1lY29kZUdlbmVyYXRvcic7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBkZXNjcmliZSgnVGltZWNvZGVHZW5lcmF0b3InLCBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGdlbmVyYXRvclVuZGVyVGVzdDogVGltZWNvZGVHZW5lcmF0b3I7XG5cbiAgICBkZXNjcmliZSgnZm9yIDI5Ljk3IGZwcycsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICBnZW5lcmF0b3JVbmRlclRlc3QgPSBuZXcgVGltZWNvZGVHZW5lcmF0b3IoMjkuOTcpO1xuICAgICAgfSk7XG5cbiAgICAgIGRlc2NyaWJlKCdmb3IgZnJhbWUgbnVtYmVyIDE4MDAnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGdlbmVyYXRvclVuZGVyVGVzdC5zZXRGcm9tRnJhbWVOdW1iZXIoMTgwMCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdjYW4gZ2VuZXJhdGUgYSBub25kcm9wZnJhbWUgdGltZWNvZGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgZXhwZWN0KGdlbmVyYXRvclVuZGVyVGVzdC5hc1N0cmluZyhUaW1lY29kZUZvcm1hdC5OT05EUk9QRlJBTUUpKS50b0VxdWFsKCcwMDowMTowMDowMCcpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnY2FuIGdlbmVyYXRlIGEgZHJvcGZyYW1lIHRpbWVjb2RlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGV4cGVjdChnZW5lcmF0b3JVbmRlclRlc3QuYXNTdHJpbmcoVGltZWNvZGVGb3JtYXQuRFJPUEZSQU1FKSkudG9FcXVhbCgnMDA6MDE6MDA7MDInKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2NhbiBnZW5lcmF0ZSBhIHNpbXBsZSB0aW1lIGNvbnZlcnNpb24gdGltZWNvZGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgZXhwZWN0KGdlbmVyYXRvclVuZGVyVGVzdC5hc1N0cmluZyhUaW1lY29kZUZvcm1hdC5TSU1QTEVfVElNRV9DT05WRVJTSU9OKSkudG9FcXVhbCgnMDA6MDE6MDA7MDInKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2NhbiBnZW5lcmF0ZSBhIG1pbmltYWwgdGltZSBjb252ZXJzaW9uIHRpbWVjb2RlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGV4cGVjdChnZW5lcmF0b3JVbmRlclRlc3QuYXNTdHJpbmcoVGltZWNvZGVGb3JtYXQuTUlOSU1BTF9USU1FX0NPTlZFUlNJT04pKS50b0VxdWFsKCcwMTowMDswMicpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBkZXNjcmliZSgnZm9yIGZyYW1lIG51bWJlciAzNTk4JywgZnVuY3Rpb24gKCkge1xuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBnZW5lcmF0b3JVbmRlclRlc3Quc2V0RnJvbUZyYW1lTnVtYmVyKDM1OTgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnY2FuIGdlbmVyYXRlIGEgbm9uZHJvcGZyYW1lIHRpbWVjb2RlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGV4cGVjdChnZW5lcmF0b3JVbmRlclRlc3QuYXNTdHJpbmcoVGltZWNvZGVGb3JtYXQuTk9ORFJPUEZSQU1FKSkudG9FcXVhbCgnMDA6MDE6NTk6MjgnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2NhbiBnZW5lcmF0ZSBhIGRyb3BmcmFtZSB0aW1lY29kZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBleHBlY3QoZ2VuZXJhdG9yVW5kZXJUZXN0LmFzU3RyaW5nKFRpbWVjb2RlRm9ybWF0LkRST1BGUkFNRSkpLnRvRXF1YWwoJzAwOjAyOjAwOzAyJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdjYW4gZ2VuZXJhdGUgYSBzaW1wbGUgdGltZSBjb252ZXJzaW9uIHRpbWVjb2RlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGV4cGVjdChnZW5lcmF0b3JVbmRlclRlc3QuYXNTdHJpbmcoVGltZWNvZGVGb3JtYXQuU0lNUExFX1RJTUVfQ09OVkVSU0lPTikpLnRvRXF1YWwoJzAwOjAyOjAwOzAyJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdjYW4gZ2VuZXJhdGUgYSBtaW5pbWFsIHRpbWUgY29udmVyc2lvbiB0aW1lY29kZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBleHBlY3QoZ2VuZXJhdG9yVW5kZXJUZXN0LmFzU3RyaW5nKFRpbWVjb2RlRm9ybWF0Lk1JTklNQUxfVElNRV9DT05WRVJTSU9OKSkudG9FcXVhbCgnMDI6MDA7MDInKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgZGVzY3JpYmUoJ2ZvciBmcmFtZSBudW1iZXIgMTgwMDAnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBnZW5lcmF0b3JVbmRlclRlc3Quc2V0RnJvbUZyYW1lTnVtYmVyKDE4MDAwKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2NhbiBnZW5lcmF0ZSBhIG5vbmRyb3BmcmFtZSB0aW1lY29kZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBleHBlY3QoZ2VuZXJhdG9yVW5kZXJUZXN0LmFzU3RyaW5nKFRpbWVjb2RlRm9ybWF0Lk5PTkRST1BGUkFNRSkpLnRvRXF1YWwoJzAwOjEwOjAwOjAwJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdjYW4gZ2VuZXJhdGUgYSBkcm9wZnJhbWUgdGltZWNvZGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgZXhwZWN0KGdlbmVyYXRvclVuZGVyVGVzdC5hc1N0cmluZyhUaW1lY29kZUZvcm1hdC5EUk9QRlJBTUUpKS50b0VxdWFsKCcwMDoxMDowMDsxOCcpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnY2FuIGdlbmVyYXRlIGEgc2ltcGxlIHRpbWUgY29udmVyc2lvbiB0aW1lY29kZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBleHBlY3QoZ2VuZXJhdG9yVW5kZXJUZXN0LmFzU3RyaW5nKFRpbWVjb2RlRm9ybWF0LlNJTVBMRV9USU1FX0NPTlZFUlNJT04pKS50b0VxdWFsKCcwMDoxMDowMDsxOCcpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnY2FuIGdlbmVyYXRlIGEgbWluaW1hbCB0aW1lIGNvbnZlcnNpb24gdGltZWNvZGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgZXhwZWN0KGdlbmVyYXRvclVuZGVyVGVzdC5hc1N0cmluZyhUaW1lY29kZUZvcm1hdC5NSU5JTUFMX1RJTUVfQ09OVkVSU0lPTikpLnRvRXF1YWwoJzEwOjAwOzE4Jyk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGRlc2NyaWJlKCdmb3IgZnJhbWUgbnVtYmVyIDEwMDAwMCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIGdlbmVyYXRvclVuZGVyVGVzdC5zZXRGcm9tRnJhbWVOdW1iZXIoMTAwMDAwKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2NhbiBnZW5lcmF0ZSBhIG5vbmRyb3BmcmFtZSB0aW1lY29kZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBleHBlY3QoZ2VuZXJhdG9yVW5kZXJUZXN0LmFzU3RyaW5nKFRpbWVjb2RlRm9ybWF0Lk5PTkRST1BGUkFNRSkpLnRvRXF1YWwoJzAwOjU1OjMzOjEwJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdjYW4gZ2VuZXJhdGUgYSBkcm9wZnJhbWUgdGltZWNvZGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgZXhwZWN0KGdlbmVyYXRvclVuZGVyVGVzdC5hc1N0cmluZyhUaW1lY29kZUZvcm1hdC5EUk9QRlJBTUUpKS50b0VxdWFsKCcwMDo1NTozNjsyMCcpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnY2FuIGdlbmVyYXRlIGEgc2ltcGxlIHRpbWUgY29udmVyc2lvbiB0aW1lY29kZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBleHBlY3QoZ2VuZXJhdG9yVW5kZXJUZXN0LmFzU3RyaW5nKFRpbWVjb2RlRm9ybWF0LlNJTVBMRV9USU1FX0NPTlZFUlNJT04pKS50b0VxdWFsKCcwMDo1NTozNjsyMCcpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBkZXNjcmliZSgnZm9yIGZyYW1lIG51bWJlciAxMTE2OTQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBnZW5lcmF0b3JVbmRlclRlc3Quc2V0RnJvbUZyYW1lTnVtYmVyKDExMTY5NCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdjYW4gZ2VuZXJhdGUgYSBub25kcm9wZnJhbWUgdGltZWNvZGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgZXhwZWN0KGdlbmVyYXRvclVuZGVyVGVzdC5hc1N0cmluZyhUaW1lY29kZUZvcm1hdC5OT05EUk9QRlJBTUUpKS50b0VxdWFsKCcwMTowMjowMzowNCcpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBkZXNjcmliZSgnZm9yIGZyYW1lIG51bWJlciAxMjM0NTYnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBnZW5lcmF0b3JVbmRlclRlc3Quc2V0RnJvbUZyYW1lTnVtYmVyKDEyMzQ1Nik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdjYW4gZ2VuZXJhdGUgYSBub25kcm9wZnJhbWUgdGltZWNvZGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgZXhwZWN0KGdlbmVyYXRvclVuZGVyVGVzdC5hc1N0cmluZyhUaW1lY29kZUZvcm1hdC5OT05EUk9QRlJBTUUpKS50b0VxdWFsKCcwMTowODozNTowNicpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnY2FuIGdlbmVyYXRlIGEgbm9uZHJvcGZyYW1lIHRpbWVjb2RlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGV4cGVjdChnZW5lcmF0b3JVbmRlclRlc3QuYXNTdHJpbmcoVGltZWNvZGVGb3JtYXQuRFJPUEZSQU1FKSkudG9FcXVhbCgnMDE6MDg6Mzk7MTAnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2NhbiBnZW5lcmF0ZSBhIHNpbXBsZSB0aW1lIGNvbnZlcnNpb24gdGltZWNvZGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgZXhwZWN0KGdlbmVyYXRvclVuZGVyVGVzdC5hc1N0cmluZyhUaW1lY29kZUZvcm1hdC5TSU1QTEVfVElNRV9DT05WRVJTSU9OKSkudG9FcXVhbCgnMDE6MDg6Mzk7MDknKTtcbiAgICAgICAgfSk7XG5cbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2ZvciA1OS45NCBmcHMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGdlbmVyYXRvclVuZGVyVGVzdCA9IG5ldyBUaW1lY29kZUdlbmVyYXRvcig1OS45NCk7XG4gICAgICB9KTtcblxuICAgICAgZGVzY3JpYmUoJ2ZvciBmcmFtZSBudW1iZXIgMzYwMCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIGdlbmVyYXRvclVuZGVyVGVzdC5zZXRGcm9tRnJhbWVOdW1iZXIoMzYwMCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdjYW4gZ2VuZXJhdGUgYSBkcm9wZnJhbWUgdGltZWNvZGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgZXhwZWN0KGdlbmVyYXRvclVuZGVyVGVzdC5hc1N0cmluZyhUaW1lY29kZUZvcm1hdC5EUk9QRlJBTUUpKS50b0VxdWFsKCcwMDowMTowMDswNCcpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBkZXNjcmliZSgnZm9yIGZyYW1lIG51bWJlciAyMDAwMDAnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBnZW5lcmF0b3JVbmRlclRlc3Quc2V0RnJvbUZyYW1lTnVtYmVyKDIwMDAwMCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdjYW4gZ2VuZXJhdGUgYSBkcm9wZnJhbWUgdGltZWNvZGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgZXhwZWN0KGdlbmVyYXRvclVuZGVyVGVzdC5hc1N0cmluZyhUaW1lY29kZUZvcm1hdC5EUk9QRlJBTUUpKS50b0VxdWFsKCcwMDo1NTozNjs0MCcpO1xuICAgICAgICB9KTtcblxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZm9yIDIzLjk3NiBmcHMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGdlbmVyYXRvclVuZGVyVGVzdCA9IG5ldyBUaW1lY29kZUdlbmVyYXRvcigyMy45NzYpO1xuICAgICAgfSk7XG5cbiAgICAgIGRlc2NyaWJlKCdmb3IgZnJhbWUgbnVtYmVyIDExMjcnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBnZW5lcmF0b3JVbmRlclRlc3Quc2V0RnJvbUZyYW1lTnVtYmVyKDExMjcpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnY2FuIGdlbmVyYXRlIGEgbm9uZHJvcGZyYW1lIHRpbWVjb2RlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGV4cGVjdChnZW5lcmF0b3JVbmRlclRlc3QuYXNTdHJpbmcoVGltZWNvZGVGb3JtYXQuTk9ORFJPUEZSQU1FKSkudG9FcXVhbCgnMDA6MDA6NDY6MjMnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2NhbiBnZW5lcmF0ZSBhIGRyb3BmcmFtZSB0aW1lY29kZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBleHBlY3QoZ2VuZXJhdG9yVW5kZXJUZXN0LmFzU3RyaW5nKFRpbWVjb2RlRm9ybWF0LkRST1BGUkFNRSkpLnRvRXF1YWwoJzAwOjAwOjQ2OzIzJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdjYW4gZ2VuZXJhdGUgYSBzaW1wbGUgdGltZSBjb252ZXJzaW9uIHRpbWVjb2RlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGV4cGVjdChnZW5lcmF0b3JVbmRlclRlc3QuYXNTdHJpbmcoVGltZWNvZGVGb3JtYXQuU0lNUExFX1RJTUVfQ09OVkVSU0lPTikpLnRvRXF1YWwoJzAwOjAwOjQ3OzAwJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdjYW4gZ2VuZXJhdGUgYSBtaW5pbWFsIHRpbWUgY29udmVyc2lvbiB0aW1lY29kZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBleHBlY3QoZ2VuZXJhdG9yVW5kZXJUZXN0LmFzU3RyaW5nKFRpbWVjb2RlRm9ybWF0Lk1JTklNQUxfVElNRV9DT05WRVJTSU9OKSkudG9FcXVhbCgnNDcnKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgZGVzY3JpYmUoJ2ZvciBmcmFtZSBudW1iZXIgMTEyOCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIGdlbmVyYXRvclVuZGVyVGVzdC5zZXRGcm9tRnJhbWVOdW1iZXIoMTEyOCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdjYW4gZ2VuZXJhdGUgYSBub25kcm9wZnJhbWUgdGltZWNvZGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgZXhwZWN0KGdlbmVyYXRvclVuZGVyVGVzdC5hc1N0cmluZyhUaW1lY29kZUZvcm1hdC5OT05EUk9QRlJBTUUpKS50b0VxdWFsKCcwMDowMDo0NzowMCcpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnY2FuIGdlbmVyYXRlIGEgZHJvcGZyYW1lIHRpbWVjb2RlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGV4cGVjdChnZW5lcmF0b3JVbmRlclRlc3QuYXNTdHJpbmcoVGltZWNvZGVGb3JtYXQuRFJPUEZSQU1FKSkudG9FcXVhbCgnMDA6MDA6NDc7MDAnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2NhbiBnZW5lcmF0ZSBhIHNpbXBsZSB0aW1lIGNvbnZlcnNpb24gdGltZWNvZGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgZXhwZWN0KGdlbmVyYXRvclVuZGVyVGVzdC5hc1N0cmluZyhUaW1lY29kZUZvcm1hdC5TSU1QTEVfVElNRV9DT05WRVJTSU9OKSkudG9FcXVhbCgnMDA6MDA6NDc7MDEnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2NhbiBnZW5lcmF0ZSBhIG1pbmltYWwgdGltZSBjb252ZXJzaW9uIHRpbWVjb2RlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGV4cGVjdChnZW5lcmF0b3JVbmRlclRlc3QuYXNTdHJpbmcoVGltZWNvZGVGb3JtYXQuTUlOSU1BTF9USU1FX0NPTlZFUlNJT04pKS50b0VxdWFsKCc0NzswMScpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBkZXNjcmliZSgnZm9yIGZyYW1lIG51bWJlciAxNDQwJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gZ2VuZXJhdG9yVW5kZXJUZXN0LnNldEZyb21GcmFtZU51bWJlcigxNDQwKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2NhbiBnZW5lcmF0ZSBhIGRyb3BmcmFtZSB0aW1lY29kZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBleHBlY3QoZ2VuZXJhdG9yVW5kZXJUZXN0LmFzU3RyaW5nKFRpbWVjb2RlRm9ybWF0LkRST1BGUkFNRSkpLnRvRXF1YWwoJzAwOjAxOjAwOzAxJyk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGRlc2NyaWJlKCdmb3IgZnJhbWUgbnVtYmVyIDY0OTgnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBnZW5lcmF0b3JVbmRlclRlc3Quc2V0RnJvbUZyYW1lTnVtYmVyKDY0OTgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnY2FuIGdlbmVyYXRlIGEgbm9uZHJvcGZyYW1lIHRpbWVjb2RlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGV4cGVjdChnZW5lcmF0b3JVbmRlclRlc3QuYXNTdHJpbmcoVGltZWNvZGVGb3JtYXQuTk9ORFJPUEZSQU1FKSkudG9FcXVhbCgnMDA6MDQ6MzA6MTgnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2NhbiBnZW5lcmF0ZSBhIGRyb3BmcmFtZSB0aW1lY29kZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBleHBlY3QoZ2VuZXJhdG9yVW5kZXJUZXN0LmFzU3RyaW5nKFRpbWVjb2RlRm9ybWF0LkRST1BGUkFNRSkpLnRvRXF1YWwoJzAwOjA0OjMwOzIyJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdjYW4gZ2VuZXJhdGUgYSBzaW1wbGUgdGltZSBjb252ZXJzaW9uIHRpbWVjb2RlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGV4cGVjdChnZW5lcmF0b3JVbmRlclRlc3QuYXNTdHJpbmcoVGltZWNvZGVGb3JtYXQuU0lNUExFX1RJTUVfQ09OVkVSU0lPTikpLnRvRXF1YWwoJzAwOjA0OjMxOzAwJyk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGRlc2NyaWJlKCdmb3IgZnJhbWUgbnVtYmVyIDU2OTkxJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gZ2VuZXJhdG9yVW5kZXJUZXN0LnNldEZyb21GcmFtZU51bWJlcig1Njk5MSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdjYW4gZ2VuZXJhdGUgYSBub25kcm9wZnJhbWUgdGltZWNvZGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgZXhwZWN0KGdlbmVyYXRvclVuZGVyVGVzdC5hc1N0cmluZyhUaW1lY29kZUZvcm1hdC5OT05EUk9QRlJBTUUpKS50b0VxdWFsKCcwMDozOTozNDoxNScpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnY2FuIGdlbmVyYXRlIGEgZHJvcGZyYW1lIHRpbWVjb2RlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGV4cGVjdChnZW5lcmF0b3JVbmRlclRlc3QuYXNTdHJpbmcoVGltZWNvZGVGb3JtYXQuRFJPUEZSQU1FKSkudG9FcXVhbCgnMDA6Mzk6MzY7MDYnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2NhbiBnZW5lcmF0ZSBhIHNpbXBsZSB0aW1lIGNvbnZlcnNpb24gdGltZWNvZGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgZXhwZWN0KGdlbmVyYXRvclVuZGVyVGVzdC5hc1N0cmluZyhUaW1lY29kZUZvcm1hdC5TSU1QTEVfVElNRV9DT05WRVJTSU9OKSkudG9FcXVhbCgnMDA6Mzk6Mzc7MDAnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2NhbiBnZW5lcmF0ZSBhIG1pbmltYWwgdGltZSBjb252ZXJzaW9uIHRpbWVjb2RlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGV4cGVjdChnZW5lcmF0b3JVbmRlclRlc3QuYXNTdHJpbmcoVGltZWNvZGVGb3JtYXQuTUlOSU1BTF9USU1FX0NPTlZFUlNJT04pKS50b0VxdWFsKCczOTozNycpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBkZXNjcmliZSgnZm9yIGZyYW1lIG51bWJlciA5OTM1OScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIGdlbmVyYXRvclVuZGVyVGVzdC5zZXRGcm9tRnJhbWVOdW1iZXIoOTkzNTkpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnY2FuIGdlbmVyYXRlIGEgbm9uZHJvcGZyYW1lIHRpbWVjb2RlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGV4cGVjdChnZW5lcmF0b3JVbmRlclRlc3QuYXNTdHJpbmcoVGltZWNvZGVGb3JtYXQuTk9ORFJPUEZSQU1FKSkudG9FcXVhbCgnMDE6MDg6NTk6MjMnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2NhbiBnZW5lcmF0ZSBhIGRyb3BmcmFtZSB0aW1lY29kZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBleHBlY3QoZ2VuZXJhdG9yVW5kZXJUZXN0LmFzU3RyaW5nKFRpbWVjb2RlRm9ybWF0LkRST1BGUkFNRSkpLnRvRXF1YWwoJzAxOjA5OjAzOzAwJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdjYW4gZ2VuZXJhdGUgYSBzaW1wbGUgdGltZSBjb252ZXJzaW9uIHRpbWVjb2RlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGV4cGVjdChnZW5lcmF0b3JVbmRlclRlc3QuYXNTdHJpbmcoVGltZWNvZGVGb3JtYXQuU0lNUExFX1RJTUVfQ09OVkVSU0lPTikpLnRvRXF1YWwoJzAxOjA5OjA0OzAyJyk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGRlc2NyaWJlKCdmb3IgZnJhbWUgbnVtYmVyIDEwMDAwMCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIGdlbmVyYXRvclVuZGVyVGVzdC5zZXRGcm9tRnJhbWVOdW1iZXIoMTAwMDAwKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2NhbiBnZW5lcmF0ZSBhIGRyb3BmcmFtZSB0aW1lY29kZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBleHBlY3QoZ2VuZXJhdG9yVW5kZXJUZXN0LmFzU3RyaW5nKFRpbWVjb2RlRm9ybWF0LkRST1BGUkFNRSkpLnRvRXF1YWwoJzAxOjA5OjI5OzE3Jyk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGRlc2NyaWJlKCdmb3IgZnJhbWUgbnVtYmVyIDk5MzU5JywgZnVuY3Rpb24gKCkge1xuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gZ2VuZXJhdG9yVW5kZXJUZXN0LnNldEZyb21GcmFtZU51bWJlcig5OTM1OSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdjYW4gZ2VuZXJhdGUgYSBub25kcm9wZnJhbWUgdGltZWNvZGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgZXhwZWN0KGdlbmVyYXRvclVuZGVyVGVzdC5hc1N0cmluZyhUaW1lY29kZUZvcm1hdC5OT05EUk9QRlJBTUUpKS50b0VxdWFsKCcwMTowODo1OToyMycpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnY2FuIGdlbmVyYXRlIGEgZHJvcGZyYW1lIHRpbWVjb2RlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGV4cGVjdChnZW5lcmF0b3JVbmRlclRlc3QuYXNTdHJpbmcoVGltZWNvZGVGb3JtYXQuRFJPUEZSQU1FKSkudG9FcXVhbCgnMDE6MDk6MDM7MDAnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2NhbiBnZW5lcmF0ZSBhIHNpbXBsZSB0aW1lIGNvbnZlcnNpb24gdGltZWNvZGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgZXhwZWN0KGdlbmVyYXRvclVuZGVyVGVzdC5hc1N0cmluZyhUaW1lY29kZUZvcm1hdC5TSU1QTEVfVElNRV9DT05WRVJTSU9OKSkudG9FcXVhbCgnMDE6MDk6MDQ7MDInKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59XG4iXX0=
