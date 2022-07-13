import React, {
    useState,
    useEffect,
    useContext,
    createContext
} from "react";
import { defaultCovidState } from "../helpers/const";
import { getCases, getCountries, getHistory } from "../services";

/*
    Covid hook and context
*/

// Setup context
const CovidContext = createContext({});

// Setup provider wrapper
const CovidProvider = ({ children }) => {
    const [countries, setCountries] = useState(defaultCovidState.countries);
    const [country, setCountry] = useState(defaultCovidState.country);
    const [cases, setCases] = useState(defaultCovidState.cases);
    const [history, setHistory] = useState(defaultCovidState.history);
    const [loading, setLoading] = useState(defaultCovidState.loading);

    useEffect(() => {
        getCountries()
            .then(setCountries)
            .catch(console.error);
    }, []);

    useEffect(() => {
        if (!loading && countries) {
            if (!history || (history && history.country !== country)) {
                setLoading(true);
                getCases(country)
                    .then(setCases)
                    .catch(console.error)
                    .finally(() => setLoading(false));
                getHistory(country)
                    .then(setHistory)
                    .catch(console.error)
                    .finally(() => setLoading(false));
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [country, history, countries]);

    const covidState = {
        countries, country, cases, history, loading
    };

    return (
        <CovidContext.Provider value={covidState}>
            {children}
        </CovidContext.Provider>
    );
};

const useCovid = () => useContext(CovidContext);

export {
    useCovid,
    CovidProvider
};