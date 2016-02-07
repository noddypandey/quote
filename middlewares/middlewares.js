var connection=require('./database');
var middleware={};

middleware.authenticate=function(req, res, next){
	connection.query("select * from users where email='"+req.body.email+"' and password='"+req.body.password+"' limit 1", function(err, rows){
		//console.log(rows);
		if(rows.length>0){
			rows.forEach(function(element, index, array){
				req.session.user=element;
				req.session.login=true;
			});
			next();
		}else{
			req.flash('info', ['Either username or password is incorrect!']);
			console.log("User not found");
			res.redirect('login');
		}
	});
}

middleware.authenticated=function(req, res, next){
	if(req.session.login && req.session.login==true){
		next();
	}else{
		res.redirect('login');
	}
}


module.exports=middleware;