/**
 * Created by gkarak on 2/10/2016.
 *
 * Render a gentelella panel with standard actions.
 */

angular
  .module('gaPanelActions')
  .component('gaPanelActions', {
    templateUrl: 'ng-gentelella/gentelella/ga-panel-actions/ga-panel-actions.template.html',
    bindings: {
      actionForm: '<',
      actionCloseUrl: '@',
      actionAllowDelete: '<',
      onDelete: '&'
    },
    require: {
      panelCtrl: '^gaPanel'
    },
    transclude: true,
    controller: [
      function GaPanelActionsController() {
        panelToolbox();
      }
    ]
  });
