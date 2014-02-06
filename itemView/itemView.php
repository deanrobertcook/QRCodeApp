<?php
function getItemView($itemID) {
	?>	
	<link rel="stylesheet" href="itemView/itemView.css" type="text/css" charset="utf-8"/>
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
	<script src="itemView/itemView_functions.js"></script> 
	
	<?php
	$absFilePath = 'C:/wamp/www/stockList/QRCodes/code'.$itemID.'.png'; 
	if (!file_exists($absFilePath)) {
		require_once 'phpqrcode/qrlib.php';
		QRcode::png("http://192.168.0.5/stockList/index.php?itemID=".$itemID, $absFilePath);
	}
	?>
	<div id="itemCard">
		<button id="backLink"><a href="index.php">To Item List</a></button>
		<form id="editItemForm" action="addItemHandler.php" method="post"></form>
		<div class="leftColumn">
			<img src="<?php echo 'QRCodes/code'.$itemID.'.png' ?>" />
			<div id="itemInfoLeft"></div>
		</div>
		<div class="rightColumn">
			<table id="itemInfoTable"></table>
			<div id="editButtons"></div>
		</div>
	</div>
	
<?php }

?>
