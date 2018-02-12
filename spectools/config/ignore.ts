export const ignoredFilePatterns: string[] = [
  // The ending '.ts' is implied.
  '*.interface',
  '*.module',
  'app.module.ngfactory',
  '*.routes',
  'main',
  'system-config',
  'env.config',
  'wz-clipboard.directive',
  'wz-pikaday.directive',
  'i18n.providers',
  'main-prod',
  'operators',
  'shared/modules/wz-dialog/components/index',
  'shared/modules/wazee-frame-formatter/index',
  'shared/modules/wazee-frame-formatter/support/customMatchers',
  'shared/modules/wazee-frame-formatter/timecodeBase',
  'shared/modules/wazee-frame-formatter/timecodeFormat',
  'application',
  'app.store'
];

export const ignoredDirectoryNames: string[] = [
  'imports',
  'tests',
  'store/spec-helpers'
];
