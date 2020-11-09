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

import { mdHelper } from '../helpers';

const template = ({ file, line }: any) =>
  line
    ? `**Definition**: \`${mdHelper(file)}\` (line ${line})`
    : `**Location**: \`${mdHelper(file)}\``;

export default (element: Element) => {
  const {
    attributes: { file, line },
  } = element;
  return template({ file, line });
};
