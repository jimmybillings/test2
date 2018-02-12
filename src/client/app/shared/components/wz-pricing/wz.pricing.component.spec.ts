import { WzPricingComponent } from './wz.pricing.component';
import { Observable } from 'rxjs/Observable';
import { EventEmitter } from '@angular/core';
import { FormGroup, AbstractControl, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MockAppStore } from '../../../store/spec-helpers/mock-app.store';

export function main() {
  describe('Wz Pricing Component', () => {
    let componentUnderTest: WzPricingComponent;
    let mockFormBuilder: any;
    let mockForm: any;
    let mockStore: MockAppStore;

    beforeEach(() => {
      mockFormBuilder = new FormBuilder();
      mockStore = new MockAppStore();
      mockStore.createStateSection('pricing', { attributes: mockPriceAttributes() });
      componentUnderTest = new WzPricingComponent(mockFormBuilder, mockStore);
      componentUnderTest.pricingEvent = new EventEmitter();
      jasmine.clock().uninstall();
      jasmine.clock().install();
    });

    afterEach(() => {
      jasmine.clock().uninstall();
    });

    describe('pricingPreferences setter', () => {
      it('should build the form properly with no preferences', () => {
        componentUnderTest.pricingPreferences = {};

        expect(componentUnderTest.form.value).toEqual({ a: '' }); // disabled fields don't have a value
      });

      it('should build the form properly with preferences', () => {
        componentUnderTest.pricingPreferences = {
          a: 's',
          b: 'm',
          c: 'x',
          d: 's'
        };

        expect(componentUnderTest.form.value).toEqual({ a: 's', b: 'm', c: 'x', d: 's' });
      });

      it('should build a blank form if the preferences are invalid', () => {
        componentUnderTest.pricingPreferences = {
          invalid: 'preference'
        };
        expect(componentUnderTest.form.value).toEqual({ a: '' });
      });

      it('emits the pricing event to calculate the price if preferences exist and the price config hasn\'t changed', () => {
        spyOn(componentUnderTest.pricingEvent, 'emit');

        let mockPrefs: any = {
          a: 's',
          b: 'm',
          c: 'x',
          d: 's'
        };
        componentUnderTest.pricingPreferences = mockPrefs;
        jasmine.clock().tick(1);
        expect(componentUnderTest.pricingEvent.emit).toHaveBeenCalledWith({ type: 'CALCULATE_PRICE', payload: mockPrefs });
      });

      it('doesn\'t emit the pricing event when the preferences are empty', () => {
        spyOn(componentUnderTest.pricingEvent, 'emit');
        componentUnderTest.pricingPreferences = {};

        expect(componentUnderTest.pricingEvent.emit).not.toHaveBeenCalled();
      });
    });

    describe('userCanCustomizeRights setter', () => {
      it('assigns the value of the input to the _userCanCustomizeRights variable', () => {
        componentUnderTest.userCanCustomizeRights = false;
        expect(componentUnderTest._userCanCustomizeRights).toBe(false);
      });

      describe('when the input is \'true\'', () => {
        describe('builds the custom pricing attribute form', () => {
          beforeEach(() => {
            componentUnderTest.pricingPreferences = {
              a: 's',
              b: 'm',
              c: 'x',
              d: 's'
            };
            componentUnderTest.userCanCustomizeRights = true;
          });

          it('with the proper values', () => {
            expect(componentUnderTest.customForm.value).toEqual({
              a: 's',
              attributes: 'b,m\nc,x\nd,s'
            });
          });

          describe('with the right validator pattern', () => {
            const fails = ['name', 'name,\nname,value', 'name,value\n\n'];
            const passes = ['', 'name,value', 'name,value\n', 'name2,some_value\nsome_name,Another Value'];

            fails.forEach((test: string) => {
              it(`${JSON.stringify(test)} fails`, () => {
                const control: AbstractControl = componentUnderTest.customForm.controls['attributes'];
                control.setValue(test);
                expect(control.hasError('pattern')).toBe(true);
                control.reset();
              });
            });

            passes.forEach((test: string) => {
              it(`${JSON.stringify(test)} passes`, () => {
                const control: AbstractControl = componentUnderTest.customForm.controls['attributes'];
                control.setValue(test);
                expect(control.hasError('pattern')).toBe(false);
                control.reset();
              });
            });
          });
        });
      });

      describe('when the input is \'false\'', () => {
        it('does not build the custom pricing attribute form', () => {
          componentUnderTest.userCanCustomizeRights = false;
          expect(componentUnderTest.customForm).toBeUndefined();
        });
      });
    });

    describe('onSubmit()', () => {
      it('should emit the calculatePricing event with the form', () => {
        componentUnderTest.pricingPreferences = {
          a: 's',
          b: 'm',
          c: 'x',
          d: 's'
        };
        spyOn(componentUnderTest.pricingEvent, 'emit');
        componentUnderTest.price = Observable.of(10);
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

    describe('onSubmitCustom()', () => {
      it('should emit the pricing event with the form', () => {
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

    describe('parentIsEmpty()', () => {
      beforeEach(() => {
        componentUnderTest.pricingPreferences = {};
      });

      it('should return false if the attribute is the parent of all other attribute', () => {
        let result = componentUnderTest.parentIsEmpty(componentUnderTest.attributes[0]);

        expect(result).toBe(false);
      });

      it('should return true if the form value of the attributes parent is empty', () => {
        let result = componentUnderTest.parentIsEmpty(componentUnderTest.attributes[1]);

        expect(result).toBe(true);
      });

      it('should return false if the parent is not empty', () => {
        componentUnderTest.form = mockFormBuilder.group({
          a: ['s'],
          b: ['m'],
          c: [''],
          d: ['']
        });

        let result = componentUnderTest.parentIsEmpty(componentUnderTest.attributes[2]);

        expect(result).toBe(false);
      });
    });

    describe('validOptionsFor()', () => {
      it('should return if the attributes parent is empty', () => {
        componentUnderTest.pricingPreferences = {};
        let result = componentUnderTest.validOptionsFor(componentUnderTest.attributes[1]);
        expect(result).toBeUndefined();
      });

      it('should return valid options for the primary attribute', () => {
        componentUnderTest.pricingPreferences = {};
        let result = componentUnderTest.validOptionsFor(componentUnderTest.attributes[0]);

        expect(result).toEqual(mockPriceAttributes()[0].attributeList);
      });

      it('should return valid options for a non-primary attribute', () => {
        componentUnderTest.pricingPreferences = {};
        componentUnderTest.form = mockFormBuilder.group({
          a: ['r'],
          b: [''],
          c: [''],
          d: ['']
        });

        let result = componentUnderTest.validOptionsFor(componentUnderTest.attributes[1]);

        expect(result).toEqual([{ name: 'J', value: 'j' }, { name: 'K', value: 'k' }, { name: 'L', value: 'l' }]);
      });

      it('should should emit an error and clear the form if there are no valid options', () => {
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

    describe('handleSelect()', () => {
      beforeEach(() => {
        componentUnderTest.pricingPreferences = {};
        componentUnderTest.form = mockFormBuilder.group({
          a: ['r'],
          b: ['j'],
          c: ['v'],
          d: ['q']
        });
      });

      it('should clear all the children of a given field if event is user input', () => {
        let attribute: any = componentUnderTest.attributes[0];
        componentUnderTest.handleSelect({ isUserInput: true } as any, attribute);

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
