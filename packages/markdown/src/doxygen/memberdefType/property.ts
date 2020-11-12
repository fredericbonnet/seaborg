import { Element } from '@rgrove/parse-xml';

import { Mappers, applyToChildrenGrouped, $default } from '../../mappers';
import { xsdString } from '../../generic';
import {
  joinParagraphs,
  languageCode,
  md,
  memberLabel,
  section,
  todo,
} from '../../helpers';
import { linkedTextType } from '..';

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
  type,
  TODO,
  ...context
}: any) =>
  joinParagraphs([
    memberdefTitle(id, `${memberLabel(kind)} ${md(name)}`),
    memberdefBadges(context),
    location,
    `\`\`\`${languageCode(language)}
${definition}${argsstring}
\`\`\``,
    memberdefDescription(context),
    section('Return type', type),
    memberdefReferences(context),
    todo(TODO),
  ]);

const mappers = (): Mappers => ({
  ...defaultMappers(),
  type: linkedTextType,
  definition: xsdString,
  argsstring: xsdString,
});

export default (element: Element) => {
  const context = applyToChildrenGrouped(mappers())(element);

  return template({
    ...templateContext(element),
    ...context,
    TODO: context[$default],
  });
};
