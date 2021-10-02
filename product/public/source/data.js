define(function() {
	return function(sh) {
		var shell = sh;
		
		var self = {
			valueData: {
				name: 'myData'
			},

			cookieData: getCookieData(),

			setValue: function(keyStr, valueObj) {
				shell.data.valueData[keyStr] = valueObj;
			},
			getValue: function(keyStr) {
				var return_obj = shell.data.valueData[keyStr];
				
				return return_obj;
			},

			setCookie: function(keyStr, valueObj) {
				document.cookie = keyStr + '=' + valueObj;
			},
			getCookie: function(keyStr) {
				var return_obj = shell.data.cookieData[keyStr] || null;

				return return_obj;
			},

			description: ''
		}
		return self;
	}


	function getCookieData() {
		var return_obj;

		document.cookie.split('; ').forEach(function(element) {
			var element_arr = element.split(/(.*?)=(.*)/);

			if (!return_obj) return_obj = {};
			return_obj[element_arr[1]] = element_arr[2];
		});
		
		return return_obj;
	}
});