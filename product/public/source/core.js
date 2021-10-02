define(function() {
	return function(sh) {
		var shell = sh;
		
		var self = {
			run: function() {
				return shell.server.run();
			},
			runPromise: function(formStr, paramObj) {
				return shell.server.runPromise(formStr, paramObj);
			},
			runDone: function() {
				console.log('성공');
			},

			description: ''
		}
		return self;
	}
});