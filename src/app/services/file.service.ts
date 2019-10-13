import fs from 'fs';
import parseXml, { Element } from '@rgrove/parse-xml';

/**
 * File service
 *
 * Read, parse & cache XML files.
 */
class FileService {
  constructor() {
    /* Ensure single instance */
    return instance || this;
  }

  /**
   * Read XML file
   *
   * @return root element
   */
  async readFile(file: string): Promise<Element> {
    return new Promise<Element>((resolve, reject) => {
      fs.readFile(file, (err, data) => {
        if (err) reject(err);

        try {
          const root = parseXml(data.toString());
          resolve(root.children[0] as Element);
          // TODO store in cache
        } catch (e) {
          reject(e);
        }
      });
    });
  }
}

/** Singleton instance */
const instance = new FileService();
Object.freeze(instance);
export default instance;
