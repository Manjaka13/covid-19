import http from "./http";
import "../helpers/icons";
import { getCasesUrl, getCountriesUrl, getHistoryUrl } from "../helpers/const";

/*
	API calls
*/

// Get countries list
export const getCountries = () => http.get(getCountriesUrl());

// Get list of cases in a country
export const getCases = (country) => http.get(getCasesUrl(country));

// Get country's history
export const getHistory = (country) => http.get(getHistoryUrl(country));
