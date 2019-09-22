import { Element } from '@rgrove/parse-xml';
import { ElementTemplateMap, applyToChildren, ElementTemplate } from '..';

import xsdStringTemplate from '../xsd_string';
import descriptionTemplate from '../description';
import sectiondefTemplate from '../sectiondef';

// TODO map kind to string
const titleTemplate = (kind: string) => (title: Element) =>
  `# ${kind} ${xsdStringTemplate(title)}`;

const templates: ElementTemplateMap = {
  briefdescription: descriptionTemplate,
  detaileddescription: descriptionTemplate,
  sectiondef: sectiondefTemplate,
};

export default (compounddef: Element) => {
  const {
    attributes: { kind },
  } = compounddef;

  return applyToChildren({ title: titleTemplate(kind), ...templates })(
    compounddef
  ).join('\n\n');
};
