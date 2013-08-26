<?php

class DAL{

	

	function getUsers(){
		include 'conn.php';

		$result = mysqli_query($con,"SELECT *
									 FROM users");

		$items = array();
		while($row = mysqli_fetch_object($result))
		{
  			array_push($items, $row);
		}
		return json_encode($items);
	}
	
	function getUserRoles($userId){
		include 'conn.php';
		
		$query = sprintf("SELECT idRoles
						  FROM users_has_roles
						  WHERE userEmail='%s'",$userId);
		$result = mysqli_query($con,$query);
		$items = array();
		while($row = mysqli_fetch_object($result))
		{
  			array_push($items, $row);
		}
		
		return $items;
	}

	function updateUsers($data){
		include 'conn.php';

		for($i=0;$i<count($data);$i++){
			$arr = $data[$i];	
			
			//Handle user's roles
			if(array_key_exists("RoleName",$arr)){
				$roles = $arr["RoleName"];
				if(count($roles) > 0 ){
					//Delete all users_has_roles of selected user
					$query_roles = sprintf("DELETE FROM users_has_roles
											WHERE userEmail='%s'",$arr['email']);
					if(!mysqli_query($con,$query_roles)){
						printf("dal.updateUser(delete roles): Error msg: %s\n", $con->error);
					}		
					$roles_values = "";
					//Insert new users roles
					for($i=0;$i<count($roles);$i++){
						$roles_arr = $roles[$i];
						$coma = "";
						if($i < (count($roles)-1))
							$coma = ", ";
						$roles_values = $roles_values . sprintf("('%s','%s')", $arr['email'], $roles_arr['RoleID']) . $coma ;

					}
				
					$query_roles = sprintf("INSERT INTO users_has_roles (userEmail, idRoles)
											VALUES %s",$roles_values);
					
					if(!mysqli_query($con,$query_roles)){
						printf("dal.updateUser(insert roles): Error msg: %s\n", $con->error);
					}	
				}
			}
			
			$userId = $arr["idUsers"];
			$values = sprintf("email='%s',firstname='%s',lastname='%s',phone='%s'", $arr['email'], $arr['firstname'], $arr['lastname'], $arr['phone']);
			
			if($i < (count($data)-1)){
				$values = $values . ", ";
			}

			$query = sprintf("UPDATE `users` 
							  SET %s 
							  WHERE idUsers='%s'",$values,$userId);
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
			$query = sprintf('INSERT INTO users (email, firstname, lastname, phone) 
							  VALUES %s', $values);
			if(mysqli_query($con,$query)){			
				$arr["idUsers"] = $con->insert_id;	
				array_push($result, $arr);
			}
		}
		return json_encode($result);
	}

	function getShifts(){
		include 'conn.php';
		$rs = mysqli_query($con,"SELECT *
								 FROM shifts");	
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

			$query = sprintf("UPDATE `shifts` 
							  SET %s 
							  WHERE idShifts='%s'",$values,$shiftId) ;

			if(!mysqli_query($con,$query)){
				printf("dal.updateShifts: Error msg: %s\n", $con->error);
			}

		}		
	}

	function createShifts($data){
		include 'conn.php';
		$result = array();
		for($i=0;$i<count($data);$i++){
			$arr = $data[$i];	
			$query = sprintf("INSERT INTO shifts (start,end) 
							  VALUES ('%s','%s')",$arr['start'], $arr['end']);
			if(mysqli_query($con,$query)){
				$arr['idShifts'] = $con->insert_id;
				array_push($result, $arr);
			}else{
				echo mysqli_error($con);
			}
		}
		return $result;
	}
	
	function getShiftParts($shiftId){
		include 'conn.php';

		$query = sprintf("SELECT idShifts ,  CONCAT(firstname , ' ' , lastname) as uname , type as urole, idUsers , shiftPartId
						  FROM shiftPart, users, roles
						  WHERE idShifts='%s' AND userEmail =  users.email AND roles.idRoles = shiftPart.idRoles", $shiftId);

		$result = mysqli_query($con,$query);
		if(!$result){
			printf("dal.getShiftParts: Error msg: %s\n", $con->error);
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
				  FROM roles";
		if(isset($userEmail))
			$query = sprintf("SELECT roles.idRoles as RoleID, Roles.type as RoleName
							  FROM roles, users_has_roles 
							  WHERE userEmail = '%s' AND users_has_roles.idRoles = roles.idRoles", $userEmail);
		
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
				  FROM `users`";
				  
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
		$values = sprintf("('%s','%s','%s',NULL)", $arr['idShifts'], $arr['idUsers'], $arr['idRoles']);
		$query = sprintf('INSERT INTO shiftPart (idShifts, userEmail, idRoles, shiftPartId) 
						  VALUES %s', $values);
		if(mysqli_query($con,$query)){			
			$arr["shiftPartId"] = $con->insert_id;	
			array_push($result, $arr);
		}else
			echo "Create shift part in db is failed " . mysqli_error($con) . "   ";
		
		return json_encode($result);
	}
	
	function updateShiftParts($data){
		include 'conn.php';
		$arr = $data[0];	
	
		$shiftId = $arr["idShifts"];
		$values = sprintf("userEmail='%s',idRoles='%s'", $arr['idUsers'], $arr['idRoles']);
	
		$query = sprintf("UPDATE `shiftpart` 
						  SET %s 
						  WHERE idShifts='%s'",$values,$shiftId) ;

		if(!mysqli_query($con,$query)){
			printf("dal.updateShiftParts: Error msg: %s\n", $con->error);
		}		
	}
}
?>
