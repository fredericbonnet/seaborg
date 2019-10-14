import Handlebars from 'handlebars';

import { CompoundKind, CompoundType } from '../../../app/models/doxygen';

const compoundTemplate = Handlebars.compile(`
{{~#if title ~}}
{{ref refid "compound" title}}
{{~ else ~}}
{{ref refid "compound" (md name)}}
{{~/if ~}}
{{~#if briefdescription}}: {{briefdescription}}{{/if ~}}
`);

Handlebars.registerPartial('compound-item', compoundTemplate);

export default (kind: CompoundKind, compounds: CompoundType[]) => {
  let template;
  try {
    template = require('./' + kind).default;
  } catch {
    template = require('./default').default;
  }
  const result = template(kind, compounds);

  return result;
};
