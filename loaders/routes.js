module.exports = function(app) {
    var index = require('../routes/index'),
    error = require('../middleware/error');

    app.use('/',index); 
    app.use(error);

    return app;
}