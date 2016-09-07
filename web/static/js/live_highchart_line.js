export class LiveHighchartLine {
  constructor() {
    this.lastUpdatedAtSeconds = null
    this.queue = []
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
        data: [{x: new Date().getTime(), y: 0}]
      }]
    })
    this._dequeue()
  }

  updateChart(data) {
    this.queue.push(data.trump.rolling.average)
    //var date = new Date()
    //var updateTime = date.getTime()
    //var seconds = date.getSeconds()

    //if ((this.lastUpdatedAtSeconds == null) || ((seconds != this.lastUpdatedAtSeconds) && (seconds % 2 == 0)))
      //this.lastUpdatedAtSeconds = seconds
      //this.chart.series[0].addPoint([updateTime, data.trump.rolling.average], true, true)
  }

  _dequeue() {
    var series = this.chart.series[0]
    var queue  = this.queue

    setInterval(function() {
      var time = new Date().getTime()
      series.addPoint([time, queue.shift()])
    }, 1000)
  }
}
