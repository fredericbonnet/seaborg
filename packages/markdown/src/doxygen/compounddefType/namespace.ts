import { Element } from '@rgrove/parse-xml';
import Handlebars from 'handlebars';

import { Mappers, applyToChildrenGrouped, $default } from '../../mappers';
import { locationType } from '..';

import { mappers as defaultMappers, templateContext } from '.';

const template = Handlebars.compile(
  `
# {{compound-label kind}} {{md compoundname}}

{{> compounddef-badges}}

{{location}}

{{> compounddef-description}}

{{> compounddef-list list=innernamespace label="Child namespaces"}}

{{> compounddef-list list=innerclass label="Classes"}}

{{> compounddef-sections}}

{{> compounddef-source}}

{{TODO TODO}}
`,
  { noEscape: true }
);

const mappers = (): Mappers => ({
  ...defaultMappers(),
  location: locationType,
});

export default (element: Element) => {
  const context = applyToChildrenGrouped(mappers())(element);

  return template({
    ...templateContext(element),
    ...context,
    TODO: context[$default],
  });
};
