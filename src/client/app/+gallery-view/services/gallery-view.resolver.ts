import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { GalleryViewService } from '../../shared/services/gallery-view.service';
import { Gallery, GalleryPath } from '../../shared/interfaces/gallery-view.interface';

@Injectable()
export class GalleryViewResolver {
  constructor(private galleryViewService: GalleryViewService) { }

  public resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const pathParameter: string = route.params['path'];

    return this.galleryViewService.load(pathParameter ? JSON.parse(pathParameter) : []);
  }
}
