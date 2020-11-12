import { Element } from '@rgrove/parse-xml';

import { Mappers, applyToChildrenGrouped } from '../../mappers';
import { sectionList } from '../../helpers';
import { docParamListItem } from '..';

const template = ({ parameteritem }: any) =>
  sectionList('Parameters', parameteritem);

const mappers = (): Mappers => ({
  parameteritem: docParamListItem,
});

export default (element: Element) => {
  const context = applyToChildrenGrouped(mappers())(element);
  return template(context);
};
