import { Element } from '@rgrove/parse-xml';
export default (element: Element) =>
  element.name + ' ' + JSON.stringify(element);
