import { Element } from '@rgrove/parse-xml';
import { withType, asElementNode } from '../../operators';

import xsd_string from '../xsd_string';
import descriptionTemplate from '../description';
import sectiondefTemplate from '../sectiondef';

type Template = (element: Element) => string;

const titleTemplate = (title: Element) => `# ${xsd_string(title)}`;

const templates: { [key: string]: Template } = {
  title: titleTemplate,
  briefdescription: descriptionTemplate,
  detaileddescription: descriptionTemplate,
  sectiondef: sectiondefTemplate,
};

export default (compounddef: Element) => {
  return compounddef.children
    .filter(withType('element'))
    .map(asElementNode)
    .map(child => {
      if (templates[child.name]) {
        return templates[child.name](child);
      }
    })
    .join('\n\n');
};
