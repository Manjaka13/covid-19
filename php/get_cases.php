<?php
	$result="{}";
	$country="";

	if(isset($_POST["country"]))
		$country=strtolower(htmlspecialchars($_POST["country"]));
	else if(isset($_GET["country"]))
		$country=strtolower(htmlspecialchars($_GET["country"]));

	if(strlen($country)>0)
		$result=file_get_contents("https://disease.sh/v3/covid-19/countries/".$country);
	echo($result);
?>