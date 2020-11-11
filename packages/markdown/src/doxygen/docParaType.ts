/*
  <xsd:complexType name="docParaType" mixed="true">
    <xsd:group ref="docCmdGroup" minOccurs="0" maxOccurs="unbounded" />
  </xsd:complexType>
*/

import { Element } from '@rgrove/parse-xml';

import { pipe, negate, filter, map } from '@seaborg/core/lib/operators';
import { Mappers, $text, applyToNode } from '../mappers';
import { nonEmpty } from '../operators';
import { textNode } from '../generic';
import { docCmdGroup } from '.';
import { inline as seeInline } from './docSimpleSectType/see';
import { joinStrings } from '../helpers';

const seeTemplate = ({ see }: any) =>
  see && see.length ? `**See also**: ${see.join(', ')}\n` : '';

const mappers = (): Mappers => ({
  ...docCmdGroup(),
  [$text]: textNode,
});

/** Filter for simplesect of a given kind */
// @ts-ignore
const simplesect = (kind) => (e) =>
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

  const para = joinStrings(paraMapper(element.children)) + '\n';
  const see = seeMapper(element.children);

  return para + seeTemplate({ see });
};
