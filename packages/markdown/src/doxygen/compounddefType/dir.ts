import { Element } from '@rgrove/parse-xml';
import Handlebars from 'handlebars';

import { Mappers, applyToChildrenGrouped, $default } from '../../mappers';
import { ignore } from '../../operators';
import { xsdString } from '../../generic';
import {
  descriptionType,
  sectiondefType,
  listingType,
  locationType,
  refType,
} from '..';

const template = Handlebars.compile(
  `
# Directory {{md compoundname}}

{{location}}

{{briefdescription}}

{{detaileddescription}}

{{#if innerdir}}
## Subdirectories

{{#each innerdir}}
* {{this}}
{{/each}}
{{/if}}

{{#if innerfile}}
## Files

{{#each innerfile}}
* {{this}}
{{/each}}
{{/if}}

{{#each sectiondef}}
{{this}}
{{/each}}

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
  innerdir: refType,
  innerfile: refType,

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
