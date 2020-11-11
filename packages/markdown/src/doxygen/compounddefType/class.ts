import { Element } from '@rgrove/parse-xml';

import { Mappers, applyToChildrenGrouped, $default } from '../../mappers';
import { compoundLabelHelper, mdHelper } from '../../helpers';
import {
  locationType,
  listofallmembersType,
  compoundRefType,
  templateparamlistType,
} from '..';

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
  templateparamlist,
  basecompoundref,
  derivedcompoundref,
  innerclass,
  listofallmembers,
  TODO,
  ...context
}: any) =>
  `
<a id="${id}"></a>
# ${compoundLabelHelper(kind)} ${mdHelper(compoundname)}

${compounddefBadges(context)}

${location}

${compounddefDescription(context)}

${templateparamlist || ''}

${
  basecompoundref
    ? `
**Inherits from**:

${basecompoundref.map((e: string) => `* $e`).join('\n')}
`
    : ''
}

${
  derivedcompoundref
    ? `
**Inherited by**:

${derivedcompoundref.map((e: string) => `* $e`).join('\n')}
`
    : ''
}

${compounddefList({ list: innerclass, label: 'Inner classes' })}

${listofallmembers}

${compounddefSections(context)}

${compounddefSource(context)}

${TODO ? mdHelper(TODO) : ''}
`;

const mappers = (): Mappers => ({
  ...defaultMappers(),
  location: locationType,
  templateparamlist: templateparamlistType,
  basecompoundref: compoundRefType,
  derivedcompoundref: compoundRefType,
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
