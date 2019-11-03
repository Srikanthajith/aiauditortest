const mysql = require('mysql');
const util = require('util')
const config = require('config').get('Common').get('dbConfig');
//saving array
module.exports = async () => {
    delete global;
    global = [];
    global.dbconfigsingle = {
      host : config.host,
      user : config.user,
      password: config.password,
      database: config.database
    };
    let handleDisconnectSingle = () =>  {
      global.connectsingle = mysql.createConnection(global.dbconfigsingle);

      global.connectsingle.connect(function(err) {
        if (err) {
            console.error("[" + new Date() + "] --> DB CONNECTION Failed :", err.code);
            handleDisconnectSingle();
        }
      });
      global.connectsingle.on('close', function (err) {
        handleDisconnectSingle();
      });
      global.connectsingle.on('end', function (err) {
        handleDisconnectSingle();
      });
      global.connectsingle.on('error', function(err) {
        if(err.fatal || err.code == 'PROTOCOL_CONNECTION_LOST'){
          console.error("[" + new Date() + '] --> DB FATAL/PROTOCOL_CONNECTION_LOST ERROR :',err);
          global.connectsingle.end();
        }
      });
      global.connectsingle.query = util.promisify(global.connectsingle.query)
      global.mysql = global.connectsingle;
    }
    handleDisconnectSingle();

    return global;
}
