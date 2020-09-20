//Class that links view and controller
class Controller {
	constructor() {
		let self=this;
		let stamp=new Date().getTime();
		this.model=new Model();
		this.view=new View();

		//Listen to country change
		self.view.listen_countries(() => {
			self.view.set_loading(true);
			self.model.get_cases(self.view.get_selected_country()).then(data => {
				self.view.update(data);
				return self.model.get_history(self.view.get_selected_country());
			}).then(data => {
				/*console.log((new Date().getTime()-stamp)+" ms");
				stamp=new Date().getTime();*/
				if(data!=undefined)
					self.view.show_chart(data);
				self.view.set_loading(false);
			}).catch(e => {
				console.log(e);
			});
		});

		//Get countries list
		this.model.get_countries().then(countries => {
			self.view.print_countries(countries);
			self.view.select_country("Madagascar");
		}).then(() => {
			self.view.fire_change_event();
		});
	}
};