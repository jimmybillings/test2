import { log, abbreviate } from './src/output';
import { SpecAnalyzer } from './src/specAnalyzer';

const analyzer: SpecAnalyzer = new SpecAnalyzer();

abbreviate(analyzer.sourcesWithoutSpecs)
  .forEach((source: string) => log(`ERROR: No spec for ${source}`));

if (analyzer.sourcesWithoutSpecs.length > 0) log();
log(`* Total number of testable source files: ${analyzer.allSourceFilenames.length}`);
log(`* Number of testable source files without a matching spec file: ${analyzer.sourcesWithoutSpecs.length}`);
log();

abbreviate(analyzer.specsWithoutSources)
  .forEach((spec: string) => log(`ERROR: No source for ${spec}`));

if (analyzer.specsWithoutSources.length > 0) log();
log(`* Total number of spec files: ${analyzer.allSpecFilenames.length}`);
log(`* Number of spec files without a matching source file: ${analyzer.specsWithoutSources.length}`);

process.exit(
  (analyzer.sourcesWithoutSpecs.length > 0 || analyzer.specsWithoutSources.length > 0) ? 1 : 0
);
