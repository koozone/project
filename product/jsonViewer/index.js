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

		$('body').addClass('ux-bubble ui-body')
			.append(shell.lib('ux-bubble ui-1').css({height: '30px'}).html('<span><a href="/">home</a></span>'))
			.append(shell.lib('ux-bubble ui-3', 'test-field').css({top: '30px'}));
			$('#test-field')
				.append(shell.lib('ux-bubble ui-4', 'menu-box').css({left: '100px'})
				.css({
					margin: '10px',
					overflow: 'scroll',
					whiteSpace: 'pre-wrap'
				}));


		var viewHtml_str = getJsonToHtml(shell.data.cookieData);

		makeListB('#test-field #menu-box', viewHtml_str);
	});

	function makeListB(selectorStr, htmlStr) {
		var target_mc = $(selectorStr);
		target_mc.empty();

console.log(htmlStr);
		target_mc.html(htmlStr);
	}


	function getJsonToHtml(jsonObj) {
		var tab_str = '    ';
		var json_str = JSON.stringify(jsonObj, null, tab_str);
console.log(json_str);
		var jsonLine_arr = json_str.split('\n');

		jsonLine_arr = jsonLine_arr.map(function(element) {
			/**
			 * json 문자 라인을 구분해서 재구성
			 * $1: 공백, $2: key 내용, $3: 구분자 (: ), $4: value 내용, $5: 콤마
			 */
			var split_reg = /(^\s*)((?:.*?(?=: ))*)((?:: )*)(.*?)(,?$)/gi;
			// (ex> '    "host": "127.0.0.1",' > ["", "    ", ""host"", ": ", ""127.0.0.1"", ",", ""])
			var element_arr = element.split(split_reg);
console.log(element_arr);
			var html_str = `
				<div class="ace_line_group" style="height:16px">
					<div class="ace_line" style="height:16px">
						{firstChar}{keyChar}{middleChar}{valueChar}{lastChar}
					</div>
				</div>
			`;

			html_str = html_str.replace(/{firstChar}/,	(element_arr[1]) ? element_arr[1].replace(tab_str, '<span class="ace_indent-guide">  </span>') : '');
			html_str = html_str.replace(/{keyChar}/,	(element_arr[2]) ? '<span class="ace_key">' + element_arr[2] + '</span>' : '');
			html_str = html_str.replace(/{middleChar}/,	(element_arr[3]) ? element_arr[3] : '');
			html_str = html_str.replace(/{valueChar}/,	(element_arr[4]) ? '<span class="ace_value {typeClass}">' + element_arr[4] + '</span>' : '');
			html_str = html_str.replace(/{lastChar}/,	(element_arr[5]) ? element_arr[5] : '');

			if (element_arr[4] == '{' || element_arr[4] == '}' ||
				element_arr[4] == '[' || element_arr[4] == ']') {
				html_str = html_str.replace(/{typeClass}/,	'group');

			} else {
				var sample_obj = JSON.parse('{"sample": '+ element_arr[4] + '}');
				html_str = html_str.replace(/{typeClass}/,	typeof(sample_obj['sample']));
			}

			return html_str;
		});


		var return_str = '';
		return_str += '<div class="ace_layer ace_text-layer" style="padding: 0px 4px;">'
		return_str += jsonLine_arr.join('');
		return_str += '</div>'

		return return_str;
	}

	// function transformFormat(str) {
	// 	var return_str = '';

	// 	var count_num = 0;
	// 	var count_str = '';
	// 	var char_str = '';
	// 	var prev_str = '';
	// 	var end_state = true;

	// 	for (var i = 0; i < str.length; i++) {
	// 		char_str = str.substr(i, 1);
	// 		prev_str = str.substr(i-1, 1);

	// 		// 문단 밖인지 안인지 체크
	// 		if (char_str == '\'' && prev_str != '\\') {
	// 			end_state = !end_state;
	// 		}

	// 		if (char_str == '{' || char_str == '[') {
	// 			if (end_state) {
	// 				count_str = getTabString(++count_num);
	// 				return_str += (char_str + '\n' + count_str);
	// 			} else {
	// 				return_str += char_str;
	// 			}

	// 		} else if (char_str == ',') {
	// 			// 문단 밖에있는 콤마이면
	// 			if (end_state) {
	// 				return_str += (char_str + '\n' + count_str);
	// 			} else {
	// 				return_str += char_str;
	// 			}

	// 		} else if (char_str == '}' || char_str == ']') {
	// 			if (end_state) {
	// 				count_str = getTabString(--count_num);
	// 				return_str += ('\n' + count_str + char_str);
	// 			} else {
	// 				return_str += char_str;
	// 			}

	// 		} else {
	// 			return_str += char_str;
	// 		}
	// 	}

	// 	return return_str;

	// 	function getTabString(num) {
	// 		var tab_str = '';

	// 		for (var k = 0; k < num; k++) {
	// 			tab_str += '\t';
	// 		}
	// 		return tab_str;
	// 	}
	// }

	// function transformASCII(str) {
	// 	var return_str = str;
	// 	return_str = return_str.split('<').join('&lt;');
	// 	return_str = return_str.split('>').join('&gt;');
	// 	return_str = return_str.split('&').join('&amp;');
	// 	return_str = return_str.split('"').join('&quot;');
	// 	return_str = return_str.split('\'').join('&apos;');

	// 	return return_str;
	// }

	// // String 을 Object 로 변환
	// function convertStringToObject(str) {
	// 	return JSON.parse(str);
	// }

	// // Object 를 String 으로 변환
	// function convertObjectToString(obj) {
	// 	return JSON.stringify(obj, null, '    ');
	// }
});