import { Element } from '@rgrove/parse-xml';
import Handlebars from 'handlebars';

import { Mappers, applyToChildrenGrouped, $default } from '../../mappers';
import { xsdString } from '../../generic';
import { descriptionType, locationType, referenceType } from '..';

const template = Handlebars.compile(
  `
<a id="{{id}}"></a>
### {{kind}} {{md name}}

{{location}}

{{> memberdef-description}}

{{> memberdef-references}}

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
  references: referenceType,
  referencedby: referenceType,
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
