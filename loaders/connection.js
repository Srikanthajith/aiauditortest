const http = require('http');
let port = 0;
if(process.env.PORT){
    port = process.env.PORT;
} else {
    port = require('config').get('Common').get('port');
}

module.exports = async (app) => {

app.get('*',function(req,res){
    const commonModule = require("../module/common");
    const common = new commonModule();
    $arr.message= 'page not found';
    common.tplFile('error.tpl');
    common.headerSet(1);
    common.loadTemplateHeader(req,res,$arr);
});
var server = http.createServer(app).listen(port);

console.log('site up and running on port: '+ port);
//http.globalAgent.maxSockets = 10;
io = require('socket.io').listen(server);

setInterval(function () {
    io.sockets.emit('IMservertime', { dTime: new Date() });
}, 1000);

io.sockets.on('connection', function (socket) {
    socket.on('disconnect', function () {
    });
});

return app;
};