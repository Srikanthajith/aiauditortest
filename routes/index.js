const express = require('express');
const app = express.Router();
const commonModule = require("../module/common");
const common = new commonModule();

app.get(['/'], function (req, res) {
	var extend = require('util')._extend;
	var arr_temp = extend({}, $arr);
  	arr_temp.logornot = (typeof (req.session.userid) === 'undefined') ? '' : req.session.userid;
  	arr_temp.emp = (typeof (req.session.is_emp) === 'undefined') ? '' : req.session.is_emp;
	if (arr_temp.logornot == '') {
		var nsmarty = require('nsmarty');
		arr_temp.sliseo_title = 'Home';
		arr_temp.loged = req.session;
		arr_temp.seoIM = arr_temp.sliseo_title;
    	arr_temp.file_revision = global.fileversion.file_revision;
		nsmarty.clearCache('homepage.tpl');
		nsmarty.tpl_path = arr_temp.config.path + '/templates/';
		res.setHeader('Content-Type', 'text/html; charset=UTF-8');
		stream = nsmarty.assign('homepage.tpl', arr_temp);
		stream.pipe(res);
	} else if (arr_temp.emp == 1) {
		res.writeHead(302, {
			'Location': '/admincp'
		});
		res.end();
		return false;
	} else {
		res.writeHead(302, {
			'Location': '/search'
		});
		res.end();
		return false;
	}
});



module.exports = app;