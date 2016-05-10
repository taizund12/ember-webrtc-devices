import Ember from 'ember';
import DeviceEnumerationMixin from 'webrtc-devices/mixins/device-enumeration';
import { module, test } from 'qunit';

module('Unit | Mixin | device enumeration');

// Replace this with your real tests.
test('it works', function (assert) {
  const DeviceEnumerationObject = Ember.Object.extend(DeviceEnumerationMixin);
  const subject = DeviceEnumerationObject.create();
  assert.ok(subject);
});

test('hasCamera should be false if there are no cameras with non-default id', function (assert) {
  const DeviceEnumerationObject = Ember.Object.extend(DeviceEnumerationMixin);
  const subject = DeviceEnumerationObject.create();
  assert.equal(subject.get('hasCamera'), false);
});

test('canShareVideo should be false if hasCamera is false', function (assert) {
  const DeviceEnumerationObject = Ember.Object.extend(DeviceEnumerationMixin);
  const subject = DeviceEnumerationObject.create();
  subject.set('canListDevices', true);
  subject.set('hasCamera', false);
  assert.equal(subject.get('canShareVideo'), false);
});

test('canShareVideo should be true if canListDevices is false', function (assert) {
  const DeviceEnumerationObject = Ember.Object.extend(DeviceEnumerationMixin);
  const subject = DeviceEnumerationObject.create();
  subject.set('canListDevices', false);
  assert.equal(subject.get('canShareVideo'), true);
});

test('canShareVideo should be true if hasCameraPermission and canListDevices is true', function (assert) {
  const DeviceEnumerationObject = Ember.Object.extend(DeviceEnumerationMixin);
  const subject = DeviceEnumerationObject.create();
  subject.set('canListDevices', true);
  subject.set('hasCamera', true);
  subject.set('hasCameraPermission', true);
  assert.equal(subject.get('canShareVideo'), true);
});

test('canShareVideo should be false if hasCameraPermission is false and hasMicPermission is true and hasCamera is false', function (assert) {
  const DeviceEnumerationObject = Ember.Object.extend(DeviceEnumerationMixin);
  const subject = DeviceEnumerationObject.create();
  subject.set('canListDevices', true);
  subject.set('hasCameraPermission', false);
  subject.set('hasMicPermission', true);
  subject.set('hasCamera', true);
  assert.equal(subject.get('canShareVideo'), false);

  subject.set('hasMicPermission', false);
  subject.set('hasCamera', true);
  assert.equal(subject.get('canShareVideo'), true);

  subject.set('hasMicPermission', false);
  subject.set('hasCamera', false);
  assert.equal(subject.get('canShareVideo'), false);
});

test('canShareAudio should be false if hasMicrophone is false', function (assert) {
  const DeviceEnumerationObject = Ember.Object.extend(DeviceEnumerationMixin);
  const subject = DeviceEnumerationObject.create();
  subject.set('canListDevices', true);
  subject.set('hasMicrophone', false);
  assert.equal(subject.get('canShareAudio'), false);
});

test('canShareAudio should be true if canListDevices is false', function (assert) {
  const DeviceEnumerationObject = Ember.Object.extend(DeviceEnumerationMixin);
  const subject = DeviceEnumerationObject.create();
  subject.set('canListDevices', false);
  assert.equal(subject.get('canShareAudio'), true);
});

test('canShareAudio should be true if hasMicPermission and canListDevices is true', function (assert) {
  const DeviceEnumerationObject = Ember.Object.extend(DeviceEnumerationMixin);
  const subject = DeviceEnumerationObject.create();
  subject.set('canListDevices', true);
  subject.set('hasMicrophone', true);
  subject.set('hasMicPermission', true);
  assert.equal(subject.get('canShareAudio'), true);
});

test('canShareAudio should be false if hasCameraPermission is false and hasCameraPermission is true and hasMicrophone is false', function (assert) {
  const DeviceEnumerationObject = Ember.Object.extend(DeviceEnumerationMixin);
  const subject = DeviceEnumerationObject.create();
  subject.set('canListDevices', true);
  subject.set('hasMicPermission', false);
  subject.set('hasCameraPermission', true);
  subject.set('hasMicrophone', true);
  assert.equal(subject.get('canShareAudio'), false);

  subject.set('hasCameraPermission', false);
  subject.set('hasMicrophone', true);
  assert.equal(subject.get('canShareAudio'), true);

  subject.set('hasCameraPermission', false);
  subject.set('hasMicrophone', false);
  assert.equal(subject.get('canShareAudio'), false);
});

test('setOutputDevice will reject if the device is not found', function (assert) {
  assert.expect(1);

  const DeviceEnumerationObject = Ember.Object.extend(DeviceEnumerationMixin);
  const subject = DeviceEnumerationObject.create();

  subject.set('outputDeviceList', Ember.A([
    { deviceId: '1234' },
    { deviceId: '4567' }
  ]));

  subject.setOutputDevice(null, { deviceId: '0987' }).catch(function (err) {
    assert.ok(err);
  });
});
