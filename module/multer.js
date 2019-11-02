const multer = require('multer');
const mime  = require('mime');

class multerModule {
    constructor() {
        this.folder = '';
        this.filter = '';
        this.storage = '';
    }

    csvFilter (req, file, cb) {
        // accept csv only
        var fileext = mime.getExtension(file.mimetype)
        if (fileext == 'csv' || fileext == 'xls' || fileext == 'xlsx') {
            cb(null, true);
		} else {
            req.fileValidationError = "Forbidden extension";
            return cb(null, false, req.fileValidationError);
		}
    };

    imageFilter (req, file, cb) {
        // accept image only
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    };

    noFilter (req, file, cb) {
        cb(null, true)
    }

    setupfolder(folder){
        this.storage = multer.diskStorage({
            destination: function (req, file, cb) {
              cb(null, 'public/uploads/'+folder+'/')
            },
            filename: function (req, file, cb) {
                let randomtext =  Date.now() +'_'+ Math.floor(100000 + Math.random() * 900000);
                cb(null, file.fieldname + '-' + randomtext + '.' + mime.getExtension(file.mimetype));
            }
        }); 
    }


    multerSingleUpload (fieldname){
        if(fieldname == 'ig_lotdoc' || fieldname == 'ph_upload' ){
            this.setupfolder('product_csv')
            this.filter = this.csvFilter;
        }
        else if(fieldname == 'csvs'){
            this.setupfolder('temp')
            this.filter = this.csvFilter;
        }
        let upload = multer({storage: this.storage , fileFilter: this.filter, errorHandling: 'manual'});
        return upload.single(fieldname)
    }

    multerMultipleUpload (fieldname, total){
        if(fieldname == 'ig_lotupload' || fieldname == 'ph_upload'){
            this.setupfolder('product')
            this.filter = this.imageFilter;
        }
        let upload = multer({storage: this.storage , fileFilter: this.filter});
        return upload.array(fieldname, total)
    }

}

module.exports = multerModule

