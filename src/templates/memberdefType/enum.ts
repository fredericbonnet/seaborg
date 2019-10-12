import { Element } from '@rgrove/parse-xml';
import { Mappers, applyToChildrenGrouped, $default, applyToChildren } from '..';
import Handlebars from 'handlebars';

import linkedTextType from '../linkedTextType';
import xsdString from '../xsd-string';
import enumvalueType, { def as enumvalueDef } from '../enumvalueType';
import descriptionType from '../descriptionType';

const template = Handlebars.compile(
  `
<a id="{{id}}"></a>
### Enumeration type {{md name}}

\`\`\`c
enum {{name}} {
  {{#each valuelist}}
  {{this}}{{#unless @last}},{{/unless}}
  {{/each}}
}
\`\`\`

{{briefdescription}}

{{detaileddescription}}

{{inbodydescription}}

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
  type: linkedTextType,
  definition: xsdString,
  enumvalue: enumvalueType,
  name: xsdString,
  briefdescription: descriptionType,
  detaileddescription: descriptionType,
  inbodydescription: descriptionType,
  //TODO
  [$default]: element => element.name + ' ' + JSON.stringify(element),
});

const valueMappers = (): Mappers => ({
  enumvalue: enumvalueDef,
});

export default (element: Element) => {
  const {
    attributes: { id },
  } = element;
  const context = applyToChildrenGrouped(mappers())(element);
  const valuelist = applyToChildren(valueMappers())(element);

  return template({ ...context, id, valuelist, TODO: context[$default] });
};
