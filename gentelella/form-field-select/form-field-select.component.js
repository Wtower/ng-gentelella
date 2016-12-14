/**
 * Created by gkarak on 29/9/2016.
 *
 * Render a gentelella select form field.
 * https://docs.angularjs.org/error/$compile/selmulti
 */

angular
  .module('formFieldSelect')
  .component('formFieldSelect', {
    templateUrl: 'ng-gentelella/gentelella/form-field-select/form-field-select.template.html',
    bindings: {
      fieldId: '@',
      fieldLabel: '@',
      fieldPlaceholder: '@',
      fieldRequired: '@',
      fieldWidth: '@',
      fieldLabelWidth: '@',
      fieldMultiple: '@',
      fieldLink: '@',
      fieldLinkText: '@',
      onChange: '&',
      fieldValue: '='
    },
    transclude: true,
    controller: [
      function FormFieldSelectController() {
        // select2();
        // Temporary due to #12
      }
    ]
  });
