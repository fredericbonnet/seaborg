import { Element } from '@rgrove/parse-xml';

import { Mappers, applyToChildrenGrouped, $default } from '../../mappers';
import { xsdString } from '../../generic';
import {
  joinParagraphs,
  languageCode,
  md,
  memberLabel,
  section,
  sectionList,
  todo,
} from '../../helpers';
import { linkedTextType, paramType, reimplementType } from '..';

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
  reimplements,
  reimplementedby,
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
    sectionList('Parameters', param),
    section('Return type', type),
    section('Reimplements', reimplements),
    sectionList('Reimplemented by', reimplementedby),
    memberdefReferences(context),
    todo(TODO),
  ]);

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
