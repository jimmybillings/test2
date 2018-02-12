import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import Config from '../../config';
import { readFileSync } from 'fs';
import { makeTsProject, TemplateLocalsBuilder } from '../../utils';

const plugins = <any>gulpLoadPlugins();

function publishToS3() {
  var options = {
    headers: {
      'Content-Encoding': 'gzip',
    }
  };
  var aws: any = readFileSync('./aws-keys.json');
  aws = JSON.parse(aws);
  return gulp.src(['./dist/prod/**'])
    .pipe(plugins.gzip({ append: false }))
    .pipe(plugins.s3(aws, options));
}

export = () => publishToS3();
