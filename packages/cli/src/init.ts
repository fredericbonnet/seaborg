import { workerData, parentPort } from 'worker_threads';
import * as Comlink from 'comlink';
import nodeEndpoint from 'comlink/dist/umd/node-adapter';

import { configuration, doxygenIndex } from '@seaborg/core/lib/services';
import { init as templateInit } from '@seaborg/markdown';
import { xsdString } from '@seaborg/markdown/lib/generic';
import { descriptionType } from '@seaborg/markdown/lib/doxygen';

import { FileGeneratorServiceFactory } from './services/file-generator.service';

/** Initialize app from main thread */
export const init = async () => {
  // Inject doxygenIndex dependencies
  doxygenIndex.inject({ xsdString, descriptionType });

  // Initialize template generation
  templateInit();

  // Read & process Doxygen index file from input directory
  return doxygenIndex.read();
};

/** Initialize app from worker thread */
export const initWorker = () => {
  // Restore service states from worker data
  configuration.setOptions(workerData.configuration.options);
  doxygenIndex.restore(workerData.doxygenIndex.data);

  // Inject doxygenIndex dependencies
  doxygenIndex.inject({ xsdString, descriptionType });

  // Initialize template generation
  templateInit();

  // Expose file generator service through Comlink
  const fileGenerator = FileGeneratorServiceFactory.create();
  // @ts-ignore
  Comlink.expose(fileGenerator, nodeEndpoint(parentPort));
};
