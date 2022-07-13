import React, { Fragment } from "react";
import Cases from "./Cases";
import Chart from "./Chart";
import { useCovid } from "../hooks/useCovid";

/*
    Wrapper around covid
*/

const CovidWrapper = () => {
	const { history, country, cases } = useCovid();

	return (
		<Fragment>
			<Cases country={country} cases={cases} />
			{history && <Chart history={history} />}
		</Fragment>
	);
};

export default CovidWrapper;
