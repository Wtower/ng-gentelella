/**
 * Created by gkarak on 22/12/2016.
 */

angular
  .module('gaDashboardGraphBars')
  .component('gaDashboardGraphBars', {
    templateUrl: 'ng-gentelella/gentelella/ga-dashboard-graph-bars/ga-dashboard-graph-bars.template.html',
    bindings: {
      graphTitle: '@',
      graphSubTitle: '@',
      graphHeading: '@',
      graphData: '<'
    },
    transclude: true
  });
