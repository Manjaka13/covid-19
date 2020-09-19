//Class that links view and controller
class Controller {
	constructor() {
		let self=this;
		let history_stamp=new Date().getTime();
		let data_stamp=new Date().getTime();
		this.model=new Model();
		this.view=new View();

		//this.view.show_chart();
		this.view.set_loading(true);
		this.model.get_countries().then(countries => {
			self.view.print_countries(countries);
			self.view.select_country("Madagascar");
			self.view.listen_countries(country => {
				history_stamp=new Date().getTime();
				this.view.set_loading(true);
				self.model.get_cases(self.view.get_selected_country()).then(data => {
					self.view.update(data);
					console.log("Data load time: "+(new Date().getTime()-data_stamp)+"ms");
					data_stamp=new Date().getTime();
				}).then(() => {
					self.model.get_history(self.view.get_selected_country()).then(data => {
						this.view.show_chart(data);
						this.view.set_loading(false);
						console.log("History load time: "+(new Date().getTime()-history_stamp)+"ms");
						history_stamp=new Date().getTime();
					});
				});
			});
			self.model.get_cases(self.view.get_selected_country()).then(data => {
				self.view.update(data);
				console.log("Data load time: "+(new Date().getTime()-data_stamp)+"ms");
				data_stamp=new Date().getTime();
			}).then(() => {
				self.model.get_history(self.view.get_selected_country()).then(data => {
					this.view.show_chart(data);
					this.view.set_loading(false);
					console.log("History load time: "+(new Date().getTime()-history_stamp)+"ms");
					history_stamp=new Date().getTime();
				}).catch((e) => {
					console.log(e);
				});
			});
		});
	}
};