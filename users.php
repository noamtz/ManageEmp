<?php
include 'conn.php';
$con=mysqli_connect("localhost","noamtz","Noam23tz","noamtz");
// Check connection
if (mysqli_connect_errno())
{
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

$result = mysqli_query($con,"SELECT * FROM Users");

$items = array();
while($row = mysqli_fetch_object($result))
{
  array_push($items, $row);
}
echo json_encode($items);
mysqli_close($con);

?>
