import fs from 'fs';
import parseXml, { Element } from '@rgrove/parse-xml';

/**
 * File service
 */
class FileService {
  constructor() {
    /* Ensure single instance */
    return instance || this;
  }

  /**
   * Read file asynchronously
   *
   * @param file file to read
   *
   * @return string
   */
  async read(file: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      fs.readFile(file, (err, data) => {
        if (err) reject(err);
        resolve(data.toString());
      });
    });
  }

  /**
   * Write file asynchronously
   *
   * @param file file to write
   */
  async write(file: string, data: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      fs.writeFile(file, data, err => {
        if (err) reject(err);
        resolve();
      });
    });
  }

  /**
   * Read XML file
   *
   * @param file XML file to read
   *
   * @return root element
   */
  async readXml(file: string): Promise<Element> {
    const data = await this.read(file);
    const root = parseXml(data);
    return root.children[0] as Element;
    // TODO store in cache
  }
}

/** Singleton instance */
const instance = new FileService();
Object.freeze(instance);
export default instance;
