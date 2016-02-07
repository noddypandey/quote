var express=require('express');
var routes=express.Router();
var connection=require("../middlewares/database");
var middlewares=require("../middlewares/middlewares");


routes.get("/login", function(req, res){

	if(req.session.login && req.session.login==true){
		res.redirect("dashboard");
	}

	res.render("login", {title : "Login Page"});
});


routes.get("/register", function(req, res){
	res.render("register", {title : "Register Page"});
});

routes.post("/login", middlewares.authenticate, function(req, res){
	res.redirect('dashboard');
});


routes.post("/register", function(req, res){
	//res.render("register", {title : "Register Page"});
});


routes.get("/dashboard", middlewares.authenticated, function(req, res){
	res.send("Hello "+ req.session.user.name);
});

routes.get('/logout', function(req, res){
	req.session=null;
	res.redirect('login');
});

routes.get("/users", function(req, res){
	connection.query("select * from users", function(err, rows){
		res.send(rows);
	});
});

routes.get("/user", function(req, res){
	res.render("users", {title:"Users Page"});
});

routes.get("/socket", function(req, res){
	res.render("socket", {title:"Socket Page"});
});

module.exports=routes;