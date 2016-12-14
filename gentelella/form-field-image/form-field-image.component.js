/**
 * Created by gkarak on 30/9/2016.
 *
 * Render an image ng-upload form field.
 */

angular
  .module('formFieldImage')
  .component('formFieldImage', {
    templateUrl: 'ng-gentelella/gentelella/form-field-image/form-field-image.template.html',
    bindings: {
      fieldId: '@',
      fieldLabel: '@',
      fieldRequired: '@',
      fieldWidth: '@',
      fieldLabelWidth: '@',
      fieldMediaUrl: '@',
      fieldTitle: '@',
      fieldData: '<',
      fieldValue: '='
    },
    transclude: true,
    controller: ['Upload',
      function FormFieldTextController(Upload) {
        var self = this;

        self.$onInit = function () {
          // Otherwise illegal invocation error on upload
          self.data = self.fieldData;
        };

        self.upload = function(file) {
          Upload.upload({
            url: 'api/uploads',
            method: 'POST',
            data: self.data,
            file: file
          }).then(function (resp) {
            new PNotify({
              title: 'Image uploaded',
              text: 'Submit the form to update changes.',
              type: 'success',
              styling: 'bootstrap3'
            });
            self.fieldValue = resp.data.upload;
          }, function (error) {
            new PNotify({
              title: 'Image not uploaded',
              text: error.data,
              type: 'error',
              styling: 'bootstrap3'
            });
            console.log(error);
          }, function (evt) {
            self.progress = parseInt(100.0 * evt.loaded / evt.total);
          });
        };
      }
    ]
  });
