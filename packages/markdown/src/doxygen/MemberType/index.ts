/*
  <xsd:complexType name="MemberType">
    <xsd:sequence>
      <xsd:element name="name" type="xsd:string"/>
    </xsd:sequence>
    <xsd:attribute name="refid" type="xsd:string" use="required"/>
    <xsd:attribute name="kind" type="MemberKind" use="required"/>
  </xsd:complexType>
*/
/* TODO tests */

import { Element } from '@rgrove/parse-xml';

import {
  doxygenIndex,
  hasMember,
  context,
  currentContext,
} from '@seaborg/core/lib/services';

import { Mappers } from '../../mappers';
import { xsdString } from '../../generic';
import { languageBadge } from '../../helpers/badges';
import { joinLines } from '../../helpers';

export const MemberTitle = (refid: string, title: string) =>
  `<a id="${refid}"></a>\n### ${title}`;

export const MemberTypeBadges = ({ language }: any) =>
  joinLines([languageBadge(language)]);

export const mappers = (): Mappers => ({
  name: xsdString,
});

export const templateContext = (element: Element) => {
  const { attributes } = element;
  const { kind, refid } = attributes;
  const { language } = currentContext();
  return { kind, refid, language, attributes };
};

export default (element: Element) => {
  const {
    attributes: { kind, refid },
  } = element;
  const language = doxygenIndex.compounds
    .filter(hasMember(refid))
    .map((compound) => compound.language)
    .find((language) => !!language);
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
