//Handles data read and update
class Model {
	constructor() {
		this.cases_target="php/get_cases.php";
		this.history_target="php/get_history.php";
		this.countries_target="countries.json";
	}	
	async get_countries() {
		return await ajax(this.countries_target).then(json => {
			return json;
		}).catch(e => {
			console.log(e);
		});
	}
	async get_cases(country) {
		return await ajax(this.cases_target, {country: country}).then(json => {
			if(json.cases==undefined)
				json=undefined;
			return json;
		}).catch(e => {
			console.log(e);
		});
	}
	async get_history(country) {
		return await ajax(this.history_target, {country: country}).then(json => {
			if(json.cases==undefined)
				json=undefined;
			return json;
		}).catch(e => {
			console.log(e);
		});
	}
};