const express = require('express');
const app = express.Router();
const commonModule = require("../module/common");
const common = new commonModule();
const multerModule = require("../module/multer");
const multer = new multerModule();
const XLSX = require('xlsx');
const asyncnpm = require('async');
const _ = require('underscore');

app.get(['/'], async (req, res) => {
	var extend = require('util')._extend;
	var arr_temp = extend({}, $arr);
  	arr_temp.logornot = (typeof (req.session.userid) === 'undefined') ? '' : req.session.userid;
  	arr_temp.emp = (typeof (req.session.is_emp) === 'undefined') ? '' : req.session.is_emp;
	if (arr_temp.logornot == '') {
		let [record] = await Promise.all([common.getall_activesheets(req)]);
		arr_temp.record = record;
		common.tplFile("homepage.tpl");
		common.headerSet(1);
		common.loadTemplateHeader(req, res, arr_temp);
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



app.get(['/viewexpense/:action'], async (req, res) => {
	var extend = require('util')._extend;
	var arr_temp = extend({}, $arr);
	let [outerrecords, innerrecords] = await Promise.all([common.getall_expensesmain(req.params.action), common.getall_insideexpensesmain(req.params.action)]);
	for (const item of outerrecords) {
		let arraytopushinside = _.filter(innerrecords, function (o) { return o.expense_id == item.id; })
		item.internalexpenses = arraytopushinside
	}
	arr_temp.completerecords = outerrecords;
	common.tplFile("viewexpenses.tpl");
	common.headerSet(1);
	common.loadTemplateHeader(req, res, arr_temp);
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
		let [insertSheet] = await Promise.all([common.insert_mainsheet(req.file)]);
		// let fileext = mime.getExtension(req.file.mimetype)
		// let csvTrue = 0
		// csvTrue = fileext == 'csv' ? 1 : 0
		// req.file.basenam = (typeof (req.file.filename) === 'undefined') ? '' : req.file.filename.substr(0, req.file.filename.lastIndexOf('.'));
		// finalresult.datumnew = req.file;
		let sheet_id = insertSheet.insertId;
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
							await Promise.all([common.insert_expensesdetails(sheet_id, insertID, data)]);
						}
						return true;
					} else {
						if(data.Account || data.MemoDescription){
							await Promise.all([common.insert_expensesdetails(sheet_id, insertID, data)]);
						} else if(data.Credit || data.Debit) {
							await Promise.all([common.update_totalexpense(insertID, data)]);
						}
						return true;
					}
				};

				let dataiterated = 1;
				for (const item of data) {
					if (item) {
						if(data.length == dataiterated){
							await Promise.all([common.update_totalsheet(sheet_id, item)]);
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