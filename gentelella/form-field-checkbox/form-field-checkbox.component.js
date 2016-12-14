/**
 * Created by gkarak on 30/9/2016.
 *
 * Render a gentelella checkbox form field.
 */

angular
  .module('formFieldCheckbox')
  .component('formFieldCheckbox', {
    templateUrl: 'ng-gentelella/gentelella/form-field-checkbox/form-field-checkbox.template.html',
    bindings: {
      fieldId: '@',
      fieldLabel: '@',
      fieldPlaceholder: '@',
      fieldWidth: '@',
      fieldLabelWidth: '@',
      onChange: '&',
      fieldValue: '='
    },
    transclude: true
  });
