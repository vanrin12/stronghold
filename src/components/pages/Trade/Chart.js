// @flow
import * as React from 'react';
import _ from 'lodash';
import type { MarketType, CandleStickData } from '../../../types';
import ReactHighstock from 'react-highcharts/ReactHighstock.src';
import { buildCandleStick } from '../../../config/chart.config';

import { ClipLoader as Loader } from 'halogenium'

import './Chart.css';

type Props = {
  market: MarketType,
  chartData: Array<CandleStickData>
};

class Chart extends React.Component<Props> {
  updateChart = () => {
    if (this.refs.chart) {
      const series = this.refs.chart.getChart().series;
      series[0].update({
          data: _.map(this.props.chartData, x => [x.date * 1000, x.open, x.high, x.low, x.close]),
      });
      series[1].update({
        data: _.map(this.props.chartData, x => [x.date * 1000, x.volume]),
      });
    }
  };

  shouldComponentUpdate(nextProps: Props) {
    if (this.props.chartData.length > 0) this.updateChart();
    return (this.props.chartData.length === 0 || this.props.market.name !== nextProps.market.name)
  }

  render() {
    let chart;

    if(this.props.chartData.length > 0) {
      chart =  <ReactHighstock config={buildCandleStick()} ref="chart" isPureConfig />
    } else {
      chart = <Loader size="40px" color="#76abe9" />
    }

    return (
      <div className="Trade__Chart">
        { chart }
      </div>
    )
  }
}

export default Chart;
