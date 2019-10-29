import Handlebars from 'handlebars';

import { DoxygenType } from '@seaborg/core/lib/models';

const template = Handlebars.compile(
  `
# Contents

{{#each compounds}}
* {{#if title}}{{ref refid "compound" title}}{{else}}{{ref refid "compound" (md name)}}{{/if}} {{compound-label kind}}
    {{#each members}}
    * {{ref refid "member" (md name)}} {{member-label kind}}
    {{/each}}
{{/each}}
`,
  { noEscape: true }
);

export default (index: DoxygenType) => {
  const { compounds } = index;
  return template({ compounds });
};
