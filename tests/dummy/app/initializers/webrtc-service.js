import WebrtcService from '../services/webrtc';

export default {
  name: 'setupWebrtcService',
  initialize: function (container, application) {
    application.register('service:webrtc', WebrtcService, {singleton: true, initialize: true});
  }
};
