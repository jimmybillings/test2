"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sharing_actions_1 = require("./sharing.actions");
var actions_spec_helper_1 = require("../spec-helpers/actions.spec-helper");
function main() {
    describe('Sharing Actions', function () {
        var actionsSpecHelper = new actions_spec_helper_1.ActionsSpecHelper();
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: sharing_actions_1.ActionFactory,
                name: 'createAssetShareLink',
                parameters: [1, { markers: 'some markers' }]
            },
            expectedAction: {
                type: '[Sharing] Create Asset Share Link',
                assetId: 1,
                markers: { markers: 'some markers' }
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: sharing_actions_1.ActionFactory,
                name: 'emailAssetShareLink',
                parameters: [1, { markers: 'some markers' }, { parameters: 'some paramaters' }, { some: 'props' }]
            },
            expectedAction: {
                type: '[Sharing] Email Asset Share Link',
                assetId: 1,
                markers: { markers: 'some markers' },
                parameters: { parameters: 'some paramaters' },
                properties: { some: 'props' }
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: sharing_actions_1.ActionFactory,
                name: 'emailCollectionShareLink',
                parameters: [1, { parameters: 'some paramaters' }, 'collection']
            },
            expectedAction: {
                type: '[Sharing] Email Collection Share Link',
                collectionId: 1,
                parameters: { parameters: 'some paramaters' },
                reloadType: 'collection'
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: sharing_actions_1.InternalActionFactory,
                name: 'createAssetShareLinkSuccess',
                parameters: ['someLink']
            },
            expectedAction: {
                type: '[Sharing] Create Asset Share Link Success',
                link: 'someLink'
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: sharing_actions_1.InternalActionFactory,
                name: 'emailCollectionShareLinkSuccess',
                parameters: ['collection'],
            },
            expectedAction: {
                type: '[Sharing] Email Collection Share Link Success',
                reloadType: 'collection'
            }
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9zaGFyaW5nL3NoYXJpbmcuYWN0aW9ucy5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscURBQXlFO0FBQ3pFLDJFQUF3RTtBQUV4RTtJQUNFLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRTtRQUMxQixJQUFJLGlCQUFpQixHQUFzQixJQUFJLHVDQUFpQixFQUFFLENBQUM7UUFFbkUsaUJBQWlCLENBQUMsZUFBZSxDQUFDO1lBQ2hDLGFBQWEsRUFBRTtnQkFDYixLQUFLLEVBQUUsK0JBQWE7Z0JBQ3BCLElBQUksRUFBRSxzQkFBc0I7Z0JBQzVCLFVBQVUsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsQ0FBQzthQUM3QztZQUNELGNBQWMsRUFBRTtnQkFDZCxJQUFJLEVBQUUsbUNBQW1DO2dCQUN6QyxPQUFPLEVBQUUsQ0FBQztnQkFDVixPQUFPLEVBQUUsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFO2FBQ3JDO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsaUJBQWlCLENBQUMsZUFBZSxDQUFDO1lBQ2hDLGFBQWEsRUFBRTtnQkFDYixLQUFLLEVBQUUsK0JBQWE7Z0JBQ3BCLElBQUksRUFBRSxxQkFBcUI7Z0JBQzNCLFVBQVUsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBRSxpQkFBaUIsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDO2FBQ25HO1lBQ0QsY0FBYyxFQUFFO2dCQUNkLElBQUksRUFBRSxrQ0FBa0M7Z0JBQ3hDLE9BQU8sRUFBRSxDQUFDO2dCQUNWLE9BQU8sRUFBRSxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUU7Z0JBQ3BDLFVBQVUsRUFBRSxFQUFFLFVBQVUsRUFBRSxpQkFBaUIsRUFBRTtnQkFDN0MsVUFBVSxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRTthQUM5QjtTQUNGLENBQUMsQ0FBQztRQUVILGlCQUFpQixDQUFDLGVBQWUsQ0FBQztZQUNoQyxhQUFhLEVBQUU7Z0JBQ2IsS0FBSyxFQUFFLCtCQUFhO2dCQUNwQixJQUFJLEVBQUUsMEJBQTBCO2dCQUNoQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxVQUFVLEVBQUUsaUJBQWlCLEVBQUUsRUFBRSxZQUFZLENBQUM7YUFDakU7WUFDRCxjQUFjLEVBQUU7Z0JBQ2QsSUFBSSxFQUFFLHVDQUF1QztnQkFDN0MsWUFBWSxFQUFFLENBQUM7Z0JBQ2YsVUFBVSxFQUFFLEVBQUUsVUFBVSxFQUFFLGlCQUFpQixFQUFFO2dCQUM3QyxVQUFVLEVBQUUsWUFBWTthQUN6QjtTQUNGLENBQUMsQ0FBQztRQUVILGlCQUFpQixDQUFDLGVBQWUsQ0FBQztZQUNoQyxhQUFhLEVBQUU7Z0JBQ2IsS0FBSyxFQUFFLHVDQUFxQjtnQkFDNUIsSUFBSSxFQUFFLDZCQUE2QjtnQkFDbkMsVUFBVSxFQUFFLENBQUMsVUFBVSxDQUFDO2FBQ3pCO1lBQ0QsY0FBYyxFQUFFO2dCQUNkLElBQUksRUFBRSwyQ0FBMkM7Z0JBQ2pELElBQUksRUFBRSxVQUFVO2FBQ2pCO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsaUJBQWlCLENBQUMsZUFBZSxDQUFDO1lBQ2hDLGFBQWEsRUFBRTtnQkFDYixLQUFLLEVBQUUsdUNBQXFCO2dCQUM1QixJQUFJLEVBQUUsaUNBQWlDO2dCQUN2QyxVQUFVLEVBQUUsQ0FBQyxZQUFZLENBQUM7YUFDM0I7WUFDRCxjQUFjLEVBQUU7Z0JBQ2QsSUFBSSxFQUFFLCtDQUErQztnQkFDckQsVUFBVSxFQUFFLFlBQVk7YUFDekI7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUF0RUQsb0JBc0VDIiwiZmlsZSI6ImFwcC9zdG9yZS9zaGFyaW5nL3NoYXJpbmcuYWN0aW9ucy5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWN0aW9uRmFjdG9yeSwgSW50ZXJuYWxBY3Rpb25GYWN0b3J5IH0gZnJvbSAnLi9zaGFyaW5nLmFjdGlvbnMnO1xuaW1wb3J0IHsgQWN0aW9uc1NwZWNIZWxwZXIgfSBmcm9tICcuLi9zcGVjLWhlbHBlcnMvYWN0aW9ucy5zcGVjLWhlbHBlcic7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBkZXNjcmliZSgnU2hhcmluZyBBY3Rpb25zJywgKCkgPT4ge1xuICAgIGxldCBhY3Rpb25zU3BlY0hlbHBlcjogQWN0aW9uc1NwZWNIZWxwZXIgPSBuZXcgQWN0aW9uc1NwZWNIZWxwZXIoKTtcblxuICAgIGFjdGlvbnNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdEZvcih7XG4gICAgICBmYWN0b3J5TWV0aG9kOiB7XG4gICAgICAgIGNsYXNzOiBBY3Rpb25GYWN0b3J5LFxuICAgICAgICBuYW1lOiAnY3JlYXRlQXNzZXRTaGFyZUxpbmsnLFxuICAgICAgICBwYXJhbWV0ZXJzOiBbMSwgeyBtYXJrZXJzOiAnc29tZSBtYXJrZXJzJyB9XVxuICAgICAgfSxcbiAgICAgIGV4cGVjdGVkQWN0aW9uOiB7XG4gICAgICAgIHR5cGU6ICdbU2hhcmluZ10gQ3JlYXRlIEFzc2V0IFNoYXJlIExpbmsnLFxuICAgICAgICBhc3NldElkOiAxLFxuICAgICAgICBtYXJrZXJzOiB7IG1hcmtlcnM6ICdzb21lIG1hcmtlcnMnIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGFjdGlvbnNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdEZvcih7XG4gICAgICBmYWN0b3J5TWV0aG9kOiB7XG4gICAgICAgIGNsYXNzOiBBY3Rpb25GYWN0b3J5LFxuICAgICAgICBuYW1lOiAnZW1haWxBc3NldFNoYXJlTGluaycsXG4gICAgICAgIHBhcmFtZXRlcnM6IFsxLCB7IG1hcmtlcnM6ICdzb21lIG1hcmtlcnMnIH0sIHsgcGFyYW1ldGVyczogJ3NvbWUgcGFyYW1hdGVycycgfSwgeyBzb21lOiAncHJvcHMnIH1dXG4gICAgICB9LFxuICAgICAgZXhwZWN0ZWRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogJ1tTaGFyaW5nXSBFbWFpbCBBc3NldCBTaGFyZSBMaW5rJyxcbiAgICAgICAgYXNzZXRJZDogMSxcbiAgICAgICAgbWFya2VyczogeyBtYXJrZXJzOiAnc29tZSBtYXJrZXJzJyB9LFxuICAgICAgICBwYXJhbWV0ZXJzOiB7IHBhcmFtZXRlcnM6ICdzb21lIHBhcmFtYXRlcnMnIH0sXG4gICAgICAgIHByb3BlcnRpZXM6IHsgc29tZTogJ3Byb3BzJyB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBhY3Rpb25zU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RGb3Ioe1xuICAgICAgZmFjdG9yeU1ldGhvZDoge1xuICAgICAgICBjbGFzczogQWN0aW9uRmFjdG9yeSxcbiAgICAgICAgbmFtZTogJ2VtYWlsQ29sbGVjdGlvblNoYXJlTGluaycsXG4gICAgICAgIHBhcmFtZXRlcnM6IFsxLCB7IHBhcmFtZXRlcnM6ICdzb21lIHBhcmFtYXRlcnMnIH0sICdjb2xsZWN0aW9uJ11cbiAgICAgIH0sXG4gICAgICBleHBlY3RlZEFjdGlvbjoge1xuICAgICAgICB0eXBlOiAnW1NoYXJpbmddIEVtYWlsIENvbGxlY3Rpb24gU2hhcmUgTGluaycsXG4gICAgICAgIGNvbGxlY3Rpb25JZDogMSxcbiAgICAgICAgcGFyYW1ldGVyczogeyBwYXJhbWV0ZXJzOiAnc29tZSBwYXJhbWF0ZXJzJyB9LFxuICAgICAgICByZWxvYWRUeXBlOiAnY29sbGVjdGlvbidcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGFjdGlvbnNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdEZvcih7XG4gICAgICBmYWN0b3J5TWV0aG9kOiB7XG4gICAgICAgIGNsYXNzOiBJbnRlcm5hbEFjdGlvbkZhY3RvcnksXG4gICAgICAgIG5hbWU6ICdjcmVhdGVBc3NldFNoYXJlTGlua1N1Y2Nlc3MnLFxuICAgICAgICBwYXJhbWV0ZXJzOiBbJ3NvbWVMaW5rJ11cbiAgICAgIH0sXG4gICAgICBleHBlY3RlZEFjdGlvbjoge1xuICAgICAgICB0eXBlOiAnW1NoYXJpbmddIENyZWF0ZSBBc3NldCBTaGFyZSBMaW5rIFN1Y2Nlc3MnLFxuICAgICAgICBsaW5rOiAnc29tZUxpbmsnXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBhY3Rpb25zU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RGb3Ioe1xuICAgICAgZmFjdG9yeU1ldGhvZDoge1xuICAgICAgICBjbGFzczogSW50ZXJuYWxBY3Rpb25GYWN0b3J5LFxuICAgICAgICBuYW1lOiAnZW1haWxDb2xsZWN0aW9uU2hhcmVMaW5rU3VjY2VzcycsXG4gICAgICAgIHBhcmFtZXRlcnM6IFsnY29sbGVjdGlvbiddLFxuICAgICAgfSxcbiAgICAgIGV4cGVjdGVkQWN0aW9uOiB7XG4gICAgICAgIHR5cGU6ICdbU2hhcmluZ10gRW1haWwgQ29sbGVjdGlvbiBTaGFyZSBMaW5rIFN1Y2Nlc3MnLFxuICAgICAgICByZWxvYWRUeXBlOiAnY29sbGVjdGlvbidcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG4iXX0=
