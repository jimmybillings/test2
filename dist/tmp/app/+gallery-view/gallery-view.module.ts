import { NgModule } from '@angular/core';

import { GalleryViewComponent } from './gallery-view.component';
import { OneLevelViewComponent } from './components/one-level-view.component';
import { SharedModule } from '../shared/shared.module';
import { GalleryViewResolver } from './services/gallery-view.resolver';

@NgModule({
  imports: [SharedModule],
  declarations: [
    GalleryViewComponent,
    OneLevelViewComponent
  ],
  exports: [GalleryViewComponent],
  providers: [GalleryViewResolver]
})
export class GalleryViewModule { }
