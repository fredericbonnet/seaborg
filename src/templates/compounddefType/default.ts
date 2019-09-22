import { Element } from '@rgrove/parse-xml';
import { ElementTemplateMap, applyToChildren, ElementTemplate } from '..';

import xsdString from '../xsd-string';
import descriptionType from '../descriptionType';
import sectiondefType from '../sectiondefType';

// TODO map kind to string
const titleTemplate = (kind: string) => (title: Element) =>
  `# ${kind} ${xsdString(title)}`;

const templates: ElementTemplateMap = {
  briefdescription: descriptionType,
  detaileddescription: descriptionType,
  sectiondef: sectiondefType,
};

export default (compounddef: Element) => {
  const {
    attributes: { kind },
  } = compounddef;

  return applyToChildren({ title: titleTemplate(kind), ...templates })(
    compounddef
  ).join('\n\n');
};
