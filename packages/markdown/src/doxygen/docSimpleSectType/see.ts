import { Element } from '@rgrove/parse-xml';

import {
  Mappers,
  applyToChildrenGrouped,
  applyToChildren,
} from '../../mappers';
import { docParaType } from '..';

const template = ({ para }: any) => `
**See also**:

${para ? para.join('\n') + '\n' : ''}`;

const mappers = (): Mappers => ({
  para: docParaType,
});

export default (element: Element) => {
  const context = applyToChildrenGrouped(mappers())(element);

  return template(context);
};

export function inline(element: Element) {
  return applyToChildren(mappers())(element).join('').trim();
}
