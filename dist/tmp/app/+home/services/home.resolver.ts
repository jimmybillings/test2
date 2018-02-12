import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CurrentUserService } from '../../shared/services/current-user.service';
import { AppStore } from '../../app.store';
import { GalleryViewService } from '../../shared/services/gallery-view.service';

@Injectable()
export class HomeResolver implements Resolve<any> {
  private config: any;

  constructor(
    public currentUser: CurrentUserService,
    private store: AppStore,
    private galleryViewService: GalleryViewService
  ) {
    this.config = this.store.snapshotCloned(state => state.uiConfig.components.home.config);
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    if (this.currentUser.loggedIn() && this.config.galleryView) {
      return this.galleryViewService.load([]);
    } else {
      return Observable.of(true);
    }
  }
}
