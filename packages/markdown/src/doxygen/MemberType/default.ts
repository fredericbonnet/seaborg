import { Element } from '@rgrove/parse-xml';

import { applyToChildrenGrouped } from '../../mappers';
import { joinParagraphs, md, memberLabel } from '../../helpers';

import { mappers, MemberTitle, MemberTypeBadges, templateContext } from '.';

const template = ({ refid, kind, name, language, ...context }: any) =>
  joinParagraphs([
    MemberTitle(refid, `${memberLabel(kind)} ${md(name)}`),
    MemberTypeBadges(context),
  ]);

export default (element: Element) => {
  const context = applyToChildrenGrouped(mappers())(element);

  return template({
    ...templateContext(element),
    ...context,
  });
};
