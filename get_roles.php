<?php
	$callback = $_REQUEST['callback'];
	
	if(!empty($_REQUEST['userEmail']))
		$userEmail = $_REQUEST['userEmail'];
	header('Content-type: application/json; charset=utf-8');
	
	include 'dal.php';
	
	$dal = new DAL();
	if(!isset($userEmail))
		$userEmail = null;
	$roles = json_encode($dal->getRoles($userEmail));
	
	echo sprintf("%s(%s)",$callback ,$roles);
?>