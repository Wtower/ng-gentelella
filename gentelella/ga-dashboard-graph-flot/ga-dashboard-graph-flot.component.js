// /**
//  * Created by gkarak on 23/11/2016.
//  */

angular
  .module('gaDashboardGraphFlot')
  .component('gaDashboardGraphFlot', {
    templateUrl: 'ng-gentelella/gentelella/ga-dashboard-graph-flot/ga-dashboard-graph-flot.template.html',
    bindings: {
      graphTitle: '@',
      graphSubTitle: '@',
      graphRange: '@',
      graphId: '@',
      graphLegendTitle: '@',
      graphColours: '<',
      graphData: '<'
    },
    transclude: true,
    controller: [
      function GaGraphFlotController() {
        var self = this;

        // Initialise
        self.$onInit = function () {
          if (!self.graphId) self.graphId = 'main-graph';
        };

        // Reset plotted
        self.onChanges = function () {
          self.plotted = false;
        };

        // The only suitable event, because the id in template is set
        // after any other event including onChanges
        // This is why we call plot only once with self.plotted
        self.$doCheck = function () {
          var canvas = $('.' + self.graphId);

          if (!self.plotted && self.graphData && canvas.length) {

            // Parse bindings
            if (!self.graphColours) self.graphColours = ['rgba(38, 185, 154, 0.38)', 'rgba(3, 88, 106, 0.38)'];

            // Transform mongo data to flot data
            var data = [];
            self.graphData.forEach(function (row) {
              var series = [];
              row.forEach(function (val) {
                series.push([
                  gd(val._id.year, val._id.month, val._id.day),
                  val.count
                ]);
              });
              data.push(series);
            });

            function gd(year, month, day) {
              return new Date(year, month - 1, day).getTime();
            }

            // PLOT
            // !self.plotted && self.graphData && canvas.length && $.plot(canvas, self.graphData, {
            $.plot(canvas, data, {
              series: {
                lines: {
                  show: false,
                  fill: true
                },
                splines: {
                  show: true,
                  tension: 0.4,
                  lineWidth: 1,
                  fill: 0.4
                },
                points: {
                  radius: 0,
                  show: true
                },
                shadowSize: 2
              },
              grid: {
                verticalLines: true,
                hoverable: true,
                clickable: true,
                tickColor: '#d5d5d5',
                borderWidth: 1,
                color: '#fff'
              },
              colors: self.graphColours,
              xaxis: {
                tickColor: 'rgba(51, 51, 51, 0.06)',
                mode: 'time',
                tickSize: [1, 'day'],
                //tickLength: 10,
                axisLabel: 'Date',
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 10
              },
              yaxis: {
                ticks: 8,
                tickColor: 'rgba(51, 51, 51, 0.06)'
              },
              tooltip: false
            });

            self.plotted = true;
          }
        };
      }
    ]
  });
