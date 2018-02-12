import { Pojo } from '../../../../interfaces/common.interface';
import {
  Component, Input, Output, OnInit, ChangeDetectorRef,
  ChangeDetectionStrategy, Renderer, OnDestroy, EventEmitter
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { ApiService } from '../../../../services/api.service';
import { Api, ApiResponse } from '../../../../interfaces/api.interface';

@Component({
  moduleId: module.id,
  selector: 'wz-input-suggestions',
  templateUrl: 'wz-input-suggestions.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: ['mat-list-item:first-child{ display: none;}']
})

export class WzInputSuggestionsComponent implements OnInit, OnDestroy {

  @Input() fControl: FormControl;
  @Input() rawField: any;
  @Input() matchOnProperty: string = '';
  @Output() newSuggestion = new EventEmitter();
  public suggestions: Array<string> = [];
  public activeSuggestion: string;

  private clickCatcher: any;
  private inputSubscription: Subscription;
  private userInput: string = '';
  private rawSuggestions: Pojo[];

  constructor(
    private renderer: Renderer,
    private api: ApiService,
    private detector: ChangeDetectorRef) { }

  ngOnInit() {
    this.clickCatcher = this.renderer.listenGlobal('body', 'click', this.closeSuggestions.bind(this));
    this.suggestionChangeListener();
  }

  ngOnDestroy() {
    this.clickCatcher();
    this.destroySubscription();
  }

  public destroySubscription() {
    if (this.inputSubscription) this.inputSubscription.unsubscribe();
  }

  public suggestionChangeListener() {
    if (this.fControl) {
      this.inputSubscription = this.fControl.valueChanges
        .filter((value: string) => value !== this.activeSuggestion)
        .switchMap((query: string) => {
          this.activeSuggestion = null;
          if (query && query.length > 1) {
            return this.query(query);
          } else {
            this.closeSuggestions();
            return [];
          }
        })
        .do((response) => {
          this.rawSuggestions = (response['items'] || response['list'] || []);
          return response;
        })
        .map(response => (response['items'] || response['list'] || [])
          .map((item: any) => item.name || item.emailAddress || item))
        .do((suggestions) => {
          this.suggestions = this.normalizeSuggestions(suggestions);
          this.userInput = this.fControl.value;
        })
        .subscribe(() => this.detector.markForCheck());
    }
  }

  public closeSuggestions() {
    this.activeSuggestion = null;
    this.suggestions = [];
    this.detector.markForCheck();
  }

  public selectSuggestion(suggestion: string) {
    const tempSuggestion: string = this.activeSuggestion;
    this.closeSuggestions();
    this.fControl.patchValue(suggestion, { emitEvent: false });
    if (!!this.matchOnProperty) {
      // A timeout here to help fix animation lag when
      // other external processing may be happening. Without it
      // it causes lag on closing the suggestion pop up menu.
      setTimeout(() => this.newSuggestion.emit(
        this.rawSuggestions.find((rawSuggestion) =>
          rawSuggestion[this.matchOnProperty] === suggestion
        )
      ), 20);
    } else {
      this.newSuggestion.emit(tempSuggestion);
    }
  }

  public parseSuggestion(suggestion: string) {
    return suggestion
      .split(this.userInput)
      .join('<strong>' + this.userInput + '</strong>');
  }

  public inputKeyDown(event: KeyboardEvent): void {
    if (event.which === 9 || event.keyCode === 9) {
      // TAB
      this.closeSuggestions();
    } else if (event.which === 38 || event.keyCode === 38) {
      // UP
      this.upKey(event);
      event.preventDefault();
    } else if (event.which === 40 || event.keyCode === 40) {
      // DOWN
      this.downKey(event);
      event.preventDefault();
    } else if ((event.which === 10 || event.which === 13 ||
      event.keyCode === 10 || event.keyCode === 13)
      && this.suggestions.length > 1) {
      // ENTER
      this.enterKey(event);
      event.preventDefault();
    }
  }

  public isCollection() {
    return (this.rawField.endPoint.indexOf('collection') > -1);
  }

  private upKey(event: KeyboardEvent) {
    // Find the active suggestion in the list
    let activeSuggestionIndex = this.suggestions.indexOf(this.activeSuggestion);

    // If not found, then activate the first suggestion
    if (activeSuggestionIndex === -1) {
      this.setActiveSuggestion(this.suggestions[0]);
      return;
    }

    let suggestion: string;
    // Determine to decrement up the suggestion list or rest to the last.
    suggestion = (activeSuggestionIndex === 0) ?
      // On the first selection so go to the last
      this.suggestions[this.suggestions.length - 1] :
      // Still more suggestion between here and the first so keep decrementing
      this.suggestions[activeSuggestionIndex - 1];
    this.setActiveSuggestion(suggestion);
  }

  private downKey(event: KeyboardEvent) {
    // Find the active suggestion in the list
    let activeSuggestionIndex = this.suggestions.indexOf(this.activeSuggestion);

    // If not found, then activate the first suggestion
    if (activeSuggestionIndex === -1) {
      this.setActiveSuggestion(this.suggestions[1]);
      return;
    }

    let suggestion: string;
    // Determine to increment down the suggestion list or reset to the first.
    suggestion = (activeSuggestionIndex === (this.suggestions.length - 1)) ?
      // On last suggestion so reset to the first.
      this.suggestions[0] :
      // Not on the last suggestion so keep incrementing selected suggestion
      this.suggestions[activeSuggestionIndex + 1];
    this.setActiveSuggestion(suggestion);
  }

  private enterKey(event: KeyboardEvent) {
    // Select the active suggestion
    if (this.activeSuggestion) {
      this.selectSuggestion(this.activeSuggestion);
    } else {
      this.newSuggestion.emit();
      this.closeSuggestions();
    }
  }

  private setActiveSuggestion(suggestion: string) {
    this.activeSuggestion = suggestion;
    this.fControl.patchValue(suggestion, { emitEvent: false });
    this.detector.markForCheck();
  }

  private normalizeSuggestions(suggestions: Array<string>) {
    suggestions.unshift(this.fControl.value);
    return suggestions;
  }

  private buildParams() {
    let queryParamsArray: Array<string> = this.rawField.queryParams.split(',').map((item: string) => item.trim());
    let queryParams: any = {};
    for (let i = 0; i < (queryParamsArray.length / 2); i++) {
      queryParams[queryParamsArray[0]] = queryParamsArray[1];
      queryParamsArray.splice(0, 1);
    }
    return queryParams;
  }

  private buildSearchFields(query: any) {
    let queryParamsArray: Array<string> = this.rawField.queryParams.split(',').map((item: string) => item.trim());
    queryParamsArray.push(query);
    let queryParams: any = {};
    for (let i = 0; i < queryParamsArray.length; i += 2) {
      queryParams[queryParamsArray[i]] = queryParamsArray[i + 1];
    };
    return queryParams;
  }

  private query(query: string): Observable<ApiResponse> {
    switch (this.rawField.service) {
      case 'identities':
        return this.api.get(
          Api.Identities,
          this.rawField.endPoint,
          { parameters: Object.assign({}, this.buildSearchFields(query)) }
        );
      case 'assets':
        return this.api.get(
          Api.Assets,
          this.rawField.endPoint,
          { parameters: Object.assign({}, this.buildParams(), { text: query }, { q: query }) }
        );
      default:
        return Observable.of([]);
    }
  }
}
