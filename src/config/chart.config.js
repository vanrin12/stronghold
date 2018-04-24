module.exports = {
  buildCandleStick: () => {
    return {
      height: '800',
      rangeSelector: {
        selected: 2,
        inputEnabled: false,
        buttons: [{
          type: 'day',
          count: 1,
          text: '30m',
          dataGrouping: {
            forced: true,
            units: [['minute', [30]]]
          }
        }, {
          type: 'day',
          count: 3,
          text: '2h',
          dataGrouping: {
            forced: true,
            units: [['hour', [2]]]
          }
        }, {
          type: 'day',
          count: 5,
          text: '6h',
          dataGrouping: {
            forced: true,
            units: [['hour', [6]]]
          }
        }]
      },
      lang:{
        rangeSelectorZoom: ''
      },
      navigator: {
        enabled: false
      },
      title: {
        text: 'Price'
      },
      yAxis: [{
        labels: {
          align: 'right',
          x: -3
        },
        title: {
          text: 'Price'
        },
        min: 0,
        height: '60%',
        lineWidth: 2
      }, {
        labels: {
          align: 'right',
          x: -3
        },
        title: {
          text: 'Volume'
        },
        min: 0,
        top: '65%',
        height: '35%',
        offset: 0,
        lineWidth: 2
      }],
      scrollbar: {
        enabled: false
      },
      tooltip: {
        split: true
      },
      series: [{
        type: 'candlestick',
        name: 'Price',
        color: '#e23636',
        upColor: '#4a90e2',
      }, {
        type: 'column',
        name: 'Volume',
        color: '#e28f00',
        yAxis: 1
      }],
      credits: {
        enabled: false
      },
    };
  }
};