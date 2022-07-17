import React, { Fragment } from "react";
import Cases from "./Cases";
import Chart from "./Chart";
import { useCovid } from "../hooks/useCovid";

/*
	Wrapper around covid
*/

const CovidWrapper = () => {
	const { history, country, cases, countries } = useCovid();

	return (
		<Fragment>
			<Cases country={country} cases={cases} countries={countries} />
			{history && <Chart history={history} />}
		</Fragment>
	);
};

export default CovidWrapper;
