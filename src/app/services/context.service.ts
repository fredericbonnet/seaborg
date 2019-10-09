/** Context data */
export type Context = {
  /** Name of file being generated */
  filename: string;
};

/** Context service */
class ContextService {
  /** Current context */
  private context: Context = {} as Context;

  constructor() {
    /* Ensure single instance */
    return instance || this;
  }

  /** Get current context */
  getContext(): Context {
    return this.context;
  }

  /**
   * Set current context
   *
   * @return previous context
   */
  setContext(context: Context): Context {
    const oldContext = this.context;
    this.context = context;
    return oldContext;
  }
}

/** Singleton instance */
const instance = new ContextService();
export default instance;

/** Get current context */
export function currentContext() {
  return instance.getContext();
}
