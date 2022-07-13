import { CovidProvider } from "../hooks/useCovid";
import Cases from "./Cases";
import Chart from "./Chart";

/*
    App entry
*/

const Covid = () => {
	return (
		<CovidProvider>
			<div className="covid">
				<h1 className="covid__title">Covid-19 pandemic evolution</h1>
				<Cases />
				<Chart />
				<footer>Footer</footer>
			</div>
		</CovidProvider>
	);
};

export default Covid;
