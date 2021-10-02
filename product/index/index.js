require.config({
	baseUrl: '',
	paths: {
		'jquery': '/public/vendor/jquery/1.12.3/jquery.min',
		'shell': '/public/source/shell'
	},
	shim: {
		'shell': ['jquery']
	}
});

require([
	'jquery',
	'shell'
],
function($, sh) {
	var shell;

	$(document).ready(function() {
		shell = new sh();

		var html_str = '';
		html_str += '<p><a href="/monday">monday</a></p>';
		html_str += '<p><a href="/calendar">calendar</a></p>';
		html_str += '<p><a href="/jsonViewer">jsonViewer</a></p>';

		$('body').addClass('ux-bubble ui-body')
			.append(shell.lib('ux-bubble ui-1', 'monday').css({bottom: '66.6%'}).html(html_str))
			.append(shell.lib('ux-bubble ui-2').css({top: '33.3%', bottom: '33.3%'}))
			.append(shell.lib('ux-bubble ui-3').css({top: '66.6%'}));
			$('#monday')
				.append(shell.lib('ux-bubble ui-4', 'menu-box').css({left: 'auto', width: '200px'}).css({margin: '10px', overflow: 'scroll'}));





		var firstDir_str = shell.data.getCookie('view_directory') || '../';

		runAction(firstDir_str).then(
			function(jsonObj) {
				if (!jsonObj) return;
				console.log(jsonObj);

				makeListB('#monday #menu-box', jsonObj);

				// return runAction('../product');
			}
		).catch(
			function (error) {
				console.log('error');
			}
		).then(
			function(jsonObj) {
				if (!jsonObj) return;
				console.log(jsonObj);
			}
		);
	});




	function runAction(dirStr) {
		return shell.core.runPromise('getFileList', {dir: dirStr});
	}


	function tranDataList(dataArr) {
		var return_arr = [];

		Object.keys(dataArr).forEach(function(keyStr) {
			if (keyStr == 'endVal') {
				return;
			}
			let tranID = dataArr[keyStr].tranId;

			let index = return_arr.findIndex(tran => tran.id == tranID);
			if (index != -1) {
				// 이미 같은 tranID 있음
				let names = return_arr[index].name.split(',');
				names.push(keyStr);
				return_arr[index].name = names.join(',');
			} else {
				// 새 tranID
				return_arr.push({
					label: keyStr,
					value: dataArr[keyStr].tranId,
					description: dataArr[keyStr].desc
				});	
			}
		});
		return return_arr;
	}

	function makeListA(selectorStr, dataArr) {
		if (!dataArr) dataArr = [];

		for (var i = 0; i < dataArr.length; i++) {
			var item_mc = shell.lib('uu-item ui-' + ((i % 3) + 1)).css({top: 100*i + 'px', height: '30px'}).css({overflow: 'hidden', 'white-space': 'nowrap', 'text-overflow': 'ellipsis'});
			item_mc.text(i + '. ' + dataArr[i]['label']);
			
			$(selectorStr).append(item_mc);
		}
	}

	function makeListB(selectorStr, resArr) {
		if (!resArr) resArr = [];

		var thisDir_str = shell.data.getValue('lastCallData')['data']['dir'];
		var lastDirectory_reg = /\/[^\/|\s]*$/gi;
		var target_mc = $(selectorStr);
		target_mc.empty();

		// 숨김 파일 가리기
		resArr = resArr.filter(function(value) {
			return (value['label'].slice(0, 1) != '.');
		});
		// 폴더, 파일 정렬
		resArr = resArr.sort(function(a, b) {
			var typeA_str = a['type'].toUpperCase();
			var typeB_str = b['type'].toUpperCase();

			if (typeA_str < typeB_str) return -1;
			if (typeA_str > typeB_str) return 1;
			return 0;
		});
		// 상위 링크 추가
		resArr.unshift({
			label: thisDir_str,
			type: "up",
			value: thisDir_str.replace(lastDirectory_reg, '')
		});

		for (var i = 0; i < resArr.length; i++) {
			var res_obj = resArr[i];
			var clickDir_str = res_obj['value'];

			var item_mc = shell.lib('ux-item ui-' + ((i % 3) + 1)).css({top: 31*i + 'px', height: '30px'}).css({overflow: 'hidden', 'white-space': 'nowrap', 'text-overflow': 'ellipsis'});
			item_mc.data('param', res_obj);

			if (res_obj['type'] == 'file') {
				item_mc.html(res_obj['label'] + '</a>');

			} else {
				item_mc.html($('<a href="javascript:void(0);">' + res_obj['label'] + '</a>')).attr('onclick', '').click(clickFunc);
			}

			if (res_obj['type'] == 'directory') {
				item_mc.html(item_mc.html() + '<a href="' + clickDir_str.match(lastDirectory_reg)[0] + '">>>></a>');
			}
			
			target_mc.append(item_mc);
		}

		function clickFunc(event) {
			var clickDir_str = $(this).data('param')['value'];

			shell.data.setCookie('view_directory', clickDir_str);

			runAction(clickDir_str).then(
				function(jsonObj) {
					if (!jsonObj) return;
					console.log(jsonObj);

					makeListB('#monday #menu-box', jsonObj);
				}
			);
		}
	}
});