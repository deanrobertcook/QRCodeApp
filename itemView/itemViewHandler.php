<?php
if ($_POST['submit'] == "true") {
	$newText = $_POST['newText'];
	$item_id = $_POST['item_id'];
	$field = $_POST['field'];

	//the document is created blank and all the settings set BEFORE the content is loaded
	//keeps from losing the format
	$stockListXML = new DOMDocument();
	$stockListXML->preserveWhiteSpace  = false;
	$stockListXML->formatOutput = true;
	$stockListXML->load("../stockList.xml");
	$stockListXPath = new DOMXPath($stockListXML);

	$itemToEdit = $stockListXPath->evaluate("//*[item_id =" . $item_id . "]");

	//$itemToEdit->item(0)->getIte->nodeValue = $newText;

	$itemToEdit->item(0)->getElementsByTagName($field)->item(0)->nodeValue = $newText;
	$stockListXML->save('../stockList.xml');
}