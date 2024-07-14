const { apiKey, permission } = require('../auth/checkAuth');

module.exports = (app) => {
    app.use(apiKey)
    
    app.use(permission('0000'))

    app.use('/v1/api', require('./access/index'));
}