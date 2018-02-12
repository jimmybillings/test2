import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

declare var jwplayer: any;

@Injectable()
export class HomeVideoService {
  public heroVideo: any;

  constructor(
    private http: Http) { }

  public getVideo(mediaId: any): Observable<any> {
    return this.http.get(`https://content.jwplatform.com/feeds/${mediaId}.json`)
      .map(data => { try { return data.json(); } catch (exception) { return data; } });
  }

  // public setUpVideo(video: any, elementId: string): Observable<any> {
  //   return this.heroVideo = jwplayer(elementId).setup({
  //     autostart: true,
  //     controls: false,
  //     playlist: video,
  //     androidhls: false,
  //     mute: true,
  //     repeat: true,
  //     stretching: 'fill',
  //     height: '100%',
  //     width: '100%'
  //   }) as Observable<any>;
  // }
}
