import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Capabilities } from '../../shared/services/capabilities.service';
import { ErrorBase } from '../error.base';

@Component({
  moduleId: module.id,
  selector: 'bad-server-request-component',
  templateUrl: './bad-server-request.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BadServerRequestComponent extends ErrorBase {
  constructor(protected userCan: Capabilities) {
    super(userCan);
  }
}
