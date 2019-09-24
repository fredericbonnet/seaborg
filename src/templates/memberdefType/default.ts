import { Element } from '@rgrove/parse-xml';
import { TemplateMap, applyToChildrenGrouped, $default } from '..';
import Handlebars from 'handlebars';

import xsdString from '../xsd-string';
import descriptionType from '../descriptionType';

const template = Handlebars.compile(
  `
### {{kind}} {{name}}

{{briefdescription}}

{{detaileddescription}}
`,
  { noEscape: true }
);

const templates: TemplateMap = {
  name: xsdString,
  briefdescription: descriptionType,
  detaileddescription: descriptionType,
  //TODO
  [$default]: element => '* ' + element.name + ' ' + JSON.stringify(element),
};

export default (element: Element) => {
  // TODO map kind to string
  const {
    attributes: { kind },
  } = element;
  const context = applyToChildrenGrouped(templates)(element);

  return template({ ...context, kind }) + '\n\n' + context[$default].join('\n');
};
