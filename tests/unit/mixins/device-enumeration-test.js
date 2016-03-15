import Ember from 'ember';
import DeviceEnumerationMixin from 'webrtc-devices/mixins/device-enumeration';
import { module, test } from 'qunit';

module('Unit | Mixin | device enumeration');

// Replace this with your real tests.
test('it works', function (assert) {
  let DeviceEnumerationObject = Ember.Object.extend(DeviceEnumerationMixin);
  let subject = DeviceEnumerationObject.create();
  assert.ok(subject);
});

test('hasCamera should by false if there are no cameras with non-default id', function (assert) {
  let DeviceEnumerationObject = Ember.Object.extend(DeviceEnumerationMixin);
  let subject = DeviceEnumerationObject.create();
  assert.equal(subject.get('hasCamera'), false);
});
