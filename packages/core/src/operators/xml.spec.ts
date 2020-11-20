import 'mocha';
import { expect } from 'chai';

import parseXml from '@rgrove/parse-xml';
import { pipe, asElementNode, selectElements, toChildren } from '../operators';

import { elementsById } from './xml';

const childElements = pipe(asElementNode, toChildren, selectElements);

describe('xml', () => {
  describe('elementsById', () => {
    specify('empty', () => {
      const xml = `<root></root>`;
      const {
        children: [root],
      } = parseXml(xml);
      const map = elementsById(root);
      expect(map).to.be.empty;
    });

    it('should get root element ID', () => {
      const xml = `<root id="id12345"></root>`;
      const {
        children: [root],
      } = parseXml(xml);
      const map = elementsById(root);
      expect(Object.keys(map).length).to.equal(1);
      expect(map['id12345']).to.exist;
    });

    it('should get root ID', () => {
      const xml = `<root id="rootid"></root>`;
      const {
        children: [root],
      } = parseXml(xml);

      const map = elementsById(root);
      expect(Object.keys(map).length).to.equal(1);
      expect(map['rootid']).to.equal(root);
    });

    it('should get children IDs', () => {
      const xml = `<root><child id="child1" /><child /><child id="child3" /></root>`;
      const {
        children: [root],
      } = parseXml(xml);
      const [child1, , child3] = childElements(root);

      const map = elementsById(root);
      expect(Object.keys(map).length).to.equal(2);
      expect(map['child1']).to.equal(child1);
      expect(map['child3']).to.equal(child3);
    });

    it('should get IDs on whole hierarchy', () => {
      const xml = `<root id="rootid">
          <child id="child1">
              <grandchild id="grandchild1" />
          </child>
          <child>
              <grandchild />
              <grandchild id="grandchild3" />
              <grandchild id="grandchild4" />
          </child>
          <child id="child3" />
      </root>`;
      const {
        children: [root],
      } = parseXml(xml);
      const [child1, child2, child3] = childElements(root);
      const [grandchild1] = childElements(child1);
      const [, grandchild3, grandchild4] = childElements(child2);

      const map = elementsById(root);
      expect(Object.keys(map).length).to.equal(6);
      expect(map['rootid']).to.equal(root);
      expect(map['child1']).to.equal(child1);
      expect(map['grandchild1']).to.equal(grandchild1);
      expect(map['grandchild3']).to.equal(grandchild3);
      expect(map['grandchild4']).to.equal(grandchild4);
      expect(map['child3']).to.equal(child3);
    });
  });
});
