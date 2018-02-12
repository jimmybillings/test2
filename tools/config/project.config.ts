import { join } from 'path';

import { SeedConfig } from './seed.config';
import { ExtendPackages } from './seed.config.interfaces';

/**
 * This class extends the basic seed configuration, allowing for project specific overrides. A few examples can be found
 * below.
 */
export class ProjectConfig extends SeedConfig {

  PROJECT_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');

  constructor() {
    super();
    this.NPM_DEPENDENCIES = [
      ...this.NPM_DEPENDENCIES,
      { src: 'clipboard/dist/clipboard.min.js', inject: 'libs' },
      { src: 'hammerjs/hammer.js', inject: 'libs' }
    ];

    this.APP_ASSETS = [
      { src: `${this.APP_SRC}/app/shared/components/wz-aspera-download/connectinstaller-4.js`, inject: true, vendor: false },
      { src: `${this.APP_SRC}/app/shared/components/wz-aspera-download/asperaweb-4.js`, inject: true, vendor: false }
    ];

    let additionalPackages: ExtendPackages[] = [
      {
        name: '@ngrx/store',
        path: 'node_modules/@ngrx/store/bundles/store.umd.min.js'
      },
      {
        name: '@ngrx/effects',
        path: 'node_modules/@ngrx/effects/bundles/effects.umd.min.js'
      },
      {
        name: '@ngrx/store-devtools',
        path: 'node_modules/@ngrx/store-devtools/bundles/store-devtools.umd.min.js'
      },
      {
        name: '@ngx-translate/core',
        path: 'node_modules/@ngx-translate/core/bundles/core.umd.js'
      },
      {
        name: '@ngx-translate/http-loader',
        path: 'node_modules/@ngx-translate/http-loader/bundles/http-loader.umd.js'
      },
      // {
      //   name: 'wazee-frame-formatter/src',
      //   path: 'node_modules/wazee-frame-formatter/dist/index.js'
      // },

      // MATERIAL MODULES START
      {
        name: '@angular/material',
        path: 'node_modules/@angular/material/bundles/material.umd.js'
      },
      // {
      //   name: '@angular/material/autocomplete',
      //   path: 'node_modules/@angular/material/bundles/material-autocomplete.umd.min.js'
      // },
      // {
      //   name: '@angular/material/button-toggle',
      //   path: 'node_modules/@angular/material/bundles/material-button-toggle.umd.min.js'
      // },
      // {
      //   name: '@angular/material/button',
      //   path: 'node_modules/@angular/material/bundles/material-button.umd.min.js'
      // },
      // {
      //   name: '@angular/material/card',
      //   path: 'node_modules/@angular/material/bundles/material-card.umd.min.js'
      // },
      // {
      //   name: '@angular/material/checkbox',
      //   path: 'node_modules/@angular/material/bundles/material-checkbox.umd.min.js'
      // },
      // {
      //   name: '@angular/material/chips',
      //   path: 'node_modules/@angular/material/bundles/material-chips.umd.min.js'
      // },
      // {
      //   name: '@angular/material/core',
      //   path: 'node_modules/@angular/material/bundles/material-core.umd.min.js'
      // },
      // {
      //   name: '@angular/material/datepicker',
      //   path: 'node_modules/@angular/material/bundles/material-datepicker.umd.min.js'
      // },
      // {
      //   name: '@angular/material/dialog',
      //   path: 'node_modules/@angular/material/bundles/material-dialog.umd.min.js'
      // },
      // {
      //   name: '@angular/material/expansion',
      //   path: 'node_modules/@angular/material/bundles/material-expansion.umd.min.js'
      // },
      // {
      //   name: '@angular/material/form-field',
      //   path: 'node_modules/@angular/material/bundles/material-form-field.umd.min.js'
      // },
      // {
      //   name: '@angular/material/grid-list',
      //   path: 'node_modules/@angular/material/bundles/material-grid-list.umd.min.js'
      // },
      // {
      //   name: '@angular/material/icon',
      //   path: 'node_modules/@angular/material/bundles/material-icon.umd.min.js'
      // },
      // {
      //   name: '@angular/material/input',
      //   path: 'node_modules/@angular/material/bundles/material-input.umd.min.js'
      // },
      // {
      //   name: '@angular/material/list',
      //   path: 'node_modules/@angular/material/bundles/material-list.umd.min.js'
      // },
      // {
      //   name: '@angular/material/menu',
      //   path: 'node_modules/@angular/material/bundles/material-menu.umd.min.js'
      // },
      // {
      //   name: '@angular/material/paginator',
      //   path: 'node_modules/@angular/material/bundles/material-paginator.umd.min.js'
      // },
      // {
      //   name: '@angular/material/progress-bar',
      //   path: 'node_modules/@angular/material/bundles/material-progress-bar.umd.min.js'
      // },
      // {
      //   name: '@angular/material/progress-spinner',
      //   path: 'node_modules/@angular/material/bundles/material-progress-spinner.umd.min.js'
      // },
      // {
      //   name: '@angular/material/radio',
      //   path: 'node_modules/@angular/material/bundles/material-radio.umd.min.js'
      // },
      // {
      //   name: '@angular/material/select',
      //   path: 'node_modules/@angular/material/bundles/material-select.umd.min.js'
      // },
      // {
      //   name: '@angular/material/sidenav',
      //   path: 'node_modules/@angular/material/bundles/material-sidenav.umd.min.js'
      // },
      // {
      //   name: '@angular/material/slide-toggle',
      //   path: 'node_modules/@angular/material/bundles/material-slide-toggle.umd.min.js'
      // },
      // {
      //   name: '@angular/material/slider',
      //   path: 'node_modules/@angular/material/bundles/material-slider.umd.min.js'
      // },
      // {
      //   name: '@angular/material/snack-bar',
      //   path: 'node_modules/@angular/material/bundles/material-snack-bar.umd.min.js'
      // },
      // {
      //   name: '@angular/material/sort',
      //   path: 'node_modules/@angular/material/bundles/material-sort.umd.min.js'
      // },
      // {
      //   name: '@angular/material/stepper',
      //   path: 'node_modules/@angular/material/bundles/material-stepper.umd.min.js'
      // },
      // {
      //   name: '@angular/material/table',
      //   path: 'node_modules/@angular/material/bundles/material-table.umd.min.js'
      // },
      // {
      //   name: '@angular/material/tabs',
      //   path: 'node_modules/@angular/material/bundles/material-tabs.umd.min.js'
      // },
      // {
      //   name: '@angular/material/toolbar',
      //   path: 'node_modules/@angular/material/bundles/material-toolbar.umd.min.js'
      // },
      // {
      //   name: '@angular/material/tooltip',
      //   path: 'node_modules/@angular/material/bundles/material-tooltip.umd.min.js'
      // },
      {
        name: '@angular/cdk/stepper',
        path: 'node_modules/@angular/cdk/bundles/cdk-stepper.umd.js'
      },
      {
        name: '@angular/cdk/a11y',
        path: 'node_modules/@angular/cdk/bundles/cdk-a11y.umd.js'
      },
      {
        name: '@angular/cdk/bidi',
        path: 'node_modules/@angular/cdk/bundles/cdk-bidi.umd.js'
      },
      {
        name: '@angular/cdk/coercion',
        path: 'node_modules/@angular/cdk/bundles/cdk-coercion.umd.js'
      },
      {
        name: '@angular/cdk/collections',
        path: 'node_modules/@angular/cdk/bundles/cdk-collections.umd.js'
      },
      {
        name: '@angular/cdk/keycodes',
        path: 'node_modules/@angular/cdk/bundles/cdk-keycodes.umd.js'
      },
      {
        name: '@angular/cdk/observers',
        path: 'node_modules/@angular/cdk/bundles/cdk-observers.umd.js'
      },
      {
        name: '@angular/cdk/overlay',
        path: 'node_modules/@angular/cdk/bundles/cdk-overlay.umd.js'
      },
      {
        name: '@angular/cdk/platform',
        path: 'node_modules/@angular/cdk/bundles/cdk-platform.umd.js'
      },
      {
        name: '@angular/cdk/portal',
        path: 'node_modules/@angular/cdk/bundles/cdk-portal.umd.js'
      },
      {
        name: '@angular/cdk/rxjs',
        path: 'node_modules/@angular/cdk/bundles/cdk-rxjs.umd.js'
      },
      {
        name: '@angular/cdk/scrolling',
        path: 'node_modules/@angular/cdk/bundles/cdk-scrolling.umd.js'
      },
      {
        name: '@angular/cdk/table',
        path: 'node_modules/@angular/cdk/bundles/cdk-table.umd.js'
      }
    ];

    this.addPackagesBundles(additionalPackages);
  }

}
