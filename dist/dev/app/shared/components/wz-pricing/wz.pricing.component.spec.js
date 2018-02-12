"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wz_pricing_component_1 = require("./wz.pricing.component");
var Observable_1 = require("rxjs/Observable");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var mock_app_store_1 = require("../../../store/spec-helpers/mock-app.store");
function main() {
    describe('Wz Pricing Component', function () {
        var componentUnderTest;
        var mockFormBuilder;
        var mockForm;
        var mockStore;
        beforeEach(function () {
            mockFormBuilder = new forms_1.FormBuilder();
            mockStore = new mock_app_store_1.MockAppStore();
            mockStore.createStateSection('pricing', { attributes: mockPriceAttributes() });
            componentUnderTest = new wz_pricing_component_1.WzPricingComponent(mockFormBuilder, mockStore);
            componentUnderTest.pricingEvent = new core_1.EventEmitter();
            jasmine.clock().uninstall();
            jasmine.clock().install();
        });
        afterEach(function () {
            jasmine.clock().uninstall();
        });
        describe('pricingPreferences setter', function () {
            it('should build the form properly with no preferences', function () {
                componentUnderTest.pricingPreferences = {};
                expect(componentUnderTest.form.value).toEqual({ a: '' });
            });
            it('should build the form properly with preferences', function () {
                componentUnderTest.pricingPreferences = {
                    a: 's',
                    b: 'm',
                    c: 'x',
                    d: 's'
                };
                expect(componentUnderTest.form.value).toEqual({ a: 's', b: 'm', c: 'x', d: 's' });
            });
            it('should build a blank form if the preferences are invalid', function () {
                componentUnderTest.pricingPreferences = {
                    invalid: 'preference'
                };
                expect(componentUnderTest.form.value).toEqual({ a: '' });
            });
            it('emits the pricing event to calculate the price if preferences exist and the price config hasn\'t changed', function () {
                spyOn(componentUnderTest.pricingEvent, 'emit');
                var mockPrefs = {
                    a: 's',
                    b: 'm',
                    c: 'x',
                    d: 's'
                };
                componentUnderTest.pricingPreferences = mockPrefs;
                jasmine.clock().tick(1);
                expect(componentUnderTest.pricingEvent.emit).toHaveBeenCalledWith({ type: 'CALCULATE_PRICE', payload: mockPrefs });
            });
            it('doesn\'t emit the pricing event when the preferences are empty', function () {
                spyOn(componentUnderTest.pricingEvent, 'emit');
                componentUnderTest.pricingPreferences = {};
                expect(componentUnderTest.pricingEvent.emit).not.toHaveBeenCalled();
            });
        });
        describe('userCanCustomizeRights setter', function () {
            it('assigns the value of the input to the _userCanCustomizeRights variable', function () {
                componentUnderTest.userCanCustomizeRights = false;
                expect(componentUnderTest._userCanCustomizeRights).toBe(false);
            });
            describe('when the input is \'true\'', function () {
                describe('builds the custom pricing attribute form', function () {
                    beforeEach(function () {
                        componentUnderTest.pricingPreferences = {
                            a: 's',
                            b: 'm',
                            c: 'x',
                            d: 's'
                        };
                        componentUnderTest.userCanCustomizeRights = true;
                    });
                    it('with the proper values', function () {
                        expect(componentUnderTest.customForm.value).toEqual({
                            a: 's',
                            attributes: 'b,m\nc,x\nd,s'
                        });
                    });
                    describe('with the right validator pattern', function () {
                        var fails = ['name', 'name,\nname,value', 'name,value\n\n'];
                        var passes = ['', 'name,value', 'name,value\n', 'name2,some_value\nsome_name,Another Value'];
                        fails.forEach(function (test) {
                            it(JSON.stringify(test) + " fails", function () {
                                var control = componentUnderTest.customForm.controls['attributes'];
                                control.setValue(test);
                                expect(control.hasError('pattern')).toBe(true);
                                control.reset();
                            });
                        });
                        passes.forEach(function (test) {
                            it(JSON.stringify(test) + " passes", function () {
                                var control = componentUnderTest.customForm.controls['attributes'];
                                control.setValue(test);
                                expect(control.hasError('pattern')).toBe(false);
                                control.reset();
                            });
                        });
                    });
                });
            });
            describe('when the input is \'false\'', function () {
                it('does not build the custom pricing attribute form', function () {
                    componentUnderTest.userCanCustomizeRights = false;
                    expect(componentUnderTest.customForm).toBeUndefined();
                });
            });
        });
        describe('onSubmit()', function () {
            it('should emit the calculatePricing event with the form', function () {
                componentUnderTest.pricingPreferences = {
                    a: 's',
                    b: 'm',
                    c: 'x',
                    d: 's'
                };
                spyOn(componentUnderTest.pricingEvent, 'emit');
                componentUnderTest.price = Observable_1.Observable.of(10);
                componentUnderTest.onSubmit();
                expect(componentUnderTest.pricingEvent.emit).toHaveBeenCalledWith({
                    type: 'APPLY_PRICE',
                    payload: {
                        price: 10,
                        attributes: [
                            {
                                priceAttributeDisplayName: 'A', priceAttributeName: 'a', selectedAttributeName: 'S', selectedAttributeValue: 's'
                            },
                            {
                                priceAttributeDisplayName: 'B', priceAttributeName: 'b', selectedAttributeName: 'M', selectedAttributeValue: 'm'
                            },
                            {
                                priceAttributeDisplayName: 'C', priceAttributeName: 'c', selectedAttributeName: 'X', selectedAttributeValue: 'x'
                            },
                            {
                                priceAttributeDisplayName: 'D', priceAttributeName: 'd', selectedAttributeName: 'S', selectedAttributeValue: 's'
                            }
                        ],
                        updatePrefs: true,
                        preferences: {
                            a: 's',
                            b: 'm',
                            c: 'x',
                            d: 's'
                        }
                    }
                });
            });
        });
        describe('onSubmitCustom()', function () {
            it('should emit the pricing event with the form', function () {
                componentUnderTest.pricingPreferences = {
                    a: 's',
                    b: 'm',
                    c: 'x',
                    d: 's'
                };
                componentUnderTest.userCanCustomizeRights = true;
                spyOn(componentUnderTest.pricingEvent, 'emit');
                componentUnderTest.onSubmitCustom();
                expect(componentUnderTest.pricingEvent.emit).toHaveBeenCalledWith({
                    type: 'APPLY_PRICE',
                    payload: {
                        attributes: [
                            {
                                priceAttributeDisplayName: 'A', priceAttributeName: 'a', selectedAttributeName: 'S', selectedAttributeValue: 's'
                            },
                            {
                                priceAttributeDisplayName: 'b', priceAttributeName: 'b', selectedAttributeName: 'm', selectedAttributeValue: 'm'
                            },
                            {
                                priceAttributeDisplayName: 'c', priceAttributeName: 'c', selectedAttributeName: 'x', selectedAttributeValue: 'x'
                            },
                            {
                                priceAttributeDisplayName: 'd', priceAttributeName: 'd', selectedAttributeName: 's', selectedAttributeValue: 's'
                            }
                        ],
                        updatePrefs: false
                    }
                });
            });
        });
        describe('parentIsEmpty()', function () {
            beforeEach(function () {
                componentUnderTest.pricingPreferences = {};
            });
            it('should return false if the attribute is the parent of all other attribute', function () {
                var result = componentUnderTest.parentIsEmpty(componentUnderTest.attributes[0]);
                expect(result).toBe(false);
            });
            it('should return true if the form value of the attributes parent is empty', function () {
                var result = componentUnderTest.parentIsEmpty(componentUnderTest.attributes[1]);
                expect(result).toBe(true);
            });
            it('should return false if the parent is not empty', function () {
                componentUnderTest.form = mockFormBuilder.group({
                    a: ['s'],
                    b: ['m'],
                    c: [''],
                    d: ['']
                });
                var result = componentUnderTest.parentIsEmpty(componentUnderTest.attributes[2]);
                expect(result).toBe(false);
            });
        });
        describe('validOptionsFor()', function () {
            it('should return if the attributes parent is empty', function () {
                componentUnderTest.pricingPreferences = {};
                var result = componentUnderTest.validOptionsFor(componentUnderTest.attributes[1]);
                expect(result).toBeUndefined();
            });
            it('should return valid options for the primary attribute', function () {
                componentUnderTest.pricingPreferences = {};
                var result = componentUnderTest.validOptionsFor(componentUnderTest.attributes[0]);
                expect(result).toEqual(mockPriceAttributes()[0].attributeList);
            });
            it('should return valid options for a non-primary attribute', function () {
                componentUnderTest.pricingPreferences = {};
                componentUnderTest.form = mockFormBuilder.group({
                    a: ['r'],
                    b: [''],
                    c: [''],
                    d: ['']
                });
                var result = componentUnderTest.validOptionsFor(componentUnderTest.attributes[1]);
                expect(result).toEqual([{ name: 'J', value: 'j' }, { name: 'K', value: 'k' }, { name: 'L', value: 'l' }]);
            });
            it('should should emit an error and clear the form if there are no valid options', function () {
                componentUnderTest.pricingPreferences = {};
                spyOn(componentUnderTest.pricingEvent, 'emit');
                componentUnderTest.form = mockFormBuilder.group({
                    a: ['t'],
                    b: ['n'],
                    c: ['z'],
                    d: ['']
                });
                componentUnderTest.validOptionsFor(componentUnderTest.attributes[3]);
                expect(componentUnderTest.form.value).toEqual({
                    a: '',
                    b: '',
                    c: '',
                    d: ''
                });
            });
        });
        describe('handleSelect()', function () {
            beforeEach(function () {
                componentUnderTest.pricingPreferences = {};
                componentUnderTest.form = mockFormBuilder.group({
                    a: ['r'],
                    b: ['j'],
                    c: ['v'],
                    d: ['q']
                });
            });
            it('should clear all the children of a given field if event is user input', function () {
                var attribute = componentUnderTest.attributes[0];
                componentUnderTest.handleSelect({ isUserInput: true }, attribute);
                expect(componentUnderTest.form.value).toEqual({
                    a: 'r',
                    b: ''
                });
            });
        });
    });
    function mockPriceAttributes() {
        return [
            {
                primary: true,
                id: 0,
                name: 'a',
                displayName: 'A',
                attributeList: [
                    { name: 'R', value: 'r' },
                    { name: 'S', value: 's' },
                    { name: 'T', value: 't' }
                ],
                validChildChoicesMap: {
                    r: ['j', 'k', 'l'],
                    s: ['k', 'l', 'm'],
                    t: ['n']
                },
                childId: 1
            },
            {
                id: 1,
                name: 'b',
                displayName: 'B',
                attributeList: [
                    { name: 'J', value: 'j' },
                    { name: 'K', value: 'k' },
                    { name: 'L', value: 'l' },
                    { name: 'M', value: 'm' },
                    { name: 'N', value: 'n' }
                ],
                validChildChoicesMap: {
                    j: ['u', 'v'],
                    k: ['v', 'w'],
                    l: ['w', 'x'],
                    m: ['x', 'y'],
                    n: ['y', 'z']
                },
                childId: 2
            },
            {
                id: 2,
                name: 'c',
                displayName: 'C',
                attributeList: [
                    { name: 'V', value: 'v' },
                    { name: 'W', value: 'w' },
                    { name: 'X', value: 'x' },
                    { name: 'Y', value: 'y' },
                    { name: 'Z', value: 'z' }
                ],
                validChildChoicesMap: {
                    v: ['q'],
                    w: ['r'],
                    x: ['s'],
                    y: ['t']
                },
                childId: 3
            },
            {
                id: 3,
                name: 'd',
                displayName: 'D',
                attributeList: [
                    { name: 'Q', value: 'q' },
                    { name: 'R', value: 'r' },
                    { name: 'S', value: 's' },
                    { name: 'T', value: 't' }
                ]
            }
        ];
    }
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvY29tcG9uZW50cy93ei1wcmljaW5nL3d6LnByaWNpbmcuY29tcG9uZW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrREFBNEQ7QUFDNUQsOENBQTZDO0FBQzdDLHNDQUE2QztBQUM3Qyx3Q0FBa0c7QUFDbEcsNkVBQTBFO0FBRTFFO0lBQ0UsUUFBUSxDQUFDLHNCQUFzQixFQUFFO1FBQy9CLElBQUksa0JBQXNDLENBQUM7UUFDM0MsSUFBSSxlQUFvQixDQUFDO1FBQ3pCLElBQUksUUFBYSxDQUFDO1FBQ2xCLElBQUksU0FBdUIsQ0FBQztRQUU1QixVQUFVLENBQUM7WUFDVCxlQUFlLEdBQUcsSUFBSSxtQkFBVyxFQUFFLENBQUM7WUFDcEMsU0FBUyxHQUFHLElBQUksNkJBQVksRUFBRSxDQUFDO1lBQy9CLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLEVBQUUsRUFBRSxVQUFVLEVBQUUsbUJBQW1CLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDL0Usa0JBQWtCLEdBQUcsSUFBSSx5Q0FBa0IsQ0FBQyxlQUFlLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDeEUsa0JBQWtCLENBQUMsWUFBWSxHQUFHLElBQUksbUJBQVksRUFBRSxDQUFDO1lBQ3JELE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUM1QixPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDNUIsQ0FBQyxDQUFDLENBQUM7UUFFSCxTQUFTLENBQUM7WUFDUixPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDOUIsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsMkJBQTJCLEVBQUU7WUFDcEMsRUFBRSxDQUFDLG9EQUFvRCxFQUFFO2dCQUN2RCxrQkFBa0IsQ0FBQyxrQkFBa0IsR0FBRyxFQUFFLENBQUM7Z0JBRTNDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJ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QU8sRUFBRSxDQUFDO2FBQ1g7WUFDRDtnQkFDRSxFQUFFLEVBQUUsQ0FBQztnQkFDTCxJQUFJLEVBQUUsR0FBRztnQkFDVCxXQUFXLEVBQUUsR0FBRztnQkFDaEIsYUFBYSxFQUFFO29CQUNiLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFO29CQUN6QixFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRTtvQkFDekIsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUU7b0JBQ3pCLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFO2lCQUMxQjthQUNGO1NBQ0YsQ0FBQztJQUNKLENBQUM7QUFDSCxDQUFDO0FBelhELG9CQXlYQyIsImZpbGUiOiJhcHAvc2hhcmVkL2NvbXBvbmVudHMvd3otcHJpY2luZy93ei5wcmljaW5nLmNvbXBvbmVudC5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgV3pQcmljaW5nQ29tcG9uZW50IH0gZnJvbSAnLi93ei5wcmljaW5nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUdyb3VwLCBBYnN0cmFjdENvbnRyb2wsIEZvcm1Db250cm9sLCBWYWxpZGF0b3JzLCBGb3JtQnVpbGRlciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE1vY2tBcHBTdG9yZSB9IGZyb20gJy4uLy4uLy4uL3N0b3JlL3NwZWMtaGVscGVycy9tb2NrLWFwcC5zdG9yZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBkZXNjcmliZSgnV3ogUHJpY2luZyBDb21wb25lbnQnLCAoKSA9PiB7XG4gICAgbGV0IGNvbXBvbmVudFVuZGVyVGVzdDogV3pQcmljaW5nQ29tcG9uZW50O1xuICAgIGxldCBtb2NrRm9ybUJ1aWxkZXI6IGFueTtcbiAgICBsZXQgbW9ja0Zvcm06IGFueTtcbiAgICBsZXQgbW9ja1N0b3JlOiBNb2NrQXBwU3RvcmU7XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgIG1vY2tGb3JtQnVpbGRlciA9IG5ldyBGb3JtQnVpbGRlcigpO1xuICAgICAgbW9ja1N0b3JlID0gbmV3IE1vY2tBcHBTdG9yZSgpO1xuICAgICAgbW9ja1N0b3JlLmNyZWF0ZVN0YXRlU2VjdGlvbigncHJpY2luZycsIHsgYXR0cmlidXRlczogbW9ja1ByaWNlQXR0cmlidXRlcygpIH0pO1xuICAgICAgY29tcG9uZW50VW5kZXJUZXN0ID0gbmV3IFd6UHJpY2luZ0NvbXBvbmVudChtb2NrRm9ybUJ1aWxkZXIsIG1vY2tTdG9yZSk7XG4gICAgICBjb21wb25lbnRVbmRlclRlc3QucHJpY2luZ0V2ZW50ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgICAgamFzbWluZS5jbG9jaygpLnVuaW5zdGFsbCgpO1xuICAgICAgamFzbWluZS5jbG9jaygpLmluc3RhbGwoKTtcbiAgICB9KTtcblxuICAgIGFmdGVyRWFjaCgoKSA9PiB7XG4gICAgICBqYXNtaW5lLmNsb2NrKCkudW5pbnN0YWxsKCk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgncHJpY2luZ1ByZWZlcmVuY2VzIHNldHRlcicsICgpID0+IHtcbiAgICAgIGl0KCdzaG91bGQgYnVpbGQgdGhlIGZvcm0gcHJvcGVybHkgd2l0aCBubyBwcmVmZXJlbmNlcycsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnByaWNpbmdQcmVmZXJlbmNlcyA9IHt9O1xuXG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuZm9ybS52YWx1ZSkudG9FcXVhbCh7IGE6ICcnIH0pOyAvLyBkaXNhYmxlZCBmaWVsZHMgZG9uJ3QgaGF2ZSBhIHZhbHVlXG4gICAgICB9KTtcblxuICAgICAgaXQoJ3Nob3VsZCBidWlsZCB0aGUgZm9ybSBwcm9wZXJseSB3aXRoIHByZWZlcmVuY2VzJywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QucHJpY2luZ1ByZWZlcmVuY2VzID0ge1xuICAgICAgICAgIGE6ICdzJyxcbiAgICAgICAgICBiOiAnbScsXG4gICAgICAgICAgYzogJ3gnLFxuICAgICAgICAgIGQ6ICdzJ1xuICAgICAgICB9O1xuXG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuZm9ybS52YWx1ZSkudG9FcXVhbCh7IGE6ICdzJywgYjogJ20nLCBjOiAneCcsIGQ6ICdzJyB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnc2hvdWxkIGJ1aWxkIGEgYmxhbmsgZm9ybSBpZiB0aGUgcHJlZmVyZW5jZXMgYXJlIGludmFsaWQnLCAoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5wcmljaW5nUHJlZmVyZW5jZXMgPSB7XG4gICAgICAgICAgaW52YWxpZDogJ3ByZWZlcmVuY2UnXG4gICAgICAgIH07XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuZm9ybS52YWx1ZSkudG9FcXVhbCh7IGE6ICcnIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdlbWl0cyB0aGUgcHJpY2luZyBldmVudCB0byBjYWxjdWxhdGUgdGhlIHByaWNlIGlmIHByZWZlcmVuY2VzIGV4aXN0IGFuZCB0aGUgcHJpY2UgY29uZmlnIGhhc25cXCd0IGNoYW5nZWQnLCAoKSA9PiB7XG4gICAgICAgIHNweU9uKGNvbXBvbmVudFVuZGVyVGVzdC5wcmljaW5nRXZlbnQsICdlbWl0Jyk7XG5cbiAgICAgICAgbGV0IG1vY2tQcmVmczogYW55ID0ge1xuICAgICAgICAgIGE6ICdzJyxcbiAgICAgICAgICBiOiAnbScsXG4gICAgICAgICAgYzogJ3gnLFxuICAgICAgICAgIGQ6ICdzJ1xuICAgICAgICB9O1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QucHJpY2luZ1ByZWZlcmVuY2VzID0gbW9ja1ByZWZzO1xuICAgICAgICBqYXNtaW5lLmNsb2NrKCkudGljaygxKTtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5wcmljaW5nRXZlbnQuZW1pdCkudG9IYXZlQmVlbkNhbGxlZFdpdGgoeyB0eXBlOiAnQ0FMQ1VMQVRFX1BSSUNFJywgcGF5bG9hZDogbW9ja1ByZWZzIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdkb2VzblxcJ3QgZW1pdCB0aGUgcHJpY2luZyBldmVudCB3aGVuIHRoZSBwcmVmZXJlbmNlcyBhcmUgZW1wdHknLCAoKSA9PiB7XG4gICAgICAgIHNweU9uKGNvbXBvbmVudFVuZGVyVGVzdC5wcmljaW5nRXZlbnQsICdlbWl0Jyk7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5wcmljaW5nUHJlZmVyZW5jZXMgPSB7fTtcblxuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnByaWNpbmdFdmVudC5lbWl0KS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgndXNlckNhbkN1c3RvbWl6ZVJpZ2h0cyBzZXR0ZXInLCAoKSA9PiB7XG4gICAgICBpdCgnYXNzaWducyB0aGUgdmFsdWUgb2YgdGhlIGlucHV0IHRvIHRoZSBfdXNlckNhbkN1c3RvbWl6ZVJpZ2h0cyB2YXJpYWJsZScsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnVzZXJDYW5DdXN0b21pemVSaWdodHMgPSBmYWxzZTtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5fdXNlckNhbkN1c3RvbWl6ZVJpZ2h0cykudG9CZShmYWxzZSk7XG4gICAgICB9KTtcblxuICAgICAgZGVzY3JpYmUoJ3doZW4gdGhlIGlucHV0IGlzIFxcJ3RydWVcXCcnLCAoKSA9PiB7XG4gICAgICAgIGRlc2NyaWJlKCdidWlsZHMgdGhlIGN1c3RvbSBwcmljaW5nIGF0dHJpYnV0ZSBmb3JtJywgKCkgPT4ge1xuICAgICAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnByaWNpbmdQcmVmZXJlbmNlcyA9IHtcbiAgICAgICAgICAgICAgYTogJ3MnLFxuICAgICAgICAgICAgICBiOiAnbScsXG4gICAgICAgICAgICAgIGM6ICd4JyxcbiAgICAgICAgICAgICAgZDogJ3MnXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnVzZXJDYW5DdXN0b21pemVSaWdodHMgPSB0cnVlO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgaXQoJ3dpdGggdGhlIHByb3BlciB2YWx1ZXMnLCAoKSA9PiB7XG4gICAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmN1c3RvbUZvcm0udmFsdWUpLnRvRXF1YWwoe1xuICAgICAgICAgICAgICBhOiAncycsXG4gICAgICAgICAgICAgIGF0dHJpYnV0ZXM6ICdiLG1cXG5jLHhcXG5kLHMnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGRlc2NyaWJlKCd3aXRoIHRoZSByaWdodCB2YWxpZGF0b3IgcGF0dGVybicsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZhaWxzID0gWyduYW1lJywgJ25hbWUsXFxubmFtZSx2YWx1ZScsICduYW1lLHZhbHVlXFxuXFxuJ107XG4gICAgICAgICAgICBjb25zdCBwYXNzZXMgPSBbJycsICduYW1lLHZhbHVlJywgJ25hbWUsdmFsdWVcXG4nLCAnbmFtZTIsc29tZV92YWx1ZVxcbnNvbWVfbmFtZSxBbm90aGVyIFZhbHVlJ107XG5cbiAgICAgICAgICAgIGZhaWxzLmZvckVhY2goKHRlc3Q6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgICBpdChgJHtKU09OLnN0cmluZ2lmeSh0ZXN0KX0gZmFpbHNgLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY29udHJvbDogQWJzdHJhY3RDb250cm9sID0gY29tcG9uZW50VW5kZXJUZXN0LmN1c3RvbUZvcm0uY29udHJvbHNbJ2F0dHJpYnV0ZXMnXTtcbiAgICAgICAgICAgICAgICBjb250cm9sLnNldFZhbHVlKHRlc3QpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChjb250cm9sLmhhc0Vycm9yKCdwYXR0ZXJuJykpLnRvQmUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgY29udHJvbC5yZXNldCgpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBwYXNzZXMuZm9yRWFjaCgodGVzdDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgIGl0KGAke0pTT04uc3RyaW5naWZ5KHRlc3QpfSBwYXNzZXNgLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY29udHJvbDogQWJzdHJhY3RDb250cm9sID0gY29tcG9uZW50VW5kZXJUZXN0LmN1c3RvbUZvcm0uY29udHJvbHNbJ2F0dHJpYnV0ZXMnXTtcbiAgICAgICAgICAgICAgICBjb250cm9sLnNldFZhbHVlKHRlc3QpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChjb250cm9sLmhhc0Vycm9yKCdwYXR0ZXJuJykpLnRvQmUoZmFsc2UpO1xuICAgICAgICAgICAgICAgIGNvbnRyb2wucmVzZXQoKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgZGVzY3JpYmUoJ3doZW4gdGhlIGlucHV0IGlzIFxcJ2ZhbHNlXFwnJywgKCkgPT4ge1xuICAgICAgICBpdCgnZG9lcyBub3QgYnVpbGQgdGhlIGN1c3RvbSBwcmljaW5nIGF0dHJpYnV0ZSBmb3JtJywgKCkgPT4ge1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC51c2VyQ2FuQ3VzdG9taXplUmlnaHRzID0gZmFsc2U7XG4gICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5jdXN0b21Gb3JtKS50b0JlVW5kZWZpbmVkKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnb25TdWJtaXQoKScsICgpID0+IHtcbiAgICAgIGl0KCdzaG91bGQgZW1pdCB0aGUgY2FsY3VsYXRlUHJpY2luZyBldmVudCB3aXRoIHRoZSBmb3JtJywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QucHJpY2luZ1ByZWZlcmVuY2VzID0ge1xuICAgICAgICAgIGE6ICdzJyxcbiAgICAgICAgICBiOiAnbScsXG4gICAgICAgICAgYzogJ3gnLFxuICAgICAgICAgIGQ6ICdzJ1xuICAgICAgICB9O1xuICAgICAgICBzcHlPbihjb21wb25lbnRVbmRlclRlc3QucHJpY2luZ0V2ZW50LCAnZW1pdCcpO1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QucHJpY2UgPSBPYnNlcnZhYmxlLm9mKDEwKTtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm9uU3VibWl0KCk7XG5cbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5wcmljaW5nRXZlbnQuZW1pdCkudG9IYXZlQmVlbkNhbGxlZFdpdGgoe1xuICAgICAgICAgIHR5cGU6ICdBUFBMWV9QUklDRScsXG4gICAgICAgICAgcGF5bG9hZDoge1xuICAgICAgICAgICAgcHJpY2U6IDEwLFxuICAgICAgICAgICAgYXR0cmlidXRlczogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcHJpY2VBdHRyaWJ1dGVEaXNwbGF5TmFtZTogJ0EnLCBwcmljZUF0dHJpYnV0ZU5hbWU6ICdhJywgc2VsZWN0ZWRBdHRyaWJ1dGVOYW1lOiAnUycsIHNlbGVjdGVkQXR0cmlidXRlVmFsdWU6ICdzJ1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcHJpY2VBdHRyaWJ1dGVEaXNwbGF5TmFtZTogJ0InLCBwcmljZUF0dHJpYnV0ZU5hbWU6ICdiJywgc2VsZWN0ZWRBdHRyaWJ1dGVOYW1lOiAnTScsIHNlbGVjdGVkQXR0cmlidXRlVmFsdWU6ICdtJ1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcHJpY2VBdHRyaWJ1dGVEaXNwbGF5TmFtZTogJ0MnLCBwcmljZUF0dHJpYnV0ZU5hbWU6ICdjJywgc2VsZWN0ZWRBdHRyaWJ1dGVOYW1lOiAnWCcsIHNlbGVjdGVkQXR0cmlidXRlVmFsdWU6ICd4J1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcHJpY2VBdHRyaWJ1dGVEaXNwbGF5TmFtZTogJ0QnLCBwcmljZUF0dHJpYnV0ZU5hbWU6ICdkJywgc2VsZWN0ZWRBdHRyaWJ1dGVOYW1lOiAnUycsIHNlbGVjdGVkQXR0cmlidXRlVmFsdWU6ICdzJ1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgdXBkYXRlUHJlZnM6IHRydWUsXG4gICAgICAgICAgICBwcmVmZXJlbmNlczoge1xuICAgICAgICAgICAgICBhOiAncycsXG4gICAgICAgICAgICAgIGI6ICdtJyxcbiAgICAgICAgICAgICAgYzogJ3gnLFxuICAgICAgICAgICAgICBkOiAncydcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnb25TdWJtaXRDdXN0b20oKScsICgpID0+IHtcbiAgICAgIGl0KCdzaG91bGQgZW1pdCB0aGUgcHJpY2luZyBldmVudCB3aXRoIHRoZSBmb3JtJywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QucHJpY2luZ1ByZWZlcmVuY2VzID0ge1xuICAgICAgICAgIGE6ICdzJyxcbiAgICAgICAgICBiOiAnbScsXG4gICAgICAgICAgYzogJ3gnLFxuICAgICAgICAgIGQ6ICdzJ1xuICAgICAgICB9O1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QudXNlckNhbkN1c3RvbWl6ZVJpZ2h0cyA9IHRydWU7XG4gICAgICAgIHNweU9uKGNvbXBvbmVudFVuZGVyVGVzdC5wcmljaW5nRXZlbnQsICdlbWl0Jyk7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5vblN1Ym1pdEN1c3RvbSgpO1xuXG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QucHJpY2luZ0V2ZW50LmVtaXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHtcbiAgICAgICAgICB0eXBlOiAnQVBQTFlfUFJJQ0UnLFxuICAgICAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHByaWNlQXR0cmlidXRlRGlzcGxheU5hbWU6ICdBJywgcHJpY2VBdHRyaWJ1dGVOYW1lOiAnYScsIHNlbGVjdGVkQXR0cmlidXRlTmFtZTogJ1MnLCBzZWxlY3RlZEF0dHJpYnV0ZVZhbHVlOiAncydcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHByaWNlQXR0cmlidXRlRGlzcGxheU5hbWU6ICdiJywgcHJpY2VBdHRyaWJ1dGVOYW1lOiAnYicsIHNlbGVjdGVkQXR0cmlidXRlTmFtZTogJ20nLCBzZWxlY3RlZEF0dHJpYnV0ZVZhbHVlOiAnbSdcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHByaWNlQXR0cmlidXRlRGlzcGxheU5hbWU6ICdjJywgcHJpY2VBdHRyaWJ1dGVOYW1lOiAnYycsIHNlbGVjdGVkQXR0cmlidXRlTmFtZTogJ3gnLCBzZWxlY3RlZEF0dHJpYnV0ZVZhbHVlOiAneCdcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHByaWNlQXR0cmlidXRlRGlzcGxheU5hbWU6ICdkJywgcHJpY2VBdHRyaWJ1dGVOYW1lOiAnZCcsIHNlbGVjdGVkQXR0cmlidXRlTmFtZTogJ3MnLCBzZWxlY3RlZEF0dHJpYnV0ZVZhbHVlOiAncydcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHVwZGF0ZVByZWZzOiBmYWxzZVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdwYXJlbnRJc0VtcHR5KCknLCAoKSA9PiB7XG4gICAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnByaWNpbmdQcmVmZXJlbmNlcyA9IHt9O1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlIGlmIHRoZSBhdHRyaWJ1dGUgaXMgdGhlIHBhcmVudCBvZiBhbGwgb3RoZXIgYXR0cmlidXRlJywgKCkgPT4ge1xuICAgICAgICBsZXQgcmVzdWx0ID0gY29tcG9uZW50VW5kZXJUZXN0LnBhcmVudElzRW1wdHkoY29tcG9uZW50VW5kZXJUZXN0LmF0dHJpYnV0ZXNbMF0pO1xuXG4gICAgICAgIGV4cGVjdChyZXN1bHQpLnRvQmUoZmFsc2UpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdzaG91bGQgcmV0dXJuIHRydWUgaWYgdGhlIGZvcm0gdmFsdWUgb2YgdGhlIGF0dHJpYnV0ZXMgcGFyZW50IGlzIGVtcHR5JywgKCkgPT4ge1xuICAgICAgICBsZXQgcmVzdWx0ID0gY29tcG9uZW50VW5kZXJUZXN0LnBhcmVudElzRW1wdHkoY29tcG9uZW50VW5kZXJUZXN0LmF0dHJpYnV0ZXNbMV0pO1xuXG4gICAgICAgIGV4cGVjdChyZXN1bHQpLnRvQmUodHJ1ZSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gZmFsc2UgaWYgdGhlIHBhcmVudCBpcyBub3QgZW1wdHknLCAoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5mb3JtID0gbW9ja0Zvcm1CdWlsZGVyLmdyb3VwKHtcbiAgICAgICAgICBhOiBbJ3MnXSxcbiAgICAgICAgICBiOiBbJ20nXSxcbiAgICAgICAgICBjOiBbJyddLFxuICAgICAgICAgIGQ6IFsnJ11cbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IHJlc3VsdCA9IGNvbXBvbmVudFVuZGVyVGVzdC5wYXJlbnRJc0VtcHR5KGNvbXBvbmVudFVuZGVyVGVzdC5hdHRyaWJ1dGVzWzJdKTtcblxuICAgICAgICBleHBlY3QocmVzdWx0KS50b0JlKGZhbHNlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3ZhbGlkT3B0aW9uc0ZvcigpJywgKCkgPT4ge1xuICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gaWYgdGhlIGF0dHJpYnV0ZXMgcGFyZW50IGlzIGVtcHR5JywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QucHJpY2luZ1ByZWZlcmVuY2VzID0ge307XG4gICAgICAgIGxldCByZXN1bHQgPSBjb21wb25lbnRVbmRlclRlc3QudmFsaWRPcHRpb25zRm9yKGNvbXBvbmVudFVuZGVyVGVzdC5hdHRyaWJ1dGVzWzFdKTtcbiAgICAgICAgZXhwZWN0KHJlc3VsdCkudG9CZVVuZGVmaW5lZCgpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdzaG91bGQgcmV0dXJuIHZhbGlkIG9wdGlvbnMgZm9yIHRoZSBwcmltYXJ5IGF0dHJpYnV0ZScsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnByaWNpbmdQcmVmZXJlbmNlcyA9IHt9O1xuICAgICAgICBsZXQgcmVzdWx0ID0gY29tcG9uZW50VW5kZXJUZXN0LnZhbGlkT3B0aW9uc0Zvcihjb21wb25lbnRVbmRlclRlc3QuYXR0cmlidXRlc1swXSk7XG5cbiAgICAgICAgZXhwZWN0KHJlc3VsdCkudG9FcXVhbChtb2NrUHJpY2VBdHRyaWJ1dGVzKClbMF0uYXR0cmlidXRlTGlzdCk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gdmFsaWQgb3B0aW9ucyBmb3IgYSBub24tcHJpbWFyeSBhdHRyaWJ1dGUnLCAoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5wcmljaW5nUHJlZmVyZW5jZXMgPSB7fTtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmZvcm0gPSBtb2NrRm9ybUJ1aWxkZXIuZ3JvdXAoe1xuICAgICAgICAgIGE6IFsnciddLFxuICAgICAgICAgIGI6IFsnJ10sXG4gICAgICAgICAgYzogWycnXSxcbiAgICAgICAgICBkOiBbJyddXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxldCByZXN1bHQgPSBjb21wb25lbnRVbmRlclRlc3QudmFsaWRPcHRpb25zRm9yKGNvbXBvbmVudFVuZGVyVGVzdC5hdHRyaWJ1dGVzWzFdKTtcblxuICAgICAgICBleHBlY3QocmVzdWx0KS50b0VxdWFsKFt7IG5hbWU6ICdKJywgdmFsdWU6ICdqJyB9LCB7IG5hbWU6ICdLJywgdmFsdWU6ICdrJyB9LCB7IG5hbWU6ICdMJywgdmFsdWU6ICdsJyB9XSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3Nob3VsZCBzaG91bGQgZW1pdCBhbiBlcnJvciBhbmQgY2xlYXIgdGhlIGZvcm0gaWYgdGhlcmUgYXJlIG5vIHZhbGlkIG9wdGlvbnMnLCAoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5wcmljaW5nUHJlZmVyZW5jZXMgPSB7fTtcbiAgICAgICAgc3B5T24oY29tcG9uZW50VW5kZXJUZXN0LnByaWNpbmdFdmVudCwgJ2VtaXQnKTtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmZvcm0gPSBtb2NrRm9ybUJ1aWxkZXIuZ3JvdXAoe1xuICAgICAgICAgIGE6IFsndCddLFxuICAgICAgICAgIGI6IFsnbiddLFxuICAgICAgICAgIGM6IFsneiddLFxuICAgICAgICAgIGQ6IFsnJ11cbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnZhbGlkT3B0aW9uc0Zvcihjb21wb25lbnRVbmRlclRlc3QuYXR0cmlidXRlc1szXSk7XG5cbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5mb3JtLnZhbHVlKS50b0VxdWFsKHtcbiAgICAgICAgICBhOiAnJyxcbiAgICAgICAgICBiOiAnJyxcbiAgICAgICAgICBjOiAnJyxcbiAgICAgICAgICBkOiAnJ1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2hhbmRsZVNlbGVjdCgpJywgKCkgPT4ge1xuICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5wcmljaW5nUHJlZmVyZW5jZXMgPSB7fTtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmZvcm0gPSBtb2NrRm9ybUJ1aWxkZXIuZ3JvdXAoe1xuICAgICAgICAgIGE6IFsnciddLFxuICAgICAgICAgIGI6IFsnaiddLFxuICAgICAgICAgIGM6IFsndiddLFxuICAgICAgICAgIGQ6IFsncSddXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdzaG91bGQgY2xlYXIgYWxsIHRoZSBjaGlsZHJlbiBvZiBhIGdpdmVuIGZpZWxkIGlmIGV2ZW50IGlzIHVzZXIgaW5wdXQnLCAoKSA9PiB7XG4gICAgICAgIGxldCBhdHRyaWJ1dGU6IGFueSA9IGNvbXBvbmVudFVuZGVyVGVzdC5hdHRyaWJ1dGVzWzBdO1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuaGFuZGxlU2VsZWN0KHsgaXNVc2VySW5wdXQ6IHRydWUgfSBhcyBhbnksIGF0dHJpYnV0ZSk7XG5cbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5mb3JtLnZhbHVlKS50b0VxdWFsKHtcbiAgICAgICAgICBhOiAncicsXG4gICAgICAgICAgYjogJydcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZnVuY3Rpb24gbW9ja1ByaWNlQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAge1xuICAgICAgICBwcmltYXJ5OiB0cnVlLFxuICAgICAgICBpZDogMCxcbiAgICAgICAgbmFtZTogJ2EnLFxuICAgICAgICBkaXNwbGF5TmFtZTogJ0EnLFxuICAgICAgICBhdHRyaWJ1dGVMaXN0OiBbXG4gICAgICAgICAgeyBuYW1lOiAnUicsIHZhbHVlOiAncicgfSxcbiAgICAgICAgICB7IG5hbWU6ICdTJywgdmFsdWU6ICdzJyB9LFxuICAgICAgICAgIHsgbmFtZTogJ1QnLCB2YWx1ZTogJ3QnIH1cbiAgICAgICAgXSxcbiAgICAgICAgdmFsaWRDaGlsZENob2ljZXNNYXA6IHtcbiAgICAgICAgICByOiBbJ2onLCAnaycsICdsJ10sXG4gICAgICAgICAgczogWydrJywgJ2wnLCAnbSddLFxuICAgICAgICAgIHQ6IFsnbiddXG4gICAgICAgIH0sXG4gICAgICAgIGNoaWxkSWQ6IDFcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGlkOiAxLFxuICAgICAgICBuYW1lOiAnYicsXG4gICAgICAgIGRpc3BsYXlOYW1lOiAnQicsXG4gICAgICAgIGF0dHJpYnV0ZUxpc3Q6IFtcbiAgICAgICAgICB7IG5hbWU6ICdKJywgdmFsdWU6ICdqJyB9LFxuICAgICAgICAgIHsgbmFtZTogJ0snLCB2YWx1ZTogJ2snIH0sXG4gICAgICAgICAgeyBuYW1lOiAnTCcsIHZhbHVlOiAnbCcgfSxcbiAgICAgICAgICB7IG5hbWU6ICdNJywgdmFsdWU6ICdtJyB9LFxuICAgICAgICAgIHsgbmFtZTogJ04nLCB2YWx1ZTogJ24nIH1cbiAgICAgICAgXSxcbiAgICAgICAgdmFsaWRDaGlsZENob2ljZXNNYXA6IHtcbiAgICAgICAgICBqOiBbJ3UnLCAndiddLFxuICAgICAgICAgIGs6IFsndicsICd3J10sXG4gICAgICAgICAgbDogWyd3JywgJ3gnXSxcbiAgICAgICAgICBtOiBbJ3gnLCAneSddLFxuICAgICAgICAgIG46IFsneScsICd6J11cbiAgICAgICAgfSxcbiAgICAgICAgY2hpbGRJZDogMlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgaWQ6IDIsXG4gICAgICAgIG5hbWU6ICdjJyxcbiAgICAgICAgZGlzcGxheU5hbWU6ICdDJyxcbiAgICAgICAgYXR0cmlidXRlTGlzdDogW1xuICAgICAgICAgIHsgbmFtZTogJ1YnLCB2YWx1ZTogJ3YnIH0sXG4gICAgICAgICAgeyBuYW1lOiAnVycsIHZhbHVlOiAndycgfSxcbiAgICAgICAgICB7IG5hbWU6ICdYJywgdmFsdWU6ICd4JyB9LFxuICAgICAgICAgIHsgbmFtZTogJ1knLCB2YWx1ZTogJ3knIH0sXG4gICAgICAgICAgeyBuYW1lOiAnWicsIHZhbHVlOiAneicgfVxuICAgICAgICBdLFxuICAgICAgICB2YWxpZENoaWxkQ2hvaWNlc01hcDoge1xuICAgICAgICAgIHY6IFsncSddLFxuICAgICAgICAgIHc6IFsnciddLFxuICAgICAgICAgIHg6IFsncyddLFxuICAgICAgICAgIHk6IFsndCddXG4gICAgICAgIH0sXG4gICAgICAgIGNoaWxkSWQ6IDNcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGlkOiAzLFxuICAgICAgICBuYW1lOiAnZCcsXG4gICAgICAgIGRpc3BsYXlOYW1lOiAnRCcsXG4gICAgICAgIGF0dHJpYnV0ZUxpc3Q6IFtcbiAgICAgICAgICB7IG5hbWU6ICdRJywgdmFsdWU6ICdxJyB9LFxuICAgICAgICAgIHsgbmFtZTogJ1InLCB2YWx1ZTogJ3InIH0sXG4gICAgICAgICAgeyBuYW1lOiAnUycsIHZhbHVlOiAncycgfSxcbiAgICAgICAgICB7IG5hbWU6ICdUJywgdmFsdWU6ICd0JyB9XG4gICAgICAgIF1cbiAgICAgIH1cbiAgICBdO1xuICB9XG59XG4iXX0=
