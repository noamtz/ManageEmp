<?php
	$callback = $_REQUEST['callback'];
	header('Content-type: application/json; charset=utf-8');
	
	include 'dal.php';
	
	$dal = new DAL();
	$shifts = $dal->getShifts();
	echo sprintf('%s(%s)',$callback,json_encode($shifts));

?>
