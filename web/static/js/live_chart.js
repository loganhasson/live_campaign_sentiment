import { Socket } from "phoenix"
import { LiveSmoothieChart } from "./live_smoothie_chart"
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
    this.smoothieChart = new LiveSmoothieChart()
    this.columnChart = new LiveColumnChart()
  }

  _updateGraphs(payload) {
    this.smoothieChart.updateChart(payload)
    this.columnChart.updateChart(payload)
  }
}
