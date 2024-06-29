const path = require('path');

module.exports = {
    // Other webpack configurations...
    resolve: {
        alias: {
            '~': path.resolve(__dirname, 'route')
        }
    }
};
