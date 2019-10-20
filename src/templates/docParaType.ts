/*
  <xsd:complexType name="docParaType" mixed="true">
    <xsd:group ref="docCmdGroup" minOccurs="0" maxOccurs="unbounded" />
  </xsd:complexType>
*/

import { Element } from '@rgrove/parse-xml';
import { Mappers, $text, applyToNode, nonEmpty } from '.';
import { pipe, negate, filter, map } from '../core/operators';
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
  const paraMapper = pipe(
    filter(negate(simplesect('see'))),
    map(applyToNode(mappers())),
    filter(nonEmpty)
  );

  /** Only "see" simplesect children */
  const seeMapper = pipe(
    filter(simplesect('see')),
    map(seeInline),
    filter(nonEmpty)
  );

  const para = paraMapper(element.children);
  const see = seeMapper(element.children);

  return template({ para, see });
};
