define(function() {
	return function(sh) {
		var shell = sh;

		var self = {
			/**
			 * 배열에서 해당 값을 가진 아이템을 키로 검색해서 반환
			 * @param targetArr		검색 대상
			 * @param keyStr		검색 키
			 * @param valueObj		검색 값
			 * @param equalBln		검색 조건 (true:같은지, false:다른지)
			 */
			takeListItem: function(targetArr, keyStr, valueObj, equalBln) {
				var return_arr;

				for (var i = 0; i < targetArr.length; i++) {
					// 값이 존재 하면
					if (shell.util.isValue(targetArr[i], keyStr, valueObj, equalBln)) {
						if (!return_arr) return_arr = [];
						return_arr = return_arr.concat(targetArr[i]);
					}
				}
				return return_arr;
			},

			/**
			 * 배열에서 해당 값을 가진 아이템 인덱스를 키로 검색해서 반환
			 * @param targetArr		검색 대상
			 * @param keyStr		검색 키
			 * @param valueObj		검색 값
			 * @param equalBln		검색 조건 (true:같은지, false:다른지)
			 */
			takeListIndex: function(targetArr, keyStr, valueObj, equalBln) {
				var return_arr;

				for (var i = 0; i < targetArr.length; i++) {
					// 값이 존재 하면
					if (shell.util.isValue(targetArr[i], keyStr, valueObj, equalBln)) {
						if (!return_arr) return_arr = [];
						return_arr = return_arr.concat(i);
					}
				}
				return return_arr;
			},

			/**
			 * 배열에서 해당 값을 키로 검색해서 반환
			 * @param targetArr		검색 대상
			 * @param keyStr		검색 키
			 */
			takeListValue: function(targetArr, keyStr) {
				var return_arr;

				for (var i = 0; i < targetArr.length; i++) {
					// 값이 존재 하면
					if (shell.util.isValue(targetArr[i], keyStr)) {
						if (!return_arr) return_arr = [];
						return_arr = return_arr.concat(targetArr[i][keyStr]);
					}
				}
				return return_arr;
			},

			// 값이 존재하는지 여부 반환
			isValue: function(targetObj, keyStr, valueObj, equalBln) {
				if (equalBln == null) {
					equalBln = true;
				}
				var return_bln = false;

				if (keyStr)  {
					if (valueObj != null) {
						return_bln = (equalBln) ? (targetObj[keyStr] == valueObj) : (targetObj[keyStr] != valueObj);

					} else {
						return_bln = targetObj.hasOwnProperty(keyStr);
					}

				} else {
					if (valueObj != null) {
						return_bln = (equalBln) ? (targetObj == valueObj) : (targetObj != valueObj);
					}
				}
				return return_bln;
			},

			description: ''
		}
		return self;
	}
});