export class LiveMap {
  constructor() {
    var self = this
    this.data = []
    this.chart = new Highcharts.Map("mapContainer", {
      chart: {
        borderWidth: 1
      },
      title: {
        text: 'US population density (/km2)'
      },
      legend: {
          layout: 'horizontal',
          borderWidth: 0,
          backgroundColor: 'rgba(255,255,255,0.85)',
          floating: true,
          verticalAlign: 'top',
          y: 25
      },
      mapNavigation: {
          enabled: false
      },
      exporting: {
        enabled: false
      },
      colorAxis: {
          min: 1,
          max: 100,
          type: 'linear',
          minColor: '#FF0000',
          maxColor: '#0000FF',
          stops: [
              [0, '#FF0000'],
              [0.5, '#800080'],
              [1, '#0000FF']
          ]
      },
      series : [{
          animation: {
              duration: 1000
          },
          data : self.data,
          mapData: Highcharts.maps['countries/us/us-all'],
          joinBy: ['postal-code', 'code'],
          dataLabels: {
              enabled: true,
              color: '#FFFFFF',
              format: '{point.code}'
          },
          name: 'Population density',
          tooltip: {
              pointFormat: '{point.code}: {point.value}/km²'
          }
      }]
    })
  }

  updateChart(payload) {
    var newData = []

    $.each(payload.trump.location, function(state, data) {
      var clintonData = payload.clinton.location[state]

      try {
        if (typeof(clintonData) !== "undefined")
          var trumpAvg = (data.average * -1)
          var trumpCount = data.count
          var clintonAvg = (clintonData.average)
          var clintonCount = clintonData.count

          var score = ((trumpAvg * trumpCount) + (clintonAvg * clintonCount))/(trumpCount + clintonCount)

          if (score < 0)
            var value = (-1*(50*score)) - 50
          else
            var value = (score*100) - 100

          newData.push({"value": value, "code": state})
      } catch(e) {
        console.log('error')
      }
    })

    this.chart.series[0].setData(newData, true, true)
  }
}
