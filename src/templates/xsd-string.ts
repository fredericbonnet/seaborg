import { Element } from '@rgrove/parse-xml';
import { withType, asTextNode, toText } from '../operators';

export default (xsd_string: Element) =>
  xsd_string.children
    .filter(withType('text'))
    .map(asTextNode)
    .map(toText)
    .join('');
