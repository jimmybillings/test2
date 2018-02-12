import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import { join } from 'path';
import Config from '../../config';
import { makeTsProject, TemplateLocalsBuilder } from '../../utils';

const merge2 = require('merge2');
const instance = new TemplateLocalsBuilder();
const plugins = <any>gulpLoadPlugins();

const INLINE_OPTIONS = {
  base: Config.TMP_DIR,
  useRelativePaths: true,
  removeLineBreaks: true
};

/**
 * Executes the build process, transpiling the TypeScript files for the production environment.
 */
function buildTS() {
  let tsProject = makeTsProject();
  let src = [
    'typings/browser.d.ts',
    join(Config.APP_SRC, '**/*.ts'),
    '!' + join(Config.APP_SRC, '**/hot_loader_main.ts'),
    '!' + join(Config.APP_SRC, '**/main.ts'),
    '!' + join(Config.APP_SRC, '**/*.e2e.ts'),
    '!' + join(Config.APP_SRC, '**/*.spec.ts')
  ];
  let result = gulp.src(src)
    .pipe(plugins.plumber())
    .pipe(plugins.inlineNg2Template(INLINE_OPTIONS))
    .pipe(tsProject());

  gulp.src(['node_modules/@angular/material/_theming.scss', 'library/package.json', 'dist/prod/layout.css'])
    .pipe(gulp.dest(Config.APP_DEST));

  gulp.src(['dist/prod/js/shims.js', 'dist/prod/js/app.js'])
    .pipe(plugins.concat('app.js'))
    .pipe(gulp.dest(Config.APP_DEST));

  return merge2([
    result.dts.pipe(gulp.dest(Config.APP_DEST)),
    result.js.pipe(plugins.template(instance.build()))
      .pipe(gulp.dest(Config.APP_DEST))
  ]);
}

export = () => buildTS();
