import { Element } from '@rgrove/parse-xml';

import { Mappers, applyToChildrenGrouped, $default } from '../../mappers';
import { xsdString } from '../../generic';
import { languageCode, md, memberLabel, todo } from '../../helpers';
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
### ${memberLabel(kind)} ${md(name)}

${memberdefBadges(context)}

${location}

\`\`\`${languageCode(language)}
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

${TODO ? todo(TODO) : ''}
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
