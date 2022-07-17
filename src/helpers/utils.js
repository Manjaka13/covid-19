// List of months (0 - 12)
const monthList = [
	"???",
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"Mai",
	"Jun",
	"Jul",
	"Aug",
	"Sept",
	"Oct",
	"Nov",
	"Dec",
];

// Formats date mm/dd/yy to mm.20yy
const formatDate = (date) =>
	`${monthList[parseInt(date.match(new RegExp(/^[0-9]+/))[0])]}.20${
		date.match(new RegExp(/[0-9]+$/))[0]
	}`;

// Formats all cases to suits the chart data model 
const formatTimeline = (timeline) => {
	let formatedCases = [];
	if (timeline && timeline.cases && timeline.deaths && timeline.recovered) {
		const months = Object.keys(timeline.cases);
		let i = 0;
		while (i < months.length) {
			const currentMonth = formatDate(months[i]);
			let maxCases = 0, maxDeaths = 0, maxRecovered = 0;
			do {
				maxCases = maxCases < timeline.cases[months[i]] ? timeline.cases[months[i]] : maxCases;
				maxDeaths = maxDeaths < timeline.deaths[months[i]] ? timeline.deaths[months[i]] : maxDeaths;
				maxRecovered = maxRecovered < timeline.recovered[months[i]] ? timeline.recovered[months[i]] : maxRecovered;
				i++;
			} while (i < months.length  && formatDate(months[i]) === currentMonth);
			formatedCases.push({
				name: currentMonth,
				cases: maxCases,
				deaths: maxDeaths,
				recovered: maxRecovered
			});
		}
	}
	return formatedCases;
};

export {
	formatTimeline,
};
