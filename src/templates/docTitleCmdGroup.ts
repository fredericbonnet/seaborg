/*
  <xsd:group name="docTitleCmdGroup">
    <xsd:choice>
      <xsd:element name="ulink" type="docURLLink" />
      <xsd:element name="bold" type="docMarkupType" />
      <xsd:element name="strike" type="docMarkupType" />
      <xsd:element name="underline" type="docMarkupType" />
      <xsd:element name="emphasis" type="docMarkupType" />
      <xsd:element name="computeroutput" type="docMarkupType" />
      <xsd:element name="subscript" type="docMarkupType" />
      <xsd:element name="superscript" type="docMarkupType" />
      <xsd:element name="center" type="docMarkupType" />
      <xsd:element name="small" type="docMarkupType" />
      <xsd:element name="htmlonly" type="xsd:string" />
      <xsd:element name="manonly" type="xsd:string" />
      <xsd:element name="xmlonly" type="xsd:string" />
      <xsd:element name="rtfonly" type="xsd:string" />
      <xsd:element name="latexonly" type="xsd:string" />
      <xsd:element name="dot" type="xsd:string" />
      <xsd:element name="plantuml" type="xsd:string" />
      <xsd:element name="anchor" type="docAnchorType" />
      <xsd:element name="formula" type="docFormulaType" />
      <xsd:element name="ref" type="docRefTextType" />
      <xsd:element name="emoji" type="docEmojiType" />
      <xsd:element name="nonbreakablespace" type="docEmptyType" />
      <xsd:element name="iexcl" type="docEmptyType" />
      <xsd:element name="cent" type="docEmptyType" />
      <xsd:element name="pound" type="docEmptyType" />
      <xsd:element name="curren" type="docEmptyType" />
      <xsd:element name="yen" type="docEmptyType" />
      <xsd:element name="brvbar" type="docEmptyType" />
      <xsd:element name="sect" type="docEmptyType" />
      <xsd:element name="umlaut" type="docEmptyType" />
      <xsd:element name="copy" type="docEmptyType" />
      <xsd:element name="ordf" type="docEmptyType" />
      <xsd:element name="laquo" type="docEmptyType" />
      <xsd:element name="not" type="docEmptyType" />
      <xsd:element name="shy" type="docEmptyType" />
      <xsd:element name="registered" type="docEmptyType" />
      <xsd:element name="macr" type="docEmptyType" />
      <xsd:element name="deg" type="docEmptyType" />
      <xsd:element name="plusmn" type="docEmptyType" />
      <xsd:element name="sup2" type="docEmptyType" />
      <xsd:element name="sup3" type="docEmptyType" />
      <xsd:element name="acute" type="docEmptyType" />
      <xsd:element name="micro" type="docEmptyType" />
      <xsd:element name="para" type="docEmptyType" />
      <xsd:element name="middot" type="docEmptyType" />
      <xsd:element name="cedil" type="docEmptyType" />
      <xsd:element name="sup1" type="docEmptyType" />
      <xsd:element name="ordm" type="docEmptyType" />
      <xsd:element name="raquo" type="docEmptyType" />
      <xsd:element name="frac14" type="docEmptyType" />
      <xsd:element name="frac12" type="docEmptyType" />
      <xsd:element name="frac34" type="docEmptyType" />
      <xsd:element name="iquest" type="docEmptyType" />
      <xsd:element name="Agrave" type="docEmptyType" />
      <xsd:element name="Aacute" type="docEmptyType" />
      <xsd:element name="Acirc" type="docEmptyType" />
      <xsd:element name="Atilde" type="docEmptyType" />
      <xsd:element name="Aumlaut" type="docEmptyType" />
      <xsd:element name="Aring" type="docEmptyType" />
      <xsd:element name="AElig" type="docEmptyType" />
      <xsd:element name="Ccedil" type="docEmptyType" />
      <xsd:element name="Egrave" type="docEmptyType" />
      <xsd:element name="Eacute" type="docEmptyType" />
      <xsd:element name="Ecirc" type="docEmptyType" />
      <xsd:element name="Eumlaut" type="docEmptyType" />
      <xsd:element name="Igrave" type="docEmptyType" />
      <xsd:element name="Iacute" type="docEmptyType" />
      <xsd:element name="Icirc" type="docEmptyType" />
      <xsd:element name="Iumlaut" type="docEmptyType" />
      <xsd:element name="ETH" type="docEmptyType" />
      <xsd:element name="Ntilde" type="docEmptyType" />
      <xsd:element name="Ograve" type="docEmptyType" />
      <xsd:element name="Oacute" type="docEmptyType" />
      <xsd:element name="Ocirc" type="docEmptyType" />
      <xsd:element name="Otilde" type="docEmptyType" />
      <xsd:element name="Oumlaut" type="docEmptyType" />
      <xsd:element name="times" type="docEmptyType" />
      <xsd:element name="Oslash" type="docEmptyType" />
      <xsd:element name="Ugrave" type="docEmptyType" />
      <xsd:element name="Uacute" type="docEmptyType" />
      <xsd:element name="Ucirc" type="docEmptyType" />
      <xsd:element name="Uumlaut" type="docEmptyType" />
      <xsd:element name="Yacute" type="docEmptyType" />
      <xsd:element name="THORN" type="docEmptyType" />
      <xsd:element name="szlig" type="docEmptyType" />
      <xsd:element name="agrave" type="docEmptyType" />
      <xsd:element name="aacute" type="docEmptyType" />
      <xsd:element name="acirc" type="docEmptyType" />
      <xsd:element name="atilde" type="docEmptyType" />
      <xsd:element name="aumlaut" type="docEmptyType" />
      <xsd:element name="aring" type="docEmptyType" />
      <xsd:element name="aelig" type="docEmptyType" />
      <xsd:element name="ccedil" type="docEmptyType" />
      <xsd:element name="egrave" type="docEmptyType" />
      <xsd:element name="eacute" type="docEmptyType" />
      <xsd:element name="ecirc" type="docEmptyType" />
      <xsd:element name="eumlaut" type="docEmptyType" />
      <xsd:element name="igrave" type="docEmptyType" />
      <xsd:element name="iacute" type="docEmptyType" />
      <xsd:element name="icirc" type="docEmptyType" />
      <xsd:element name="iumlaut" type="docEmptyType" />
      <xsd:element name="eth" type="docEmptyType" />
      <xsd:element name="ntilde" type="docEmptyType" />
      <xsd:element name="ograve" type="docEmptyType" />
      <xsd:element name="oacute" type="docEmptyType" />
      <xsd:element name="ocirc" type="docEmptyType" />
      <xsd:element name="otilde" type="docEmptyType" />
      <xsd:element name="oumlaut" type="docEmptyType" />
      <xsd:element name="divide" type="docEmptyType" />
      <xsd:element name="oslash" type="docEmptyType" />
      <xsd:element name="ugrave" type="docEmptyType" />
      <xsd:element name="uacute" type="docEmptyType" />
      <xsd:element name="ucirc" type="docEmptyType" />
      <xsd:element name="uumlaut" type="docEmptyType" />
      <xsd:element name="yacute" type="docEmptyType" />
      <xsd:element name="thorn" type="docEmptyType" />
      <xsd:element name="yumlaut" type="docEmptyType" />
      <xsd:element name="fnof" type="docEmptyType" />
      <xsd:element name="Alpha" type="docEmptyType" />
      <xsd:element name="Beta" type="docEmptyType" />
      <xsd:element name="Gamma" type="docEmptyType" />
      <xsd:element name="Delta" type="docEmptyType" />
      <xsd:element name="Epsilon" type="docEmptyType" />
      <xsd:element name="Zeta" type="docEmptyType" />
      <xsd:element name="Eta" type="docEmptyType" />
      <xsd:element name="Theta" type="docEmptyType" />
      <xsd:element name="Iota" type="docEmptyType" />
      <xsd:element name="Kappa" type="docEmptyType" />
      <xsd:element name="Lambda" type="docEmptyType" />
      <xsd:element name="Mu" type="docEmptyType" />
      <xsd:element name="Nu" type="docEmptyType" />
      <xsd:element name="Xi" type="docEmptyType" />
      <xsd:element name="Omicron" type="docEmptyType" />
      <xsd:element name="Pi" type="docEmptyType" />
      <xsd:element name="Rho" type="docEmptyType" />
      <xsd:element name="Sigma" type="docEmptyType" />
      <xsd:element name="Tau" type="docEmptyType" />
      <xsd:element name="Upsilon" type="docEmptyType" />
      <xsd:element name="Phi" type="docEmptyType" />
      <xsd:element name="Chi" type="docEmptyType" />
      <xsd:element name="Psi" type="docEmptyType" />
      <xsd:element name="Omega" type="docEmptyType" />
      <xsd:element name="alpha" type="docEmptyType" />
      <xsd:element name="beta" type="docEmptyType" />
      <xsd:element name="gamma" type="docEmptyType" />
      <xsd:element name="delta" type="docEmptyType" />
      <xsd:element name="epsilon" type="docEmptyType" />
      <xsd:element name="zeta" type="docEmptyType" />
      <xsd:element name="eta" type="docEmptyType" />
      <xsd:element name="theta" type="docEmptyType" />
      <xsd:element name="iota" type="docEmptyType" />
      <xsd:element name="kappa" type="docEmptyType" />
      <xsd:element name="lambda" type="docEmptyType" />
      <xsd:element name="mu" type="docEmptyType" />
      <xsd:element name="nu" type="docEmptyType" />
      <xsd:element name="xi" type="docEmptyType" />
      <xsd:element name="omicron" type="docEmptyType" />
      <xsd:element name="pi" type="docEmptyType" />
      <xsd:element name="rho" type="docEmptyType" />
      <xsd:element name="sigmaf" type="docEmptyType" />
      <xsd:element name="sigma" type="docEmptyType" />
      <xsd:element name="tau" type="docEmptyType" />
      <xsd:element name="upsilon" type="docEmptyType" />
      <xsd:element name="phi" type="docEmptyType" />
      <xsd:element name="chi" type="docEmptyType" />
      <xsd:element name="psi" type="docEmptyType" />
      <xsd:element name="omega" type="docEmptyType" />
      <xsd:element name="thetasym" type="docEmptyType" />
      <xsd:element name="upsih" type="docEmptyType" />
      <xsd:element name="piv" type="docEmptyType" />
      <xsd:element name="bull" type="docEmptyType" />
      <xsd:element name="hellip" type="docEmptyType" />
      <xsd:element name="prime" type="docEmptyType" />
      <xsd:element name="Prime" type="docEmptyType" />
      <xsd:element name="oline" type="docEmptyType" />
      <xsd:element name="frasl" type="docEmptyType" />
      <xsd:element name="weierp" type="docEmptyType" />
      <xsd:element name="imaginary" type="docEmptyType" />
      <xsd:element name="real" type="docEmptyType" />
      <xsd:element name="trademark" type="docEmptyType" />
      <xsd:element name="alefsym" type="docEmptyType" />
      <xsd:element name="larr" type="docEmptyType" />
      <xsd:element name="uarr" type="docEmptyType" />
      <xsd:element name="rarr" type="docEmptyType" />
      <xsd:element name="darr" type="docEmptyType" />
      <xsd:element name="harr" type="docEmptyType" />
      <xsd:element name="crarr" type="docEmptyType" />
      <xsd:element name="lArr" type="docEmptyType" />
      <xsd:element name="uArr" type="docEmptyType" />
      <xsd:element name="rArr" type="docEmptyType" />
      <xsd:element name="dArr" type="docEmptyType" />
      <xsd:element name="hArr" type="docEmptyType" />
      <xsd:element name="forall" type="docEmptyType" />
      <xsd:element name="part" type="docEmptyType" />
      <xsd:element name="exist" type="docEmptyType" />
      <xsd:element name="empty" type="docEmptyType" />
      <xsd:element name="nabla" type="docEmptyType" />
      <xsd:element name="isin" type="docEmptyType" />
      <xsd:element name="notin" type="docEmptyType" />
      <xsd:element name="ni" type="docEmptyType" />
      <xsd:element name="prod" type="docEmptyType" />
      <xsd:element name="sum" type="docEmptyType" />
      <xsd:element name="minus" type="docEmptyType" />
      <xsd:element name="lowast" type="docEmptyType" />
      <xsd:element name="radic" type="docEmptyType" />
      <xsd:element name="prop" type="docEmptyType" />
      <xsd:element name="infin" type="docEmptyType" />
      <xsd:element name="ang" type="docEmptyType" />
      <xsd:element name="and" type="docEmptyType" />
      <xsd:element name="or" type="docEmptyType" />
      <xsd:element name="cap" type="docEmptyType" />
      <xsd:element name="cup" type="docEmptyType" />
      <xsd:element name="int" type="docEmptyType" />
      <xsd:element name="there4" type="docEmptyType" />
      <xsd:element name="sim" type="docEmptyType" />
      <xsd:element name="cong" type="docEmptyType" />
      <xsd:element name="asymp" type="docEmptyType" />
      <xsd:element name="ne" type="docEmptyType" />
      <xsd:element name="equiv" type="docEmptyType" />
      <xsd:element name="le" type="docEmptyType" />
      <xsd:element name="ge" type="docEmptyType" />
      <xsd:element name="sub" type="docEmptyType" />
      <xsd:element name="sup" type="docEmptyType" />
      <xsd:element name="nsub" type="docEmptyType" />
      <xsd:element name="sube" type="docEmptyType" />
      <xsd:element name="supe" type="docEmptyType" />
      <xsd:element name="oplus" type="docEmptyType" />
      <xsd:element name="otimes" type="docEmptyType" />
      <xsd:element name="perp" type="docEmptyType" />
      <xsd:element name="sdot" type="docEmptyType" />
      <xsd:element name="lceil" type="docEmptyType" />
      <xsd:element name="rceil" type="docEmptyType" />
      <xsd:element name="lfloor" type="docEmptyType" />
      <xsd:element name="rfloor" type="docEmptyType" />
      <xsd:element name="lang" type="docEmptyType" />
      <xsd:element name="rang" type="docEmptyType" />
      <xsd:element name="loz" type="docEmptyType" />
      <xsd:element name="spades" type="docEmptyType" />
      <xsd:element name="clubs" type="docEmptyType" />
      <xsd:element name="hearts" type="docEmptyType" />
      <xsd:element name="diams" type="docEmptyType" />
      <xsd:element name="OElig" type="docEmptyType" />
      <xsd:element name="oelig" type="docEmptyType" />
      <xsd:element name="Scaron" type="docEmptyType" />
      <xsd:element name="scaron" type="docEmptyType" />
      <xsd:element name="Yumlaut" type="docEmptyType" />
      <xsd:element name="circ" type="docEmptyType" />
      <xsd:element name="tilde" type="docEmptyType" />
      <xsd:element name="ensp" type="docEmptyType" />
      <xsd:element name="emsp" type="docEmptyType" />
      <xsd:element name="thinsp" type="docEmptyType" />
      <xsd:element name="zwnj" type="docEmptyType" />
      <xsd:element name="zwj" type="docEmptyType" />
      <xsd:element name="lrm" type="docEmptyType" />
      <xsd:element name="rlm" type="docEmptyType" />
      <xsd:element name="ndash" type="docEmptyType" />
      <xsd:element name="mdash" type="docEmptyType" />
      <xsd:element name="lsquo" type="docEmptyType" />
      <xsd:element name="rsquo" type="docEmptyType" />
      <xsd:element name="sbquo" type="docEmptyType" />
      <xsd:element name="ldquo" type="docEmptyType" />
      <xsd:element name="rdquo" type="docEmptyType" />
      <xsd:element name="bdquo" type="docEmptyType" />
      <xsd:element name="dagger" type="docEmptyType" />
      <xsd:element name="Dagger" type="docEmptyType" />
      <xsd:element name="permil" type="docEmptyType" />
      <xsd:element name="lsaquo" type="docEmptyType" />
      <xsd:element name="rsaquo" type="docEmptyType" />
      <xsd:element name="euro" type="docEmptyType" />
      <xsd:element name="tm" type="docEmptyType" />
    </xsd:choice>
  </xsd:group>
*/

import { Element } from '@rgrove/parse-xml';
import { Mappers, applyToElement } from '.';

import docURLLink from './docURLLink';
import docMarkupType from './docMarkupType';
import xsdString from './xsd-string';
import docAnchorType from './docAnchorType';
import docFormulaType from './docFormulaType';
import docRefTextType from './docRefTextType';
import docEmojiType from './docEmojiType';

const mappers = (): Mappers => ({
  ulink: docURLLink,
  bold: docMarkupType,
  strike: docMarkupType,
  underline: docMarkupType,
  emphasis: docMarkupType,
  computeroutput: docMarkupType,
  subscript: docMarkupType,
  superscript: docMarkupType,
  center: docMarkupType,
  small: docMarkupType,
  htmlonly: xsdString,
  manonly: xsdString,
  xmlonly: xsdString,
  rtfonly: xsdString,
  latexonly: xsdString,
  dot: xsdString,
  plantuml: xsdString,
  anchor: docAnchorType,
  formula: docFormulaType,
  ref: docRefTextType,
  emoji: docEmojiType,
  nonbreakablespace: () => '&nbsp', // no-break space = non-breaking space:
  iexcl: () => '&iexcl', // inverted exclamation mark: ¡
  cent: () => '&cent', // cent sign: ¢
  pound: () => '&pound', // pound sign: £
  curren: () => '&curren', // currency sign: ¤
  yen: () => '&yen', // yen sign = yuan sign: ¥
  brvbar: () => '&brvbar', // broken bar = broken vertical bar: ¦
  sect: () => '&sect', // section sign: §
  umlaut: () => '&uml', // diaeresis = spacing diaeresis: ¨
  copy: () => '&copy', // copyright sign: ©
  ordf: () => '&ordf', // feminine ordinal indicator: ª
  laquo: () => '&laquo', // left-pointing double angle quotation mark = left pointing guillemet: «
  not: () => '&not', // not sign: ¬
  shy: () => '&shy', // soft hyphen = discretionary hyphen: ­
  registered: () => '&reg', // registered sign = registered trade mark sign: ®
  macr: () => '&macr', // macron = spacing macron = overline = APL overbar: ¯
  deg: () => '&deg', // degree sign: °
  plusmn: () => '&plusmn', // plus-minus sign = plus-or-minus sign: ±
  sup2: () => '&sup2', // superscript two = superscript digit two = squared: ²
  sup3: () => '&sup3', // superscript three = superscript digit three = cubed: ³
  acute: () => '&acute', // acute accent = spacing acute: ´
  micro: () => '&micro', // micro sign: µ
  para: () => '&para', // pilcrow sign = paragraph sign: ¶
  middot: () => '&middot', // middle dot = Georgian comma = Greek middle dot: ·
  cedil: () => '&cedil', // cedilla = spacing cedilla: ¸
  sup1: () => '&sup1', // superscript one = superscript digit one: ¹
  ordm: () => '&ordm', // masculine ordinal indicator: º
  raquo: () => '&raquo', // right-pointing double angle quotation mark = right pointing guillemet: »
  frac14: () => '&frac14', // vulgar fraction one quarter = fraction one quarter: ¼
  frac12: () => '&frac12', // vulgar fraction one half = fraction one half: ½
  frac34: () => '&frac34', // vulgar fraction three quarters = fraction three quarters: ¾
  iquest: () => '&iquest', // inverted question mark = turned question mark: ¿
  Agrave: () => '&Agrave', // latin capital letter A with grave = latin capital letter A grave: À
  Aacute: () => '&Aacute', // latin capital letter A with acute: Á
  Acirc: () => '&Acirc', // latin capital letter A with circumflex: Â
  Atilde: () => '&Atilde', // latin capital letter A with tilde: Ã
  Aumlaut: () => '&Auml', // latin capital letter A with diaeresis: Ä
  Aring: () => '&Aring', // latin capital letter A with ring above = latin capital letter A ring: Å
  AElig: () => '&AElig', // latin capital letter AE = latin capital ligature AE: Æ
  Ccedil: () => '&Ccedil', // latin capital letter C with cedilla: Ç
  Egrave: () => '&Egrave', // latin capital letter E with grave: È
  Eacute: () => '&Eacute', // latin capital letter E with acute: É
  Ecirc: () => '&Ecirc', // latin capital letter E with circumflex: Ê
  Eumlaut: () => '&Euml', // latin capital letter E with diaeresis: Ë
  Igrave: () => '&Igrave', // latin capital letter I with grave: Ì
  Iacute: () => '&Iacute', // latin capital letter I with acute: Í
  Icirc: () => '&Icirc', // latin capital letter I with circumflex: Î
  Iumlaut: () => '&Iuml', // latin capital letter I with diaeresis: Ï
  ETH: () => '&ETH', // latin capital letter ETH: Ð
  Ntilde: () => '&Ntilde', // latin capital letter N with tilde: Ñ
  Ograve: () => '&Ograve', // latin capital letter O with grave: Ò
  Oacute: () => '&Oacute', // latin capital letter O with acute: Ó
  Ocirc: () => '&Ocirc', // latin capital letter O with circumflex: Ô
  Otilde: () => '&Otilde', // latin capital letter O with tilde: Õ
  Oumlaut: () => '&Ouml', // latin capital letter O with diaeresis: Ö
  times: () => '&times', // multiplication sign: ×
  Oslash: () => '&Oslash', // latin capital letter O with stroke = latin capital letter O slash: Ø
  Ugrave: () => '&Ugrave', // latin capital letter U with grave: Ù
  Uacute: () => '&Uacute', // latin capital letter U with acute: Ú
  Ucirc: () => '&Ucirc', // latin capital letter U with circumflex: Û
  Uumlaut: () => '&Uuml', // latin capital letter U with diaeresis: Ü
  Yacute: () => '&Yacute', // latin capital letter Y with acute: Ý
  THORN: () => '&THORN', // latin capital letter THORN: Þ
  szlig: () => '&szlig', // latin small letter sharp s = ess-zed: ß
  agrave: () => '&agrave', // latin small letter a with grave = latin small letter a grave: à
  aacute: () => '&aacute', // latin small letter a with acute: á
  acirc: () => '&acirc', // latin small letter a with circumflex: â
  atilde: () => '&atilde', // latin small letter a with tilde: ã
  aumlaut: () => '&auml', // latin small letter a with diaeresis: ä
  aring: () => '&aring', // latin small letter a with ring above = latin small letter a ring: å
  aelig: () => '&aelig', // latin small letter ae = latin small ligature ae: æ
  ccedil: () => '&ccedil', // latin small letter c with cedilla: ç
  egrave: () => '&egrave', // latin small letter e with grave: è
  eacute: () => '&eacute', // latin small letter e with acute: é
  ecirc: () => '&ecirc', // latin small letter e with circumflex: ê
  eumlaut: () => '&euml', // latin small letter e with diaeresis: ë
  igrave: () => '&igrave', // latin small letter i with grave: ì
  iacute: () => '&iacute', // latin small letter i with acute: í
  icirc: () => '&icirc', // latin small letter i with circumflex: î
  iumlaut: () => '&iuml', // latin small letter i with diaeresis: ï
  eth: () => '&eth', // latin small letter eth: ð
  ntilde: () => '&ntilde', // latin small letter n with tilde: ñ
  ograve: () => '&ograve', // latin small letter o with grave: ò
  oacute: () => '&oacute', // latin small letter o with acute: ó
  ocirc: () => '&ocirc', // latin small letter o with circumflex: ô
  otilde: () => '&otilde', // latin small letter o with tilde: õ
  oumlaut: () => '&ouml', // latin small letter o with diaeresis: ö
  divide: () => '&divide', // division sign: ÷
  oslash: () => '&oslash', // latin small letter o with stroke, = latin small letter o slash: ø
  ugrave: () => '&ugrave', // latin small letter u with grave: ù
  uacute: () => '&uacute', // latin small letter u with acute: ú
  ucirc: () => '&ucirc', // latin small letter u with circumflex: û
  uumlaut: () => '&uuml', // latin small letter u with diaeresis: ü
  yacute: () => '&yacute', // latin small letter y with acute: ý
  thorn: () => '&thorn', // latin small letter thorn: þ
  yumlaut: () => '&yuml', // latin small letter y with diaeresis: ÿ
  fnof: () => '&fnof', // latin small f with hook = function = florin: ƒ
  Alpha: () => '&Alpha', // greek capital letter alpha: Α
  Beta: () => '&Beta', // greek capital letter beta: Β
  Gamma: () => '&Gamma', // greek capital letter gamma: Γ
  Delta: () => '&Delta', // greek capital letter delta: Δ
  Epsilon: () => '&Epsilon', // greek capital letter epsilon: Ε
  Zeta: () => '&Zeta', // greek capital letter zeta: Ζ
  Eta: () => '&Eta', // greek capital letter eta: Η
  Theta: () => '&Theta', // greek capital letter theta: Θ
  Iota: () => '&Iota', // greek capital letter iota: Ι
  Kappa: () => '&Kappa', // greek capital letter kappa: Κ
  Lambda: () => '&Lambda', // greek capital letter lambda: Λ
  Mu: () => '&Mu', // greek capital letter mu: Μ
  Nu: () => '&Nu', // greek capital letter nu: Ν
  Xi: () => '&Xi', // greek capital letter xi: Ξ
  Omicron: () => '&Omicron', // greek capital letter omicron: Ο
  Pi: () => '&Pi', // greek capital letter pi: Π
  Rho: () => '&Rho', // greek capital letter rho: Ρ
  Sigma: () => '&Sigma', // greek capital letter sigma: Σ
  Tau: () => '&Tau', // greek capital letter tau: Τ
  Upsilon: () => '&Upsilon', // greek capital letter upsilon: Υ
  Phi: () => '&Phi', // greek capital letter phi: Φ
  Chi: () => '&Chi', // greek capital letter chi: Χ
  Psi: () => '&Psi', // greek capital letter psi: Ψ
  Omega: () => '&Omega', // greek capital letter omega: Ω
  alpha: () => '&alpha', // greek small letter alpha: α
  beta: () => '&beta', // greek small letter beta: β
  gamma: () => '&gamma', // greek small letter gamma: γ
  delta: () => '&delta', // greek small letter delta: δ
  epsilon: () => '&epsilon', // greek small letter epsilon: ε
  zeta: () => '&zeta', // greek small letter zeta: ζ
  eta: () => '&eta', // greek small letter eta: η
  theta: () => '&theta', // greek small letter theta: θ
  iota: () => '&iota', // greek small letter iota: ι
  kappa: () => '&kappa', // greek small letter kappa: κ
  lambda: () => '&lambda', // greek small letter lambda: λ
  mu: () => '&mu', // greek small letter mu: μ
  nu: () => '&nu', // greek small letter nu: ν
  xi: () => '&xi', // greek small letter xi: ξ
  omicron: () => '&omicron', // greek small letter omicron: ο
  pi: () => '&pi', // greek small letter pi: π
  rho: () => '&rho', // greek small letter rho: ρ
  sigmaf: () => '&sigmaf', // greek small letter final sigma: ς
  sigma: () => '&sigma', // greek small letter sigma: σ
  tau: () => '&tau', // greek small letter tau: τ
  upsilon: () => '&upsilon', // greek small letter upsilon: υ
  phi: () => '&phi', // greek small letter phi: φ
  chi: () => '&chi', // greek small letter chi: χ
  psi: () => '&psi', // greek small letter psi: ψ
  omega: () => '&omega', // greek small letter omega: ω
  thetasym: () => '&thetasym', // greek small letter theta symbol: ϑ
  upsih: () => '&upsih', // greek upsilon with hook symbol: ϒ
  piv: () => '&piv', // greek pi symbol: ϖ
  bull: () => '&bull', // bullet = black small circle: •
  hellip: () => '&hellip', // horizontal ellipsis = three dot leader: …
  prime: () => '&prime', // prime = minutes = feet: ′
  Prime: () => '&Prime', // double prime = seconds = inches: ″
  oline: () => '&oline', // overline = spacing overscore: ‾
  frasl: () => '&frasl', // fraction slash: ⁄
  weierp: () => '&weierp', // script capital P = power set = Weierstrass p: ℘
  imaginary: () => '&image', // blackletter capital I = imaginary part: ℑ
  real: () => '&real', // blackletter capital R = real part symbol: ℜ
  trademark: () => '&trade', // trade mark sign: ™
  alefsym: () => '&alefsym', // alef symbol = first transfinite cardinal: ℵ
  larr: () => '&larr', // leftwards arrow: ←
  uarr: () => '&uarr', // upwards arrow: ↑
  rarr: () => '&rarr', // rightwards arrow: →
  darr: () => '&darr', // downwards arrow: ↓
  harr: () => '&harr', // left right arrow: ↔
  crarr: () => '&crarr', // downwards arrow with corner leftwards = carriage return: ↵
  lArr: () => '&lArr', // leftwards double arrow: ⇐
  uArr: () => '&uArr', // upwards double arrow: ⇑
  rArr: () => '&rArr', // rightwards double arrow: ⇒
  dArr: () => '&dArr', // downwards double arrow: ⇓
  hArr: () => '&hArr', // left right double arrow: ⇔
  forall: () => '&forall', // for all: ∀
  part: () => '&part', // partial differential: ∂
  exist: () => '&exist', // there exists: ∃
  empty: () => '&empty', // empty set = null set = diameter: ∅
  nabla: () => '&nabla', // nabla = backward difference: ∇
  isin: () => '&isin', // element of: ∈
  notin: () => '&notin', // not an element of: ∉
  ni: () => '&ni', // contains as member: ∋
  prod: () => '&prod', // n-ary product = product sign: ∏
  sum: () => '&sum', // n-ary sumation: ∑
  minus: () => '&minus', // minus sign: −
  lowast: () => '&lowast', // asterisk operator: ∗
  radic: () => '&radic', // square root = radical sign: √
  prop: () => '&prop', // proportional to: ∝
  infin: () => '&infin', // infinity: ∞
  ang: () => '&ang', // angle: ∠
  and: () => '&and', // logical and = wedge: ∧
  or: () => '&or', // logical or = vee: ∨
  cap: () => '&cap', // intersection = cap: ∩
  cup: () => '&cup', // union = cup: ∪
  int: () => '&int', // integral: ∫
  there4: () => '&there4', // therefore: ∴
  sim: () => '&sim', // tilde operator = varies with = similar to: ∼
  cong: () => '&cong', // approximately equal to: ≅
  asymp: () => '&asymp', // almost equal to = asymptotic to: ≈
  ne: () => '&ne', // not equal to: ≠
  equiv: () => '&equiv', // identical to: ≡
  le: () => '&le', // less-than or equal to: ≤
  ge: () => '&ge', // greater-than or equal to: ≥
  sub: () => '&sub', // subset of: ⊂
  sup: () => '&sup', // superset of: ⊃
  nsub: () => '&nsub', // not a subset of: ⊄
  sube: () => '&sube', // subset of or equal to: ⊆
  supe: () => '&supe', // superset of or equal to: ⊇
  oplus: () => '&oplus', // circled plus = direct sum: ⊕
  otimes: () => '&otimes', // circled times = vector product: ⊗
  perp: () => '&perp', // up tack = orthogonal to = perpendicular: ⊥
  sdot: () => '&sdot', // dot operator: ⋅
  lceil: () => '&lceil', // left ceiling = apl upstile: ⌈
  rceil: () => '&rceil', // right ceiling: ⌉
  lfloor: () => '&lfloor', // left floor = apl downstile: ⌊
  rfloor: () => '&rfloor', // right floor: ⌋
  lang: () => '&lang', // left-pointing angle bracket = bra: ⟨
  rang: () => '&rang', // right-pointing angle bracket = ket: ⟩
  loz: () => '&loz', // lozenge: ◊
  spades: () => '&spades', // black spade suit: ♠
  clubs: () => '&clubs', // black club suit = shamrock: ♣
  hearts: () => '&hearts', // black heart suit = valentine: ♥
  diams: () => '&diams', // black diamond suit: ♦
  OElig: () => '&OElig', // latin capital ligature OE: Œ
  oelig: () => '&oelig', // latin small ligature oe: œ
  Scaron: () => '&Scaron', // latin capital letter S with caron: Š
  scaron: () => '&scaron', // latin small letter s with caron: š
  Yumlaut: () => '&Yuml', // latin capital letter Y with diaeresis: Ÿ
  circ: () => '&circ', // modifier letter circumflex accent: ˆ
  tilde: () => '&tilde', // small tilde: ˜
  ensp: () => '&ensp', // en space:
  emsp: () => '&emsp', // em space:
  thinsp: () => '&thinsp', // thin space:
  zwnj: () => '&zwnj', // zero width non-joiner: ‌
  zwj: () => '&zwj', // zero width joiner: ‍
  lrm: () => '&lrm', // left-to-right mark: ‎
  rlm: () => '&rlm', // right-to-left mark: ‏
  ndash: () => '&ndash', // en dash: –
  mdash: () => '&mdash', // em dash: —
  lsquo: () => '&lsquo', // left single quotation mark: ‘
  rsquo: () => '&rsquo', // right single quotation mark: ’
  sbquo: () => '&sbquo', // single low-9 quotation mark: ‚
  ldquo: () => '&ldquo', // left double quotation mark: “
  rdquo: () => '&rdquo', // right double quotation mark: ”
  bdquo: () => '&bdquo', // double low-9 quotation mark: „
  dagger: () => '&dagger', // dagger: †
  Dagger: () => '&Dagger', // double dagger: ‡
  permil: () => '&permil', // per mille sign: ‰
  lsaquo: () => '&lsaquo', // single left-pointing angle quotation mark: ‹
  rsaquo: () => '&rsaquo', // single right-pointing angle quotation mark: ›
  euro: () => '&euro', // euro sign: €
  tm: () => '™', // trade mark sign: ™
});

export default (element: Element) => applyToElement(mappers())(element);
