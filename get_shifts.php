<?php
	$callback = $_REQUEST['callback'];
	header('Content-type: application/json; charset=utf-8');
	
	include 'dal.php';
	
	$dal = new DAL();
		
	echo $callback . '(' . $dal->getShifts() . ')';

?>
