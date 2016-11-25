/**
 * Created by gkarak on 25/11/2016.
 */

angular
  .module('gaProgress')
  .component('gaProgress', {
    templateUrl: 'static/ng-gentelella/ga-progress/ga-progress.template.html',
    bindings: {
      progressSize: '@',
      progressValue: '<'
    }
  });
