import path from 'path';
import { Element, NodeBase } from '@rgrove/parse-xml';

import configuration from './configuration.service';
import file from './file.service';
import {
  DoxygenType,
  CompoundType,
  CompoundKind,
  MemberType,
  MemberKind,
} from '../models/doxygen';
import {
  PipeFunc,
  pipe,
  filter,
  map,
  flatMap,
  toChildren,
  toText,
  withAttribute,
  filterElements,
  selectTexts,
} from '../../operators';

import { applyToChildrenGrouped, voidIfEmpty } from '../../templates';
import xsdString from '../../templates/xsd-string';
import descriptionType from '../../templates/descriptionType';

/** Doxygen index file name */
const DOXYGEN_INDEX = 'index.xml';

/*
 * Operators
 */

/** Convert CompoundType XML to model */
const toCompoundType = (compound: Element): CompoundType => {
  const {
    attributes: { refid, kind },
  } = compound;
  const name = pipe(
    filterElements('name'),
    flatMap(toChildren),
    selectTexts,
    map(toText)
  )(compound.children).join('');
  const members = pipe(
    filterElements('member'),
    map(toMemberType)
  )(compound.children);

  return { name, members, refid, kind: kind as CompoundKind };
};

/** Comvert MemberType XML to model */
const toMemberType = (member: Element): MemberType => {
  const {
    attributes: { kind, refid },
  } = member;
  const name = pipe(
    filterElements('name'),
    flatMap(toChildren),
    selectTexts,
    map(toText)
  )(member.children).join('');

  return { name, refid, kind: kind as MemberKind };
};

/** Select compound elements */
const selectCompounds = pipe(
  filterElements('compound'),
  map(toCompoundType)
) as PipeFunc<NodeBase[], CompoundType[]>;

/** Filter compounddef elements by ID */
const filterCompounddef = (refid: string) =>
  pipe(
    filterElements('compounddef'),
    filter(withAttribute('id', refid))
  ) as PipeFunc<NodeBase[], Element[]>;

/**
 * Index service
 *
 * Holds all the info for the compounds and members discovered from the
 * main index file and compound files
 */
export class DoxygenIndexService {
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
    // 1. Read main index file
    const doxygenindex = await file.readFile(
      path.join(configuration.options.inputDir, DOXYGEN_INDEX)
    );
    const {
      attributes: { version },
    } = doxygenindex;

    // 2. Extract compound info from each compound file
    const compounds = await Promise.all(
      selectCompounds(doxygenindex.children).map(
        async (compound: CompoundType) => ({
          ...compound,
          ...(await this.readCompoundInfo(compound)),
        })
      )
    );

    // 3. Store & return model
    Object.assign(this._doxygen, { compounds, version });
    return this._doxygen;
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

  /** Read compound title and description from compound file */
  private async readCompoundInfo(compound: CompoundType) {
    // 1. Read compound file
    const doxygen = await file.readFile(
      path.join(configuration.options.inputDir, `${compound.refid}.xml`)
    );

    // 2. Select compounddef
    const [compounddef] = filterCompounddef(compound.refid)(doxygen.children);

    // 3. Extract info
    const info = applyToChildrenGrouped({
      title: xsdString,
      briefdescription: pipe(
        descriptionType,
        voidIfEmpty
      ),
    })(compounddef);

    return info;
  }
}

/** Singleton instance */
const instance = new DoxygenIndexService();
Object.freeze(instance);
export default instance;
