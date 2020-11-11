import { Element } from '@rgrove/parse-xml';

import { Mappers, applyToChildrenGrouped } from '../../mappers';
import { joinLines, joinParagraphs } from '../../helpers';
import { docParamListItem } from '..';

const item = (e: string) => `* ${e}`;
const template = ({ parameteritem }: any) =>
  parameteritem
    ? joinParagraphs(['**Exceptions**:', joinLines(parameteritem.map(item))])
    : '';

const mappers = (): Mappers => ({
  parameteritem: docParamListItem,
});

export default (element: Element) => {
  const context = applyToChildrenGrouped(mappers())(element);
  return template(context);
};
