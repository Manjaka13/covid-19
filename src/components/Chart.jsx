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

const Chart = ({ history }) => {
	return (
		<div className="chart">
			<ResponsiveContainer width="100%" height={300}>
				<AreaChart
					data={history}
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
