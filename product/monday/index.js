/**
 * @fileOverview
 * sfd 프레임워크 최초 로딩 JS
 */
// sfdCacheBust = 'bust=' + (new Date()).getTime();
require.config({
	baseUrl: '', // baseUrl은 각 상품의 root폴더
	paths: {
		// 'text': '/ria/common/vendor/text',
		// 'jquery': '/resources/js/jquery.min',
		// 'SfdExtend': '/ria/common/core/SfdExtend.js?' + sfdCacheBust
	},
	shim: {
		// 'SfdExtend': ['jquery']
	}
});

//모듈 로드
require([
	// 'jquery',
	// 'SfdExtend',
	'/public/source/shell.js',
	'./public/source/data.js',
	'./public/source/core.js'
],
// 디펜던시 로드 완료 콜백 - 로드된 디펜던시들은 콜백함수의 인자로 넣어줄 수 있다.
function(shell, data, core) {
	var shell = new shell();
	shell.data = $.extend(shell.data, new data(shell));
	shell.core = $.extend(shell.core, new core(shell));

	console.log(shell.data.getValue('name'));
shell.core.run().then(
	function(jsonObj) {
		if (!jsonObj) return;

		console.log('run~~~');
	}
);

	// $('body').addClass('ux-bubble ui-body')
		////////////////////////////////////////////////////////////////////////////////////////////////////
		// h1-1
		// .append(clone('ux-bubble ui-1'));

		// h1-2
		// .append(clone('ux-bubble ui-1').css({height: '100px'}));

		// h1-3
		// .append(clone('ux-bubble ui-1').css({top: 'auto', height: '100px'}));

		////////////////////////////////////////////////////////////////////////////////////////////////////
		// h2-1
		// .append(clone('ux-bubble ui-1').css({bottom: '50%'}))
		// .append(clone('ux-bubble ui-2').css({top: '50%'}));

		// h2-2
		// .append(clone('ux-bubble ui-1').css({height: '100px'}))
		// .append(clone('ux-bubble ui-2').css({top: '100px'}));

		// h2-3
		// .append(clone('ux-bubble ui-1').css({bottom: '100px'}))
		// .append(clone('ux-bubble ui-2').css({top: 'auto', height: '100px'}));

		// h2-4
		// .append(clone('ux-bubble ui-1').css({height: '100px'}))
		// .append(clone('ux-bubble ui-2').css({top: '100px', height: '100px'}));

		// h2-5
		// .append(clone('ux-bubble ui-1').css({top: 'auto', height: '100px', bottom: '100px'}))
		// .append(clone('ux-bubble ui-2').css({top: 'auto', height: '100px'}));

		// h2-6
		// .append(clone('ux-bubble ui-1'))
		// .append(clone('ux-bubble ui-2').css({top: '100%', height: '100%', bottom: 'auto'}));

		////////////////////////////////////////////////////////////////////////////////////////////////////
		// h3-1
		// .append(clone('ux-bubble ui-1').css({bottom: '66.6%'}))
		// .append(clone('ux-bubble ui-2').css({top: '33.3%', bottom: '33.3%'}))
		// .append(clone('ux-bubble ui-3').css({top: '66.6%'}));

		// h3-2
		// .append(clone('ux-bubble ui-1').css({height: '100px'}))
		// .append(clone('ux-bubble ui-2', 'h3-2').css({top: '100px'}));

		// $('#h3-2')
		// 	.append(clone('ux-bubble ui-2').css({bottom: '50%'}))
		// 	.append(clone('ux-bubble ui-3').css({top: '50%'}));
		
		// h3-3
		// .append(clone('ux-bubble', 'h3-3-1').css({bottom: '50%'}))
		// .append(clone('ux-bubble', 'h3-3-2').css({top: '50%'}));
		// $('#h3-3-1')
		// 	.append(clone('ux-bubble ui-1').css({bottom: '50px'}));
		// $('#h3-3-2')
		// 	.append(clone('ux-bubble ui-2').css({top: '-50px', height: '100px'}))
		// 	.append(clone('ux-bubble ui-3').css({top: '50px'}));

		// h3-4
		// .append(clone('ux-bubble ui-1', 'h3-4').css({bottom: '100px'}))
		// .append(clone('ux-bubble ui-2').css({top: 'auto', height: '100px'}))
		// $('#h3-4')
		// 	.append(clone('ux-bubble ui-2').css({bottom: '50%'}))
		// 	.append(clone('ux-bubble ui-3').css({top: '50%'}));

		// h3-5
		// .append(clone('ux-bubble ui-1').css({height: '100px'}))
		// .append(clone('ux-bubble ui-2').css({top: '100px', height: '100px'}))
		// .append(clone('ux-bubble ui-3').css({top: '200px'}));

		// h3-6
		// .append(clone('ux-bubble ui-1').css({height: '100px'}))
		// .append(clone('ux-bubble ui-2').css({top: '100px', bottom: '100px'}))
		// .append(clone('ux-bubble ui-3').css({top: 'auto', height: '100px'}));

		// h3-7
		// .append(clone('ux-bubble ui-1').css({bottom: '200px'}))
		// .append(clone('ux-bubble ui-2').css({top: 'auto', height: '100px', bottom: '100px'}))
		// .append(clone('ux-bubble ui-3').css({top: 'auto', height: '100px'}));

		// h3-8
		// .append(clone('ux-bubble ui-1').css({height: '100px'}))
		// .append(clone('ux-bubble ui-2').css({top: '100px', height: '100px'}))
		// .append(clone('ux-bubble ui-3').css({top: '200px', height: '100px'}));

		// h3-9
		// .append(clone('ux-bubble ui-1').css({top: 'auto', height: '100px', bottom: '200px'}))
		// .append(clone('ux-bubble ui-2').css({top: 'auto', height: '100px', bottom: '100px'}))
		// .append(clone('ux-bubble ui-3').css({top: 'auto', height: '100px'}));

		// h3-10
		// .append(clone('ux-bubble ui-1'))
		// .append(clone('ux-bubble ui-2').css({top: '100%', height: '100%', bottom: 'auto'}))
		// .append(clone('ux-bubble ui-3').css({top: '200%', height: '100%', bottom: 'auto'}));










var cardData_arr = [
	{value: '01', label: '삼성카드'},
	{value: '03', label: '현대카드'},
	{value: '07', label: '신한(LG)카드'},
	{value: '09', label: '하나카드'},
	{value: '11', label: '롯데카드'},
	{value: '06', label: 'KB국민카드'},
	{value: '05', label: 'BC카드'},
	{value: '12', label: '씨티카드'},
	{value: '13', label: '우리카드'},
	{value: '08', label: '기타 모든 카드'}
]

var bankData_arr = [
	{ value: '039', label: '경남은행'},
	{ value: '034', label: '광주은행'},
	{ value: '004', label: '국민은행'},
	{ value: '003', label: '기업은행'},
	{ value: '011', label: '농협은행'},
	{ value: '031', label: '대구은행'},
	{ value: '032', label: '부산은행'},
	{ value: '002', label: '산업은행'},
	{ value: '045', label: '새마을금고'},
	{ value: '007', label: '수협중앙회'},
	{ value: '023', label: 'SC제일은행'},
	{ value: '088', label: '신한은행'},
	{ value: '047', label: '신협은행'},
	{ value: '027', label: '씨티은행'},
	{ value: '020', label: '우리은행'},
	{ value: '071', label: '우체국'},
	{ value: '037', label: '전북은행'},
	{ value: '035', label: '제주은행'},
	{ value: '012', label: '지역 농.축협'},
	{ value: '090', label: '카카오뱅크'},
	{ value: '089', label: 'K뱅크'},
	{ value: '081', label: 'KEB하나은행'}
]



			makeBody();

			makePageA('#page-1');
			makeListA('#page-1 #menu-box', cardData_arr);

			makePageB('#page-2');
			makeListA('#page-2 #menu-box', bankData_arr);

			makePageA('#page-3');
			makePageB('#page-4');

			setEvent();


		function makeBody() {
			$('body').addClass('ux-bubble ui-body')
				.append(shell.lib('ux-bubble ui-1', 'wrap').css({overflow: 'hidden'}))
				$('#wrap')
					.append(shell.lib('ux-bubble ui-1', 'page-1'))
					.append(shell.lib('ux-bubble ui-2', 'page-2').css({left: '100%', width: '100%', right: 'auto'}))
					.append(shell.lib('ux-bubble ui-3', 'page-3').css({left: '200%', width: '100%', right: 'auto'}))
					.append(shell.lib('ux-bubble ui-1', 'page-4').css({left: '300%', width: '100%', right: 'auto'}));
		}

		function makePageA(selectorStr) {
			$(selectorStr)
				.append(shell.lib('ux-bubble ui-1').css({height: '30px'}).html('<span><a href="/index">home</a></span>'))
				.append(shell.lib('ux-bubble ui-2', 'body').css({top: '30px', bottom: '30px'}))
				.append(shell.lib('ux-bubble ui-3').css({top: 'auto', height: '30px'}));
				$(selectorStr + ' #body')
					.append(shell.lib('ux-bubble ui-1', 'side').css({width: '150px'}))
					.append(shell.lib('ux-bubble ui-2', 'main').css({left: '150px'}));
					$(selectorStr + ' #side')
						.append(shell.lib('ux-bubble ui-3').css({height: '150px'}))
						.append(shell.lib('ux-bubble ui-4', 'menu').css({top: '150px'}));
						$(selectorStr + ' #menu')
							.append(shell.lib('ux-bubble', 'menu-box').css({margin: '10px', overflow: 'scroll'}));
					$(selectorStr + ' #main')
						.append(shell.lib('ux-bubble', 'h3-3-1').css({bottom: '50%'}))
						.append(shell.lib('ux-bubble', 'h3-3-2').css({top: '50%'}));
						$(selectorStr + ' #h3-3-1')
							.append(shell.lib('ux-bubble ui-2').css({bottom: '50px'}));
						$(selectorStr + ' #h3-3-2')
							.append(shell.lib('ux-bubble ui-3').css({top: '-50px', height: '100px'}))
							.append(shell.lib('ux-bubble ui-1').css({top: '50px'}));
		}

		function makePageB(selectorStr) {
			$(selectorStr)
				.append(shell.lib('ux-bubble ui-1').css({height: '30px'}))
				.append(shell.lib('ux-bubble ui-4', 'body').css({top: '30px', bottom: '30px'}))
				.append(shell.lib('ux-bubble ui-3').css({top: 'auto', height: '30px'}));
				$(selectorStr + ' #body')
					.append(shell.lib('ux-bubble', 'menu-box').css({left: '150px'}).css({margin: '10px', overflow: 'scroll'}));
		}

		function makeListA(selectorStr, dataArr) {
			if (!dataArr) dataArr = [];
			// $(selectorStr)
			// 	.append(shell.lib('ux-bubble ui-1').css({top: 100*0 + 'px', height: '100px'}))
			// 	.append(shell.lib('ux-bubble ui-2').css({top: 100*1 + 'px', height: '100px'}))
			// 	.append(shell.lib('ux-item ui-1').css({top: 100*2 + 'px', height: '100px'}))
			// 	.append(shell.lib('ux-bubble ui-2').css({top: 100*3 + 'px', height: '100px'}))
			// 	.append(shell.lib('ux-bubble ui-1').css({top: 100*4 + 'px', height: '100px'}))
			// 	.append(shell.lib('ux-bubble ui-2').css({top: 100*5 + 'px', height: '100px'}))
			// 	.append(shell.lib('ux-bubble ui-1').css({top: 100*6 + 'px', height: '100px'}))
			// 	.append(shell.lib('ux-bubble ui-2').css({top: 100*7 + 'px', height: '100px'}));
			for (var i = 0; i < dataArr.length; i++) {
				var item_mc = shell.lib('ux-item ui-' + ((i % 3) + 1)).css({top: 100*i + 'px', height: '100px'});
				item_mc.children('.nm-title').text(dataArr[i]['label']);
				
				$(selectorStr).append(item_mc);
			}
		}

		function setEvent() {
			var pageIndex_num = 0;

			$(window).resize(function() {
				pagePosition('#wrap', pageIndex_num, false);
			});
			$('#wrap').click(function() {
				pageIndex_num++;

				pagePosition('#wrap', pageIndex_num);
			});
		}

		function pagePosition(selectorStr, indexNum, durationBln) {
			if (durationBln == null) durationBln = true;

			var page_arr = $(selectorStr).children();
			var page_mc = $(page_arr[indexNum % page_arr.length]);
			var left_num = page_mc.position()['left'] + $(selectorStr).scrollLeft();
			var duration_num = (durationBln) ? 200 : 0;

			$(selectorStr).animate({scrollLeft: left_num}, duration_num);
		}

		// function clone(classStr, idStr) {
		// 	classStr = classStr || '';

		// 	var origin_str = '.' + classStr.split(' ')[0];
		// 	var origin_mc = $('library ' + origin_str);

		// 	var return_mc = (origin_mc.length) ? origin_mc.clone() : $('<div/>');
		// 	return_mc.addClass(classStr);
		// 	return_mc.attr('id', idStr);

		// 	return return_mc;
		// }
});