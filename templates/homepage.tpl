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
   <meta property="og:image" content="{$config['url']}/im/images/ingram-logo.png" />
   <meta property="og:title" content="{$config.title} | {$seoIM}" />
   <meta Property="og:url" Content="{$config['url']}" />
   <meta Property="og:site_name" Content="GM" />
   <meta http-equiv="Cache-control" content="public, max-age=86400, must-revalidate" />
   <link rel="shortcut icon" href="{$config.url}/im/images/favicon.ico">
   <title>{$config.title} | {$seoIM}</title>
    <link rel="stylesheet" defer href="{$config[externalIMcss]}bootstrap.css">
		<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" crossorigin="anonymous">
    <link rel="stylesheet" href="{$config[externalIMcss]}selectric.css">
    <link rel="stylesheet" defer href="{$config[externalIMcss]}ig-parsley.css">
    <link rel="stylesheet" defer href="{$config[externalIMcss]}style.css">
    <script src="{$config[externalIMjs]}jquery-3.3.1.min.js"></script>
</head>


	<button class="btn btn-primary" onclick="comingsoonregister()">
		SignIn
	</button>


	<!-- <div id="docusign_modal" data-backdrop="static" data-keyboard="false" class="modal fade" role="dialog">
		<div class="modal-dialog" style="width: 1000px;">
		  <div class="modal-content">
			<div class="modal-header" style="padding: 0px ! important">
			  <button type="button" class="close modal_close" onclick="reloadPage()">&times;</button>
			</div>
			<div class="modal-body" style="height: 575px;">
			   <div><iframe class="docusign" src="" id="if_docusign" name="if_docusign"></iframe></div>
			</div>
		  </div>
		</div>
	  </div> -->
		<script src="{$config[externalIMjs]}ig-bootstrap-min.js"></script>
		<script src="{$config[externalIMjs]}jquery.selectric-min.js"></script>
		<script defer src="{$config[externalIMjs]}ig-parsley-min.js"></script>
		<script src="{$config[externalIMjs]}ig-jqueryNotify.js"></script>
<script type="text/javascript">
	function comingsoonregister(){
        // $("#if_docusign").attr("src",'https://auctionsoftwareoktasignin.okta.com/app/auctionsoftwareorg160508_auctionsoftware_1/exka2qnmhmbDRz1ik356/sso/saml');
				// $("#docusign_modal").modal("show");
		// test site okta signin url
		//window.location.href='https://auctionsoftwareoktasignin.okta.com/home/auctionsoftwareorg160508_auctionsoftware_1/0oaa2qnmigyvwVbyR356/alna34akr6tx8R9P3356';
		// local site okta signin url
		window.location.href='https://auctionsoftwareoktasignin.okta.com/home/auctionsoftwareorg160508_auctionsoftwarelocal_1/0oabunmy7h9EM8uDE356/alnbuonactDRXsKp2356';
	}
</script>
</body>
</html>
