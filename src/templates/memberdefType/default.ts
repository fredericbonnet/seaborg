import { Element } from '@rgrove/parse-xml';
import { TemplateMap, applyToChildren, $default } from '..';

import xsdString from '../xsd-string';
import descriptionType from '../descriptionType';

// TODO map kind to string
const nameTemplate = (kind: string) => (title: Element) =>
  `### ${kind} ${xsdString(title)}`;

// TODO
const templates: TemplateMap = {
  briefdescription: descriptionType,
  detaileddescription: descriptionType,
  [$default]: element => element.name + ' ' + JSON.stringify(element),
};

export default (element: Element) => {
  const {
    attributes: { kind },
  } = element;
  return applyToChildren({ name: nameTemplate(kind), ...templates })(
    element
  ).join('\n\n');
};
