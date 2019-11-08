import 'mocha';

import { configuration } from '@seaborg/core';
import { init } from '..';

before(() => {
  configuration.setOptions({ inputDir: '.' });
  init();
});
