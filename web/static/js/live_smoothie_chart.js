export class LiveSmoothieChart {
  constructor() {
    this.trumpData = new TimeSeries()
    this.clintonData = new TimeSeries()

    this._setupChart()
  }

  _setupChart() {
    this.chart = new SmoothieChart()
    this.chart.streamTo(document.getElementById("mycanvas"), 1000)

    this.chart.addTimeSeries(this.trumpData, { strokeStyle:'rgb(255, 0, 0)', lineWidth: 3 }) //fillStyle:'rgba(255, 0, 0, 0.4)', lineWidth:3 })
    this.chart.addTimeSeries(this.clintonData, { strokeStyle:'rgb(0, 0, 255)', lineWidth: 3 }) //fillStyle:'rgba(0, 0, 255, 0.4)', lineWidth:3 })
  }

  updateChart(data) {
    var time = new Date().getTime()
    var trumpPercent = data.trump.positive_percent
    var clintonPercent = data.clinton.positive_percent

    this.trumpData.append(time, trumpPercent)
    this.clintonData.append(time, clintonPercent)
  }
}
