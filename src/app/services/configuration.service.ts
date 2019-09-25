/** Configuration options */
export type ConfigurationOptions = {
  /** Input directory path containing Doxygen XML files */
  inputDir: string;

  /** Output directory path for generated Markdown files */
  outputDir: string;
};

/** Configuration service */
class ConfigurationService {
  private _options: ConfigurationOptions = {} as ConfigurationOptions;
  get options() {
    return this._options;
  }
  set options(options: ConfigurationOptions) {
    Object.assign(this._options, options);
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
