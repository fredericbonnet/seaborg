import { CompoundType } from '@seaborg/core/lib/models';
import { bulletItem, indent, joinLines, md, ref } from '../../helpers';

export { default as contentsPage } from './contents-page';
export { default as indexPage } from './index-page';

/** Indented compound item */
export type IndentedItem = { compound: CompoundType; level: number };

/** Compound list template */
export const compoundList = (items: CompoundType[]) =>
  joinLines(items.map((item) => bulletItem(compoundItem(item))));

/** Compound tree template */
export const compoundTree = (items: IndentedItem[]) =>
  joinLines(
    items.map(
      (item) =>
        `${indent(item.level)}${bulletItem(compoundItem(item.compound))}`
    )
  );

/** Compound item template */
export const compoundItem = ({
  refid,
  title,
  name,
  briefdescription,
}: CompoundType) =>
  ref(refid, 'compound', title || md(name)) +
  (briefdescription ? `: ${briefdescription}` : '');
