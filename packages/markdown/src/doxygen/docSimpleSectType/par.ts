import { Element } from '@rgrove/parse-xml';

import { Mappers, applyToChildrenGrouped } from '../../mappers';
import { docTitleType, docParaType } from '..';

const template = ({ title, para }: any) => `
**${title}**:

${para ? para.join('\n') + '\n' : ''}`;

const mappers = (): Mappers => ({
  title: docTitleType,
  para: docParaType,
});

export default (element: Element) => {
  const context = applyToChildrenGrouped(mappers())(element);

  return template(context);
};
