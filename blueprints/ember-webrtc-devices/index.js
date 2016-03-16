module.exports = {
  description: 'WebRTC Devices',
  normalizeEntityName: function () {},

  afterInstall: function () {
    return this.addBowerPackageToProject('webrtc-adapter#gh-pages').then(() => {
      return this.addBowerPackageToProject('cheet.js#0.3.3');
    }).then(() => {
      return this.addBowerPackageToProject('requirejs');
    });
  }
};
