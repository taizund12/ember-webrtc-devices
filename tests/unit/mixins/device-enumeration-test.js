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
  subject.get('cameraList').pushObject({
    deviceId: 'default',
    label: 'Default'
  });
  assert.equal(subject.get('hasCamera'), false);
  subject.get('cameraList').pushObject({
    deviceId: 'asdfFoobar',
    label: 'Cutiebot Jr'
  });
  assert.equal(subject.get('hasCamera'), true);
});

test('hasMicrophone should be true if there is a microphone, even if it has a default id', function (assert) {
  const DeviceEnumerationObject = Ember.Object.extend(DeviceEnumerationMixin);
  const subject = DeviceEnumerationObject.create();
  assert.equal(subject.get('hasMicrophone'), false);
  subject.get('microphoneList').pushObject({
    deviceId: 'default',
    label: 'Default'
  });
  assert.equal(subject.get('hasMicrophone'), true);
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
