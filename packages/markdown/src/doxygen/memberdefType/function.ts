import { Element } from '@rgrove/parse-xml';

import { Mappers, applyToChildrenGrouped, $default } from '../../mappers';
import { xsdString } from '../../generic';
import {
  languageCodeHelper,
  mdHelper,
  memberLabelHelper,
  todoHelper,
} from '../../helpers';
import { linkedTextType, paramType, reimplementType } from '..';

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
  definition,
  argsstring,
  param,
  type,
  reimplements,
  reimplementedby,
  TODO,
  ...context
}: any) => `
<a id="${id}"></a>
### ${memberLabelHelper(kind)} ${mdHelper(name)}

${memberdefBadges(context)}

${location}

\`\`\`${languageCodeHelper(language)}
${definition}${argsstring}
\`\`\`

${memberdefDescription(context)}

${
  param
    ? `
**Parameters**:

${param.map((e: string) => `* ${e}`).join('\n')}
`
    : ''
}

${type ? `**Return type**: ${type}` : ''}

${reimplements ? `**Reimplements**: ${reimplements}` : ''}

${
  reimplementedby
    ? `**Reimplemented by**: 

${reimplementedby.map((e: string) => `* ${e}`).join('\n')}
`
    : ''
}

${memberdefReferences(context)}

${TODO ? todoHelper(TODO) : ''}
`;

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
