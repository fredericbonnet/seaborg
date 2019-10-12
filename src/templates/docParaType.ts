/*
  <xsd:complexType name="docParaType" mixed="true">
    <xsd:group ref="docCmdGroup" minOccurs="0" maxOccurs="unbounded" />
  </xsd:complexType>
*/

import { Element } from '@rgrove/parse-xml';
import { Mappers, $text, applyToNode, nonEmpty } from '.';
import { asElementNode, pipe, not } from '../operators';
import Handlebars from 'handlebars';

import docCmdGroup from './docCmdGroup';
import textNode from './textNode';
import { inline as seeInline } from './docSimpleSectType/see';

const template = Handlebars.compile(
  `
{{~# each para}}
{{this}}
{{/each ~}}
{{~#if see}}
**See also**: {{#each see}}{{this}}{{#unless @last}}, {{/unless}}{{/each }}
{{/if ~}}
`,
  { noEscape: true }
);

const mappers = (): Mappers => ({
  ...docCmdGroup(),
  [$text]: textNode,
});

/** Filter for simplesect of a given kind */
// @ts-ignore
const simplesect = kind => e =>
  e.type === 'element' && e.name === 'simplesect' && e.attributes.kind === kind;

export default (element: Element) => {
  /** Everything but "see" simplesects */
  const para = element.children
    .filter(
      pipe(
        simplesect('see'),
        not
      )
    )
    .map(applyToNode(mappers()))
    .filter(nonEmpty);

  /** "see" simplesect children */
  const see = element.children
    .filter(simplesect('see'))
    .map(asElementNode)
    .map(seeInline)
    .filter(nonEmpty);

  return template({ para, see });
};
