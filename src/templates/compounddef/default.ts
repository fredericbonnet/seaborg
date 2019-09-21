import { Element } from '@rgrove/parse-xml';
import { withType, asElementNode, withName } from '../../operators';

import xsd_string from '../xsd_string';
import descriptionTemplate from '../description';
import sectiondefTemplate from '../sectiondef';

type Template = (element: Element) => string;

// TODO map kind to string
const titleTemplate = (kind: string, title: Element) =>
  `# ${kind} ${xsd_string(title)}`;

const templates: { [key: string]: Template } = {
  briefdescription: descriptionTemplate,
  detaileddescription: descriptionTemplate,
  sectiondef: sectiondefTemplate,
};

export default (compounddef: Element) => {
  const {
    attributes: { kind },
  } = compounddef;

  return compounddef.children
    .filter(withType('element'))
    .map(asElementNode)
    .map(child => {
      if (templates[child.name]) {
        return templates[child.name](child);
      }
      if (child.name === 'title') {
        return titleTemplate(kind, child);
      }
    })
    .join('\n\n');
};
