import 'mocha';
import { expect } from 'chai';

import parseXml, { Element } from '@rgrove/parse-xml';

import { itemizedlist, orderedlist } from './docListType';

describe('docListType', () => {
  describe('itemizedlist', () => {
    const render = (xml: string) => {
      const {
        children: [root],
      } = parseXml(xml);
      return itemizedlist(root as Element);
    };

    specify('empty', () => {
      const xml = `<itemizedlist></itemizedlist>`;
      const md = '';
      expect(render(xml)).to.equal(md);
    });
    specify('non-empty', () => {
      const xml = `<itemizedlist>
            <listitem><para>First</para></listitem>
            <listitem><para>Second</para></listitem>
        </itemizedlist>`;
      const md = `* First

* Second
`;
      expect(render(xml)).to.equal(md);
    });
  });

  describe('orderedlist', () => {
    const render = (xml: string) => {
      const {
        children: [root],
      } = parseXml(xml);
      return orderedlist(root as Element);
    };

    specify('empty', () => {
      const xml = `<orderedlist></orderedlist>`;
      const md = '';
      expect(render(xml)).to.equal(md);
    });
    specify('non-empty', () => {
      const xml = `<itemizedlist>
            <listitem><para>First</para></listitem>
            <listitem><para>Second</para></listitem>
        </itemizedlist>`;
      const md = `1. First

2. Second
`;
      expect(render(xml)).to.equal(md);
    });
  });
});
