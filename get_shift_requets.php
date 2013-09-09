<?php
	$callback = $_REQUEST['callback'];
	
	$from = NULL;
	$to = NULL;
	
	if(array_key_exists("from",$_REQUEST) && array_key_exists("to",$_REQUEST)){
		$from = $_REQUEST['from'];
		$to = $_REQUEST['to'];
	}
	
	if(array_key_exists("userId",$_REQUEST))
		$email = $_REQUEST["userId"];
	else
		die('Insert user id');
	
	header('Content-type: application/json; charset=utf-8');
	
	include 'dal.php';
	
	$dal = new DAL();
	$shifts = $dal->getUserRequest($email, $from, $to);

	echo sprintf('%s(%s)',$callback,json_encode($shifts));
?>
