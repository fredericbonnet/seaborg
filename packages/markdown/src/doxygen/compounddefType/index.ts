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
import Handlebars from 'handlebars';

import { context } from '@seaborg/core/lib/services';

import { Mappers, $default } from '../../mappers';
import { ignore } from '../../operators';
import { xsdString } from '../../generic';
import { descriptionType, sectiondefType, refType, listingType } from '..';
import { incdepgraph, invincdepgraph } from '../graphType';

Handlebars.registerPartial(
  'compounddef-description',
  `
{{briefdescription}}

{{detaileddescription}}
`
);

Handlebars.registerPartial(
  'compounddef-list',
  `
{{#if list}}
## {{label}}

{{#each list}}
* {{this}}
{{/each}}
{{/if}}
`
);

Handlebars.registerPartial(
  'compounddef-innercompounds',
  `
{{>compounddef-list list=innerdir label="Directories"}}

{{>compounddef-list list=innerfile label="Files"}}

{{>compounddef-list list=innerclass label="Classes"}}

{{>compounddef-list list=innernamespace label="Namespaces"}}

{{>compounddef-list list=innerpage label="Pages"}}

{{>compounddef-list list=innergroup label="Modules"}}
`
);

Handlebars.registerPartial(
  'compounddef-sections',
  `
{{#each sectiondef}}
{{this}}
{{/each}}
`
);

Handlebars.registerPartial(
  'compounddef-source',
  `
{{#if programlisting}}
## Source

{{programlisting}}
{{/if}}
`
);

// TODO other attributes?
Handlebars.registerPartial(
  'compounddef-badges',
  `
{{language-badge language}}
{{protection-badge attributes.prot}}
`
);

export const mappers = (): Mappers => ({
  compoundname: xsdString,
  title: xsdString,
  briefdescription: descriptionType,
  detaileddescription: descriptionType,
  sectiondef: sectiondefType,
  innerdir: refType,
  innerfile: refType,
  innerclass: refType,
  innernamespace: refType,
  innerpage: refType,
  innergroup: refType,
  programlisting: listingType,

  incdepgraph: incdepgraph,
  invincdepgraph: invincdepgraph,
  inheritancegraph: ignore, // TODO graphs
  collaborationgraph: ignore, // TODO graphs
  //TODO
  [$default]: element => element.name + ' ' + JSON.stringify(element),
});

export const templateContext = (element: Element) => {
  const { attributes } = element;
  const { kind, language } = attributes;
  return { kind, language, attributes };
};

export default (element: Element) => {
  const {
    attributes: { kind, language },
  } = element;
  context.pushState({ language });
  let template;
  try {
    template = require('./' + kind).default;
  } catch {
    template = require('./default').default;
  }
  const result = template(element);
  context.popState();
  return result;
};
