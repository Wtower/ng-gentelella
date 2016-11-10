/**
 * Created by gkarak on 6/10/2016.
 *
 * **WIP** #27
 */

// https://docs.angularjs.org/guide/providers
// function GaResourceF(text) {
//   console.log('in GaResourceF');
//   console.log(text);
//   this.text = text;
// }
//
// angular
//   .module('gaResource')
//   .provider('gaResourceConfig', [function () {
//     var text = null;
//     this.setText = function(str) {
//       text = str;
//     };
//     this.$get = [function () {
//       return new GaResourceF(text);
//     }];
//   }]);
// access with `console.log(gaResourceConfig.text);`

// http://jsfiddle.net/anandmanisankar/4pbn8587/
angular
  .module('gaResource')
  .provider('gaResourceConfig', [function () {
    this.setText = function(str) {
      this.text = str;
    };
    this.$get = [function () {
      var self = this;
      return {
        getText: function() {
          return self.text;
        }
      }
    }];
  }]);
// access with `console.log(gaResourceConfig.getText());`

// Configure:
// angular
//   .module('productDetail')
//   .config(['gaResourceConfigProvider',
//     function (gaResourceConfigProvider) {
//       gaResourceConfigProvider.setText('chk1');
//     }]);
