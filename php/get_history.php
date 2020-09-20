<?php
	$history="{}";
	$country="";

	//Get arg
	if(isset($_POST["country"]))
		$country=strtolower(htmlspecialchars($_POST["country"]));
	else if(isset($_GET["country"]))
		$country=strtolower(htmlspecialchars($_GET["country"]));

	//Returns month in short text
	function get_label($month, $year) {
		$short_months=array("", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
		if($month>=1 && $month<=12)
			return $short_months[$month]." 20".((int)$year);
		return "";
	}

	//Split data into 4 arrays (months, cases, recovered and deaths)
	function format_data($data) {
		$timeline=json_decode($data)->timeline;
		$cases=(array)$timeline->cases;
		$recovered=(array)$timeline->recovered;
		$deaths=(array)$timeline->deaths;
		$date=array_keys($cases);
		$n_cases=count($cases);
		$nb=0;		
		$history=array(
			"months" => array(),
			"cases" => array($cases[$date[0]]),
			"recovered" => array($recovered[$date[0]]),
			"deaths" => array($deaths[$date[0]])
		);
		for($i=0, $index=0; $i<$n_cases; $i++) {
			$current_month=(int)($date[$i][0].$date[$i][1]);
			if(!isset($last_month) || $current_month!=$last_month) {
				$last_month=$current_month;
				$history["months"][$index]=get_label($current_month, $date[$i][strlen($date[$i])-2].$date[$i][strlen($date[$i])-1]);
				if(!isset($last_cases)) {
					$last_cases=0;
					$last_recovered=0;
					$last_deaths=0;
				}
				else {
					$history["cases"][$index-1]=$cases[$date[$i-1]]-$last_cases;
					$history["recovered"][$index-1]=$recovered[$date[$i-1]]-$last_recovered;
					$history["deaths"][$index-1]=$deaths[$date[$i-1]]-$last_deaths;
					$last_cases=$cases[$date[$i-1]];
					$last_recovered=$recovered[$date[$i-1]];
					$last_deaths=$deaths[$date[$i-1]];
				}
				$index++;
			}
		}
		$history["cases"][$index-1]=$cases[$date[$i-1]]-$last_cases;
		$history["recovered"][$index-1]=$recovered[$date[$i-1]]-$last_recovered;
		$history["deaths"][$index-1]=$deaths[$date[$i-1]]-$last_deaths;
		return json_encode($history);
	}

	//Request and format result
	if(strlen($country)>0) {
		ob_start();
		$data=file_get_contents("https://disease.sh/v3/covid-19/historical/".$country."?lastdays=all");
		ob_clean();
		if($data!=false)
			$history=format_data($data);
	}
	echo($history);
?>