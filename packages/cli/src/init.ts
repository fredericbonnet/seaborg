import { isMainThread, workerData } from 'worker_threads';

import { configuration, doxygenIndex } from '@seaborg/core/lib/services';
import { init as templateInit } from '@seaborg/markdown';
import { xsdString } from '@seaborg/markdown/lib/generic';
import { descriptionType } from '@seaborg/markdown/lib/doxygen';

export const init = async () => {
  if (!isMainThread) {
    // Restore service states
    configuration.setOptions(workerData.configuration.options);
  }

  // Inject doxygenIndex dependencies
  doxygenIndex.inject({ xsdString, descriptionType });

  // Initialize template generation
  templateInit();

  if (isMainThread) {
    // Read & process Doxygen index file from input directory
    return doxygenIndex.read();
  } else {
    // Restore from main thread data
    return doxygenIndex.restore(workerData.doxygenIndex.data);
  }
};
