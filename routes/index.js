var express = require('express');
var router = express.Router();
var pgclient = require('dao/pgHelper');
pgclient.getConnection();
var db_lgy = require('./db_lgy');
/* GET home page. */
router.get('/', function(req, res) {
	if (req.cookies.islogin) {
		req.session.islogin = req.cookies.islogin;
	}
	if (req.session.islogin) {
		res.locals.islogin = req.session.islogin;
	}
	res.render('index', {
		title: 'HOME',
		test: res.locals.islogin
	});
});
router.get('/PrecipitationEcharts_yearcomparison', function(req, res) {
	res.render('PrecipitationEcharts_yearcomparison');
});
router.get('/ndvi1998', function(req, res) {
	res.render('ndvi1998');
});
router.get('/ndvi2016', function(req, res) {
	res.render('ndvi2016');
});
router.get('/ndvi1998', function(req, res) {
	res.render('ndvi1998');
});
router.get('/contourline21', function(req, res) {
	res.render('contourline21');
});
router.get('/contourline22', function(req, res) {
	res.render('contourline22');
});
router.get('/contourline23', function(req, res) {
	res.render('contourline23');
});
router.get('/contourline24', function(req, res) {
	res.render('contourline24');
});
router.get('/dem', function(req, res) {
	res.render('dem');
});
router.get('/PrecipitationYear', function(req, res) {
	var year = req.query.year;
	pgclient.select('precipitation', {
		'year': req.query.year
	}, '', function(data) {
		if (data[0] === undefined) {
			res.send('返回空值');
		} else {
			res.status(200)
				.json({
					data: data
				});
		}
	});
});
router.get('/PrecipitationMonth', function(req, res) {
	var month = req.query.month;
	pgclient.select('precipitation', {
		'month': req.query.month
	}, '', function(data) {
		if (data[0] === undefined) {
			res.send('返回空值');
		} else {
			res.status(200)
				.json({
					data: data
				});
		}
	});
});
router.get('/PrecipitationAll',db_lgy.selectall);
router.get('/protectionline_pilepoint',db_lgy.selectall_protectionline_pilepoint);

router.get('/introduce', function(req, res) {
	res.render('introduce');
});
router.get('/vector', function(req, res) {
	res.render('vector');
});
router.get('/location', function(req, res) {
	res.render('location');
});
router.route('/login')
	.get(function(req, res) {
		if (req.session.islogin) {
			res.locals.islogin = req.session.islogin;
		}

		if (req.cookies.islogin) {
			req.session.islogin = req.cookies.islogin;
		}
		res.render('login', {
			title: '用户登录',
			test: res.locals.islogin
		});
	})
	.post(function(req, res) {

		result = null;
		pgclient.select('userinfo', {
			'name': req.body.username
		}, '', function(result) {
			if (result[0] === undefined) {
				res.send('没有该用户');
			} else {
				if (result[0].password === req.body.password) {
					req.session.islogin = req.body.username;
					res.locals.islogin = req.session.islogin;
					res.cookie('islogin', res.locals.islogin, {
						maxAge: 600000
					});
					res.redirect('/');
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

		pgclient.save('userinfo', {
			'name': req.body.username,
			'password': req.body.password2
		}, function(err) {
			pgclient.select('userinfo', {
				'name': req.body.username
			}, '', function(result) {
				if (result[0] === undefined) {
					res.send('注册没有成功请，重新注册');
				} else {
					req.session.islogin = req.body.username;
					res.locals.islogin = req.session.islogin;
					res.cookie('islogin', res.locals.islogin, {
						maxAge: 600000
					});
					res.redirect('/');
				}
			});
		});
	});

module.exports = router;
