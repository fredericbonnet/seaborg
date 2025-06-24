/*
Definitions from compound.xsd:

  <!-- Complex types -->

  <xsd:complexType name="DoxygenType">
  <xsd:complexType name="compounddefType">
  <xsd:complexType name="listofallmembersType">
  <xsd:complexType name="memberRefType">
  <xsd:complexType name="docHtmlOnlyType">
  <xsd:complexType name="compoundRefType">
  <xsd:complexType name="reimplementType">
  <xsd:complexType name="incType">
  <xsd:complexType name="exportsType">
  <xsd:complexType name="exportType">
  <xsd:complexType name="refType">
  <xsd:complexType name="refTextType">
  <xsd:complexType name="MemberType">
  <xsd:complexType name="sectiondefType">
  <xsd:complexType name="memberdefType">
  <xsd:complexType name="descriptionType" mixed="true">
  <xsd:complexType name="enumvalueType" mixed="true">
  <xsd:complexType name="templateparamlistType">
  <xsd:complexType name="paramType">
  <xsd:complexType name="linkedTextType" mixed="true">
  <xsd:complexType name="graphType">
  <xsd:complexType name="nodeType">
  <xsd:complexType name="childnodeType">
  <xsd:complexType name="linkType">
  <xsd:complexType name="listingType">
  <xsd:complexType name="codelineType">
  <xsd:complexType name="highlightType" mixed="true">
  <xsd:complexType name="spType" mixed="true">
  <xsd:complexType name="referenceType" mixed="true">
  <xsd:complexType name="locationType">
  <xsd:complexType name="docSect1Type" mixed="true">
  <xsd:complexType name="docSect2Type" mixed="true">
  <xsd:complexType name="docSect3Type" mixed="true">
  <xsd:complexType name="docSect4Type" mixed="true">
  <xsd:complexType name="docSect5Type" mixed="true">
  <xsd:complexType name="docSect6Type" mixed="true">
  <xsd:complexType name="docInternalType" mixed="true">
  <xsd:complexType name="docInternalS1Type" mixed="true">
  <xsd:complexType name="docInternalS2Type" mixed="true">
  <xsd:complexType name="docInternalS3Type" mixed="true">
  <xsd:complexType name="docInternalS4Type" mixed="true">
  <xsd:complexType name="docInternalS5Type" mixed="true">
  <xsd:complexType name="docInternalS6Type" mixed="true">
  <xsd:group name="docTitleCmdGroup">
  <xsd:complexType name="docTitleType" mixed="true">
  <xsd:complexType name="docSummaryType" mixed="true">
  <xsd:group name="docCmdGroup">
  <xsd:complexType name="docParaType" mixed="true">
  <xsd:complexType name="docMarkupType" mixed="true">
  <xsd:complexType name="docURLLink" mixed="true">
  <xsd:complexType name="docAnchorType" mixed="true">
  <xsd:complexType name="docFormulaType" mixed="true">
  <xsd:complexType name="docIndexEntryType">
  <xsd:complexType name="docListType">
  <xsd:complexType name="docListItemType">
  <xsd:complexType name="docSimpleSectType">
  <xsd:complexType name="docVarListEntryType">
  <xsd:group name="docVariableListGroup">
  <xsd:complexType name="docVariableListType">
  <xsd:complexType name="docRefTextType" mixed="true">
  <xsd:complexType name="docTableType">
  <xsd:complexType name="docRowType">
  <xsd:complexType name="docEntryType">
  <xsd:complexType name="docCaptionType" mixed="true">
  <xsd:complexType name="docHeadingType" mixed="true">
  <xsd:complexType name="docImageType" mixed="true">
  <xsd:complexType name="docDotMscType" mixed="true">
  <xsd:complexType name="docImageFileType" mixed="true">
  <xsd:complexType name="docPlantumlType" mixed="true">
  <xsd:complexType name="docTocItemType" mixed="true">
  <xsd:complexType name="docTocListType">
  <xsd:complexType name="docLanguageType">
  <xsd:complexType name="docParamListType">
  <xsd:complexType name="docParamListItem">
  <xsd:complexType name="docParamNameList">
  <xsd:complexType name="docParamType" mixed="true">
  <xsd:complexType name="docParamName" mixed="true">
  <xsd:complexType name="docXRefSectType">
  <xsd:complexType name="docCopyType">
  <xsd:complexType name="docDetailsType">
  <xsd:complexType name="docBlockQuoteType">
  <xsd:complexType name="docParBlockType">
  <xsd:complexType name="docEmptyType"/>
  <xsd:complexType name="tableofcontentsType">
  <xsd:complexType name="tableofcontentsNameType">
  <xsd:complexType name="tableofcontentsKindType">
  <xsd:complexType name="docEmojiType">

  <!-- Simple types -->

  <xsd:simpleType name="MemberKind">
  <xsd:simpleType name="range_1_6">
  <xsd:simpleType name="DoxBool">
  <xsd:simpleType name="DoxGraphRelation">
  <xsd:simpleType name="DoxRefKind">
  <xsd:simpleType name="DoxMemberKind">
  <xsd:simpleType name="DoxProtectionKind">
  <xsd:simpleType name="DoxRefQualifierKind">
  <xsd:simpleType name="DoxLanguage">
  <xsd:simpleType name="DoxVirtualKind">
  <xsd:simpleType name="DoxCompoundKind">
  <xsd:simpleType name="DoxSectionKind">
  <xsd:simpleType name="DoxHighlightClass">
  <xsd:simpleType name="DoxSimpleSectKind">
  <xsd:simpleType name="DoxCheck">
  <xsd:simpleType name="DoxVersionNumber">
  <xsd:simpleType name="DoxImageKind">
  <xsd:simpleType name="DoxPlantumlEngine">
  <xsd:simpleType name="DoxParamListKind">
  <xsd:simpleType name="DoxCharRange">
  <xsd:simpleType name="DoxParamDir">
  <xsd:simpleType name="DoxAccessor">
  <xsd:simpleType name="DoxAlign">
  <xsd:simpleType name="DoxVerticalAlign">
  <xsd:simpleType name="DoxOlType">
*/

// Root element
export { default as compoundPage } from './DoxygenType';

// Complex types
// TODO
export { default as DoxygenType } from './DoxygenType';
export { default as compounddefType } from './compounddefType';
export { default as listofallmembersType } from './listofallmembersType';
export { default as memberRefType } from './memberRefType';
// export { default as docHtmlOnlyType } from './docHtmlOnlyType';
export { default as compoundRefType } from './compoundRefType';
export { default as reimplementType } from './reimplementType';
export { default as incType } from './incType';
// export { default as exportsType } from './exportsType';
// export { default as exportType } from './exportType';
export { default as refType } from './refType';
export { default as refTextType } from './refTextType';
export { default as MemberType } from './MemberType';
export { default as sectiondefType } from './sectiondefType';
export { default as memberdefType } from './memberdefType';
export { default as descriptionType } from './descriptionType';
export { default as enumvalueType } from './enumvalueType';
export { default as templateparamlistType } from './templateparamlistType';
export { default as paramType } from './paramType';
export { default as linkedTextType } from './linkedTextType';
export { default as graphType } from './graphType';
export { default as nodeType } from './nodeType';
export { default as childnodeType } from './childnodeType';
export { default as linkType } from './linkType';
export { default as listingType } from './listingType';
export { default as codelineType } from './codelineType';
export { default as highlightType } from './highlightType';
export { default as spType } from './spType';
export { default as referenceType } from './referenceType';
export { default as locationType } from './locationType';
export { default as docSect1Type } from './docSect1Type';
export { default as docSect2Type } from './docSect2Type';
export { default as docSect3Type } from './docSect3Type';
export { default as docSect4Type } from './docSect4Type';
// export { default as docSect5Type } from './docSect5Type';
// export { default as docSect6Type } from './docSect6Type';
export { default as docInternalType } from './docInternalType';
export { default as docInternalS1Type } from './docInternalS1Type';
export { default as docInternalS2Type } from './docInternalS2Type';
export { default as docInternalS3Type } from './docInternalS3Type';
export { default as docInternalS4Type } from './docInternalS4Type';
// export { default as docInternalS5Type } from './docInternalS5Type';
// export { default as docInternalS6Type } from './docInternalS6Type';
export { default as docTitleCmdGroup } from './docTitleCmdGroup';
export { default as docTitleType } from './docTitleType';
// export { default as docSummaryType } from './docSummaryType';
export { default as docCmdGroup } from './docCmdGroup';
export { default as docParaType } from './docParaType';
export { default as docMarkupType } from './docMarkupType';
export { default as docURLLink } from './docURLLink';
export { default as docAnchorType } from './docAnchorType';
export { default as docFormulaType } from './docFormulaType';
// export {default as docIndexEntryType} from './docIndexEntryType'
export { itemizedlist, orderedlist } from './docListType';
export { default as docListItemType } from './docListItemType';
export { default as docSimpleSectType } from './docSimpleSectType';
export { default as docVarListEntryType } from './docVarListEntryType';
export { default as docVariableListGroup } from './docVariableListGroup';
export { default as docVariableListType } from './docVariableListType';
export { default as docRefTextType } from './docRefTextType';
// export {default as docTableType} from './docTableType'
// export {default as docRowType} from './docRowType'
// export {default as docEntryType} from './docEntryType'
// export {default as docCaptionType} from './docCaptionType'
export { default as docHeadingType } from './docHeadingType';
// export {default as docImageType} from './docImageType'
// export {default as docDotMscType} from './docDotMscType'
// export {default as docImageFileType} from './docImageFileType'
// export {default as docPlantumlType} from './docPlantumlType'
// export {default as docTocItemType} from './docTocItemType'
// export {default as docTocListType} from './docTocListType'
// export {default as docLanguageType} from './docLanguageType'
export { default as docParamListType } from './docParamListType';
export { default as docParamListItem } from './docParamListItem';
export { default as docParamNameList } from './docParamNameList';
export { default as docParamType } from './docParamType';
export { default as docParamName } from './docParamName';
export { default as docXRefSectType } from './docXRefSectType';
// export {default as docCopyType} from './docCopyType'
// export {default as docDetailsType} from './docDetailsType'
// export {default as docBlockQuoteType} from './docBlockQuoteType'
export { default as docParBlockType } from './docParBlockType';
// export {default as docEmptyType} from './docEmptyType'
// export {default as tableofcontentsType} from './tableofcontentsType'
// export {default as tableofcontentsNameType} from './tableofcontentsNameType'
// export {default as tableofcontentsKindType} from './tableofcontentsKindType'
export { default as docEmojiType } from './docEmojiType';

// Simple types
export { MemberKind } from './MemberKind';
// export { range_1_6 } from './range_1_6';
export { DoxBool } from './DoxBool';
export { DoxGraphRelation } from './DoxGraphRelation';
export { DoxRefKind } from './DoxRefKind';
export { DoxMemberKind } from './DoxMemberKind';
export { DoxProtectionKind } from './DoxProtectionKind';
export { DoxRefQualifierKind } from './DoxRefQualifierKind';
export { DoxLanguage } from './DoxLanguage';
export { DoxVirtualKind } from './DoxVirtualKind';
export { DoxCompoundKind } from './DoxCompoundKind';
export { DoxSectionKind } from './DoxSectionKind';
export { DoxHighlightClass } from './DoxHighlightClass';
export { DoxSimpleSectKind } from './DoxSimpleSectKind';
// export { DoxCheck } from './DoxCheck';
export { DoxVersionNumber } from './DoxVersionNumber';
export { DoxImageKind } from './DoxImageKind';
// export { DoxPlantumlEngine } from './DoxPlantumlEngine';
export { DoxParamListKind } from './DoxParamListKind';
export { DoxCharRange } from './DoxCharRange';
export { DoxParamDir } from './DoxParamDir';
export { DoxAccessor } from './DoxAccessor';
export { DoxAlign } from './DoxAlign';
// export { DoxVerticalAlign } from './DoxVerticalAlign';
// export { DoxOlType } from './DoxOlType';
