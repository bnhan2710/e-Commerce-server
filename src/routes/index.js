const accessRoute = require('./access/index');
module.exports = (app) => {
    app.use('/api/v1', accessRoute);
}