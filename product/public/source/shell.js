define([
	'/public/source/list.js',
	'/public/source/util.js',
	'/public/source/server.js',
	'/public/source/core.js',
	'/public/source/data.js'
],
function(list, util, server, core, data) {
	return function() {
		var shell = this;
		shell.list = new list(shell);
		shell.util = new util(shell);
		shell.server = new server(shell);
		shell.core = new core(shell);
		shell.data = new data(shell);

		// console 용 shell 등록
		window.sh = shell;

		var self = $.extend({
			lib: function(classStr, idStr) {
				classStr = classStr || '';

				var origin_str = '.' + classStr.split(' ')[0];
				var origin_mc = $('library ' + origin_str);

				var return_mc = (origin_mc.length) ? origin_mc.clone() : $('<div/>');
				return_mc.addClass(classStr);
				return_mc.attr('id', idStr);

				return return_mc;
			},

			description: ''
		}, shell);
		return self;
	}
});