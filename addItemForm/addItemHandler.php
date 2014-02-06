<?php
if (isset($_POST["addItemSubmit"])) {
	$settingsXML = new DOMDocument();
	$settingsXML->preserveWhiteSpace  = false;
	$settingsXML->formatOutput = true;
	$settingsXML->load("../settings.xml");
	print_r($settingsXML);
	$settingsXPath = new DOMXPath($settingsXML);
	
	//the document is created blank and all the settings set BEFORE the content is loaded
	$stockListXML = new DOMDocument();
	$stockListXML->preserveWhiteSpace  = false;
	$stockListXML->formatOutput = true;
	$stockListXML->load("../stockList.xml");
	$stockList = $stockListXML->firstChild;

	
	$itemType = $_POST['item_type'];
	
	$itemMetaInfo = $settingsXPath->evaluate("//itemType[@name='". $itemType ."']");
	
	$numOfFields = $itemMetaInfo->item(0)->getElementsByTagName('field')->length;
	$fields = array();
	
	$newItem = $stockListXML->createElement($itemType);
	for ($i=0; $i < $numOfFields; $i++) { 
		//following piece of code determines if a QRCode exists, and if not, makes one
		if ($_POST[$fields[$i]] == "item_id") {
			$absFilePath = 'C:/wamp/www/stockList/QRCodes/code'.$_POST[$fields[$i]].'.png'; 
			echo $absFilePath;
			if (!file_exists($absFilePath)) {
				require_once '../phpqrcode/qrlib.php';
				QRcode::png("http://192.168.0.5/stockList/index.php?itemID=".$_POST[$fields[$i]], $absFilePath);
			}
		}
		array_push($fields, $itemMetaInfo->item(0)->getElementsByTagName('field')->item($i)->getAttribute('name'));
		//echo $fields[$i] . ": ". $_POST[$fields[$i]] . '<br>';
		$element = $stockListXML->createElement($fields[$i], $_POST[$fields[$i]]);
		$newItem->appendChild($element);
		var_dump($element->nodeName . ", " . $element->nodeValue);
	}
	$stockList->appendChild($newItem);
	var_dump($stockListXML->nodeName . ", " . $stockListXML->nodeValue);
	
	
	$stockListXML->save('../stockList.xml');
	
}

$loc = "http://" . $_SERVER['HTTP_HOST'] . "/stockList/index.php";
echo $loc;
header("location: " . $loc );