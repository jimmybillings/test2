import { Pojo } from '../../../../shared/interfaces/common.interface';
import { WzFormPicklistComponent } from './wz-form-picklist.component';

export function main() {
  describe('Wz Form Picklist Component', () => {
    let componentUnderTest: WzFormPicklistComponent;

    beforeEach(() => {
      componentUnderTest = new WzFormPicklistComponent(null, null, null);
    });

    describe('onSelectSuggestion()', () => {
      it('Should emit a formSubmit event with a suggestion', () => {
        spyOn(componentUnderTest.selectContact, 'emit');
        componentUnderTest.onSelectChange({ id: 1, Account: 'some account' });
        expect(componentUnderTest.selectContact.emit).toHaveBeenCalledWith({ id: 1, Account: 'some account' });
      });
    });

    describe('set displayProperties()', () => {
      it('Should parse the properties into translation strings', () => {
        let mockProperties: Pojo = {
          contactEmail: 'mjustus.wazee+invoice1@gmail.com',
          contacts: [{ some: 'contact' }],
          name: 'JUSTUS',
          id: 7845
        };

        componentUnderTest.displayProperties = mockProperties;
        let parsedProperties: Pojo;
        componentUnderTest.labels.subscribe(labels => parsedProperties = labels);
        expect(parsedProperties).toEqual([{ 'label': 'QUOTE.EDIT.CONTACT_EMAIL_KEY', 'value': 'mjustus.wazee+invoice1@gmail.com' }]);
      });

      it('Should not error if an undefined input is passed to display properties', () => {
        let mockProperties: Pojo;
        let parsedProperties: Pojo;
        componentUnderTest.displayProperties = mockProperties;
        componentUnderTest.labels.subscribe(labels => parsedProperties = labels);
        expect(parsedProperties).toEqual([]);
      });
    });

    describe('onCheckboxChange()', () => {
      it('emits the checkboxChange event', () => {
        spyOn(componentUnderTest.checkboxChange, 'emit');
        componentUnderTest.onCheckboxChange({ some: 'event' } as any);
        expect(componentUnderTest.checkboxChange.emit).toHaveBeenCalledWith({ some: 'event' });
      });
    });
  });
}
