import { log, abbreviate } from './src/output';
import { SpecAnalyzer } from './src/specAnalyzer';
import { createSpec } from './src/specCreator';

const analyzer: SpecAnalyzer = new SpecAnalyzer();

if (analyzer.sourcesWithoutSpecs.length === 0) {
  log('There are no sources without specs.  Exiting.');

  process.exit(0);
}

if (analyzer.specsWithoutSources.length > 0) {
  abbreviate(analyzer.specsWithoutSources)
    .forEach((spec: string) => log(`ERROR: No source for ${spec}`));

  log();
  log('ERROR: Before you can generate specs, you\'ll need to clean up');
  log('the spec file(s) above.  Those files are probably specs that');
  log('were meant to belong to source files, but have been named');
  log('incorrectly.  (We don\'t want to generate a spec unless we are');
  log('sure that it doesn\'t already exist.)');

  process.exit(1);
}

analyzer.sourcesWithoutSpecs.forEach((source: string, index: number) => {
  const spec: string = analyzer.specFilenameFrom(source);

  if (index > 0) log();
  log(`Missing spec for ${abbreviate(source)}...`);
  createSpec(source, spec);
  log(`  Created ${abbreviate(spec)}`);
});

process.exit(0);
