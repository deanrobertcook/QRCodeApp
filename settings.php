<?php
//function for turning array items to human-friendlier words.
function tidyWord($word) {
	$word = str_replace('_', ' ', $word);
	$word = preg_replace("/\bpc\b/", 'PC', $word);
	$word = preg_replace("/\bid\b/", 'ID', $word);
	$word = preg_replace("/\bram\b/", 'RAM', $word);
	$word = preg_replace("/\bcpu\b/", 'CPU', $word);
	$word = preg_replace("/\bhdd\b/", 'HDD', $word);
	$word = preg_replace("/\bos\b/", 'OS', $word);
	$word = ucwords($word);
	return $word;
}
