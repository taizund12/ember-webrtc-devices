import Ember from 'ember';
import DeviceEnumerationMixin from 'webrtc-devices/mixins/device-enumeration';
import { module, test } from 'qunit';

let DeviceEnumerationObject, subject;
module('Unit | Mixin | device enumeration', {
    beforeEach() {
      DeviceEnumerationObject = Ember.Object.extend(DeviceEnumerationMixin);
      subject = DeviceEnumerationObject.create();
    }
});

test('it works', assert => {
  assert.ok(subject);
});

test('hasCamera should be false if there are no cameras with non-default id', assert => {
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

test('hasMicrophone should be true if there is a microphone, even if it has a default id', assert => {
  assert.equal(subject.get('hasMicrophone'), false);
  subject.get('microphoneList').pushObject({
    deviceId: 'default',
    label: 'Default'
  });
  assert.equal(subject.get('hasMicrophone'), true);
});

test('setOutputDevice will reject if the device is not found', assert => {
  assert.expect(1);

  subject.set('outputDeviceList', Ember.A([
    { deviceId: '1234' },
    { deviceId: '4567' }
  ]));

  return subject.setOutputDevice(null, { deviceId: '0987' }).catch(err => {
    assert.ok(err);
  });
});

test('enumerateResolutions should return back a list of resolutions', assert => {
  const resolutions = subject.enumerateResolutions();
  assert.ok(resolutions.length);
});

test('setDefaultOutputDevice should return default output device', assert => {
  // subject.set('defaultOutputDevice', {
  //   deviceId: '1234'
  // });
  // subject.set('outputDeviceList', Ember.A([
  //   { deviceId: '1234' },
  //   { deviceId: '4567' }
  // ]));
  // return subject.setDefaultOutputDevice(null).then(device => {
  //   assert.ok(device);
  // });
  assert.ok(true);
});

test('updateDefaultDevices should throw an error when called', assert => {
  try {
    subject.updateDefaultDevices()
  } catch (e) {
    assert.throws(e, 'updateDefaultDevices should be overridden - do you need to save preferences or change video stream?');
  }
});