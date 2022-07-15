import {
	Tooltip,
	XAxis,
	YAxis,
	CartesianGrid,
	AreaChart,
	Area,
	ResponsiveContainer,
} from "recharts";

/*
	Statistic chart
*/

const formatCases = (cases) => {
	const month = [
		"Unk",
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
	const getMonth = (str) =>
		month[parseInt(str.match(new RegExp(/^[0-9]+/))[0])];
	// const getDay = (str) => str.match(new RegExp(/\/[0-9]+/))[0].replace("/", "");
	const getYear = (str) => "20" + str.match(new RegExp(/[0-9]+$/))[0];
	const getDataSet = (cases) => {
		let label = [];
		let value = [];
		Object.keys(cases).forEach((key) => {
			label.push(`${getMonth(key)}.${getYear(key)}`);
			value.push(cases[key]);
		});
		return { label, value };
	};

	const sliceData = ({ label, value }) => {
		let monthData,
			labelData = [],
			vData = [],
			valueData = [],
			i = -1;

		while (i < label.length) {
			let currentLabel = "";
			monthData = [];
			vData = [];
			do {
				i++;
				monthData.push(label[i]);
				vData.push(value[i]);
				currentLabel = label[i + 1] ? label[i + 1] : "";
			} while (label[i + 1] && label[i] === currentLabel);
			labelData.push(monthData);
			valueData.push(vData);
		}
		labelData.pop();
		valueData.pop();

		return {
			label: labelData,
			value: valueData,
		};
	};

	const reduceData = ({ label, value }) => {
		let labelArray = [],
			valueArray = [];
		labelArray = label.map((l) => l[0]);
		valueArray = value.map((v) => v[v.length - 1]);
		return {
			label: labelArray,
			value: valueArray,
		};
	};
	const set = getDataSet(cases);
	const slicedData = sliceData(set);
	const reducedData = reduceData(slicedData);
	return reducedData;
};

const createDataObject = (cases, deaths, recovered) => {
	const casesData = formatCases(cases);
	const deathsData = formatCases(deaths);
	const recoveredData = formatCases(recovered);
	let data = [];
	for (let i = 0; i < casesData.label.length; i++) {
		data.push({
			name: casesData.label[i],
			cases: casesData.value[i],
			deaths: deathsData.value[i],
			recovered: recoveredData.value[i],
		});
	}
	return data;
};

const Chart = ({ timeline }) => {
	const { cases, deaths, recovered } = timeline;
	const data = createDataObject(cases, deaths, recovered);

	return (
		<div className="chart">
			<ResponsiveContainer width="100%" height={300}>
				<AreaChart
					data={data}
					margin={{
						top: 10,
						right: 30,
						left: 0,
						bottom: 0,
					}}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="name" />
					<YAxis />
					<Tooltip />
					<Area
						type="gradient"
						dataKey="cases"
						stackId="1"
						stroke="red"
						fill="red"
					/>
					<Area
						type="monotone"
						dataKey="recovered"
						stackId="1"
						stroke="green"
						fill="green"
					/>
					<Area
						type="monotone"
						dataKey="deaths"
						stackId="1"
						stroke="black"
						fill="black"
					/>
				</AreaChart>
			</ResponsiveContainer>
		</div>
	);
};

export default Chart;
