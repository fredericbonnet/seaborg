import { Element } from '@rgrove/parse-xml';
import Handlebars from 'handlebars';

import { currentContext } from '@seaborg/core/lib/services';

import { Mappers, applyToChildrenGrouped, $default } from '../../mappers';
import { xsdString } from '../../generic';
import { linkedTextType } from '..';

import { mappers as defaultMappers } from '.';

const template = Handlebars.compile(
  `
<a id="{{id}}"></a>
### {{member-label kind}} {{md name}}

{{language-badge language}}

{{location}}

\`\`\`{{language-code language}}
{{definition}}{{argsstring}}{{#if initializer}} {{initializer}}{{/if}}
\`\`\`

{{> memberdef-description}}

{{#if type}}**Type**: {{type}}{{/if}}

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
  initializer: linkedTextType,
});

// TODO attributes (e.g. static)
export default (element: Element) => {
  const {
    attributes: { kind, id },
  } = element;
  const { language } = currentContext();
  const context = applyToChildrenGrouped(mappers())(element);

  return template({ ...context, kind, id, language, TODO: context[$default] });
};
