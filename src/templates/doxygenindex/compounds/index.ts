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

export default (kind: CompoundKind, compounds: CompoundType[]) => {
  Handlebars.registerPartial('compound-item', compoundTemplate);

  let template;
  try {
    template = require('./' + kind).default;
  } catch {
    template = require('./default').default;
  }
  const result = template(kind, compounds);
  Handlebars.unregisterPartial('compound-item');
  return result;
};
