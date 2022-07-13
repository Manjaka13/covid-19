import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import React from "react";

const Footer = () => {
	return (
		<footer className="footer container">
			<div className="footer__separator"></div>
			<p className="footer__text">
				Made with <Icon className="footer__heart" icon={["fas", "heart"]} /> by{" "}
				<a
					className="footer__author"
					href="https://www.linkedin.com/in/harijaona-rajaonson"
					title="Author"
				>
					Hari
				</a>{" "}
				using ReactJS.
			</p>
		</footer>
	);
};

export default Footer;
