<?php
if ($_POST['submit'] == "edit") {
	$newText = $_POST['newText'];
	$item_id = $_POST['item_id'];
	$position = $_POST['position'];
	
	//the document is created blank and all the settings set BEFORE the content is loaded
	//keeps from losing the format
	$stockListXML = new DOMDocument();
	$stockListXML->preserveWhiteSpace  = false;
	$stockListXML->formatOutput = true;
	$stockListXML->load("../stockList.xml");
	$stockListXPath = new DOMXPath($stockListXML);
	
	$itemToEdit = $stockListXPath->evaluate("//*[item_id =" . $item_id . "]");
	
	$itemToEdit->item(0)->childNodes->item($position)->nodeValue = $newText;
	
	$stockListXML->save('../stockList.xml');
}

if ($_POST['submit'] == 'delete') {
	$item_id = $_POST['itemID'];
	
	$stockListXML = new DOMDocument();
	$stockListXML->preserveWhiteSpace  = false;
	$stockListXML->formatOutput = true;
	$stockListXML->load("../stockList.xml");
	$stockListXPath = new DOMXPath($stockListXML);
	
	$itemToEdit = $stockListXPath->evaluate("//*[item_id =" . $item_id . "]")->item(0);
	
	var_dump($itemToEdit->parentNode->removeChild($itemToEdit));
	
	$stockListXML->save('../stockList.xml');
	
}