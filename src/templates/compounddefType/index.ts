/*
  <xsd:complexType name="compounddefType">
    <xsd:sequence>
      <xsd:element name="compoundname" type="xsd:string"/>
      <xsd:element name="title" type="xsd:string" minOccurs="0" />
      <xsd:element name="basecompoundref" type="compoundRefType" minOccurs="0" maxOccurs="unbounded" />
      <xsd:element name="derivedcompoundref" type="compoundRefType" minOccurs="0" maxOccurs="unbounded" />
      <xsd:element name="includes" type="incType" minOccurs="0" maxOccurs="unbounded" />
      <xsd:element name="includedby" type="incType" minOccurs="0" maxOccurs="unbounded" />
      <xsd:element name="incdepgraph" type="graphType" minOccurs="0" />
      <xsd:element name="invincdepgraph" type="graphType" minOccurs="0" />
      <xsd:element name="innerdir" type="refType" minOccurs="0" maxOccurs="unbounded" />
      <xsd:element name="innerfile" type="refType" minOccurs="0" maxOccurs="unbounded" />
      <xsd:element name="innerclass" type="refType" minOccurs="0" maxOccurs="unbounded" />
      <xsd:element name="innernamespace" type="refType" minOccurs="0" maxOccurs="unbounded" />
      <xsd:element name="innerpage" type="refType" minOccurs="0" maxOccurs="unbounded" />
      <xsd:element name="innergroup" type="refType" minOccurs="0" maxOccurs="unbounded" />
      <xsd:element name="templateparamlist" type="templateparamlistType" minOccurs="0" />
      <xsd:element name="sectiondef" type="sectiondefType" minOccurs="0" maxOccurs="unbounded" />
      <xsd:element name="tableofcontents" type="tableofcontentsType" minOccurs="0" maxOccurs="1" />
      <xsd:element name="briefdescription" type="descriptionType" minOccurs="0" />
      <xsd:element name="detaileddescription" type="descriptionType" minOccurs="0" />
      <xsd:element name="inheritancegraph" type="graphType" minOccurs="0" />
      <xsd:element name="collaborationgraph" type="graphType" minOccurs="0" />
      <xsd:element name="programlisting" type="listingType" minOccurs="0" />
      <xsd:element name="location" type="locationType" minOccurs="0" />
      <xsd:element name="listofallmembers" type="listofallmembersType" minOccurs="0" />
    </xsd:sequence>
    <xsd:attribute name="id" type="xsd:string" />
    <xsd:attribute name="kind" type="DoxCompoundKind" />
    <xsd:attribute name="language" type="DoxLanguage" use="optional"/>
    <xsd:attribute name="prot" type="DoxProtectionKind" />
    <xsd:attribute name="final" type="DoxBool" use="optional"/>
    <xsd:attribute name="sealed" type="DoxBool" use="optional"/>
    <xsd:attribute name="abstract" type="DoxBool" use="optional"/>
  </xsd:complexType>
*/

import { Element } from '@rgrove/parse-xml';

export default (compounddef: Element) => {
  const {
    attributes: { kind },
  } = compounddef;
  let template;
  try {
    template = require('./' + kind).default;
  } catch {
    template = require('./default').default;
  }
  return template(compounddef);
};
