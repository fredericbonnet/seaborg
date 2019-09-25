/*
  <xsd:group name="docCmdGroup">
    <xsd:choice>
      <xsd:group ref="docTitleCmdGroup"/>
      <xsd:element name="linebreak" type="docEmptyType" />
      <xsd:element name="hruler" type="docEmptyType" />
      <xsd:element name="preformatted" type="docMarkupType" />
      <xsd:element name="programlisting" type="listingType" />
      <xsd:element name="verbatim" type="xsd:string" />
      <xsd:element name="indexentry" type="docIndexEntryType" />
      <xsd:element name="orderedlist" type="docListType" />
      <xsd:element name="itemizedlist" type="docListType" />
      <xsd:element name="simplesect" type="docSimpleSectType" />
      <xsd:element name="title" type="docTitleType" />
      <xsd:element name="variablelist" type="docVariableListType" />
      <xsd:element name="table" type="docTableType" />
      <xsd:element name="heading" type="docHeadingType" />
      <xsd:element name="image" type="docImageType" />
      <xsd:element name="dotfile" type="docFileType" />
      <xsd:element name="mscfile" type="docFileType" />
      <xsd:element name="diafile" type="docFileType" />
      <xsd:element name="toclist" type="docTocListType" />
      <xsd:element name="language" type="docLanguageType" />
      <xsd:element name="parameterlist" type="docParamListType" />
      <xsd:element name="xrefsect" type="docXRefSectType" />
      <xsd:element name="copydoc" type="docCopyType" />
      <xsd:element name="blockquote" type="docBlockQuoteType" />
      <xsd:element name="parblock" type="docParBlockType" />
    </xsd:choice>
  </xsd:group>
*/

import { Element } from '@rgrove/parse-xml';
import { Mappers, $default, applyToElement } from '.';

import docTitleCmdGroup from './docTitleCmdGroup';
import docSimpleSectType from './docSimpleSectType';
import docTitleType from './docTitleType';
import docHeadingType from './docHeadingType';
import docParBlockType from './docParBlockType';

const mappers: Mappers = {
  linebreak: () => '\n',
  hruler: () => '---\n',
  simplesect: docSimpleSectType,
  title: docTitleType,
  heading: docHeadingType,
  parblock: docParBlockType,
  //FIXME remove once all elements are implemented
  [$default]: element =>
    docTitleCmdGroup(element) || element.name + ' ' + JSON.stringify(element),
};

export default (element: Element) => applyToElement(mappers)(element);
