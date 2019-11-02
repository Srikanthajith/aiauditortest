const config = require('config').get('Common');
const _ = require('underscore');
module.exports = async (global) => {
    global.paths = config;
    global.common = config;
    global.cron_ref_url = config.get('cron_ref_url');
    global.general = config.get('general');
    global.mode =  config.get('mode');
    global.fileversion  = config.get('fileversion');
    global.surl = config.get('url');
    global.port = config.get('port');
    global.images_url = config.get('images_url');
    if(process.env.NODE_ENV == 'development'){
      global.url  = global.surl+':'+global.port;
    } else {
      global.url  = global.surl;
    }
    global.logourl  = global.url;
    global.title = config.get('title');
    global.path = config.get('path');
    global.spath = global.url+'/';
    global.dpath = global.spath;
    global.settingscdn = config.get('settingscdn');
    global.websitename = config.get('websitename');

    global.externalcss = global.spath+'css/';
    global.externaljs = global.spath+'js/';
    global.imgpath = global.images_url+'/uploads/';
    global.externalIMcss = global.spath+'im/css/';
    global.externalIMjs = global.spath+'im/js/';

    // let data = await global.mysql.query('SELECT variable, value, type FROM configurations')
    // _.each(data,(valdata) => {
    //   if(valdata.type == 'number'){
    //     global[valdata.variable] = parseInt(valdata.value);
    //   } else {
    //     global[valdata.variable] = valdata.value;
    //   }
    // });

    return global;
}
