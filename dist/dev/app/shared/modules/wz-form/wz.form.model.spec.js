"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wz_form_model_1 = require("./wz.form.model");
var forms_1 = require("@angular/forms");
var InputTypes = {
    number: { name: 'control', type: 'number', value: '', min: '1', max: '10' },
    generic: { name: 'control', type: 'text', value: '', min: '5', max: '10' },
};
function main() {
    var fb = new forms_1.FormBuilder();
    describe('Form Model', function () {
        describe('validators', function () {
            var tests = [
                {
                    validation: 'GREATER_THAN',
                    type: InputTypes.number,
                    cases: [
                        { case: '0', validationResult: 'fail', error: 'tooLow' },
                        { case: '-1', validationResult: 'fail', error: 'tooLow' },
                        { case: '0.999999', validationResult: 'fail', error: 'tooLow' },
                        { case: '1.000001', validationResult: 'pass', error: 'tooLow' },
                        { case: '100', validationResult: 'pass', error: 'tooLow' }
                    ]
                },
                {
                    validation: 'LESS_THAN',
                    type: InputTypes.number,
                    cases: [
                        { case: '11', validationResult: 'fail', error: 'tooHigh' },
                        { case: '9', validationResult: 'pass', error: 'tooHigh' },
                    ]
                },
                {
                    validation: 'BETWEEN',
                    type: InputTypes.number,
                    cases: [
                        { case: '10', validationResult: 'pass', error: 'tooHigh' },
                        { case: '1', validationResult: 'pass', error: 'tooLow' },
                        { case: '11', validationResult: 'fail', error: 'tooHigh' },
                        { case: '0', validationResult: 'fail', error: 'tooLow' },
                    ]
                },
                {
                    validation: 'REQUIRED',
                    type: InputTypes.generic,
                    cases: [
                        { case: null, validationResult: 'fail', error: 'required' },
                        { case: 'value', validationResult: 'pass', error: 'required' },
                        { case: ' ', validationResult: 'fail', error: 'pattern' },
                        { case: '     \n', validationResult: 'fail', error: 'pattern' },
                        { case: '\n\n\n\n', validationResult: 'fail', error: 'pattern' },
                        { case: '   wow\n', validationResult: 'pass', error: 'required' },
                    ]
                },
                {
                    validation: 'EMAIL',
                    type: InputTypes.generic,
                    cases: [
                        { case: 'r@f.o', validationResult: 'fail', error: 'pattern' },
                        { case: 'r@@', validationResult: 'fail', error: 'minlength' },
                        { case: 'r@@', validationResult: 'fail', error: 'pattern' },
                        { case: 'ross.edfort@@wazeedigital.com', validationResult: 'fail', error: 'pattern' },
                        { case: 'ross.edfort@wazeedigital.com', validationResult: 'pass', error: 'minlength' },
                        { case: 'ross.edfort@wazeedigital.com', validationResult: 'pass', error: 'pattern' },
                        { case: 'ross.edfort@wazeedigital.com', validationResult: 'pass', error: 'required' },
                        { case: 'ross.edfort+1@wazeedigital.com', validationResult: 'pass', error: 'pattern' }
                    ]
                },
                {
                    validation: 'PASSWORD',
                    type: InputTypes.generic,
                    cases: [
                        { case: 'a', validationResult: 'fail', error: 'minlength' },
                        { case: null, validationResult: 'fail', error: 'required' },
                        { case: 'abc123!@#', validationResult: 'pass', error: 'minlength' },
                        { case: 'abc123!@#', validationResult: 'pass', error: 'required' }
                    ]
                },
                {
                    validation: 'MIN_LENGTH',
                    type: InputTypes.generic,
                    cases: [
                        { case: 'a', validationResult: 'fail', error: 'minlength' },
                        { case: 'abcdef', validationResult: 'pass', error: 'minlength' },
                    ]
                },
                {
                    validation: 'MAX_LENGTH',
                    type: InputTypes.generic,
                    cases: [
                        { case: 'abcdef', validationResult: 'pass', error: 'maxlength' },
                        { case: 'abcdefghijklmnop', validationResult: 'fail', error: 'maxlength' },
                    ]
                }
            ];
            tests.forEach(function (group) {
                var form;
                var modelUnderTest = new wz_form_model_1.FormModel();
                beforeEach(function () {
                    var config = Object.assign(group.type, { validation: group.validation });
                    form = fb.group(modelUnderTest.create([config]));
                });
                describe("" + group.validation, function () {
                    group.cases.forEach(function (test) {
                        it((test.validationResult === 'pass' ? 'doesn\'t have' : 'has') + " a \"" + test.error + "\" error for \"" + test.case + "\"", function () {
                            form.controls['control'].setValue(test.case);
                            if (test.validationResult === 'pass') {
                                expect(form.controls['control'].errors).toBeNull();
                            }
                            else {
                                expect(form.controls['control'].errors.hasOwnProperty(test.error)).toBe(true);
                            }
                        });
                    });
                });
            });
        });
    });
}
exports.main = main;
;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kdWxlcy93ei1mb3JtL3d6LmZvcm0ubW9kZWwuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlEQUE0QztBQUM1Qyx3Q0FBb0U7QUFJcEUsSUFBTSxVQUFVLEdBQUc7SUFDakIsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFO0lBQzNFLE9BQU8sRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRTtDQUMzRSxDQUFDO0FBY0Y7SUFDRSxJQUFNLEVBQUUsR0FBRyxJQUFJLG1CQUFXLEVBQUUsQ0FBQztJQUM3QixRQUFRLENBQUMsWUFBWSxFQUFFO1FBQ3JCLFFBQVEsQ0FBQyxZQUFZLEVBQUU7WUFDckIsSUFBTSxLQUFLLEdBQWdCO2dCQUN6QjtvQkFDRSxVQUFVLEVBQUUsY0FBYztvQkFDMUIsSUFBSSxFQUFFLFVBQVUsQ0FBQyxNQUFNO29CQUN2QixLQUFLLEVBQUU7d0JBQ0wsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFO3dCQUN4RCxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUU7d0JBQ3pELEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRTt3QkFDL0QsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFO3dCQUMvRCxF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QyxDQUFDO2dDQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDOzRCQUNoRixDQUFDO3dCQUNILENBQUMsQ0FBQyxDQUFDO29CQUNMLENBQUMsQ0FBQyxDQUFDO2dCQUNMLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQWpIRCxvQkFpSEM7QUFBQSxDQUFDIiwiZmlsZSI6ImFwcC9zaGFyZWQvbW9kdWxlcy93ei1mb3JtL3d6LmZvcm0ubW9kZWwuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZvcm1Nb2RlbCB9IGZyb20gJy4vd3ouZm9ybS5tb2RlbCc7XG5pbXBvcnQgeyBGb3JtQnVpbGRlciwgRm9ybUdyb3VwLCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG50eXBlIFZhbGlkYXRpb25FcnJvciA9ICdyZXF1aXJlZCcgfCAnbWlubGVuZ3RoJyB8ICdwYXR0ZXJuJyB8ICd0b29Mb3cnIHwgJ3Rvb0hpZ2gnIHwgJ21heGxlbmd0aCc7XG5cbmNvbnN0IElucHV0VHlwZXMgPSB7XG4gIG51bWJlcjogeyBuYW1lOiAnY29udHJvbCcsIHR5cGU6ICdudW1iZXInLCB2YWx1ZTogJycsIG1pbjogJzEnLCBtYXg6ICcxMCcgfSxcbiAgZ2VuZXJpYzogeyBuYW1lOiAnY29udHJvbCcsIHR5cGU6ICd0ZXh0JywgdmFsdWU6ICcnLCBtaW46ICc1JywgbWF4OiAnMTAnIH0sXG59O1xuXG5pbnRlcmZhY2UgVGVzdENhc2Uge1xuICBjYXNlOiBzdHJpbmc7XG4gIHZhbGlkYXRpb25SZXN1bHQ6ICdwYXNzJyB8ICdmYWlsJztcbiAgZXJyb3I6IFZhbGlkYXRpb25FcnJvcjtcbn1cblxuaW50ZXJmYWNlIFRlc3RDYXNlcyB7XG4gIHZhbGlkYXRpb246IHN0cmluZztcbiAgdHlwZTogT2JqZWN0O1xuICBjYXNlczogQXJyYXk8VGVzdENhc2U+O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcbiAgY29uc3QgZmIgPSBuZXcgRm9ybUJ1aWxkZXIoKTtcbiAgZGVzY3JpYmUoJ0Zvcm0gTW9kZWwnLCAoKSA9PiB7XG4gICAgZGVzY3JpYmUoJ3ZhbGlkYXRvcnMnLCAoKSA9PiB7XG4gICAgICBjb25zdCB0ZXN0czogVGVzdENhc2VzW10gPSBbXG4gICAgICAgIHtcbiAgICAgICAgICB2YWxpZGF0aW9uOiAnR1JFQVRFUl9USEFOJyxcbiAgICAgICAgICB0eXBlOiBJbnB1dFR5cGVzLm51bWJlcixcbiAgICAgICAgICBjYXNlczogW1xuICAgICAgICAgICAgeyBjYXNlOiAnMCcsIHZhbGlkYXRpb25SZXN1bHQ6ICdmYWlsJywgZXJyb3I6ICd0b29Mb3cnIH0sXG4gICAgICAgICAgICB7IGNhc2U6ICctMScsIHZhbGlkYXRpb25SZXN1bHQ6ICdmYWlsJywgZXJyb3I6ICd0b29Mb3cnIH0sXG4gICAgICAgICAgICB7IGNhc2U6ICcwLjk5OTk5OScsIHZhbGlkYXRpb25SZXN1bHQ6ICdmYWlsJywgZXJyb3I6ICd0b29Mb3cnIH0sXG4gICAgICAgICAgICB7IGNhc2U6ICcxLjAwMDAwMScsIHZhbGlkYXRpb25SZXN1bHQ6ICdwYXNzJywgZXJyb3I6ICd0b29Mb3cnIH0sXG4gICAgICAgICAgICB7IGNhc2U6ICcxMDAnLCB2YWxpZGF0aW9uUmVzdWx0OiAncGFzcycsIGVycm9yOiAndG9vTG93JyB9XG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdmFsaWRhdGlvbjogJ0xFU1NfVEhBTicsXG4gICAgICAgICAgdHlwZTogSW5wdXRUeXBlcy5udW1iZXIsXG4gICAgICAgICAgY2FzZXM6IFtcbiAgICAgICAgICAgIHsgY2FzZTogJzExJywgdmFsaWRhdGlvblJlc3VsdDogJ2ZhaWwnLCBlcnJvcjogJ3Rvb0hpZ2gnIH0sXG4gICAgICAgICAgICB7IGNhc2U6ICc5JywgdmFsaWRhdGlvblJlc3VsdDogJ3Bhc3MnLCBlcnJvcjogJ3Rvb0hpZ2gnIH0sXG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdmFsaWRhdGlvbjogJ0JFVFdFRU4nLFxuICAgICAgICAgIHR5cGU6IElucHV0VHlwZXMubnVtYmVyLFxuICAgICAgICAgIGNhc2VzOiBbXG4gICAgICAgICAgICB7IGNhc2U6ICcxMCcsIHZhbGlkYXRpb25SZXN1bHQ6ICdwYXNzJywgZXJyb3I6ICd0b29IaWdoJyB9LFxuICAgICAgICAgICAgeyBjYXNlOiAnMScsIHZhbGlkYXRpb25SZXN1bHQ6ICdwYXNzJywgZXJyb3I6ICd0b29Mb3cnIH0sXG4gICAgICAgICAgICB7IGNhc2U6ICcxMScsIHZhbGlkYXRpb25SZXN1bHQ6ICdmYWlsJywgZXJyb3I6ICd0b29IaWdoJyB9LFxuICAgICAgICAgICAgeyBjYXNlOiAnMCcsIHZhbGlkYXRpb25SZXN1bHQ6ICdmYWlsJywgZXJyb3I6ICd0b29Mb3cnIH0sXG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdmFsaWRhdGlvbjogJ1JFUVVJUkVEJyxcbiAgICAgICAgICB0eXBlOiBJbnB1dFR5cGVzLmdlbmVyaWMsXG4gICAgICAgICAgY2FzZXM6IFtcbiAgICAgICAgICAgIHsgY2FzZTogbnVsbCwgdmFsaWRhdGlvblJlc3VsdDogJ2ZhaWwnLCBlcnJvcjogJ3JlcXVpcmVkJyB9LFxuICAgICAgICAgICAgeyBjYXNlOiAndmFsdWUnLCB2YWxpZGF0aW9uUmVzdWx0OiAncGFzcycsIGVycm9yOiAncmVxdWlyZWQnIH0sXG4gICAgICAgICAgICB7IGNhc2U6ICcgJywgdmFsaWRhdGlvblJlc3VsdDogJ2ZhaWwnLCBlcnJvcjogJ3BhdHRlcm4nIH0sXG4gICAgICAgICAgICB7IGNhc2U6ICcgICAgIFxcbicsIHZhbGlkYXRpb25SZXN1bHQ6ICdmYWlsJywgZXJyb3I6ICdwYXR0ZXJuJyB9LFxuICAgICAgICAgICAgeyBjYXNlOiAnXFxuXFxuXFxuXFxuJywgdmFsaWRhdGlvblJlc3VsdDogJ2ZhaWwnLCBlcnJvcjogJ3BhdHRlcm4nIH0sXG4gICAgICAgICAgICB7IGNhc2U6ICcgICB3b3dcXG4nLCB2YWxpZGF0aW9uUmVzdWx0OiAncGFzcycsIGVycm9yOiAncmVxdWlyZWQnIH0sXG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdmFsaWRhdGlvbjogJ0VNQUlMJyxcbiAgICAgICAgICB0eXBlOiBJbnB1dFR5cGVzLmdlbmVyaWMsXG4gICAgICAgICAgY2FzZXM6IFtcbiAgICAgICAgICAgIHsgY2FzZTogJ3JAZi5vJywgdmFsaWRhdGlvblJlc3VsdDogJ2ZhaWwnLCBlcnJvcjogJ3BhdHRlcm4nIH0sXG4gICAgICAgICAgICB7IGNhc2U6ICdyQEAnLCB2YWxpZGF0aW9uUmVzdWx0OiAnZmFpbCcsIGVycm9yOiAnbWlubGVuZ3RoJyB9LFxuICAgICAgICAgICAgeyBjYXNlOiAnckBAJywgdmFsaWRhdGlvblJlc3VsdDogJ2ZhaWwnLCBlcnJvcjogJ3BhdHRlcm4nIH0sXG4gICAgICAgICAgICB7IGNhc2U6ICdyb3NzLmVkZm9ydEBAd2F6ZWVkaWdpdGFsLmNvbScsIHZhbGlkYXRpb25SZXN1bHQ6ICdmYWlsJywgZXJyb3I6ICdwYXR0ZXJuJyB9LFxuICAgICAgICAgICAgeyBjYXNlOiAncm9zcy5lZGZvcnRAd2F6ZWVkaWdpdGFsLmNvbScsIHZhbGlkYXRpb25SZXN1bHQ6ICdwYXNzJywgZXJyb3I6ICdtaW5sZW5ndGgnIH0sXG4gICAgICAgICAgICB7IGNhc2U6ICdyb3NzLmVkZm9ydEB3YXplZWRpZ2l0YWwuY29tJywgdmFsaWRhdGlvblJlc3VsdDogJ3Bhc3MnLCBlcnJvcjogJ3BhdHRlcm4nIH0sXG4gICAgICAgICAgICB7IGNhc2U6ICdyb3NzLmVkZm9ydEB3YXplZWRpZ2l0YWwuY29tJywgdmFsaWRhdGlvblJlc3VsdDogJ3Bhc3MnLCBlcnJvcjogJ3JlcXVpcmVkJyB9LFxuICAgICAgICAgICAgeyBjYXNlOiAncm9zcy5lZGZvcnQrMUB3YXplZWRpZ2l0YWwuY29tJywgdmFsaWRhdGlvblJlc3VsdDogJ3Bhc3MnLCBlcnJvcjogJ3BhdHRlcm4nIH1cbiAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB2YWxpZGF0aW9uOiAnUEFTU1dPUkQnLFxuICAgICAgICAgIHR5cGU6IElucHV0VHlwZXMuZ2VuZXJpYyxcbiAgICAgICAgICBjYXNlczogW1xuICAgICAgICAgICAgeyBjYXNlOiAnYScsIHZhbGlkYXRpb25SZXN1bHQ6ICdmYWlsJywgZXJyb3I6ICdtaW5sZW5ndGgnIH0sXG4gICAgICAgICAgICB7IGNhc2U6IG51bGwsIHZhbGlkYXRpb25SZXN1bHQ6ICdmYWlsJywgZXJyb3I6ICdyZXF1aXJlZCcgfSxcbiAgICAgICAgICAgIHsgY2FzZTogJ2FiYzEyMyFAIycsIHZhbGlkYXRpb25SZXN1bHQ6ICdwYXNzJywgZXJyb3I6ICdtaW5sZW5ndGgnIH0sXG4gICAgICAgICAgICB7IGNhc2U6ICdhYmMxMjMhQCMnLCB2YWxpZGF0aW9uUmVzdWx0OiAncGFzcycsIGVycm9yOiAncmVxdWlyZWQnIH1cbiAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB2YWxpZGF0aW9uOiAnTUlOX0xFTkdUSCcsXG4gICAgICAgICAgdHlwZTogSW5wdXRUeXBlcy5nZW5lcmljLFxuICAgICAgICAgIGNhc2VzOiBbXG4gICAgICAgICAgICB7IGNhc2U6ICdhJywgdmFsaWRhdGlvblJlc3VsdDogJ2ZhaWwnLCBlcnJvcjogJ21pbmxlbmd0aCcgfSxcbiAgICAgICAgICAgIHsgY2FzZTogJ2FiY2RlZicsIHZhbGlkYXRpb25SZXN1bHQ6ICdwYXNzJywgZXJyb3I6ICdtaW5sZW5ndGgnIH0sXG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdmFsaWRhdGlvbjogJ01BWF9MRU5HVEgnLFxuICAgICAgICAgIHR5cGU6IElucHV0VHlwZXMuZ2VuZXJpYyxcbiAgICAgICAgICBjYXNlczogW1xuICAgICAgICAgICAgeyBjYXNlOiAnYWJjZGVmJywgdmFsaWRhdGlvblJlc3VsdDogJ3Bhc3MnLCBlcnJvcjogJ21heGxlbmd0aCcgfSxcbiAgICAgICAgICAgIHsgY2FzZTogJ2FiY2RlZmdoaWprbG1ub3AnLCB2YWxpZGF0aW9uUmVzdWx0OiAnZmFpbCcsIGVycm9yOiAnbWF4bGVuZ3RoJyB9LFxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgXTtcblxuICAgICAgdGVzdHMuZm9yRWFjaCgoZ3JvdXA6IFRlc3RDYXNlcykgPT4ge1xuICAgICAgICBsZXQgZm9ybTogRm9ybUdyb3VwO1xuICAgICAgICBsZXQgbW9kZWxVbmRlclRlc3Q6IEZvcm1Nb2RlbCA9IG5ldyBGb3JtTW9kZWwoKTtcblxuICAgICAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgICBsZXQgY29uZmlnOiBhbnkgPSBPYmplY3QuYXNzaWduKGdyb3VwLnR5cGUsIHsgdmFsaWRhdGlvbjogZ3JvdXAudmFsaWRhdGlvbiB9KTtcbiAgICAgICAgICBmb3JtID0gZmIuZ3JvdXAobW9kZWxVbmRlclRlc3QuY3JlYXRlKFtjb25maWddKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRlc2NyaWJlKGAke2dyb3VwLnZhbGlkYXRpb259YCwgKCkgPT4ge1xuICAgICAgICAgIGdyb3VwLmNhc2VzLmZvckVhY2goKHRlc3Q6IFRlc3RDYXNlKSA9PiB7XG4gICAgICAgICAgICBpdChgJHt0ZXN0LnZhbGlkYXRpb25SZXN1bHQgPT09ICdwYXNzJyA/ICdkb2VzblxcJ3QgaGF2ZScgOiAnaGFzJ30gYSBcIiR7dGVzdC5lcnJvcn1cIiBlcnJvciBmb3IgXCIke3Rlc3QuY2FzZX1cImAsICgpID0+IHtcbiAgICAgICAgICAgICAgZm9ybS5jb250cm9sc1snY29udHJvbCddLnNldFZhbHVlKHRlc3QuY2FzZSk7XG5cbiAgICAgICAgICAgICAgaWYgKHRlc3QudmFsaWRhdGlvblJlc3VsdCA9PT0gJ3Bhc3MnKSB7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGZvcm0uY29udHJvbHNbJ2NvbnRyb2wnXS5lcnJvcnMpLnRvQmVOdWxsKCk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGZvcm0uY29udHJvbHNbJ2NvbnRyb2wnXS5lcnJvcnMuaGFzT3duUHJvcGVydHkodGVzdC5lcnJvcikpLnRvQmUodHJ1ZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn07XG5cbiJdfQ==
