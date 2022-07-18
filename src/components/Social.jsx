import React from "react";
import { socialList } from "../helpers/const";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";

/*
    Social links
*/

const Social = () => {
	const mappedSocial = socialList.map((social) => (
		<li className="social__item" key={uuidv4()}>
			<a className="link" href={social.link} title={social.title}>
				<Icon icon={social.icon} />
			</a>
		</li>
	));

	return <ul className="social">{mappedSocial}</ul>;
};

export default Social;
