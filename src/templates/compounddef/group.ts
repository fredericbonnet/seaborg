import { Element } from '@rgrove/parse-xml';
import { ElementTemplateMap, applyToChildren } from '..';

import xsdStringTemplate from '../xsd_string';
import descriptionTemplate from '../description';
import sectiondefTemplate from '../sectiondef';

const templates: ElementTemplateMap = {
  title: title => `# ${xsdStringTemplate(title)}`,
  briefdescription: descriptionTemplate,
  detaileddescription: descriptionTemplate,
  sectiondef: sectiondefTemplate,
};

export default (compounddef: Element) =>
  applyToChildren(templates)(compounddef).join('\n\n');
