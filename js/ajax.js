//For doing ajax calls
async function ajax(target, args) {
	let promise, response;
	let form=new FormData();
	if(typeof(args)=="object")
		for(var id in args)
			form.append(id, args[id]);

	if(window.fetch) {
		response=await fetch(target, {
			method: "POST",
			body: form
		});
		if(response.status===200)
			promise=response.json();
		else
			promise=response.text();
	}
	else {
		promise=new Promise((resolve, reject) => {
			let xhr=new XMLHttpRequest();
			xhr.timeout=3000;
			xhr.open("POST", target, true);
			xhr.ontimeout=() => reject("Request on ["+target+"] timed out.");
			xhr.onload=() => {
				if(xhr.status==200) {
					try {
						response=JSON.parse(xhr.response);
					} catch(e) {
						reject(e);
					};
					resolve(response);
				}
				else
					reject("Request on ["+target+"] failed. Status: "+xhr.status);
			};
			xhr.send(form);
		});
	}
	return promise;
}