import React from "react";
import CasesData from "./CasesData";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";

/*
	Get cases for stored country
*/

const Cases = ({ country, cases }) => {
	return (
		<div className="cases">
			<h2 className="cases__title">
				<Icon icon={["fas", "map-marker-alt"]} /> {country}
			</h2>
			{cases && (
				<div className="cases__data">
					<div className="cases__today">
						<h3 className="title">Today</h3>
						<CasesData
							number={cases.todayCases}
							deaths={cases.todayDeaths}
							recovered={cases.todayRecovered}
						/>
					</div>
					<div className="cases__total">
						<h3 className="title">Total</h3>
						<CasesData
							number={cases.cases}
							deaths={cases.deaths}
							recovered={cases.recovered}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default Cases;
