<?php

$con=mysqli_connect("ip","username","password","dbname");

// Check connection
if (mysqli_connect_errno())
{
  die ("Failed to connect to MySQL: " . mysqli_connect_error());
}
?>
