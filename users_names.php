<?php
	$callback = $_REQUEST['callback'];
	include 'dal.php';

	header('Content-type: application/x-javascript; charset=utf-8');
	$dal = new DAL();
	$names = json_encode($dal->getUsersNames());
	echo sprintf("%s(%s)",$callback ,$names);
?>