import { doxygenIndex } from '@seaborg/core/lib/services';
import { init as templateInit } from '@seaborg/markdown';
import { xsdString } from '@seaborg/markdown/lib/generic';
import { descriptionType } from '@seaborg/markdown/lib/doxygen';

export const init = async () => {
  // Inject doxygenIndex dependencies
  doxygenIndex.inject({ xsdString, descriptionType });

  // Initialize template generation
  templateInit();

  // Read & process Doxygen index file from input directory
  return doxygenIndex.read();
};
