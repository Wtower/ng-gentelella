/**
 * Created by gkarak on 7/10/2016.
 */

angular
  .module('gaPaginate')
  .component('gaPaginate', {
    templateUrl: 'ng-gentelella/gentelella/ga-paginate/ga-paginate.template.html',
    bindings: {
      paginateList: '<',
      paginateLimit: '=',
      paginateSkip: '=',
      paginateId: '@'
    },
    transclude: true,
    controller: [
      function GaPaginateController() {
        var self = this;
        self.items = '2';

        self.range = function (max) {
          var range = [];
          for (var i = 0; i < max; i++) range.push(i);
          return range;
        };

        self.paginate = function (page) {
          self.page = page || self.page || 1;
          self.pages = Math.ceil(self.paginateList.length / self.items);
          if (self.page < 1) self.page = 1;
          if (self.page > self.pages) self.page = self.pages;
          self.to = Math.min(self.page * self.items, self.paginateList.length);
          self.from = (self.page * self.items) - self.items;
          self.paginateLimit = self.items;
          self.paginateSkip = self.from;
        };

        self.paginate();

        self.rePaginate = function () {
          self.paginate(Math.ceil(self.from / self.items));
        };
      }
    ]
  });
