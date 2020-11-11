import { Element } from '@rgrove/parse-xml';

import { Mappers, applyToChildrenGrouped, $default } from '../../mappers';
import { todoHelper } from '../../helpers';

import {
  compounddefBadges,
  compounddefDescription,
  compounddefList,
  compounddefSections,
  mappers as defaultMappers,
  templateContext,
} from '.';

const template = ({ id, title, innergroup, TODO, ...context }: any) =>
  `
<a id="${id}"></a>
# ${title}

${compounddefBadges(context)}

${compounddefDescription(context)}

${compounddefList({ list: innergroup, label: 'Submodules' })}

${compounddefSections(context)}

${TODO ? todoHelper(TODO) : ''}
`;

const mappers = (): Mappers => ({
  ...defaultMappers(),
});

export default (element: Element) => {
  const context = applyToChildrenGrouped(mappers())(element);

  return template({
    ...templateContext(element),
    ...context,
    TODO: context[$default],
  });
};
