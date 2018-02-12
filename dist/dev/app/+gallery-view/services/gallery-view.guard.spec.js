"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gallery_view_guard_1 = require("./gallery-view.guard");
function main() {
    describe('Gallery View Guard', function () {
        var guardUnderTest;
        beforeEach(function () {
            guardUnderTest = new gallery_view_guard_1.GalleryViewGuard();
        });
        it('canActivate() should return a fake true for now', function () {
            expect(guardUnderTest.canActivate()).toBe(true);
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rZ2FsbGVyeS12aWV3L3NlcnZpY2VzL2dhbGxlcnktdmlldy5ndWFyZC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkRBQXdEO0FBRXhEO0lBQ0UsUUFBUSxDQUFDLG9CQUFvQixFQUFFO1FBQzdCLElBQUksY0FBZ0MsQ0FBQztRQUVyQyxVQUFVLENBQUM7WUFDVCxjQUFjLEdBQUcsSUFBSSxxQ0FBZ0IsRUFBRSxDQUFDO1FBQzFDLENBQUMsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLGlEQUFpRCxFQUFFO1lBQ3BELE1BQU0sQ0FBQyxjQUFjLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEQsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFaRCxvQkFZQyIsImZpbGUiOiJhcHAvK2dhbGxlcnktdmlldy9zZXJ2aWNlcy9nYWxsZXJ5LXZpZXcuZ3VhcmQuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdhbGxlcnlWaWV3R3VhcmQgfSBmcm9tICcuL2dhbGxlcnktdmlldy5ndWFyZCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBkZXNjcmliZSgnR2FsbGVyeSBWaWV3IEd1YXJkJywgKCkgPT4ge1xuICAgIGxldCBndWFyZFVuZGVyVGVzdDogR2FsbGVyeVZpZXdHdWFyZDtcblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgZ3VhcmRVbmRlclRlc3QgPSBuZXcgR2FsbGVyeVZpZXdHdWFyZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2NhbkFjdGl2YXRlKCkgc2hvdWxkIHJldHVybiBhIGZha2UgdHJ1ZSBmb3Igbm93JywgKCkgPT4ge1xuICAgICAgZXhwZWN0KGd1YXJkVW5kZXJUZXN0LmNhbkFjdGl2YXRlKCkpLnRvQmUodHJ1ZSk7XG4gICAgfSk7XG4gIH0pO1xufVxuIl19
