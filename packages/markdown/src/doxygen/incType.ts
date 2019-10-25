/*
  <xsd:complexType name="incType">
    <xsd:simpleContent>
      <xsd:extension base="xsd:string">
        <xsd:attribute name="refid" type="xsd:string" />
        <xsd:attribute name="local" type="DoxBool" />
      </xsd:extension>
    </xsd:simpleContent>
  </xsd:complexType>
*/

import { Element } from '@rgrove/parse-xml';
import Handlebars from 'handlebars';

import { Mappers, applyToChildren, $text } from '../mappers';
import { textNode } from '../generic';

const template = Handlebars.compile(
  `
{{~#if local}}{{#if refid}}{{ref refid "compound" text}}{{else}}{{text}}{{/if ~}}
{{~else ~}}
<{{text}}>
{{~/if ~}}
`,
  {
    noEscape: true,
  }
);

const mappers = (): Mappers => ({
  [$text]: textNode,
});

export default (element: Element) => {
  const {
    attributes: { refid, local },
  } = element;
  const text = applyToChildren(mappers())(element).join('');
  return template({ refid, local: local == 'yes', text });
};
