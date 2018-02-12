import Config from '../../config';
import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import { join } from 'path';
const plugins = <any>gulpLoadPlugins();

export = () => {
  return gulp.src(Config.APP_SRC + '/app/theme.scss')
    .pipe(plugins.sass({ outputStyle: 'compressed' }).on('error', plugins.sass.logError))
    .pipe(gulp.dest(Config.APP_DEST));
};
