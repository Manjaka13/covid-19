/*
    Export constants from here
*/

// const developmentMode = process.env.REACT_APP_DEVELOPMENT ? true : false;
const developmentMode = false;
const baseUrl = "https://disease.sh/v3/covid-19";
const getCasesUrl = (country) => developmentMode ? "/data/cases.json" : `${baseUrl}/countries/${country}`;
const getHistoryUrl = (country) => developmentMode ? "/data/history.json" : `${baseUrl}/historical/${country}?lastdays=all`;
const getCountriesUrl = () => "/data/countries.json";
const requestHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json"
};
const defaultCovidState = {
    country: "Madagascar",
    cases: null,
    history: null,
    loading: false
};

export {
    developmentMode,
    baseUrl,
    getCasesUrl,
    getHistoryUrl,
    getCountriesUrl,
    requestHeaders,
    defaultCovidState
}