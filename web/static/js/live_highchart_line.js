export class LiveHighchartLine {
  constructor() {
    this.chart = new Highcharts.Chart("highcharts-spline-container", {
      chart: {
        type: 'spline',
        animation: Highcharts.svg,
        marginRight: 10
      },
      title: {
        text: 'Trump vs. Clinton Negative Percentages'
      },
      xAxis: {
        type: 'datetime',
        tickPixelInterval: 150
      },
      yAxis: {
        title: {
          text: 'Percentage'
        },
        plotLines: [{
          value: 0,
          width: 1,
          color: "#808080"
        }]
      },
      tooltip: {
        formatter: function () {
          return '<b>' + this.series.name + '</b><br />' + Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br />' + Highcharts.numberFormat(this.y, 2)
        }
      },
      legend: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      series: [{
        name: 'Trump',
        data: [{x: new Date().getTime(), y: Math.random()}]
      }]
    })
  }

  updateChart(data) {
    this.chart.series[0].addPoint([new Date().getTime(), data.trump.negative_percent], true, true)
  }
}
