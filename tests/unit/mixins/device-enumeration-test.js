import Ember from 'ember';
import DeviceEnumerationMixin from 'webrtc-devices/mixins/device-enumeration';
import { module, test } from 'qunit';

module('Unit | Mixin | device enumeration');

// Replace this with your real tests.
test('it works', function(assert) {
  let DeviceEnumerationObject = Ember.Object.extend(DeviceEnumerationMixin);
  let subject = DeviceEnumerationObject.create();
  assert.ok(subject);
});
