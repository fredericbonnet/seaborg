/*
  <xsd:complexType name="docXRefSectType">
    <xsd:sequence>
      <xsd:element name="xreftitle" type="xsd:string" minOccurs="0" maxOccurs="unbounded" />
      <xsd:element name="xrefdescription" type="descriptionType" />
    </xsd:sequence>
    <xsd:attribute name="id" type="xsd:string" /> 
  </xsd:complexType>
*/
import { Element } from '@rgrove/parse-xml';
import Handlebars from 'handlebars';

import { Mappers, applyToChildrenGrouped } from '../mappers';
import { xsdString } from '../generic';
import { descriptionType } from '.';

const template = Handlebars.compile(
  `
**{{xreftitle}}**:

{{xrefdescription}}
`,
  {
    noEscape: true,
  }
);

const mappers = (): Mappers => ({
  xreftitle: xsdString,
  xrefdescription: descriptionType,
});

export default (element: Element) => {
  // TODO link to anchor identified by id attribute
  const context = applyToChildrenGrouped(mappers())(element);
  return template(context);
};
