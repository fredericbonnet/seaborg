import { Element } from '@rgrove/parse-xml';
import Handlebars from 'handlebars';

import { currentContext } from '@seaborg/core/lib/services';

import {
  Mappers,
  applyToChildrenGrouped,
  applyToChildren,
  $default,
} from '../../mappers';
import { xsdString } from '../../generic';
import { linkedTextType, enumvalueType } from '..';
import { def as enumvalueDef } from '../enumvalueType';

import { mappers as defaultMappers } from '.';

const template = Handlebars.compile(
  `
<a id="{{id}}"></a>
### {{member-label kind}} {{md name}}

{{language-badge language}}

{{location}}

\`\`\`{{language-code language}}
enum {{name}} {
  {{#each valuelist}}
  {{this}}{{#unless @last}},{{/unless}}
  {{/each}}
}
\`\`\`

{{> memberdef-description}}

{{> memberdef-references}}

{{#if enumvalue}}
{{#each enumvalue}}
{{this}}
{{/each}}
{{/if}}

{{TODO TODO}}
`,
  { noEscape: true }
);

const mappers = (): Mappers => ({
  ...defaultMappers(),
  type: linkedTextType,
  definition: xsdString,
  enumvalue: enumvalueType,
});

const valueMappers = (): Mappers => ({
  enumvalue: enumvalueDef,
});

export default (element: Element) => {
  const {
    attributes: { kind, id },
  } = element;
  const { language } = currentContext();
  const context = applyToChildrenGrouped(mappers())(element);
  const valuelist = applyToChildren(valueMappers())(element);

  return template({
    ...context,
    kind,
    id,
    language,
    valuelist,
    TODO: context[$default],
  });
};
