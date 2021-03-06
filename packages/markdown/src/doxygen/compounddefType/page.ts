import { Element } from '@rgrove/parse-xml';

import { Mappers, applyToChildrenGrouped, $default } from '../../mappers';
import { joinParagraphs, todo } from '../../helpers';

import {
  compounddefBadges,
  compounddefDescription,
  compounddefInnercompounds,
  compounddefSections,
  compounddefTitle,
  mappers as defaultMappers,
  templateContext,
} from '.';

const template = ({ id, title, TODO, ...context }: any) =>
  joinParagraphs([
    compounddefTitle(id, title),
    compounddefBadges(context),
    compounddefDescription(context),
    compounddefInnercompounds(context),
    compounddefSections(context),
    todo(TODO),
  ]);

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
