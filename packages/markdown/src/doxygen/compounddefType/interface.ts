import { Element } from '@rgrove/parse-xml';

import { Mappers, applyToChildrenGrouped, $default } from '../../mappers';
import {
  compoundLabel,
  joinParagraphs,
  md,
  sectionList,
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
    sectionList('Inherits from', basecompoundref),
    sectionList('Inherited by', derivedcompoundref),
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
