import { Element } from '@rgrove/parse-xml';

import { Mappers, applyToChildrenGrouped, $default } from '../../mappers';
import { compoundLabel, md, todo } from '../../helpers';
import { locationType, listofallmembersType } from '..';

import {
  compounddefBadges,
  compounddefDescription,
  compounddefInnercompounds,
  compounddefSections,
  mappers as defaultMappers,
  templateContext,
} from '.';

const template = ({
  id,
  kind,
  compoundname,
  title,
  location,
  listofallmembers,
  TODO,
  ...context
}: any) =>
  `
<a id="${id}"></a>
# ${compoundLabel(kind)} ${md(compoundname)} ${title}

${compounddefBadges(context)}

${location}

${compounddefDescription(context)}

${compounddefInnercompounds(context)}

${listofallmembers || ''}

${compounddefSections(context)}

${TODO ? todo(TODO) : ''}
`;

const mappers = (): Mappers => ({
  ...defaultMappers(),
  location: locationType,
  listofallmembers: listofallmembersType,
});

export default (element: Element) => {
  const context = applyToChildrenGrouped(mappers())(element);

  return template({
    ...templateContext(element),
    ...context,
    TODO: context[$default],
  });
};
