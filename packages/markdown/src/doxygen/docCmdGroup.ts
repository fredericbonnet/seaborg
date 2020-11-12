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

import { pipe } from '@seaborg/core/lib/operators';

import { Mappers, $default } from '../mappers';
import { padParagraph } from '../helpers';
import {
  listingType,
  docTitleCmdGroup,
  docSimpleSectType,
  docTitleType,
  docHeadingType,
  docParamListType,
  docParBlockType,
  docXRefSectType,
  docVariableListType,
} from '.';
import { itemizedlist, orderedlist } from './docListType';

export default (): Mappers => ({
  ...docTitleCmdGroup(),
  linebreak: () => '\n',
  hruler: () => '---\n',
  programlisting: listingType,
  orderedlist: pipe(orderedlist, padParagraph),
  itemizedlist: pipe(itemizedlist, padParagraph),
  simplesect: pipe(docSimpleSectType, padParagraph),
  title: docTitleType,
  variablelist: pipe(docVariableListType, padParagraph),
  heading: docHeadingType,
  parameterlist: pipe(docParamListType, padParagraph),
  xrefsect: pipe(docXRefSectType, padParagraph),
  parblock: docParBlockType,
  // TODO
  [$default]: (element) => element.name + ' ' + JSON.stringify(element),
});
