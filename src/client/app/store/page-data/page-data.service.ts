import { Observable } from 'rxjs/Observable';
import { Title } from '@angular/platform-browser';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Pojo } from '../../shared/interfaces/common.interface';

@Injectable()
export class PageDataService {
  constructor(private translateService: TranslateService, private titleService: Title) { }

  public updateTitle(trKey: string, trParams?: Pojo): void {
    this.translateService.get(['COMPANY_NAME', trKey], trParams)
      .subscribe((values: { [index: string]: string }) => {
        values[trKey] = values[trKey].replace('{{q}}', 'all');
        this.titleService.setTitle(values['COMPANY_NAME'] + values[trKey]);
      });
  }
}
