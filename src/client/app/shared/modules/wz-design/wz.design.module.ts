import { NgModule } from '@angular/core';
// import { MatButtonModule } from '@angular/material/button';
// import { MatButtonToggleModule } from '@angular/material/button-toggle';
// import { MatCardModule } from '@angular/material/card';
// import { MatDialogModule } from '@angular/material/dialog';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatGridListModule } from '@angular/material/grid-list';
// import { MatIconModule } from '@angular/material/icon';
// import { MatInputModule } from '@angular/material/input';
// import { MatListModule } from '@angular/material/list';
// import { MatMenuModule } from '@angular/material/menu';
// import { MatPaginatorModule } from '@angular/material/paginator';
// import { MatProgressBarModule } from '@angular/material/progress-bar';
// import { MatRadioModule } from '@angular/material/radio';
// import { MatSelectModule } from '@angular/material/select';
// import { MatSidenavModule } from '@angular/material/sidenav';
// import { MatSliderModule } from '@angular/material/slider';
// import { MatSlideToggleModule } from '@angular/material/slide-toggle';
// import { MatSnackBarModule } from '@angular/material/snack-bar';
// import { MatTabsModule } from '@angular/material/tabs';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatTooltipModule } from '@angular/material/tooltip';
// import { MatCheckboxModule } from '@angular/material/checkbox';

import {
  // MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  // MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  // MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  // MatSortModule,
  // MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  // MatStepperModule,
} from '@angular/material';

import { MatNativeDateModule } from '@angular/material';
// import { CdkTableModule } from '@angular/cdk/table';
// import { A11yModule } from '@angular/cdk/a11y';
// import { BidiModule } from '@angular/cdk/bidi';
// import { OverlayModule } from '@angular/cdk/overlay';
// import { PlatformModule } from '@angular/cdk/platform';
// import { ObserversModule } from '@angular/cdk/observers';
// import { PortalModule } from '@angular/cdk/portal';

/**
 * NgModule that includes all Material modules that are required to serve the demo-app.
 */
@NgModule({
  exports: [
    // MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    // MatChipsModule,
    // MatTableModule,
    MatDatepickerModule,
    MatDialogModule,
    // MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    // MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSnackBarModule,
    // MatSortModule,
    // MatStepperModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatNativeDateModule,
    // CdkTableModule,
    // A11yModule,
    // BidiModule,
    // ObserversModule,
    // OverlayModule,
    // PlatformModule,
    // PortalModule,
  ]
})
export class MaterialModule {

}
