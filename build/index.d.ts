export declare type File = {
    stats: {
        isDirectory: boolean;
        isFile: boolean;
        isSymbolicLink: boolean;
        isSocket: boolean;
    };
    path: string;
    contents: string;
};
export declare type DirectorySnapshot = {
    contents: File[];
};
export declare const directorySnapshot: (basePath: string) => DirectorySnapshot;
export declare const dss: (basePath: string) => DirectorySnapshot;
