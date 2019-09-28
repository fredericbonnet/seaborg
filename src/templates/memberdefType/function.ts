import { Element } from '@rgrove/parse-xml';
import { Mappers, applyToChildrenGrouped, $default } from '..';
import Handlebars from 'handlebars';

import xsdString from '../xsd-string';
import paramType from '../paramType';
import descriptionType from '../descriptionType';

Handlebars.registerHelper('fred', (language: string) => {
  return new Handlebars.SafeString('```c');
});

const template = Handlebars.compile(
  `
<a id="{{id}}"></a>
### Function {{name}}

\`\`\`c
{{definition}}{{argsstring}}
\`\`\`

{{briefdescription}}

{{detaileddescription}}

{{#if param}}**Parameters**:
{{#each param}}
* {{this}}
{{/each}}
{{/if}}

{{TODO TODO}}
`,
  { noEscape: true }
);

const mappers: Mappers = {
  definition: xsdString,
  argsstring: xsdString,
  name: xsdString,
  param: paramType,
  briefdescription: descriptionType,
  detaileddescription: descriptionType,
  //TODO
  [$default]: element => element.name + ' ' + JSON.stringify(element),
};

export default (element: Element) => {
  const {
    attributes: { id },
  } = element;
  const context = applyToChildrenGrouped(mappers)(element);

  return template({ ...context, id, TODO: context[$default] });
};
