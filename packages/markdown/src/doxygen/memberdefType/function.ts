import { Element } from '@rgrove/parse-xml';
import Handlebars from 'handlebars';

import { Mappers, applyToChildrenGrouped, $default } from '../../mappers';
import { xsdString } from '../../generic';
import { linkedTextType, paramType, reimplementType } from '..';

import { mappers as defaultMappers, templateContext } from '.';

const template = Handlebars.compile(
  `
<a id="{{id}}"></a>
### {{member-label kind}} {{md name}}

{{language-badge language}}

{{location}}

\`\`\`{{language-code language}}
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

{{#if reimplements}}**Reimplements**: {{reimplements}}{{/if}}

{{#if reimplementedby}}
**Reimplemented by**: 

{{#each reimplementedby}}
* {{this}}
{{/each}}
{{/if}}


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
  reimplements: reimplementType,
  reimplementedby: reimplementType,
});

export default (element: Element) => {
  const context = applyToChildrenGrouped(mappers())(element);

  return template({
    ...templateContext(element),
    ...context,
    TODO: context[$default],
  });
};
