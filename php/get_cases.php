<?php
	$result="{}";
	$country="";

	//Get arg
	if(isset($_POST["country"]))
		$country=strtolower(htmlspecialchars($_POST["country"]));
	else if(isset($_GET["country"]))
		$country=strtolower(htmlspecialchars($_GET["country"]));

	//Request
	if(strlen($country)>0) {
		ob_start();
		$result=file_get_contents("https://disease.sh/v3/covid-19/countries/".$country);
		ob_clean();
		if($result==false)
			$result="{}";
	}
	echo($result);
?>