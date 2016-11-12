/**
 * Created by gkarak on 12/11/2016.
 */

angular
  .module('gaDashboardCounter')
  .component('gaDashboardCounter', {
    templateUrl: 'static/ng-gentelella/ga-dashboard-counter/ga-dashboard-counter.template.html',
    bindings: {
      counterIcon: '@',
      counterVar: '<',
      counterTitle: '@'
    },
    transclude: true
  });
