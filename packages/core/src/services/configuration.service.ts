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

  /** Protection levels to exclude from output (e.g. "private") */
  excludeProtectionLevels: string[];
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

  options: ConfigurationOptions = {
    ...defaultOptions,
    // Fix strange issue with empty arrays being coalesced to never[]
    excludeProtectionLevels: defaultOptions.excludeProtectionLevels as string[],
  } as ConfigurationOptions;

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

/** Default configuration service factory */
export class ConfigurationServiceFactory {
  static create() {
    return new ConfigurationServiceAdapter();
  }
}

/** Singleton instance */
const instance: ConfigurationService = ConfigurationServiceFactory.create();
export default instance;
