<?php

$callback = $_REQUEST["callback"];
$model = $_REQUEST["models"];

if(!isset($callback) || !isset($model)){
	die('Missing callback or model');
} 

$data = json_decode($model, TRUE);

$deleteReq = array();
$createReq = array();

for($i=0; $i<count($data); $i++){
	$req = $data[$i];
	$is_part = $req['part'];
	unset($req['part']);
	
	if($is_part == true)
		array_push($createReq, $req);
	else{
		$tmp = $req;
		unset($tmp['request_time']);
		array_push($deleteReq, $tmp);
	}
}

if(count($deleteReq) == 0)
	$deleteReq = null;
	
if(count($createReq) == 0)
	$createReq = null;

	
include('dal.php');

$dal = new DAL();
$result = $dal->handleUserRequests($createReq, $deleteReq);

echo sprintf('%s(%s)',$callback,$model);

/*
include('dal.php');

$dal = new DAL();
$cols = array("id","name","phone");

$noam = array("1","noam","2134");
$reut = array("2","reut","2134");

$vals = array($noam, $reut);
$dal->delete_statement('users', array('id','shift'), array(array('id1','s1'),array('d2','s2')),null);
*/
?>
