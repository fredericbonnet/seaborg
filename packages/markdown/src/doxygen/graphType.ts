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
graph TB
{{#each nodes}}
{{this}}
{{/each}}
\`\`\`
`,
  { noEscape: true }
);

const mappers = (): Mappers => ({
  node: nodeType,
});

export default (element: Element) => {
  const nodes = applyToChildren(mappers())(element);

  return template({ nodes });
};
