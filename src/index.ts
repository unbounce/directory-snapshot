import { readFileSync } from 'graceful-fs';
import { relative } from 'path';

import { Item } from 'klaw-sync';
const klawSync: (
  path: string,
  opts: { filter: Function; noRecurseOnFailedFilter: boolean },
) => Item[] = require('klaw-sync');

export type File = {
  stats: {
    isDirectory: boolean;
    isFile: boolean;
    isSymbolicLink: boolean;
    isSocket: boolean;
  };
  path: string;
  contents: string;
};

export type DirectorySnapshot = {
  contents: File[];
};

const isSource = (item: Item) => item.path.indexOf('node_modules') < 0 && item.path.indexOf('.git') < 0;

export const directorySnapshot = (basePath: string): DirectorySnapshot => {
  const contents = klawSync(basePath, { filter: isSource, noRecurseOnFailedFilter: true }).map((item): File => {
    const { stats } = item;
    const path = relative(basePath, item.path);
    const contents = item.stats.isFile() ? readFileSync(item.path).toString() : '';

    return {
      stats: {
        isDirectory: stats.isDirectory(),
        isFile: stats.isFile(),
        isSymbolicLink: stats.isSymbolicLink(),
        isSocket: stats.isSocket(),
      },
      path,
      contents,
    };
  });

  return {
    contents,
  };
};

export const dss = directorySnapshot;
