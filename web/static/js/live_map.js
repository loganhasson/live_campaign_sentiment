export class LiveMap {
  constructor() {
    var self = this
    this.data = [
      {
          "value": 438,
          "code": "NJ"
      },
      {
          "value": 387.35,
          "code": "RI"
      },
      {
          "value": 312.68,
          "code": "MA"
      },
      {
          "value": 271.4,
          "code": "CT"
      },
      {
          "value": 209.23,
          "code": "MD"
      },
      {
          "value": 195.18,
          "code": "NY"
      },
      {
          "value": 154.87,
          "code": "DE"
      },
      {
          "value": 114.43,
          "code": "FL"
      },
      {
          "value": 107.05,
          "code": "OH"
      },
      {
          "value": 105.8,
          "code": "PA"
      },
      {
          "value": 86.27,
          "code": "IL"
      },
      {
          "value": 83.85,
          "code": "CA"
      },
      {
          "value": 72.83,
          "code": "HI"
      },
      {
          "value": 69.03,
          "code": "VA"
      },
      {
          "value": 67.55,
          "code": "MI"
      },
      {
          "value": 65.46,
          "code": "IN"
      },
      {
          "value": 63.8,
          "code": "NC"
      },
      {
          "value": 54.59,
          "code": "GA"
      },
      {
          "value": 53.29,
          "code": "TN"
      },
      {
          "value": 53.2,
          "code": "NH"
      },
      {
          "value": 51.45,
          "code": "SC"
      },
      {
          "value": 39.61,
          "code": "LA"
      },
      {
          "value": 39.28,
          "code": "KY"
      },
      {
          "value": 38.13,
          "code": "WI"
      },
      {
          "value": 34.2,
          "code": "WA"
      },
      {
          "value": 33.84,
          "code": "AL"
      },
      {
          "value": 31.36,
          "code": "MO"
      },
      {
          "value": 30.75,
          "code": "TX"
      },
      {
          "value": 29,
          "code": "WV"
      },
      {
          "value": 25.41,
          "code": "VT"
      },
      {
          "value": 23.86,
          "code": "MN"
      },
      {
          "value": 23.42,
          "code": "MS"
      },
      {
          "value": 20.22,
          "code": "IA"
      },
      {
          "value": 19.82,
          "code": "AR"
      },
      {
          "value": 19.4,
          "code": "OK"
      },
      {
          "value": 17.43,
          "code": "AZ"
      },
      {
          "value": 16.01,
          "code": "CO"
      },
      {
          "value": 15.95,
          "code": "ME"
      },
      {
          "value": 13.76,
          "code": "OR"
      },
      {
          "value": 12.69,
          "code": "KS"
      },
      {
          "value": 10.5,
          "code": "UT"
      },
      {
          "value": 8.6,
          "code": "NE"
      },
      {
          "value": 7.03,
          "code": "NV"
      },
      {
          "value": 6.04,
          "code": "ID"
      },
      {
          "value": 5.79,
          "code": "NM"
      },
      {
          "value": 3.84,
          "code": "SD"
      },
      {
          "value": 3.59,
          "code": "ND"
      },
      {
          "value": 2.39,
          "code": "MT"
      },
      {
          "value": 1.96,
          "code": "WY"
      },
      {
          "value": 0.42,
          "code": "AK"
      }
    ]
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
          type: 'logarithmic',
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
    //var newData = []
    //$.each(payload.trump.location, function(state, data) {
      //newData.push({"value": data.positive_percent + 1, "code": state})
    //})

    //if (this.chart.series[0].data != newData)
      //this.chart.series[0].setData(newData, true, true)
  }
}
