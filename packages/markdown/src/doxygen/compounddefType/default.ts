import { Element } from '@rgrove/parse-xml';

import { Mappers, applyToChildrenGrouped, $default } from '../../mappers';
import { compoundLabelHelper, mdHelper, todoHelper } from '../../helpers';
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
# ${compoundLabelHelper(kind)} ${mdHelper(compoundname)} ${title}

${compounddefBadges(context)}

${location}

${compounddefDescription(context)}

${compounddefInnercompounds(context)}

${listofallmembers || ''}

${compounddefSections(context)}

${TODO ? todoHelper(TODO) : ''}
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
