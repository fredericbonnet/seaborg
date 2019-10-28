/** Context data */
export type Context = {
  /** Name of file being generated */
  filename: string;

  /** Current language */
  language?: string;
};

/** Context service */
class ContextService {
  private state = {
    /** Root context */
    root: {} as Context,

    /** State stack */
    stack: [] as Partial<Context>[],
  };

  constructor() {
    /* Ensure single instance */
    return instance || this;
  }

  /** Get current context */
  getCurrent(): Context {
    return Object.assign({}, this.state.root, ...this.state.stack);
  }

  /** Set root context (resets stack) */
  setRoot(context: Context) {
    this.state.root = context;
    this.state.stack = [];
  }

  /** Push state in stack */
  pushState(state: Partial<Context>) {
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
