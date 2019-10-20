import { Text } from '@rgrove/parse-xml';
import Handlebars from 'handlebars';

const template = Handlebars.compile('{{text}}');

/** Default mapper returns escaped text */
export default (text: Text) => template({ text: text.text });

/** Map unescaped text */
export function text(text: Text) {
  return text.text;
}
