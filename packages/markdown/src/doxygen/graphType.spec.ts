import 'mocha';
import { expect } from 'chai';

import parseXml, { Element } from '@rgrove/parse-xml';

import graphType from './graphType';

describe('graphType', () => {
  const render = (direction: string, reverse: boolean) => (xml: string) => {
    const {
      children: [root],
    } = parseXml(xml);
    return graphType(direction, reverse)(root as Element);
  };

  specify('empty', () => {
    const xml = `<incdepgraph></incdepgraph>`;
    const md = `
\`\`\`mermaid
graph LR
\`\`\`
`;
    expect(render('LR', false)(xml)).to.equal(md);
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
graph LR
1["first node"]
click 1 "file_12345.md#file_12345"
1 --> 1
1 --> 2
1 --> 3

2["second node"]
click 2 "file_67890.md#file_67890"
2 --> 3

\`\`\`
`;
    expect(render('LR', false)(xml)).to.equal(md);
  });
});
