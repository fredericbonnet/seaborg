import { Element } from '@rgrove/parse-xml';

import { applyToChildrenGrouped } from '../../mappers';
import {
  codeBlock,
  joinParagraphs,
  languageCode,
  md,
  memberLabel,
} from '../../helpers';

import { mappers, MemberTitle, MemberTypeBadges, templateContext } from '.';

const template = ({ refid, kind, name, language, ...context }: any) =>
  joinParagraphs([
    MemberTitle(refid, `${memberLabel(kind)} ${md(name)}`),
    MemberTypeBadges(context),
    codeBlock(languageCode(language), `#define ${name}`),
  ]);

export default (element: Element) => {
  const context = applyToChildrenGrouped(mappers())(element);

  return template({
    ...templateContext(element),
    ...context,
  });
};
