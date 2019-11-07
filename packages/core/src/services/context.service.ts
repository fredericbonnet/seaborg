/** Root context data */
export type Root = {
  /** Name of file being generated */
  filename: string;

  /** Reference links */
  references: { [label: string]: { url: string; title?: string } };
};

/** State context data */
export type State = {
  /** Current language */
  language?: string;
};

/**
 * Context service interface
 */
export interface ContextService {
  /** Get current context */
  getCurrent(): Root & State;

  /** Set root context (resets stack) */
  setRoot(root: Partial<Root>): void;

  /** Add reference */
  addReference(label: string, url: string, title?: string): void;

  /** Push state in stack */
  pushState(state: State): void;

  /** Pop state from stack */
  popState(): State | undefined;
}

const defaultRoot: Partial<Root> = { references: {} };

/** Context service implementation */
class ContextServiceAdapter implements ContextService {
  constructor() {}

  /** Root context */
  private root: Root = {} as Root;

  /** State stack */
  private stack: State[] = [];

  getCurrent(): Root & State {
    return Object.assign({}, this.root, ...this.stack);
  }

  setRoot(root: Partial<Root>) {
    Object.assign(this.root, defaultRoot, root);
    this.stack = [];
  }

  addReference(label: string, url: string, title?: string) {
    this.root.references[label] = { url, title };
  }

  pushState(state: State) {
    this.stack.push(state);
  }

  popState() {
    return this.stack.pop();
  }
}

/**
 * Configuration service factory
 */
export class ContextServiceFactory {
  static create(): ContextService {
    return new ContextServiceAdapter();
  }
}

/** Singleton instance */
const instance: ContextService = ContextServiceFactory.create();
export default instance;

/** Get current context */
export function currentContext() {
  return instance.getCurrent();
}
