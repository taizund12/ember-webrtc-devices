import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const tHelper = Ember.Helper.extend({
    compute: (params) => params[0]
});

const webrtcService = Ember.Service.extend({
    canShareAudio: true,
    canShareVideo: true,
    cameraList: Ember.A(),
    microphoneList: Ember.A(),
    outputDeviceList: Ember.A(),
    resolutionList: Ember.A()
});

moduleForComponent('device-selection', 'Integration | Component | device selection', {
    integration: true,
    beforeEach: function () {
        this.register('helper:t', tHelper);
        this.register('service:webrtc', webrtcService);
    }
});

test('it renders', function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });"

    this.render(hbs`
        {{device-selection}}
    `);

    assert.equal(this.$('.options').length, 1);
});
