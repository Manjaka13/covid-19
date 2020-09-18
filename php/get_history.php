<?php
	$history="{}";
	$country="";

	//Get passed parameters
	if(isset($_POST["country"]))
		$country=strtolower(htmlspecialchars($_POST["country"]));
	else if(isset($_GET["country"]))
		$country=strtolower(htmlspecialchars($_GET["country"]));

	
	function get_text_month($month) {
		switch($month) {
			case 1:
				return "Jan";
				break;
			case 2:
				return "Feb";
				break;
			case 3:
				return "Mar";
				break;
			case 4:
				return "Apr";
				break;
			case 5:
				return "May";
				break;
			case 6:
				return "Jun";
				break;
			case 7:
				return "Jul";
				break;
			case 8:
				return "Aug";
				break;
			case 9:
				return "Sep";
				break;
			case 10:
				return "Oct";
				break;
			case 11:
				return "Nov";
				break;
			default:
				return "Dec";
				break;
		}
	}

	function average($value, $nb) {
		return round($value/$nb, 2);
	}

	function format_data($data) {
		$cases=(array)(json_decode($data)->timeline->cases);
		$recovered=(array)(json_decode($data)->timeline->recovered);
		$deaths=(array)(json_decode($data)->timeline->deaths);
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
				$months_text[$month_index]=get_text_month((int)$current_month);
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
		return array(
			"months" => $months_text,
			"cases" => $data_cases,
			"recovered" => $data_recovered,
			"deaths" => $data_deaths
		);
	}

	//Request and format result
	if(strlen($country)>0) {
		$data=file_get_contents("https://disease.sh/v3/covid-19/historical/".$country."?lastdays=90");
		$history=format_data($data);
	}
	echo(json_encode($history));
?>