<?php
	class Login{
		function encrypt($password){
			return sha1($password);
		}

		function register($username, $password, $role){
			$encPass = $this->encrypt($password);
			
			include 'conn.php';
	
			$query = sprintf("INSERT INTO Application(password, role, Users_email, passwordSalt) 
							  VALUES('%s','%s','%s','pslt')", $encPass, $role, $username);

			if(!mysqli_query($con,$query)){
				die(  "Register: ". mysqli_error($con));
			}
		}

		function logon($username, $password, $target){
			include 'conn.php';
			
			$username = stripslashes($username);
			$password = stripslashes($password);
			$username = mysql_real_escape_string($username);
			$password = mysql_real_escape_string($password);
			
			$query = sprintf("SELECT * 
					  		  FROM Application
					  		  WHERE Users_email = '%s' AND password = '%s'",$username , $this->encrypt($password));			

			$result = mysqli_query($con,$query);
			//DEBUG
			if(!$result){
				die( "Logon: " . mysqli_error($con));
			}
			$count=mysqli_num_rows($result);
			
			if($count == 1){
				$_SESSION["username"] = $username;
				//$_SESSION["password"] = $this->encrypt($password);
				header(sprintf("location:%s", $target));
			}
			else
				echo "Invalid password " . $password;
		}
	}
	print_r(_session);
	$login = new Login();
	//$login->register("noa@fds.sdf","123456","user");
	
	//$login->logon($_POST['username'],$_POST['password'],"index.php");
	$login->logon('noa@fds.sdf','123456',"index.php");
?>



