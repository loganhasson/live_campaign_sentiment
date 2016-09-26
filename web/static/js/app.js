import "phoenix_html"

import { LiveChart } from "./live_chart"
let liveChart = new LiveChart()

$(function() {
  var smoothieCanvas = document.getElementById('live-smoothie-container');
  var smoothieContext = smoothieCanvas.getContext('2d');

  var $smoothieContainer = $('.smoothie-chart');

  smoothieCanvas.height = $smoothieContainer.height();
  smoothieCanvas.width  = $smoothieContainer.width();
})
