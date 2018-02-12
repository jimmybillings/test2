import { Common } from './common.functions';

export function main() {
  describe('Common Functions', () => {
    describe('setMarginTop', () => {
      let mockElement: any, mockDocument: any;

      beforeEach(() => {
        mockElement = {
          setAttribute: jasmine.createSpy('setAttribute')
        };

        mockDocument = {
          body: { getBoundingClientRect: () => ({ top: '-50' }) },
          getElementsByClassName: (string: string) => (string === 'invalidClass') ? [] : [mockElement]
        };
      });

      it('Should calculate a new marginTop that is offset by page scroll and set it to the element', () => {
        Common.setMarginTop('testClass', mockDocument);
        expect(mockElement.setAttribute).toHaveBeenCalledWith('style', 'margin-top: 50px');
      });

      it('Should not do anything if className element is not found on the page', () => {
        Common.setMarginTop('invalidClass', mockDocument);
        expect(mockElement.setAttribute).not.toHaveBeenCalled();
      });
    });


    describe('deletePropertiesFromObject', () => {
      it('Should remove the provided properties from a flat object', () => {
        let objectForTest = {
          id: 1,
          name: 'test',
          age: 3,
          createdOn: '10/10/2017',
          lastUpdated: '10/10/2017'
        };
        let propertiesToRemove: Array<string> = ['id', 'createdOn', 'lastUpdated'];
        Common.deletePropertiesFromObject(objectForTest, propertiesToRemove);

        expect(objectForTest).toEqual({ name: 'test', age: 3 });
      });

      it('Should handle bad data and input', () => {
        let objectForTest: any = {
          id: 1,
          name: 'test',
          age: 3,
          createdOn: '10/10/2017',
          lastUpdated: '10/10/2017',
          someProp: null,
          anotherProp: undefined,
          lastProp: NaN
        };

        Common.deletePropertiesFromObject(objectForTest, ['someProp', 'anotherProp', 'lastProp', 'notAProp']);

        expect(objectForTest).toEqual({
          id: 1,
          name: 'test',
          age: 3,
          createdOn: '10/10/2017',
          lastUpdated: '10/10/2017'
        });
      });

      it('Should remove the provided properties from a deeply nested object', () => {
        let objectForTest = {
          id: 1,
          name: 'test',
          age: 3,
          createdOn: '10/10/2017',
          lastUpdated: '10/10/2017',
          subObject: {
            id: 1,
            name: 'test',
            age: 3,
            createdOn: '10/10/2017',
            lastUpdated: '10/10/2017',
            subObject: {
              id: 1,
              name: 'test',
              age: 3,
              createdOn: '10/10/2017',
              lastUpdated: '10/10/2017',
              subObject: {
                id: 1,
                name: 'test',
                age: 3,
                createdOn: '10/10/2017',
                lastUpdated: '10/10/2017'
              }
            }
          }
        };
        let propertiesToRemove: Array<string> = ['id', 'createdOn', 'lastUpdated'];
        Common.deletePropertiesFromObject(objectForTest, propertiesToRemove);

        expect(objectForTest).toEqual({
          name: 'test',
          age: 3, subObject: {
            name: 'test',
            age: 3,
            subObject: {
              name: 'test',
              age: 3,
              subObject: {
                name: 'test',
                age: 3
              }
            }
          }
        });
      });

      it(`Should remove the provided properties from a deeply nested object that 
      includes flat arrays and array of objects`, () => {
          let objectForTest = {
            id: 1,
            name: 'test',
            age: 3,
            createdOn: '10/10/2017',
            lastUpdated: '10/10/2017',
            flatArr: ['1', '2', '3'],
            arrOfObjects: [
              { id: 1, name: 'test', },
              { id: 1, name: 'test', },
              { id: 1, name: 'test', }],
            subObject: {
              id: 1,
              name: 'test',
              age: 3,
              createdOn: '10/10/2017',
              lastUpdated: '10/10/2017',
              flatArr: ['1', '2', '3'],
              arrOfObjects: [
                { id: 1, name: 'test', },
                { id: 1, name: 'test', },
                { id: 1, name: 'test', }],
              subObject: {
                id: 1,
                name: 'test',
                age: 3,
                createdOn: '10/10/2017',
                lastUpdated: '10/10/2017',
                flatArr: ['1', '2', '3'],
                arrOfObjects: [
                  { id: 1, name: 'test', },
                  { id: 1, name: 'test', },
                  { id: 1, name: 'test', }],
                subObject: {
                  id: 1,
                  name: 'test',
                  age: 3,
                  createdOn: '10/10/2017',
                  lastUpdated: '10/10/2017',
                  flatArr: ['1', '2', '3'],
                  arrOfObjects: [
                    { id: 1, name: 'test', },
                    { id: 1, name: 'test', },
                    { id: 1, name: 'test', }]
                }
              }
            }
          };
          let propertiesToRemove: Array<string> = ['id', 'createdOn', 'lastUpdated'];
          Common.deletePropertiesFromObject(objectForTest, propertiesToRemove);

          expect(objectForTest).toEqual({
            name: 'test',
            age: 3,
            flatArr: ['1', '2', '3'],
            arrOfObjects: [
              { name: 'test', },
              { name: 'test', },
              { name: 'test', }
            ],
            subObject: {
              name: 'test',
              age: 3,
              flatArr: ['1', '2', '3'],
              arrOfObjects: [
                { name: 'test', },
                { name: 'test', },
                { name: 'test', }
              ],
              subObject: {
                name: 'test',
                age: 3,
                flatArr: ['1', '2', '3'],
                arrOfObjects: [
                  { name: 'test', },
                  { name: 'test', },
                  { name: 'test', }
                ],
                subObject: {
                  name: 'test',
                  age: 3,
                  flatArr: ['1', '2', '3'],
                  arrOfObjects: [
                    { name: 'test', },
                    { name: 'test', },
                    { name: 'test', }
                  ]
                }
              }
            }
          });
        });
    });

    describe('onCollectionShowPage()', () => {
      describe('returns true', () => {
        [
          '/collections/1234',
          '/collections/1234;i=1;n=100',
        ].forEach((test: string) => {
          it(`for ${test}`, () => {
            expect(Common.onCollectionShowPage(test)).toBe(true);
          });
        });
      });

      describe('returns false', () => {
        [
          '/collections/1234/asset/abc-123',
          '/collections',
          '/search',
        ].forEach((test: string) => {
          it(`for ${test}`, () => {
            expect(Common.onCollectionShowPage(test)).toBe(false);
          });
        });
      });
    });

    describe('isEmpty', () => {
      describe('returns true', () => {
        it('when the object is empty', () => {
          expect(Common.isEmpty({})).toBe(true);
        });
      });

      describe('returns false', () => {
        it('when the object is not empty', () => {
          expect(Common.isEmpty({ a: 'b' })).toBe(false);
        });
      });
    });

    [
      { value: null, description: 'null', expected: true },
      { value: undefined, description: 'an undefined value', expected: true },
      { value: [], description: 'an empty array', expected: false },
      { value: [1], description: 'a non-empty array', expected: false },
      { value: {}, description: 'an empty object', expected: false },
      { value: { a: 1 }, description: 'a non-empty object', expected: false },
      { value: '', description: 'an empty string', expected: false },
      { value: 'x', description: 'a non-empty-string', expected: false },
      { value: 0, description: '0', expected: false },
      { value: 1, description: '1', expected: false }
    ].forEach(test => {
      describe('isNullOrUndefined()', () => {
        it(`returns ${test.expected} for ${test.description}`, () => {
          expect(Common.isNullOrUndefined(test.value)).toBe(test.expected);
        });
      });

      describe('isNotNullOrUndefined()', () => {
        it(`returns ${!test.expected} for ${test.description}`, () => {
          expect(Common.isNotNullOrUndefined(test.value)).toBe(!test.expected);
        });
      });
    });
  });
}

