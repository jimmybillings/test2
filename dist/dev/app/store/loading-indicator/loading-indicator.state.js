"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LoadingIndicatorActions = require("./loading-indicator.actions");
exports.initialState = {
    show: false
};
function reducer(state, action) {
    if (state === void 0) { state = exports.initialState; }
    if (state === null)
        state = exports.initialState;
    switch (action.type) {
        case LoadingIndicatorActions.Show.Type: {
            return { show: true };
        }
        case LoadingIndicatorActions.Hide.Type: {
            return { show: false };
        }
        default: {
            return state;
        }
    }
}
exports.reducer = reducer;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9sb2FkaW5nLWluZGljYXRvci9sb2FkaW5nLWluZGljYXRvci5zdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHFFQUF1RTtBQU0xRCxRQUFBLFlBQVksR0FBVTtJQUNqQyxJQUFJLEVBQUUsS0FBSztDQUNaLENBQUM7QUFFRixpQkFBd0IsS0FBMkIsRUFBRSxNQUFtQztJQUFoRSxzQkFBQSxFQUFBLFFBQWUsb0JBQVk7SUFDakQsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQztRQUFDLEtBQUssR0FBRyxvQkFBWSxDQUFDO0lBRXpDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBRXBCLEtBQUssdUJBQXVCLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3ZDLE1BQU0sQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQztRQUN4QixDQUFDO1FBRUQsS0FBSyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDdkMsTUFBTSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDO1FBQ3pCLENBQUM7UUFFRCxTQUFTLENBQUM7WUFDUixNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2YsQ0FBQztJQUVILENBQUM7QUFDSCxDQUFDO0FBbEJELDBCQWtCQyIsImZpbGUiOiJhcHAvc3RvcmUvbG9hZGluZy1pbmRpY2F0b3IvbG9hZGluZy1pbmRpY2F0b3Iuc3RhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBMb2FkaW5nSW5kaWNhdG9yQWN0aW9ucyBmcm9tICcuL2xvYWRpbmctaW5kaWNhdG9yLmFjdGlvbnMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFN0YXRlIHtcbiAgc2hvdzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNvbnN0IGluaXRpYWxTdGF0ZTogU3RhdGUgPSB7XG4gIHNob3c6IGZhbHNlXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gcmVkdWNlcihzdGF0ZTogU3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbjogTG9hZGluZ0luZGljYXRvckFjdGlvbnMuQW55KTogU3RhdGUge1xuICBpZiAoc3RhdGUgPT09IG51bGwpIHN0YXRlID0gaW5pdGlhbFN0YXRlO1xuXG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcblxuICAgIGNhc2UgTG9hZGluZ0luZGljYXRvckFjdGlvbnMuU2hvdy5UeXBlOiB7XG4gICAgICByZXR1cm4geyBzaG93OiB0cnVlIH07XG4gICAgfVxuXG4gICAgY2FzZSBMb2FkaW5nSW5kaWNhdG9yQWN0aW9ucy5IaWRlLlR5cGU6IHtcbiAgICAgIHJldHVybiB7IHNob3c6IGZhbHNlIH07XG4gICAgfVxuXG4gICAgZGVmYXVsdDoge1xuICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cblxuICB9XG59XG4iXX0=
