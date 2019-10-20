/** Configuration options */
export type ConfigurationOptions = {
  /** Input directory path containing Doxygen XML files */
  inputDir: string;

  /** Output directory path for generated Markdown files */
  outputDir: string;

  /** Markdown file extension */
  mdExtension: string;

  /** Contents file suffix */
  contentsSuffix: string;

  /** Index file suffix */
  indexSuffix: string;
};

/** Default option values */
export const defaultOptions: Partial<
  ConfigurationOptions
> = require('./default-options.json');

/** Configuration service */
class ConfigurationService {
  private state = {
    options: defaultOptions as ConfigurationOptions,
  };
  get options() {
    return this.state.options;
  }

  /**
   * Set option values
   *
   * Missing options will use default values
   *
   * @param options Option values
   */
  setOptions(options: Partial<ConfigurationOptions>) {
    this.state.options = {
      ...defaultOptions,
      ...options,
    } as ConfigurationOptions;
  }

  constructor() {
    /* Ensure single instance */
    return instance || this;
  }
}

/** Singleton instance */
const instance = new ConfigurationService();
Object.freeze(instance);
export default instance;
