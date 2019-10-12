import { Element } from '@rgrove/parse-xml';
import { Mappers, applyToChildrenGrouped, $default } from '..';
import Handlebars from 'handlebars';

import xsdString from '../xsd-string';
import descriptionType from '../descriptionType';
import locationType from '../locationType';

const template = Handlebars.compile(
  `
<a id="{{id}}"></a>
### {{kind}} {{md name}}

{{location}}

{{briefdescription}}

{{detaileddescription}}

{{inbodydescription}}

{{TODO TODO}}
`,
  { noEscape: true }
);

const mappers = (): Mappers => ({
  name: xsdString,
  briefdescription: descriptionType,
  detaileddescription: descriptionType,
  inbodydescription: descriptionType,
  location: locationType,
  //TODO
  [$default]: element => element.name + ' ' + JSON.stringify(element),
});

export default (element: Element) => {
  // TODO map kind to string
  const {
    attributes: { kind, id },
  } = element;
  const context = applyToChildrenGrouped(mappers())(element);

  return template({ ...context, kind, id, TODO: context[$default] });
};
