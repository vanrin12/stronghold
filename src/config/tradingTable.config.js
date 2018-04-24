// @flow
import type { MarketType } from "../types"

module.exports = {
    basicTableConfig: {
        hideSizePerPage: true,
        paginationSize: 10,
        hidePageListOnlyOnePage: true
    },

    balanceTable: [
        {
            dataFormat: 'balanceFormatter',
            dataAlign: 'center',
            columnTitle: 'BTC BALANCE'
        }, {
            dataFormat: 'balanceFormatter',
            dataAlign: 'center',
            columnTitle: 'ETH BALANCE'
        }, {
            dataFormat: 'balanceFormatter',
            dataAlign: 'center',
            columnTitle: 'LTC BALANCE'
        }, {
            dataFormat: 'balanceFormatter',
            dataAlign: 'center',
            columnTitle: 'VOLUME'
        }, {
            dataFormat: 'balanceFormatter',
            dataAlign: 'center',
            columnTitle: 'BID'
        }, {
            dataFormat: 'balanceFormatter',
            dataAlign: 'center',
            columnTitle: 'ASK'
        }, {
            dataFormat: 'balanceFormatter',
            dataAlign: 'center',
            columnTitle: 'LAST PRICE'
        }, {
            dataFormat: 'balanceFormatter',
            dataAlign: 'center',
            columnTitle: 'LOWEST'
        }, {
            dataFormat: 'balanceFormatter',
            dataAlign: 'center',
            columnTitle: 'HIGHEST'
        },
    ],

    ordersColumnCheckboxList: [
        {
            value: 'orderDate',
            text: 'Order Date'
        }, {
            value: 'closeDate',
            text: 'Close Date'
        }, {
            value: 'type',
            text: 'Type'
        }, {
            value: 'bid',
            text: 'Bid'
        }, {
            value: 'unitsFul',
            text: 'Units Fulfilled'
        }, {
            value: 'unitsTotal',
            text: 'Units Total'
        }, {
            value: 'actualRate',
            text: 'Actual Rate'
        }, {
            value: 'proceeds',
            text: 'Proceeds'
        }
    ],

    openOrdersColumnConfig: [
        {
            tdStyle: {
                width: '220px'
            },
            thStyle: {
                width: '220px'
            },
            dataFormat: 'dateFormatter',
            csvFormat: 'csvDateFormatter',
            columnTitle: 'Order Date'
        }, {
            tdStyle: {
                width: '220px'
            },
            thStyle: {
                width: '220px'
            },
            dataFormat: 'dateFormatter',
            csvFormat: 'csvDateFormatter',
            columnTitle: 'Close Date'
        }, {
            dataFormat: 'typeFormatter',
            columnTitle: 'Type'
        }, {
            columnTitle: 'Bid'
        }, {
            columnTitle: 'Units Fulfilled'
        }, {
            columnTitle: 'Units Total'
        }, {
            columnTitle: 'Actual Rate'
        }, {
            columnTitle: 'Proceeds'
        }, {
            dataFormat: 'cancelButton'
        }
    ],

    orderHistoryColumnConfig: [
        {
            tdStyle: {
                width: '220px'
            },
            thStyle: {
                width: '220px'
            },
            dataFormat: 'dateFormatter',
            csvFormat: 'csvDateFormatter',
            columnTitle: 'Order Date'
        }, {
            tdStyle: {
                width: '220px'
            },
            thStyle: {
                width: '220px'
            },
            dataFormat: 'dateFormatter',
            csvFormat: 'csvDateFormatter',
            columnTitle: 'Close Date'
        }, {
            dataFormat: 'typeFormatter',
            columnTitle: 'Type'
        }, {
            columnTitle: 'Bid'
        }, {
            columnTitle: 'Units Fulfilled'
        }, {
            columnTitle: 'Units Total'
        }, {
            columnTitle: 'Actual Rate'
        }, {
            columnTitle: 'Proceeds'
        }],

    marketHistoryColumnConfig: [
        {
            tdStyle: {
                width: '220px'
            },
            thStyle: {
                width: '220px'
            },
            dataFormat: 'dateFormatter',
            columnTitle: 'Date'
        }, {
            dataFormat: 'typeFormatter',
            columnTitle: 'Type'
        }, {
            columnTitle: 'Bid/ASK'
        }, {
            columnTitle: 'Total Units (ETH)'
        }, {
            columnTitle: 'Total Cost (BTC)'
        }],

    createBidsColumnConfig: function(market: MarketType) {
        return [
            {
                columnTitle: 'Sum'
            }, {
                columnTitle: 'Total'
            }, {
                columnTitle: market.base + ' Size'
            }, {
                columnTitle: market.counter + ' Bid'
            }
        ];
    },

    createAsksColumnConfig: function(market: MarketType) {
        return [
            {
                columnTitle: market.counter + ' Ask'
            }, {
                columnTitle: 'Total'
            }, {
                columnTitle: market.base + ' Size'
            }, {
                columnTitle: market.counter + ' Bid'
            }
        ];
    }
};
