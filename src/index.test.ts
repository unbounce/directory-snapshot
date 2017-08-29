import { dss } from './index';

describe('directory', () => {
  test('creates a serializable directory', () => {
    expect(dss('./src/__tests__/project')).toMatchSnapshot();
  });
});
