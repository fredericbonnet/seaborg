import { Element } from '@rgrove/parse-xml';
import Handlebars from 'handlebars';

import { Mappers, applyToChildrenGrouped, $default } from '../../mappers';
import { xsdString } from '../../generic';
import { linkedTextType, paramType, descriptionType, locationType } from '..';

const template = Handlebars.compile(
  `
<a id="{{id}}"></a>
### Function {{md name}}

{{location}}

\`\`\`c
{{definition}}{{argsstring}}
\`\`\`

{{> memberdef-description}}

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
  location: locationType,
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
