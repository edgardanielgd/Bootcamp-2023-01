const apiV1 = require('./v1');

const api = ( Route ) => {
    Route.group(
        () => {
            apiV1(Route);
        }
    ).prefix('/api');
}

module.exports = api