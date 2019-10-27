import { Element } from '@rgrove/parse-xml';
import Handlebars from 'handlebars';

import { Mappers, applyToChildrenGrouped, $default } from '../../mappers';
import { xsdString } from '../../generic';
import { linkedTextType, paramType } from '..';

import { mappers as defaultMappers } from '.';

const template = Handlebars.compile(
  `
<a id="{{id}}"></a>
### {{member-label kind}} {{md name}}

{{location}}

\`\`\`c
#define {{name}}{{argsstring}}{{#if initializer}} {{initializer}}{{/if}}
{{~#if param ~}}
( {{#each param}}{{this}}{{#unless @last}}, {{/unless}}{{/each }} )
{{/if}}
\`\`\`

{{> memberdef-description}}

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
  initializer: linkedTextType,
});

export default (element: Element) => {
  const {
    attributes: { kind, id },
  } = element;
  const context = applyToChildrenGrouped(mappers())(element);

  return template({ ...context, kind, id, TODO: context[$default] });
};
