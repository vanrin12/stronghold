/*
// TODO pass flow-type check
import * as React from 'react'

import Helmet from 'react-helmet'

import TopNav from '../containers/TopNav'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import ReactHighstock from 'react-highcharts/ReactHighstock.src'

import { chart, bitcoinSeriesArea, ethereumSeriesArea, litecoinSeriesArea } from '../../config/chart.config'

//import Footer from '../Footer'

const bitcoinSeriesConfigData = bitcoinSeriesArea;
bitcoinSeriesConfigData.series[0].data = dataBitcoin;

const ethereumSeriesConfigData = ethereumSeriesArea;
ethereumSeriesConfigData.series[0].data = dataEthereum;

const litecoinSeriesConfigData = litecoinSeriesArea;
litecoinSeriesConfigData.series[0].data = dataLitecoin;

let bitcoinConfig = Object.assign({}, chart, bitcoinSeriesConfigData);
let ethereumConfig = Object.assign({}, chart, ethereumSeriesConfigData);
let litecoinConfig = Object.assign({}, chart, litecoinSeriesConfigData);

class Charts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bitCoinChartAxisMax: dataBitcoin[dataBitcoin.length - 1][1],
      ethereumChartAxisMax: dataEthereum[dataEthereum.length - 1][1],
      litecoinChartAxisMax: dataLitecoin[dataLitecoin.length - 1][1],
      tabIndex: 0,
      bitCoinCurrentRange: 'SINCE LAST MONTH',
      rangeSelected: 3
    };
  }

  valueSetData(min, max) {
    const tabIndex = this.state.tabIndex;

    switch(tabIndex) {
      case 0:
        let bitCoinValueDifference = (max - min).toFixed(2);
        if (bitCoinValueDifference > 0) {
          this.setState({
            bitCoinValueSign: 'aboveZero',
            bitCoinValueDifference: Math.abs(bitCoinValueDifference),
          })
        } else {
          this.setState({
            bitCoinValueSign: 'belowZero',
            bitCoinValueDifference: Math.abs(bitCoinValueDifference),

          })
        }
        break;

      case 1:
        let ethereumValueDifference = (max - min).toFixed(2);
        if (ethereumValueDifference > 0) {
          this.setState({
            ethereumValueSign: 'aboveZero',
            ethereumValueDifference: Math.abs(ethereumValueDifference),
          })
        } else {
          this.setState({
            ethereumValueSign: 'belowZero',
            ethereumValueDifference: Math.abs(ethereumValueDifference),
          })
        }
        break;

      case 2:
        let liteCoinValueDifference = (max - min).toFixed(2);
        if (liteCoinValueDifference > 0) {
          this.setState({
            liteCoinValueSign: 'aboveZero',
            liteCoinValueDifference: Math.abs(liteCoinValueDifference),
          })
        } else {
          this.setState({
            liteCoinValueSign: 'belowZero',
            liteCoinValueDifference: Math.abs(liteCoinValueDifference),
          })
        }
        break;

      default:
        break;
    }
  }

  percentageSetData(min, max) {
    const tabIndex = this.state.tabIndex;

    switch(tabIndex) {
      case 0:
        let bitCoinPercentageDifference = (((max - min) / min) * 100).toFixed(2);
        if (bitCoinPercentageDifference > 0) {
          this.setState({
            bitCoinPercentageSign: 'aboveZero',
            bitCoinPercentageDifference: Math.abs(bitCoinPercentageDifference),
          })
        } else {
          this.setState({
            bitCoinPercentageSign: 'belowZero',
            bitCoinPercentageDifference: Math.abs(bitCoinPercentageDifference),

          })
        }
        break;

      case 1:
        let ethereumPercentageDifference = (((max - min) / min) * 100).toFixed(2);
        if (ethereumPercentageDifference > 0) {
          this.setState({
            ethereumPercentageSign: 'aboveZero',
            ethereumPercentageDifference: Math.abs(ethereumPercentageDifference),
          })
        } else {
          this.setState({
            ethereumPercentageSign: 'belowZero',
            ethereumPercentageDifference: Math.abs(ethereumPercentageDifference),

          })
        }
        break;

      case 2:
        let liteCoinPercentageDifference = (((max - min) / min) * 100).toFixed(2);
        if (liteCoinPercentageDifference > 0) {
          this.setState({
            liteCoinPercentageSign: 'aboveZero',
            liteCoinPercentageDifference: Math.abs(liteCoinPercentageDifference),
          })
        } else {
          this.setState({
            liteCoinPercentageSign: 'belowZero',
            liteCoinPercentageDifference: Math.abs(liteCoinPercentageDifference),

          })
        }
        break;

      default:
        break;
    }
  }

  componentWillUpdate() {
    bitcoinConfig.rangeSelector.selected = this.state.rangeSelected;
    ethereumConfig.rangeSelector.selected = this.state.rangeSelected;
    litecoinConfig.rangeSelector.selected = this.state.rangeSelected;
  }

  componentWillMount() {
    bitcoinSeriesConfigData.xAxis.events.afterSetExtremes = (e) => {
      let min = e.target.series[0].processedYData[0],
          max = this.state.bitCoinChartAxisMax;
      this.valueSetData(min, max);
      this.percentageSetData(min, max);
    };
    bitcoinSeriesConfigData.xAxis.events.setExtremes = (e) => {
      console.log(e.rangeSelectorButton);
      switch(e.rangeSelectorButton.text) {
        case '1H':
          this.setState({
            bitCoinCurrentRange: 'SINCE AN HOUR AGO',
            rangeSelected: 0
          });
          break;

        case '1D':
          this.setState({
            bitCoinCurrentRange: 'SINCE YESTERDAY',
            rangeSelected: 1
          });
          break;

        case '1W':
          this.setState({
            bitCoinCurrentRange: 'SINCE LAST WEEK',
            rangeSelected: 2
          });
          break;

        case '1M':
          this.setState({
            bitCoinCurrentRange: 'SINCE LAST MONTH',
            rangeSelected: 3
          });
          break;

        case '1Y':
          this.setState({
            bitCoinCurrentRange: 'SINCE LAST YEAR',
            rangeSelected: 4
          });
          break;

        case 'ALL':
          this.setState({
            bitCoinCurrentRange: 'FOR ALL THE TIME',
            rangeSelected: 5
          });
          break;

        default:
          break;
      }
    };


    ethereumSeriesConfigData.xAxis.events.afterSetExtremes = (e) => {
      let min = e.target.series[0].processedYData[0],
        max = this.state.ethereumChartAxisMax;
      this.valueSetData(min, max);
      this.percentageSetData(min, max);
    };
    ethereumSeriesConfigData.xAxis.events.setExtremes = (e) => {
      switch(e.rangeSelectorButton.text) {
        case '1H':
          this.setState({
            ethereumCurrentRange: 'SINCE AN HOUR AGO',
            rangeSelected: 0
          });
          break;

        case '1D':
          this.setState({
            ethereumCurrentRange: 'SINCE YESTERDAY',
            rangeSelected: 1
          });
          break;

        case '1W':
          this.setState({
            ethereumCurrentRange: 'SINCE LAST WEEK',
            rangeSelected: 2
          });
          break;

        case '1M':
          this.setState({
            ethereumCurrentRange: 'SINCE LAST MONTH',
            rangeSelected: 3
          });
          break;

        case '1Y':
          this.setState({
            ethereumCurrentRange: 'SINCE LAST YEAR',
            rangeSelected: 4
          });
          break;

        case 'ALL':
          this.setState({
            ethereumCurrentRange: 'FOR ALL THE TIME',
            rangeSelected: 5
          });
          break;

        default:
          break;
      }
    };

    litecoinSeriesConfigData.xAxis.events.afterSetExtremes = (e) => {
      let min = e.target.series[0].processedYData[0],
        max = this.state.litecoinChartAxisMax;
      this.valueSetData(min, max);
      this.percentageSetData(min, max);
    };
    litecoinSeriesConfigData.xAxis.events.setExtremes = (e) => {
      switch(e.rangeSelectorButton.text) {
        case '1H':
          this.setState({
            liteCoinCurrentRange: 'SINCE AN HOUR AGO',
            rangeSelected: 0
          });
          break;

        case '1D':
          this.setState({
            liteCoinCurrentRange: 'SINCE YESTERDAY',
            rangeSelected: 1
          });
          break;

        case '1W':
          this.setState({
            liteCoinCurrentRange: 'SINCE LAST WEEK',
            rangeSelected: 2
          });
          break;

        case '1M':
          this.setState({
            liteCoinCurrentRange: 'SINCE LAST MONTH',
            rangeSelected: 3
          });
          break;

        case '1Y':
          this.setState({
            liteCoinCurrentRange: 'SINCE LAST YEAR',
            rangeSelected: 4
          });
          break;

        case 'ALL':
          this.setState({
            liteCoinCurrentRange: 'FOR ALL THE TIME',
            rangeSelected: 5
          });
          break;

        default:
          break;
      }
    };
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Stronghold - Charts</title>
          <meta name="description" content="Stonghold Charts" />
        </Helmet>
        <TopNav />
        <section className="section--overlap inline-block w--100">
          <div className="col-xs-12">
            <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
              <TabList className="tabs">
                <Tab className='tab' selectedClassName="active">
                  <div className="tab__title">
                    <span className="h5">Bitcoin · ${this.state.bitCoinChartAxisMax}</span>
                  </div>
                </Tab>
                <Tab className='tab' selectedClassName="active">
                  <div className="tab__title">
                    <span className="h5">Ethereum · ${this.state.ethereumChartAxisMax}</span>
                  </div>
                </Tab>
                <Tab className='tab' selectedClassName="active">
                  <div className="tab__title">
                    <span className="h5">Litecoin · ${this.state.litecoinChartAxisMax}</span>
                  </div>
                </Tab>
              </TabList>

              <div className="tabs-content">
                <TabPanel selectedClassName="active">
                  <div className="graph-wrap">
                    <div className="boxed boxed--border col-xs-12 unmarg">
                      <div className="col-sm-8 col-sm-offset-2 text-center">
                        <div className="col-sm-4">
                          <div className="card card-1 boxed boxed--sm boxed--border">
                            <h2 className="mb--1">${this.state.bitCoinChartAxisMax}</h2>
                            <p>BITCOIN PRICE</p>
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="card card-1 boxed boxed--sm boxed--border">
                            <h2 className="mb--1">
                              {
                                this.state.bitCoinValueSign === 'belowZero' ?
                                  <span className="color--error">−</span> :
                                  this.state.bitCoinValueSign === 'aboveZero' ?
                                    <span className="color--success">+</span> : false
                              }
                              ${this.state.bitCoinValueDifference}
                            </h2>
                            <p>{this.state.bitCoinCurrentRange} (USD)</p>
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="card card-1 boxed boxed--sm boxed--border">
                            <h2 className="mb--1">
                              {
                                this.state.bitCoinPercentageSign === 'belowZero' ?
                                  <span className="color--error">−</span> :
                                this.state.bitCoinPercentageSign === 'aboveZero' ?
                                  <span className="color--success">+</span> : false
                              }
                              {this.state.bitCoinPercentageDifference}%
                            </h2>
                            <p>{this.state.bitCoinCurrentRange} (%)</p>
                          </div>
                        </div>
                      </div>
                      <ReactHighstock config={bitcoinConfig} isPureConfig></ReactHighstock>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel selectedClassName="active">
                  <div className="graph-wrap">
                    <div className="boxed boxed--border col-xs-12 unmarg">
                      <div className="col-sm-8 col-sm-offset-2 text-center">
                        <div className="col-sm-4">
                          <div className="card card-1 boxed boxed--sm boxed--border">
                            <h2 className="mb--1">${this.state.ethereumChartAxisMax}</h2>
                            <p>ETHEREUM PRICE</p>
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="card card-1 boxed boxed--sm boxed--border">
                            <h2 className="mb--1">
                              {
                                this.state.ethereumValueSign === 'belowZero' ?
                                  <span className="color--error">−</span> :
                                  this.state.ethereumValueSign === 'aboveZero' ?
                                    <span className="color--success">+</span> : false
                              }
                              ${this.state.ethereumValueDifference}
                            </h2>
                            <p>SINCE AN HOUR AGO (USD)</p>
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="card card-1 boxed boxed--sm boxed--border">
                            <h2 className="mb--1">
                              {
                                this.state.ethereumPercentageSign === 'belowZero' ?
                                  <span className="color--error">−</span> :
                                  this.state.ethereumPercentageSign === 'aboveZero' ?
                                    <span className="color--success">+</span> : false
                              }
                              {this.state.ethereumPercentageDifference}%
                            </h2>
                            <p>SINCE AN HOUR AGO (%)</p>
                          </div>
                        </div>
                      </div>
                      <ReactHighstock config={ethereumConfig} isPureConfig></ReactHighstock>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel selectedClassName="active">
                  <div className="graph-wrap">
                    <div className="boxed boxed--border col-xs-12 unmarg">
                      <div className="col-sm-8 col-sm-offset-2 text-center">
                        <div className="col-sm-4">
                          <div className="card card-1 boxed boxed--sm boxed--border">
                            <h2 className="mb--1">${this.state.litecoinChartAxisMax}</h2>
                            <p>LITECOIN PRICE</p>
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="card card-1 boxed boxed--sm boxed--border">
                            <h2 className="mb--1">
                              {
                                this.state.liteCoinValueSign === 'belowZero' ?
                                  <span className="color--error">−</span> :
                                  this.state.liteCoinValueSign === 'aboveZero' ?
                                    <span className="color--success">+</span> : false
                              }
                              ${this.state.liteCoinValueDifference}
                            </h2>
                            <p>SINCE AN HOUR AGO (USD)</p>
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="card card-1 boxed boxed--sm boxed--border">
                            <h2 className="mb--1">
                              {
                                this.state.liteCoinPercentageSign === 'belowZero' ?
                                  <span className="color--error">−</span> :
                                  this.state.liteCoinPercentageSign === 'aboveZero' ?
                                    <span className="color--success">+</span> : false
                              }
                              {this.state.liteCoinPercentageDifference}%
                            </h2>
                            <p>SINCE AN HOUR AGO (%)</p>
                          </div>
                        </div>
                      </div>
                      <ReactHighstock config={litecoinConfig} isPureConfig></ReactHighstock>
                    </div>
                  </div>
                </TabPanel>
              </div>
            </Tabs>
          </div>
        </section>
      </div>
    );
  }
}

export default Charts
*/
