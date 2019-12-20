import path from 'path';

import {
  DoxygenType,
  CompoundType,
  CompoundKind,
} from '@seaborg/core/lib/models';
import {
  configuration,
  file,
  context,
  RenderServiceRegistry,
  RenderService,
} from '@seaborg/core/lib/services';

/**
 * File generator service interface
 */
export interface FileGeneratorService {
  /**
   * Generate main index file from Doxygen model
   *
   * @param index Doxygen index model
   *
   * @returns Output file name
   */
  generateMainIndexFile(index: DoxygenType): Promise<string>;

  /**
   * Generate global contents file from Doxygen model
   *
   * @param index Doxygen index model
   *
   * @returns Output file name
   */
  generateGlobalContentsFile(index: DoxygenType): Promise<string>;

  /**
   * Generate global index file from Doxygen model
   *
   * @param index Doxygen index model
   *
   * @returns Output file name
   */
  generateGlobalIndexFile(index: DoxygenType): Promise<string>;

  /**
   * Generate compound kind contents file from Doxygen models
   *
   * @param kind Doxygen compound kind
   * @param compounds Doxygen compound models
   *
   * @returns Output file name
   */
  generateCompoundContentsFile(
    kind: CompoundKind,
    compounds: CompoundType[]
  ): Promise<string>;

  /**
   * Generate compound kind index file from Doxygen models
   *
   * @param kind Doxygen compound kind
   * @param compounds Doxygen compound models
   *
   * @returns Output file name
   */
  generateCompoundIndexFile(
    kind: CompoundKind,
    compounds: CompoundType[]
  ): Promise<string>;

  /**
   * Generate compound file from Doxygen model
   *
   * @param compound Doxygen compound model
   *
   * @returns Output file name
   */
  generateCompoundFile(compound: CompoundType): Promise<string>;
}

/**
 * Markdown file generator service implementation
 */
class MarkdownFileGeneratorServiceAdapter implements FileGeneratorService {
  private render: RenderService;

  constructor() {
    this.render = RenderServiceRegistry.get('markdown');
  }

  async generateMainIndexFile(index: DoxygenType) {
    const { mdExtension } = configuration.options;
    const outputFile = `index${mdExtension}`;

    console.log(`Generating [index](${outputFile})`);

    context.setRoot({ filename: outputFile });
    await file.write(
      path.join(configuration.options.outputDir, outputFile),
      this.render.mainPage(index)
    );

    console.log(`Done [index](${outputFile})`);

    return outputFile;
  }

  async generateGlobalContentsFile(index: DoxygenType) {
    const { contentsSuffix, mdExtension } = configuration.options;
    const outputFile = `global${contentsSuffix}${mdExtension}`;

    console.log(`Generating [global contents](${outputFile})`);

    context.setRoot({ filename: outputFile });
    await file.write(
      path.join(configuration.options.outputDir, outputFile),
      this.render.globalContentsPage(index)
    );

    console.log(`Done [global contents](${outputFile})`);

    return outputFile;
  }

  async generateGlobalIndexFile(index: DoxygenType) {
    const { indexSuffix, mdExtension } = configuration.options;
    const outputFile = `global${indexSuffix}${mdExtension}`;

    console.log(`Generating [global index](${outputFile})`);

    context.setRoot({ filename: outputFile });
    await file.write(
      path.join(configuration.options.outputDir, outputFile),
      this.render.globalIndexPage(index)
    );

    console.log(`Done [global index](${outputFile})`);

    return outputFile;
  }

  async generateCompoundContentsFile(
    kind: CompoundKind,
    compounds: CompoundType[]
  ) {
    const { contentsSuffix, mdExtension } = configuration.options;
    const outputFile = `${kind}${contentsSuffix}${mdExtension}`;

    console.log(`Generating [${kind} contents](${outputFile})`);

    context.setRoot({ filename: outputFile });
    await file.write(
      path.join(configuration.options.outputDir, outputFile),
      this.render.compoundsContentsPage(kind, compounds)
    );

    console.log(`Done [${kind} contents](${outputFile})`);

    return outputFile;
  }

  async generateCompoundIndexFile(
    kind: CompoundKind,
    compounds: CompoundType[]
  ) {
    const { indexSuffix, mdExtension } = configuration.options;
    const outputFile = `${kind}${indexSuffix}${mdExtension}`;

    console.log(`Generating [${kind} index](${outputFile})`);

    context.setRoot({ filename: outputFile });
    await file.write(
      path.join(configuration.options.outputDir, outputFile),
      this.render.compoundsIndexPage(kind, compounds)
    );

    console.log(`Done [${kind} index](${outputFile})`);

    return outputFile;
  }

  async generateCompoundFile(compound: CompoundType) {
    const { mdExtension } = configuration.options;
    const inputFile = `${compound.refid}.xml`;
    const outputFile = `${compound.refid}${mdExtension}`;

    console.log(
      `Generating ${compound.kind} [${compound.name}](${outputFile})`
    );

    const doxygen = await file.readXml(
      path.join(configuration.options.inputDir, inputFile)
    );

    context.setRoot({ filename: outputFile });
    await file.write(
      path.join(configuration.options.outputDir, outputFile),
      this.render.compoundPage(doxygen)
    );

    console.log(`Done ${compound.kind} [${compound.name}](${outputFile})`);

    return outputFile;
  }
}

/** File generator service factory */
export class FileGeneratorServiceFactory {
  static create() {
    return new MarkdownFileGeneratorServiceAdapter();
  }
}

/** Singleton instance */
const instance: FileGeneratorService = FileGeneratorServiceFactory.create();
export default instance;
