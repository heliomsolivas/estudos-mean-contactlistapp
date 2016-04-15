var express =  require('express');
var mongojs = require('mongojs');
var bodyParser = require('body-parser');
//BD remoto , nome da coleção
var db = mongojs('mongodb://admin:admin@ds023530.mlab.com:23530/contactlist', ['contactlist']);
var app = express();


//Usando o express pra indicar que a pasta public é o root
app.use(express.static(__dirname + "/public")); 

//Fazer o parse do body
app.use(bodyParser.json());

//Faz o Get com o conteúdo, passando o conteúdo como resposta em json para o contactList
app.get('/contactList', function(req, res){
	console.log("I received a GET request!");

	db.contactlist.find(function(err, docs){
		console.log(docs);
		res.json(docs);
	})
});

//Fazendo o Post no BD
app.post('/contactList', function(req, res){
	console.log(req.body);
	//Precisa do req.body para enviar o post
	db.contactlist.insert(req.body, function(err, doc){
		res.json(doc);
	})
});

//Pegando o ID para o delete
app.delete('/contactlist/:id', function(req, res){
	var id = req.params.id;
	console.log(id);
	db.contactlist.remove({_id:mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	})
});

//Editando
app.get('/contactlist/:id', function(req, res){
	var id = req.params.id;
	console.log(id);
	db.contactlist.findOne({_id:mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	})
});

//Update
app.put('/contactlist/:id', function(req, res){
	var id = req.params.id;
	console.log(req.body.name);
	db.contactlist.findAndModify({query: {_id: mongojs.ObjectId(id)}, 
		update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
		new: true}, function(err, doc){
		res.json(doc);
	});
});

app.listen(3000);
console.log('Server running on port 3000');