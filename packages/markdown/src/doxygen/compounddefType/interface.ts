import { Element } from '@rgrove/parse-xml';

import { Mappers, applyToChildrenGrouped, $default } from '../../mappers';
import { compoundLabelHelper, mdHelper, todoHelper } from '../../helpers';
import {
  locationType,
  listofallmembersType,
  compoundRefType,
  templateparamlistType,
} from '..';

import {
  compounddefBadges,
  compounddefDescription,
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

${listofallmembers}

${compounddefSections(context)}

${compounddefSource(context)}

${TODO ? todoHelper(TODO) : ''}
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
