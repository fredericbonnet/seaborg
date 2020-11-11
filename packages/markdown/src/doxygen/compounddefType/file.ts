import { Element } from '@rgrove/parse-xml';

import { Mappers, applyToChildrenGrouped, $default } from '../../mappers';
import { compoundLabel, md, todo } from '../../helpers';
import { locationType, incType } from '..';

import {
  compounddefBadges,
  compounddefDescription,
  compounddefInnercompounds,
  compounddefList,
  compounddefSections,
  compounddefSource,
  mappers as defaultMappers,
  templateContext,
} from '.';

const template = ({
  id,
  kind,
  compoundname,
  location,
  includes,
  includedby,
  incdepgraph,
  invincdepgraph,
  TODO,
  ...context
}: any) =>
  `
<a id="${id}"></a>
# ${compoundLabel(kind)} ${md(compoundname)}

${compounddefBadges(context)}

${location}

${compounddefDescription(context)}

${compounddefInnercompounds(context)}

${compounddefList({ list: includes, label: 'Includes' })}

${incdepgraph}

${compounddefList({ list: includedby, label: 'Included by' })}

${invincdepgraph}

${compounddefSections(context)}

${compounddefSource(context)}

${TODO ? todo(TODO) : ''}
`;

const mappers = (): Mappers => ({
  ...defaultMappers(),
  location: locationType,
  includes: incType,
  includedby: incType,
});

export default (element: Element) => {
  const context = applyToChildrenGrouped(mappers())(element);

  return template({
    ...templateContext(element),
    ...context,
    TODO: context[$default],
  });
};
