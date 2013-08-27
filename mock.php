<?php
	$callback = $_REQUEST['callback'];
	if(!$callback){
		$callback = 'j';
	}
	$items = array();
	for ($i=1; $i<=100; $i++){
			$row = array("email"=>"noam" . $i . "@gmail.com", "firstname"=>"noam", "lastname"=>"tzumie", "phone"=>"05222222");		
			array_push($items, $row);
	}
	echo $callback . '(' . json_encode($items) . ')';
?>
