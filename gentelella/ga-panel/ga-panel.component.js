/**
 * Created by gkarak on 30/9/2016.
 *
 * Render a gentelella simple panel.
 */

angular
  .module('gaPanel')
  .component('gaPanel', {
    templateUrl: 'static/ng-gentelella/ga-panel/ga-panel.template.html',
    bindings: {
      panelTitle: '@',
      panelSubTitle: '@',
      panelQuery: '@',
      panelQueryString: '=',
      panelAddRecordUrl: '@'
    },
    transclude: true,
    controller: [
      function GaPanelController() {
        panelToolbox();
      }
    ]
  });
