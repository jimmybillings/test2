import { WzInputSuggestionsComponent } from './wz-input-suggestions.component';
import { MockApiService, mockApiMatchers } from '../../../../mocks/mock-api.service';
import { FormControl } from '@angular/forms';
import { Api } from '../../../../interfaces/api.interface';

export function main() {
  describe('Wz Input Suggestions Component', () => {
    let componentUnderTest: WzInputSuggestionsComponent, mockApi: MockApiService, mockRenderer: any, mockDetector: any;
    mockRenderer = {
      listenGlobal:
        jasmine.createSpy('listenGlobal').and.callFake((a: any, b: any, c: Function) => {
          c(); return () => { return true; };
        })
    };
    mockDetector = { markForCheck: jasmine.createSpy('markForCheck') };
    beforeEach(() => {
      jasmine.addMatchers(mockApiMatchers);
      mockApi = new MockApiService();
      componentUnderTest = new WzInputSuggestionsComponent(mockRenderer, mockApi.injector, mockDetector);
      componentUnderTest.fControl = new FormControl('query');
      componentUnderTest.rawField = {
        'service': 'assets',
        'endPoint': 'search/thesaurusTerms',
        'queryParams': 'maxTerms, 10',
        'name': 'name',
        'label': 'COLLECTION.FORM.COLLECTION_NAME_LABEL',
        'type': 'suggestions',
        'value': '',
        'validation': 'REQUIRED'
      };

    });

    describe('ngOnInit()', () => {
      it('listens for body clicks to close suggestions', () => {
        spyOn(componentUnderTest, 'closeSuggestions');
        componentUnderTest.ngOnInit();
        expect(mockRenderer.listenGlobal).toHaveBeenCalledWith('body', 'click', jasmine.any(Function));
      });

      it('listens for form field value changes', () => {
        spyOn(componentUnderTest, 'suggestionChangeListener');
        componentUnderTest.ngOnInit();
        expect(componentUnderTest.suggestionChangeListener).toHaveBeenCalled();
      });
    });

    describe('ngOnDestroy()', () => {
      it('correctly destroys any listeners and subscriptions', () => {
        spyOn(componentUnderTest, 'destroySubscription').and.callThrough();
        componentUnderTest.ngOnInit();
        componentUnderTest.ngOnDestroy();
        expect(componentUnderTest.destroySubscription).toHaveBeenCalled();
      });

      it('Does not try to detroy any subscription if none exist', () => {
        componentUnderTest.fControl = null;
        spyOn(componentUnderTest, 'destroySubscription').and.callThrough();
        componentUnderTest.ngOnInit();
        componentUnderTest.ngOnDestroy();
        expect(componentUnderTest.destroySubscription).toHaveBeenCalled();
      });
    });

    describe('suggestionChangeListener()', () => {
      it('Does nothing if the value of the user input is the same as the active suggestion', () => {
        componentUnderTest.suggestionChangeListener();
        componentUnderTest.activeSuggestion = 'cat';
        componentUnderTest.fControl.setValue('cat');
        expect(componentUnderTest.activeSuggestion).toEqual('cat');
      });

      it('close suggestion if user input is not greater than one character', () => {
        componentUnderTest.suggestionChangeListener();
        spyOn(componentUnderTest, 'closeSuggestions');
        componentUnderTest.activeSuggestion = 'cat';
        componentUnderTest.fControl.setValue('c');
        expect(componentUnderTest.activeSuggestion).toEqual(null);
        expect(componentUnderTest.closeSuggestions).toHaveBeenCalled();
      });

      it('handles flat arrays', () => {
        mockApi.getResponse = { list: ['test', 'testing', 'testing 123'] };
        componentUnderTest.suggestionChangeListener();
        componentUnderTest.activeSuggestion = 'cat';
        componentUnderTest.fControl.setValue('dog');
        expect(componentUnderTest.suggestions).toEqual(['dog', 'test', 'testing', 'testing 123']);
      });

      it('handles collections', () => {
        mockApi.getResponse = { items: [{ name: 'test' }, { name: 'testing' }, { name: 'testing 123' }] };
        componentUnderTest.suggestionChangeListener();
        componentUnderTest.activeSuggestion = 'cat';
        componentUnderTest.fControl.setValue('dog');
        expect(componentUnderTest.suggestions).toEqual(['dog', 'test', 'testing', 'testing 123']);
      });

      it('Do not hide suggestions that match the user search if it\s being used for collections', () => {
        mockApi.getResponse = { list: ['test', 'testing', 'testing 123'] };
        componentUnderTest.rawField.endPoint = 'collection/search';
        componentUnderTest.suggestionChangeListener();
        componentUnderTest.activeSuggestion = 'cat';
        componentUnderTest.fControl.setValue('dog');
        expect(componentUnderTest.suggestions).toEqual(['dog', 'test', 'testing', 'testing 123']);
      });

      it('Does not initialize the subscription unless the form control has been initialized first', () => {
        componentUnderTest.fControl = null;
        componentUnderTest.suggestionChangeListener();
      });


      describe('Calls api with correct params', () => {
        it('for assets', () => {
          componentUnderTest.suggestionChangeListener();
          componentUnderTest.activeSuggestion = 'cat';
          componentUnderTest.fControl.setValue('dog');
          expect(componentUnderTest.activeSuggestion).toEqual(null);
          expect(mockApi.get).toHaveBeenCalledWith(Api.Assets, componentUnderTest.rawField.endPoint,
            { parameters: Object.assign({}, { 'maxTerms': '10' }, { text: 'dog' }, { q: 'dog' }) });
        });

        it('for identities', () => {
          componentUnderTest.rawField = {
            'service': 'identities',
            'endPoint': 'user/searchFields',
            'queryParams': 'fields, emailAddress, values',
            'name': 'emailAddress',
            'label': 'emailAddress',
            'type': 'suggestions',
            'value': '',
            'validation': 'REQUIRED'
          };
          componentUnderTest.suggestionChangeListener();
          componentUnderTest.activeSuggestion = 'cat';
          componentUnderTest.fControl.setValue('dog');
          expect(componentUnderTest.activeSuggestion).toEqual(null);
          expect(mockApi.get).toHaveBeenCalledWith(Api.Identities, componentUnderTest.rawField.endPoint,
            { parameters: Object.assign({}, { fields: 'emailAddress', values: 'dog' }) });
        });

        it('no service, defaults to empty observable', () => {
          componentUnderTest.rawField = { service: 'nothing', endPoint: 'blah' };
          componentUnderTest.suggestionChangeListener();
          componentUnderTest.activeSuggestion = 'cat';
          componentUnderTest.fControl.setValue('dog');
          expect(componentUnderTest.activeSuggestion).toEqual(null);
          expect(mockApi.get).not.toHaveBeenCalled();
        });
      });
    });

    describe('selectSuggestion()', () => {
      it('set\'s the field value to the selected suggestion', () => {
        spyOn(componentUnderTest.fControl, 'setValue');
        componentUnderTest.selectSuggestion('dogs');
        expect(componentUnderTest.fControl.setValue).toHaveBeenCalledWith('dogs', { emitEvent: false });
      });

      it('emits an output event with selected suggestion', () => {
        spyOn(componentUnderTest.newSuggestion, 'emit');
        componentUnderTest.activeSuggestion = 'dogs';
        componentUnderTest.selectSuggestion('dogs');
        expect(componentUnderTest.newSuggestion.emit).toHaveBeenCalledWith('dogs');
      });

      it('closes the suggestions once one has been selected', () => {
        spyOn(componentUnderTest, 'closeSuggestions');
        componentUnderTest.selectSuggestion('dogs');
        expect(componentUnderTest.closeSuggestions).toHaveBeenCalled();
      });
    });

    describe('parseSuggestion', () => {
      it('removes any parentheses and wraps any words that match the user input with <strong> tags', () => {
        mockApi.getResponse = { list: ['test', 'testing', 'testing 123'] };
        componentUnderTest.rawField.endPoint = 'collection/search';
        componentUnderTest.suggestionChangeListener();
        componentUnderTest.activeSuggestion = 'cat';
        componentUnderTest.fControl.setValue('dog');
        expect(componentUnderTest.parseSuggestion('dog-(hugging)')).toEqual('<strong>dog</strong>-(hugging)');
      });
    });

    describe('inputKeyDown()', () => {
      describe('responds to users hitting the tab button', () => {
        it('using event.which', () => {
          spyOn(componentUnderTest, 'closeSuggestions');
          let eve: any = { which: 9 };
          componentUnderTest.inputKeyDown(eve);
          expect(componentUnderTest.closeSuggestions).toHaveBeenCalled();
        });

        it('using event.keyCode', () => {
          spyOn(componentUnderTest, 'closeSuggestions');
          let eve: any = { keyCode: 9 };
          componentUnderTest.inputKeyDown(eve);
          expect(componentUnderTest.closeSuggestions).toHaveBeenCalled();
        });
      });

      describe('responds to user hitting the up arrow', () => {
        describe('using event.which', () => {
          it('Sets active suggestion to the first suggestion in the array if one has\'nt already been selected', () => {
            componentUnderTest.suggestions = ['test', 'testing', 'test 123'];
            componentUnderTest.activeSuggestion = 'tes';
            let eve: any = { which: 38, preventDefault: jasmine.createSpy('preventDefault') };
            componentUnderTest.inputKeyDown(eve);
            expect(componentUnderTest.activeSuggestion).toEqual('test');
            expect(eve.preventDefault).toHaveBeenCalled();
          });

          it('There are more suggestions above the current suggestion so select the next', () => {
            componentUnderTest.suggestions = ['test', 'testing', 'test 123'];
            componentUnderTest.activeSuggestion = 'testing';
            let eve: any = { which: 38, preventDefault: jasmine.createSpy('preventDefault') };
            componentUnderTest.inputKeyDown(eve);
            expect(componentUnderTest.activeSuggestion).toEqual('test');
            expect(eve.preventDefault).toHaveBeenCalled();
          });

          it('There are no more suggestions above the current suggestion so loop back around and select the last', () => {
            componentUnderTest.suggestions = ['test', 'testing', 'test 123'];
            componentUnderTest.activeSuggestion = 'test';
            let eve: any = { which: 38, preventDefault: jasmine.createSpy('preventDefault') };
            componentUnderTest.inputKeyDown(eve);
            expect(componentUnderTest.activeSuggestion).toEqual('test 123');
            expect(eve.preventDefault).toHaveBeenCalled();
          });
        });

        describe('using event.keyCode', () => {
          it('Sets active suggestion to the first suggestion in the array if one has\'nt already been selected', () => {
            componentUnderTest.suggestions = ['test', 'testing', 'test 123'];
            componentUnderTest.activeSuggestion = 'tes';
            let eve: any = { keyCode: 38, preventDefault: jasmine.createSpy('preventDefault') };
            componentUnderTest.inputKeyDown(eve);
            expect(componentUnderTest.activeSuggestion).toEqual('test');
            expect(eve.preventDefault).toHaveBeenCalled();
          });

          it('There are more suggestions above the current suggestion so select the next', () => {
            componentUnderTest.suggestions = ['test', 'testing', 'test 123'];
            componentUnderTest.activeSuggestion = 'testing';
            let eve: any = { keyCode: 38, preventDefault: jasmine.createSpy('preventDefault') };
            componentUnderTest.inputKeyDown(eve);
            expect(componentUnderTest.activeSuggestion).toEqual('test');
            expect(eve.preventDefault).toHaveBeenCalled();
          });

          it('There are no more suggestions above the current suggestion so loop back around and select the last', () => {
            componentUnderTest.suggestions = ['test', 'testing', 'test 123'];
            componentUnderTest.activeSuggestion = 'test';
            let eve: any = { keyCode: 38, preventDefault: jasmine.createSpy('preventDefault') };
            componentUnderTest.inputKeyDown(eve);
            expect(componentUnderTest.activeSuggestion).toEqual('test 123');
            expect(eve.preventDefault).toHaveBeenCalled();
          });
        });

      });

      describe('responds to user hitting the down arrow', () => {
        describe('using event.which', () => {
          it('Sets active suggestion to the second suggestion in the array if one has\'nt already been selected', () => {
            componentUnderTest.suggestions = ['test', 'testing', 'test 123'];
            componentUnderTest.activeSuggestion = 'tes';
            let eve: any = { which: 40, preventDefault: jasmine.createSpy('preventDefault') };
            componentUnderTest.inputKeyDown(eve);
            expect(componentUnderTest.activeSuggestion).toEqual('testing');
            expect(eve.preventDefault).toHaveBeenCalled();
          });

          it('There are more suggestions below the current suggestion so select the next', () => {
            componentUnderTest.suggestions = ['test', 'testing', 'test 123'];
            componentUnderTest.activeSuggestion = 'testing';
            let eve: any = { which: 40, preventDefault: jasmine.createSpy('preventDefault') };
            componentUnderTest.inputKeyDown(eve);
            expect(componentUnderTest.activeSuggestion).toEqual('test 123');
            expect(eve.preventDefault).toHaveBeenCalled();
          });

          it('There are no more suggestions below the current suggestion so loop back around and select the first', () => {
            componentUnderTest.suggestions = ['test', 'testing', 'test 123'];
            componentUnderTest.activeSuggestion = 'test 123';
            let eve: any = { which: 40, preventDefault: jasmine.createSpy('preventDefault') };
            componentUnderTest.inputKeyDown(eve);
            expect(componentUnderTest.activeSuggestion).toEqual('test');
            expect(eve.preventDefault).toHaveBeenCalled();
          });
        });

        describe('using event.keyCode', () => {
          it('Sets active suggestion to the second suggestion in the array if one has\'nt already been selected', () => {
            componentUnderTest.suggestions = ['test', 'testing', 'test 123'];
            componentUnderTest.activeSuggestion = 'tes';
            let eve: any = { keyCode: 40, preventDefault: jasmine.createSpy('preventDefault') };
            componentUnderTest.inputKeyDown(eve);
            expect(componentUnderTest.activeSuggestion).toEqual('testing');
            expect(eve.preventDefault).toHaveBeenCalled();
          });

          it('There are more suggestions below the current suggestion so select the next', () => {
            componentUnderTest.suggestions = ['test', 'testing', 'test 123'];
            componentUnderTest.activeSuggestion = 'testing';
            let eve: any = { keyCode: 40, preventDefault: jasmine.createSpy('preventDefault') };
            componentUnderTest.inputKeyDown(eve);
            expect(componentUnderTest.activeSuggestion).toEqual('test 123');
            expect(eve.preventDefault).toHaveBeenCalled();
          });

          it('There are no more suggestions below the current suggestion so loop back around and select the first', () => {
            componentUnderTest.suggestions = ['test', 'testing', 'test 123'];
            componentUnderTest.activeSuggestion = 'test 123';
            let eve: any = { keyCode: 40, preventDefault: jasmine.createSpy('preventDefault') };
            componentUnderTest.inputKeyDown(eve);
            expect(componentUnderTest.activeSuggestion).toEqual('test');
            expect(eve.preventDefault).toHaveBeenCalled();
          });
        });

      });

      describe('responds to user hitting the enter key', () => {
        describe('using event.which', () => {
          it('Looks for an active collection, if it finds one it selects the suggestion for submit', () => {
            componentUnderTest.suggestions = ['test', 'testing', 'test 123'];
            componentUnderTest.activeSuggestion = 'testing';
            spyOn(componentUnderTest, 'selectSuggestion');
            let eve: any = { which: 10, preventDefault: jasmine.createSpy('preventDefault') };
            componentUnderTest.inputKeyDown(eve);
            expect(componentUnderTest.selectSuggestion).toHaveBeenCalledWith('testing');
            expect(eve.preventDefault).toHaveBeenCalled();
          });

          it('Looks for an active collection, if it finds one it selects the suggestion for submit', () => {
            componentUnderTest.suggestions = ['test', 'testing', 'test 123'];
            componentUnderTest.activeSuggestion = 'testing';
            spyOn(componentUnderTest, 'selectSuggestion');
            let eve: any = { which: 13, preventDefault: jasmine.createSpy('preventDefault') };
            componentUnderTest.inputKeyDown(eve);
            expect(componentUnderTest.selectSuggestion).toHaveBeenCalledWith('testing');
            expect(eve.preventDefault).toHaveBeenCalled();
          });

          it('If no active suggestion is currently set, assume user wants to search with the keyword they typed', () => {
            componentUnderTest.suggestions = ['test', 'testing', 'test 123'];
            componentUnderTest.activeSuggestion = null;
            spyOn(componentUnderTest.newSuggestion, 'emit');
            spyOn(componentUnderTest, 'closeSuggestions');
            let eve: any = { which: 13, preventDefault: jasmine.createSpy('preventDefault') };
            componentUnderTest.inputKeyDown(eve);
            expect(componentUnderTest.newSuggestion.emit).toHaveBeenCalled();
            expect(componentUnderTest.closeSuggestions).toHaveBeenCalled();
            expect(eve.preventDefault).toHaveBeenCalled();
          });

          it('If no active suggestion is currently set, assume user wants to search with the keyword they typed', () => {
            componentUnderTest.suggestions = ['test', 'testing', 'test 123'];
            componentUnderTest.activeSuggestion = null;
            spyOn(componentUnderTest.newSuggestion, 'emit');
            spyOn(componentUnderTest, 'closeSuggestions');
            let eve: any = { which: 10, preventDefault: jasmine.createSpy('preventDefault') };
            componentUnderTest.inputKeyDown(eve);
            expect(componentUnderTest.newSuggestion.emit).toHaveBeenCalled();
            expect(componentUnderTest.closeSuggestions).toHaveBeenCalled();
            expect(eve.preventDefault).toHaveBeenCalled();
          });

        });

        describe('using event.keyCode', () => {
          it('Looks for an active collection, if it finds one it selects the suggestion for submit', () => {
            componentUnderTest.suggestions = ['test', 'testing', 'test 123'];
            componentUnderTest.activeSuggestion = 'testing';
            spyOn(componentUnderTest, 'selectSuggestion');
            let eve: any = { keyCode: 10, preventDefault: jasmine.createSpy('preventDefault') };
            componentUnderTest.inputKeyDown(eve);
            expect(componentUnderTest.selectSuggestion).toHaveBeenCalledWith('testing');
            expect(eve.preventDefault).toHaveBeenCalled();
          });

          it('Looks for an active collection, if it finds one it selects the suggestion for submit', () => {
            componentUnderTest.suggestions = ['test', 'testing', 'test 123'];
            componentUnderTest.activeSuggestion = 'testing';
            spyOn(componentUnderTest, 'selectSuggestion');
            let eve: any = { keyCode: 13, preventDefault: jasmine.createSpy('preventDefault') };
            componentUnderTest.inputKeyDown(eve);
            expect(componentUnderTest.selectSuggestion).toHaveBeenCalledWith('testing');
            expect(eve.preventDefault).toHaveBeenCalled();
          });

          it('If no active suggestion is currently set, assume user wants to search with the keyword they typed', () => {
            componentUnderTest.suggestions = ['test', 'testing', 'test 123'];
            componentUnderTest.activeSuggestion = null;
            spyOn(componentUnderTest.newSuggestion, 'emit');
            spyOn(componentUnderTest, 'closeSuggestions');
            let eve: any = { keyCode: 13, preventDefault: jasmine.createSpy('preventDefault') };
            componentUnderTest.inputKeyDown(eve);
            expect(componentUnderTest.newSuggestion.emit).toHaveBeenCalled();
            expect(componentUnderTest.closeSuggestions).toHaveBeenCalled();
            expect(eve.preventDefault).toHaveBeenCalled();
          });

          it('If no active suggestion is currently set, assume user wants to search with the keyword they typed', () => {
            componentUnderTest.suggestions = ['test', 'testing', 'test 123'];
            componentUnderTest.activeSuggestion = null;
            spyOn(componentUnderTest.newSuggestion, 'emit');
            spyOn(componentUnderTest, 'closeSuggestions');
            let eve: any = { keyCode: 10, preventDefault: jasmine.createSpy('preventDefault') };
            componentUnderTest.inputKeyDown(eve);
            expect(componentUnderTest.newSuggestion.emit).toHaveBeenCalled();
            expect(componentUnderTest.closeSuggestions).toHaveBeenCalled();
            expect(eve.preventDefault).toHaveBeenCalled();
          });

          it('Does nothing if there are no suggestions when hitting the enter key, lets form submit natively', () => {
            componentUnderTest.suggestions = [];
            componentUnderTest.activeSuggestion = null;
            spyOn(componentUnderTest.newSuggestion, 'emit');
            spyOn(componentUnderTest, 'closeSuggestions');
            spyOn(componentUnderTest, 'selectSuggestion');
            let eve: any = { keyCode: 10, preventDefault: jasmine.createSpy('preventDefault') };
            componentUnderTest.inputKeyDown(eve);
            expect(componentUnderTest.newSuggestion.emit).not.toHaveBeenCalled();
            expect(componentUnderTest.closeSuggestions).not.toHaveBeenCalled();
            expect(componentUnderTest.selectSuggestion).not.toHaveBeenCalled();
          });
        });
      });
    });
  });
};

