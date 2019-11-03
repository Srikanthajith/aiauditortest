<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="utf-8">
   <meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE" />
   <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
   <meta name="format-detection" content="telephone=no">
   <meta name="description" content="">
   <meta name="keywords" content="" />
   <meta name="author" content="">
   <meta property="og:description" content="" />
   <meta property="og:title" content="{$config.title} | {$seoIM}" />
   <meta Property="og:url" Content="{$config['url']}" />
   <meta Property="og:site_name" Content="SRITEST" />
   <meta http-equiv="Cache-control" content="public, max-age=86400, must-revalidate" />
   <title>{$config.title} | {$seoIM}</title>
    <link rel="stylesheet" defer href="{$config[externalIMcss]}bootstrap.css">
    <script src="{$config[externalIMjs]}jquery-3.3.1.min.js"></script>
</head>


<form enctype="multipart/form-data" method="post" id="pay_chk" >
	<div class="row">
		<div class="col-sm-12 form-group">
			<label class="site-label">Upload the Excel File </label>
			<div class="sitebtn-sec-big btn-file">
				Choose File
				<input name="excel_file" data-parsley-group="block1" required id="csvs" accept=".xlsx, .xls" maxlength="99" type="file" class="form-control">
			</div>
		</div>
		<div class="col-md-12 text-left">
			<input type="submit" class="btn sitebtn-sec" value="Save" />
		</div>
	</div>
</form>





	  <script src="{$config[externalIMjs]}jqueryNotify.js"></script>
<script type="text/javascript">
    $('#pay_chk').on("submit",function(e){
        e.preventDefault();
        var form = $("#pay_chk")[0];
        var formData = new FormData(form);
        $.ajax({
            type: "POST",
            url: "/importXLSXfile",
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                $.notify({
                    message: 'File Successfully updated'
                },{
                    type: 'success',
                    placement: {
                        from: "top",
                        align: "right"
                    }
                });
                setInterval(function(){
                    $.notifyClose();
				},10000);
				window.location.reload(true);
                return false;
            },
            error: function(error){
                $.notify({
                    message: error.responseText
                },{
                    type: 'danger',
                    placement: {
                        from: "top",
                        align: "right"
                    }
                });
                setInterval(function(){
                    $.notifyClose();
				},10000);
				window.location.reload(true);
                return false;
            }
        });
    })
</script>
</body>
</html>
