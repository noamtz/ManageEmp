<?php

$callback = $_REQUEST["callback"];
$model = $_REQUEST["models"];

if(!isset($callback) || !isset($model)){
	die('Missing callback or model');
} 

$data = json_decode($model, TRUE);

include('dal.php');

$dal = new DAL();
$dal->updateShift($data);

echo sprintf('%s(%s)',$callback,$model);
?>
