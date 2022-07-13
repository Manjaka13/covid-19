import { CovidProvider } from "../hooks/useCovid";
import CovidWrapper from "./CovidWrapper";
import Footer from "./Footer";

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
			<Footer />
		</CovidProvider>
	);
};

export default Covid;
