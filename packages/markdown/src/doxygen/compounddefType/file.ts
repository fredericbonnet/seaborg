import { Element } from '@rgrove/parse-xml';

import { Mappers, applyToChildrenGrouped, $default } from '../../mappers';
import { compoundLabel, joinParagraphs, md, todo } from '../../helpers';
import { locationType, incType } from '..';

import {
  compounddefBadges,
  compounddefDescription,
  compounddefInnercompounds,
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
  includes,
  includedby,
  incdepgraph,
  invincdepgraph,
  TODO,
  ...context
}: any) =>
  joinParagraphs([
    compounddefTitle(id, `${compoundLabel(kind)} ${md(compoundname)}`),
    compounddefBadges(context),
    location,
    compounddefDescription(context),
    compounddefInnercompounds(context),
    compounddefList({ list: includes, label: 'Includes' }),
    incdepgraph,
    compounddefList({ list: includedby, label: 'Included by' }),
    invincdepgraph,
    compounddefSections(context),
    compounddefSource(context),
    todo(TODO),
  ]);

const mappers = (): Mappers => ({
  ...defaultMappers(),
  location: locationType,
  includes: incType,
  includedby: incType,
});

export default (element: Element) => {
  const context = applyToChildrenGrouped(mappers())(element);

  return template({
    ...templateContext(element),
    ...context,
    TODO: context[$default],
  });
};
