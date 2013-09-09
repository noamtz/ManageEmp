<?php
	header('Content-type: application/json; charset=utf-8');
	
	$callback = $_REQUEST['callback'];
	$model = $_REQUEST["models"];
	
	if(!isset($callback) || !isset($model)){
		die('Missing callback or model');
	} 

	$data = json_decode($model, TRUE);
	
	
	include 'dal.php';
	
	$dal = new DAL();
	
	$dal->deleteShiftPatrs($data[0]["shiftPartId"]);
	
	echo sprintf("%s(%s)",$callback ,$model);
?>
