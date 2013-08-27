<?php

$callback = $_REQUEST["callback"];
$model = $_REQUEST["models"];

if(!isset($callback) || !isset($model)){
	die('Missing parameters');
}

$data = json_decode($model, TRUE);

include 'dal.php';

$dal = new DAL();
$result = $dal->createShifts($data);

if(count($result) > 0 )
	echo $callback . "(" . json_encode($result) . ")";
else
	echo "Error";

?>

