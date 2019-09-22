import { Element } from '@rgrove/parse-xml';
import { ElementTemplateMap, applyToChildren } from '..';

import xsdString from '../xsd-string';
import descriptionType from '../descriptionType';
import sectiondefType from '../sectiondefType';

export default (element: Element) =>
  [
    // Title and description
    ...applyToChildren({
      title: title => `# ${xsdString(title)}`,
      briefdescription: descriptionType,
      detaileddescription: descriptionType,
    })(element),

    // Remaining children
    ...applyToChildren({ sectiondef: sectiondefType })(element),
  ].join('\n\n');
