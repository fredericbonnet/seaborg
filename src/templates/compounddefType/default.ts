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

export default (element: Element) => {
  const {
    attributes: { kind },
  } = element;

  return applyToChildren({ title: titleTemplate(kind), ...templates })(
    element
  ).join('\n\n');
};
