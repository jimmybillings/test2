"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wz_form_base_1 = require("./wz.form-base");
function main() {
    describe('Wz Form Base', function () {
        var classUnderTest;
        var mockForm;
        var mockFormModel;
        var mockFormBuilder;
        beforeEach(function () {
            mockForm = {
                value: { some: 'value' },
                controls: {
                    blankField: {
                        hasError: function (error) { return error === 'required'; },
                        errors: {}
                    },
                    nonMatchingPatternField: {
                        hasError: function (error) { return error === 'pattern'; },
                        errors: {}
                    },
                    whitespaceField: {
                        hasError: function (error) { return false; },
                        errors: { pattern: { requiredPattern: String(/\S/) } }
                    },
                }
            };
            mockFormModel = {
                create: jasmine.createSpy('create')
            };
            mockFormBuilder = {
                group: jasmine.createSpy('group').and.returnValue(mockForm)
            };
            classUnderTest = new wz_form_base_1.WzFormBase(mockFormBuilder, mockFormModel, null);
        });
        describe('onSelectChange()', function () {
            var selectField;
            var otherField;
            beforeEach(function () {
                selectField = { options: 'zero,one', slaveFieldName: 'otherFieldName', slaveFieldValues: ['slaveZero', 'slaveOne'] };
                otherField = { value: 'slaveZero', setValue: function (newValue) { return otherField.value = newValue; } };
                mockForm.controls = { otherFieldName: otherField };
                classUnderTest.ngOnInit();
            });
            it('updates a slave field based on this field\'s selection', function () {
                classUnderTest.onSelectChange({ value: 'one' }, selectField);
                expect(otherField.value).toEqual('slaveOne');
            });
            it('does nothing if the select field\'s options property is missing', function () {
                delete selectField.options;
                classUnderTest.onSelectChange({ value: 'one' }, selectField);
                expect(otherField.value).toEqual('slaveZero');
            });
            it('does nothing if the select field\'s slaveFieldName property is missing', function () {
                delete selectField.slaveFieldName;
                classUnderTest.onSelectChange({ value: 'one' }, selectField);
                expect(otherField.value).toEqual('slaveZero');
            });
            it('does nothing if the select field\'s slaveFieldValues property is missing', function () {
                delete selectField.slaveFieldValues;
                classUnderTest.onSelectChange({ value: 'one' }, selectField);
                expect(otherField.value).toEqual('slaveZero');
            });
        });
        describe('error validators', function () {
            describe('shouldShowRequiredError(field)', function () {
                beforeEach(function () {
                    classUnderTest.ngOnInit();
                });
                it('shows error if the required validator exists', function () {
                    var field = { name: 'blankField', type: '', value: '', label: '' };
                    expect(classUnderTest.shouldShowRequiredError(field)).toBe(true);
                });
                it('shows error if the pattern validator matches only whitespace characters', function () {
                    var field = { name: 'whitespaceField', type: '', value: '', label: '' };
                    expect(classUnderTest.shouldShowRequiredError(field)).toBe(true);
                });
            });
            describe('shouldShowEmailError(field)', function () {
                beforeEach(function () {
                    classUnderTest.ngOnInit();
                });
                it('shows error if the pattern validator exists AND the validation of the field is "EMAIL"', function () {
                    var field = { name: 'nonMatchingPatternField', type: '', value: '', label: '', validation: 'EMAIL' };
                    expect(classUnderTest.shouldShowEmailError(field)).toBe(true);
                });
                it('does not show error if only the pattern validator exists', function () {
                    var field = { name: 'nonMatchingPatternField', type: '', value: '', label: '' };
                    expect(classUnderTest.shouldShowEmailError(field)).toBe(false);
                });
                it('does not show error if only the field validation is "EMAIL"', function () {
                    var field = { name: 'blankField', type: '', value: '', label: '', validation: 'EMAIL' };
                    expect(classUnderTest.shouldShowEmailError(field)).toBe(false);
                });
            });
        });
        describe('onKeyUp()', function () {
            it('emits the keyUp event', function () {
                spyOn(classUnderTest.keyUp, 'emit');
                classUnderTest.items = [{ some: 'item' }];
                classUnderTest.ngOnInit();
                classUnderTest.onKeyUp();
                expect(classUnderTest.keyUp.emit).toHaveBeenCalledWith({ some: 'value' });
            });
        });
        describe('showDefaultInputFor()', function () {
            describe('returns true', function () {
                it('when the field is one of type \'text\'', function () {
                    expect(classUnderTest.showDefaultInputFor({ type: 'text' })).toBe(true);
                });
                it('when the field is one of type \'date\'', function () {
                    expect(classUnderTest.showDefaultInputFor({ type: 'date' })).toBe(true);
                });
                it('when the field is one of type \'password\'', function () {
                    expect(classUnderTest.showDefaultInputFor({ type: 'password' })).toBe(true);
                });
                it('when the field is one of type \'email\'', function () {
                    expect(classUnderTest.showDefaultInputFor({ type: 'email' })).toBe(true);
                });
            });
            describe('returns false', function () {
                it('when the field is not of type \'text\', \'email\', \'date\', or \'password\'', function () {
                    expect(classUnderTest.showDefaultInputFor({ type: 'blah' })).toBe(false);
                });
            });
        });
        describe('get showSubmitAndCancel()', function () {
            describe('returns true', function () {
                it('when includeCancel is true, includeSubmit is true', function () {
                    classUnderTest.includeCancel = true;
                    classUnderTest.includeSubmit = true;
                    expect(classUnderTest.showSubmitAndCancel).toBe(true);
                });
            });
            describe('returns false', function () {
                it('when includeCancel is false', function () {
                    classUnderTest.includeCancel = false;
                    expect(classUnderTest.showSubmitAndCancel).toBe(false);
                });
                it('when includeSubmit is false', function () {
                    classUnderTest.includeCancel = true;
                    classUnderTest.includeSubmit = false;
                    expect(classUnderTest.showSubmitAndCancel).toBe(false);
                });
            });
        });
        describe('get showSubmit()', function () {
            describe('returns true', function () {
                it('when includeSubmit is true, includeCancel is false', function () {
                    classUnderTest.includeSubmit = true;
                    classUnderTest.includeCancel = false;
                    expect(classUnderTest.showSubmit).toBe(true);
                });
            });
            describe('returns false', function () {
                it('when includeSubmit is false', function () {
                    classUnderTest.includeSubmit = false;
                    expect(classUnderTest.showSubmit).toBe(false);
                });
                it('when includeCancel is true', function () {
                    classUnderTest.includeSubmit = true;
                    classUnderTest.includeCancel = true;
                    expect(classUnderTest.showSubmit).toBe(false);
                });
            });
        });
        describe('onDollarsInput()', function () {
            var event;
            var getCursorPositionIn = function (string) {
                var position = string.indexOf('|');
                return position === -1 ? string.length : position;
            };
            beforeEach(function () {
                event = { target: {} };
            });
            var tests = [
                { name: 'accepts an empty string', input: '', output: '' },
                { name: 'accepts numbers', input: '1234567890', output: '1234567890' },
                { name: 'accepts a decimal point', input: '123.45', output: '123.45' },
                { name: 'accepts a decimal point at the end', input: '123.', output: '123.' },
                { name: 'accepts initial decimal point', input: '.', output: '.' },
                { name: 'removes a leading zero', input: '02', output: '2' },
                { name: 'removes multiple leading zeros', input: '00002', output: '2' },
                { name: 'removes all but one zero if only zeros exist', input: '0000', output: '0' },
                { name: 'accepts zero by itself', input: '0', output: '0' },
                { name: 'accepts zero and decimal point only', input: '0.', output: '0.' },
                { name: 'rejects second decimal point', input: '1.25.', output: '1.25' },
                { name: 'rejects second decimal point after zero', input: '0..', output: '0.' },
                { name: 'rejects all but one decimal point', input: '1.2.3.4', output: '1.23' },
                { name: 'rejects more than two digits after decimal point', input: '1.501', output: '1.50' },
                { name: 'rejects an initial letter', input: 'a', output: '' },
                { name: 'rejects a later letter', input: '123a', output: '123' },
                { name: 'rejects a inserted letter', input: '1a|23', output: '1|23' },
                { name: 'rejects a bunch of bad characters at once', input: '0X0e28.5yX2XX.37p', output: '28.52' },
                { name: 'accepts an inserted decimal point', input: '12.|34', output: '12.|34' },
                { name: 'accepts a decimal point inserted left of the first digit', input: '.|1234', output: '.|12' },
                { name: 'accepts a decimal point inserted just right of the first digit', input: '1.|234', output: '1.|23' },
                { name: 'rejects decimal point inserted before an existing one', input: '12.|34.56', output: '12|34.56' },
                { name: 'rejects decimal point inserted after an existing one', input: '1234.5.|6', output: '1234.5|6' },
                {
                    name: 'rejects decimal point inserted before multiple others, and the rightmost excess ones (latter can\'t happen?)',
                    input: '12.|34.5..6', output: '12|34.56'
                },
                { name: 'accepts an inserted number', input: '12340|5678', output: '12340|5678' }
            ];
            var _loop_1 = function (test) {
                it(test.name, function () {
                    event.target.value = test.input.replace('|', '');
                    event.target.selectionStart = event.target.selectionEnd = getCursorPositionIn(test.input);
                    classUnderTest.onDollarsInput(event);
                    expect(event.target.value).toEqual(test.output.replace('|', ''));
                    expect(event.target.selectionStart).toEqual(getCursorPositionIn(test.output));
                    expect(event.target.selectionEnd).toEqual(event.target.selectionStart);
                });
            };
            for (var _i = 0, tests_1 = tests; _i < tests_1.length; _i++) {
                var test = tests_1[_i];
                _loop_1(test);
            }
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kdWxlcy93ei1mb3JtL3d6LmZvcm0tYmFzZS5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0NBQTRDO0FBRTVDO0lBQ0UsUUFBUSxDQUFDLGNBQWMsRUFBRTtRQUN2QixJQUFJLGNBQTBCLENBQUM7UUFDL0IsSUFBSSxRQUFhLENBQUM7UUFDbEIsSUFBSSxhQUFrQixDQUFDO1FBQ3ZCLElBQUksZUFBb0IsQ0FBQztRQUV6QixVQUFVLENBQUM7WUFDVCxRQUFRLEdBQUc7Z0JBQ1QsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRTtnQkFDeEIsUUFBUSxFQUFFO29CQUNSLFVBQVUsRUFBRTt3QkFDVixRQUFRLEVBQUUsVUFBQyxLQUFhLElBQUssT0FBQSxLQUFLLEtBQUssVUFBVSxFQUFwQixDQUFvQjt3QkFDakQsTUFBTSxFQUFFLEVBQUU7cUJBQ1g7b0JBQ0QsdUJBQXVCLEVBQUU7d0JBQ3ZCLFFBQVEsRUFBRSxVQUFDLEtBQWEsSUFBSyxPQUFBLEtBQUssS0FBSyxTQUFTLEVBQW5CLENBQW1CO3dCQUNoRCxNQUFNLEVBQUUsRUFBRTtxQkFDWDtvQkFDRCxlQUFlLEVBQUU7d0JBQ2YsUUFBUSxFQUFFLFVBQUMsS0FBYSxJQUFLLE9BQUEsS0FBSyxFQUFMLENBQUs7d0JBQ2xDLE1BQU0sRUFBRSxFQUFFLE9BQU8sRUFBRSxFQUFFLGVBQWUsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRTtxQkFDdkQ7aUJBQ0Y7YUFDRixDQUFDO1lBRUYsYUFBYSxHQUFHO2dCQUNkLE1BQU0sRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQzthQUNwQyxDQUFDO1lBRUYsZUFBZSxHQUFHO2dCQUNoQixLQUFLLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQzthQUM1RCxDQUFDO1lBRUYsY0FBYyxHQUFHLElBQUkseUJBQVUsQ0FBQyxlQUFlLEVBQUUsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3hFLENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLGtCQUFrQixFQUFFO1lBQzNCLElBQUksV0FBZ0IsQ0FBQztZQUNyQixJQUFJLFVBQWUsQ0FBQztZQUVwQixVQUFVLENBQUM7Z0JBQ1QsV0FBVyxHQUFHLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQyxXQUFXLEVBQUUsVUFBVSxDQUFDLEVBQUUsQ0FBQztnQkFDckgsVUFBVSxHQUFHLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsVUFBQyxRQUFhLElBQUssT0FBQSxVQUFVLENBQUMsS0FBSyxHQUFHLFFBQVEsRUFBM0IsQ0FBMkIsRUFBRSxDQUFDO2dCQUM5RixRQUFRLENBQUMsUUFBUSxHQUFHLEVBQUUsY0FBYyxFQUFFLFVBQVUsRUFBRSxDQUFDO2dCQUVuRCxjQUFjLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDNUIsQ0FBQyxDQUFDLENBQUM7WUFFSCxFQUFFLENBQUMsd0RBQXdELEVBQUU7Z0JBQzNELGNBQWMsQ0FBQyxjQUFjLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUUsV0FBVyxDQUFDLENBQUM7Z0JBRTdELE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQy9DLENBQUMsQ0FBQyxDQUFDO1lBRUgsRUFBRSxDQUFDLGlFQUFpRSxFQUFFO2dCQUNwRSxPQUFPLFdBQVcsQ0FBQyxPQUFPLENBQUM7Z0JBQzNCLGNBQWMsQ0FBQyxjQUFjLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUUsV0FBVyxDQUFDLENBQUM7Z0JBRTdELE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ2hELENBQUMsQ0FBQyxDQUFDO1lBRUgsRUFBRSxDQUFDLHdFQUF3RSxFQUFFO2dCQUMzRSxPQUFPLFdBQVcsQ0FBQyxjQUFjLENBQUM7Z0JBQ2xDLGNBQWMsQ0FBQyxjQUFjLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUUsV0FBVyxDQUFDLENBQUM7Z0JBRTdELE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ2hELENBQUMsQ0FBQyxDQUFDO1lBRUgsRUFBRSxDQUFDLDBFQUEwRSxFQUFFO2dCQUM3RSxPQUFPLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQztnQkFDcEMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRSxXQUFXLENBQUMsQ0FBQztnQkFFN0QsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDaEQsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxrQkFBa0IsRUFBRTtZQUMzQixRQUFRLENBQUMsZ0NBQWdDLEVBQUU7Z0JBQ3pDLFVBQVUsQ0FBQztvQkFDVCxjQUFjLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQzVCLENBQUMsQ0FBQyxDQUFDO2dCQUVILEVBQUUsQ0FBQyw4Q0FBOEMsRUFBRTtvQkFDakQsSUFBTSxLQUFLLEdBQUcsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLENBQUM7b0JBQ3JFLE1BQU0sQ0FBQyxjQUFjLENBQUMsdUJBQXVCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ25FLENBQUMsQ0FBQyxDQUFDO2dCQUVILEVBQUUsQ0FBQyx5RUFBeUUsRUFBRTtvQkFDNUUsSUFBTSxLQUFLLEdBQUcsRUFBRSxJQUFJLEVBQUUsaUJBQWlCLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsQ0FBQztvQkFDMUUsTUFBTSxDQUFDLGNBQWMsQ0FBQyx1QkFBdUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDbkUsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztZQUVILFFBQVEsQ0FBQyw2QkFBNkIsRUFBRTtnQkFDdEMsVUFBVSxDQUFDO29CQUNULGNBQWMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDNUIsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsRUFBRSxDQUFDLHdGQUF3RixFQUFFO29CQUMzRixJQUFNLEtBQUssR0FBRyxFQUFFLElBQUksRUFBRSx5QkFBeUIsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLENBQUM7b0JBQ3ZHLE1BQU0sQ0FBQyxjQUFjLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2hFLENBQUMsQ0FBQyxDQUFDO2dCQUVILEVBQUUsQ0FBQywwREFBMEQsRUFBRTtvQkFDN0QsSUFBTSxLQUFLLEdBQUcsRUFBRSxJQUFJLEVBQUUseUJBQXlCLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsQ0FBQztvQkFDbEYsTUFBTSxDQUFDLGNBQWMsQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDakUsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsRUFBRSxDQUFDLDZEQUE2RCxFQUFFO29CQUNoRSxJQUFNLEtBQUssR0FBRyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxDQUFDO29CQUMxRixNQUFNLENBQUMsY0FBYyxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNqRSxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsV0FBVyxFQUFFO1lBQ3BCLEVBQUUsQ0FBQyx1QkFBdUIsRUFBRTtnQkFDMUIsS0FBSyxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQ3BDLGNBQWMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBUSxDQUFDO2dCQUNqRCxjQUFjLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQzFCLGNBQWMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDekIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsb0JBQW9CLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztZQUM1RSxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLHVCQUF1QixFQUFFO1lBQ2hDLFFBQVEsQ0FBQyxjQUFjLEVBQUU7Z0JBQ3ZCLEVBQUUsQ0FBQyx3Q0FBd0MsRUFBRTtvQkFDM0MsTUFBTSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNqRixDQUFDLENBQUMsQ0FBQztnQkFFSCxFQUFFLENBQUMsd0NBQXdDLEVBQUU7b0JBQzNDLE1BQU0sQ0FBQyxjQUFjLENBQUMsbUJBQW1CLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDakYsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsRUFBRSxDQUFDLDRDQUE0QyxFQUFFO29CQUMvQyxNQUFNLENBQUMsY0FBYyxDQUFDLG1CQUFtQixDQUFDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3JGLENBQUMsQ0FBQyxDQUFDO2dCQUVILEVBQUUsQ0FBQyx5Q0FBeUMsRUFBRTtvQkFDNUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNsRixDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1lBRUgsUUFBUSxDQUFDLGVBQWUsRUFBRTtnQkFDeEIsRUFBRSxDQUFDLDhFQUE4RSxFQUFFO29CQUNqRixNQUFNLENBQUMsY0FBYyxDQUFDLG1CQUFtQixDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2xGLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQywyQkFBMkIsRUFBRTtZQUNwQyxRQUFRLENBQUMsY0FBYyxFQUFFO2dCQUN2QixFQUFFLENBQUMsbURBQW1ELEVBQUU7b0JBQ3RELGNBQWMsQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO29CQUNwQyxjQUFjLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztvQkFFcEMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDeEQsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztZQUVILFFBQVEsQ0FBQyxlQUFlLEVBQUU7Z0JBQ3hCLEVBQUUsQ0FBQyw2QkFBNkIsRUFBRTtvQkFDaEMsY0FBYyxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7b0JBRXJDLE1BQU0sQ0FBQyxjQUFjLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3pELENBQUMsQ0FBQyxDQUFDO2dCQUVILEVBQUUsQ0FBQyw2QkFBNkIsRUFBRTtvQkFDaEMsY0FBYyxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7b0JBQ3BDLGNBQWMsQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO29CQUVyQyxNQUFNLENBQUMsY0FBYyxDQUFDLG1CQUFtQixDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN6RCxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsa0JBQWtCLEVBQUU7WUFDM0IsUUFBUSxDQUFDLGNBQWMsRUFBRTtnQkFDdkIsRUFBRSxDQUFDLG9EQUFvRCxFQUFFO29CQUN2RCxjQUFjLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztvQkFDcEMsY0FBYyxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7b0JBRXJDLE1BQU0sQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUMvQyxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1lBRUgsUUFBUSxDQUFDLGVBQWUsRUFBRTtnQkFDeEIsRUFBRSxDQUFDLDZCQUE2QixFQUFFO29CQUNoQyxjQUFjLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztvQkFFckMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2hELENBQUMsQ0FBQyxDQUFDO2dCQUVILEVBQUUsQ0FBQyw0QkFBNEIsRUFBRTtvQkFDL0IsY0FBYyxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7b0JBQ3BDLGNBQWMsQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO29CQUVwQyxNQUFNLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDaEQsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLGtCQUFrQixFQUFFO1lBQzNCLElBQUksS0FBVSxDQUFDO1lBQ2YsSUFBTSxtQkFBbUIsR0FBYSxVQUFDLE1BQWM7Z0JBQ25ELElBQU0sUUFBUSxHQUFXLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzdDLE1BQU0sQ0FBQyxRQUFRLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztZQUNwRCxDQUFDLENBQUM7WUFFRixVQUFVLENBQUM7Z0JBQ1QsS0FBSyxHQUFHLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxDQUFDO1lBQ3pCLENBQUMsQ0FBQyxDQUFDO1lBaUJILElBQUksS0FBSyxHQUFRO2dCQUNmLEVBQUUsSUFBSSxFQUFFLHlCQUF5QixFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRTtnQkFDMUQsRUFBRSxJQUFJLEVBQUUsaUJBQWlCLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFO2dCQUN0RSxFQUFFLElBQUksRUFBRSx5QkFBeUIsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUU7Z0JBQ3RFLEVBQUUsSUFBSSxFQUFFLG9DQUFvQyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRTtnQkFDN0UsRUFBRSxJQUFJLEVBQUUsK0JBQStCLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFO2dCQUNsRSxFQUFFLElBQUksRUFBRSx3QkFBd0IsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUU7Z0JBQzVELEVBQUUsSUFBSSxFQUFFLGdDQUFnQyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRTtnQkFDdkUsRUFBRSxJQUFJLEVBQUUsOENBQThDLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFO2dCQUNwRixFQUFFLElBQUksRUFBRSx3QkFBd0IsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUU7Z0JBQzNELEVBQUUsSUFBSSxFQUFFLHFDQUFxQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtnQkFDMUUsRUFBRSxJQUFJLEVBQUUsOEJBQThCLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFO2dCQUN4RSxFQUFFLElBQUksRUFBRSx5Q0FBeUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7Z0JBQy9FLEVBQUUsSUFBSSxFQUFFLG1DQUFtQyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRTtnQkFDL0UsRUFBRSxJQUFJLEVBQUUsa0RBQWtELEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFO2dCQUM1RixFQUFFLElBQUksRUFBRSwyQkFBMkIsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7Z0JBQzdELEVBQUUsSUFBSSxFQUFFLHdCQUF3QixFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTtnQkFDaEUsRUFBRSxJQUFJLEVBQUUsMkJBQTJCLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFO2dCQUNyRSxFQUFFLElBQUksRUFBRSwyQ0FBMkMsRUFBRSxLQUFLLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRTtnQkFDbEcsRUFBRSxJQUFJLEVBQUUsbUNBQW1DLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFO2dCQUNoRixFQUFFLElBQUksRUFBRSwwREFBMEQsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUU7Z0JBQ3JHLEVBQUUsSUFBSSxFQUFFLGdFQUFnRSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRTtnQkFDNUcsRUFBRSxJQUFJLEVBQUUsdURBQXVELEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFO2dCQUN6RyxFQUFFLElBQUksRUFBRSxzREFBc0QsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUU7Z0JBQ3hHO29CQUNFLElBQUksRUFBRSw4R0FBOEc7b0JBQ3BILEtBQUssRUFBRSxhQUFhLEVBQUUsTUFBTSxFQUFFLFVBQVU7aUJBQ3pDO2dCQUNELEVBQUUsSUFBSSxFQUFFLDRCQUE0QixFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRTthQUNsRixDQUFDO29DQUVTLElBQUk7Z0JBQ2IsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7b0JBQ1osS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO29CQUNqRCxLQUFLLENBQUMsTUFBTSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLFlBQVksR0FBRyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBRTFGLGNBQWMsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBRXJDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDakUsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO29CQUM5RSxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFDekUsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDO1lBWEQsR0FBRyxDQUFDLENBQWUsVUFBSyxFQUFMLGVBQUssRUFBTCxtQkFBSyxFQUFMLElBQUs7Z0JBQW5CLElBQU0sSUFBSSxjQUFBO3dCQUFKLElBQUk7YUFXZDtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBblJELG9CQW1SQyIsImZpbGUiOiJhcHAvc2hhcmVkL21vZHVsZXMvd3otZm9ybS93ei5mb3JtLWJhc2Uuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFd6Rm9ybUJhc2UgfSBmcm9tICcuL3d6LmZvcm0tYmFzZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBkZXNjcmliZSgnV3ogRm9ybSBCYXNlJywgKCkgPT4ge1xuICAgIGxldCBjbGFzc1VuZGVyVGVzdDogV3pGb3JtQmFzZTtcbiAgICBsZXQgbW9ja0Zvcm06IGFueTtcbiAgICBsZXQgbW9ja0Zvcm1Nb2RlbDogYW55O1xuICAgIGxldCBtb2NrRm9ybUJ1aWxkZXI6IGFueTtcblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgbW9ja0Zvcm0gPSB7XG4gICAgICAgIHZhbHVlOiB7IHNvbWU6ICd2YWx1ZScgfSxcbiAgICAgICAgY29udHJvbHM6IHtcbiAgICAgICAgICBibGFua0ZpZWxkOiB7XG4gICAgICAgICAgICBoYXNFcnJvcjogKGVycm9yOiBzdHJpbmcpID0+IGVycm9yID09PSAncmVxdWlyZWQnLFxuICAgICAgICAgICAgZXJyb3JzOiB7fVxuICAgICAgICAgIH0sXG4gICAgICAgICAgbm9uTWF0Y2hpbmdQYXR0ZXJuRmllbGQ6IHtcbiAgICAgICAgICAgIGhhc0Vycm9yOiAoZXJyb3I6IHN0cmluZykgPT4gZXJyb3IgPT09ICdwYXR0ZXJuJyxcbiAgICAgICAgICAgIGVycm9yczoge31cbiAgICAgICAgICB9LFxuICAgICAgICAgIHdoaXRlc3BhY2VGaWVsZDoge1xuICAgICAgICAgICAgaGFzRXJyb3I6IChlcnJvcjogc3RyaW5nKSA9PiBmYWxzZSxcbiAgICAgICAgICAgIGVycm9yczogeyBwYXR0ZXJuOiB7IHJlcXVpcmVkUGF0dGVybjogU3RyaW5nKC9cXFMvKSB9IH1cbiAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBtb2NrRm9ybU1vZGVsID0ge1xuICAgICAgICBjcmVhdGU6IGphc21pbmUuY3JlYXRlU3B5KCdjcmVhdGUnKVxuICAgICAgfTtcblxuICAgICAgbW9ja0Zvcm1CdWlsZGVyID0ge1xuICAgICAgICBncm91cDogamFzbWluZS5jcmVhdGVTcHkoJ2dyb3VwJykuYW5kLnJldHVyblZhbHVlKG1vY2tGb3JtKVxuICAgICAgfTtcblxuICAgICAgY2xhc3NVbmRlclRlc3QgPSBuZXcgV3pGb3JtQmFzZShtb2NrRm9ybUJ1aWxkZXIsIG1vY2tGb3JtTW9kZWwsIG51bGwpO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ29uU2VsZWN0Q2hhbmdlKCknLCAoKSA9PiB7XG4gICAgICBsZXQgc2VsZWN0RmllbGQ6IGFueTtcbiAgICAgIGxldCBvdGhlckZpZWxkOiBhbnk7XG5cbiAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICBzZWxlY3RGaWVsZCA9IHsgb3B0aW9uczogJ3plcm8sb25lJywgc2xhdmVGaWVsZE5hbWU6ICdvdGhlckZpZWxkTmFtZScsIHNsYXZlRmllbGRWYWx1ZXM6IFsnc2xhdmVaZXJvJywgJ3NsYXZlT25lJ10gfTtcbiAgICAgICAgb3RoZXJGaWVsZCA9IHsgdmFsdWU6ICdzbGF2ZVplcm8nLCBzZXRWYWx1ZTogKG5ld1ZhbHVlOiBhbnkpID0+IG90aGVyRmllbGQudmFsdWUgPSBuZXdWYWx1ZSB9O1xuICAgICAgICBtb2NrRm9ybS5jb250cm9scyA9IHsgb3RoZXJGaWVsZE5hbWU6IG90aGVyRmllbGQgfTtcblxuICAgICAgICBjbGFzc1VuZGVyVGVzdC5uZ09uSW5pdCgpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCd1cGRhdGVzIGEgc2xhdmUgZmllbGQgYmFzZWQgb24gdGhpcyBmaWVsZFxcJ3Mgc2VsZWN0aW9uJywgKCkgPT4ge1xuICAgICAgICBjbGFzc1VuZGVyVGVzdC5vblNlbGVjdENoYW5nZSh7IHZhbHVlOiAnb25lJyB9LCBzZWxlY3RGaWVsZCk7XG5cbiAgICAgICAgZXhwZWN0KG90aGVyRmllbGQudmFsdWUpLnRvRXF1YWwoJ3NsYXZlT25lJyk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ2RvZXMgbm90aGluZyBpZiB0aGUgc2VsZWN0IGZpZWxkXFwncyBvcHRpb25zIHByb3BlcnR5IGlzIG1pc3NpbmcnLCAoKSA9PiB7XG4gICAgICAgIGRlbGV0ZSBzZWxlY3RGaWVsZC5vcHRpb25zO1xuICAgICAgICBjbGFzc1VuZGVyVGVzdC5vblNlbGVjdENoYW5nZSh7IHZhbHVlOiAnb25lJyB9LCBzZWxlY3RGaWVsZCk7XG5cbiAgICAgICAgZXhwZWN0KG90aGVyRmllbGQudmFsdWUpLnRvRXF1YWwoJ3NsYXZlWmVybycpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdkb2VzIG5vdGhpbmcgaWYgdGhlIHNlbGVjdCBmaWVsZFxcJ3Mgc2xhdmVGaWVsZE5hbWUgcHJvcGVydHkgaXMgbWlzc2luZycsICgpID0+IHtcbiAgICAgICAgZGVsZXRlIHNlbGVjdEZpZWxkLnNsYXZlRmllbGROYW1lO1xuICAgICAgICBjbGFzc1VuZGVyVGVzdC5vblNlbGVjdENoYW5nZSh7IHZhbHVlOiAnb25lJyB9LCBzZWxlY3RGaWVsZCk7XG5cbiAgICAgICAgZXhwZWN0KG90aGVyRmllbGQudmFsdWUpLnRvRXF1YWwoJ3NsYXZlWmVybycpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdkb2VzIG5vdGhpbmcgaWYgdGhlIHNlbGVjdCBmaWVsZFxcJ3Mgc2xhdmVGaWVsZFZhbHVlcyBwcm9wZXJ0eSBpcyBtaXNzaW5nJywgKCkgPT4ge1xuICAgICAgICBkZWxldGUgc2VsZWN0RmllbGQuc2xhdmVGaWVsZFZhbHVlcztcbiAgICAgICAgY2xhc3NVbmRlclRlc3Qub25TZWxlY3RDaGFuZ2UoeyB2YWx1ZTogJ29uZScgfSwgc2VsZWN0RmllbGQpO1xuXG4gICAgICAgIGV4cGVjdChvdGhlckZpZWxkLnZhbHVlKS50b0VxdWFsKCdzbGF2ZVplcm8nKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2Vycm9yIHZhbGlkYXRvcnMnLCAoKSA9PiB7XG4gICAgICBkZXNjcmliZSgnc2hvdWxkU2hvd1JlcXVpcmVkRXJyb3IoZmllbGQpJywgKCkgPT4ge1xuICAgICAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgICBjbGFzc1VuZGVyVGVzdC5uZ09uSW5pdCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvd3MgZXJyb3IgaWYgdGhlIHJlcXVpcmVkIHZhbGlkYXRvciBleGlzdHMnLCAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgZmllbGQgPSB7IG5hbWU6ICdibGFua0ZpZWxkJywgdHlwZTogJycsIHZhbHVlOiAnJywgbGFiZWw6ICcnIH07XG4gICAgICAgICAgZXhwZWN0KGNsYXNzVW5kZXJUZXN0LnNob3VsZFNob3dSZXF1aXJlZEVycm9yKGZpZWxkKSkudG9CZSh0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3dzIGVycm9yIGlmIHRoZSBwYXR0ZXJuIHZhbGlkYXRvciBtYXRjaGVzIG9ubHkgd2hpdGVzcGFjZSBjaGFyYWN0ZXJzJywgKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGZpZWxkID0geyBuYW1lOiAnd2hpdGVzcGFjZUZpZWxkJywgdHlwZTogJycsIHZhbHVlOiAnJywgbGFiZWw6ICcnIH07XG4gICAgICAgICAgZXhwZWN0KGNsYXNzVW5kZXJUZXN0LnNob3VsZFNob3dSZXF1aXJlZEVycm9yKGZpZWxkKSkudG9CZSh0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgZGVzY3JpYmUoJ3Nob3VsZFNob3dFbWFpbEVycm9yKGZpZWxkKScsICgpID0+IHtcbiAgICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgICAgY2xhc3NVbmRlclRlc3QubmdPbkluaXQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3dzIGVycm9yIGlmIHRoZSBwYXR0ZXJuIHZhbGlkYXRvciBleGlzdHMgQU5EIHRoZSB2YWxpZGF0aW9uIG9mIHRoZSBmaWVsZCBpcyBcIkVNQUlMXCInLCAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgZmllbGQgPSB7IG5hbWU6ICdub25NYXRjaGluZ1BhdHRlcm5GaWVsZCcsIHR5cGU6ICcnLCB2YWx1ZTogJycsIGxhYmVsOiAnJywgdmFsaWRhdGlvbjogJ0VNQUlMJyB9O1xuICAgICAgICAgIGV4cGVjdChjbGFzc1VuZGVyVGVzdC5zaG91bGRTaG93RW1haWxFcnJvcihmaWVsZCkpLnRvQmUodHJ1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdkb2VzIG5vdCBzaG93IGVycm9yIGlmIG9ubHkgdGhlIHBhdHRlcm4gdmFsaWRhdG9yIGV4aXN0cycsICgpID0+IHtcbiAgICAgICAgICBjb25zdCBmaWVsZCA9IHsgbmFtZTogJ25vbk1hdGNoaW5nUGF0dGVybkZpZWxkJywgdHlwZTogJycsIHZhbHVlOiAnJywgbGFiZWw6ICcnIH07XG4gICAgICAgICAgZXhwZWN0KGNsYXNzVW5kZXJUZXN0LnNob3VsZFNob3dFbWFpbEVycm9yKGZpZWxkKSkudG9CZShmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdkb2VzIG5vdCBzaG93IGVycm9yIGlmIG9ubHkgdGhlIGZpZWxkIHZhbGlkYXRpb24gaXMgXCJFTUFJTFwiJywgKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGZpZWxkID0geyBuYW1lOiAnYmxhbmtGaWVsZCcsIHR5cGU6ICcnLCB2YWx1ZTogJycsIGxhYmVsOiAnJywgdmFsaWRhdGlvbjogJ0VNQUlMJyB9O1xuICAgICAgICAgIGV4cGVjdChjbGFzc1VuZGVyVGVzdC5zaG91bGRTaG93RW1haWxFcnJvcihmaWVsZCkpLnRvQmUoZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ29uS2V5VXAoKScsICgpID0+IHtcbiAgICAgIGl0KCdlbWl0cyB0aGUga2V5VXAgZXZlbnQnLCAoKSA9PiB7XG4gICAgICAgIHNweU9uKGNsYXNzVW5kZXJUZXN0LmtleVVwLCAnZW1pdCcpO1xuICAgICAgICBjbGFzc1VuZGVyVGVzdC5pdGVtcyA9IFt7IHNvbWU6ICdpdGVtJyB9XSBhcyBhbnk7XG4gICAgICAgIGNsYXNzVW5kZXJUZXN0Lm5nT25Jbml0KCk7XG4gICAgICAgIGNsYXNzVW5kZXJUZXN0Lm9uS2V5VXAoKTtcbiAgICAgICAgZXhwZWN0KGNsYXNzVW5kZXJUZXN0LmtleVVwLmVtaXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHsgc29tZTogJ3ZhbHVlJyB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3Nob3dEZWZhdWx0SW5wdXRGb3IoKScsICgpID0+IHtcbiAgICAgIGRlc2NyaWJlKCdyZXR1cm5zIHRydWUnLCAoKSA9PiB7XG4gICAgICAgIGl0KCd3aGVuIHRoZSBmaWVsZCBpcyBvbmUgb2YgdHlwZSBcXCd0ZXh0XFwnJywgKCkgPT4ge1xuICAgICAgICAgIGV4cGVjdChjbGFzc1VuZGVyVGVzdC5zaG93RGVmYXVsdElucHV0Rm9yKHsgdHlwZTogJ3RleHQnIH0gYXMgYW55KSkudG9CZSh0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3doZW4gdGhlIGZpZWxkIGlzIG9uZSBvZiB0eXBlIFxcJ2RhdGVcXCcnLCAoKSA9PiB7XG4gICAgICAgICAgZXhwZWN0KGNsYXNzVW5kZXJUZXN0LnNob3dEZWZhdWx0SW5wdXRGb3IoeyB0eXBlOiAnZGF0ZScgfSBhcyBhbnkpKS50b0JlKHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnd2hlbiB0aGUgZmllbGQgaXMgb25lIG9mIHR5cGUgXFwncGFzc3dvcmRcXCcnLCAoKSA9PiB7XG4gICAgICAgICAgZXhwZWN0KGNsYXNzVW5kZXJUZXN0LnNob3dEZWZhdWx0SW5wdXRGb3IoeyB0eXBlOiAncGFzc3dvcmQnIH0gYXMgYW55KSkudG9CZSh0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3doZW4gdGhlIGZpZWxkIGlzIG9uZSBvZiB0eXBlIFxcJ2VtYWlsXFwnJywgKCkgPT4ge1xuICAgICAgICAgIGV4cGVjdChjbGFzc1VuZGVyVGVzdC5zaG93RGVmYXVsdElucHV0Rm9yKHsgdHlwZTogJ2VtYWlsJyB9IGFzIGFueSkpLnRvQmUodHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGRlc2NyaWJlKCdyZXR1cm5zIGZhbHNlJywgKCkgPT4ge1xuICAgICAgICBpdCgnd2hlbiB0aGUgZmllbGQgaXMgbm90IG9mIHR5cGUgXFwndGV4dFxcJywgXFwnZW1haWxcXCcsIFxcJ2RhdGVcXCcsIG9yIFxcJ3Bhc3N3b3JkXFwnJywgKCkgPT4ge1xuICAgICAgICAgIGV4cGVjdChjbGFzc1VuZGVyVGVzdC5zaG93RGVmYXVsdElucHV0Rm9yKHsgdHlwZTogJ2JsYWgnIH0gYXMgYW55KSkudG9CZShmYWxzZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZ2V0IHNob3dTdWJtaXRBbmRDYW5jZWwoKScsICgpID0+IHtcbiAgICAgIGRlc2NyaWJlKCdyZXR1cm5zIHRydWUnLCAoKSA9PiB7XG4gICAgICAgIGl0KCd3aGVuIGluY2x1ZGVDYW5jZWwgaXMgdHJ1ZSwgaW5jbHVkZVN1Ym1pdCBpcyB0cnVlJywgKCkgPT4ge1xuICAgICAgICAgIGNsYXNzVW5kZXJUZXN0LmluY2x1ZGVDYW5jZWwgPSB0cnVlO1xuICAgICAgICAgIGNsYXNzVW5kZXJUZXN0LmluY2x1ZGVTdWJtaXQgPSB0cnVlO1xuXG4gICAgICAgICAgZXhwZWN0KGNsYXNzVW5kZXJUZXN0LnNob3dTdWJtaXRBbmRDYW5jZWwpLnRvQmUodHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGRlc2NyaWJlKCdyZXR1cm5zIGZhbHNlJywgKCkgPT4ge1xuICAgICAgICBpdCgnd2hlbiBpbmNsdWRlQ2FuY2VsIGlzIGZhbHNlJywgKCkgPT4ge1xuICAgICAgICAgIGNsYXNzVW5kZXJUZXN0LmluY2x1ZGVDYW5jZWwgPSBmYWxzZTtcblxuICAgICAgICAgIGV4cGVjdChjbGFzc1VuZGVyVGVzdC5zaG93U3VibWl0QW5kQ2FuY2VsKS50b0JlKGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3doZW4gaW5jbHVkZVN1Ym1pdCBpcyBmYWxzZScsICgpID0+IHtcbiAgICAgICAgICBjbGFzc1VuZGVyVGVzdC5pbmNsdWRlQ2FuY2VsID0gdHJ1ZTtcbiAgICAgICAgICBjbGFzc1VuZGVyVGVzdC5pbmNsdWRlU3VibWl0ID0gZmFsc2U7XG5cbiAgICAgICAgICBleHBlY3QoY2xhc3NVbmRlclRlc3Quc2hvd1N1Ym1pdEFuZENhbmNlbCkudG9CZShmYWxzZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZ2V0IHNob3dTdWJtaXQoKScsICgpID0+IHtcbiAgICAgIGRlc2NyaWJlKCdyZXR1cm5zIHRydWUnLCAoKSA9PiB7XG4gICAgICAgIGl0KCd3aGVuIGluY2x1ZGVTdWJtaXQgaXMgdHJ1ZSwgaW5jbHVkZUNhbmNlbCBpcyBmYWxzZScsICgpID0+IHtcbiAgICAgICAgICBjbGFzc1VuZGVyVGVzdC5pbmNsdWRlU3VibWl0ID0gdHJ1ZTtcbiAgICAgICAgICBjbGFzc1VuZGVyVGVzdC5pbmNsdWRlQ2FuY2VsID0gZmFsc2U7XG5cbiAgICAgICAgICBleHBlY3QoY2xhc3NVbmRlclRlc3Quc2hvd1N1Ym1pdCkudG9CZSh0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgZGVzY3JpYmUoJ3JldHVybnMgZmFsc2UnLCAoKSA9PiB7XG4gICAgICAgIGl0KCd3aGVuIGluY2x1ZGVTdWJtaXQgaXMgZmFsc2UnLCAoKSA9PiB7XG4gICAgICAgICAgY2xhc3NVbmRlclRlc3QuaW5jbHVkZVN1Ym1pdCA9IGZhbHNlO1xuXG4gICAgICAgICAgZXhwZWN0KGNsYXNzVW5kZXJUZXN0LnNob3dTdWJtaXQpLnRvQmUoZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnd2hlbiBpbmNsdWRlQ2FuY2VsIGlzIHRydWUnLCAoKSA9PiB7XG4gICAgICAgICAgY2xhc3NVbmRlclRlc3QuaW5jbHVkZVN1Ym1pdCA9IHRydWU7XG4gICAgICAgICAgY2xhc3NVbmRlclRlc3QuaW5jbHVkZUNhbmNlbCA9IHRydWU7XG5cbiAgICAgICAgICBleHBlY3QoY2xhc3NVbmRlclRlc3Quc2hvd1N1Ym1pdCkudG9CZShmYWxzZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnb25Eb2xsYXJzSW5wdXQoKScsICgpID0+IHtcbiAgICAgIGxldCBldmVudDogYW55O1xuICAgICAgY29uc3QgZ2V0Q3Vyc29yUG9zaXRpb25JbjogRnVuY3Rpb24gPSAoc3RyaW5nOiBzdHJpbmcpID0+IHtcbiAgICAgICAgY29uc3QgcG9zaXRpb246IG51bWJlciA9IHN0cmluZy5pbmRleE9mKCd8Jyk7XG4gICAgICAgIHJldHVybiBwb3NpdGlvbiA9PT0gLTEgPyBzdHJpbmcubGVuZ3RoIDogcG9zaXRpb247XG4gICAgICB9O1xuXG4gICAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgZXZlbnQgPSB7IHRhcmdldDoge30gfTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBJbiB0aGVzZSB0ZXN0cywgYSBwaXBlICgnfCcpIGluIHRoZSBpbnB1dCByZXByZXNlbnRzIHRoZSBjdXJyZW50IGN1cnNvciBwb3NpdGlvbiwgd2hpY2ggaXMganVzdCB0b1xuICAgICAgLy8gdGhlIHJpZ2h0IG9mIHRoZSBtb3N0IHJlY2VudCBjaGFyYWN0ZXIgdGhlIHVzZXIgdHlwZWQuICBObyBwaXBlIGltcGxpZXMgdGhhdCB0aGUgY3Vyc29yIGlzIGF0IHRoZSBlbmQuXG4gICAgICAvL1xuICAgICAgLy8gRXhhbXBsZXM6XG4gICAgICAvLyAtIEFuIGlucHV0IG9mICcxfDIzJyBtZWFucyB0aGF0IHRoZSB2YWx1ZSB3YXMgcHJldmlvdXNseSAnMjMnLCBhbmQgdGhlbiB0aGUgdXNlciBtb3ZlZCB0aGUgY3Vyc29yXG4gICAgICAvLyAgIGp1c3QgbGVmdCBvZiB0aGUgJzInIGFuZCB0aGVuIHR5cGVkIGEgJzEnLiAgU28gdGhlIGN1cnNvciBpcyBiZXR3ZWVuIHRoZSAnMScgYW5kICcyJy5cbiAgICAgIC8vIC0gQW4gaW5wdXQgb2YgJzEyMycgbWVhbnMgdGhhdCB0aGUgdmFsdWUgd2FzIHByZXZpb3VzbHkgJzEyJywgYW5kIHRoZW4gdGhlIHVzZXIgbW92ZWQgdGhlIGN1cnNvciB0b1xuICAgICAgLy8gICBqdXN0IHJpZ2h0IG9mIHRoZSAnMicgKG9yIGp1c3QgbGVmdCBjdXJzb3IgdGhlcmUpIGFuZCB0eXBlZCBhICczJy4gIFNvIHRoZSBjdXJzb3IgaXMgcmlnaHQgb2YgdGhlICczJy5cbiAgICAgIC8vXG4gICAgICAvLyBOb3RlIHRoYXQgd2UgZG9uJ3QgbmVlZCB0byByZXByZXNlbnQgYSBzZWxlY3RlZCBzZXQgb2YgY2hhcmFjdGVycywgYmVjYXVzZSB3aGVuIGFuIFwiaW5wdXRcIiBldmVudFxuICAgICAgLy8gaXMgdHJpZ2dlcmVkLCB0aGUgc2VsZWN0aW9uIG11c3QgaGF2ZSBiZWVuIHJlcGxhY2VkIGJ5IDAtMSBjaGFyYWN0ZXJzLCBhbmQgdGhlcmUgaXMgbm8gc2VsZWN0aW9uIGFueW1vcmUuXG4gICAgICAvL1xuICAgICAgLy8gQWxzbywgbm90ZSB0aGF0IGlucHV0IHZhbHVlcyBjYW4gY29tZSBpbiBvbmUgYmlnIGNodW5rLCBpbiB0aGUgZm9ybSBvZiBhIHBhc3RlIG9wZXJhdGlvbi4gIFRodXMsIGlucHV0cyBsaWtlXG4gICAgICAvLyAnMS4yLjMuNCcgY2FuIGhhcHBlbiwgZXZlbiBpZiB0aGV5IGNhbid0IGhhcHBlbiBvbmUgY2hhcmFjdGVyIGF0IGEgdGltZS5cbiAgICAgIC8vXG4gICAgICBsZXQgdGVzdHM6IGFueSA9IFtcbiAgICAgICAgeyBuYW1lOiAnYWNjZXB0cyBhbiBlbXB0eSBzdHJpbmcnLCBpbnB1dDogJycsIG91dHB1dDogJycgfSxcbiAgICAgICAgeyBuYW1lOiAnYWNjZXB0cyBudW1iZXJzJywgaW5wdXQ6ICcxMjM0NTY3ODkwJywgb3V0cHV0OiAnMTIzNDU2Nzg5MCcgfSxcbiAgICAgICAgeyBuYW1lOiAnYWNjZXB0cyBhIGRlY2ltYWwgcG9pbnQnLCBpbnB1dDogJzEyMy40NScsIG91dHB1dDogJzEyMy40NScgfSxcbiAgICAgICAgeyBuYW1lOiAnYWNjZXB0cyBhIGRlY2ltYWwgcG9pbnQgYXQgdGhlIGVuZCcsIGlucHV0OiAnMTIzLicsIG91dHB1dDogJzEyMy4nIH0sXG4gICAgICAgIHsgbmFtZTogJ2FjY2VwdHMgaW5pdGlhbCBkZWNpbWFsIHBvaW50JywgaW5wdXQ6ICcuJywgb3V0cHV0OiAnLicgfSxcbiAgICAgICAgeyBuYW1lOiAncmVtb3ZlcyBhIGxlYWRpbmcgemVybycsIGlucHV0OiAnMDInLCBvdXRwdXQ6ICcyJyB9LFxuICAgICAgICB7IG5hbWU6ICdyZW1vdmVzIG11bHRpcGxlIGxlYWRpbmcgemVyb3MnLCBpbnB1dDogJzAwMDAyJywgb3V0cHV0OiAnMicgfSxcbiAgICAgICAgeyBuYW1lOiAncmVtb3ZlcyBhbGwgYnV0IG9uZSB6ZXJvIGlmIG9ubHkgemVyb3MgZXhpc3QnLCBpbnB1dDogJzAwMDAnLCBvdXRwdXQ6ICcwJyB9LFxuICAgICAgICB7IG5hbWU6ICdhY2NlcHRzIHplcm8gYnkgaXRzZWxmJywgaW5wdXQ6ICcwJywgb3V0cHV0OiAnMCcgfSxcbiAgICAgICAgeyBuYW1lOiAnYWNjZXB0cyB6ZXJvIGFuZCBkZWNpbWFsIHBvaW50IG9ubHknLCBpbnB1dDogJzAuJywgb3V0cHV0OiAnMC4nIH0sXG4gICAgICAgIHsgbmFtZTogJ3JlamVjdHMgc2Vjb25kIGRlY2ltYWwgcG9pbnQnLCBpbnB1dDogJzEuMjUuJywgb3V0cHV0OiAnMS4yNScgfSxcbiAgICAgICAgeyBuYW1lOiAncmVqZWN0cyBzZWNvbmQgZGVjaW1hbCBwb2ludCBhZnRlciB6ZXJvJywgaW5wdXQ6ICcwLi4nLCBvdXRwdXQ6ICcwLicgfSxcbiAgICAgICAgeyBuYW1lOiAncmVqZWN0cyBhbGwgYnV0IG9uZSBkZWNpbWFsIHBvaW50JywgaW5wdXQ6ICcxLjIuMy40Jywgb3V0cHV0OiAnMS4yMycgfSxcbiAgICAgICAgeyBuYW1lOiAncmVqZWN0cyBtb3JlIHRoYW4gdHdvIGRpZ2l0cyBhZnRlciBkZWNpbWFsIHBvaW50JywgaW5wdXQ6ICcxLjUwMScsIG91dHB1dDogJzEuNTAnIH0sXG4gICAgICAgIHsgbmFtZTogJ3JlamVjdHMgYW4gaW5pdGlhbCBsZXR0ZXInLCBpbnB1dDogJ2EnLCBvdXRwdXQ6ICcnIH0sXG4gICAgICAgIHsgbmFtZTogJ3JlamVjdHMgYSBsYXRlciBsZXR0ZXInLCBpbnB1dDogJzEyM2EnLCBvdXRwdXQ6ICcxMjMnIH0sXG4gICAgICAgIHsgbmFtZTogJ3JlamVjdHMgYSBpbnNlcnRlZCBsZXR0ZXInLCBpbnB1dDogJzFhfDIzJywgb3V0cHV0OiAnMXwyMycgfSxcbiAgICAgICAgeyBuYW1lOiAncmVqZWN0cyBhIGJ1bmNoIG9mIGJhZCBjaGFyYWN0ZXJzIGF0IG9uY2UnLCBpbnB1dDogJzBYMGUyOC41eVgyWFguMzdwJywgb3V0cHV0OiAnMjguNTInIH0sXG4gICAgICAgIHsgbmFtZTogJ2FjY2VwdHMgYW4gaW5zZXJ0ZWQgZGVjaW1hbCBwb2ludCcsIGlucHV0OiAnMTIufDM0Jywgb3V0cHV0OiAnMTIufDM0JyB9LFxuICAgICAgICB7IG5hbWU6ICdhY2NlcHRzIGEgZGVjaW1hbCBwb2ludCBpbnNlcnRlZCBsZWZ0IG9mIHRoZSBmaXJzdCBkaWdpdCcsIGlucHV0OiAnLnwxMjM0Jywgb3V0cHV0OiAnLnwxMicgfSxcbiAgICAgICAgeyBuYW1lOiAnYWNjZXB0cyBhIGRlY2ltYWwgcG9pbnQgaW5zZXJ0ZWQganVzdCByaWdodCBvZiB0aGUgZmlyc3QgZGlnaXQnLCBpbnB1dDogJzEufDIzNCcsIG91dHB1dDogJzEufDIzJyB9LFxuICAgICAgICB7IG5hbWU6ICdyZWplY3RzIGRlY2ltYWwgcG9pbnQgaW5zZXJ0ZWQgYmVmb3JlIGFuIGV4aXN0aW5nIG9uZScsIGlucHV0OiAnMTIufDM0LjU2Jywgb3V0cHV0OiAnMTJ8MzQuNTYnIH0sXG4gICAgICAgIHsgbmFtZTogJ3JlamVjdHMgZGVjaW1hbCBwb2ludCBpbnNlcnRlZCBhZnRlciBhbiBleGlzdGluZyBvbmUnLCBpbnB1dDogJzEyMzQuNS58NicsIG91dHB1dDogJzEyMzQuNXw2JyB9LFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogJ3JlamVjdHMgZGVjaW1hbCBwb2ludCBpbnNlcnRlZCBiZWZvcmUgbXVsdGlwbGUgb3RoZXJzLCBhbmQgdGhlIHJpZ2h0bW9zdCBleGNlc3Mgb25lcyAobGF0dGVyIGNhblxcJ3QgaGFwcGVuPyknLFxuICAgICAgICAgIGlucHV0OiAnMTIufDM0LjUuLjYnLCBvdXRwdXQ6ICcxMnwzNC41NidcbiAgICAgICAgfSxcbiAgICAgICAgeyBuYW1lOiAnYWNjZXB0cyBhbiBpbnNlcnRlZCBudW1iZXInLCBpbnB1dDogJzEyMzQwfDU2NzgnLCBvdXRwdXQ6ICcxMjM0MHw1Njc4JyB9XG4gICAgICBdO1xuXG4gICAgICBmb3IgKGNvbnN0IHRlc3Qgb2YgdGVzdHMpIHtcbiAgICAgICAgaXQodGVzdC5uYW1lLCAoKSA9PiB7XG4gICAgICAgICAgZXZlbnQudGFyZ2V0LnZhbHVlID0gdGVzdC5pbnB1dC5yZXBsYWNlKCd8JywgJycpO1xuICAgICAgICAgIGV2ZW50LnRhcmdldC5zZWxlY3Rpb25TdGFydCA9IGV2ZW50LnRhcmdldC5zZWxlY3Rpb25FbmQgPSBnZXRDdXJzb3JQb3NpdGlvbkluKHRlc3QuaW5wdXQpO1xuXG4gICAgICAgICAgY2xhc3NVbmRlclRlc3Qub25Eb2xsYXJzSW5wdXQoZXZlbnQpO1xuXG4gICAgICAgICAgZXhwZWN0KGV2ZW50LnRhcmdldC52YWx1ZSkudG9FcXVhbCh0ZXN0Lm91dHB1dC5yZXBsYWNlKCd8JywgJycpKTtcbiAgICAgICAgICBleHBlY3QoZXZlbnQudGFyZ2V0LnNlbGVjdGlvblN0YXJ0KS50b0VxdWFsKGdldEN1cnNvclBvc2l0aW9uSW4odGVzdC5vdXRwdXQpKTtcbiAgICAgICAgICBleHBlY3QoZXZlbnQudGFyZ2V0LnNlbGVjdGlvbkVuZCkudG9FcXVhbChldmVudC50YXJnZXQuc2VsZWN0aW9uU3RhcnQpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG4iXX0=
