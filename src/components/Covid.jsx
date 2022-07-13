import { CovidProvider } from "../hooks/useCovid";
import CovidWrapper from "./CovidWrapper";

/*
	App entry
*/

const Covid = () => {
	return (
		<CovidProvider>
			<div className="covid">
				<h1 className="covid__title">Covid-19 pandemic evolution</h1>
				<CovidWrapper />
			</div>
		</CovidProvider>
	);
};

export default Covid;
