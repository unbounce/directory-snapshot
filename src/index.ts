import { readFileSync } from 'graceful-fs';
import { relative } from 'path';

import { Item } from 'klaw-sync';
const klawSync: (path: string) => Item[] = require('klaw-sync');

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

export const directorySnapshot = (basePath: string): DirectorySnapshot => {
  const contents = klawSync(basePath).map((item): File => {
    const { stats } = item;
    const path = relative(basePath, item.path);
    const contents = item.stats.isDirectory() ? '' : readFileSync(item.path).toString();

    JSON.stringify(item.stats);

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
