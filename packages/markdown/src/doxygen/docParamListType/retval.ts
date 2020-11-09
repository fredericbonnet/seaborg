import { Element } from '@rgrove/parse-xml';

import { Mappers, applyToChildrenGrouped } from '../../mappers';
import { docParamListItem } from '..';

const item = (e: string) => `* ${e}`;
const template = ({ parameteritem }: any) => `
**Return values**:

${parameteritem ? parameteritem.map(item).join('\n') + '\n' : ''}`;

const mappers = (): Mappers => ({
  parameteritem: docParamListItem,
});

export default (element: Element) => {
  const context = applyToChildrenGrouped(mappers())(element);
  return template(context);
};
