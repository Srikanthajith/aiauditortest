const express = require('express');
const app = express.Router();
const commonModule = require("../module/common");
const common = new commonModule();
const multerModule = require("../module/multer");
const multer = new multerModule();
const XLSX = require('xlsx');
const asyncnpm = require('async');

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




app.post(['/importXLSXfile'], multer.multerSingleUpload('excel_file'), async (req, res) => {
	let finalresult = {};
	if (req.fileValidationError) {
		finalresult.csvdata = 'failed';
		finalresult.csverrmsg = 'Invalid file format';
		res.send(JSON.stringify(finalresult));
		res.end();
		return false;
	} else {
		// let fileext = mime.getExtension(req.file.mimetype)
		// let csvTrue = 0
		// csvTrue = fileext == 'csv' ? 1 : 0
		// req.file.basenam = (typeof (req.file.filename) === 'undefined') ? '' : req.file.filename.substr(0, req.file.filename.lastIndexOf('.'));
		// finalresult.datumnew = req.file;
		let sheet_id = 2;
		var inputFile = global.path + 'public/uploads/excelfiles/' + req.file.filename;
		asyncnpm.waterfall([
			function (callback) {
				var headers = {};
				var data = [];
				var workbook = XLSX.readFile(inputFile);
				var sheet_name_list = workbook.SheetNames;
				sheet_name_list.forEach(function (y) {
					var worksheet = workbook.Sheets[y];
					for (z in worksheet) {
						if (z[0] === '!') continue;
						//parse out the column, row, and value
						var col = z.substring(0, 1);
						var row = parseInt(z.substring(1));
						var value = worksheet[z].v;
						//store header names
						if (row == 1) {
							headers[col] = value;
							continue;
						}
						if (!data[row]) data[row] = {};
						data[row][headers[col]] = value;
						//auctids[row]=value.auctionid;
					}
					//drop those first two rows which are empty

					data.shift();
					data.shift();
				});
				callback(null, data)
			},
			async (data, callback) => {
				let insertID = 0;
				var insertallData = async (data) => {
					if(data.Date){
						let [insertedData] = await Promise.all([common.insert_dataexecel(sheet_id, data)]);
						insertID = insertedData.insertId;
						if(data.Account || data.MemoDescription){
							await Promise.all([common.insert_expensesdetails(insertID, data)]);
						}
						return true;
					} else {
						if(data.Account || data.MemoDescription){
							await Promise.all([common.insert_expensesdetails(insertID, data)]);
						} else if(data.Credit || data.Debit) {
							await Promise.all([common.insert_totalexpense(insertID, data)]);
						}
						return true;
					}
				};

				let dataiterated = 1;
				for (const item of data) {
					if (item) {
						if(data.length == dataiterated){
							console.log('Final Amount', item);
						} else {
							await insertallData(item);
						}
					}
					dataiterated++
				}
				callback(null, 1)
			}
		], function (err, forlength) {
			common.jsonResponse(res, 'success', '');
		});
	}
});


app.get(['/getexcelresult'], async (req, res) => {

});





module.exports = app;