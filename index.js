'use strict';

const mergeTrees = require('broccoli-merge-trees');
const WatchedDir = require('broccoli-source').WatchedDir;
const json = require('broccoli-json-module');

module.exports = {
  name: 'webrtc-devices',
  isDevelopingAddon: function () {
    return true;
  },
  included: function (app) {
    this._super.included(app);

    this.translation = new WatchedDir('translations');

    app.import(app.bowerDirectory + '/lodash/lodash.js');
    app.import(app.bowerDirectory + '/cheet.js/cheet.min.js');
    app.import(app.bowerDirectory + '/webrtcsupport/webrtcsupport.bundle.js');

    // Fix when https://github.com/webrtc/adapter/issues/206
    app.import(app.bowerDirectory + '/webrtc-adapter/adapter-1.0.4.js');
  },
  treeForApp: function (tree) {
    const trees = [tree];
    trees.push(json(tree));

    return mergeTrees(trees, { overwrite: true });
  },
  treeForPublic: function (tree) {
    return tree;
  }
};
