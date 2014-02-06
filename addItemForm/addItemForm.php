<?php
?>
<div id="addItemFormDiv">
	<h3 id="addItemFormTitle">Add New Item</h3>
	<form action="addItemForm/addItemHandler.php" method="post" id="addItemForm"></form>
	
	<span>
		<label for="item_type">Item Type:</label>
		<select form="addItemForm" id="item_type" name="item_type">
			<option value="">--Select Item Type--</option>
		</select>
	</span>
	<div class="addItemFormChangeable"></div>
	<script src="addItemForm/addItemFormFunctions.js"></script>
</div>