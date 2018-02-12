import { rootDir } from '../config/rootdir';

export const log: Function = (message: string = ''): void => {
  console.log(`  ${message}`);
}

export const abbreviate: Function = (oneOrMoreFilenames: string | string[]): string | string[] => {
  // one filename string
  if (typeof oneOrMoreFilenames === 'string') return oneOrMoreFilenames.replace(rootDir, '');

  // multiple filename strings
  return oneOrMoreFilenames.map(filename => abbreviate(filename));
}
