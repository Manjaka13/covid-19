//Class that links view and controller
class Controller {
	constructor() {
		let self=this;
		this.model=new Model();
		this.view=new View();

		//this.view.show_chart();
		this.view.set_loading(true);
		this.model.get_countries().then(countries => {
			self.view.print_countries(countries);
			self.view.select_country("Madagascar");
			self.view.listen_countries(country => {
				this.view.set_loading(true);
				self.model.get_cases(self.view.get_selected_country()).then(data => {
					self.view.update(data);
				}).then(() => {
					self.model.get_history(self.view.get_selected_country()).then(data => {
						this.view.show_chart(data);
						this.view.set_loading(false);
					});
				});
			});
			self.model.get_cases(self.view.get_selected_country()).then(data => {
				self.view.update(data);
			}).then(() => {
				self.model.get_history(self.view.get_selected_country()).then(data => {
					this.view.show_chart(data);
					this.view.set_loading(false);
				}).catch((e) => {
					console.log(e);
				});
			});
		});
	}
};