<?php

class DAL{

	

	function getUsers(){
		include 'conn.php';

		$result = mysqli_query($con,"SELECT * FROM Users");

		$items = array();
		while($row = mysqli_fetch_object($result))
		{
  			array_push($items, $row);
		}
		return json_encode($items);
	}


	function updateUsers($data){
		include 'conn.php';

		for($i=0;$i<count($data);$i++){
			$arr = $data[$i];	
			$userId = $arr["idUsers"];
			$values = sprintf("email='%s',firstname='%s',lastname='%s',phone='%s'", $arr['email'], $arr['firstname'], $arr['lastname'], $arr['phone']);
	
			if($i < (count($data)-1)){
				$values = $values . ", ";
			}

			$query = sprintf("UPDATE `Users` SET %s WHERE idUsers='%s'",$values,$userId);
			if(!mysqli_query($con,$query)){
				printf("dal.updateUser: Error msg: %s\n", $con->error);
			}
		}
		
	}

	function createUsers($data){
		include 'conn.php';
		
		$result = array();

		for($i=0;$i<count($data);$i++){
			$arr = $data[$i];
			$values = sprintf("('%s','%s','%s','%s')", $arr['email'], $arr['firstname'], $arr['lastname'], $arr['phone']);
			$query = sprintf('INSERT INTO Users (email, firstname, lastname, phone) VALUES %s', $values);
			if(mysqli_query($con,$query)){			
				$arr["idUsers"] = $con->insert_id;	
				array_push($result, $arr);
			}
		}
		return json_encode($result);
	}

	function getShifts(){
		include 'conn.php';
		$rs = mysqli_query($con,"SELECT idShifts, DATE_FORMAT(start,'%m-%d-%Y') as start, DATE_FORMAT(end,'%m-%d-%Y') as end FROM Shifts");	
		$items = array();
		while($row = mysqli_fetch_object($rs)){
			array_push($items, $row);
		}
		return json_encode($items);
	}
	
	function updateShifts($data){
		include 'conn.php';
		for($i=0;$i<count($data);$i++){
			$arr = $data[$i];	
	
			$shiftId = $arr["idShifts"];
			$values = sprintf("start='%s',end='%s'", $arr['start'], $arr['end']);
	
			if($i < (count($data)-1)){
				$values = $values . ", ";
			}

			$query = sprintf("UPDATE `Shifts` SET %s WHERE idShifts='%s'",$values,$shiftId) ;

			if(!mysqli_query($con,$query)){
				printf("dal.updateUser: Error msg: %s\n", $con->error);
			}

		}		
	}

	function createShifts($data){
		include 'conn.php';
		$result = array();
		for($i=0;$i<count($data);$i++){
			$arr = $data[$i];	
			$query = sprintf("INSERT INTO Shifts (start,end) VALUES ('%s','%s')",$arr['start'], $arr['end']);
			if(mysqli_query($con,$query)){
				$arr['idShifts'] = $con->insert_id;
				array_push($result, $arr);
			}
		}
		return $result;
	}
	
	function getShiftParts($shiftId){
		include 'conn.php';

		$query = sprintf("SELECT idShifts ,  CONCAT(firstname , ' ' , lastname) as name , type as role, idUsers
						  FROM shiftPart, users, roles
						  WHERE idShifts='%s' AND userEmail =  users.email AND roles.idRoles = shiftPart.idRoles", $shiftId);

		$result = mysqli_query($con,$query);
		if(!$result){
			printf("dal.updateUser: Error msg: %s\n", $con->error);
		}
		$items = array();
		while($row = mysqli_fetch_object($result))
		{
	  		array_push($items, $row);
		}
		return $items;
	}
	
	function getRoles($userEmail){
		include 'conn.php';
		
		$query = "SELECT  idRoles as RoleID, type as RoleName 
				  FROM Roles";
		if(isset($userEmail))
			$query = sprintf("SELECT Roles.idRoles as RoleID, Roles.type as RoleName
							  FROM Roles, Users_has_Roles 
							  WHERE Users_email = '%s' AND Roles_idRoles = Roles.idRoles", $userEmail);
		
		$result = mysqli_query($con,$query);
		$items = array();
		while($row = mysqli_fetch_object($result))
		{
	  		array_push($items, $row);
		}
		return $items;
	}
	
	function getUsersNames(){
		include 'conn.php';
		
		$query = "SELECT email as idUsers , CONCAT(firstname , ' ' , lastname) as name 
				  FROM `Users`";
				  
		$result = mysqli_query($con,$query);
		$items = array();
		while($row = mysqli_fetch_object($result))
		{
	  		array_push($items, $row);
		}
		return $items;
	}
	
	function createShiftPart($data){
		include 'conn.php';
		
		$result = array();

		$arr = $data[0];
		$values = sprintf("('%s','%s','%s')", $arr['idUsers'], $arr['idShifts'], $arr['idRoles']);
		$query = sprintf('INSERT INTO ShiftPart (userEmail, idRoles, idShift) 
						  VALUES %s', $values);
		if(mysqli_query($con,$query)){			
			$arr["shiftPartId"] = $con->insert_id;	
			array_push($result, $arr);
		}
		
		return json_encode($result);
	}
}
?>
