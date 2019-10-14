import { Element, Text, NodeBase } from '@rgrove/parse-xml';
import { isString } from 'util';
import {
  pipe,
  filter,
  MapFunc,
  toChildren,
  NodeMappers,
  MapNodeFunc,
  mapNode,
  mapElement,
  mapText,
  mapNodes,
  mapNodesWithValues,
  filterNodeValue,
  groupValuesByNodeType,
  GroupedValues,
} from '../operators';
export { $default, $text } from '../operators'; // TODO fix imports?

/** Node to string mappers */
export type Mappers = NodeMappers<string>;

/** Ignore node */
export const ignore = () => undefined;

/** Filter non-empty strings */
export const nonEmpty = (s: string | undefined) =>
  typeof s === 'string' && !!s.length;

/** Map empty strings or arrays to undefined */
export const voidIfEmpty = (s: string | any[]) =>
  s && s.length ? s : undefined;

/**
 * Apply mappers to an XML element node's children and return mapped strings in
 * order of occurrence
 *
 * @param mappers Mappers to apply
 *
 * @return XML element node to string array mapper function
 */
export const applyToChildren = (mappers: Mappers) =>
  pipe(
    toChildren,
    mapNodes(mappers),
    filter(isString)
  ) as MapFunc<Element, string[]>;

/**
 * Apply mappers to an XML element node's children and return mapped strings grouped
 * by child type, each in order of occurrence
 *
 * @note Elements matching the $default mapper are grouped under both $default
 * and their own element name
 *
 * @param mappers Mappers to apply
 *
 * @return XML element node to string dictionary mapper function
 */
export const applyToChildrenGrouped = (mappers: Mappers) =>
  pipe(
    toChildren,
    mapNodesWithValues(mappers),
    filterNodeValue(isString),
    groupValuesByNodeType(mappers)
  ) as MapFunc<Element, GroupedValues<string>>;

/** Map node to string */
export const applyToNode: MapNodeFunc<NodeBase, string> = mapNode;

/** Map element node to string */
export const applyToElement: MapNodeFunc<Element, string> = mapElement;

/** Map text node to string */
export const applyToText: MapNodeFunc<Text, string> = mapText;
