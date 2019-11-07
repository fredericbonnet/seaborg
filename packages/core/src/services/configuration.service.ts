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

  /** Prefix string/regexp to ignore in index pages */
  ignorePrefix: string;
};

/**
 * Configuration service interface
 */
export interface ConfigurationService {
  /** Current options */
  readonly options: ConfigurationOptions;

  /**
   * Get regular expression for ignored prefix in indexes
   */
  getIgnoredPrefixRE(): RegExp;

  /**
   * Set option values
   *
   * Missing options will use default values
   *
   * @param options Option values
   */
  setOptions(options: Partial<ConfigurationOptions>): void;
}

/** Default option values */
import defaultOptions from './default-options.json';

/**
 * Configuration service implementation
 */
class ConfigurationServiceAdapter implements ConfigurationService {
  constructor() {}

  options: ConfigurationOptions = defaultOptions as ConfigurationOptions;

  getIgnoredPrefixRE() {
    return new RegExp(`^(${this.options.ignorePrefix})`);
  }
  setOptions(options: Partial<ConfigurationOptions>) {
    this.options = {
      ...defaultOptions,
      ...options,
    } as ConfigurationOptions;
  }
}

/** Singleton instance */
const instance: ConfigurationService = new ConfigurationServiceAdapter();
export default instance;
