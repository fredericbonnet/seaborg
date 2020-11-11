import { Element } from '@rgrove/parse-xml';

import { applyToChildrenGrouped, $default } from '../../mappers';
import { joinParagraphs, md, memberLabel, todo } from '../../helpers';

import {
  mappers,
  memberdefBadges,
  memberdefDescription,
  memberdefReferences,
  memberdefTitle,
  templateContext,
} from '.';

const template = ({ id, kind, name, location, TODO, ...context }: any) =>
  joinParagraphs([
    memberdefTitle(id, `${memberLabel(kind)} ${md(name)}`),
    memberdefBadges(context),
    location,
    memberdefDescription(context),
    memberdefReferences(context),
    todo(TODO),
  ]);

export default (element: Element) => {
  const context = applyToChildrenGrouped(mappers())(element);

  return template({
    ...templateContext(element),
    ...context,
    TODO: context[$default],
  });
};
