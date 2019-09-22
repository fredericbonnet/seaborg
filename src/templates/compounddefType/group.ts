import { Element } from '@rgrove/parse-xml';
import { ElementTemplateMap, applyToChildren } from '..';

import xsdString from '../xsd-string';
import descriptionType from '../descriptionType';
import sectiondefType from '../sectiondefType';

const templates: ElementTemplateMap = {
  title: title => `# ${xsdString(title)}`,
  briefdescription: descriptionType,
  detaileddescription: descriptionType,
  sectiondef: sectiondefType,
};

export default (compounddef: Element) =>
  applyToChildren(templates)(compounddef).join('\n\n');
