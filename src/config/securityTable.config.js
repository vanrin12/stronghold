// @flow
module.exports = {
    basicTableConfig: {
        hideSizePerPage: true,
        paginationSize: 10,
        hidePageListOnlyOnePage: true
    },

    phoneColumnConfig: [
        {
            tdStyle: {
                width: '200px'
            },
            thStyle: {
                width: '200px'
            },
            dataFormat: 'phoneNumberFormatter',
            columnTitle: 'Phone Number'
        }, {
            tdStyle: {
                width: '200px'
            },
            thStyle: {
                width: '200px'
            },
            dataFormat: 'statusFormatter',
            columnTitle: 'Status'
        }, {
            tdStyle: {
                width: '200px'
            },
            thStyle: {
                width: '200px'
            },
            dataFormat: 'primaryFormatter',
            columnTitle: 'Primary'
        }, {
            tdStyle: {
                paddingRight: '2.5rem'
            },
            dataFormat: 'cancelButton',
            dataAlign: 'right'
        }
    ],

    webSessionsColumnConfig: [
        {
            dataFormat: 'dateFormatterAgo',
            columnTitle: 'Signed In'
        }, {
            columnTitle: 'Browser'
        }, {
            columnTitle: 'IP Address'
        }, {
            columnTitle: 'Near'
        }, {
            dataFormat: 'currentLabel',
            dataAlign: 'right'
        }, {
            dataFormat: 'cancelButton',
            dataAlign: 'center'
        }
    ],

    accountActivityColumnConfig: [
        {
            columnTitle: 'Action'
        }, {
            tdStyle: {
                width: '200px'
            },
            thStyle: {
                width: '200px'
            },
            columnTitle: 'Source'
        }, {
            tdStyle: {
                width: '150px'
            },
            thStyle: {
                width: '150px'
            },
            columnTitle: 'IP Address'
        }, {
            columnTitle: 'Near'
        }, {
            dataFormat: 'dateFormatterAgo',
            columnTitle: 'When'
        }
    ]
};
