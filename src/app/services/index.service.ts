import fs from 'fs';
import path from 'path';
import parseXml, { Element } from '@rgrove/parse-xml';

import configuration from './configuration.service';
import {
  DoxygenType,
  CompoundType,
  CompoundKind,
  MemberType,
  MemberKind,
} from '../models/doxygenindex';
import {
  withType,
  asElementNode,
  withName,
  toChildren,
  asTextNode,
  toText,
} from '../../operators';

const DOXYGEN_INDEX = 'index.xml';

/** Convert CompoundType XML to model */
const toCompoundType = (compound: Element): CompoundType => {
  const {
    attributes: { refid, kind },
  } = compound;
  const name = compound.children
    .filter(withType('element'))
    .map(asElementNode)
    .filter(withName('name'))
    .flatMap(toChildren)
    .filter(withType('text'))
    .map(asTextNode)
    .map(toText)
    .join('');
  const members = compound.children
    .filter(withType('element'))
    .map(asElementNode)
    .filter(withName('member'))
    .map(asElementNode)
    .map(toMemberType);

  return { name, members, refid, kind: kind as CompoundKind };
};

/** Comvert MemberType XML to model */
const toMemberType = (member: Element): MemberType => {
  const {
    attributes: { kind, refid },
  } = member;
  const name = member.children
    .filter(withType('element'))
    .map(asElementNode)
    .filter(withName('name'))
    .flatMap(toChildren)
    .filter(withType('text'))
    .map(asTextNode)
    .map(toText)
    .join('');

  return { name, refid, kind: kind as MemberKind };
};

/** Index service */
export class IndexService {
  private _doxygen: DoxygenType = {} as DoxygenType;
  get doxygen() {
    return this._doxygen;
  }

  constructor() {
    /* Ensure single instance */
    return instance || this;
  }

  /** Read & store Doxygen index from input directory */
  async read(): Promise<DoxygenType> {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(configuration.options.inputDir, DOXYGEN_INDEX),
        (err, data) => {
          if (err) reject(err);

          try {
            // Build model from XML data
            const root = parseXml(data.toString());
            const doxygenindex = root.children[0] as Element;
            const {
              attributes: { version },
            } = doxygenindex;
            const compounds: CompoundType[] = doxygenindex.children
              .filter(withType('element'))
              .map(asElementNode)
              .filter(withName('compound'))
              .map(toCompoundType);

            resolve({ compounds, version });
          } catch (e) {
            reject(e);
          }
        }
      );
    }).then(index => {
      // Store & return model
      Object.assign(this._doxygen, index);
      return this._doxygen;
    });
  }
}

/** Singleton instance */
const instance = new IndexService();
Object.freeze(instance);
export default instance;
