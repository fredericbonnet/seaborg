import { Element } from '@rgrove/parse-xml';

import { Mappers, applyToChildrenGrouped, $default } from '../../mappers';
import { xsdString } from '../../generic';
import {
  languageCodeHelper,
  mdHelper,
  memberLabelHelper,
  todoHelper,
} from '../../helpers';
import { linkedTextType, paramType } from '..';

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
  argsstring,
  initializer,
  param,
  type,
  TODO,
  ...context
}: any) =>
  `
<a id="${id}"></a>
### ${memberLabelHelper(kind)} ${mdHelper(name)}

${memberdefBadges(context)}

${location}

\`\`\`${languageCodeHelper(language)}
#define ${name}${argsstring || ''}${initializer ? ` ${initializer}` : ''}${
    param ? `( ${param.join(' ,')} )` : ''
  }
\`\`\`

${memberdefDescription(context)}

${type ? `**Return type**: ${type}` : ''}

${memberdefReferences(context)}

${TODO ? todoHelper(TODO) : ''}
`;

const mappers = (): Mappers => ({
  ...defaultMappers(),
  type: linkedTextType,
  definition: xsdString,
  argsstring: xsdString,
  param: paramType,
  initializer: linkedTextType,
});

export default (element: Element) => {
  const context = applyToChildrenGrouped(mappers())(element);

  return template({
    ...templateContext(element),
    ...context,
    TODO: context[$default],
  });
};
