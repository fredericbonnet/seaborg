/*
  <xsd:complexType name="locationType">
    <xsd:attribute name="file" type="xsd:string" />
    <xsd:attribute name="line" type="xsd:integer" />
    <xsd:attribute name="column" type="xsd:integer" use="optional"/>
    <xsd:attribute name="bodyfile" type="xsd:string" />
    <xsd:attribute name="bodystart" type="xsd:integer" />
    <xsd:attribute name="bodyend" type="xsd:integer" />
  </xsd:complexType>
*/

import { Element } from '@rgrove/parse-xml';
import Handlebars from 'handlebars';

const template = Handlebars.compile(
  `
{{~#if line ~}}
**Definition**: \`{{md file}}\` (line {{line}})
{{~else ~}}
**Location**: \`{{md file}}\`
{{~/if ~}}
`,
  { noEscape: true }
);

export default (element: Element) => {
  const {
    attributes: { file, line },
  } = element;
  return template({ file, line });
};
