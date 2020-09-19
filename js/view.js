//Class that handles/update the view
class View {
	constructor() {
		this.context=document.querySelector("#covid19 .chart canvas").getContext("2d");
		this.country=document.querySelector("#covid19 .country .selection");
		this.covid19={
			today: {
				cases: document.querySelector("#covid19 .country_data .today .cases"),
				deaths: document.querySelector("#covid19 .country_data .today .deaths"),
				recovered: document.querySelector("#covid19 .country_data .today .recovered")
			},
			total: {
				cases: document.querySelector("#covid19 .country_data .total .cases"),
				deaths: document.querySelector("#covid19 .country_data .total .deaths"),
				recovered: document.querySelector("#covid19 .country_data .total .recovered")
			},
			active: document.querySelector("#covid19 .country_data .today .active"),
			critical: document.querySelector("#covid19 .country_data .today .critical"),
			death_rate: document.querySelector("#covid19 .country_data_update_date .death"),
			recovery_rate: document.querySelector("#covid19 .country_data_update_date .recovery")
		};
		this.last_update=document.querySelector("#covid19 .country_data_update_date .date .value");
		this.loading=document.querySelector("#covid19 .country .loading");
		new Chart(this.context, {
		    type: "line",
		    data: {
		        labels: [],
		        datasets: []
		    }
		});
	}
	set_loading(status) {
		if(status)
			this.loading.style.opacity="1";
		else
			this.loading.style.opacity="0";
	}
	select_country(country) {
		this.country.value=country;
	}
	get_selected_country() {
		return this.country.value;
	}
	//Get list of existing countries
	print_countries(countries) {
		let html="";
		for(let i=0; i<countries.length; i++)
			html+="<option value=\""+countries[i]+"\">"+countries[i]+"</option>";
		this.country.innerHTML=html;
	}
	//Listen to countries selection change
	listen_countries(callback) {
		let self=this;
		document.addEventListener("change", (e) => {
			e.preventDefault();
			if(typeof(callback)=="function")
				callback(self.country.value);
		});
	}
	//Updates view with given data
	update(data) {
		let d=new Date(data.updated);
		//Print today data
		this.covid19.today.cases.innerText=data.todayCases;
		this.covid19.today.deaths.innerText=data.todayDeaths;
		this.covid19.today.recovered.innerText=data.todayRecovered;
		this.covid19.active.innerText=data.active;
		this.covid19.critical.innerText=data.critical;
		//Print total data
		this.covid19.total.cases.innerText=data.cases;
		this.covid19.total.deaths.innerText=data.deaths;
		this.covid19.total.recovered.innerText=data.recovered;
		//Print rates
		this.covid19.death_rate.innerText=(((data.deaths*100)/data.cases).toFixed(2))+"%";
		this.covid19.recovery_rate.innerText=(((data.recovered*100)/data.cases).toFixed(2))+"%";
		//Print update date
		this.last_update.innerText=d.toLocaleDateString(undefined, {
			day: "numeric",
			month: "numeric",
			year: "numeric"
		})+" "+d.toLocaleTimeString(undefined, {
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit"
		});
	}
	//Shows the disease evolution chart
	show_chart(data) {
		let border=2;
		let covid19=new Chart(this.context, {
		    type: "line",
		    data: {
		        labels: data.months,
		        datasets: [{
		            label: "Cases",
		            data: data.cases,
		            backgroundColor: "rgba(255, 0, 0, 0.3)",
		            borderColor: "rgba(255, 0, 0, 1)",
		            borderWidth: border
		        },
		        {
		            label: "Recovered",
		            data: data.recovered,
		            backgroundColor: "rgba(0, 200, 0, 0.3)",
		            borderColor: "rgba(0, 200, 0, 1)",
		            borderWidth: border
		        },
		        {
		            label: "Deaths",
		            data: data.deaths,
		            backgroundColor: "rgba(0, 0, 0, 0.3)",
		            borderColor: "rgba(0, 0, 0, 1)",
		            borderWidth: border
		        }]
		    },
		    options: {
		        scales: {
		            yAxes: [{
		                ticks: {
		                    beginAtZero: true
		                }
		            }]
		        }
		    }
		});
	}
};