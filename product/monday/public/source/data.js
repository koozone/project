define(function() {
	// var shell;

	// return {
	// 	init: function(sh) {
	// 		shell = sh;
	// 	},
	// 	valueData: {
	// 		name: 'myData'
	// 	},

	// 	getValue: function(keyStr) {
	// 		return shell.data.valueData[keyStr];
	// 	},
	// 	setValue: function(keyStr, valueObj) {
	// 		shell.data.valueData[keyStr] = valueObj;
	// 	}
	// }

	return function(shell) {
		return {
			valueData: {
				name: 'myData'
			},

			getValue: function(keyStr) {
				return shell.data.valueData[keyStr];
			},
			setValue: function(keyStr, valueObj) {
				shell.data.valueData[keyStr] = valueObj;
			},

			description: ''
		}
	}
});