import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { CurrentUserService } from './current-user.service';

@Injectable()
export class ApiConfig {
  private _portal: string = null;
  private _baseUrl: string = null;

  constructor(private currentUser: CurrentUserService) { }

  public get baseUrl(): string {
    return this._baseUrl;
  }

  public set baseUrl(url: string) {
    this._baseUrl = url;
  }

  public set portal(portal: string) {
    this._portal = portal;
  }

  public get portal(): string {
    return this._portal;
  }

  public headers(overridingToken: string = '', headerType: string = 'json'): Headers {
    let token: string = '';

    if (overridingToken !== '') {
      token = overridingToken;
    } else if (this.currentUser.loggedIn()) {
      token = localStorage.getItem('token');
    }

    const headers: { [name: string]: any } = {
      'Content-Type': 'application/json',
    };

    if (token !== '') {
      headers['Authorization'] = `Bearer ${token}`;
    }

    switch (headerType) {
      case 'json':
        headers['Accept'] = 'application/json';
        break;
      case 'download':
        headers['Accept'] = 'application/octet-stream';
        break;
      case 'form-urlencoded':
        headers['Accept'] = 'application/json';
        headers['Content-Type'] = 'application/x-www-form-urlencoded';
        break;
      default:
        headers['Accept'] = 'application/json';
        break;
    }

    return new Headers(headers);
  }
}
