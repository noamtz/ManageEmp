<?php
	if(array_key_exists('callback',$_REQUEST))
		$callback = $_REQUEST['callback'];
	else
		die('Missing parameters');
	include 'dal.php';

	if(array_key_exists('userId',$_REQUEST))
		$userId = $_REQUEST['userId'];
	
	header('Content-type: application/x-javascript; charset=utf-8');
	$dal = new DAL();
	if(isset($userId))
		$result = $dal->getUser($userId);
	else
		$result = $dal->getUsers();
	echo sprintf("%s(%s)", $callback, json_encode($result));
?>
