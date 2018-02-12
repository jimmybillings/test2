import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Capabilities } from '../../shared/services/capabilities.service';
import { ErrorBase } from '../error.base';

@Component({
  moduleId: module.id,
  selector: 'bad-request-component',
  templateUrl: './bad-request.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BadRequestComponent extends ErrorBase {
  constructor(protected userCan: Capabilities) {
    super(userCan);
  }
}
