"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graceful_fs_1 = require("graceful-fs");
var path_1 = require("path");
var klawSync = require('klaw-sync');
exports.directorySnapshot = function (basePath) {
    var contents = klawSync(basePath).map(function (item) {
        var stats = item.stats;
        var path = path_1.relative(basePath, item.path);
        var contents = item.stats.isDirectory() ? '' : graceful_fs_1.readFileSync(item.path).toString();
        JSON.stringify(item.stats);
        return {
            stats: {
                isDirectory: stats.isDirectory(),
                isFile: stats.isFile(),
                isSymbolicLink: stats.isSymbolicLink(),
                isSocket: stats.isSocket(),
            },
            path: path,
            contents: contents,
        };
    });
    return {
        contents: contents,
    };
};
exports.dss = exports.directorySnapshot;
//# sourceMappingURL=index.js.map