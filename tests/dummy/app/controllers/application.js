import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    openTroubleshoot () {
      alert('troubleshooting!'); // eslint-disable-line
    }
  }
});
