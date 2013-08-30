<?php
	if(array_key_exists('callback',$_REQUEST) || array_key_exists('userId',$_REQUEST)){
		$callback = $_REQUEST['callback'];
		$userId = $_REQUEST['userId'];
	}
	else
		die('Missing parameters');
		
	include 'dal.php';

	header('Content-type: application/x-javascript; charset=utf-8');
	
	$dal = new DAL();
	$result = $dal->getUserRoles($userId);
	
	echo sprintf("%s(%s)", $callback, json_encode($result));
?>
