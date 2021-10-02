define(function() {
	return function(sh) {
		var shell = sh;
		
		var self = {
			run: function(paramObj) {
				var param_obj = paramObj || {dir: '../'};
				var call_obj= {
					url: "/getFileList",
					data: param_obj
				};

				shell.data.setValue('lastCallData', call_obj);

				return new Promise(function (resolve, reject) {
					$.ajax(
						call_obj
					).done(function(res) {
						resolve(res);
						shell.server.runDone(paramObj, res);

					}).fail(function(XHR, textStatus, errorThrown) {
						reject(new Error('error'));
						shell.server.runFail(paramObj, res);

					}).always(function() {});
				});
			},
			runPromise: function(formStr, paramObj) {
				// // var promise_obj = new promise.Promise();
				// var promise_obj = new Promise(function(resolve, reject) {});

				// shell.server.run({
				// 	form: formStr,
				// 	param: paramObj,
				// 	callback: function(res) {
				// 		promise_obj.done(false, res);
				// 	},
				// 	callbackError: function(res) {
				// 		promise_obj.done(true, res);
				// 	}
				// });
				// return promise_obj;

				// return new Promise(function (resolve, reject) {
				// 	$.ajax({
				// 		url: "/tranKoo"
				// 	}).done(function(jsonObj) {
				// 		resolve(jsonObj);

				// 	}).fail(function(XHR, textStatus, errorThrown) {
				// 		reject(new Error('error'));

				// 	}).always(function() {});
				// });
				// return new Promise(
				// 	function (resolve, reject) {
				// 		$.ajax({
				// 			url: "/tranKoo"
				// 		}).done(function(res) {
				// 			resolve(res);
				// 			// shell.server.runDone(paramObj, res);

				// 		}).fail(function(XHR, textStatus, errorThrown) {
				// 			reject(new Error('error'));
				// 			// shell.server.runFail(paramObj, res);

				// 		}).always(function() {});
				// 	}
				// );

				var param_obj = paramObj;

				return shell.server.run(param_obj);
			},
			runDone: function(paramObj, res) {
				console.log('runDone');
				// if (paramObj.callback) paramObj.callback(res);
			},
			runFail: function(paramObj, res) {
				console.log('runFail');
				// if (paramObj.callbackError) paramObj.callbackError(res);
			},

			description: ''
		}
		return self;
	}
});