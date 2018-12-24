var express = require('express');
var router = express.Router();
var pgclient =require('dao/pgHelper');

/**
 * 查询列表页
 */
router.get('/', function (req, res, next) {
    //页面跳转时，如果要保留登录信息，需要增加session的传递
    if(req.cookies.islogin){
        req.session.islogin=req.cookies.islogin;
    }
    if(req.session.islogin){
        res.locals.islogin=req.session.islogin;
    }
    //查数据库protectionline_pilepoint表并获取表中所有数据
    pgclient.ss('protectionline_pilepoint','','',function (result) {
        //console.log(result);
        if(result[0]===undefined){
            res.send('没有用户信息！');
        }else{
           	//页面跳转时，如果要保留登录信息，需要增加session的传递
            res.render('users', {title: '桩点信息查询', datas: result,test:res.locals.islogin});
        }
    })
});

/**
 * 增
 */
router.route('/add')
    .get(function(req,res){
        res.render('users_add',{title:'新增桩点'});
    })
    .post(function(req,res) {
        
		pgclient.save('protectionline_pilepoint',{'id': req.body.id,'longitude': req.body.longitude,'latitude': req.body.latitude,'location': req.body.location}, function (err) {
            pgclient.select('protectionline_pilepoint',{'id': req.body.id},'', function (result) {
				if(result[0]===undefined){
					res.send('桩点添加未成功，请重新输入');
				}else{
//					res.send('添加成功！');
					res.redirect('/users');
				}
			}); 
        });
    });

/**
 * 删
 */
router.get('/del/:id', function (req, res) {
    console.log('id:'+req.params.id);
    pgclient.remove('protectionline_pilepoint',{'id': req.params.id},function(err){
        if (err !='') {
            res.send("桩点删除失败："+err)
        } else {
            res.redirect('/users')
        }
    });
});


/**
 * 改
 */
router.get('/toUpdate/:id', function (req, res) {
    //页面跳转时，如果要保留登录信息，需要增加session的传递
    if(req.cookies.islogin){
        req.session.islogin=req.cookies.islogin;
    }
    if(req.session.islogin){
        res.locals.islogin=req.session.islogin;
    }
    var id = req.params.id;
    console.log(id);
    pgclient.select('protectionline_pilepoint',{'id':id},'',function (result) {
        if(result[0]===undefined){
            res.send('修改失败！');
        }else{
            res.render("users_update", {title: '桩点信息更新', datas: result,test:res.locals.islogin});       //直接跳转,自动补全修改页面的信息
        }
    });
});

/**
 * 改
 */
router.post('/update', function (req, res) {
    var id = req.body.id;
    console.log('id===='+id);
    var longitude = req.body.longitude;
    var latitude = req.body.latitude;
    var location = req.body.location;
	console.log(id+','+longitude+','+latitude+','+location);
    pgclient.update('protectionline_pilepoint',{'id':id},{'longitude':longitude,'latitude':latitude,'location':location},function (err) {
        if (err !='') {
            res.send("修改失败："+err)
        } else {
            res.redirect('/users');
        }
    });
});

/**
 * 查
 */
router.post('/search', function (req, res) {
    //获取页面中搜索框中的参数
    var id = req.body.s_id;
	var location = req.body.s_location;
     //页面跳转时，如果要保留登录信息，需要增加session的传递
    if(req.cookies.islogin){
        req.session.islogin=req.cookies.islogin;
    }
    if(req.session.islogin){
        res.locals.islogin=req.session.islogin;
    }
    
    //如果id和location都为空，则查询所有信息；
    if(!id&&!location){
        //查数据库protectionline_pilepoint表并获取表中所有数据
        pgclient.select('protectionline_pilepoint','','',function (result) {
            //console.log(result);
            if(result[0]===undefined){
                res.send('没有桩点信息！');
            }else{
                //页面跳转时，如果要保留登录信息，需要增加session的传递
                res.render('users', {title: '桩点查询', datas: result,test:res.locals.islogin});
            }
        })
    }
    if(id&&!location){
        pgclient.select('protectionline_pilepoint',{'id':id},'',function (result) {
            if(result[0]===undefined){
                res.send('没有桩点信息！');
            }else{
                res.render("users", {title: '桩点查询', datas: result,test:res.locals.islogin}); 
            }
        });
    }
	if(location&&!id){
		pgclient.select('protectionline_pilepoint',{'location':location},'',function (result) {
			if(result[0]===undefined){
				res.send('没有桩点信息！');
			}else{
				res.render("users", {title: '桩点查询', datas: result,test:res.locals.islogin}); 
			}
		});
	}
    if(location&&id){
        pgclient.select('protectionline_pilepoint',{'location':location,'id':id},'',function (result) {
            if(result[0]===undefined){
				
                res.send('没有桩点信息！');
            }else{
                res.render("users", {title: '桩点查询', datas: result,test:res.locals.islogin});
            }
        });
    }
    
});

module.exports = router;
