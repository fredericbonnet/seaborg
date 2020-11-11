import { Element } from '@rgrove/parse-xml';

import {
  Mappers,
  applyToChildrenGrouped,
  applyToChildren,
  $default,
} from '../../mappers';
import { xsdString } from '../../generic';
import {
  languageCodeHelper,
  mdHelper,
  memberLabelHelper,
  todoHelper,
} from '../../helpers';
import { linkedTextType, enumvalueType } from '..';
import { def as enumvalueDef } from '../enumvalueType';

import {
  mappers as defaultMappers,
  memberdefBadges,
  memberdefDescription,
  memberdefReferences,
  templateContext,
} from '.';

const template = ({
  id,
  kind,
  name,
  location,
  language,
  valuelist,
  enumvalue,
  TODO,
  ...context
}: any) =>
  `
<a id="${id}"></a>
### ${memberLabelHelper(kind)} ${mdHelper(name)}

${memberdefBadges(context)}

${location}

\`\`\`${languageCodeHelper(language)}
enum ${name} {
${valuelist.map((e: string) => `  ${e}`).join(',\n')}
}
\`\`\`

${memberdefDescription(context)}

${memberdefReferences(context)}

${enumvalue ? enumvalue.join('\n') : ''}

${TODO ? todoHelper(TODO) : ''}
`;

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
  const context = applyToChildrenGrouped(mappers())(element);
  const valuelist = applyToChildren(valueMappers())(element);

  return template({
    ...templateContext(element),
    ...context,
    valuelist,
    TODO: context[$default],
  });
};
