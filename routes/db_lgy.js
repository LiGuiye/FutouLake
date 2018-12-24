//此处为封装的数据库查询函数
var promise = require('bluebird');
var options = {
	// Initialization Options
	promiseLib: promise
};
var pgp = require('pg-promise')(options);
var connectionString = 'postgres://postgres:313616@127.0.0.1:5432/futoulake';
var db = pgp(connectionString);

function selectall(req, res) {
	db.any('select * from precipitation')
		.then(function(data) {
			res.status(200)
				.json({
					data: data
				});
		})
		.catch(function(err) {
			res.json({
				data: "搜不到"
			})
			console.log(table);
		})

}
function selectall_protectionline_pilepoint(req, res) {
	db.any('select * from protectionline_pilepoint order by id')
		.then(function(data) {
			res.status(200)
				.json({
					data: data
				});
		})
		.catch(function(err) {
			res.json({
				data: "搜不到"
			})
			console.log(table);
		})

}
module.exports = {
	selectall: selectall,
	selectall_protectionline_pilepoint:selectall_protectionline_pilepoint
};