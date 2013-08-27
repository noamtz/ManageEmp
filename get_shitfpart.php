<?php
	$shiftid = $_REQUEST['shiftId'];
	$callback = $_REQUEST['callback'];
	header('Content-type: application/json; charset=utf-8');
	
	include 'dal.php';
	
	$dal = new DAL();
	$participents = json_encode($dal->getShiftParts($shiftid));
	
	echo sprintf("%s(%s)",$callback ,$participents);
?>
