import { Text } from '@rgrove/parse-xml';
import Handlebars from 'handlebars';

const template = Handlebars.compile('{{text}}');

export default (text: Text) => template({ text: text.text });
