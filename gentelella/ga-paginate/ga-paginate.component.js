/**
 * Created by gkarak on 7/10/2016.
 */

angular
  .module('gaPaginate')
  .component('gaPaginate', {
    templateUrl: 'ng-gentelella/gentelella/ga-paginate/ga-paginate.template.html',
    bindings: {
      paginateId: '@', // a unique html id
      paginatePage: '=', // current page number
      paginateSize: '=', // current page size
      paginateInitialSize: '<', // initial page size
      paginateSizes: '<', // an array of page sizes
      paginateCount: '<', // total number of records
      paginateEllipsis: '@', // number of pages to show if too many
      onPaginate: '&' // call on page change to fetch data
    },
    transclude: true,
    controller: [
      /**
       * Paginate controller
       */
      function GaPaginateController() {
        var self = this;

        /**
         * Return an array of `len` items used for html ng-repeat range
         * @param len
         * @returns {Array}
         */
        self.range = function (len) {
          var range = [];
          for (var i = 0; i < len; i++) range.push(i);
          return range;
        };

        /**
         * Initialize controller default values
         */
        self.$onInit = function () {
          // distinguish because initial may need to be provided in parent by a third variable
          self.paginateSize = parseInt(self.paginateInitialSize);
          self.paginateSizes = self.paginateSizes || [10, 25, 50, 100];
          self.paginatePage = self.paginatePage || 1;
          self.itemIdx = 0;
          self.paginateEllipsis = parseInt(self.paginateEllipsis) || 5;
        };

        /**
         * Re-calculate pagination on size or value change
         * When user clicks, then force a fetch data
         * @param dataRefresh: true to fetch data
         */
        self.rePaginate = function (dataRefresh) {
          self.pages = Math.ceil(self.paginateCount / self.paginateSize);
          self.paginate(Math.ceil(self.itemIdx / self.paginateSize), dataRefresh);
        };

        /**
         * Because initialization happens before data is fetched and angular fails to detect the changes
         * Keep a previous value to skip calculations if no change
         * Also fetch data only if a previousCount exists (not first) to avoid initial double fetch #16
         */
        self.$doCheck = function () {
          if (self.previousCount != self.paginateCount) {
            self.paginateCount = parseInt(self.paginateCount);
            self.paginateEllipsis = parseInt(self.paginateEllipsis);
            self.rePaginate();
            self.previousCount = self.paginateCount;
          }
        };

        /**
         * Go to page
         * @param page
         * @param dataRefresh
         */
        self.paginate = function (page, dataRefresh) {
          if (page < 1) page = 1;
          if (page > self.pages) page = self.pages;
          self.itemIdx = (page - 1) * self.paginateSize;
          self.focus('reset', page);
          if (!dataRefresh && page == self.paginatePage) return;

          self.paginatePage = page;
          self.onPaginate({
            paginator: {
              page: self.paginatePage,
              page_size: self.paginateSize
            }
          });
        };

        /**
         * Set low and high page numbers to show around current page with an ellipsis
         * @param direction: reset / left / right
         * @param page: pass the new page because the self.paginatePage may not yet be updated
         */
        self.focus = function (direction, page) {
          if (direction == 'reset') { // a new page is up
            self.lowEllipsis = Math.max(page - Math.floor(self.paginateEllipsis / 2), 1);
            self.lowEllipsis = Math.min(self.lowEllipsis, Math.max(self.pages - self.paginateEllipsis, 1));
          }
          else if (direction == 'left') { // the left ellipsis is pressed
            self.lowEllipsis = Math.max(self.lowEllipsis - self.paginateEllipsis, 1);
          }
          else if (direction == 'right') { // the right ellipsis is pressed
            self.lowEllipsis = Math.min(self.lowEllipsis + self.paginateEllipsis, self.pages - self.paginateEllipsis + 1);
          }
        };

        /**
         * Provide the upper visible index number for use in template
         * @returns {number}
         */
        self.itemUpperIdx = function () {
          return Math.min(self.itemIdx + self.paginateSize, self.paginateCount);
        };

      }
    ]
  });
