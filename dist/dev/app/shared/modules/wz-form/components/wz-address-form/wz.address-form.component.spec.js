"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wz_address_form_component_1 = require("./wz.address-form.component");
var forms_1 = require("@angular/forms");
var common_functions_1 = require("../../../../utilities/common.functions");
function main() {
    describe('Address Form Component', function () {
        var componentUnderTest, fb = new forms_1.FormBuilder(), mockGoogleService, mockDocument;
        var mockAddress = {
            address: '123 Oak Street',
            address2: 'Apartment 10',
            state: 'CO',
            country: 'USA',
            zipcode: '11111',
            phone: '2223334444',
            city: 'Denver'
        };
        beforeEach(function () {
            mockGoogleService = {
                loadPlacesLibrary: jasmine.createSpy('loadPlacesLibrary'),
                autocomplete: {
                    addListener: jasmine.createSpy('addListener')
                },
                geolocate: jasmine.createSpy('geolocate')
            };
            componentUnderTest = new wz_address_form_component_1.WzAddressFormComponent(fb, mockGoogleService, null, mockDocument);
        });
        describe('address setter', function () {
            beforeEach(function () {
                componentUnderTest.formItems = formItems();
            });
            it('builds the addressForm', function () {
                expect(componentUnderTest.addressForm).toBeUndefined();
                componentUnderTest.address = mockAddress;
                expect(componentUnderTest.addressForm.value).toEqual(mockAddress);
            });
        });
        describe('geolocate', function () {
            beforeEach(function () {
                spyOn(common_functions_1.Common, 'setMarginTop');
                componentUnderTest.geolocate();
            });
            it('sets the margin top', function () {
                expect(common_functions_1.Common.setMarginTop).toHaveBeenCalledWith('pac-container', mockDocument);
            });
        });
        describe('loaded setter', function () {
            it('calls loadPlacesLibrary() on the google service', function () {
                componentUnderTest.loaded = true;
                expect(mockGoogleService.loadPlacesLibrary).toHaveBeenCalled();
            });
        });
        describe('saveAddress()', function () {
            it('emits the onSaveAddress event with the form value', function () {
                componentUnderTest.formItems = formItems();
                componentUnderTest.address = mockAddress;
                spyOn(componentUnderTest.onSaveAddress, 'emit');
                componentUnderTest.saveAddress();
                expect(componentUnderTest.onSaveAddress.emit).toHaveBeenCalledWith(componentUnderTest.addressForm.value);
            });
        });
    });
    function formItems() {
        return [
            {
                fields: [
                    {
                        name: 'address',
                        label: 'Address Line 1',
                        type: 'text',
                        value: '',
                        validation: 'REQUIRED',
                        googleFields: ['street_number', 'route'],
                        addressType: 'long_name'
                    }
                ]
            },
            {
                fields: [
                    {
                        name: 'address2',
                        label: 'Address Line 2',
                        type: 'text',
                        value: '',
                        validation: 'OPTIONAL',
                        googleFields: [],
                        addressType: ''
                    }
                ]
            },
            {
                fields: [
                    {
                        name: 'city',
                        label: 'City',
                        type: 'text',
                        value: '',
                        validation: 'REQUIRED',
                        googleFields: ['locality'],
                        addressType: 'long_name'
                    },
                    {
                        name: 'state',
                        label: 'State',
                        type: 'text',
                        value: '',
                        validation: 'REQUIRED',
                        googleFields: ['administrative_area_level_1'],
                        addressType: 'short_name'
                    }
                ]
            },
            {
                fields: [
                    {
                        name: 'zipcode',
                        label: 'Zipcode/Postal Code',
                        type: 'text',
                        value: '',
                        validation: 'REQUIRED',
                        googleFields: ['postal_code'],
                        addressType: 'short_name'
                    },
                    {
                        name: 'country',
                        label: 'Country',
                        type: 'text',
                        value: '',
                        validation: 'REQUIRED',
                        googleFields: ['country'],
                        addressType: 'long_name'
                    }
                ]
            },
            {
                fields: [
                    {
                        name: 'phone',
                        label: 'Phone Number',
                        type: 'text',
                        value: '',
                        validation: 'REQUIRED',
                        googleFields: [],
                        addressType: ''
                    }
                ]
            }
        ];
    }
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kdWxlcy93ei1mb3JtL2NvbXBvbmVudHMvd3otYWRkcmVzcy1mb3JtL3d6LmFkZHJlc3MtZm9ybS5jb21wb25lbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHlFQUFxRTtBQUNyRSx3Q0FBNkM7QUFFN0MsMkVBQWdFO0FBRWhFO0lBQ0UsUUFBUSxDQUFDLHdCQUF3QixFQUFFO1FBQ2pDLElBQUksa0JBQTBDLEVBQzVDLEVBQUUsR0FBZ0IsSUFBSSxtQkFBVyxFQUFFLEVBQ25DLGlCQUFzQixFQUN0QixZQUFpQixDQUFDO1FBRXBCLElBQU0sV0FBVyxHQUFZO1lBQzNCLE9BQU8sRUFBRSxnQkFBZ0I7WUFDekIsUUFBUSxFQUFFLGNBQWM7WUFDeEIsS0FBSyxFQUFFLElBQUk7WUFDWCxPQUFPLEVBQUUsS0FBSztZQUNkLE9BQU8sRUFBRSxPQUFPO1lBQ2hCLEtBQUssRUFBRSxZQUFZO1lBQ25CLElBQUksRUFBRSxRQUFRO1NBQ2YsQ0FBQztRQUVGLFVBQVUsQ0FBQztZQUNULGlCQUFpQixHQUFHO2dCQUNsQixpQkFBaUIsRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLG1CQUFtQixDQUFDO2dCQUN6RCxZQUFZLEVBQUU7b0JBQ1osV0FBVyxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDO2lCQUM5QztnQkFDRCxTQUFTLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUM7YUFDMUMsQ0FBQztZQUNGLGtCQUFrQixHQUFHLElBQUksa0RBQXNCLENBQUMsRUFBRSxFQUFFLGlCQUFpQixFQUFFLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQztRQUM3RixDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRTtZQUN6QixVQUFVLENBQUM7Z0JBQ1Qsa0JBQWtCLENBQUMsU0FBUyxHQUFHLFNBQVMsRUFBRSxDQUFDO1lBQzdDLENBQUMsQ0FBQyxDQUFDO1lBRUgsRUFBRSxD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O3dCQUNaLEtBQUssRUFBRSxFQUFFO3dCQUNULFVBQVUsRUFBRSxVQUFVO3dCQUN0QixZQUFZLEVBQUUsQ0FBQyw2QkFBNkIsQ0FBQzt3QkFDN0MsV0FBVyxFQUFFLFlBQVk7cUJBQzFCO2lCQUNGO2FBQ0Y7WUFDRDtnQkFDRSxNQUFNLEVBQUU7b0JBQ047d0JBQ0UsSUFBSSxFQUFFLFNBQVM7d0JBQ2YsS0FBSyxFQUFFLHFCQUFxQjt3QkFDNUIsSUFBSSxFQUFFLE1BQU07d0JBQ1osS0FBSyxFQUFFLEVBQUU7d0JBQ1QsVUFBVSxFQUFFLFVBQVU7d0JBQ3RCLFlBQVksRUFBRSxDQUFDLGFBQWEsQ0FBQzt3QkFDN0IsV0FBVyxFQUFFLFlBQVk7cUJBQzFCO29CQUNEO3dCQUNFLElBQUksRUFBRSxTQUFTO3dCQUNmLEtBQUssRUFBRSxTQUFTO3dCQUNoQixJQUFJLEVBQUUsTUFBTTt3QkFDWixLQUFLLEVBQUUsRUFBRTt3QkFDVCxVQUFVLEVBQUUsVUFBVTt3QkFDdEIsWUFBWSxFQUFFLENBQUMsU0FBUyxDQUFDO3dCQUN6QixXQUFXLEVBQUUsV0FBVztxQkFDekI7aUJBQ0Y7YUFDRjtZQUNEO2dCQUNFLE1BQU0sRUFBRTtvQkFDTjt3QkFDRSxJQUFJLEVBQUUsT0FBTzt3QkFDYixLQUFLLEVBQUUsY0FBYzt3QkFDckIsSUFBSSxFQUFFLE1BQU07d0JBQ1osS0FBSyxFQUFFLEVBQUU7d0JBQ1QsVUFBVSxFQUFFLFVBQVU7d0JBQ3RCLFlBQVksRUFBRSxFQUFFO3dCQUNoQixXQUFXLEVBQUUsRUFBRTtxQkFDaEI7aUJBQ0Y7YUFDRjtTQUNGLENBQUM7SUFDSixDQUFDO0FBQ0gsQ0FBQztBQTdKRCxvQkE2SkMiLCJmaWxlIjoiYXBwL3NoYXJlZC9tb2R1bGVzL3d6LWZvcm0vY29tcG9uZW50cy93ei1hZGRyZXNzLWZvcm0vd3ouYWRkcmVzcy1mb3JtLmNvbXBvbmVudC5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgV3pBZGRyZXNzRm9ybUNvbXBvbmVudCB9IGZyb20gJy4vd3ouYWRkcmVzcy1mb3JtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGb3JtQnVpbGRlciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEFkZHJlc3MgfSBmcm9tICcuLi8uLi8uLi8uLi9pbnRlcmZhY2VzL3VzZXIuaW50ZXJmYWNlJztcbmltcG9ydCB7IENvbW1vbiB9IGZyb20gJy4uLy4uLy4uLy4uL3V0aWxpdGllcy9jb21tb24uZnVuY3Rpb25zJztcblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIGRlc2NyaWJlKCdBZGRyZXNzIEZvcm0gQ29tcG9uZW50JywgKCkgPT4ge1xuICAgIGxldCBjb21wb25lbnRVbmRlclRlc3Q6IFd6QWRkcmVzc0Zvcm1Db21wb25lbnQsXG4gICAgICBmYjogRm9ybUJ1aWxkZXIgPSBuZXcgRm9ybUJ1aWxkZXIoKSxcbiAgICAgIG1vY2tHb29nbGVTZXJ2aWNlOiBhbnksXG4gICAgICBtb2NrRG9jdW1lbnQ6IGFueTtcblxuICAgIGNvbnN0IG1vY2tBZGRyZXNzOiBBZGRyZXNzID0ge1xuICAgICAgYWRkcmVzczogJzEyMyBPYWsgU3RyZWV0JyxcbiAgICAgIGFkZHJlc3MyOiAnQXBhcnRtZW50IDEwJyxcbiAgICAgIHN0YXRlOiAnQ08nLFxuICAgICAgY291bnRyeTogJ1VTQScsXG4gICAgICB6aXBjb2RlOiAnMTExMTEnLFxuICAgICAgcGhvbmU6ICcyMjIzMzM0NDQ0JyxcbiAgICAgIGNpdHk6ICdEZW52ZXInXG4gICAgfTtcblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgbW9ja0dvb2dsZVNlcnZpY2UgPSB7XG4gICAgICAgIGxvYWRQbGFjZXNMaWJyYXJ5OiBqYXNtaW5lLmNyZWF0ZVNweSgnbG9hZFBsYWNlc0xpYnJhcnknKSxcbiAgICAgICAgYXV0b2NvbXBsZXRlOiB7XG4gICAgICAgICAgYWRkTGlzdGVuZXI6IGphc21pbmUuY3JlYXRlU3B5KCdhZGRMaXN0ZW5lcicpXG4gICAgICAgIH0sXG4gICAgICAgIGdlb2xvY2F0ZTogamFzbWluZS5jcmVhdGVTcHkoJ2dlb2xvY2F0ZScpXG4gICAgICB9O1xuICAgICAgY29tcG9uZW50VW5kZXJUZXN0ID0gbmV3IFd6QWRkcmVzc0Zvcm1Db21wb25lbnQoZmIsIG1vY2tHb29nbGVTZXJ2aWNlLCBudWxsLCBtb2NrRG9jdW1lbnQpO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2FkZHJlc3Mgc2V0dGVyJywgKCkgPT4ge1xuICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5mb3JtSXRlbXMgPSBmb3JtSXRlbXMoKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnYnVpbGRzIHRoZSBhZGRyZXNzRm9ybScsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5hZGRyZXNzRm9ybSkudG9CZVVuZGVmaW5lZCgpO1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuYWRkcmVzcyA9IG1vY2tBZGRyZXNzO1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmFkZHJlc3NGb3JtLnZhbHVlKS50b0VxdWFsKG1vY2tBZGRyZXNzKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2dlb2xvY2F0ZScsICgpID0+IHtcbiAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICBzcHlPbihDb21tb24sICdzZXRNYXJnaW5Ub3AnKTtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lmdlb2xvY2F0ZSgpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdzZXRzIHRoZSBtYXJnaW4gdG9wJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoQ29tbW9uLnNldE1hcmdpblRvcCkudG9IYXZlQmVlbkNhbGxlZFdpdGgoJ3BhYy1jb250YWluZXInLCBtb2NrRG9jdW1lbnQpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnbG9hZGVkIHNldHRlcicsICgpID0+IHtcbiAgICAgIGl0KCdjYWxscyBsb2FkUGxhY2VzTGlicmFyeSgpIG9uIHRoZSBnb29nbGUgc2VydmljZScsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmxvYWRlZCA9IHRydWU7XG4gICAgICAgIGV4cGVjdChtb2NrR29vZ2xlU2VydmljZS5sb2FkUGxhY2VzTGlicmFyeSkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnc2F2ZUFkZHJlc3MoKScsICgpID0+IHtcbiAgICAgIGl0KCdlbWl0cyB0aGUgb25TYXZlQWRkcmVzcyBldmVudCB3aXRoIHRoZSBmb3JtIHZhbHVlJywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuZm9ybUl0ZW1zID0gZm9ybUl0ZW1zKCk7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5hZGRyZXNzID0gbW9ja0FkZHJlc3M7XG5cbiAgICAgICAgc3B5T24oY29tcG9uZW50VW5kZXJUZXN0Lm9uU2F2ZUFkZHJlc3MsICdlbWl0Jyk7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5zYXZlQWRkcmVzcygpO1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0Lm9uU2F2ZUFkZHJlc3MuZW1pdCkudG9IYXZlQmVlbkNhbGxlZFdpdGgoY29tcG9uZW50VW5kZXJUZXN0LmFkZHJlc3NGb3JtLnZhbHVlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcblxuICBmdW5jdGlvbiBmb3JtSXRlbXMoKTogYW55IHtcbiAgICByZXR1cm4gW1xuICAgICAge1xuICAgICAgICBmaWVsZHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnYWRkcmVzcycsXG4gICAgICAgICAgICBsYWJlbDogJ0FkZHJlc3MgTGluZSAxJyxcbiAgICAgICAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgICAgICAgIHZhbHVlOiAnJyxcbiAgICAgICAgICAgIHZhbGlkYXRpb246ICdSRVFVSVJFRCcsXG4gICAgICAgICAgICBnb29nbGVGaWVsZHM6IFsnc3RyZWV0X251bWJlcicsICdyb3V0ZSddLFxuICAgICAgICAgICAgYWRkcmVzc1R5cGU6ICdsb25nX25hbWUnXG4gICAgICAgICAgfVxuICAgICAgICBdXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBmaWVsZHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnYWRkcmVzczInLFxuICAgICAgICAgICAgbGFiZWw6ICdBZGRyZXNzIExpbmUgMicsXG4gICAgICAgICAgICB0eXBlOiAndGV4dCcsXG4gICAgICAgICAgICB2YWx1ZTogJycsXG4gICAgICAgICAgICB2YWxpZGF0aW9uOiAnT1BUSU9OQUwnLFxuICAgICAgICAgICAgZ29vZ2xlRmllbGRzOiBbXSxcbiAgICAgICAgICAgIGFkZHJlc3NUeXBlOiAnJ1xuICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgZmllbGRzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ2NpdHknLFxuICAgICAgICAgICAgbGFiZWw6ICdDaXR5JyxcbiAgICAgICAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgICAgICAgIHZhbHVlOiAnJyxcbiAgICAgICAgICAgIHZhbGlkYXRpb246ICdSRVFVSVJFRCcsXG4gICAgICAgICAgICBnb29nbGVGaWVsZHM6IFsnbG9jYWxpdHknXSxcbiAgICAgICAgICAgIGFkZHJlc3NUeXBlOiAnbG9uZ19uYW1lJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ3N0YXRlJyxcbiAgICAgICAgICAgIGxhYmVsOiAnU3RhdGUnLFxuICAgICAgICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgICAgICAgdmFsdWU6ICcnLFxuICAgICAgICAgICAgdmFsaWRhdGlvbjogJ1JFUVVJUkVEJyxcbiAgICAgICAgICAgIGdvb2dsZUZpZWxkczogWydhZG1pbmlzdHJhdGl2ZV9hcmVhX2xldmVsXzEnXSxcbiAgICAgICAgICAgIGFkZHJlc3NUeXBlOiAnc2hvcnRfbmFtZSdcbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGZpZWxkczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICd6aXBjb2RlJyxcbiAgICAgICAgICAgIGxhYmVsOiAnWmlwY29kZS9Qb3N0YWwgQ29kZScsXG4gICAgICAgICAgICB0eXBlOiAndGV4dCcsXG4gICAgICAgICAgICB2YWx1ZTogJycsXG4gICAgICAgICAgICB2YWxpZGF0aW9uOiAnUkVRVUlSRUQnLFxuICAgICAgICAgICAgZ29vZ2xlRmllbGRzOiBbJ3Bvc3RhbF9jb2RlJ10sXG4gICAgICAgICAgICBhZGRyZXNzVHlwZTogJ3Nob3J0X25hbWUnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnY291bnRyeScsXG4gICAgICAgICAgICBsYWJlbDogJ0NvdW50cnknLFxuICAgICAgICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgICAgICAgdmFsdWU6ICcnLFxuICAgICAgICAgICAgdmFsaWRhdGlvbjogJ1JFUVVJUkVEJyxcbiAgICAgICAgICAgIGdvb2dsZUZpZWxkczogWydjb3VudHJ5J10sXG4gICAgICAgICAgICBhZGRyZXNzVHlwZTogJ2xvbmdfbmFtZSdcbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGZpZWxkczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdwaG9uZScsXG4gICAgICAgICAgICBsYWJlbDogJ1Bob25lIE51bWJlcicsXG4gICAgICAgICAgICB0eXBlOiAndGV4dCcsXG4gICAgICAgICAgICB2YWx1ZTogJycsXG4gICAgICAgICAgICB2YWxpZGF0aW9uOiAnUkVRVUlSRUQnLFxuICAgICAgICAgICAgZ29vZ2xlRmllbGRzOiBbXSxcbiAgICAgICAgICAgIGFkZHJlc3NUeXBlOiAnJ1xuICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICAgfVxuICAgIF07XG4gIH1cbn1cbiJdfQ==
