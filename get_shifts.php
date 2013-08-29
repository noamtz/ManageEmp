<?php
	$callback = $_REQUEST['callback'];
	
	$from = NULL;
	$to = NULL;
	
	if(array_key_exists("from",$_REQUEST) && array_key_exists("to",$_REQUEST)){
		$from = $_REQUEST['from'];
		$to = $_REQUEST['to'];
	}
	
	header('Content-type: application/json; charset=utf-8');
	
	include 'dal.php';
	
	$dal = new DAL();
	$shifts = $dal->getShifts($from, $to);
	$shifts[0]->part = true;
	$shifts[2]->part = true;
	echo sprintf('%s(%s)',$callback,json_encode($shifts));

?>
