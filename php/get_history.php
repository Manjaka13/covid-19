<?php
	$history="{}";
	$country="";

	//Get arg
	if(isset($_POST["country"]))
		$country=strtolower(htmlspecialchars($_POST["country"]));
	else if(isset($_GET["country"]))
		$country=strtolower(htmlspecialchars($_GET["country"]));

	//Returns month in short text
	function get_month($month) {
		$short_months=array("", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
		if($month>=1 && $month<=12)
			return $short_months[$month];
		return "";
	}

	//Calculate the average data
	function average($value, $nb) {
		return round($value/$nb, 2);
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
			"cases" => array(),
			"recovered" => array(),
			"deaths" => array()
		);
		$months=array();

		for($i=0, $index=0; $i<$n_cases; $i++, $nb++) {
			$current_month=(int)($date[$i][0].$date[$i][1]);
			if(isset($months[$index]) && $months[$index]!=$current_month) {
				$history["cases"][$index]=average($history["cases"][$index], $nb);
				$history["recovered"][$index]=average($history["recovered"][$index], $nb);
				$history["deaths"][$index]=average($history["deaths"][$index], $nb);
				$nb=0;
				$index++;
			}
			if(!isset($months[$index])) {
				$months[$index]=$current_month;
				$history["months"][$index]=get_month($current_month);
				$history["cases"][$index]=0;
				$history["recovered"][$index]=0;
				$history["deaths"][$index]=0;
			}
			$history["cases"][$index]+=$cases[$date[$i]];
			$history["recovered"][$index]+=$recovered[$date[$i]];
			$history["deaths"][$index]+=$deaths[$date[$i]];
		}
		if($nb>0) {
			$history["cases"][$index]=average($history["cases"][$index], $nb);
			$history["recovered"][$index]=average($history["recovered"][$index], $nb);
			$history["deaths"][$index]=average($history["deaths"][$index], $nb);
		}
		return json_encode($history);
	}

	//Request and format result
	if(strlen($country)>0) {
		ob_start();
		$data=file_get_contents("https://disease.sh/v3/covid-19/historical/".$country."?lastdays=90");
		ob_clean();
		if($data!=false)
			$history=format_data($data);
	}
	echo($history);
?>