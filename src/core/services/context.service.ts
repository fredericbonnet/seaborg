/** Context data */
export type Context = {
  /** Name of file being generated */
  filename: string;
};

/** Context service */
class ContextService {
  private state = {
    /** Current context */
    context: {} as Context,
  };

  constructor() {
    /* Ensure single instance */
    return instance || this;
  }

  /** Get current context */
  getContext(): Context {
    return this.state.context;
  }

  /**
   * Set current context
   *
   * @return previous context
   */
  setContext(context: Context): Context {
    const oldContext = this.state.context;
    this.state.context = context;
    return oldContext;
  }
}

/** Singleton instance */
const instance = new ContextService();
Object.freeze(instance);
export default instance;

/** Get current context */
export function currentContext() {
  return instance.getContext();
}
