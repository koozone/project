	// var http = require('http');
	// var fs = require('fs');

	// var app = http.createServer(function(request,response) {
	//     var url_str = request.url;

	//     if (url_str == '/') {
	// 		url_str = '/index.html';
	// 	}
	//     if (url_str == '/favicon.ico') {
	// 		response.writeHead(404);
	// 		response.end();
	// 		return;
	//     }
	//     response.writeHead(200);
	//     response.end(fs.readFileSync(__dirname + url_str));
	
	// });
	// app.listen(3000);



	var express = require('express');
	var path = require('path');
	var fs = require('fs');

	var app = express();

	// 루트 리다이렉트
	app.use('/', express.static(path.join(__dirname, '/index')));
	// 정적 경로(.html) 이동
	app.use(express.static(path.join(__dirname, '')));
	// favicon.ico 읽기 에러 처리
	app.use('/favicon.ico', function(req, res) {
		res.writeHead(404);
		res.end();
		return;
	});

	// 디폴트 호출 파일 설정
	app.get('/', function(req, res) {
		res.redirect('/index.html');
	});

	app.get('/getFileList', function(req, res) {
		console.log(req.query.dir);
		var file_obj = getFileList(req.query.dir, false);

		res.json(file_obj);
	});

	app.listen(3000, function() {
		console.log('Example app listening on port 3000!');
	});


	////////////////////////////////////////////////////////////////////////////////////////////////////

	function getFileList(dirStr, allBln) {
		if (allBln == null) allBln = false;

		return fs.readdirSync(dirStr).reduce(function(list, file) {
			var path_str = path.join(dirStr, file);
			var stat_obj = fs.statSync(path_str);

			var result_obj = {
				label: file,
				value: path_str,
				option: stat_obj,
				type: (stat_obj.isDirectory()) ? 'directory' : 'file'
			}

			// 전체 파일 조건이면
			if (allBln && stat_obj.isDirectory()) {
				return list.concat(result_obj).concat(getFileList(path_str, allBln));
			} else {
				return list.concat(result_obj);
			}
		}, []);
	}
	function getFileData(dirStr, allBln) {
		if (allBln == null) allBln = false;

		var return_obj;

		fs.readdirSync(dirStr).forEach(function(element) {
			var path_str = path.join(dirStr, file);
			var stat_obj = fs.statSync(path_str);

			if (!return_obj) return_obj = {};
			return_obj[element] = stat_obj;
		});

		return return_obj;
	}

	////////////////////////////////////////////////////////////////////////////////////////////////////
















	// var testFolder = '../product';
	// var fs = require('fs');

	// fs.readdir(testFolder, function(error, filelist){
	// 	console.log(filelist);
	// })



	var testFolder = '../product';

	// var results = [];

	// fs.readdir(testFolder,function(err,list){
	// 	// if(err) throw err;
		
	// 	console.log('dir length : '+list.length);
		
	// 	list.forEach(function(file){
	// 		fs.stat(file,function(err, stat){
	// 			// if(err) throw err;

	// 			console.log('file : '+file);
	// 			// console.log('isFile : '+stat.isFile()+' , isDir : '+stat.isDirectory());
	// 		});
	// 	});
	// });


	// console.log(fileList(testFolder));
	// console.log(fileList(testFolder).map((file) => file.split(path.sep).slice(-1)[0]));

	function fileList(dirStr) {
		return fs.readdirSync(dirStr).reduce(function(list, file) {
			var name = path.join(dirStr, file);
			var isDir = fs.statSync(name).isDirectory();
			return list.concat(isDir ? fileList(name) : [name]);
		}, []);
	}




	// console.log(getDirectories(testFolder));

	function getDirectories(dirStr) {
		return fs.readdirSync(dirStr).filter(function(file) {
			return fs.statSync(path.join(dirStr, file)).isDirectory();
		});
	}








	// fs.readdir(testFolder, function(err, filelist){  // 배열 형태로 출력
	//         console.log(filelist);
	// })

	// fs.readdir(testFolder, (err, filelist) => { // 하나의 데이터씩 나누어 출력
	//     filelist.forEach(file => {
	//         console.log(file);
	//     })
	// })