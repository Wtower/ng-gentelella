/**
 * Created by gkarak on 29/9/2016.
 *
 * Render a gentelella text form field.
 */

angular
  .module('formFieldText')
  .component('formFieldText', {
    templateUrl: 'ng-gentelella/gentelella/form-field-text/form-field-text.template.html',
    bindings: {
      fieldId: '@',
      fieldType: '@',
      fieldName: '@',
      fieldLabel: '@',
      fieldPlaceholder: '@',
      fieldRequired: '@',
      fieldWidth: '@',
      fieldLabelWidth: '@',
      fieldForm: '=',
      fieldPattern: '@',
      fieldAlert: '@',
      fieldModelOptions: '<',
      onChange: '&',
      fieldValue: '='
    },
    controller: [
      function FormFieldTextController() {
        var self = this;
        self.$onInit = function () {
          if (!self.fieldType) self.fieldType = 'text';
          // http://stackoverflow.com/questions/28731451/is-it-possible-to-use-ng-pattern-with-a-variable
          if (self.fieldPattern) self.pattern = new RegExp(self.fieldPattern);
        }
      }
    ]
  });
