<?php
//include settings
require_once('settings.php');
if (isset($_GET['itemID'])) {
	include_once 'itemView/itemView.php';
	getItemView($_GET['itemID']);
} else {
//setup page structure
?>
<html>
	<head>
		<link rel="stylesheet" href="styles/blankStyle.css" type="text/css"/>
		<link rel="stylesheet" href="styles/mainStyles.css" type="text/css"/>
		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
		<script src="functions.js"></script>
	</head>
	<body>
		<div id="content">
			<div id="header">
				
			</div>
			<div id="leftColumn">
				<?php
					//load input new item form and scripts
					require_once('addItemForm/addItemForm.php');
					
					//load input multiple blank codes form and scripts
					
					
					//load print codes form and scripts
				?>	
			</div>
			<div id="rightColumn">
				<?php
					//load item summary table
					require_once('displayItemsTable/displayItems.php')
				?>	
			</div>			
		</div>
	</body>
</html>

<?php 
}
?>