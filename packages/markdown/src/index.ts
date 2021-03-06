import {
  RenderService,
  RenderServiceRegistry,
} from '@seaborg/core/lib/services';

import {
  mainPage,
  globalContentsPage,
  globalIndexPage,
  compoundsContentsPage,
  compoundsIndexPage,
} from './doxygen-index';
import { compoundPage } from './doxygen';

export * from './helpers';
export * from './operators';

export function init() {
  // Nothing to do
}

/**
 * Markdown render service implementation
 */
class MarkdownRenderServiceAdapter implements RenderService {
  constructor() {}

  mainPage = mainPage;
  globalContentsPage = globalContentsPage;
  globalIndexPage = globalIndexPage;
  compoundsContentsPage = compoundsContentsPage;
  compoundsIndexPage = compoundsIndexPage;
  compoundPage = compoundPage;
}

RenderServiceRegistry.register('markdown', new MarkdownRenderServiceAdapter());
