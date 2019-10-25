/*
  <xsd:complexType name="memberdefType">
    <xsd:sequence>
      <xsd:element name="templateparamlist" type="templateparamlistType" minOccurs="0" />
      <xsd:element name="type" type="linkedTextType" minOccurs="0" />
      <xsd:element name="definition" minOccurs="0" />
      <xsd:element name="argsstring" minOccurs="0" />
      <xsd:element name="name" />
      <xsd:element name="read" minOccurs="0" />
      <xsd:element name="write" minOccurs="0" />
      <xsd:element name="bitfield" minOccurs="0" />
      <xsd:element name="reimplements" type="reimplementType" minOccurs="0" maxOccurs="unbounded" />
      <xsd:element name="reimplementedby" type="reimplementType" minOccurs="0" maxOccurs="unbounded" />
      <xsd:element name="param" type="paramType" minOccurs="0" maxOccurs="unbounded" />
      <xsd:element name="enumvalue" type="enumvalueType" minOccurs="0" maxOccurs="unbounded" />
      <xsd:element name="initializer" type="linkedTextType" minOccurs="0" />
      <xsd:element name="exceptions" type="linkedTextType" minOccurs="0" />
      <xsd:element name="briefdescription" type="descriptionType" minOccurs="0" />
      <xsd:element name="detaileddescription" type="descriptionType" minOccurs="0" />
      <xsd:element name="inbodydescription" type="descriptionType" minOccurs="0" />
      <xsd:element name="location" type="locationType" />
      <xsd:element name="references" type="referenceType" minOccurs="0" maxOccurs="unbounded" />
      <xsd:element name="referencedby" type="referenceType" minOccurs="0" maxOccurs="unbounded" />
    </xsd:sequence>
    <xsd:attribute name="kind" type="DoxMemberKind" />
    <xsd:attribute name="id" type="xsd:string" />
    <xsd:attribute name="prot" type="DoxProtectionKind" />
    <xsd:attribute name="static" type="DoxBool" />
    <xsd:attribute name="strong" type="DoxBool" use="optional"/>
    <xsd:attribute name="const" type="DoxBool" use="optional"/>
    <xsd:attribute name="explicit" type="DoxBool" use="optional"/>
    <xsd:attribute name="inline" type="DoxBool" use="optional"/>
    <xsd:attribute name="refqual" type="DoxRefQualifierKind" use="optional"/>
    <xsd:attribute name="virt" type="DoxVirtualKind" use="optional"/>
    <xsd:attribute name="volatile" type="DoxBool" use="optional"/>
    <xsd:attribute name="mutable" type="DoxBool" use="optional"/>
    <!-- Qt property -->
    <xsd:attribute name="readable" type="DoxBool" use="optional"/>
    <xsd:attribute name="writable" type="DoxBool" use="optional"/>
    <!-- C++/CLI variable -->
    <xsd:attribute name="initonly" type="DoxBool" use="optional"/>
    <!-- C++/CLI and C# property -->
    <xsd:attribute name="settable" type="DoxBool" use="optional"/>
    <xsd:attribute name="gettable" type="DoxBool" use="optional"/>
    <!-- C++/CLI function -->
    <xsd:attribute name="final" type="DoxBool" use="optional"/>
    <xsd:attribute name="sealed" type="DoxBool" use="optional"/>
    <xsd:attribute name="new" type="DoxBool" use="optional"/>
    <!-- C++/CLI event -->
    <xsd:attribute name="add" type="DoxBool" use="optional"/>
    <xsd:attribute name="remove" type="DoxBool" use="optional"/>
    <xsd:attribute name="raise" type="DoxBool" use="optional"/>
    <!-- Objective-C 2.0 protocol method -->
    <xsd:attribute name="optional" type="DoxBool" use="optional"/>
    <xsd:attribute name="required" type="DoxBool" use="optional"/>
    <!-- Objective-C 2.0 property accessor -->
    <xsd:attribute name="accessor" type="DoxAccessor" use="optional"/>
    <!-- UNO IDL -->
    <xsd:attribute name="attribute" type="DoxBool" use="optional"/>
    <xsd:attribute name="property" type="DoxBool" use="optional"/>
    <xsd:attribute name="readonly" type="DoxBool" use="optional"/>
    <xsd:attribute name="bound" type="DoxBool" use="optional"/>
    <xsd:attribute name="removable" type="DoxBool" use="optional"/>
    <xsd:attribute name="contrained" type="DoxBool" use="optional"/>
    <xsd:attribute name="transient" type="DoxBool" use="optional"/>
    <xsd:attribute name="maybevoid" type="DoxBool" use="optional"/>
    <xsd:attribute name="maybedefault" type="DoxBool" use="optional"/>
    <xsd:attribute name="maybeambiguous" type="DoxBool" use="optional"/>

  </xsd:complexType>

  <xsd:simpleType name="DoxMemberKind">
    <xsd:restriction base="xsd:string">
      <xsd:enumeration value="define" />
      <xsd:enumeration value="property" />
      <xsd:enumeration value="event" />
      <xsd:enumeration value="variable" />
      <xsd:enumeration value="typedef" />
      <xsd:enumeration value="enum" />
      <xsd:enumeration value="function" />
      <xsd:enumeration value="signal" />
      <xsd:enumeration value="prototype" />
      <xsd:enumeration value="friend" />
      <xsd:enumeration value="dcop" />
      <xsd:enumeration value="slot" />
      <xsd:enumeration value="interface" />
      <xsd:enumeration value="service" />
    </xsd:restriction>
  </xsd:simpleType>
*/

import { Element } from '@rgrove/parse-xml';
import Handlebars from 'handlebars';

import { Mappers, $default } from '../../mappers';
import { xsdString } from '../../generic';
import { descriptionType, locationType, referenceType } from '..';

Handlebars.registerPartial(
  'memberdef-description',
  `
{{briefdescription}}

{{detaileddescription}}

{{inbodydescription}}
`
);

Handlebars.registerPartial(
  'memberdef-references',
  `
  {{#if references}}
  **References**: 
  
  {{#each references}}
  * {{this}}
  {{/each}}
  {{/if}}
  
  {{#if referencedby}}
  **Referenced by**:
  
  {{#each referencedby}}
  * {{this}}
  {{/each}}
  {{/if}}
  `
);

export const mappers = (): Mappers => ({
  name: xsdString,
  briefdescription: descriptionType,
  detaileddescription: descriptionType,
  inbodydescription: descriptionType,
  location: locationType,
  references: referenceType,
  referencedby: referenceType,
  //TODO
  [$default]: element => element.name + ' ' + JSON.stringify(element),
});

export default (element: Element) => {
  const {
    attributes: { kind },
  } = element;
  let template;
  try {
    template = require('./' + kind).default;
  } catch {
    template = require('./default').default;
  }
  return template(element);
};
