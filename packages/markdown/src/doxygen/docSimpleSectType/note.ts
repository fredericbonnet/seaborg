import { Element } from '@rgrove/parse-xml';

import { Mappers, applyToChildrenGrouped } from '../../mappers';
import { docParaType } from '..';

const template = ({ para }: any) => `
?> ${para ? para.join('\\\n') : ''}
`;

const mappers = (): Mappers => ({
  para: docParaType,
});

export default (element: Element) => {
  const context = applyToChildrenGrouped(mappers())(element);

  return template(context);
};
