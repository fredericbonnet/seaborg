import { Element } from '@rgrove/parse-xml';

import { Mappers, applyToChildrenGrouped, $default } from '../../mappers';
import { xsdString } from '../../generic';
import {
  bulletItem,
  joinLines,
  joinParagraphs,
  languageCode,
  md,
  memberLabel,
  todo,
} from '../../helpers';
import { linkedTextType, paramType } from '..';

import {
  mappers as defaultMappers,
  memberdefBadges,
  memberdefDescription,
  memberdefReferences,
  memberdefTitle,
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
  TODO,
  ...context
}: any) =>
  joinParagraphs([
    memberdefTitle(id, `${memberLabel(kind)} ${md(name)}`),
    memberdefBadges(context),
    location,
    `\`\`\`${languageCode(language)}
${definition}
\`\`\``,
    memberdefDescription(context),
    param
      ? joinParagraphs(['**Parameters**:', joinLines(param.map(bulletItem))])
      : '',
    type ? `**Return type**: ${type}` : '',
    memberdefReferences(context),
    todo(TODO),
  ]);

const mappers = (): Mappers => ({
  ...defaultMappers(),
  type: linkedTextType,
  definition: xsdString,
  argsstring: xsdString,
  param: paramType,
});

export default (element: Element) => {
  const context = applyToChildrenGrouped(mappers())(element);

  return template({
    ...templateContext(element),
    ...context,
    TODO: context[$default],
  });
};
