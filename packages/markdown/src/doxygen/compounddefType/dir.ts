import { Element } from '@rgrove/parse-xml';

import { Mappers, applyToChildrenGrouped, $default } from '../../mappers';
import { compoundLabel, md, todo } from '../../helpers';
import { locationType } from '..';

import {
  compounddefBadges,
  compounddefDescription,
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
  innerdir,
  innerfile,
  TODO,
  ...context
}: any) =>
  `
<a id="${id}"></a>
# ${compoundLabel(kind)} ${md(compoundname)}

${compounddefBadges(context)}

${location}

${compounddefDescription(context)}

${compounddefList({ list: innerdir, label: 'Subdirectories' })}

${compounddefList({ list: innerfile, label: 'Files' })}

${compounddefSections(context)}

${compounddefSource(context)}

${TODO ? todo(TODO) : ''}
`;

const mappers = (): Mappers => ({
  ...defaultMappers(),
  location: locationType,
});

export default (element: Element) => {
  const context = applyToChildrenGrouped(mappers())(element);

  return template({
    ...templateContext(element),
    ...context,
    TODO: context[$default],
  });
};
