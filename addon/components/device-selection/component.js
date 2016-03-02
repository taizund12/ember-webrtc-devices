/* global cheet */

import Ember from 'ember';
import layout from './template';

const {
    computed,
    Component,
    inject
} = Ember;

export default Component.extend({
    layout: layout,
    classNameBindings: [':device-selection'],

    selectedCamera: null,
    selectedMicrophone: null,
    selectedResolution: null,
    selectedFilter: null,

    audio: true,
    video: true,

    webrtc: inject.service(),

    canShareAudio: computed.reads('webrtc.canShareAudio'),
    canShareVideo: computed.reads('webrtc.canShareVideo'),

    // selectedOutputDevice is provided by the rendering component, and will
    // propagate up when chaged, but the _selectedOutputDevice computed
    // allows us to do some low level work when the selection changes
    selectedOutputDevice: null,
    _selectedOutputDevice: computed('selectedOutputDevice', {
        get: function () {
            return this.get('selectedOutputDevice');
        },
        set: _.debounce(function (key, val) {
            const audio = this.$('.preview-audio')[0];
            const outputDevice = val;
            if (!audio || !outputDevice) {
                return;
            }
            audio.muted = true;
            audio.currentTime = 0;
            audio.play();
            this.get('webrtc').setOutputDevice(audio, outputDevice).then(function () {
                audio.pause();
                audio.muted = false;
            });
            this.set('selectedOutputDevice', val);
            return val;
        }, 250)
    }),

    didInsertElement() {
        this._super(...arguments);

        if (!this.get('video')) {
            return;
        }

        cheet('i n s t a', () => {
            this.set('advancedOptions', ['willow', 'sutro', 'lofi', 'kelvin', 'inkwell', 'sepia', 'tint', 'none']);
        });
    },

    willDestroyElement() {
        this._super(...arguments);

        if (!this.get('video')) {
            return;
        }

        cheet.disable('i n s t a');
        this.set('advancedOptions', null);
    },

    actions: {
        playTestSound: function () {
            const audio = this.$('.preview-audio')[0];
            audio.currentTime = 0;
            audio.play();
        }
    }
});
