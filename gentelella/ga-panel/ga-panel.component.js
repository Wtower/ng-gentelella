/**
 * Created by gkarak on 30/9/2016.
 *
 * Render a gentelella simple panel.
 */

angular
  .module('gaPanel')
  .component('gaPanel', {
    templateUrl: 'ng-gentelella/gentelella/ga-panel/ga-panel.template.html',
    bindings: {
      panelTitle: '@',
      panelSubTitle: '@',
      panelQuery: '@',
      panelQueryString: '=',
      panelQueryModelOptions: '<',
      onQueryChange: '&',
      panelAddRecordUrl: '@'
    },
    transclude: {
      toolbar: '?panelToolbar'
    },
    controller: [
      function GaPanelController() {
        panelToolbox();
      }
    ]
  });
