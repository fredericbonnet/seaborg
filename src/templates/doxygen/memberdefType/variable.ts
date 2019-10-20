import { Element } from '@rgrove/parse-xml';
import { Mappers, applyToChildrenGrouped, $default } from '../..';
import Handlebars from 'handlebars';

import linkedTextType from '../linkedTextType';
import xsdString from '../../xsd-string';
import descriptionType from '../descriptionType';
import locationType from '../locationType';

const template = Handlebars.compile(
  `
<a id="{{id}}"></a>
### Variable {{md name}}

{{location}}

\`\`\`c
{{definition}}
\`\`\`

{{briefdescription}}

{{detaileddescription}}

{{inbodydescription}}

{{#if type}}**Type**: {{type}}{{/if}}

{{TODO TODO}}
`,
  { noEscape: true }
);

const mappers = (): Mappers => ({
  type: linkedTextType,
  definition: xsdString,
  name: xsdString,
  briefdescription: descriptionType,
  detaileddescription: descriptionType,
  inbodydescription: descriptionType,
  location: locationType,
  //TODO
  [$default]: element => element.name + ' ' + JSON.stringify(element),
});

// TODO attributes (e.g. static)
export default (element: Element) => {
  const {
    attributes: { id },
  } = element;
  const context = applyToChildrenGrouped(mappers())(element);

  return template({ ...context, id, TODO: context[$default] });
};
