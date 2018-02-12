import { Pojo } from '../../../../shared/interfaces/common.interface';
import { WzFormAutoCompleteViewComponent } from './wz-form-autocomplete-view.component';

export function main() {
  describe('Wz Form Auto Complete View Component', () => {
    let componentUnderTest: WzFormAutoCompleteViewComponent;

    beforeEach(() => {
      componentUnderTest = new WzFormAutoCompleteViewComponent(null, null, null);
    });

    describe('onSelectSuggestion()', () => {
      it('Should emit a formSubmit event with a suggestion', () => {
        spyOn(componentUnderTest.formSubmit, 'emit');
        componentUnderTest.onSelectSuggestion({ id: 1, Account: 'some account' });
        expect(componentUnderTest.formSubmit.emit).toHaveBeenCalledWith({ id: 1, Account: 'some account' });
      });
    });

    describe('set displayProperties()', () => {
      it('Should parse the properties into translation strings', () => {
        let mockProperties: Pojo = {
          id: 53,
          customerName: 'James Billings',
          email: 'james.billings@wazeedigital.com'
        };

        componentUnderTest.displayProperties = mockProperties;
        let parsedProperties: Pojo;
        componentUnderTest.labels.subscribe(labels => parsedProperties = labels);
        expect(parsedProperties).toEqual([{ label: 'QUOTE.EDIT.CUSTOMER_NAME_KEY', value: 'James Billings' }]);
      });

      it('Should not error if an undefined input is passed to display properties', () => {
        let mockProperties: Pojo;
        let parsedProperties: Pojo;
        componentUnderTest.displayProperties = mockProperties;
        componentUnderTest.labels.subscribe(labels => parsedProperties = labels);
        expect(parsedProperties).toEqual([]);
      });
    });
  });
}
