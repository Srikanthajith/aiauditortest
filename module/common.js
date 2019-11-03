//header function check here
var nsmarty = require('nsmarty');
var mysqli = require('./mysqli');
const mysqclass = new mysqli();
var q = require('q');
var dateFormat = require('dateformat');
const _ = require('underscore');
class commonModule  {
    constructor() {
        this.scriptfile = '';
        this.headered = '';
        this.mainActive = '';
        this.subActive = '';
    }
    
    menuhighlight(main, sub){
        this.mainActive = [];
        this.mainActive[main] = 'active';
        if(sub){
            this.mainActive[sub] = 'active';
        }
    }

    usermenuhighlight(main, sub){
        this.mainActive = [];
        this.mainActive[main] = 'active';
        if(sub){
            this.mainActive[sub] = 'active';
        }
    }

    tplFile(file) {
        this.scriptfile = file;
    }

    headerSet (data) {
        this.headered = data;
    }

    ajaxjson (res, data) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(data));
    }
    
    sendJSONOutput (req, res, data) {
        res.send(JSON.stringify(data));
        res.end();
        return false;
    }

    urlparameter (query, leave) {
        var s = '';
        for (var i in query) {
            if (i != '') {
                s += i + '=' + query[i] + '&';
            }
        }
        for (var k in leave) {
            if (k != '') {
                s = s.replace(new RegExp(k + '=' + query[i] + '&', 'g'), '');
            }
        }
        return s;
    }

    renderJson (res, data) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(data));
    }

    currencyConverter (data) {
        return parseInt(data).toLocaleString('en-US');
    }
    
    currencyConverterDecimal (data) {
        return parseInt(data).toLocaleString('en-US')+".00";
    }

    integerConverter (data) {
        return parseInt(data);
    }


    dateTimeConverter (data) {
        if(data && data != '0000-00-00 00:00:00'){
            return dateFormat(new Date(data), "dd/mm/yyyy hh:MM TT");
        } else {
            return '-';
        }  
    }

    checkSecondsWithin (date) {
        if(date){
            let checkdate = new Date(date);
            let beforedate = new Date();
            if(beforedate <= checkdate){
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    checkDateWithin (date, count) {
        if(date){
            let checkdate = new Date(date);
            let beforedate = new Date();
            beforedate.setDate(beforedate.getDate()-parseInt(count));
            if(beforedate <= checkdate){
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }



    checkArrayExist (array, value) {
        if(array){
            if (array.toString().indexOf(',') > -1) {
                if(_.contains(array.split(','), value.toString())){
                    return true;
                } else {
                    return false;
                }
            } else {
                if(array.toString() == value.toString()){
                    return true;
                } else {
                    return false;
                }
            }
        } else {
            return false;
        }
    }
    
    dateTimeSecondConverter (data) {
        if(data && data != '0000-00-00 00:00:00'){
            return dateFormat(new Date(data), "dd/mm/yyyy hh:MM:ss TT");;
        } else {
            return '-';
        } 
    }

    dateConverter (data) {
        if(data && data != '0000-00-00 00:00:00'){
            return dateFormat(new Date(data), "dd/mm/yyyy");
        } else {
            return '-';
        } 
    }

    viewPageValid (viewPageValid) {
        return (viewPageValid) ? global.phrase['English'].yes : global.phrase['English'].no;
    }

    shorten (data, num) {
        if (data == '' || data == null) {
            return data;
        }
        var length = data.length;
        return (length > num) ? data.substr(0, num-1) + '..' : data;
    }

    parseFloat (data) {
        data = parseFloat(data).toFixed(2);
        return parseFloat(data);
    }

    sumFloat (data, data2) {
        data = parseFloat(data) + parseFloat(data2);
        return parseFloat(data);
    }

    subFloat (data, data2) {
        data = (parseFloat(data) - parseFloat(data2)).toFixed(2);
        return parseFloat(data);
    }
    convertBytesToKb  (val) {
        kbvalue = (parseFloat(val) / 1024).toFixed(2);
        return kbvalue;
    }
    
    convertKbToMb (val) {
        kbvalue = (parseFloat(val) / 1024).toFixed(2);
        return kbvalue;
    }

    convertMbToKb (val) {
        mbvalue = (parseFloat(val) * 1000).toFixed(2);
        return mbvalue;
    }

    dateMeasure (ms) {
        var d, h, m, s;
        s = Math.floor(ms / 1000);
        m = Math.floor(s / 60);
        s = s % 60;
        h = Math.floor(m / 60);
        m = m % 60;
        d = Math.floor(h / 24);
        h = h % 24;
        m = (m < 10) ? '0' + m : m;
        h = (h < 10) ? '0' + h : h;
        s = (s < 10) ? '0' + s : s;
        d = (d < 10) ? '0' + d : d;
        return d + 'd:' + h + 'h:' + m + 'm:' + s + 's';
    }

    firstLetterCapital (str) {
        return str.replace(/\b./g, function (m) {
            return m.toUpperCase();
        });
    };

      async loadTemplateAdminHeader (req, res, arr) {
        arr.file = this.scriptfile;
        arr.headered = this.headered;
        arr.loged = req.session;
        arr.commonfunction = this;
        arr.sumFloat = this.sumFloat;
        arr.subFloat = this.subFloat;
        arr.parseFloat = this.parseFloat;
        if (typeof (arr.datenow) === 'undefined') {
            arr.datenow = new Date();
        }
        arr.serverdate = dateFormat(new Date(), "yyyy/mm/dd HH:MM:ss");
        arr.serverdateformat = dateFormat(new Date(), "yyyy/mm/dd HH:MM");
        arr.serverdatemain = dateFormat(new Date());
        let uid = 0;
        arr.currencyConverter = this.currencyConverter;
        arr.currencyConverterDecimal = this.currencyConverterDecimal;
        arr.integerConverter = this.integerConverter;
        arr.dateTimeConverter = this.dateTimeConverter;
        arr.checkArrayExist = this.checkArrayExist;
        arr.dateTimeSecondConverter =  this.dateTimeSecondConverter;
        arr.dateConverter = this.dateConverter;
        arr.viewPageValid = this.viewPageValid;
        arr.convertKbToMb = this.convertKbToMb;
        arr.shorten = this.shorten;
        arr.convertBytesToKb = this.convertBytesToKb;
        arr.file_revision = global.fileversion;
        arr.dateFormat = dateFormat;
        arr.seoIM = (typeof (arr.sliseo_title) === 'undefined' || arr.sliseo_title == '' || arr.sliseo_title === null) ? 'DealerSource' : arr.sliseo_title;
        var radiocheckup = req.originalUrl;
    
            delete arr['menu'];
            arr['menu'] = [];
            arr['menu'] = this.mainActive

            uid = req.session.userid;
            nsmarty.tpl_path = arr.config.path + '/templates/';
            nsmarty.clearCache(arr.file);
            if (!arr.headered) {
                function ajaxjsonrun(data) {
                    res.setHeader('Content-Type', 'application/json');
                    var reval = (typeof (arr.returnval) === 'undefined' || arr.returnval === null) ? '' : arr.returnval;
                    res.end(JSON.stringify({
                        html: data,
                        returnval: reval
                    }));
                }
                var stream = nsmarty.assigndata(arr.file, arr, ajaxjsonrun);
            } else {
                res.setHeader('Content-Type', 'text/html; charset=UTF-8');
                var stream = nsmarty.assign(arr.file, arr);
                stream.pipe(res);
            }
    }

    async loadTemplateHeader (req, res, arr) {
        arr.file = this.scriptfile;
        arr.headered = this.headered;
        arr.loged = req.session;
        arr.commonfunction = this;
        arr.sumFloat = this.sumFloat;
        arr.subFloat = this.subFloat;
        arr.parseFloat = this.parseFloat;
        if (typeof (arr.datenow) === 'undefined') {
            arr.datenow = new Date();
        }
        arr.serverdate = dateFormat(new Date(), "yyyy/mm/dd HH:MM:ss");
        arr.serverdateformat = dateFormat(new Date(), "yyyy/mm/dd HH:MM");
        arr.serverdatemain = dateFormat(new Date());
        let uid = 0;
        arr.currencyConverter = this.currencyConverter;
        arr.currencyConverterDecimal = this.currencyConverterDecimal;
        arr.integerConverter = this.integerConverter;
        arr.dateTimeConverter = this.dateTimeConverter;
        arr.checkArrayExist = this.checkArrayExist;
        arr.checkDateWithin = this.checkDateWithin;
        arr.checkSecondsWithin = this.checkSecondsWithin;
        arr.dateTimeSecondConverter =  this.dateTimeSecondConverter;
        arr.dateConverter = this.dateConverter;
        arr.viewPageValid = this.viewPageValid;
        arr.convertKbToMb = this.convertKbToMb;
        arr.shorten = this.shorten;
        arr.convertBytesToKb = this.convertBytesToKb;
        arr.file_revision = global.fileversion;
        arr.dateFormat = dateFormat;
        arr.seoIM = (typeof (arr.sliseo_title) === 'undefined' || arr.sliseo_title == '' || arr.sliseo_title === null) ? 'DealerSource' : arr.sliseo_title;
        var radiocheckup = req.originalUrl;        
        // for checking the maintenance mode
        var mode = global.mode.Maintenance_mode;
        var originalurl = req.originalUrl;
        var n = originalurl.search("admin");
        if (n < 1) {
            if (mode == 'yes' && originalurl != '/') {
                var ip = (req.headers['x-forwarded-for'] || '').split(',')[0] || req.ip || req.connection.remoteAddress;
                if (ip.substr(0, 7) == "::ffff:") {
                    ip = ip.substr(7);
                }
                var modeip = global.mode.Exclude_IP.split(",");
                if (modeip.indexOf(ip) > -1) {
                    //In the array!
                } else {
                    res.writeHead(302, {
                        'Location': '/'
                    });
                    res.end();
                    return false;
                }
            }
        }

        if (radiocheckup.indexOf('admincp') == -1) {
            delete arr['menu'];
            arr['menu'] = [];
            arr['menu'] = this.mainActive
            if (typeof (req.session.userid) !== 'undefined') {
                uid = req.session.userid;
                nsmarty.tpl_path = arr.config.path + '/templates/';
                nsmarty.clearCache(arr.file);
                if (!arr.headered) {
                    function ajaxjsonrun(data) {
                        res.setHeader('Content-Type', 'application/json');
                        var reval = (typeof (arr.returnval) === 'undefined' || arr.returnval === null) ? '' : arr.returnval;
                        res.end(JSON.stringify({
                            html: data,
                            returnval: reval
                        }));
                    }
                    var stream = nsmarty.assigndata(arr.file, arr, ajaxjsonrun);
                } else {
                    res.setHeader('Content-Type', 'text/html; charset=UTF-8');
                    var stream = nsmarty.assign(arr.file, arr);
                    stream.pipe(res);
                }
            } else {
                nsmarty.tpl_path = arr.config.path + '/templates/';
                nsmarty.clearCache(arr.file);
                if (!arr.headered) {
                    function ajaxjsonrun(data) {
                        res.setHeader('Content-Type', 'application/json');
                        var reval = (typeof (arr.returnval) === 'undefined' || arr.returnval === null) ? '' : arr.returnval;
                        res.end(JSON.stringify({
                            html: data,
                            returnval: reval
                        }));
                    }
                    var stream = nsmarty.assigndata(arr.file, arr, ajaxjsonrun);
                } else {
                    res.setHeader('Content-Type', 'text/html; charset=UTF-8');
                    var stream = nsmarty.assign(arr.file, arr);
                    stream.pipe(res);
                }
            }
        } else {
            delete arr['menu'];
            arr['menu'] = [];
            arr['menu'] = this.mainActive
            nsmarty.tpl_path = arr.config.path + '/templates/';
            nsmarty.clearCache(arr.file);
            if (!arr.headered) {
                function ajaxjsonrun(data) {
                    res.setHeader('Content-Type', 'application/json');
                    var reval = (typeof (arr.returnval) === 'undefined' || arr.returnval === null) ? '' : arr.returnval;
                    res.end(JSON.stringify({
                        html: data,
                        returnval: reval
                    }));
                }
                var stream = nsmarty.assigndata(arr.file, arr, ajaxjsonrun);
            } else {
                res.setHeader('Content-Type', 'text/html; charset=UTF-8');
                var stream = nsmarty.assign(arr.file, arr);
                stream.pipe(res);
            }
        }
    }

    currencyFormatIngram (input) {
        var inputGiven = input.split('.');
        var x = inputGiven[0];
        x = x.replace(/,/g, ""); // Strip out all commas
        x = x.replace(/.../g, function (e) {
            return e + ",";
        }); // Insert new commas
        x = x.replace(/^,/, ""); // Remove leading comma
        if (typeof (inputGiven[1]) !== 'undefined') {
            inputGiven[1] = (inputGiven[1].length == 1) ? inputGiven[1] + '0' : inputGiven[1];
        }
        var rozero = (typeof (inputGiven[1]) === 'undefined' || inputGiven[1] == '00') ? '' : '.' + inputGiven[1];
        return x + '' + rozero
    }


    paginationprequery (req) {
        var url = require('url');
        var url_parts = url.parse(req.url, true);
        var query = url_parts.query;
        return this.urlparameter(query, { page: '' });
    }

    jsonResponse(res, status, message){
        let finalresultjson = {};
        finalresultjson.status = status;
        finalresultjson.message = message;
        res.json(finalresultjson);
        res.end();
        return false;
    }

    // app.use((req, res, next) => {
    isAuthenticatedUser(req, res, next) {
        if (req.session.userid) {
            // if (req.session.is_emp == '1') {
            //     res.redirect('/admincp');
            //     return false;
            // } else {
                return next();
            // }
        } else {
            res.redirect('/login');
            return false;
        }
    }

    isAuthenticatedAdmin(req, res, next) {
        if (req.session.userid) {
            if (req.session.is_emp == '0') {
                res.redirect('/');
                return false;
            } else {
                return next();
            }
        } else {
            res.redirect('/admin/login');
            return false;
        }
    }

    async insert_mainsheet (file) {
        let mysql = {};
		let escape_data = [file.originalname, file.filename, dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss")];
		let strQuery = await mysqclass.mysqli(mysql, 'insert_into_sheets');
        return await global.mysql.query(strQuery, escape_data)
    }

    async clear_sheets () {
        let mysql = {};
		let escape_data = [];
		let strQuery = await mysqclass.mysqli(mysql, 'clear_sheets');
        return await global.mysql.query(strQuery, escape_data)
    }

    async clear_expenses () {
        let mysql = {};
		let escape_data = [];
		let strQuery = await mysqclass.mysqli(mysql, 'clear_expenses');
        return await global.mysql.query(strQuery, escape_data)
    }

    async clear_expenses_details () {
        let mysql = {};
		let escape_data = [];
		let strQuery = await mysqclass.mysqli(mysql, 'clear_expenses_details');
        return await global.mysql.query(strQuery, escape_data)
    }

    async insert_dataexecel (sheet_id, data) {
        let mysql = {};
		let escape_data = [sheet_id, dateFormat(new Date(data.Date), "yyyy-mm-dd"), data.Transaction, data.Num, data.Name];
		let strQuery = await mysqclass.mysqli(mysql, 'insert_into_expense');
        return await global.mysql.query(strQuery, escape_data)
    }
    async update_totalexpense (id, data) {
        let mysql = {};
		let escape_data = [data.Credit, data.Debit, id];
		let strQuery = await mysqclass.mysqli(mysql, 'update_final_expense');
        return await global.mysql.query(strQuery, escape_data)
    }
    
    async update_totalsheet (id, data) {
        let mysql = {};
		let escape_data = [data.Credit, data.Debit, id];
		let strQuery = await mysqclass.mysqli(mysql, 'update_final_sheets');
        return await global.mysql.query(strQuery, escape_data)
    }

    async insert_expensesdetails (sheet_id, id, data) {
        let mysql = {};
        let type = '';
        let amount = 0;
        if(data.Credit){
            type = 'credit';
            amount = data.Credit;
        } else {
            type = 'debit';
            amount = data.Debit;
        }
        let escape_data = [sheet_id, id, data.MemoDescription, data.Account, amount, type];

        let strQuery = await mysqclass.mysqli(mysql, 'insert_into_expensedetails');
        return await global.mysql.query(strQuery, escape_data)
    }

    async getall_activesheets () {
        let mysql = {};
		let escape_data = [];
		let strQuery = await mysqclass.mysqli(mysql, 'get_all_sheets');
        return await global.mysql.query(strQuery, escape_data)
    }


    async getall_expensesmain (id) {
        let mysql = {};
		let escape_data = [id];
		let strQuery = await mysqclass.mysqli(mysql, 'get_all_expensesmain');
        return await global.mysql.query(strQuery, escape_data)
    }

    async getall_creditschart (id) {
        let mysql = {};
		let escape_data = [id];
		let strQuery = await mysqclass.mysqli(mysql, 'get_distinct_transactions_credits');
        return await global.mysql.query(strQuery, escape_data)
    }

    async getall_debitschart (id) {
        let mysql = {};
		let escape_data = [id];
		let strQuery = await mysqclass.mysqli(mysql, 'get_distinct_transactions_debits');
        return await global.mysql.query(strQuery, escape_data)
    }

    async getall_insideexpensesmain (id) {
        let mysql = {};
		let escape_data = [id];
		let strQuery = await mysqclass.mysqli(mysql, 'get_all_expensesinside');
        return await global.mysql.query(strQuery, escape_data)
    }

    
}

module.exports = commonModule


