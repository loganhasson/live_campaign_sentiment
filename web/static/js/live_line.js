export class LiveLine {
  constructor() {
    this.trumpData = []
    this.clintonData = []

    this._setupLineChart()
  }

  _setupLineChart() {
    var self = this
    this.chart = new CanvasJS.Chart("chartContainer", {
      zoomEnabled: true,
      title: {
        text: "Trump vs. Clinton Positive Percentage"
      },
      tooltip: {
        shared: true
      },
      legend: {
        verticalAlign: "top",
        horizontalAlign: "center",
        fontSize: 14,
        fontWeight: "bold",
        fontFamily: "calibri",
        fontColor: "dimGrey"
      },
      axisX: {
        title: "Time"
      },
      axisY: {
        includeZero: false
      },
      data: [{
        type: "spline",
        xValueType: "dateTime",
        showInLegend: true,
        name: "Donald Trump",
        dataPoints: self.trumpData
      },
      {
        type: "spline",
        xValueType: "dateTime",
        showInLegend: true,
        name: "Hillary Clinton",
        dataPoints: self.clintonData
      }],
      legend: {
        cursor: "pointer",
        itemclick: function(e) {
          if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible)
            e.dataSeries.visible = false
          else
            e.dataSeries.visible = true
          chart.render()
        }
      }
    })
  }

  updateChart(data) {
    var time = new Date().getTime()
    var trumpPercent = data.trump.positive_percent
    var clintonPercent = data.clinton.positive_percent

    this.trumpData.push({
      x: time,
      y: trumpPercent
    })

    this.clintonData.push({
      x: time,
      y: clintonPercent
    })

    this.chart.options.data[0].legendText = " Trump" + trumpPercent
    this.chart.options.data[1].legendText = " Clinton" + clintonPercent

    this.chart.render()
  }
}
