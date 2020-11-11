/*
  <xsd:complexType name="graphType">
    <xsd:sequence>
      <xsd:element name="node" type="nodeType" maxOccurs="unbounded" />
    </xsd:sequence>
  </xsd:complexType>
*/

import { Element } from '@rgrove/parse-xml';

import { Mappers, applyToChildren } from '../mappers';
import nodeType from './nodeType';

const mappers = (reverse: boolean): Mappers => ({
  node: nodeType(reverse),
});

const graphType = (direction: string, reverse: boolean) => (
  element: Element
) => {
  const nodes = applyToChildren(mappers(reverse))(element);

  return `
\`\`\`mermaid
graph ${direction}
${nodes.join('\n')}
\`\`\`
`;
};
export default graphType;

export const incdepgraph = graphType('LR', false);
export const invincdepgraph = graphType('RL', true);
