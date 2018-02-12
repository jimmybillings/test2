import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ApiService } from '../../shared/services/api.service';
import { Api } from '../../shared/interfaces/api.interface';
import { Credentials, Session } from '../interfaces/session.interface';

/**
 * Service that provides access to the api for logging user in and out.
 */
@Injectable()
export class Authentication {
  constructor(private api: ApiService) { }

  public create(user: Credentials): Observable<Session> {
    return this.api.post(Api.Identities, 'login', { body: user, loadingIndicator: true });
  }

  public destroy(): Observable<null> {
    return this.api.put(Api.Identities, 'session/invalidate');
  }

  public validate(token: string): Observable<null> {
    return this.api.get(Api.Identities, 'session/validate/' + token);
  }
}
