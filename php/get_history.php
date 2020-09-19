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
		$months=array();
		$months_text=array();
		$data_cases=array();
		$data_recovered=array();
		$data_deaths=array();

		for($i=0, $month_index=0; $i<$n_cases; $i++, $nb++) {
			$current_month=explode("/", $date[$i])[0];
			if(isset($months[$month_index]) && $months[$month_index]!=(int)$current_month) {
				$data_cases[$month_index]=average($data_cases[$month_index], $nb);
				$data_recovered[$month_index]=average($data_recovered[$month_index], $nb);
				$data_deaths[$month_index]=average($data_deaths[$month_index], $nb);
				$nb=0;
				$month_index++;
			}
			if(!isset($months[$month_index])) {
				$months[$month_index]=(int)$current_month;
				$months_text[$month_index]=get_month((int)$current_month);
				$data_cases[$month_index]=0;
				$data_recovered[$month_index]=0;
				$data_deaths[$month_index]=0;
			}
			$data_cases[$month_index]+=$cases[$date[$i]];
			$data_recovered[$month_index]+=$recovered[$date[$i]];
			$data_deaths[$month_index]+=$deaths[$date[$i]];
		}
		if($nb>0) {
			$data_cases[$month_index]=average($data_cases[$month_index], $nb);
			$data_recovered[$month_index]=average($data_recovered[$month_index], $nb);
			$data_deaths[$month_index]=average($data_deaths[$month_index], $nb);
		}
		return json_encode(array(
			"months" => $months_text,
			"cases" => $data_cases,
			"recovered" => $data_recovered,
			"deaths" => $data_deaths
		));
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