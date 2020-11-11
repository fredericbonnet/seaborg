import { CompoundType } from '@seaborg/core/lib/models';
import { indent, md, ref } from '../../helpers';

export { default as contentsPage } from './contents-page';
export { default as indexPage } from './index-page';

/** Indented compound item */
export type IndentedItem = { compound: CompoundType; level: number };

/** Compound list template */
export const compoundList = (items: CompoundType[]) =>
  items.map((item) => `* ${compoundItem(item)}`).join('\n');

/** Compound tree template */
export const compoundTree = (items: IndentedItem[]) =>
  items
    .map((item) => `${indent(item.level)}* ${compoundItem(item.compound)}`)
    .join('\n');

/** Compound item template */
export const compoundItem = ({
  refid,
  title,
  name,
  briefdescription,
}: CompoundType) =>
  ref(refid, 'compound', title || md(name)) +
  (briefdescription ? `: ${briefdescription}` : '');
