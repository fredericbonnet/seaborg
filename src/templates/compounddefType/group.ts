import { Element } from '@rgrove/parse-xml';
import { TemplateMap, applyToChildrenGrouped, $default } from '..';
import Handlebars from 'handlebars';

import xsdString from '../xsd-string';
import descriptionType from '../descriptionType';
import sectiondefType from '../sectiondefType';

const template = Handlebars.compile(
  `
# {{title}}

{{briefdescription}}

{{detaileddescription}}

{{#each sectiondef}}
{{this}}
{{/each}}
`,
  { noEscape: true }
);

const templates: TemplateMap = {
  title: xsdString,
  briefdescription: descriptionType,
  detaileddescription: descriptionType,
  sectiondef: sectiondefType,
  //TODO
  [$default]: element => '* ' + element.name + ' ' + JSON.stringify(element),
};

export default (element: Element) => {
  const context = applyToChildrenGrouped(templates)(element);

  return template(context) + '\n\n' + context[$default].join('\n');
};
