import { Fragment } from "react";
import Cases from "./Cases";
import Chart from "./Chart";
import Spinner from "./Spinner";
import { useCovid } from "../hooks/useCovid";

/*
	Wrapper around covid
*/

const CovidWrapper = () => {
	const { history, country, cases, countries, loading } = useCovid();

	return (
		<Fragment>
			{!loading && (
				<Fragment>
					<Cases country={country} cases={cases} countries={countries} />
					{history && <Chart history={history} />}
				</Fragment>
			)}
			{loading && <div className="spinner-box">
				<Spinner />
				<p className="spinner-box__text">Loading...</p>
			</div>}
		</Fragment>
	);
};

export default CovidWrapper;
