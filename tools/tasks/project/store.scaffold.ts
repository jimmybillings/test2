import * as gutil from 'gulp-util';
import { writeFile, mkdir } from 'fs';
import { join } from 'path';
import { argv } from 'yargs';
import Config from '../../config';

export = () => {
  let scaffolder: Scaffolder = new Scaffolder(argv['section'], argv['skip'], argv['help']);

  scaffolder.init();
};

class Scaffolder {
  private sectionName: string;
  private path: string;
  private className: string;
  private stateName: string;
  private serviceName: string;
  private effectsName: string;
  private actionsName: string;
  private classNameWithSpaces: string;
  private skips: string[];

  constructor(sectionName: string, skips: string, help: boolean) {
    if (help || !sectionName) {
      this.logInstructions();
      process.exit(0);
    }
    this.sectionName = this.kebab(sectionName);
    this.skips = skips ? skips.split(',') : [];
    this.path = join(Config.APP_SRC, 'app/store/', this.sectionName);

    this.className = this.sectionName.split('-').map(this.capitalize).join('');
    this.classNameWithSpaces = this.sectionName.split('-').map(this.capitalize).join(' ');

    this.stateName = `${this.className}State`;
    this.serviceName = `${this.className}Service`;
    this.effectsName = `${this.className}Effects`;
    this.actionsName = `${this.className}Actions`;
  }

  public init(): void {
    if (!this.sectionName) {
      gutil.log(gutil.colors.red('Please provide a store section name'));
      process.exit(1);
    }

    if (this.skips.length === 0) {
      gutil.log(gutil.colors.cyan(`Creating all store files for ${this.sectionName}`));
    } else {
      gutil.log(gutil.colors.red(`Skipping ${this.skips.join(', ')} for ${this.sectionName}`));
    }

    this.writeFiles();
  }

  private writeFiles(): void {
    mkdir(this.path, () => {
      this.makeActionFiles();
      this.makeEffectsFiles();
      this.makeStateFiles();
      this.makeServiceFiles();
    });
  }

  private makeActionFiles(): void {
    const fullPath: string = join(this.path, `${this.sectionName}.actions.ts`);
    const fullSpecPath: string = join(this.path, `${this.sectionName}.actions.spec.ts`);

    if (this.include('actions')) {
      this.writeFile(fullPath, this.actionFile);
      if (this.include('specs')) {
        this.writeFile(fullSpecPath, this.actionSpecFile);
      }
    }
  }

  private makeEffectsFiles(): void {
    const fullPath: string = join(this.path, `${this.sectionName}.effects.ts`);
    const fullSpecPath: string = join(this.path, `${this.sectionName}.effects.spec.ts`);

    if (this.include('effects')) {
      this.writeFile(fullPath, this.effectFile);
      if (this.include('specs')) {
        this.writeFile(fullSpecPath, this.effectSpecFile);
      }
    }
  }

  private makeStateFiles(): void {
    const fullPath: string = join(this.path, `${this.sectionName}.state.ts`);
    const fullSpecPath: string = join(this.path, `${this.sectionName}.state.spec.ts`);

    if (this.include('state')) {
      this.writeFile(fullPath, this.stateFile);
      if (this.include('specs')) {
        this.writeFile(fullSpecPath, this.stateSpecFile);
      }
    }
  }

  private makeServiceFiles(): void {
    const fullPath: string = join(this.path, `${this.sectionName}.service.ts`);
    const fullSpecPath: string = join(this.path, `${this.sectionName}.service.spec.ts`);

    if (this.include('service')) {
      this.writeFile(fullPath, this.serviceFile);
      if (this.include('specs')) {
        this.writeFile(fullSpecPath, this.serviceSpecFile);
      }
    }
  }

  private include(storeSegmentType: string): boolean {
    return this.skips.indexOf(storeSegmentType) === -1;
  }

  private capitalize(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  private kebab(s: string): string {
    return s.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/\s+/g, '-').toLowerCase();
  }

  private writeFile(path: string, fileTemplate: string): void {
    writeFile(path, fileTemplate, { flag: 'wx' }, (err) => {
      if (err) {
        gutil.log(gutil.colors.red(`Skipping ${path}, it already exists!`));
      } else {
        gutil.log(gutil.colors.green(`Created ${path}`));
      }
    });
  }

  private logInstructions(): void {
    this.instructions.forEach((instruction: string) => {
      gutil.log(gutil.colors.white(instruction));
    });
  }

  private get instructions(): string[] {
    return [
      '',
      'usage:',
      '  npm run store.scaffold -- [args]',
      '',
      'args:',
      '--section',
      '  whatever you want the files and classes to be named',
      '  expects "kebab-case"',
      '',
      '--skip',
      '  if you want to skip a particular part of the store scaffolding',
      '  expects csv of valid options',
      '  valid options: specs,actions,effects,service,state',
      '',
      '--help',
      '  displays this message',
      '',
      'example:',
      '  npm run store.scaffold -- --section=some-section --skip=state',
      ''
    ];
  }

  private get actionFile(): string {
    return `import { Action } from '@ngrx/store';

export class ActionFactory { }

export class InternalActionFactory extends ActionFactory { }

export class SomeAction implements Action {
  public static readonly Type = '[${this.classNameWithSpaces}] Some Action';
  public readonly type = SomeAction.Type;
}

export type Any = SomeAction;
`;
  }

  private get actionSpecFile(): string {
    return `import { ActionFactory, InternalActionFactory } from './${this.sectionName}.actions';
import { ActionsSpecHelper } from '../spec-helpers/actions.spec-helper';

export function main() {
  describe('${this.classNameWithSpaces} Actions', () => {
    let actionsSpecHelper: ActionsSpecHelper = new ActionsSpecHelper();
  });
}
`;
  }

  private get effectFile(): string {
    return `import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';

import { AppStore } from '../../app.store';
import { ${this.serviceName} } from './${this.sectionName}.service';
import * as ${this.actionsName} from './${this.sectionName}.actions';

@Injectable()
export class ${this.effectsName} {
  constructor(private actions: Actions, private store: AppStore, private service: ${this.serviceName}) { }
}
`;
  }

  private get effectSpecFile(): string {
    return `import { ${this.effectsName} } from './${this.sectionName}.effects';
import * as ${this.actionsName} from './${this.sectionName}.actions';
import { EffectsSpecHelper, EffectTestParameters } from '../spec-helpers/effects.spec-helper';

export function main() {
  describe('${this.classNameWithSpaces} Effects', () => {
    const effectsSpecHelper: EffectsSpecHelper = new EffectsSpecHelper();

    function instantiator(): ${this.effectsName} {
      return new ${this.effectsName}(
        effectsSpecHelper.mockNgrxEffectsActions, effectsSpecHelper.mockStore, effectsSpecHelper.mockService
      );
    }
  });
}
`;
  }

  private get serviceFile(): string {
    return `import { Injectable } from '@angular/core';

import { FutureApiService } from '../api/api.service';
import { Api } from '../../shared/interfaces/api.interface';

@Injectable()
export class ${this.serviceName} {
  constructor(private apiService: FutureApiService) { }
}
`;
  }

  private get serviceSpecFile(): string {
    return `import { ${this.serviceName} } from './${this.sectionName}.service';
import { MockApiService, mockApiMatchers } from '../spec-helpers/mock-api.service';
import { Api } from '../../shared/interfaces/api.interface';

export function main() {
  describe('${this.classNameWithSpaces} Service', () => {
    let serviceUnderTest: ${this.serviceName}, mockApiService: MockApiService;

    beforeEach(() => {
      jasmine.addMatchers(mockApiMatchers);
      mockApiService = new MockApiService();
      serviceUnderTest = new ${this.serviceName}(mockApiService.injector);
    });
  });
}
`;
  }

  private get stateFile(): string {
    return `import * as ${this.actionsName} from './${this.sectionName}.actions';

export interface State { }

export const initialState: State = { };

export function reducer(state: State = initialState, action: ${this.actionsName}.Any): State {
  if (state === null) state = initialState;

  switch (action.type) {

    default: {
      return state;
    }

  }
}
`;
  }

  private get stateSpecFile(): string {
    return `import * as ${this.stateName} from './${this.sectionName}.state';
import * as ${this.actionsName} from './${this.sectionName}.actions';
import { StateSpecHelper } from '../spec-helpers/state.spec-helper';

export function main() {
  const stateSpecHelper: StateSpecHelper = new StateSpecHelper();

  describe('${this.classNameWithSpaces} Reducer', () => {
    stateSpecHelper.setReducerTestModules({
      actions: ${this.actionsName},
      state: ${this.stateName},
    });
  });
}
`;
  }
}

