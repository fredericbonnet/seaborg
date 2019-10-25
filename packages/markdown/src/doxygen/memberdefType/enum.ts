import { Element } from '@rgrove/parse-xml';
import Handlebars from 'handlebars';

import {
  Mappers,
  applyToChildrenGrouped,
  applyToChildren,
  $default,
} from '../../mappers';
import { xsdString } from '../../generic';
import {
  linkedTextType,
  enumvalueType,
  descriptionType,
  locationType,
} from '..';
import { def as enumvalueDef } from '../enumvalueType';

const template = Handlebars.compile(
  `
<a id="{{id}}"></a>
### Enumeration type {{md name}}

{{location}}

\`\`\`c
enum {{name}} {
  {{#each valuelist}}
  {{this}}{{#unless @last}},{{/unless}}
  {{/each}}
}
\`\`\`

{{> memberdef-description}}

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
  location: locationType,
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
