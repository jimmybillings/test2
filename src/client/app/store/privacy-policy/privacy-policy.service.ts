import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { FutureApiService } from '../api/api.service';
import { Api } from '../../shared/interfaces/api.interface';

@Injectable()
export class PrivacyPolicyService {
  constructor(private apiService: FutureApiService) { }

  public load(documentId: string): Observable<string> {
    return this.apiService.get(
      Api.Identities,
      `document/downloadDocumentFile/${documentId}`,
      { loadingIndicator: true, headerType: 'download' }
    ).map((response: Response) => response.text());
  }
}
