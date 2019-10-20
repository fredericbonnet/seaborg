import { Element } from '@rgrove/parse-xml';
import { Mappers, applyToChildrenGrouped, $default, ignore } from '../..';
import Handlebars from 'handlebars';

import xsdString from '../../xsd-string';
import descriptionType from '../descriptionType';
import sectiondefType from '../sectiondefType';
import listingType from '../listingType';
import locationType from '../locationType';

const template = Handlebars.compile(
  `
# File {{md compoundname}}

{{location}}

{{briefdescription}}

{{detaileddescription}}

{{#each sectiondef}}
{{this}}
{{/each}}

{{#if programlisting}}
## Source

{{programlisting}}
{{/if}}

{{TODO TODO}}
`,
  { noEscape: true }
);

const mappers = (): Mappers => ({
  compoundname: xsdString,
  title: xsdString,
  briefdescription: descriptionType,
  detaileddescription: descriptionType,
  sectiondef: sectiondefType,
  programlisting: listingType,
  location: locationType,

  incdepgraph: ignore, // TODO graphs
  invincdepgraph: ignore, // TODO graphs

  //TODO
  [$default]: element => element.name + ' ' + JSON.stringify(element),
});

export default (element: Element) => {
  // TODO map kind to string
  const {
    attributes: { kind },
  } = element;
  const context = applyToChildrenGrouped(mappers())(element);

  return template({ ...context, kind, TODO: context[$default] });
};
