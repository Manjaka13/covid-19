import axios from "axios";
import { requestHeaders } from "../helpers/const";

/*
	The http service for API calls
*/

const http = {
	// Get request
	get: (url) => new Promise((resolve, reject) => {
		setTimeout(() => {
			axios
				.get(`${url}`, {
					headers: requestHeaders,
				})
				.then((response) => {
					if (response.data)
						resolve(typeof response.data === "string" ? JSON.parse(response.data) : response.data);
					else
						resolve(typeof response === "string" ? JSON.parse(response) : response);
				})
				.catch((e) => reject(e));
		}, 1000)
	}),
};

export default http;
