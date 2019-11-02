

const _ = require('underscore');
class checkIPValidation  {
    constructor() {
    }

    checkIpValidation (req) {
        let ipaddress = this.getClientIp(req);
        if(ipaddress){
            let whitelistedIP = [];
            if(_.contains(whitelistedIP, ipaddress)){
                return [true];
            } else {
                return [false, ipaddress];
            }
        } else {
            return [false, ipaddress];;
        }
    }
    
    getClientIp (req) {
        let ipAddress = req.connection.remoteAddress;
        // let ipAddress2 = req.headers['x-forwarded-for'];
        // let ipAddress3 = req.connection.socket.remoteAddress;
        
        if (!ipAddress) {
            return null;
        }
        // convert from "::ffff:192.0.0.1"  to "192.0.0.1"
        if (ipAddress.substr(0, 7) == "::ffff:") {
          ipAddress = ipAddress.substr(7)
        }
        return ipAddress;
    };
}

module.exports = checkIPValidation;


