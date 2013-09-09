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

		function logon($username, $password){
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
			$row = mysqli_fetch_array($result);
			
			if($count == 1){
				session_start();
				$_SESSION["username"] = $username;
				$_SESSION["role"] = $row['role'];
				if($_SESSION["role"] == 'user')
					$target = 'user/index.php';
				else if($_SESSION["role"] == 'admin')
					$target = 'index.php';
				else
					$target = '';
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
		
		function forgot_password($email){
			
		}
	}
	$action = $_GET["q"];
	
		
	$login = new Login();
	
	
	//$login->register("reut@gmail.com","123456","user");
	
	if($action == 'login')
		$login->logon($_POST['username'],$_POST['password']);
	else if($action == 'logout'){
		$login->logout('login/login.php');
	}
	else if($action == 'register'){
		$login->register($_POST['email'], $_POST['password'], $_POST['role']);
	}
	
?>



