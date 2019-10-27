/*
  <xsd:group name="docVariableListGroup">
    <xsd:sequence>
      <xsd:element name="varlistentry" type="docVarListEntryType" />
      <xsd:element name="listitem" type="docListItemType" />
    </xsd:sequence>
  </xsd:group>
*/

import { Mappers } from '../mappers';
import { docVarListEntryType, docListItemType } from '.';

export default (): Mappers => ({
  varlistentry: docVarListEntryType,
  listitem: docListItemType,
});
