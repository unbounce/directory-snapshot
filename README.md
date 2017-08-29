# directory-snapshot

Given any directory, reads all files into memory so that it can be serialized as a snapshot
([Jest](https://github.com/facebook/jest) or [Ava](https://github.com/avajs/ava)). Useful for
testing tools that write to the file system.

### Use

```ts
import { execSync } from 'child_process';
import { dss } from 'directory-snapshot';

test('creates a new project', () => {
  execSync('my-tool-that-writes-to-fs new-project');
  expect(dss('./new-project')).toMatchSnapshot();
});
```

### Install

```
yarn add directory-snapshot
```

### License

MIT