var express = require('express')  
var mongojs = require('mongojs');

var cString= "mongodb+srv://kusuma:Kusuma2000@cluster0.nrt0w.mongodb.net/project?retryWrites=true&w=majority";
var db = mongojs(cString, ['users'])


var app = express()  
  
app.use(express.static('public')); 

app.set('view engine','ejs'); 

app.get('/', function (req, res) {  
res.sendFile(__dirname+"public/index.html")  
})  


app.get('/signupSubmit',function(req,res){
	console.log(req.query.fname)
	var d = {
		firstName : req.query.fname,
		email : req.query.email,
		password : req.query.pswd,
		college : req.query.college
	}
	db.users.insert(d,function(err,docs){
		if(err) {
			res.send("Something went wrong")
		}
		else {
			res.sendFile(__dirname+"/public/login.html")
		}
	})


})

app.get('/loginSubmit',function(req,res){
	var d = {
		email:req.query.email_id,
		password : req.query.pass_word
	}
	db.users.find(d,function(err,docs){
		if(err){
			res.send("Something went wrong")
		}
		if(docs.length>0){
			db.users.find({},function(err,docs){
				if(err){
					res.send("something went wrong")
				}
				else {
					res.render("dashboard",{data:docs})
				}
			})
		}
		else {
			res.send("please check your username and password")
		}
	})
})





  
app.listen(3000, function () {  
console.log('Example app listening on port 3000!')  
})