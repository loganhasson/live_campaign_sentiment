import { Socket } from "phoenix"
//import { LiveLine } from "./live_line"
//import { LiveHighchartLine } from "./live_highchart_line"
//import { LiveSmoothieChart } from "./live_smoothie_chart"
import { LiveColumnChart } from "./live_column_chart"

export class LiveChart {
  constructor() {
    let globalChannel = this._setupGlobalChannel()
    this._setupGraphs()
  }

  _createSocket() {
    let socket = new Socket("/socket", {params: {token: window.userToken}})

    socket.connect()
    socket.onOpen(() => console.log("Connected"))

    return socket
  }

  _setupGlobalChannel() {
    let socket = this._createSocket()
    let globalChannel = socket.channel("sentiment:global", {})

    globalChannel.on("global_sentiment_update", payload => {
      console.log(payload)
      this._updateGraphs(payload)
    })

    globalChannel.join()
      .receive("ok", resp => { console.log("Joined successfully", resp) })
      .receive("error", resp => { console.log("Unable to join", resp) })

    return globalChannel
  }

  _setupGraphs() {
    //this.lineChart = new LiveLine()
    //this.highchartLineChart = new LiveHighchartLine()
    //this.smoothieChart = new LiveSmoothieChart()
    this.columnChart = new LiveColumnChart()
    google.load("visualization", "1", {packages: ["corechart"]})

    google.setOnLoadCallback(() => {
      this.trump_chart = new google.visualization.PieChart(document.getElementById("trump-chart"))
      this.clinton_chart = new google.visualization.PieChart(document.getElementById("clinton-chart"))

      var startingData = google.visualization.arrayToDataTable([["Sentiment", "Percent"], ["Positive", 33.33], ["Negative", 33.33], ["Neutral", 33.34]])

      this.trump_chart.draw(startingData, {title: "Donald Trump", is3D: false})
      this.clinton_chart.draw(startingData, {title: "Hillary Clinton", is3D: false})
    })
  }

  _updateGraphs(payload) {
    let data = this._convertPayload(payload)

    let trumpData = data.trump
    let clintonData = data.clinton

    let convertedTrumpData = google.visualization.arrayToDataTable(trumpData)
    let convertedClintonData = google.visualization.arrayToDataTable(clintonData)

    if (this.trump_chart)
      this.trump_chart.draw(convertedTrumpData, {title: "Donald Trump - " + payload.trump.count + " Tweets", is3D: false})

    if (this.clinton_chart)
      this.clinton_chart.draw(convertedClintonData, {title: "Hillary Clinton - " + payload.clinton.count + " Tweets", is3D: false})

    //this.lineChart.updateChart(payload)
    //this.highchartLineChart.updateChart(payload)
    //this.smoothieChart.updateChart(payload)
    this.columnChart.updateChart(payload)
  }

  _convertPayload(payload) {
    var trump_positive = payload.trump.positive_percent
    var trump_negative = payload.trump.negative_percent
    var trump_neutral  = 100.00 - (trump_positive + trump_negative)

    var clinton_positive = payload.clinton.positive_percent
    var clinton_negative = payload.clinton.negative_percent
    var clinton_neutral  = 100.00 - (clinton_positive + clinton_negative)

    return {
      trump: [
        ["Sentiment", "Percent"],
        ["Positive", trump_positive],
        ["Negative", trump_negative],
        ["Neutral", trump_neutral]
      ],
      clinton: [
        ["Sentiment", "Percent"],
        ["Positive", clinton_positive],
        ["Negative", clinton_negative],
        ["Neutral", clinton_neutral]
      ]
    }
  }
}
