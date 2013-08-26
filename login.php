<?php
	class Login{
		function encrypt($password){
			return sha1($password);
		}

		function register($username, $password, $role){
			$encPass = $this->encrypt($password);
			
			include 'conn.php';
	
			$query = sprintf("INSERT INTO application(password, role, userEmail, passwordSalt) 
							  VALUES('%s','%s','%s','pslt')", $encPass, $role, $username);

			if(!mysqli_query($con,$query)){
				die(  "Register: ". mysqli_error($con));
			}
		}

		function logon($username, $password, $target){
			include 'conn.php';
			$username = stripslashes($username);
			$password = stripslashes($password);
			$username = mysqli_real_escape_string($con,$username);
			$password = mysqli_real_escape_string($con,$password);
			
			$query = sprintf("SELECT * 
					  		  FROM application
					  		  WHERE userEmail = '%s' AND password = '%s'",$username , $this->encrypt($password));			

			$result = mysqli_query($con,$query);
			//DEBUG
			if(!$result){
				die( "Logon: " . mysqli_error($con));
			}
			$count=mysqli_num_rows($result);
			
			if($count == 1){
				session_start();
				$_SESSION["username"] = $username;
				//$_SESSION["password"] = $this->encrypt($password);
				header(sprintf("location:%s", $target));
			}
			else
				echo "Invalid password " . $password;
		}
		
		function logout($target){
			session_start();
			session_destroy();
			header(sprintf("location:%s", $target));
		}
	}
	$action = $_GET["q"];
	
	$login = new Login();
	$login->register("noam@gmail.com","123456","user");
	
	if($action == 'login')
		$login->logon($_POST['username'],$_POST['password'],"index.php");
	else if($action == 'logout')
		$login->logout("login.html");
?>



