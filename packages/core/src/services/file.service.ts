import fs from 'fs';
import parseXml, { Element } from '@rgrove/parse-xml';

/**
 * File service interface
 */
export interface FileService {
  /**
   * Read file asynchronously
   *
   * @param file file to read
   *
   * @return string
   */
  read(file: string): Promise<string>;

  /**
   * Write file asynchronously
   *
   * @param file file to write
   */
  write(file: string, data: string): Promise<void>;

  /**
   * Read XML file
   *
   * @param file XML file to read
   *
   * @return root element
   */
  readXml(file: string): Promise<Element>;
}

/**
 * File service implementation over `fs` package
 */
class FileServiceAdapter implements FileService {
  constructor() {}

  async read(file: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      fs.readFile(file, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data.toString());
        }
      });
    });
  }

  async write(file: string, data: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      fs.writeFile(file, data, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  async readXml(file: string): Promise<Element> {
    const data = await this.read(file);
    const root = parseXml(data);
    return root.children[0] as Element;
    // TODO store in cache
  }
}

/**
 * Configuration service factory
 */
export class FileServiceFactory {
  static create(): FileService {
    return new FileServiceAdapter();
  }
}

/** Singleton instance */
const instance: FileService = FileServiceFactory.create();
export default instance;
