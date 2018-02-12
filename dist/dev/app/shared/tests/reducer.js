"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function addStandardReducerTestsFor(reducer, actionType, initialState, payload, currentState) {
    if (payload === void 0) { payload = { some: 'payload' }; }
    if (currentState === void 0) { currentState = initialState; }
    describe('Reducer (standard tests)', function () {
        it('does not fail with a null current state', function () {
            expect(function () { return reducer(null, { type: actionType, payload: payload }); }).not.toThrow();
        });
        it('does not directly mutate the current state', function () {
            var currentStateSnapshot = JSON.stringify(currentState);
            reducer(currentState, { type: actionType, payload: payload });
            expect(JSON.stringify(currentState)).toEqual(currentStateSnapshot);
        });
    });
}
exports.addStandardReducerTestsFor = addStandardReducerTestsFor;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvdGVzdHMvcmVkdWNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUlBLG9DQUNFLE9BQTJCLEVBQzNCLFVBQWtCLEVBQ2xCLFlBQWlCLEVBQ2pCLE9BQWtDLEVBQ2xDLFlBQWdDO0lBRGhDLHdCQUFBLEVBQUEsWUFBaUIsSUFBSSxFQUFFLFNBQVMsRUFBRTtJQUNsQyw2QkFBQSxFQUFBLDJCQUFnQztJQUVoQyxRQUFRLENBQUMsMEJBQTBCLEVBQUU7UUFDbkMsRUFBRSxDQUFDLHlDQUF5QyxFQUFFO1lBQzVDLE1BQU0sQ0FBQyxjQUFNLE9BQUEsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBWSxDQUFDLEVBQS9ELENBQStELENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDOUYsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsNENBQTRDLEVBQUU7WUFDL0MsSUFBTSxvQkFBb0IsR0FBVyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBRWxFLE9BQU8sQ0FBQyxZQUFZLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQVksQ0FBQyxDQUFDO1lBRXhFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDckUsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFwQkQsZ0VBb0JDIiwiZmlsZSI6ImFwcC9zaGFyZWQvdGVzdHMvcmVkdWNlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFjdGlvblJlZHVjZXIsIEFjdGlvbiB9IGZyb20gJ0BuZ3J4L3N0b3JlJztcblxuLy8gVE9ETzogVGhpcyBmaWxlIGNhbiBiZSBkZWxldGVkIG9uY2UgYWxsIHN0b3Jlcy9yZWR1Y2VycyBhcmUgbW92ZWQgdG8gdGhlIG5ldyBBcHBTdG9yZS5cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZFN0YW5kYXJkUmVkdWNlclRlc3RzRm9yKFxuICByZWR1Y2VyOiBBY3Rpb25SZWR1Y2VyPGFueT4sXG4gIGFjdGlvblR5cGU6IHN0cmluZyxcbiAgaW5pdGlhbFN0YXRlOiBhbnksXG4gIHBheWxvYWQ6IGFueSA9IHsgc29tZTogJ3BheWxvYWQnIH0sXG4gIGN1cnJlbnRTdGF0ZTogYW55ID0gaW5pdGlhbFN0YXRlXG4pIHtcbiAgZGVzY3JpYmUoJ1JlZHVjZXIgKHN0YW5kYXJkIHRlc3RzKScsICgpID0+IHtcbiAgICBpdCgnZG9lcyBub3QgZmFpbCB3aXRoIGEgbnVsbCBjdXJyZW50IHN0YXRlJywgKCkgPT4ge1xuICAgICAgZXhwZWN0KCgpID0+IHJlZHVjZXIobnVsbCwgeyB0eXBlOiBhY3Rpb25UeXBlLCBwYXlsb2FkOiBwYXlsb2FkIH0gYXMgQWN0aW9uKSkubm90LnRvVGhyb3coKTtcbiAgICB9KTtcblxuICAgIGl0KCdkb2VzIG5vdCBkaXJlY3RseSBtdXRhdGUgdGhlIGN1cnJlbnQgc3RhdGUnLCAoKSA9PiB7XG4gICAgICBjb25zdCBjdXJyZW50U3RhdGVTbmFwc2hvdDogc3RyaW5nID0gSlNPTi5zdHJpbmdpZnkoY3VycmVudFN0YXRlKTtcblxuICAgICAgcmVkdWNlcihjdXJyZW50U3RhdGUsIHsgdHlwZTogYWN0aW9uVHlwZSwgcGF5bG9hZDogcGF5bG9hZCB9IGFzIEFjdGlvbik7XG5cbiAgICAgIGV4cGVjdChKU09OLnN0cmluZ2lmeShjdXJyZW50U3RhdGUpKS50b0VxdWFsKGN1cnJlbnRTdGF0ZVNuYXBzaG90KTtcbiAgICB9KTtcbiAgfSk7XG59XG4iXX0=
