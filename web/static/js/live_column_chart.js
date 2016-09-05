export class LiveColumnChart {
  constructor() {
    this.chart = new Highcharts.Chart("live-column-container", {
      chart: {
        type: 'column',
        animation: Highcharts.svg
      },
      title: {
        text: 'Trump vs. Clinton Sentiment'
      },
      subtitle: {
        text: 'Source: Twitter.com'
      },
      exporting: {
        enabled: false
      },
      xAxis: {
        categories: [
          'Negative',
          'Neutral',
          'Positive'
        ],
        crosshair: true
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Percentage (%)'
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' + '<td style="padding:0"><b>{point.y:.2f} %</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      series: [{
        name: 'Trump',
        data: [0, 0, 0],
        color: '#FF0000'
      },
      {
        name: 'Clinton',
        data: [0, 0, 0],
        color: '#0000FF'
      }]
    })
  }

  updateChart(payload) {
    var trump_positive = payload.trump.positive_percent
    var trump_negative = payload.trump.negative_percent
    var trump_neutral  = 100.00 - (trump_positive + trump_negative)

    var clinton_positive = payload.clinton.positive_percent
    var clinton_negative = payload.clinton.negative_percent
    var clinton_neutral  = 100.00 - (clinton_positive + clinton_negative)

    this.chart.series[0].setData([trump_negative, trump_neutral, trump_positive], false, true)
    this.chart.series[1].setData([clinton_negative, clinton_neutral, clinton_positive], false, true)
    this.chart.redraw()
  }
}
