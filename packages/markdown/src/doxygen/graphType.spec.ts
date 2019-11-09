import 'mocha';
import { expect } from 'chai';

import parseXml, { Element } from '@rgrove/parse-xml';

import graphType from './graphType';

const render = (xml: string) => {
  const {
    children: [root],
  } = parseXml(xml);
  return graphType(root as Element);
};

describe('graphType', () => {
  specify('empty', () => {
    const xml = `<incdepgraph></incdepgraph>`;
    const md = `
\`\`\`mermaid
graph TB
\`\`\`
`;
    expect(render(xml)).to.equal(md);
  });
  specify('full example', () => {
    const xml = `<incdepgraph>
            <node id="1">
                <label>first node</label>
                <link refid="file_12345"/>
                <childnode refid="1" relation="include"></childnode>
                <childnode refid="2" relation="include"></childnode>
                <childnode refid="3" relation="include"></childnode>
            </node>
            <node id="2">
                <label>second node</label>
                <link refid="file_67890"/>
                <childnode refid="3" relation="include"></childnode>
            </node>
        </incdepgraph>`;
    const md = `
\`\`\`mermaid
graph TB
1["first node"]
click 1 "file_12345.md"
1 --> 1
1 --> 2
1 --> 3

2["second node"]
click 2 "file_67890.md"
2 --> 3

\`\`\`
`;
    expect(render(xml)).to.equal(md);
  });
});
