// @flow
module.exports = {
    basicTableConfig: {
        hideSizePerPage: true,
        paginationSize: 25,
        hidePageListOnlyOnePage: true
    },

    transactionTable: [
        {
            dataFormat: 'txIdFormatter',
            columnTitle: 'txID'
        }, {
            dataFormat: 'iconFormatter',
            columnTitle: 'Asset'
        }, {
            dataFormat: 'amountFormatter',
            columnTitle: 'Amount'
        }, {
            columnTitle: 'Other Party Address'
        }, {
            dataFormat: 'booleanFormatter',
            columnTitle: 'Received'
        }, {
            dataFormat: 'dateFormatter',
            columnTitle: 'Timestamp'
        }, {
            columnTitle: 'Explorer URL'
        }
    ]
};
