<?php

$callback = $_REQUEST["callback"];
$model = $_REQUEST["models"];

if(!isset($callback) || !isset($model)){
	die('Missing parameters');
}

$data = json_decode($model, TRUE);

include 'dal.php';

$dal = new DAL();
$dal->updateUsers($data);

echo sprintf('%s(%s)',$callback, $model);
?>
