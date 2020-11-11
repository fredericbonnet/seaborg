import { Element } from '@rgrove/parse-xml';

import { Mappers, applyToChildrenGrouped, $default } from '../../mappers';
import { joinParagraphs, todo } from '../../helpers';

import {
  compounddefBadges,
  compounddefDescription,
  compounddefList,
  compounddefSections,
  compounddefTitle,
  mappers as defaultMappers,
  templateContext,
} from '.';

const template = ({ id, title, innergroup, TODO, ...context }: any) =>
  joinParagraphs([
    compounddefTitle(id, title),
    compounddefBadges(context),
    compounddefDescription(context),
    compounddefList({ list: innergroup, label: 'Submodules' }),
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
