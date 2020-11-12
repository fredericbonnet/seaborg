import { Element } from '@rgrove/parse-xml';

import { Mappers, applyToChildrenGrouped, $default } from '../../mappers';
import {
  bulletItem,
  compoundLabel,
  joinLines,
  joinParagraphs,
  md,
  todo,
} from '../../helpers';
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
  compounddefTitle,
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
  joinParagraphs([
    compounddefTitle(id, `${compoundLabel(kind)} ${md(compoundname)}`),
    compounddefBadges(context),
    location,
    compounddefDescription(context),
    templateparamlist,
    basecompoundref
      ? joinParagraphs([
          '**Inherits from**',
          joinLines(basecompoundref.map(bulletItem)),
        ])
      : '',
    derivedcompoundref
      ? joinParagraphs([
          '**Inherited by**',
          joinLines(derivedcompoundref.map(bulletItem)),
        ])
      : '',
    compounddefList({ list: innerclass, label: 'Inner classes' }),
    listofallmembers,
    compounddefSections(context),
    compounddefSource(context),
    todo(TODO),
  ]);

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
