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
const defaultOptions: Partial<ConfigurationOptions> = {
  mdExtension: '.md',
  contentsSuffix: '_contents',
  indexSuffix: '_index',
};

/** Configuration service */
class ConfigurationService {
  private state = {
    options: defaultOptions as ConfigurationOptions,
  };
  get options() {
    return this.state.options;
  }
  set options(options: ConfigurationOptions) {
    this.state.options = options;
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
