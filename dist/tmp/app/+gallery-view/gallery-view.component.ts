import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { SearchContext } from '../shared/services/search-context.service';
import { GalleryViewService } from '../shared/services/gallery-view.service';
import { Gallery, GalleryPath, GalleryPathSegment, GalleryNavigationEvent } from '../shared/interfaces/gallery-view.interface';
import { UserPreferenceService } from '../shared/services/user-preference.service';
import { Common } from '../shared/utilities/common.functions';

@Component({
  moduleId: module.id,
  selector: 'gallery-view-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'gallery-view.html'
})
export class GalleryViewComponent implements OnInit {
  public data: Observable<Gallery>;

  constructor(
    private userPreference: UserPreferenceService,
    private galleryViewService: GalleryViewService,
    private router: Router,
    private search: SearchContext) { }

  public ngOnInit(): void {
    this.data = this.galleryViewService.data;
  }

  public onClickBreadcrumb(index: number): void {
    let path: GalleryPath = Common.clone(this.galleryViewService.state.path);
    path = path.slice(0, index);

    this.changeRouteFor(path);
  }

  public onNavigate(event: GalleryNavigationEvent): void {
    const path = Common.clone(this.galleryViewService.state.path);
    path.push(event.pathSegment);

    if (event.method === 'nextLevel') {
      this.changeRouteFor(path);
    } else {
      this.search.new({ gq: JSON.stringify(path), n: 100, i: 1, sortId: this.userPreference.state.sortId });
    }
  }

  private changeRouteFor(path: GalleryPath): void {
    const route: any[] = path && path.length > 0 ? ['/gallery-view'] : ['/'];
    if (path && path.length > 0) route.push({ path: JSON.stringify(path) });

    this.router.navigate(route);
  }
}
