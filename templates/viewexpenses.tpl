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
    <link rel="stylesheet" defer href=" https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.css">
    <script src="{$config[externalIMjs]}jquery-3.3.1.min.js"></script>
</head>
<div class="row">
    <div class="col-md-6">
        <canvas id="myChartCredits" width="400" height="400"></canvas>
    </div>

    <div class="col-md-6">
        <canvas id="myChartDebits" width="400" height="400"></canvas>
    </div>
</div>
<div class="col-lg-12">
<div class="panel panel-default">
<div class="panel-heading"><h3>Expenses Sheet</h3></div>
<div class="panel-body">
<table class="table table-condensed" style="border-collapse:collapse;">
    <thead>
        <tr><th>&nbsp;</th>
            <th>Date</th>
            <th>Transaction</th>
            <th>Num</th>
            <th>Name</th>
            <th>Total Credits</th>
            <th>Total Debits</th>
        </tr>
    </thead>
    <tbody>
        {foreach $completerecords as $key => $val}
        <tr data-toggle="collapse" data-target="#demo{$val.id}" class="accordion-toggle">
            <td><button class="btn btn-default btn-xs"><span class="glyphicon glyphicon-eye-open"></span></button></td>
            <td>{dateConverter($val.date)}</td>
            <td>{$val.transaction||''}</td>
            <td>{$val.num||''}</td>
            <td>{$val.name||''}</td>
            <td>$ {currencyConverter($val.total_credits)||''}</td>
            <td>$ {currencyConverter($val.total_debits)||''}</td>
        </tr>
        <tr>
            <td colspan="12" class="hiddenRow">
                <div class="accordian-body collapse" id="demo{$val.id}"> 
                <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>Memo/Description</th>
                                <th>Account</th>
                                <th>Amount</th>
                                <th>Type</th>
                            </tr>
                        </thead>
                    <tbody>
                        {foreach $val.internalexpenses as $key => $valin}
                            <tr>
                                <td>{$valin.description||''}</td>
                                <td>{$valin.account||''}</td>
                                <td>$ {currencyConverter($valin.amount)||''}</td>
                                <td>{$valin.type||''}</td>
                            </tr>
                        {/foreach}
                    </tbody>
                </table>
            </div> 
            </td>
        </tr>
        {/foreach}
    </tbody>
</table>
</div>
</div> 
</div>




      <script src="{$config[externalIMjs]}jqueryNotify.js"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.js"></script>
      
<script type="text/javascript">
   var cred = document.getElementById('myChartCredits').getContext('2d');
   var debts = document.getElementById('myChartDebits').getContext('2d');
   var creditlabels = '{$creditlabelschart}';
   var creditschart = '{$creditschart}';
    datacred = {
        datasets: [{
            data: creditschart.split(','),
            backgroundColor: [
						"red",
						"black",
						"purple",
						"yellow",
                        "green",
                        "blue",
                        "orange",
                        "gold",
                        "pink"
					],
					label: 'My dataset' // for legend
				
        }],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: creditlabels.split(',')
    };

    optionscred = {
				responsive: true,
				legend: {
					position: 'right',
				},
				title: {
					display: true,
					text: 'Credits Types'
				},
				scale: {
					ticks: {
						beginAtZero: true
					},
					reverse: false
				},
				animation: {
					animateRotate: false,
					animateScale: true
				}
			}

    var debitlabels = '{$debitlabelschart}';
   var debitchart = '{$debitschart}';
    datadebt = {
        datasets: [{
            data: debitchart.split(','),
            backgroundColor: [
						"red",
						"black",
						"purple",
						"yellow",
                        "green",
                        "blue",
                        "orange",
                        "gold",
                        "pink"
					],
					label: 'My dataset' // for legend
				
        }],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: debitlabels.split(',')
    };

    optionsdebt = {
				responsive: true,
				legend: {
					position: 'right',
				},
				title: {
					display: true,
					text: 'Debit Types'
				},
				scale: {
					ticks: {
						beginAtZero: true
					},
					reverse: false
				},
				animation: {
					animateRotate: false,
					animateScale: true
				}
			}




new Chart(cred, {
    data: datacred,
    type: 'polarArea',
    options: optionscred
});

new Chart(debts, {
    data: datadebt,
    type: 'polarArea',
    options: optionsdebt
});

</script>
</body>
</html>
