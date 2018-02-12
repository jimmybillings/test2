import { MockAppStore } from '../../../store/spec-helpers/mock-app.store';
import { Observable } from 'rxjs/Observable';

import { ProjectsComponent } from './projects.component';

export function main() {
  describe('Projects', () => {

    const mockLineItem: any = {
      id: '456',
      price: 0,
      rightsManaged: 'Rights Managed'
    };

    const mockLineItemB: any = {
      id: '789',
      attributes: [],
      price: 0,
      rightsManaged: 'Royalty Free'
    };

    let classUnderTest: ProjectsComponent;
    let mockDialogService: any;
    let mockStore: MockAppStore;

    beforeEach(() => {
      mockDialogService = {
        openFormDialog: jasmine.createSpy('openFormDialog').and.callFake((_: any, __: any, onSubmitCallback: Function) => {
          mockDialogService.onSubmitCallback = onSubmitCallback;
        })
      };
      mockStore = new MockAppStore();
      classUnderTest = new ProjectsComponent(mockDialogService, mockStore);
      classUnderTest.projectsNotify.emit = jasmine.createSpy('projectsNotify');
    });

    describe('rmAssetsHaveAttributes()', () => {
      it('returns false when any lineItems are missing their price attributes', () => {
        let project: any = { lineItems: [mockLineItem, mockLineItemB] };

        expect(classUnderTest.rmAssetsHaveAttributes(project))
          .toBe(false);
      });
      it('returns true when all lineItems have price attributes', () => {
        let project: any = { lineItems: [mockLineItemB] };

        expect(classUnderTest.rmAssetsHaveAttributes(project))
          .toBe(true);
      });
    });
    describe('projectHasRmAssets()', () => {
      it('returns true when at least one lineItem is a rights manage asset', () => {
        let project: any = { lineItems: [mockLineItem, mockLineItemB] };

        expect(classUnderTest.projectHasRmAssets(project))
          .toBe(true);
      });
      it('returns false when no lineItems are rights managed', () => {
        let project: any = { lineItems: [mockLineItemB] };

        expect(classUnderTest.projectHasRmAssets(project))
          .toBe(false);
      });
      it('returns false when no there are no lineItems', () => {
        let project: any = { lineItems: [] };

        expect(classUnderTest.projectHasRmAssets(project))
          .toBe(false);
      });
    });

    describe('projectsOtherThan()', () => {
      it('returns projects other than the one specified', () => {
        let project1: any = { id: '1' };
        let project2: any = { id: '2' };
        let project3: any = { id: '3' };
        classUnderTest.projects = [project1, project2, project3];

        expect(classUnderTest.projectsOtherThan(project2))
          .toEqual([project1, project3]);
      });
    });

    describe('lineItemCountFor()', () => {
      it('returns the number of lineitems in the project', () => {
        let project: any = { lineItems: [{}, {}, {}] };

        expect(classUnderTest.lineItemCountFor(project)).toBe(3);
      });

      it('returns zero if the project has no lineItems defined', () => {
        let project: any = {};

        expect(classUnderTest.lineItemCountFor(project)).toBe(0);
      });
    });

    describe('addProject()', () => {
      it('emits the proper request event', () => {
        classUnderTest.projectsNotify
          .subscribe((event: Object) => {
            expect(event).toEqual({ type: 'ADD_PROJECT' });
          });

        classUnderTest.addProject();
      });
    });

    describe('remove()', () => {
      it('emits the proper request event', () => {
        let project: any = { some: 'project' };

        classUnderTest.projectsNotify
          .subscribe((event: Object) => {
            expect(event).toEqual({ type: 'REMOVE_PROJECT', payload: project });
          });

        classUnderTest.onRemove(project);
      });
    });

    describe('onEdit()', () => {
      it('emits the proper request event', () => {
        let project: any = { a: 'b', c: 'd', e: 'f' };

        classUnderTest.config = {
          form: {
            items: [
              { name: 'a', value: 'x' },
              { name: 'c', value: 'x' },
              { name: 'e', value: 'x' }
            ]
          }
        };

        classUnderTest.projectsNotify
          .subscribe((event: Object) => {
            expect(event).toEqual({
              type: 'UPDATE_PROJECT', payload: {
                project: { a: 'b', c: 'd', e: 'f' },
                items: [{ name: 'a', value: 'b' }, { name: 'c', value: 'd' }, { name: 'e', value: 'f' }]
              }
            });
          });

        classUnderTest.onEdit(project);
      });

      it('does not attempt to emit data if the project is readOnly', () => {
        classUnderTest.readOnly = true;
        let project: any = { a: 'b', c: 'd', e: 'f' };
        classUnderTest.onEdit(project);
        spyOn(classUnderTest, 'projectsNotify');
        expect(classUnderTest.projectsNotify).not.toHaveBeenCalled();
      });
    });

    describe('delegate()', () => {
      it('forwards events', () => {
        classUnderTest.projectsNotify
          .subscribe((event: Object) => {
            expect(event).toEqual({ type: 'event' });
          });

        classUnderTest.delegate({ type: 'event' });
      });
    });

    describe('onClickAddFeeButtonFor()', () => {
      beforeEach(() => {
        classUnderTest.config = { addQuoteFee: { items: [{ name: 'feeType' }, { name: 'amount' }] } };
        mockStore.createActionFactoryMethod('feeConfig', 'loadFeeConfig');
        mockStore.createStateSection('feeConfig', {
          initialized: true,
          feeConfig: {
            items: [
              { name: 'fee1', amount: 100 },
              { name: 'fee2', amount: 200 },
              { name: 'fee3', amount: .5 },
              { name: 'fee4', amount: 123.45 },
              { name: 'fee5', amount: 0 },
              { name: 'fee6' }
            ]
          }
        });
      });

      it('opens a dialog', () => {
        classUnderTest.onClickAddFeeButtonFor({ some: 'project' } as any);

        const expectedItems: any = [
          {
            name: 'feeType',
            options: 'fee1,fee2,fee3,fee4,fee5,fee6',
            value: 'fee1',
            slaveFieldName: 'amount',
            slaveFieldValues: ['100.00', '200.00', '0.50', '123.45', '0.00', '0.00']
          },
          {
            name: 'amount',
            value: '100.00'
          }
        ];

        expect(mockDialogService.openFormDialog).toHaveBeenCalledWith(
          expectedItems,
          { title: 'QUOTE.ADD_FEE.HEADER', submitLabel: 'QUOTE.ADD_FEE.SUBMIT' },
          jasmine.any(Function)
        );
      });

      it('can open a dialog when UI config form has no amount', () => {
        classUnderTest.config = { addQuoteFee: { items: [{ name: 'feeType' }] } };

        classUnderTest.onClickAddFeeButtonFor({ some: 'project' } as any);

        const expectedItems: any = [
          {
            name: 'feeType',
            options: 'fee1,fee2,fee3,fee4,fee5,fee6',
            value: 'fee1'
          }
        ];

        expect(mockDialogService.openFormDialog).toHaveBeenCalledWith(
          expectedItems,
          { title: 'QUOTE.ADD_FEE.HEADER', submitLabel: 'QUOTE.ADD_FEE.SUBMIT' },
          jasmine.any(Function)
        );
      });

      it('can open a dialog when UI config form has no fee type', () => {
        classUnderTest.config = { addQuoteFee: { items: [{ whatever: 'stuff' }] } };

        classUnderTest.onClickAddFeeButtonFor({ some: 'project' } as any);

        expect(mockDialogService.openFormDialog).toHaveBeenCalledWith(
          [{ whatever: 'stuff' }],
          { title: 'QUOTE.ADD_FEE.HEADER', submitLabel: 'QUOTE.ADD_FEE.SUBMIT' },
          jasmine.any(Function)
        );
      });

      it('emits the expected event when the dialog is submitted', () => {
        classUnderTest.onClickAddFeeButtonFor({ some: 'project' } as any);

        mockDialogService.onSubmitCallback({ some: 'fee' });

        expect(classUnderTest.projectsNotify.emit).toHaveBeenCalledWith({
          type: 'ADD_QUOTE_FEE',
          payload: { project: { some: 'project' }, fee: { some: 'fee' } }
        });
      });
    });

    describe('selectProject()', () => {
      it('updates its config form items', () => {
        let project: any = { a: 'b', c: 'd', e: 'f' };

        classUnderTest.config = {
          form: {
            items: [
              { name: 'a', value: 'x' },
              { name: 'c', value: 'x' },
              { name: 'e', value: 'x' }
            ]
          }
        };

        classUnderTest.selectProject(project);

        expect(classUnderTest.config.form.items).toEqual([
          { name: 'a', value: 'b' },
          { name: 'c', value: 'd' },
          { name: 'e', value: 'f' }
        ]);
      });
    });

    describe('onClickBulkImportButton', () => {
      it('emits the projectNotify event with the right type and payload', () => {
        classUnderTest.onClickBulkImportButton({ id: 'abc-123' } as any);
        expect(classUnderTest.projectsNotify.emit).toHaveBeenCalledWith({ type: 'OPEN_BULK_IMPORT_DIALOG', payload: 'abc-123' });
      });
    });
  });
}
