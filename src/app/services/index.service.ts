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
} from '../models/doxygen';
import {
  withType,
  asElementNode,
  withName,
  toChildren,
  asTextNode,
  toText,
} from '../../operators';

import { applyToChildrenGrouped } from '../../templates';
import xsdString from '../../templates/xsd-string';
import descriptionType from '../../templates/descriptionType';

/** Doxygen index file name */
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

/** Read compound title and description from compound file */
const readCompoundInfo = (compound: CompoundType) =>
  new Promise((resolve, reject) => {
    // 1. Read compound file
    fs.readFile(
      path.join(configuration.options.inputDir, `${compound.refid}.xml`),
      (err, data) => {
        if (err) reject(err);

        try {
          // 2. Build model from XML data
          const root = parseXml(data.toString());
          const doxygen = root.children[0] as Element;

          // 3. Select compounddef
          const [compounddef] = doxygen.children
            .filter(withType('element'))
            .map(asElementNode)
            .filter(withName('compounddef'))
            .filter(
              compounddef => compounddef.attributes.id === compound.refid
            );

          // 4. Extract info
          const info = applyToChildrenGrouped({
            title: xsdString,
            briefdescription: element => {
              // Return trimmed, non-empty descriptions only
              const briefdescription = descriptionType(element).trim();
              return briefdescription.length ? briefdescription : undefined;
            },
          })(compounddef);

          resolve(info);
        } catch (e) {
          reject(e);
        }
      }
    );
  });

/**
 * Index service
 *
 * Holds all the info for the compounds and members discovered from the
 * main index file and compound files
 */
export class IndexService {
  private _doxygen: DoxygenType = {} as DoxygenType;
  get doxygen() {
    return this._doxygen;
  }

  constructor() {
    /* Ensure single instance */
    return instance || this;
  }

  /** Read & store Doxygen index file data from input directory */
  async read(): Promise<DoxygenType> {
    return new Promise<DoxygenType>((resolve, reject) => {
      // 1. Read main index file
      fs.readFile(
        path.join(configuration.options.inputDir, DOXYGEN_INDEX),
        (err, data) => {
          if (err) reject(err);

          try {
            // 2. Build model from XML data
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
    })
      .then(async index => {
        // 3. Extract compound title from each compound file
        const compounds = await Promise.all(
          index.compounds.map(async (compound: CompoundType) => ({
            ...compound,
            ...(await readCompoundInfo(compound)),
          }))
        );
        return { ...index, compounds };
      })
      .then(index => {
        // 4. Store & return model
        Object.assign(this._doxygen, index);
        return this._doxygen;
      });
  }

  /**
   * Find the compound containing the given member
   *
   * @param refid Member refid
   */
  findMemberCompound(refid: string) {
    const [compound] = this.doxygen.compounds.filter(compound =>
      compound.members.some(member => member.refid === refid)
    );
    return compound;
  }
}

/** Singleton instance */
const instance = new IndexService();
Object.freeze(instance);
export default instance;
