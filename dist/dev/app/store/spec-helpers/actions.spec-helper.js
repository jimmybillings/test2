"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ActionsSpecHelper = (function () {
    function ActionsSpecHelper() {
    }
    ActionsSpecHelper.prototype.generateTestFor = function (parameters) {
        var methodName = parameters.factoryMethod.name;
        var optionalComment = parameters.comment ? " (" + parameters.comment + ")" : '';
        describe(methodName + "()", function () {
            it("creates the expected action" + optionalComment, function () {
                var factoryMethod = new parameters.factoryMethod.class()[methodName];
                if (!factoryMethod) {
                    fail("Could not find a method named '" + methodName + "' in the specified action factory.");
                }
                var createdAction = factoryMethod.apply(void 0, parameters.factoryMethod.parameters);
                var createdActionParameterCount = Object.keys(createdAction).length - 1;
                var expectedActionParameterCount = Object.keys(parameters.expectedAction).length - 1;
                if (createdActionParameterCount !== expectedActionParameterCount) {
                    fail("Expected created action to have"
                        + (" " + expectedActionParameterCount + " parameter" + (expectedActionParameterCount === 1 ? '' : 's') + ",")
                        + (" but it had " + createdActionParameterCount + "."));
                }
                Object.keys(createdAction).forEach(function (key) {
                    expect(createdAction[key]).toEqual(parameters.expectedAction[key]);
                });
            });
        });
    };
    return ActionsSpecHelper;
}());
exports.ActionsSpecHelper = ActionsSpecHelper;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9zcGVjLWhlbHBlcnMvYWN0aW9ucy5zcGVjLWhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQWdCQTtJQUFBO0lBOEJBLENBQUM7SUE3QlEsMkNBQWUsR0FBdEIsVUFBdUIsVUFBdUM7UUFDNUQsSUFBTSxVQUFVLEdBQVcsVUFBVSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUM7UUFDekQsSUFBTSxlQUFlLEdBQVcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBSyxVQUFVLENBQUMsT0FBTyxNQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUVyRixRQUFRLENBQUksVUFBVSxPQUFJLEVBQUU7WUFDMUIsRUFBRSxDQUFDLGdDQUE4QixlQUFpQixFQUFFO2dCQUNsRCxJQUFNLGFBQWEsR0FBSSxJQUFJLFVBQVUsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBRWhGLEVBQUUsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztvQkFDbkIsSUFBSSxDQUFDLG9DQUFrQyxVQUFVLHVDQUFvQyxDQUFDLENBQUM7Z0JBQ3pGLENBQUM7Z0JBRUQsSUFBTSxhQUFhLEdBQVEsYUFBYSxlQUFJLFVBQVUsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ2pGLElBQU0sMkJBQTJCLEdBQVcsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO2dCQUNsRixJQUFNLDRCQUE0QixHQUFXLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7Z0JBRS9GLEVBQUUsQ0FBQyxDQUFDLDJCQUEyQixLQUFLLDRCQUE0QixDQUFDLENBQUMsQ0FBQztvQkFDakUsSUFBSSxDQUFDLGlDQUFpQzsyQkFDbEMsTUFBSSw0QkFBNEIsbUJBQWEsNEJBQTRCLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBRyxDQUFBOzJCQUM3RixpQkFBZSwyQkFBMkIsTUFBRyxDQUFBLENBQ2hELENBQUM7Z0JBQ0osQ0FBQztnQkFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLEdBQUc7b0JBQ3BDLE1BQU0sQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNyRSxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0gsd0JBQUM7QUFBRCxDQTlCQSxBQThCQyxJQUFBO0FBOUJZLDhDQUFpQiIsImZpbGUiOiJhcHAvc3RvcmUvc3BlYy1oZWxwZXJzL2FjdGlvbnMuc3BlYy1oZWxwZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBY3Rpb24gfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGFyYW1ldGVyaXplZEFjdGlvbiBleHRlbmRzIEFjdGlvbiB7XG4gIFtwYXJhbWV0ZXJOYW1lOiBzdHJpbmddOiBhbnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWN0aW9uRmFjdG9yeVRlc3RQYXJhbWV0ZXJzIHtcbiAgY29tbWVudD86IHN0cmluZztcbiAgZmFjdG9yeU1ldGhvZDoge1xuICAgIGNsYXNzOiBhbnk7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIHBhcmFtZXRlcnM6IGFueVtdO1xuICB9O1xuICBleHBlY3RlZEFjdGlvbjogUGFyYW1ldGVyaXplZEFjdGlvbjtcbn1cblxuZXhwb3J0IGNsYXNzIEFjdGlvbnNTcGVjSGVscGVyIHtcbiAgcHVibGljIGdlbmVyYXRlVGVzdEZvcihwYXJhbWV0ZXJzOiBBY3Rpb25GYWN0b3J5VGVzdFBhcmFtZXRlcnMpOiB2b2lkIHtcbiAgICBjb25zdCBtZXRob2ROYW1lOiBzdHJpbmcgPSBwYXJhbWV0ZXJzLmZhY3RvcnlNZXRob2QubmFtZTtcbiAgICBjb25zdCBvcHRpb25hbENvbW1lbnQ6IHN0cmluZyA9IHBhcmFtZXRlcnMuY29tbWVudCA/IGAgKCR7cGFyYW1ldGVycy5jb21tZW50fSlgIDogJyc7XG5cbiAgICBkZXNjcmliZShgJHttZXRob2ROYW1lfSgpYCwgKCkgPT4ge1xuICAgICAgaXQoYGNyZWF0ZXMgdGhlIGV4cGVjdGVkIGFjdGlvbiR7b3B0aW9uYWxDb21tZW50fWAsICgpID0+IHtcbiAgICAgICAgY29uc3QgZmFjdG9yeU1ldGhvZCA9IChuZXcgcGFyYW1ldGVycy5mYWN0b3J5TWV0aG9kLmNsYXNzKCkgYXMgYW55KVttZXRob2ROYW1lXTtcblxuICAgICAgICBpZiAoIWZhY3RvcnlNZXRob2QpIHtcbiAgICAgICAgICBmYWlsKGBDb3VsZCBub3QgZmluZCBhIG1ldGhvZCBuYW1lZCAnJHttZXRob2ROYW1lfScgaW4gdGhlIHNwZWNpZmllZCBhY3Rpb24gZmFjdG9yeS5gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNyZWF0ZWRBY3Rpb246IGFueSA9IGZhY3RvcnlNZXRob2QoLi4ucGFyYW1ldGVycy5mYWN0b3J5TWV0aG9kLnBhcmFtZXRlcnMpO1xuICAgICAgICBjb25zdCBjcmVhdGVkQWN0aW9uUGFyYW1ldGVyQ291bnQ6IG51bWJlciA9IE9iamVjdC5rZXlzKGNyZWF0ZWRBY3Rpb24pLmxlbmd0aCAtIDE7IC8vIGV4Y2x1ZGUgJ3R5cGUnXG4gICAgICAgIGNvbnN0IGV4cGVjdGVkQWN0aW9uUGFyYW1ldGVyQ291bnQ6IG51bWJlciA9IE9iamVjdC5rZXlzKHBhcmFtZXRlcnMuZXhwZWN0ZWRBY3Rpb24pLmxlbmd0aCAtIDE7IC8vIGV4Y2x1ZGUgJ3R5cGUnXG5cbiAgICAgICAgaWYgKGNyZWF0ZWRBY3Rpb25QYXJhbWV0ZXJDb3VudCAhPT0gZXhwZWN0ZWRBY3Rpb25QYXJhbWV0ZXJDb3VudCkge1xuICAgICAgICAgIGZhaWwoYEV4cGVjdGVkIGNyZWF0ZWQgYWN0aW9uIHRvIGhhdmVgXG4gICAgICAgICAgICArIGAgJHtleHBlY3RlZEFjdGlvblBhcmFtZXRlckNvdW50fSBwYXJhbWV0ZXIke2V4cGVjdGVkQWN0aW9uUGFyYW1ldGVyQ291bnQgPT09IDEgPyAnJyA6ICdzJ30sYFxuICAgICAgICAgICAgKyBgIGJ1dCBpdCBoYWQgJHtjcmVhdGVkQWN0aW9uUGFyYW1ldGVyQ291bnR9LmBcbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgT2JqZWN0LmtleXMoY3JlYXRlZEFjdGlvbikuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgIGV4cGVjdChjcmVhdGVkQWN0aW9uW2tleV0pLnRvRXF1YWwocGFyYW1ldGVycy5leHBlY3RlZEFjdGlvbltrZXldKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuIl19
