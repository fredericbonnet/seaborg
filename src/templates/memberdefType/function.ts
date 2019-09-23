import { Element } from '@rgrove/parse-xml';
import { TemplateMap, applyToChildren, $default } from '..';

import xsdString from '../xsd-string';
import descriptionType from '../descriptionType';

export default (element: Element) =>
  `
${
  // Title
  applyToChildren({
    name: (title: Element) => `### Function ${xsdString(title)}`,
  })(element).join('\n\n')
}

${
  // Definition
  // TODO language
  [
    '```c',
    applyToChildren({
      definition: xsdString,
      argsstring: xsdString,
    })(element).join(''),

    '```',
  ].join('\n')
}

${
  // Description
  applyToChildren({
    briefdescription: descriptionType,
    detaileddescription: descriptionType,
  })(element).join('\n\n')
}

${
  // Remaining children
  // TODO
  applyToChildren({
    [$default]: element => '* ' + element.name + ' ' + JSON.stringify(element),
  })(element).join('\n\n')
}
`;
