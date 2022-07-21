import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";

/*
    Display cases data (today and total)
*/

const CasesData = ({ number, deaths, recovered }) => {
	return (
		<ul className="cases-data">
			<li className="cases-data__item">
				<span className="cases-data__label">
					<Icon icon={["fas", "virus-covid"]} /> Cases
				</span>
				: {number}
			</li>
			<li className="cases-data__item">
				<span className="cases-data__label">
					<Icon icon={["fas", "skull"]} /> Deaths
				</span>
				: {deaths}
			</li>
			<li className="cases-data__item">
				<span className="cases-data__label">
					<Icon icon={["fas", "briefcase-medical"]} /> Recovered
				</span>
				: {recovered}
			</li>
		</ul>
	);
};

export default CasesData;
