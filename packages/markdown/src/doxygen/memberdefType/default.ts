import { Element } from '@rgrove/parse-xml';
import Handlebars from 'handlebars';

import { applyToChildrenGrouped, $default } from '../../mappers';

import { mappers, templateContext } from '.';

const template = Handlebars.compile(
  `
<a id="{{id}}"></a>
### {{member-label kind}} {{md name}}

{{> memberdef-badges}}

{{location}}

{{> memberdef-description}}

{{> memberdef-references}}

{{TODO TODO}}
`,
  { noEscape: true }
);

export default (element: Element) => {
  const context = applyToChildrenGrouped(mappers())(element);

  return template({
    ...templateContext(element),
    ...context,
    TODO: context[$default],
  });
};
