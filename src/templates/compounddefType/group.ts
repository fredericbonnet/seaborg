import { Element } from '@rgrove/parse-xml';
import { applyToChildren, $default } from '..';

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
    // TODO
    ...applyToChildren({
      sectiondef: sectiondefType,
      [$default]: element => element.name + ' ' + JSON.stringify(element),
    })(element),
  ].join('\n\n');
