module.exports = {
  description: 'WebRTC Devices',
  normalizeEntityName: function () {},

  afterInstall: function () {
    return this.addBowerPackageToProject('cheet.js#0.3.3');
  }
};
