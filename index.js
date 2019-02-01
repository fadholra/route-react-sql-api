var mysql = require('mysql');
var express = require('express');
var app = express(); 
var bodyparser = require('body-parser');
var cors = require('cors');

app.use(cors());
app.use(bodyparser.json());

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'simple-crud-db'
});
 
connection.connect((err) => {
	if (err) throw err;
	console.log('database connected');
});

app.listen(4000, () => console.log('Running on port: 4000'));

app.get('/', (req, res) => {
	res.send('Hello');
})

//get data
app.get('/test', (req, res) => {
	connection.query('SELECT * FROM rute_perjalanan', function (err, result, fields) {
		if (err) console.log(err);
		res.json(result);
	})
});

//delete data
/*app.delete('/test/:no', (req, res) => {
	var sql = 'DELETE FROM rute_perjalanan WHERE no = ?';
	connection.query(sql, req.params.no, (err, result, fields) => {
		if (err) throw err;
		res.send('Delete no ' + req.params.no + ' success!');
	})
})*/

//delete data
app.get('/test/delete/:no', (req, res) => {
	var sql = `DELETE FROM rute_perjalanan WHERE no = ?`;
	connection.query(sql, req.params.no, (err, result, fields) => {
		if (err) console.log(err);
		res.send('Delete no ' + req.params.no + ' success!');
	})
})

//insert data
/*app.post('/test', (req, res) => {
	let x = req.body;
	let y = [x.no, x.perjalanan];
	var sql = 'INSERT INTO rute_perjalanan (no, perjalanan) VALUES (?, ?)';
	connection.query(sql, y, (err, result, fields) => {
		if (err) throw err;
		res.send(y);
	});
})*/

//insert data 
app.get('/test/add', (req, res) => {
	var { no, perjalanan } = req.query;
	var sql = `INSERT INTO rute_perjalanan (no, perjalanan) VALUES (${no}, '${perjalanan}')`;
	connection.query(sql, (err, result) => {
		if (err) console.log(err);
		res.send('successfully added perjalanan');
	}) 
})

//update data
app.get('/test/update/:no', (req, res) => {
	let noDelete = req.params.no;
	var { no, perjalanan } = req.query;
	var sql = `UPDATE rute_perjalanan SET no = ${no}, perjalanan = '${perjalanan}' WHERE no = ${noDelete}`;
	connection.query(sql, (err, result) => {
		if (err) console.log(err);
		res.send('Updated');
	})
})