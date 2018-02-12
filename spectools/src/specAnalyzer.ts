const glob = require('glob');

import { rootDir } from '../config/rootdir';
import { ignoredFilePatterns, ignoredDirectoryNames } from '../config/ignore';

export class SpecAnalyzer {
  private _allTypeScriptFilenames: string[] = null;
  private _allSourceFilenames: string[] = null;
  private _allSpecFilenames: string[] = null;
  private _sourcesWithoutSpecs: string[] = null;
  private _specsWithoutSources: string[] = null;

  public get allTypeScriptFilenames(): string[] {
    if (this._allTypeScriptFilenames === null) {
      this._allTypeScriptFilenames =
        glob.sync(`${rootDir}**/*.ts`, { nodir: true, ignore: this.patternsToIgnore() });
    }

    return this._allTypeScriptFilenames;
  }

  public get allSourceFilenames(): string[] {
    if (this._allSourceFilenames === null) {
      this._allSourceFilenames =
        this.allTypeScriptFilenames.filter(filename => !this.isSpecFile(filename));
    }

    return this._allSourceFilenames;
  }

  public get allSpecFilenames(): string[] {
    if (this._allSpecFilenames === null) {
      this._allSpecFilenames =
        this.allTypeScriptFilenames.filter(filename => this.isSpecFile(filename));
    }

    return this._allSpecFilenames;
  }

  public get sourcesWithoutSpecs(): string[] {
    if (this._sourcesWithoutSpecs === null) {
      this._sourcesWithoutSpecs = this.allSourceFilenames.filter(
        source => this.allSpecFilenames.indexOf(this.specFilenameFrom(source)) === -1
      );
    }

    return this._sourcesWithoutSpecs;
  }

  public get specsWithoutSources(): string[] {
    if (this._specsWithoutSources === null) {
      this._specsWithoutSources = this.allSpecFilenames.filter(
        spec => this.allSourceFilenames.indexOf(this.sourceFilenameFrom(spec)) === -1
      );
    }

    return this._specsWithoutSources;
  }

  public specFilenameFrom(sourceFilename: string): string {
    return sourceFilename.replace(/\.ts$/, '.spec.ts');
  }

  public sourceFilenameFrom(specFilename: string): string {
    return specFilename.replace(/\.spec\.ts$/, '.ts');
  }

  private patternsToIgnore(): string[] {
    return []
      .concat(ignoredFilePatterns.map(pattern => `${rootDir}**/${pattern}.ts`))
      .concat(ignoredDirectoryNames.map(name => `${rootDir}**/${name}/**/*.ts`));
  }

  private isSpecFile(filename: string): boolean {
    return /\.spec\.ts$/.test(filename);
  }
}
