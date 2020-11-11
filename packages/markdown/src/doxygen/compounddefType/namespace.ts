import { Element } from '@rgrove/parse-xml';

import { Mappers, applyToChildrenGrouped, $default } from '../../mappers';
import { compoundLabelHelper, mdHelper, todoHelper } from '../../helpers';
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
  innernamespace,
  innerclass,
  TODO,
  ...context
}: any) =>
  `
<a id="${id}"></a>
# ${compoundLabelHelper(kind)} ${mdHelper(compoundname)}

${compounddefBadges(context)}

${location}

${compounddefDescription(context)}

${compounddefList({ list: innernamespace, label: 'Child namespaces' })}

${compounddefList({ list: innerclass, label: 'Classes' })}

${compounddefSections(context)}

${compounddefSource(context)}

${TODO ? todoHelper(TODO) : ''}
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
