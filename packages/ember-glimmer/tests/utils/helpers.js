import { setupApplicationRegistry, setupEngineRegistry } from 'ember-glimmer/setup-registry';
import { default as _buildOwner } from 'container/tests/test-helpers/build-owner';
import jQuery from 'ember-views/system/jquery';
import RootTemplate from 'ember-glimmer/templates/root';

export {
  compile,
  precompile
} from 'ember-glimmer-template-compiler/tests/utils/helpers';
export { default as Helper, helper } from 'ember-glimmer/helper';
export { INVOKE } from 'ember-glimmer/helpers/action';
export { default as Component } from 'ember-glimmer/component';
export { default as Checkbox } from 'ember-glimmer/components/checkbox';
export { default as TextArea } from 'ember-glimmer/components/text_area';
export { default as TextField } from 'ember-glimmer/components/text_field';
export { default as LinkTo } from 'ember-glimmer/components/link-to';
export { DOMChanges } from 'glimmer-runtime';
export { InteractiveRenderer, InertRenderer } from 'ember-glimmer/renderer';
export { default as makeBoundHelper } from 'ember-glimmer/make-bound-helper';
export { htmlSafe, SafeString } from 'ember-glimmer/utils/string';
import dictionary from 'ember-metal/dictionary';

export function buildOwner(options) {
  let owner = _buildOwner(options);
  setupEngineRegistry(owner.__registry__);
  setupApplicationRegistry(owner.__registry__);

  owner.register('service:-document', document, { instantiate: false });
  owner.register('-environment:main', {
    isInteractive: true,
    hasDOM: true,
    options: { jQuery }
  }, { instantiate: false });
  owner.inject('view', '_environment', '-environment:main');
  owner.inject('component', '_environment', '-environment:main');
  owner.inject('service:-dom-helper', 'document', 'service:-document');
  owner.inject('view', 'renderer', 'renderer:-dom');
  owner.inject('component', 'renderer', 'renderer:-dom');
  owner.inject('template', 'env', 'service:-glimmer-environment');

  owner.register('-view-registry:main', { create() { return dictionary(null); } });
  owner.inject('renderer', '_viewRegistry', '-view-registry:main');

  owner.register('template:-root', RootTemplate);
  owner.inject('renderer', 'rootTemplate', 'template:-root');

  return owner;
}
