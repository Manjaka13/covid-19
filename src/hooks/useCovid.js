import {
    useState,
    useEffect,
    useContext,
    createContext
} from "react";
import { defaultCovidState } from "../helpers/const";
import { getCases, getCountries, getHistory } from "../services";
import { formatTimeline } from "../helpers/utils";

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

    // Updates cases and history
    const update = (country, firstTime) => new Promise((resolve, reject) => {
        setLoading(true);
        getCases(country)
            .then(setCases)
            .then(() => getHistory(country))
            .then(({ timeline }) => timeline)
            .then(formatTimeline)
            .then(setHistory)
            .then(() => {
                if (firstTime)
                    return getCountries();
            })
            .then((data) => {
                if (firstTime)
                    setCountries(data);
            })
            .catch(reject)
            .finally(() => setLoading(false));
    });

    useEffect(() => {
        update(country, true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!loading && countries)
            if (!history || (history && history.country !== country))
                update(country);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [country]);

    const updateCountry = (e) => setCountry(e.target.value);

    const covidState = {
        countries, country, cases, history, loading, updateCountry
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