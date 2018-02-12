"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customMatchers = {
    toRoundTripViaStringForFrameNumber: function () {
        return {
            compare: function (actual, expected) {
                var string = actual.setFromFrameNumber(expected.frameNumber).asString(expected.format);
                var frameNumberAfterRoundTrip = actual.setFromString(string, expected.format).asFrameNumber();
                var result;
                result.pass = frameNumberAfterRoundTrip === expected.frameNumber;
                if (result.pass) {
                    result.message =
                        "expected frame  " + expected.frameNumber + " not to round trip via '" + string + "' (" + expected.format + ")"
                            + (" at " + actual.framesPerSecond + " fps, but it did");
                }
                else {
                    var stringAfterRoundTrip = actual.setFromFrameNumber(frameNumberAfterRoundTrip).asString(expected.format);
                    result.message =
                        "expected frame " + expected.frameNumber + " to round trip via '" + string + "' (" + expected.format + ")"
                            + (" at " + actual.framesPerSecond + " fps, but it ended up as " + frameNumberAfterRoundTrip + ",")
                            + (" which translates to '" + stringAfterRoundTrip + "'");
                }
                return result;
            }
        };
    }
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kdWxlcy93YXplZS1mcmFtZS1mb3JtYXR0ZXIvc3VwcG9ydC9jdXN0b21NYXRjaGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdhLFFBQUEsY0FBYyxHQUFHO0lBQzVCLGtDQUFrQyxFQUFFO1FBQ2xDLE1BQU0sQ0FBQztZQUNMLE9BQU8sRUFBRSxVQUFDLE1BQWEsRUFBRSxRQUF5RDtnQkFDaEYsSUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN6RixJQUFNLHlCQUF5QixHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxhQUFhLEVBQUUsQ0FBQztnQkFDaEcsSUFBSSxNQUFtQyxDQUFDO2dCQUV4QyxNQUFNLENBQUMsSUFBSSxHQUFHLHlCQUF5QixLQUFLLFFBQVEsQ0FBQyxXQUFXLENBQUM7Z0JBRWpFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUNoQixNQUFNLENBQUMsT0FBTzt3QkFDWixxQkFBbUIsUUFBUSxDQUFDLFdBQVcsZ0NBQTJCLE1BQU0sV0FBTSxRQUFRLENBQUMsTUFBTSxNQUFHOytCQUM5RixTQUFPLE1BQU0sQ0FBQyxlQUFlLHFCQUFrQixDQUFBLENBQUM7Z0JBQ3RELENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ04sSUFBTSxvQkFBb0IsR0FBRyxNQUFNLENBQUMsa0JBQWtCLENBQUMseUJBQXlCLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUU1RyxNQUFNLENBQUMsT0FBTzt3QkFDWixvQkFBa0IsUUFBUSxDQUFDLFdBQVcsNEJBQXVCLE1BQU0sV0FBTSxRQUFRLENBQUMsTUFBTSxNQUFHOytCQUN6RixTQUFPLE1BQU0sQ0FBQyxlQUFlLGlDQUE0Qix5QkFBeUIsTUFBRyxDQUFBOytCQUNyRiwyQkFBeUIsb0JBQW9CLE1BQUcsQ0FBQSxDQUFDO2dCQUN2RCxDQUFDO2dCQUVELE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFDaEIsQ0FBQztTQUNGLENBQUM7SUFDSixDQUFDO0NBQ0YsQ0FBQyIsImZpbGUiOiJhcHAvc2hhcmVkL21vZHVsZXMvd2F6ZWUtZnJhbWUtZm9ybWF0dGVyL3N1cHBvcnQvY3VzdG9tTWF0Y2hlcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGcmFtZSB9IGZyb20gJy4uL2ZyYW1lJztcbmltcG9ydCB7IFRpbWVjb2RlRm9ybWF0IH0gZnJvbSAnLi4vdGltZWNvZGVGb3JtYXQnO1xuXG5leHBvcnQgY29uc3QgY3VzdG9tTWF0Y2hlcnMgPSB7XG4gIHRvUm91bmRUcmlwVmlhU3RyaW5nRm9yRnJhbWVOdW1iZXI6ICgpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgY29tcGFyZTogKGFjdHVhbDogRnJhbWUsIGV4cGVjdGVkOiB7IGZyYW1lTnVtYmVyOiBudW1iZXIsIGZvcm1hdDogVGltZWNvZGVGb3JtYXQgfSk6IGphc21pbmUuQ3VzdG9tTWF0Y2hlclJlc3VsdCA9PiB7XG4gICAgICAgIGNvbnN0IHN0cmluZyA9IGFjdHVhbC5zZXRGcm9tRnJhbWVOdW1iZXIoZXhwZWN0ZWQuZnJhbWVOdW1iZXIpLmFzU3RyaW5nKGV4cGVjdGVkLmZvcm1hdCk7XG4gICAgICAgIGNvbnN0IGZyYW1lTnVtYmVyQWZ0ZXJSb3VuZFRyaXAgPSBhY3R1YWwuc2V0RnJvbVN0cmluZyhzdHJpbmcsIGV4cGVjdGVkLmZvcm1hdCkuYXNGcmFtZU51bWJlcigpO1xuICAgICAgICBsZXQgcmVzdWx0OiBqYXNtaW5lLkN1c3RvbU1hdGNoZXJSZXN1bHQ7XG5cbiAgICAgICAgcmVzdWx0LnBhc3MgPSBmcmFtZU51bWJlckFmdGVyUm91bmRUcmlwID09PSBleHBlY3RlZC5mcmFtZU51bWJlcjtcblxuICAgICAgICBpZiAocmVzdWx0LnBhc3MpIHtcbiAgICAgICAgICByZXN1bHQubWVzc2FnZSA9XG4gICAgICAgICAgICBgZXhwZWN0ZWQgZnJhbWUgICR7ZXhwZWN0ZWQuZnJhbWVOdW1iZXJ9IG5vdCB0byByb3VuZCB0cmlwIHZpYSAnJHtzdHJpbmd9JyAoJHtleHBlY3RlZC5mb3JtYXR9KWBcbiAgICAgICAgICAgICsgYCBhdCAke2FjdHVhbC5mcmFtZXNQZXJTZWNvbmR9IGZwcywgYnV0IGl0IGRpZGA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3Qgc3RyaW5nQWZ0ZXJSb3VuZFRyaXAgPSBhY3R1YWwuc2V0RnJvbUZyYW1lTnVtYmVyKGZyYW1lTnVtYmVyQWZ0ZXJSb3VuZFRyaXApLmFzU3RyaW5nKGV4cGVjdGVkLmZvcm1hdCk7XG5cbiAgICAgICAgICByZXN1bHQubWVzc2FnZSA9XG4gICAgICAgICAgICBgZXhwZWN0ZWQgZnJhbWUgJHtleHBlY3RlZC5mcmFtZU51bWJlcn0gdG8gcm91bmQgdHJpcCB2aWEgJyR7c3RyaW5nfScgKCR7ZXhwZWN0ZWQuZm9ybWF0fSlgXG4gICAgICAgICAgICArIGAgYXQgJHthY3R1YWwuZnJhbWVzUGVyU2Vjb25kfSBmcHMsIGJ1dCBpdCBlbmRlZCB1cCBhcyAke2ZyYW1lTnVtYmVyQWZ0ZXJSb3VuZFRyaXB9LGBcbiAgICAgICAgICAgICsgYCB3aGljaCB0cmFuc2xhdGVzIHRvICcke3N0cmluZ0FmdGVyUm91bmRUcmlwfSdgO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH1cbiAgICB9O1xuICB9XG59O1xuIl19
