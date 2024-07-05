const accessRoute = require('../routes/aceess/index');
module.exports = (app) => {
    app.use('/api/v1', accessRoute);
}