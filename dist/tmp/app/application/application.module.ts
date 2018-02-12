import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AppNavComponent } from './app-nav/app-nav.component';
import { AppLoadingIndicatorComponent } from './app-loading-indicator/app-loading-indicator.component';
import { CollectionTrayComponent } from './collection-tray/collection-tray.component';
import { FooterComponent } from './footer/footer.component';
import { CollectionListDdComponent } from './collection-tray/components/collections-list-dd.component';

@NgModule({
  imports: [SharedModule],
  declarations: [
    AppNavComponent,
    CollectionTrayComponent,
    FooterComponent,
    CollectionListDdComponent,
    AppLoadingIndicatorComponent
  ],
  exports: [AppNavComponent, CollectionTrayComponent, FooterComponent, AppLoadingIndicatorComponent],
  entryComponents: [CollectionListDdComponent]
})

export class ApplicationModule { }
