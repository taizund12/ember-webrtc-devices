import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const tHelper = Ember.Helper.extend({
  compute: (params) => params[0]
});

const andHelper = Ember.Helper.extend({
  compute: (params) => params[0] && params[1]
});

const webrtcService = Ember.Service.extend({
  canShareAudio: true,
  canListDevices: true,
  canShareVideo: true,
  cameraList: Ember.A(),
  microphoneList: Ember.A(),
  outputDeviceList: Ember.A(),
  resolutionList: Ember.A()
});

const mockDevices = [
  { deviceId: 'foobar', label: 'foobar' },
  { deviceId: 'fizzbuzz', label: 'fizzbuzz' }
];

const renderDefault = function () {
  this.render(hbs`
        {{device-selection}}
    `);
};

moduleForComponent('device-selection', 'Integration | Component | device selection', {
  integration: true,

  beforeEach: function () {
    this.register('helper:t', tHelper);
    this.register('helper:and', andHelper);
    this.register('service:webrtc', webrtcService);
    this.inject.service('webrtc', { as: 'webrtc' });
    this.renderDefault = renderDefault.bind(this);
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

test('it shows a camera select and resolution select iff there are cameras, and video is true', function (assert) {
  this.set('webrtc.cameraList', mockDevices);
  this.renderDefault();
  assert.equal(this.$('select').length, 2);

  this.set('webrtc.cameraList', []);
  this.renderDefault();
  assert.equal(this.$('select').length, 0);

  this.set('webrtc.cameraList', mockDevices);
  this.render(hbs`
        {{device-selection video=false}}
    `);
  assert.equal(this.$('select').length, 0);
});

test('it shows microphone select iff there are microphones and audio is true', function (assert) {
  this.set('webrtc.microphoneList', mockDevices);
  this.renderDefault();
  assert.equal(this.$('select').length, 1);

  this.set('webrtc.microphoneList', mockDevices);
  this.render(hbs`
        {{device-selection audio=false}}
    `);
  assert.equal(this.$('select').length, 0);
});

// TODO: test initial selection of the selects

// TODO: test changing value of the selects
