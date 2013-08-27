<?php
	if(array_key_exists('callback',$_REQUEST))
		$callback = $_REQUEST['callback'];
	else
		$callback = "*no callback*";
	include 'dal.php';

	header('Content-type: application/x-javascript; charset=utf-8');
	$dal = new DAL();
	$result = $dal->getUsers();
	echo $callback . '(' . $result  . ')';
?>
