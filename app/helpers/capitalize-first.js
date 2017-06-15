import Ember from 'ember';

export function capitalizeFirst([word]) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export default Ember.Helper.helper(capitalizeFirst);
