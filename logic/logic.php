<?php
class BL{
	function create_shifts(){
		$date =time () ; 

	 //This puts the day, month, and year in seperate variables 

	 $day = date('d', $date) ; 

	 $month = date('m', $date) ; 

	 $year = date('Y', $date) ;



	 //Here we generate the first day of the month 

	 $first_day = mktime(0,0,0,$month, 1, $year) ; 

	echo $year;

	 //This gets us the month name 

	 $title = date('F', $first_day) ; 
	}
}
	$bl = new BL();
	$bl->create_shifts();
?>
