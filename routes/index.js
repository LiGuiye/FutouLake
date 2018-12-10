var express = require('express');
var router = express.Router();
var pgclient = require('dao/pgHelper');
pgclient.getConnection();
//var cors = require('cors');
//router.use(cors());

/* GET home page. */
router.get('/', function(req, res) {
	if(req.cookies.islogin) {
		req.session.islogin = req.cookies.islogin;
	}
	if(req.session.islogin) {
		res.locals.islogin = req.session.islogin;
	}
	res.render('index', {
		title: 'HOME',
		test: res.locals.islogin
	});
});
router.get('/introduce', function(req, res) {
	res.render('introduce');
});
router.get('/background', function(req, res) {
	res.render('background');
});
router.get('/goal', function(req, res) {
	res.render('goal');
});
router.get('/vector', function(req, res) {
	res.render('vector');
});
router.route('/login')
	.get(function(req, res) {
		if(req.session.islogin) {
			res.locals.islogin = req.session.islogin;
		}

		if(req.cookies.islogin) {
			req.session.islogin = req.cookies.islogin;
		}
		res.render('login', {
			title: '用户登录',
			test: res.locals.islogin
		});
	})
	.post(function(req, res) {

		result = null;
		//pg.selectFun(client,req.body.username, function (result) {
		pgclient.select('WebUser', {
			'姓名': req.body.username
		}, '', function(result) {
			if(result[0] === undefined) {
				res.send('没有该用户');
			} else {
				if(result[0].password === req.body.password) {
					req.session.islogin = req.body.username;
					res.locals.islogin = req.session.islogin;
					res.cookie('islogin', res.locals.islogin, {
						maxAge: 60000
					});
					res.redirect('/home');
				} else {
					res.redirect('/login');
				}
			}
		});
	});

router.get('/logout', function(req, res) {
	res.clearCookie('islogin');
	req.session.destroy();
	res.redirect('/');
});

router.route('/reg')
	.get(function(req, res) {
		res.render('reg', {
			title: '注册'
		});
	})
	.post(function(req, res) {

		pgclient.save('WebUser', {
			'姓名': req.body.username,
			'密码': req.body.password2
		}, function(err) {
			pgclient.select('WebUser', {
				'姓名': req.body.username
			}, '', function(result) {
				if(result[0] === undefined) {
					res.send('注册没有成功请，重新注册');
				} else {
					res.redirect('/login');
				}
			});
		});
	});

module.exports = router;

//添加关联字段查询省GDP表的路由
router.get('/GDPQuery', function(req, res) {
	var code = req.query.code;
	console.log('路由中的code::::::' + code);
	pgclient.selectprovince_gdpByCode('province_gdp', code, '', function(result) {
		if(result[0] === undefined) {
			res.send('返回空值');
		} else {
			res.send(result);
			console.log("返回结果：" + JSON.stringify(result))
		}
	});
});