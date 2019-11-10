/*
  <xsd:complexType name="graphType">
    <xsd:sequence>
      <xsd:element name="node" type="nodeType" maxOccurs="unbounded" />
    </xsd:sequence>
  </xsd:complexType>
*/

import { Element } from '@rgrove/parse-xml';
import Handlebars from 'handlebars';

import { Mappers, applyToChildren } from '../mappers';
import nodeType from './nodeType';

const template = Handlebars.compile(
  `
\`\`\`mermaid
graph {{direction}}
{{#each nodes}}
{{this}}
{{/each}}
\`\`\`
`,
  { noEscape: true }
);

const mappers = (reverse: boolean): Mappers => ({
  node: nodeType(reverse),
});

const graphType = (direction: string, reverse: boolean) => (
  element: Element
) => {
  const nodes = applyToChildren(mappers(reverse))(element);

  return template({ direction, nodes });
};
export default graphType;

export const incdepgraph = graphType('LR', false);
export const invincdepgraph = graphType('RL', true);
