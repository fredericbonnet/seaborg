import { Element } from '@rgrove/parse-xml';
import Handlebars from 'handlebars';

import { Mappers, applyToChildrenGrouped, $default } from '../../mappers';
import { xsdString } from '../../generic';
import { linkedTextType, paramType } from '..';

import { mappers as defaultMappers } from '.';

const template = Handlebars.compile(
  `
<a id="{{id}}"></a>
### Macro {{md name}}

{{location}}

\`\`\`c
#define {{name}}
{{~#if param ~}}
( {{#each param}}{{this}}{{#unless @last}}, {{/unless}}{{/each }} )
{{/if}}
\`\`\`

{{> memberdef-description}}

{{#if type}}**Return type**: {{type}}{{/if}}

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
