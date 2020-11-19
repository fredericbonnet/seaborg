/*
  <xsd:complexType name="locationType">
    <xsd:attribute name="file" type="xsd:string" />
    <xsd:attribute name="line" type="xsd:integer" />
    <xsd:attribute name="column" type="xsd:integer" use="optional"/>
    <xsd:attribute name="declfile" type="xsd:string" use="optional"/>
    <xsd:attribute name="declline" type="xsd:integer" use="optional"/>
    <xsd:attribute name="declcolumn" type="xsd:integer" use="optional"/>
    <xsd:attribute name="bodyfile" type="xsd:string" />
    <xsd:attribute name="bodystart" type="xsd:integer" />
    <xsd:attribute name="bodyend" type="xsd:integer" />
  </xsd:complexType>
*/

import { Element } from '@rgrove/parse-xml';

import { md, section } from '../helpers';

export default (element: Element) => {
  const {
    attributes: { file, line },
  } = element;
  return line
    ? section('Definition', `\`${md(file)}\` (line ${line})`)
    : section('Location', `\`${md(file)}\``);
};
