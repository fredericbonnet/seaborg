import { Element } from '@rgrove/parse-xml';
import { withType, asTextNode, toText } from '../operators';

export default (element: Element) =>
  element.children
    .filter(withType('text'))
    .map(asTextNode)
    .map(toText)
    .join('');
