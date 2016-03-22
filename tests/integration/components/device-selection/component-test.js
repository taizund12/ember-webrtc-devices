/* global QUnit, fillIn, expect */

import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const tHelper = Ember.Helper.extend({
  compute: (params) => params[0]
});

const andHelper = Ember.Helper.extend({
  compute: (params) => params[0] && params[1]
});

import startApp from '../../../helpers/start-app';

QUnit.testStart(function () {
  window.App = startApp();
});

const webrtcService = Ember.Service.extend({
  canShareAudio: true,
  canListDevices: true,
  canShareVideo: true,
  cameraList: Ember.A(),
  microphoneList: Ember.A(),
  outputDeviceList: Ember.A(),
  resolutionList: Ember.A(),
  setOutputDevice: function () { return Ember.RSVP.resolve(); }
});

const mockDevices = [
  { deviceId: 'foobarId', label: 'foobar label' },
  { deviceId: 'fizzbuzzId', label: 'fizzbuzz label' }
];

const mockResolutions = [
  { presetId: 1, label: 'low' },
  { presetId: 2, label: 'high' }
];

const renderDefault = function () {
  this.render(hbs`
        {{device-selection
          selectedCamera=camera
          selectedMicrophone=microphone
          selectedOutputDevice=outputDevice
          selectedResolution=resolution
          video=video
          audio=audio
          }}
    `);
};

const hasAudioSupport = function () {
  const audio = document.createElement('source');
  return !!audio.play;
};

moduleForComponent('device-selection', 'Integration | Component | device selection', {
  integration: true,

  beforeEach: function () {
    this.register('helper:t', tHelper);
    this.register('helper:and', andHelper);
    this.register('service:webrtc', webrtcService);
    this.inject.service('webrtc', { as: 'webrtc' });
    this.renderDefault = renderDefault.bind(this);
    this.get('webrtc.resolutionList').clear();
    this.get('webrtc.cameraList').clear();
    this.get('webrtc.microphoneList').clear();
    this.get('webrtc.outputDeviceList').clear();
    this.set('camera', null);
    this.set('microphone', null);
    this.set('resolution', null);
    this.set('outputDevice', null);
    this.set('video', true);
    this.set('audio', true);
  }
});

test('it renders', function (assert) {
  // Set any properties with this.set('myProperty', 'value')
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.renderDefault();

  assert.equal(this.$('.options').length, 1);
});

test('it shows a message iff the browser cannot enumerate devices', function (assert) {
  this.set('webrtc.canListDevices', false);
  this.renderDefault();
  assert.equal(this.$('.browser-settings-message').length, 1);

  this.set('webrtc.canListDevices', true);
  this.renderDefault();
  assert.equal(this.$('.browser-settings-message').length, 0);
});

test('it shows a camera select and resolution select iff there are cameras, and video is true, and there are resolutions', function (assert) {
  return Ember.run(this, function () {
    this.get('webrtc.cameraList').pushObjects(mockDevices);
    this.get('webrtc.resolutionList').pushObjects(mockResolutions);
    this.renderDefault();
    assert.equal(this.$('select').length, 2);

    this.get('webrtc.cameraList').clear();
    this.renderDefault();
    assert.equal(this.$('select').length, 0);

    this.get('webrtc.cameraList').pushObjects(mockDevices);
    this.set('video', false);
    this.renderDefault();

    assert.equal(this.$('select').length, 0);
  });
});

test('it shows microphone select iff there are microphones and audio is true', function (assert) {
  return Ember.run(this, function () {
    this.get('webrtc.microphoneList').pushObjects(mockDevices);
    this.renderDefault();
    assert.equal(this.$('select').length, 1);

    this.get('webrtc.microphoneList').pushObjects(mockDevices);
    this.set('audio', false);
    this.renderDefault();

    assert.equal(this.$('select').length, 0);
  });
});

test('it should start with specified camera', function (assert) {
  return Ember.run(this, function () {
    this.get('webrtc.cameraList').pushObjects(mockDevices);
    this.set('camera', mockDevices[0]);
    this.renderDefault();

    assert.equal(this.$('select').val(), mockDevices[0].deviceId);
    assert.equal(this.$('select option:selected').text(), mockDevices[0].label);

    this.set('camera', mockDevices[1]);
    this.renderDefault();

    assert.equal(this.$('select').val(), mockDevices[1].deviceId);
    assert.equal(this.$('select option:selected').text(), mockDevices[1].label);
  });
});

test('it should start with specified mic', function (assert) {
  return Ember.run(this, function () {
    this.get('webrtc.microphoneList').pushObjects(mockDevices);
    this.set('microphone', mockDevices[0]);
    this.renderDefault();

    assert.equal(this.$('select').val(), mockDevices[0].deviceId);
    assert.equal(this.$('select option:selected').text(), mockDevices[0].label);

    this.set('microphone', mockDevices[1]);
    this.renderDefault();

    assert.equal(this.$('select').val(), mockDevices[1].deviceId);
    assert.equal(this.$('select option:selected').text(), mockDevices[1].label);
  });
});

test('it should start with specified outputDevice', function (assert) {
  return Ember.run(this, function () {
    if (!hasAudioSupport()) {
      return expect(0);
    }

    this.get('webrtc.outputDeviceList').pushObjects(mockDevices);
    this.set('outputDevice', mockDevices[0]);
    this.renderDefault();

    assert.equal(this.$('select[id*="-speakers-select"]').val(), mockDevices[0].deviceId);
    assert.equal(this.$('select[id*="-speakers-select"] option:selected').text(), mockDevices[0].label);

    this.set('outputDevice', mockDevices[1]);
    this.renderDefault();

    assert.equal(this.$('select[id*="-speakers-select"]').val(), mockDevices[1].deviceId);
    assert.equal(this.$('select[id*="-speakers-select"] option:selected').text(), mockDevices[1].label);
  });
});

test('it should start with specified resolution', function (assert) {
  return Ember.run(this, function () {
    this.get('webrtc.resolutionList').pushObjects(mockResolutions);
    this.get('webrtc.cameraList').pushObjects(mockDevices);
    this.set('resolution', mockResolutions[0]);
    this.renderDefault();

    assert.equal(this.$('select[id*="-resolution-select"]').val(), mockResolutions[0].presetId);
    assert.equal(this.$('select[id*="-resolution-select"] option:selected').text(), mockResolutions[0].label);

    this.set('resolution', mockResolutions[1]);
    this.renderDefault();

    assert.equal(this.$('select[id*="-resolution-select"]').val(), mockResolutions[1].presetId);
    assert.equal(this.$('select[id*="-resolution-select"] option:selected').text(), mockResolutions[1].label);
  });
});

test('it should change camera', function (assert) {
  return Ember.run(this, function () {
    this.get('webrtc.cameraList').pushObjects(mockDevices);
    this.set('camera', mockDevices[0]);
    this.renderDefault();

    const select = this.$('select');
    assert.equal(select.val(), mockDevices[0].deviceId);

    fillIn('select', mockDevices[1].deviceId).then(() => {
      assert.equal(this.get('camera'), mockDevices[1]);
      this.get('webrtc.cameraList').clear();
    });
  });
});

test('it should change mic', function (assert) {
  return Ember.run(this, function () {
    this.get('webrtc.microphoneList').pushObjects(mockDevices);
    this.set('microphone', mockDevices[0]);
    this.renderDefault();

    const select = this.$('select');
    assert.equal(select.val(), mockDevices[0].deviceId);

    fillIn('select', mockDevices[1].deviceId).then(() => {
      assert.equal(this.get('microphone'), mockDevices[1]);
    });
  });
});

test('it should change resolution', function (assert) {
  return Ember.run(this, function () {
    this.get('webrtc.cameraList').pushObjects(mockDevices);
    this.get('webrtc.resolutionList').pushObjects(mockResolutions);
    this.renderDefault();

    const select = this.$('select[id*="-resolution-select"]');
    assert.equal(select.val(), mockResolutions[0].presetId);

    var self = this;
    return fillIn('select[id*="-resolution-select"]', mockResolutions[1].presetId).then(() => {
      assert.equal(self.get('resolution'), mockResolutions[1]);
    });
  });
});

test('it should change outputDevice', function (assert) {
  return Ember.run(this, function () {
    if (!hasAudioSupport()) {
      return expect(0);
    }
    this.get('webrtc.outputDeviceList').pushObjects(mockDevices);
    this.set('audio', true);
    this.renderDefault();

    const select = this.$('select[id*="-speakers-select"]');
    assert.equal(select.val(), mockDevices[0].deviceId);

    fillIn('select[id*="-speakers-select"]', mockDevices[1].deviceId).then(() => {
      assert.equal(this.get('outputDevice'), mockDevices[1]);
    });
  });
});
