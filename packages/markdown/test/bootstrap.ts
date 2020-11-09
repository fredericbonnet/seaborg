import 'mocha';
import { expect } from 'chai';

import { configuration } from '@seaborg/core';
import { init } from '..';

import { descriptionType } from '../src/doxygen';

before(() => {
  configuration.setOptions({ inputDir: '.' });
  init();

  // Fix init order issue
  expect(descriptionType).not.to.be.undefined;
});
