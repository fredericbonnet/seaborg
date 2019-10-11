import { Element } from '@rgrove/parse-xml';
import { Mappers, applyToChildrenGrouped, $default } from '..';
import Handlebars from 'handlebars';

import linkedTextType from '../linkedTextType';
import xsdString from '../xsd-string';
import paramType from '../paramType';
import descriptionType from '../descriptionType';

const template = Handlebars.compile(
  `
<a id="{{id}}"></a>
### Typedef {{md name}}

\`\`\`c
{{definition}}
\`\`\`

{{briefdescription}}

{{detaileddescription}}

{{inbodydescription}}

{{#if param}}**Parameters**:
{{#each param}}
* {{this}}
{{/each}}
{{/if}}

{{#if type}}**Return type**: {{type}}{{/if}}

{{TODO TODO}}
`,
  { noEscape: true }
);

const mappers = (): Mappers => ({
  type: linkedTextType,
  definition: xsdString,
  argsstring: xsdString,
  name: xsdString,
  param: paramType,
  briefdescription: descriptionType,
  detaileddescription: descriptionType,
  inbodydescription: descriptionType,
  //TODO
  [$default]: element => element.name + ' ' + JSON.stringify(element),
});

export default (element: Element) => {
  const {
    attributes: { id },
  } = element;
  const context = applyToChildrenGrouped(mappers())(element);

  return template({ ...context, id, TODO: context[$default] });
};
