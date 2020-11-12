import { Element } from '@rgrove/parse-xml';

import { Mappers, applyToChildrenGrouped } from '../../mappers';
import { bulletItem, joinLines, joinParagraphs } from '../../helpers';
import { docParamListItem } from '..';

const template = ({ parameteritem }: any) =>
  parameteritem
    ? joinParagraphs([
        '**Exceptions**:',
        joinLines(parameteritem.map(bulletItem)),
      ])
    : '';

const mappers = (): Mappers => ({
  parameteritem: docParamListItem,
});

export default (element: Element) => {
  const context = applyToChildrenGrouped(mappers())(element);
  return template(context);
};
