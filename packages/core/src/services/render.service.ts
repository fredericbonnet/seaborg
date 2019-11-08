import { Element } from '@rgrove/parse-xml';
import { DoxygenType, CompoundKind, CompoundType } from '../models';

/**
 * Render service interface
 */
export interface RenderService {
  mainPage(index: DoxygenType): string;
  globalContentsPage(index: DoxygenType): string;
  globalIndexPage(index: DoxygenType): string;
  compoundsContentsPage(kind: CompoundKind, compounds: CompoundType[]): string;
  compoundsIndexPage(kind: CompoundKind, compounds: CompoundType[]): string;
  compoundPage(element: Element): string;
}

/**
 * Render service registry
 */
export class RenderServiceRegistry {
  /** Registered instances */
  private static instances: { [name: string]: RenderService } = {};

  /** Register an instance */
  static register(name: string, instance: RenderService) {
    this.instances[name] = instance;
  }

  /** Get an instance from its registered name */
  static get(name: string): RenderService {
    return this.instances[name];
  }
}
