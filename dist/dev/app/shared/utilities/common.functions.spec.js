"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_functions_1 = require("./common.functions");
function main() {
    describe('Common Functions', function () {
        describe('setMarginTop', function () {
            var mockElement, mockDocument;
            beforeEach(function () {
                mockElement = {
                    setAttribute: jasmine.createSpy('setAttribute')
                };
                mockDocument = {
                    body: { getBoundingClientRect: function () { return ({ top: '-50' }); } },
                    getElementsByClassName: function (string) { return (string === 'invalidClass') ? [] : [mockElement]; }
                };
            });
            it('Should calculate a new marginTop that is offset by page scroll and set it to the element', function () {
                common_functions_1.Common.setMarginTop('testClass', mockDocument);
                expect(mockElement.setAttribute).toHaveBeenCalledWith('style', 'margin-top: 50px');
            });
            it('Should not do anything if className element is not found on the page', function () {
                common_functions_1.Common.setMarginTop('invalidClass', mockDocument);
                expect(mockElement.setAttribute).not.toHaveBeenCalled();
            });
        });
        describe('deletePropertiesFromObject', function () {
            it('Should remove the provided properties from a flat object', function () {
                var objectForTest = {
                    id: 1,
                    name: 'test',
                    age: 3,
                    createdOn: '10/10/2017',
                    lastUpdated: '10/10/2017'
                };
                var propertiesToRemove = ['id', 'createdOn', 'lastUpdated'];
                common_functions_1.Common.deletePropertiesFromObject(objectForTest, propertiesToRemove);
                expect(objectForTest).toEqual({ name: 'test', age: 3 });
            });
            it('Should handle bad data and input', function () {
                var objectForTest = {
                    id: 1,
                    name: 'test',
                    age: 3,
                    createdOn: '10/10/2017',
                    lastUpdated: '10/10/2017',
                    someProp: null,
                    anotherProp: undefined,
                    lastProp: NaN
                };
                common_functions_1.Common.deletePropertiesFromObject(objectForTest, ['someProp', 'anotherProp', 'lastProp', 'notAProp']);
                expect(objectForTest).toEqual({
                    id: 1,
                    name: 'test',
                    age: 3,
                    createdOn: '10/10/2017',
                    lastUpdated: '10/10/2017'
                });
            });
            it('Should remove the provided properties from a deeply nested object', function () {
                var objectForTest = {
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
                var propertiesToRemove = ['id', 'createdOn', 'lastUpdated'];
                common_functions_1.Common.deletePropertiesFromObject(objectForTest, propertiesToRemove);
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
            it("Should remove the provided properties from a deeply nested object that \n      includes flat arrays and array of objects", function () {
                var objectForTest = {
                    id: 1,
                    name: 'test',
                    age: 3,
                    createdOn: '10/10/2017',
                    lastUpdated: '10/10/2017',
                    flatArr: ['1', '2', '3'],
                    arrOfObjects: [
                        { id: 1, name: 'test', },
                        { id: 1, name: 'test', },
                        { id: 1, name: 'test', }
                    ],
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
                            { id: 1, name: 'test', }
                        ],
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
                                { id: 1, name: 'test', }
                            ],
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
                                    { id: 1, name: 'test', }
                                ]
                            }
                        }
                    }
                };
                var propertiesToRemove = ['id', 'createdOn', 'lastUpdated'];
                common_functions_1.Common.deletePropertiesFromObject(objectForTest, propertiesToRemove);
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
        describe('onCollectionShowPage()', function () {
            describe('returns true', function () {
                [
                    '/collections/1234',
                    '/collections/1234;i=1;n=100',
                ].forEach(function (test) {
                    it("for " + test, function () {
                        expect(common_functions_1.Common.onCollectionShowPage(test)).toBe(true);
                    });
                });
            });
            describe('returns false', function () {
                [
                    '/collections/1234/asset/abc-123',
                    '/collections',
                    '/search',
                ].forEach(function (test) {
                    it("for " + test, function () {
                        expect(common_functions_1.Common.onCollectionShowPage(test)).toBe(false);
                    });
                });
            });
        });
        describe('isEmpty', function () {
            describe('returns true', function () {
                it('when the object is empty', function () {
                    expect(common_functions_1.Common.isEmpty({})).toBe(true);
                });
            });
            describe('returns false', function () {
                it('when the object is not empty', function () {
                    expect(common_functions_1.Common.isEmpty({ a: 'b' })).toBe(false);
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
        ].forEach(function (test) {
            describe('isNullOrUndefined()', function () {
                it("returns " + test.expected + " for " + test.description, function () {
                    expect(common_functions_1.Common.isNullOrUndefined(test.value)).toBe(test.expected);
                });
            });
            describe('isNotNullOrUndefined()', function () {
                it("returns " + !test.expected + " for " + test.description, function () {
                    expect(common_functions_1.Common.isNotNullOrUndefined(test.value)).toBe(!test.expected);
                });
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvdXRpbGl0aWVzL2NvbW1vbi5mdW5jdGlvbnMuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVEQUE0QztBQUU1QztJQUNFLFFBQVEsQ0FBQyxrQkFBa0IsRUFBRTtRQUMzQixRQUFRLENBQUMsY0FBYyxFQUFFO1lBQ3ZCLElBQUksV0FBZ0IsRUFBRSxZQUFpQixDQUFDO1lBRXhDLFVBQVUsQ0FBQztnQkFDVCxXQUFXLEdBQUc7b0JBQ1osWUFBWSxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDO2lCQUNoRCxDQUFDO2dCQUVGLFlBQVksR0FBRztvQkFDYixJQUFJLEVBQUUsRUFBRSxxQkFBcUIsRUFBRSxjQUFNLE9BQUEsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFoQixDQUFnQixFQUFFO29CQUN2RCxzQkFBc0IsRUFBRSxVQUFDLE1BQWMsSUFBSyxPQUFBLENBQUMsTUFBTSxLQUFLLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLEVBQWhELENBQWdEO2lCQUM3RixDQUFDO1lBQ0osQ0FBQyxDQUFDLENBQUM7WUFFSCxFQUFFLENBQUMsMEZBQTBGLEVBQUU7Z0JBQzdGLHlCQUFNLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxZQUFZLENBQUMsQ0FBQztnQkFDL0MsTUFBTSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztZQUNyRixDQUFDLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQyxzRUFBc0UsRUFBRTtnQkFDekUseUJBQU0sQ0FBQyxZQUFZLENBQUMsY0FBYyxFQUFFLFlBQVksQ0FBQyxDQUFDO2dCQUNsRCxNQUFNLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQzFELENB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QUssRUFBRSxDQUFDLEVBQUUsV0FBVyxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFO1NBQ2hELENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSTtZQUNaLFFBQVEsQ0FBQyxxQkFBcUIsRUFBRTtnQkFDOUIsRUFBRSxDQUFDLGFBQVcsSUFBSSxDQUFDLFFBQVEsYUFBUSxJQUFJLENBQUMsV0FBYSxFQUFFO29CQUNyRCxNQUFNLENBQUMseUJBQU0sQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNuRSxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1lBRUgsUUFBUSxDQUFDLHdCQUF3QixFQUFFO2dCQUNqQyxFQUFFLENBQUMsYUFBVyxDQUFDLElBQUksQ0FBQyxRQUFRLGFBQVEsSUFBSSxDQUFDLFdBQWEsRUFBRTtvQkFDdEQsTUFBTSxDQUFDLHlCQUFNLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUN2RSxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFuUkQsb0JBbVJDIiwiZmlsZSI6ImFwcC9zaGFyZWQvdXRpbGl0aWVzL2NvbW1vbi5mdW5jdGlvbnMuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbiB9IGZyb20gJy4vY29tbW9uLmZ1bmN0aW9ucyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBkZXNjcmliZSgnQ29tbW9uIEZ1bmN0aW9ucycsICgpID0+IHtcbiAgICBkZXNjcmliZSgnc2V0TWFyZ2luVG9wJywgKCkgPT4ge1xuICAgICAgbGV0IG1vY2tFbGVtZW50OiBhbnksIG1vY2tEb2N1bWVudDogYW55O1xuXG4gICAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgbW9ja0VsZW1lbnQgPSB7XG4gICAgICAgICAgc2V0QXR0cmlidXRlOiBqYXNtaW5lLmNyZWF0ZVNweSgnc2V0QXR0cmlidXRlJylcbiAgICAgICAgfTtcblxuICAgICAgICBtb2NrRG9jdW1lbnQgPSB7XG4gICAgICAgICAgYm9keTogeyBnZXRCb3VuZGluZ0NsaWVudFJlY3Q6ICgpID0+ICh7IHRvcDogJy01MCcgfSkgfSxcbiAgICAgICAgICBnZXRFbGVtZW50c0J5Q2xhc3NOYW1lOiAoc3RyaW5nOiBzdHJpbmcpID0+IChzdHJpbmcgPT09ICdpbnZhbGlkQ2xhc3MnKSA/IFtdIDogW21vY2tFbGVtZW50XVxuICAgICAgICB9O1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdTaG91bGQgY2FsY3VsYXRlIGEgbmV3IG1hcmdpblRvcCB0aGF0IGlzIG9mZnNldCBieSBwYWdlIHNjcm9sbCBhbmQgc2V0IGl0IHRvIHRoZSBlbGVtZW50JywgKCkgPT4ge1xuICAgICAgICBDb21tb24uc2V0TWFyZ2luVG9wKCd0ZXN0Q2xhc3MnLCBtb2NrRG9jdW1lbnQpO1xuICAgICAgICBleHBlY3QobW9ja0VsZW1lbnQuc2V0QXR0cmlidXRlKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCgnc3R5bGUnLCAnbWFyZ2luLXRvcDogNTBweCcpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdTaG91bGQgbm90IGRvIGFueXRoaW5nIGlmIGNsYXNzTmFtZSBlbGVtZW50IGlzIG5vdCBmb3VuZCBvbiB0aGUgcGFnZScsICgpID0+IHtcbiAgICAgICAgQ29tbW9uLnNldE1hcmdpblRvcCgnaW52YWxpZENsYXNzJywgbW9ja0RvY3VtZW50KTtcbiAgICAgICAgZXhwZWN0KG1vY2tFbGVtZW50LnNldEF0dHJpYnV0ZSkubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG5cbiAgICBkZXNjcmliZSgnZGVsZXRlUHJvcGVydGllc0Zyb21PYmplY3QnLCAoKSA9PiB7XG4gICAgICBpdCgnU2hvdWxkIHJlbW92ZSB0aGUgcHJvdmlkZWQgcHJvcGVydGllcyBmcm9tIGEgZmxhdCBvYmplY3QnLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmplY3RGb3JUZXN0ID0ge1xuICAgICAgICAgIGlkOiAxLFxuICAgICAgICAgIG5hbWU6ICd0ZXN0JyxcbiAgICAgICAgICBhZ2U6IDMsXG4gICAgICAgICAgY3JlYXRlZE9uOiAnMTAvMTAvMjAxNycsXG4gICAgICAgICAgbGFzdFVwZGF0ZWQ6ICcxMC8xMC8yMDE3J1xuICAgICAgICB9O1xuICAgICAgICBsZXQgcHJvcGVydGllc1RvUmVtb3ZlOiBBcnJheTxzdHJpbmc+ID0gWydpZCcsICdjcmVhdGVkT24nLCAnbGFzdFVwZGF0ZWQnXTtcbiAgICAgICAgQ29tbW9uLmRlbGV0ZVByb3BlcnRpZXNGcm9tT2JqZWN0KG9iamVjdEZvclRlc3QsIHByb3BlcnRpZXNUb1JlbW92ZSk7XG5cbiAgICAgICAgZXhwZWN0KG9iamVjdEZvclRlc3QpLnRvRXF1YWwoeyBuYW1lOiAndGVzdCcsIGFnZTogMyB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnU2hvdWxkIGhhbmRsZSBiYWQgZGF0YSBhbmQgaW5wdXQnLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmplY3RGb3JUZXN0OiBhbnkgPSB7XG4gICAgICAgICAgaWQ6IDEsXG4gICAgICAgICAgbmFtZTogJ3Rlc3QnLFxuICAgICAgICAgIGFnZTogMyxcbiAgICAgICAgICBjcmVhdGVkT246ICcxMC8xMC8yMDE3JyxcbiAgICAgICAgICBsYXN0VXBkYXRlZDogJzEwLzEwLzIwMTcnLFxuICAgICAgICAgIHNvbWVQcm9wOiBudWxsLFxuICAgICAgICAgIGFub3RoZXJQcm9wOiB1bmRlZmluZWQsXG4gICAgICAgICAgbGFzdFByb3A6IE5hTlxuICAgICAgICB9O1xuXG4gICAgICAgIENvbW1vbi5kZWxldGVQcm9wZXJ0aWVzRnJvbU9iamVjdChvYmplY3RGb3JUZXN0LCBbJ3NvbWVQcm9wJywgJ2Fub3RoZXJQcm9wJywgJ2xhc3RQcm9wJywgJ25vdEFQcm9wJ10pO1xuXG4gICAgICAgIGV4cGVjdChvYmplY3RGb3JUZXN0KS50b0VxdWFsKHtcbiAgICAgICAgICBpZDogMSxcbiAgICAgICAgICBuYW1lOiAndGVzdCcsXG4gICAgICAgICAgYWdlOiAzLFxuICAgICAgICAgIGNyZWF0ZWRPbjogJzEwLzEwLzIwMTcnLFxuICAgICAgICAgIGxhc3RVcGRhdGVkOiAnMTAvMTAvMjAxNydcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ1Nob3VsZCByZW1vdmUgdGhlIHByb3ZpZGVkIHByb3BlcnRpZXMgZnJvbSBhIGRlZXBseSBuZXN0ZWQgb2JqZWN0JywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqZWN0Rm9yVGVzdCA9IHtcbiAgICAgICAgICBpZDogMSxcbiAgICAgICAgICBuYW1lOiAndGVzdCcsXG4gICAgICAgICAgYWdlOiAzLFxuICAgICAgICAgIGNyZWF0ZWRPbjogJzEwLzEwLzIwMTcnLFxuICAgICAgICAgIGxhc3RVcGRhdGVkOiAnMTAvMTAvMjAxNycsXG4gICAgICAgICAgc3ViT2JqZWN0OiB7XG4gICAgICAgICAgICBpZDogMSxcbiAgICAgICAgICAgIG5hbWU6ICd0ZXN0JyxcbiAgICAgICAgICAgIGFnZTogMyxcbiAgICAgICAgICAgIGNyZWF0ZWRPbjogJzEwLzEwLzIwMTcnLFxuICAgICAgICAgICAgbGFzdFVwZGF0ZWQ6ICcxMC8xMC8yMDE3JyxcbiAgICAgICAgICAgIHN1Yk9iamVjdDoge1xuICAgICAgICAgICAgICBpZDogMSxcbiAgICAgICAgICAgICAgbmFtZTogJ3Rlc3QnLFxuICAgICAgICAgICAgICBhZ2U6IDMsXG4gICAgICAgICAgICAgIGNyZWF0ZWRPbjogJzEwLzEwLzIwMTcnLFxuICAgICAgICAgICAgICBsYXN0VXBkYXRlZDogJzEwLzEwLzIwMTcnLFxuICAgICAgICAgICAgICBzdWJPYmplY3Q6IHtcbiAgICAgICAgICAgICAgICBpZDogMSxcbiAgICAgICAgICAgICAgICBuYW1lOiAndGVzdCcsXG4gICAgICAgICAgICAgICAgYWdlOiAzLFxuICAgICAgICAgICAgICAgIGNyZWF0ZWRPbjogJzEwLzEwLzIwMTcnLFxuICAgICAgICAgICAgICAgIGxhc3RVcGRhdGVkOiAnMTAvMTAvMjAxNydcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgbGV0IHByb3BlcnRpZXNUb1JlbW92ZTogQXJyYXk8c3RyaW5nPiA9IFsnaWQnLCAnY3JlYXRlZE9uJywgJ2xhc3RVcGRhdGVkJ107XG4gICAgICAgIENvbW1vbi5kZWxldGVQcm9wZXJ0aWVzRnJvbU9iamVjdChvYmplY3RGb3JUZXN0LCBwcm9wZXJ0aWVzVG9SZW1vdmUpO1xuXG4gICAgICAgIGV4cGVjdChvYmplY3RGb3JUZXN0KS50b0VxdWFsKHtcbiAgICAgICAgICBuYW1lOiAndGVzdCcsXG4gICAgICAgICAgYWdlOiAzLCBzdWJPYmplY3Q6IHtcbiAgICAgICAgICAgIG5hbWU6ICd0ZXN0JyxcbiAgICAgICAgICAgIGFnZTogMyxcbiAgICAgICAgICAgIHN1Yk9iamVjdDoge1xuICAgICAgICAgICAgICBuYW1lOiAndGVzdCcsXG4gICAgICAgICAgICAgIGFnZTogMyxcbiAgICAgICAgICAgICAgc3ViT2JqZWN0OiB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ3Rlc3QnLFxuICAgICAgICAgICAgICAgIGFnZTogM1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBpdChgU2hvdWxkIHJlbW92ZSB0aGUgcHJvdmlkZWQgcHJvcGVydGllcyBmcm9tIGEgZGVlcGx5IG5lc3RlZCBvYmplY3QgdGhhdCBcbiAgICAgIGluY2x1ZGVzIGZsYXQgYXJyYXlzIGFuZCBhcnJheSBvZiBvYmplY3RzYCwgKCkgPT4ge1xuICAgICAgICAgIGxldCBvYmplY3RGb3JUZXN0ID0ge1xuICAgICAgICAgICAgaWQ6IDEsXG4gICAgICAgICAgICBuYW1lOiAndGVzdCcsXG4gICAgICAgICAgICBhZ2U6IDMsXG4gICAgICAgICAgICBjcmVhdGVkT246ICcxMC8xMC8yMDE3JyxcbiAgICAgICAgICAgIGxhc3RVcGRhdGVkOiAnMTAvMTAvMjAxNycsXG4gICAgICAgICAgICBmbGF0QXJyOiBbJzEnLCAnMicsICczJ10sXG4gICAgICAgICAgICBhcnJPZk9iamVjdHM6IFtcbiAgICAgICAgICAgICAgeyBpZDogMSwgbmFtZTogJ3Rlc3QnLCB9LFxuICAgICAgICAgICAgICB7IGlkOiAxLCBuYW1lOiAndGVzdCcsIH0sXG4gICAgICAgICAgICAgIHsgaWQ6IDEsIG5hbWU6ICd0ZXN0JywgfV0sXG4gICAgICAgICAgICBzdWJPYmplY3Q6IHtcbiAgICAgICAgICAgICAgaWQ6IDEsXG4gICAgICAgICAgICAgIG5hbWU6ICd0ZXN0JyxcbiAgICAgICAgICAgICAgYWdlOiAzLFxuICAgICAgICAgICAgICBjcmVhdGVkT246ICcxMC8xMC8yMDE3JyxcbiAgICAgICAgICAgICAgbGFzdFVwZGF0ZWQ6ICcxMC8xMC8yMDE3JyxcbiAgICAgICAgICAgICAgZmxhdEFycjogWycxJywgJzInLCAnMyddLFxuICAgICAgICAgICAgICBhcnJPZk9iamVjdHM6IFtcbiAgICAgICAgICAgICAgICB7IGlkOiAxLCBuYW1lOiAndGVzdCcsIH0sXG4gICAgICAgICAgICAgICAgeyBpZDogMSwgbmFtZTogJ3Rlc3QnLCB9LFxuICAgICAgICAgICAgICAgIHsgaWQ6IDEsIG5hbWU6ICd0ZXN0JywgfV0sXG4gICAgICAgICAgICAgIHN1Yk9iamVjdDoge1xuICAgICAgICAgICAgICAgIGlkOiAxLFxuICAgICAgICAgICAgICAgIG5hbWU6ICd0ZXN0JyxcbiAgICAgICAgICAgICAgICBhZ2U6IDMsXG4gICAgICAgICAgICAgICAgY3JlYXRlZE9uOiAnMTAvMTAvMjAxNycsXG4gICAgICAgICAgICAgICAgbGFzdFVwZGF0ZWQ6ICcxMC8xMC8yMDE3JyxcbiAgICAgICAgICAgICAgICBmbGF0QXJyOiBbJzEnLCAnMicsICczJ10sXG4gICAgICAgICAgICAgICAgYXJyT2ZPYmplY3RzOiBbXG4gICAgICAgICAgICAgICAgICB7IGlkOiAxLCBuYW1lOiAndGVzdCcsIH0sXG4gICAgICAgICAgICAgICAgICB7IGlkOiAxLCBuYW1lOiAndGVzdCcsIH0sXG4gICAgICAgICAgICAgICAgICB7IGlkOiAxLCBuYW1lOiAndGVzdCcsIH1dLFxuICAgICAgICAgICAgICAgIHN1Yk9iamVjdDoge1xuICAgICAgICAgICAgICAgICAgaWQ6IDEsXG4gICAgICAgICAgICAgICAgICBuYW1lOiAndGVzdCcsXG4gICAgICAgICAgICAgICAgICBhZ2U6IDMsXG4gICAgICAgICAgICAgICAgICBjcmVhdGVkT246ICcxMC8xMC8yMDE3JyxcbiAgICAgICAgICAgICAgICAgIGxhc3RVcGRhdGVkOiAnMTAvMTAvMjAxNycsXG4gICAgICAgICAgICAgICAgICBmbGF0QXJyOiBbJzEnLCAnMicsICczJ10sXG4gICAgICAgICAgICAgICAgICBhcnJPZk9iamVjdHM6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBpZDogMSwgbmFtZTogJ3Rlc3QnLCB9LFxuICAgICAgICAgICAgICAgICAgICB7IGlkOiAxLCBuYW1lOiAndGVzdCcsIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgaWQ6IDEsIG5hbWU6ICd0ZXN0JywgfV1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICAgIGxldCBwcm9wZXJ0aWVzVG9SZW1vdmU6IEFycmF5PHN0cmluZz4gPSBbJ2lkJywgJ2NyZWF0ZWRPbicsICdsYXN0VXBkYXRlZCddO1xuICAgICAgICAgIENvbW1vbi5kZWxldGVQcm9wZXJ0aWVzRnJvbU9iamVjdChvYmplY3RGb3JUZXN0LCBwcm9wZXJ0aWVzVG9SZW1vdmUpO1xuXG4gICAgICAgICAgZXhwZWN0KG9iamVjdEZvclRlc3QpLnRvRXF1YWwoe1xuICAgICAgICAgICAgbmFtZTogJ3Rlc3QnLFxuICAgICAgICAgICAgYWdlOiAzLFxuICAgICAgICAgICAgZmxhdEFycjogWycxJywgJzInLCAnMyddLFxuICAgICAgICAgICAgYXJyT2ZPYmplY3RzOiBbXG4gICAgICAgICAgICAgIHsgbmFtZTogJ3Rlc3QnLCB9LFxuICAgICAgICAgICAgICB7IG5hbWU6ICd0ZXN0JywgfSxcbiAgICAgICAgICAgICAgeyBuYW1lOiAndGVzdCcsIH1cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBzdWJPYmplY3Q6IHtcbiAgICAgICAgICAgICAgbmFtZTogJ3Rlc3QnLFxuICAgICAgICAgICAgICBhZ2U6IDMsXG4gICAgICAgICAgICAgIGZsYXRBcnI6IFsnMScsICcyJywgJzMnXSxcbiAgICAgICAgICAgICAgYXJyT2ZPYmplY3RzOiBbXG4gICAgICAgICAgICAgICAgeyBuYW1lOiAndGVzdCcsIH0sXG4gICAgICAgICAgICAgICAgeyBuYW1lOiAndGVzdCcsIH0sXG4gICAgICAgICAgICAgICAgeyBuYW1lOiAndGVzdCcsIH1cbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgc3ViT2JqZWN0OiB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ3Rlc3QnLFxuICAgICAgICAgICAgICAgIGFnZTogMyxcbiAgICAgICAgICAgICAgICBmbGF0QXJyOiBbJzEnLCAnMicsICczJ10sXG4gICAgICAgICAgICAgICAgYXJyT2ZPYmplY3RzOiBbXG4gICAgICAgICAgICAgICAgICB7IG5hbWU6ICd0ZXN0JywgfSxcbiAgICAgICAgICAgICAgICAgIHsgbmFtZTogJ3Rlc3QnLCB9LFxuICAgICAgICAgICAgICAgICAgeyBuYW1lOiAndGVzdCcsIH1cbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHN1Yk9iamVjdDoge1xuICAgICAgICAgICAgICAgICAgbmFtZTogJ3Rlc3QnLFxuICAgICAgICAgICAgICAgICAgYWdlOiAzLFxuICAgICAgICAgICAgICAgICAgZmxhdEFycjogWycxJywgJzInLCAnMyddLFxuICAgICAgICAgICAgICAgICAgYXJyT2ZPYmplY3RzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgbmFtZTogJ3Rlc3QnLCB9LFxuICAgICAgICAgICAgICAgICAgICB7IG5hbWU6ICd0ZXN0JywgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBuYW1lOiAndGVzdCcsIH1cbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnb25Db2xsZWN0aW9uU2hvd1BhZ2UoKScsICgpID0+IHtcbiAgICAgIGRlc2NyaWJlKCdyZXR1cm5zIHRydWUnLCAoKSA9PiB7XG4gICAgICAgIFtcbiAgICAgICAgICAnL2NvbGxlY3Rpb25zLzEyMzQnLFxuICAgICAgICAgICcvY29sbGVjdGlvbnMvMTIzNDtpPTE7bj0xMDAnLFxuICAgICAgICBdLmZvckVhY2goKHRlc3Q6IHN0cmluZykgPT4ge1xuICAgICAgICAgIGl0KGBmb3IgJHt0ZXN0fWAsICgpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdChDb21tb24ub25Db2xsZWN0aW9uU2hvd1BhZ2UodGVzdCkpLnRvQmUodHJ1ZSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGRlc2NyaWJlKCdyZXR1cm5zIGZhbHNlJywgKCkgPT4ge1xuICAgICAgICBbXG4gICAgICAgICAgJy9jb2xsZWN0aW9ucy8xMjM0L2Fzc2V0L2FiYy0xMjMnLFxuICAgICAgICAgICcvY29sbGVjdGlvbnMnLFxuICAgICAgICAgICcvc2VhcmNoJyxcbiAgICAgICAgXS5mb3JFYWNoKCh0ZXN0OiBzdHJpbmcpID0+IHtcbiAgICAgICAgICBpdChgZm9yICR7dGVzdH1gLCAoKSA9PiB7XG4gICAgICAgICAgICBleHBlY3QoQ29tbW9uLm9uQ29sbGVjdGlvblNob3dQYWdlKHRlc3QpKS50b0JlKGZhbHNlKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdpc0VtcHR5JywgKCkgPT4ge1xuICAgICAgZGVzY3JpYmUoJ3JldHVybnMgdHJ1ZScsICgpID0+IHtcbiAgICAgICAgaXQoJ3doZW4gdGhlIG9iamVjdCBpcyBlbXB0eScsICgpID0+IHtcbiAgICAgICAgICBleHBlY3QoQ29tbW9uLmlzRW1wdHkoe30pKS50b0JlKHRydWUpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBkZXNjcmliZSgncmV0dXJucyBmYWxzZScsICgpID0+IHtcbiAgICAgICAgaXQoJ3doZW4gdGhlIG9iamVjdCBpcyBub3QgZW1wdHknLCAoKSA9PiB7XG4gICAgICAgICAgZXhwZWN0KENvbW1vbi5pc0VtcHR5KHsgYTogJ2InIH0pKS50b0JlKGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIFtcbiAgICAgIHsgdmFsdWU6IG51bGwsIGRlc2NyaXB0aW9uOiAnbnVsbCcsIGV4cGVjdGVkOiB0cnVlIH0sXG4gICAgICB7IHZhbHVlOiB1bmRlZmluZWQsIGRlc2NyaXB0aW9uOiAnYW4gdW5kZWZpbmVkIHZhbHVlJywgZXhwZWN0ZWQ6IHRydWUgfSxcbiAgICAgIHsgdmFsdWU6IFtdLCBkZXNjcmlwdGlvbjogJ2FuIGVtcHR5IGFycmF5JywgZXhwZWN0ZWQ6IGZhbHNlIH0sXG4gICAgICB7IHZhbHVlOiBbMV0sIGRlc2NyaXB0aW9uOiAnYSBub24tZW1wdHkgYXJyYXknLCBleHBlY3RlZDogZmFsc2UgfSxcbiAgICAgIHsgdmFsdWU6IHt9LCBkZXNjcmlwdGlvbjogJ2FuIGVtcHR5IG9iamVjdCcsIGV4cGVjdGVkOiBmYWxzZSB9LFxuICAgICAgeyB2YWx1ZTogeyBhOiAxIH0sIGRlc2NyaXB0aW9uOiAnYSBub24tZW1wdHkgb2JqZWN0JywgZXhwZWN0ZWQ6IGZhbHNlIH0sXG4gICAgICB7IHZhbHVlOiAnJywgZGVzY3JpcHRpb246ICdhbiBlbXB0eSBzdHJpbmcnLCBleHBlY3RlZDogZmFsc2UgfSxcbiAgICAgIHsgdmFsdWU6ICd4JywgZGVzY3JpcHRpb246ICdhIG5vbi1lbXB0eS1zdHJpbmcnLCBleHBlY3RlZDogZmFsc2UgfSxcbiAgICAgIHsgdmFsdWU6IDAsIGRlc2NyaXB0aW9uOiAnMCcsIGV4cGVjdGVkOiBmYWxzZSB9LFxuICAgICAgeyB2YWx1ZTogMSwgZGVzY3JpcHRpb246ICcxJywgZXhwZWN0ZWQ6IGZhbHNlIH1cbiAgICBdLmZvckVhY2godGVzdCA9PiB7XG4gICAgICBkZXNjcmliZSgnaXNOdWxsT3JVbmRlZmluZWQoKScsICgpID0+IHtcbiAgICAgICAgaXQoYHJldHVybnMgJHt0ZXN0LmV4cGVjdGVkfSBmb3IgJHt0ZXN0LmRlc2NyaXB0aW9ufWAsICgpID0+IHtcbiAgICAgICAgICBleHBlY3QoQ29tbW9uLmlzTnVsbE9yVW5kZWZpbmVkKHRlc3QudmFsdWUpKS50b0JlKHRlc3QuZXhwZWN0ZWQpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBkZXNjcmliZSgnaXNOb3ROdWxsT3JVbmRlZmluZWQoKScsICgpID0+IHtcbiAgICAgICAgaXQoYHJldHVybnMgJHshdGVzdC5leHBlY3RlZH0gZm9yICR7dGVzdC5kZXNjcmlwdGlvbn1gLCAoKSA9PiB7XG4gICAgICAgICAgZXhwZWN0KENvbW1vbi5pc05vdE51bGxPclVuZGVmaW5lZCh0ZXN0LnZhbHVlKSkudG9CZSghdGVzdC5leHBlY3RlZCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG4iXX0=
