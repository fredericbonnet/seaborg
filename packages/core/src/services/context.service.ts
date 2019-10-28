/** Root context data */
export type Root = {
  /** Name of file being generated */
  filename: string;

  /** Reference links */
  references: { [label: string]: { url: string; title?: string } };
};

const defaultRoot: Partial<Root> = { references: {} };

/** State context data */
export type State = {
  /** Current language */
  language?: string;
};

/** Context service */
class ContextService {
  private state = {
    /** Root context */
    root: {} as Root,

    /** State stack */
    stack: [] as State[],
  };

  constructor() {
    /* Ensure single instance */
    return instance || this;
  }

  /** Get current context */
  getCurrent(): Root & State {
    return Object.assign({}, this.state.root, ...this.state.stack);
  }

  /** Set root context (resets stack) */
  setRoot(root: Partial<Root>) {
    Object.assign(this.state.root, defaultRoot, root);
    this.state.stack = [];
  }

  /** Add reference */
  addReference(label: string, url: string, title?: string) {
    this.state.root.references[label] = { url, title };
  }

  /** Push state in stack */
  pushState(state: State) {
    this.state.stack.push(state);
  }

  /** Pop state from stack */
  popState() {
    return this.state.stack.pop();
  }
}

/** Singleton instance */
const instance = new ContextService();
Object.freeze(instance);
export default instance;

/** Get current context */
export function currentContext() {
  return instance.getCurrent();
}
