/**
 * Created by gkarak on 30/9/2016.
 *
 * Render a gentelella panel featuring a table with accordion rows.
 */

angular
  .module('gaPanelTableForm')
  .component('gaPanelTableForm', {
    templateUrl: 'ng-gentelella/gentelella/ga-panel-table-form/ga-panel-table-form.template.html',
    bindings: {
      panelTitle: '@',
      panelSubTitle: '@',
      panelAddRecord: '<',
      panelValues: '='
    },
    transclude: {
      head: 'panelTableFormHead',
      body: 'panelTableFormBody'
    },
    controller: [
      function GaPanelTableFormController() {
        var self = this;

        self.addRecord = function() {
          if (!self.panelValues) self.panelValues = [{}];
          else self.panelValues.push({});
        };

        self.deleteRecord = function(record) {
          var i = self.panelValues.indexOf(record);
          self.panelValues.splice(i, 1);
        };

        panelToolbox();
      }
    ]
  });
