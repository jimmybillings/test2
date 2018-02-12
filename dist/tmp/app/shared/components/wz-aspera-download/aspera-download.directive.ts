import { Directive, HostListener, Input } from '@angular/core';

import { AsperaService } from '../../../shared/services/aspera.service';
import { AppStore } from '../../../app.store';

@Directive({
  selector: '[wzAsperaDownload]'
})

export class WzAsperaDownloadDirective {
  @Input() asperaSpec: string;
  @Input() asperaPreloaded: string = 'true';
  @Input() renditionType: string = null;
  @Input() assetId: number = null;

  @HostListener('click', ['$event'])
  onClick($event: any) {
    if (JSON.parse(this.asperaPreloaded)) {
      this.asperaService.initConnect(this.asperaSpec);
    } else {
      this.asperaService.getAsperaSpec(this.assetId, this.renditionType)
        .filter(res => res.asperaSpec)
        .subscribe((res: any) => {
          this.asperaService.initConnect(res.asperaSpec);
        }, () => {
          this.store.dispatch(factory => factory.error.handleCustomError('COMPS.NO_COMP'));
        });
    }
  }

  constructor(private asperaService: AsperaService, private store: AppStore) { }
}
