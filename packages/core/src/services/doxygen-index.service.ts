import path from 'path';
import { Element, NodeBase } from '@rgrove/parse-xml';
import { isUndefined } from 'util';

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
  NodeMappers,
  mapNodesWithValues,
  filterNodeValue,
  negate,
  groupValuesByNodeType,
  MapFunc,
} from '../operators';

/** Doxygen index file name */
const DOXYGEN_INDEX = 'index.xml';

/*
 * Operators
 */

/** Map empty strings or arrays to undefined */
const voidIfEmpty = (s: string | any[]) => (s && s.length ? s : undefined);

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

/** Filter compound by refid */
export const withRefId = (refid: string) => (compound: CompoundType) =>
  compound.refid === refid;

/** Filter compound having given member */
export const hasMember = (refid: string) => (compound: CompoundType) =>
  compound.members.some(member => member.refid === refid);

/*
 * Types
 */

/** Adapter interface for compounddef fields */
export interface FieldMappers {
  /** Mapper for xsd:string fields */
  xsdString: MapFunc<Element, string>;

  /** Mapper for descriptionType fields */
  descriptionType: MapFunc<Element, string>;
}

/**
 * Index service
 *
 * Holds all the info for the compounds and members discovered from the
 * main index file and compound files
 */
export class DoxygenIndexService {
  private state = {
    doxygen: {} as DoxygenType,
    fieldMappers: {} as FieldMappers,
  };

  /** Get Doxygen root */
  get doxygen() {
    return this.state.doxygen;
  }

  /** Get compounds */
  get compounds() {
    return this.state.doxygen.compounds;
  }

  constructor() {
    /* Ensure single instance */
    return instance || this;
  }

  /** 'Inject' dependencies */
  inject(fieldMappers: FieldMappers) {
    this.state.fieldMappers = fieldMappers;
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
    this.state.doxygen = { compounds, version };
    return this.state.doxygen;
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
    const mappers: NodeMappers<any> = {
      title: this.state.fieldMappers.xsdString,
      briefdescription: pipe(
        this.state.fieldMappers.descriptionType,
        voidIfEmpty
      ),
      innerdir: element => element.attributes.refid,
      innerfile: element => element.attributes.refid,
      innerclass: element => element.attributes.refid,
      innernamespace: element => element.attributes.refid,
      innerpage: element => element.attributes.refid,
      innergroup: element => element.attributes.refid,
    };
    const info = pipe(
      toChildren,
      mapNodesWithValues(mappers),
      filterNodeValue(negate(isUndefined)),
      groupValuesByNodeType(mappers)
    )(compounddef);

    return info;
  }
}

/** Singleton instance */
const instance = new DoxygenIndexService();
Object.freeze(instance);
export default instance;
