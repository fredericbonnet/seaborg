/*
  <xsd:complexType name="templateparamlistType">
    <xsd:sequence>
      <xsd:element name="param" type="paramType" minOccurs="0" maxOccurs="unbounded" />
    </xsd:sequence>
  </xsd:complexType>
*/

import { Element } from '@rgrove/parse-xml';
import Handlebars from 'handlebars';

import { Mappers, applyToChildren } from '../mappers';
import { paramType } from '.';

const template = Handlebars.compile(
  `
**Template parameters**:

{{#each params}}
* {{this}}
{{/each}}
`,
  { noEscape: true }
);

const mappers = (): Mappers => ({
  param: paramType,
});

export default (element: Element) => {
  const params = applyToChildren(mappers())(element);

  return template({ params });
};
