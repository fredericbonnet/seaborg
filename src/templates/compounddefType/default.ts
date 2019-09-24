import { Element } from '@rgrove/parse-xml';
import { TemplateMap, applyToChildrenGrouped, $default } from '..';
import Handlebars from 'handlebars';

import xsdString from '../xsd-string';
import descriptionType from '../descriptionType';
import sectiondefType from '../sectiondefType';

const template = Handlebars.compile(
  `
# {{kind}} {{compoundname}} {{title}}

{{briefdescription}}

{{detaileddescription}}

{{#each sectiondef}}
{{this}}
{{/each}}
`,
  { noEscape: true }
);

const templates: TemplateMap = {
  compoundname: xsdString,
  title: xsdString,
  briefdescription: descriptionType,
  detaileddescription: descriptionType,
  sectiondef: sectiondefType,
  //TODO
  [$default]: element => '* ' + element.name + ' ' + JSON.stringify(element),
};

export default (element: Element) => {
  // TODO map kind to string
  const {
    attributes: { kind },
  } = element;
  const context = applyToChildrenGrouped(templates)(element);

  return template({ ...context, kind }) + '\n\n' + context[$default].join('\n');
};
