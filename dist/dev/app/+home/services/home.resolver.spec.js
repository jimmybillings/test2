"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var home_resolver_1 = require("./home.resolver");
var mock_app_store_1 = require("../../store/spec-helpers/mock-app.store");
function main() {
    describe('Home Resolver', function () {
        var resolverUnderTest;
        var mockStore;
        beforeEach(function () {
            mockStore = new mock_app_store_1.MockAppStore();
            mockStore.createStateSection('uiConfig', {
                components: {
                    home: {
                        config: {
                            pageSize: { value: '100' },
                            notifications: {
                                items: [{ trString: 'NOTIFICATION.NEW_USER' }]
                            }
                        }
                    }
                }
            });
            resolverUnderTest = new home_resolver_1.HomeResolver(null, mockStore, null);
        });
        it('***** HASN\'T BEEN TESTED YET! *****', function () {
            expect(true).toBe(true);
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8raG9tZS9zZXJ2aWNlcy9ob21lLnJlc29sdmVyLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpREFBK0M7QUFFL0MsMEVBQXVFO0FBRXZFO0lBQ0UsUUFBUSxDQUFDLGVBQWUsRUFBRTtRQUN4QixJQUFJLGlCQUErQixDQUFDO1FBQ3BDLElBQUksU0FBdUIsQ0FBQztRQUU1QixVQUFVLENBQUM7WUFDVCxTQUFTLEdBQUcsSUFBSSw2QkFBWSxFQUFFLENBQUM7WUFDL0IsU0FBUyxDQUFDLGtCQUFrQixDQUFDLFVBQVUsRUFBRTtnQkFDdkMsVUFBVSxFQUFFO29CQUNWLElBQUksRUFBRTt3QkFDSixNQUFNLEVBQUU7NEJBQ04sUUFBUSxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTs0QkFDMUIsYUFBYSxFQUFFO2dDQUNiLEtBQUssRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLHVCQUF1QixFQUFFLENBQUM7NkJBQy9DO3lCQUNGO3FCQUNGO2lCQUNGO2FBQ0YsQ0FBQyxDQUFDO1lBRUgsaUJBQWlCLEdBQUcsSUFBSSw0QkFBWSxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDOUQsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsc0NBQXNDLEVBQUU7WUFDekMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQTNCRCxvQkEyQkMiLCJmaWxlIjoiYXBwLytob21lL3NlcnZpY2VzL2hvbWUucmVzb2x2ZXIuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEhvbWVSZXNvbHZlciB9IGZyb20gJy4vaG9tZS5yZXNvbHZlcic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IE1vY2tBcHBTdG9yZSB9IGZyb20gJy4uLy4uL3N0b3JlL3NwZWMtaGVscGVycy9tb2NrLWFwcC5zdG9yZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBkZXNjcmliZSgnSG9tZSBSZXNvbHZlcicsICgpID0+IHtcbiAgICBsZXQgcmVzb2x2ZXJVbmRlclRlc3Q6IEhvbWVSZXNvbHZlcjtcbiAgICBsZXQgbW9ja1N0b3JlOiBNb2NrQXBwU3RvcmU7XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgIG1vY2tTdG9yZSA9IG5ldyBNb2NrQXBwU3RvcmUoKTtcbiAgICAgIG1vY2tTdG9yZS5jcmVhdGVTdGF0ZVNlY3Rpb24oJ3VpQ29uZmlnJywge1xuICAgICAgICBjb21wb25lbnRzOiB7XG4gICAgICAgICAgaG9tZToge1xuICAgICAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICAgIHBhZ2VTaXplOiB7IHZhbHVlOiAnMTAwJyB9LFxuICAgICAgICAgICAgICBub3RpZmljYXRpb25zOiB7XG4gICAgICAgICAgICAgICAgaXRlbXM6IFt7IHRyU3RyaW5nOiAnTk9USUZJQ0FUSU9OLk5FV19VU0VSJyB9XVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgcmVzb2x2ZXJVbmRlclRlc3QgPSBuZXcgSG9tZVJlc29sdmVyKG51bGwsIG1vY2tTdG9yZSwgbnVsbCk7XG4gICAgfSk7XG5cbiAgICBpdCgnKioqKiogSEFTTlxcJ1QgQkVFTiBURVNURUQgWUVUISAqKioqKicsICgpID0+IHtcbiAgICAgIGV4cGVjdCh0cnVlKS50b0JlKHRydWUpO1xuICAgIH0pO1xuICB9KTtcbn1cbiJdfQ==
