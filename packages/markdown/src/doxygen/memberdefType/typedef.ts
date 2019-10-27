import { Element } from '@rgrove/parse-xml';
import Handlebars from 'handlebars';

import { Mappers, applyToChildrenGrouped, $default } from '../../mappers';
import { xsdString } from '../../generic';
import { linkedTextType, paramType } from '..';

import { mappers as defaultMappers } from '.';

const template = Handlebars.compile(
  `
<a id="{{id}}"></a>
### Typedef {{md name}}

{{location}}

\`\`\`c
{{definition}}{{argsstring}}
\`\`\`

{{> memberdef-description}}

{{#if param}}
**Parameters**:

{{#each param}}
* {{this}}
{{/each}}
{{/if}}

{{#if type}}**Return type**: {{type}}{{/if}}

{{> memberdef-references}}

{{TODO TODO}}
`,
  { noEscape: true }
);

const mappers = (): Mappers => ({
  ...defaultMappers(),
  type: linkedTextType,
  definition: xsdString,
  argsstring: xsdString,
  param: paramType,
});

export default (element: Element) => {
  const {
    attributes: { id },
  } = element;
  const context = applyToChildrenGrouped(mappers())(element);

  return template({ ...context, id, TODO: context[$default] });
};
