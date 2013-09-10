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
	
	$dal->deleteUser($data[0]["email"]);
	
	echo sprintf("%s(%s)",$callback ,$model);
?>
