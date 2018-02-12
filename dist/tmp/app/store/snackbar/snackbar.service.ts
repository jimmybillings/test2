import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class SnackbarService {
  constructor(private translateService: TranslateService, private snackBar: MatSnackBar) { }

  public display(messageKey: string, messageParameters: object): Observable<String> {
    return this.translateService.get(messageKey, messageParameters)
      .take(1)
      .do((translatedString: string) => this.snackBar.open(translatedString, '', {
        duration: 1500,
        verticalPosition: 'top',
        horizontalPosition: 'left',
        extraClasses: ['wz-snackbar']
      }));
  }
}
