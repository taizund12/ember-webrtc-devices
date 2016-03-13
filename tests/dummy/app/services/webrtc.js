import Ember from 'ember';
import DeviceEnumerationMixin from 'webrtc-devices/mixins/device-enumeration';
export default Ember.Service.extend(DeviceEnumerationMixin, {
    intl: Ember.inject.service(),
    canShareAudio: true,
    canListDevices: true,
    canShareVideo: true,
    cameraList: Ember.A(),
    microphoneList: Ember.A(),
    outputDeviceList: Ember.A(),
    resolutionList: Ember.A(),

    init() {
        this._super(...arguments);
        this.initDevices();
    },

    lookup(key, hash) {
        const intl = this.get('intl');
        return intl.formatHtmlMessage(intl.findTranslationByKey(key), hash);
    }
});
