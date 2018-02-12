import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../wz-design/wz.design.module';
import { TranslateModule } from '@ngx-translate/core';

import { WzFormModule } from '../wz-form/wz-form.module';

// Wrapper service
import { WzDialogService } from './services/wz.dialog.service';


// Dialog types
import {
  WzFormDialogComponent,
  WzNotificationDialogComponent,
  WzConfirmationDialogComponent,
} from './components/index';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    TranslateModule,
    WzFormModule
  ],
  declarations: [
    WzNotificationDialogComponent,
    WzFormDialogComponent,
    WzConfirmationDialogComponent
  ],
  entryComponents: [
    WzNotificationDialogComponent,
    WzFormDialogComponent,
    WzConfirmationDialogComponent
  ],
  providers: [WzDialogService]
})
export class WzDialogModule { }
