import { CovidProvider } from "../hooks/useCovid";
import CovidWrapper from "./CovidWrapper";
import Footer from "./Footer";
import Social from "./Social";

/*
	App entry
*/

const Covid = () => {
	return (
		<CovidProvider>
			<div className="container">
				<h1 className="covid__title">Covid-19 pandemic evolution</h1>
				<CovidWrapper />
			</div>
			<Social />
			<Footer />
		</CovidProvider>
	);
};

export default Covid;
