import { Element } from '@rgrove/parse-xml';

import { applyToChildrenGrouped, $default } from '../../mappers';
import { md, memberLabel, todo } from '../../helpers';

import {
  mappers,
  memberdefBadges,
  memberdefDescription,
  memberdefReferences,
  templateContext,
} from '.';

const template = ({ id, kind, name, location, TODO, ...context }: any) =>
  `
<a id="${id}"></a>
### ${memberLabel(kind)} ${md(name)}

${memberdefBadges(context)}

${location}

${memberdefDescription(context)}

${memberdefReferences(context)}

${TODO ? todo(TODO) : ''}
`;

export default (element: Element) => {
  const context = applyToChildrenGrouped(mappers())(element);

  return template({
    ...templateContext(element),
    ...context,
    TODO: context[$default],
  });
};
