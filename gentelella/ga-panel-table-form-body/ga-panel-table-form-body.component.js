/**
 * Created by gkarak on 30/9/2016.
 *
 * Render an accordion row for a ga-panel-table-form.
 */

angular
  .module('gaPanelTableFormBody')
  .component('gaPanelTableFormBody', {
    templateUrl: 'ng-gentelella/gentelella/ga-panel-table-form-body/ga-panel-table-form-body.template.html',
    bindings: {
      bodyId: '@',
      bodyValue: '='
    },
    require: {
      panelTableFormCtrl: '^gaPanelTableForm'
    },
    transclude: {
      row: 'bodyRow',
      form: 'bodyForm'
    }
  });
