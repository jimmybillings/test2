"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dateRange_1 = require("./dateRange");
function main() {
    describe('Date Range', function () {
        var rangeUnderTest;
        beforeEach(function () {
            rangeUnderTest = new dateRange_1.DateRange();
        });
        describe('get()', function () {
            it('returns the start value for "start"', function () {
                rangeUnderTest.start = '2000-01-01';
                expect(rangeUnderTest.get('start')).toEqual('2000-01-01');
            });
            it('returns the end value for "end"', function () {
                rangeUnderTest.end = '2000-12-31';
                expect(rangeUnderTest.get('end')).toEqual('2000-12-31');
            });
            it('throws an error for an unknown range key', function () {
                expect(function () { return rangeUnderTest.get('huh?'); }).toThrowError(TypeError);
            });
        });
        describe('set()', function () {
            it('sets the start value', function () {
                rangeUnderTest.set('start', '2001-02-03');
                expect(rangeUnderTest.start).toEqual('2001-02-03');
                expect(rangeUnderTest.end).toBeNull();
            });
            it('sets the start value to null for the beginning of time', function () {
                rangeUnderTest.set('start', '1000-01-01');
                expect(rangeUnderTest.start).toBeNull();
            });
            it('formats the start value', function () {
                rangeUnderTest.set('start', 'Feb 3 2001');
                expect(rangeUnderTest.start).toEqual('2001-02-03');
            });
            it('sets the end value', function () {
                rangeUnderTest.set('end', '2001-03-04');
                expect(rangeUnderTest.start).toBeNull();
                expect(rangeUnderTest.end).toEqual('2001-03-04');
            });
            it('sets the end value to null for the end of time', function () {
                rangeUnderTest.set('end', '3000-01-01');
                expect(rangeUnderTest.end).toBeNull();
            });
            it('formats the end value', function () {
                rangeUnderTest.set('end', 'Mar 4 2001');
                expect(rangeUnderTest.end).toEqual('2001-03-04');
            });
            it('sets the start value from a range string', function () {
                rangeUnderTest.set('start', '2001-05-06 - 2001-06-07');
                expect(rangeUnderTest.start).toEqual('2001-05-06');
                expect(rangeUnderTest.end).toBeNull();
            });
            it('sets the end value from a range string', function () {
                rangeUnderTest.set('end', '2001-07-08 - 2001-08-09');
                expect(rangeUnderTest.start).toBeNull();
                expect(rangeUnderTest.end).toEqual('2001-08-09');
            });
            it('throws an error for an unknown range key', function () {
                expect(function () { return rangeUnderTest.set('what?', '2001-03-04'); }).toThrowError(TypeError);
            });
            it('throws an error for an unparseable date', function () {
                expect(function () { return rangeUnderTest.set('start', 'not a date'); }).toThrowError(TypeError);
            });
        });
        describe('toString()', function () {
            it('returns the right range when start and end are set', function () {
                rangeUnderTest.start = '2002-07-07';
                rangeUnderTest.end = '2003-08-08';
                expect(rangeUnderTest.toString()).toEqual('2002-07-07 - 2003-08-08');
            });
            it('returns the right range when only start is set', function () {
                rangeUnderTest.start = '2005-12-12';
                expect(rangeUnderTest.toString()).toEqual('2005-12-12 - 3000-01-01');
            });
            it('returns the right range when only end is set', function () {
                rangeUnderTest.end = '2004-09-09';
                expect(rangeUnderTest.toString()).toEqual('1000-01-01 - 2004-09-09');
            });
            it('returns the right range when neither start nor end is set', function () {
                expect(rangeUnderTest.toString()).toEqual('1000-01-01 - 3000-01-01');
            });
        });
        describe('toHumanString()', function () {
            it('returns the right string when start and end are set', function () {
                rangeUnderTest.start = '2007-05-22';
                rangeUnderTest.end = '2007-05-22';
                expect(rangeUnderTest.toHumanString()).toEqual('5/22/2007 - 5/22/2007');
            });
            it('returns the right string when only start is set', function () {
                rangeUnderTest.start = '2009-04-23';
                expect(rangeUnderTest.toHumanString()).toEqual('On or after 4/23/2009');
            });
            it('returns the right string when only end is set', function () {
                rangeUnderTest.end = '1998-09-27';
                expect(rangeUnderTest.toHumanString()).toEqual('On or before 9/27/1998');
            });
            it('returns the right string when neither start nor end is set', function () {
                expect(rangeUnderTest.toHumanString()).toEqual('Any date');
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvdXRpbGl0aWVzL2RhdGVSYW5nZS5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEseUNBQXdDO0FBRXhDO0lBQ0UsUUFBUSxDQUFDLFlBQVksRUFBRTtRQUNyQixJQUFJLGNBQXlCLENBQUM7UUFFOUIsVUFBVSxDQUFDO1lBQ1QsY0FBYyxHQUFHLElBQUkscUJBQVMsRUFBRSxDQUFDO1FBQ25DLENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLE9BQU8sRUFBRTtZQUNoQixFQUFFLENBQUMscUNBQXFDLEVBQUU7Z0JBQ3hDLGNBQWMsQ0FBQyxLQUFLLEdBQUcsWUFBWSxDQUFDO2dCQUVwQyxNQUFNLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUM1RCxDQUFDLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQyxpQ0FBaUMsRUFBRTtnQkFDcEMsY0FBYyxDQUFDLEdBQUcsR0FBRyxZQUFZLENBQUM7Z0JBRWxDLE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzFELENBQUMsQ0FBQyxDQUFDO1lBRUgsRUFBRSxDQUFDLDBDQUEwQyxFQUFFO2dCQUM3QyxNQUFNLENBQUMsY0FBTSxPQUFBLGNBQWMsQ0FBQyxHQUFHLENBQU0sTUFBTSxDQUFDLEVBQS9CLENBQStCLENBQUMsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDeEUsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxPQUFPLEVBQUU7WUFDaEIsRUFBRSxDQUFDLHNCQUFzQixFQUFFO2dCQUN6QixjQUFjLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUMsQ0FBQztnQkFFMUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENB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aURBQWlELEVBQUU7Z0JBQ3BELGNBQWMsQ0FBQyxLQUFLLEdBQUcsWUFBWSxDQUFDO2dCQUVwQyxNQUFNLENBQUMsY0FBYyxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLHVCQUF1QixDQUFDLENBQUM7WUFDMUUsQ0FBQyxDQUFDLENBQUM7WUFFSCxFQUFFLENBQUMsK0NBQStDLEVBQUU7Z0JBQ2xELGNBQWMsQ0FBQyxHQUFHLEdBQUcsWUFBWSxDQUFDO2dCQUVsQyxNQUFNLENBQUMsY0FBYyxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLHdCQUF3QixDQUFDLENBQUM7WUFDM0UsQ0FBQyxDQUFDLENBQUM7WUFFSCxFQUFFLENBQUMsNERBQTRELEVBQUU7Z0JBQy9ELE1BQU0sQ0FBQyxjQUFjLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDN0QsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQTFJRCxvQkEwSUMiLCJmaWxlIjoiYXBwL3NoYXJlZC91dGlsaXRpZXMvZGF0ZVJhbmdlLnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEYXRlUmFuZ2UgfSBmcm9tICcuL2RhdGVSYW5nZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBkZXNjcmliZSgnRGF0ZSBSYW5nZScsICgpID0+IHtcbiAgICBsZXQgcmFuZ2VVbmRlclRlc3Q6IERhdGVSYW5nZTtcblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgcmFuZ2VVbmRlclRlc3QgPSBuZXcgRGF0ZVJhbmdlKCk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZ2V0KCknLCAoKSA9PiB7XG4gICAgICBpdCgncmV0dXJucyB0aGUgc3RhcnQgdmFsdWUgZm9yIFwic3RhcnRcIicsICgpID0+IHtcbiAgICAgICAgcmFuZ2VVbmRlclRlc3Quc3RhcnQgPSAnMjAwMC0wMS0wMSc7XG5cbiAgICAgICAgZXhwZWN0KHJhbmdlVW5kZXJUZXN0LmdldCgnc3RhcnQnKSkudG9FcXVhbCgnMjAwMC0wMS0wMScpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIHRoZSBlbmQgdmFsdWUgZm9yIFwiZW5kXCInLCAoKSA9PiB7XG4gICAgICAgIHJhbmdlVW5kZXJUZXN0LmVuZCA9ICcyMDAwLTEyLTMxJztcblxuICAgICAgICBleHBlY3QocmFuZ2VVbmRlclRlc3QuZ2V0KCdlbmQnKSkudG9FcXVhbCgnMjAwMC0xMi0zMScpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCd0aHJvd3MgYW4gZXJyb3IgZm9yIGFuIHVua25vd24gcmFuZ2Uga2V5JywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoKCkgPT4gcmFuZ2VVbmRlclRlc3QuZ2V0KDxhbnk+J2h1aD8nKSkudG9UaHJvd0Vycm9yKFR5cGVFcnJvcik7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdzZXQoKScsICgpID0+IHtcbiAgICAgIGl0KCdzZXRzIHRoZSBzdGFydCB2YWx1ZScsICgpID0+IHtcbiAgICAgICAgcmFuZ2VVbmRlclRlc3Quc2V0KCdzdGFydCcsICcyMDAxLTAyLTAzJyk7XG5cbiAgICAgICAgZXhwZWN0KHJhbmdlVW5kZXJUZXN0LnN0YXJ0KS50b0VxdWFsKCcyMDAxLTAyLTAzJyk7XG4gICAgICAgIGV4cGVjdChyYW5nZVVuZGVyVGVzdC5lbmQpLnRvQmVOdWxsKCk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3NldHMgdGhlIHN0YXJ0IHZhbHVlIHRvIG51bGwgZm9yIHRoZSBiZWdpbm5pbmcgb2YgdGltZScsICgpID0+IHtcbiAgICAgICAgcmFuZ2VVbmRlclRlc3Quc2V0KCdzdGFydCcsICcxMDAwLTAxLTAxJyk7XG5cbiAgICAgICAgZXhwZWN0KHJhbmdlVW5kZXJUZXN0LnN0YXJ0KS50b0JlTnVsbCgpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdmb3JtYXRzIHRoZSBzdGFydCB2YWx1ZScsICgpID0+IHtcbiAgICAgICAgcmFuZ2VVbmRlclRlc3Quc2V0KCdzdGFydCcsICdGZWIgMyAyMDAxJyk7XG5cbiAgICAgICAgZXhwZWN0KHJhbmdlVW5kZXJUZXN0LnN0YXJ0KS50b0VxdWFsKCcyMDAxLTAyLTAzJyk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3NldHMgdGhlIGVuZCB2YWx1ZScsICgpID0+IHtcbiAgICAgICAgcmFuZ2VVbmRlclRlc3Quc2V0KCdlbmQnLCAnMjAwMS0wMy0wNCcpO1xuXG4gICAgICAgIGV4cGVjdChyYW5nZVVuZGVyVGVzdC5zdGFydCkudG9CZU51bGwoKTtcbiAgICAgICAgZXhwZWN0KHJhbmdlVW5kZXJUZXN0LmVuZCkudG9FcXVhbCgnMjAwMS0wMy0wNCcpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdzZXRzIHRoZSBlbmQgdmFsdWUgdG8gbnVsbCBmb3IgdGhlIGVuZCBvZiB0aW1lJywgKCkgPT4ge1xuICAgICAgICByYW5nZVVuZGVyVGVzdC5zZXQoJ2VuZCcsICczMDAwLTAxLTAxJyk7XG5cbiAgICAgICAgZXhwZWN0KHJhbmdlVW5kZXJUZXN0LmVuZCkudG9CZU51bGwoKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnZm9ybWF0cyB0aGUgZW5kIHZhbHVlJywgKCkgPT4ge1xuICAgICAgICByYW5nZVVuZGVyVGVzdC5zZXQoJ2VuZCcsICdNYXIgNCAyMDAxJyk7XG5cbiAgICAgICAgZXhwZWN0KHJhbmdlVW5kZXJUZXN0LmVuZCkudG9FcXVhbCgnMjAwMS0wMy0wNCcpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdzZXRzIHRoZSBzdGFydCB2YWx1ZSBmcm9tIGEgcmFuZ2Ugc3RyaW5nJywgKCkgPT4ge1xuICAgICAgICByYW5nZVVuZGVyVGVzdC5zZXQoJ3N0YXJ0JywgJzIwMDEtMDUtMDYgLSAyMDAxLTA2LTA3Jyk7XG5cbiAgICAgICAgZXhwZWN0KHJhbmdlVW5kZXJUZXN0LnN0YXJ0KS50b0VxdWFsKCcyMDAxLTA1LTA2Jyk7XG4gICAgICAgIGV4cGVjdChyYW5nZVVuZGVyVGVzdC5lbmQpLnRvQmVOdWxsKCk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3NldHMgdGhlIGVuZCB2YWx1ZSBmcm9tIGEgcmFuZ2Ugc3RyaW5nJywgKCkgPT4ge1xuICAgICAgICByYW5nZVVuZGVyVGVzdC5zZXQoJ2VuZCcsICcyMDAxLTA3LTA4IC0gMjAwMS0wOC0wOScpO1xuXG4gICAgICAgIGV4cGVjdChyYW5nZVVuZGVyVGVzdC5zdGFydCkudG9CZU51bGwoKTtcbiAgICAgICAgZXhwZWN0KHJhbmdlVW5kZXJUZXN0LmVuZCkudG9FcXVhbCgnMjAwMS0wOC0wOScpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCd0aHJvd3MgYW4gZXJyb3IgZm9yIGFuIHVua25vd24gcmFuZ2Uga2V5JywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoKCkgPT4gcmFuZ2VVbmRlclRlc3Quc2V0KDxhbnk+J3doYXQ/JywgJzIwMDEtMDMtMDQnKSkudG9UaHJvd0Vycm9yKFR5cGVFcnJvcik7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3Rocm93cyBhbiBlcnJvciBmb3IgYW4gdW5wYXJzZWFibGUgZGF0ZScsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KCgpID0+IHJhbmdlVW5kZXJUZXN0LnNldCgnc3RhcnQnLCAnbm90IGEgZGF0ZScpKS50b1Rocm93RXJyb3IoVHlwZUVycm9yKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3RvU3RyaW5nKCknLCAoKSA9PiB7XG4gICAgICBpdCgncmV0dXJucyB0aGUgcmlnaHQgcmFuZ2Ugd2hlbiBzdGFydCBhbmQgZW5kIGFyZSBzZXQnLCAoKSA9PiB7XG4gICAgICAgIHJhbmdlVW5kZXJUZXN0LnN0YXJ0ID0gJzIwMDItMDctMDcnO1xuICAgICAgICByYW5nZVVuZGVyVGVzdC5lbmQgPSAnMjAwMy0wOC0wOCc7XG5cbiAgICAgICAgZXhwZWN0KHJhbmdlVW5kZXJUZXN0LnRvU3RyaW5nKCkpLnRvRXF1YWwoJzIwMDItMDctMDcgLSAyMDAzLTA4LTA4Jyk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3JldHVybnMgdGhlIHJpZ2h0IHJhbmdlIHdoZW4gb25seSBzdGFydCBpcyBzZXQnLCAoKSA9PiB7XG4gICAgICAgIHJhbmdlVW5kZXJUZXN0LnN0YXJ0ID0gJzIwMDUtMTItMTInO1xuXG4gICAgICAgIGV4cGVjdChyYW5nZVVuZGVyVGVzdC50b1N0cmluZygpKS50b0VxdWFsKCcyMDA1LTEyLTEyIC0gMzAwMC0wMS0wMScpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIHRoZSByaWdodCByYW5nZSB3aGVuIG9ubHkgZW5kIGlzIHNldCcsICgpID0+IHtcbiAgICAgICAgcmFuZ2VVbmRlclRlc3QuZW5kID0gJzIwMDQtMDktMDknO1xuXG4gICAgICAgIGV4cGVjdChyYW5nZVVuZGVyVGVzdC50b1N0cmluZygpKS50b0VxdWFsKCcxMDAwLTAxLTAxIC0gMjAwNC0wOS0wOScpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIHRoZSByaWdodCByYW5nZSB3aGVuIG5laXRoZXIgc3RhcnQgbm9yIGVuZCBpcyBzZXQnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChyYW5nZVVuZGVyVGVzdC50b1N0cmluZygpKS50b0VxdWFsKCcxMDAwLTAxLTAxIC0gMzAwMC0wMS0wMScpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgndG9IdW1hblN0cmluZygpJywgKCkgPT4ge1xuICAgICAgaXQoJ3JldHVybnMgdGhlIHJpZ2h0IHN0cmluZyB3aGVuIHN0YXJ0IGFuZCBlbmQgYXJlIHNldCcsICgpID0+IHtcbiAgICAgICAgcmFuZ2VVbmRlclRlc3Quc3RhcnQgPSAnMjAwNy0wNS0yMic7XG4gICAgICAgIHJhbmdlVW5kZXJUZXN0LmVuZCA9ICcyMDA3LTA1LTIyJztcblxuICAgICAgICBleHBlY3QocmFuZ2VVbmRlclRlc3QudG9IdW1hblN0cmluZygpKS50b0VxdWFsKCc1LzIyLzIwMDcgLSA1LzIyLzIwMDcnKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgncmV0dXJucyB0aGUgcmlnaHQgc3RyaW5nIHdoZW4gb25seSBzdGFydCBpcyBzZXQnLCAoKSA9PiB7XG4gICAgICAgIHJhbmdlVW5kZXJUZXN0LnN0YXJ0ID0gJzIwMDktMDQtMjMnO1xuXG4gICAgICAgIGV4cGVjdChyYW5nZVVuZGVyVGVzdC50b0h1bWFuU3RyaW5nKCkpLnRvRXF1YWwoJ09uIG9yIGFmdGVyIDQvMjMvMjAwOScpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIHRoZSByaWdodCBzdHJpbmcgd2hlbiBvbmx5IGVuZCBpcyBzZXQnLCAoKSA9PiB7XG4gICAgICAgIHJhbmdlVW5kZXJUZXN0LmVuZCA9ICcxOTk4LTA5LTI3JztcblxuICAgICAgICBleHBlY3QocmFuZ2VVbmRlclRlc3QudG9IdW1hblN0cmluZygpKS50b0VxdWFsKCdPbiBvciBiZWZvcmUgOS8yNy8xOTk4Jyk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3JldHVybnMgdGhlIHJpZ2h0IHN0cmluZyB3aGVuIG5laXRoZXIgc3RhcnQgbm9yIGVuZCBpcyBzZXQnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChyYW5nZVVuZGVyVGVzdC50b0h1bWFuU3RyaW5nKCkpLnRvRXF1YWwoJ0FueSBkYXRlJyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59XG4iXX0=
