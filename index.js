/* jshint node: true */
'use strict';

module.exports = {
  name: 'webrtc-devices',
  isDevelopingAddon: function () {
      return true;
  },
  included: function(app) {
    this._super.included(app);

    app.import(app.bowerDirectory + '/lodash/lodash.js');
    app.import(app.bowerDirectory + '/cheet.js/cheet.min.js');

    // Fix when https://github.com/webrtc/adapter/issues/206
    app.import(app.bowerDirectory + '/webrtc-adapter/adapter-1.0.4.js');
  }
};
