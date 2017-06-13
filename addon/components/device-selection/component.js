/* global cheet */

// import LoggerMixin from 'web-directory/mixins/logger'
import Ember from 'ember';
import layout from './template';

const {computed, RSVP, Component, inject, run} = Ember;

export default Component.extend(/* LoggerMixin, */{
  layout: layout,
  classNameBindings: [':device-selection'],

  selectedCamera: null,
  selectedMicrophone: null,
  selectedResolution: null,
  selectedOutputDevice: null,
  selectedFilter: null,

  audio: true,
  video: true,
  troubleshoot: true,

  webrtc: inject.service(),

  audioCallCapable: computed.reads('webrtc.audioCallCapable'),
  videoCallCapable: computed.reads('webrtc.videoCallCapable'),

  // TODO: remove this when we can get an event from intl about translations being loaded
  init() {
    this._super(...arguments);

    this.get('webrtc').enumerateDevices();
    this.get('webrtc').enumerateResolutions();
  },

  didInsertElement () {
    this._super(...arguments);

    run.scheduleOnce('afterRender', () => {
      if (this.get('video')) {
        cheet('i n s t a', () => {
          this.set('advancedOptions', ['willow', 'sutro', 'lofi', 'kelvin', 'inkwell', 'sepia', 'tint', 'none']);
        });
      }
    });
  },

  didReceiveAttrs () {
    this._super(...arguments);

    this.send('changeCamera', this.get('selectedCamera.deviceId'));
    this.send('changeMicrophone', this.get('selectedMicrophone.deviceId'));
    this.send('changeResolution', this.get('selectedResolution.presetId'));
    this.send('changeOutputDevice', this.get('selectedOutputDevice.deviceId'));
  },

  willDestroyElement () {
    this._super(...arguments);

    if (this.get('video')) {
      cheet.disable('i n s t a');
      this.set('advancedOptions', null);
    }
  },

  selectedCameraId: computed.reads('selectedCamera.deviceId'),
  selectedResolutionId: computed.reads('selectedResolution.presetId'),
  selectedMicrophoneId: computed.reads('selectedMicrophone.deviceId'),
  selectedOutputDeviceId: computed.reads('selectedOutputDevice.deviceId'),

  showTroubleshoot: computed('troubleshoot', function () {
    return this.get('troubleshoot') && typeof this.attrs.openTroubleshoot === 'function';
  }),

  actions: {
    openTroubleshoot () {
      if (typeof this.attrs.openTroubleshoot === 'function') {
        this.attrs.openTroubleshoot();
      }
    },

    playTestSound () {
      const audio = this.$('.preview-audio')[0];

      const outputDevice = this.get('selectedOutputDevice');

      if (!audio) {
        return;
      }

      if (!audio.play) {
        return console.warn('Audio playback not supported');
      }

      audio.muted = true;
      audio.currentTime = 0;
      const playPromise = audio.play() || RSVP.resolve();
      playPromise.then(() => {
        if (outputDevice) {
          return this.get('webrtc').setOutputDevice(audio, outputDevice);
        }
        return Promise.resolve();
      }).then(() => {
        return audio.pause() || RSVP.resolve();
      }).then(() => {
        audio.muted = false;
        audio.currentTime = 0;
        audio.play();
      });
    },

    changeCamera (id) {
      if (this.get('selectedCamera.deviceId') !== id) {
        this.set('selectedCamera', this.get('webrtc.cameraList').findBy('deviceId', id));
      }
    },

    changeMicrophone (id) {
      if (this.get('selectedMicrophone.deviceId') !== id) {
        this.set('selectedMicrophone', this.get('webrtc.microphoneList').findBy('deviceId', id));
      }
    },

    changeOutputDevice (id) {
      if (this.get('selectedOutputDevice.deviceId') !== id) {
        this.set('selectedOutputDevice', this.get('webrtc.outputDeviceList').findBy('deviceId', id));
      }
    },

    changeResolution (id) {
      if (this.get('selectedResolution.presetId') !== id) {
        this.set('selectedResolution', this.get('webrtc.resolutionList').findBy('presetId', id));
      }
    },

    changeFilter (filter) {
      this.set('selectedFilter', filter);
      this.get('webrtc').setFilter(filter);
    }
  }
});
