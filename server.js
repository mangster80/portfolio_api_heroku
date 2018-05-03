const express = require('express');
const cors = require('cors');
var mysql = require("mysql");

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const SELECT_ALL_POSTS_QUERY = 'SELECT * FROM guestbook';

const connection = mysql.createConnection({
  host: 'crockett.highstone.biz',
  user: 'portfolio',
  password: 'Portfolio123',
  database: 'mw_guestbook'
});

connection.connect(err => {
  if(err) {
    return err;
  }
});

//console.log(connection);

app.use(cors());

app.get('/', (req, res) => {
  res.send('go to /guestbook to se posts')
})

app.get('/guestbook/add', (req, res) => {
  const { name, message } = req.query;
  const INSERT_POSTS_QUERY = `INSERT INTO guestbook (name, message) VALUES('${name}', '${message}')`
  connection.query(INSERT_POSTS_QUERY, (err, results) => {
    if(err) {
      return res.send(err)
    }
    else {
      return res.send('added post')
    }
  })
  // console.log(name, message);
  // res.send('addning post');
})
app.post('/guestbook', function (req, res) {
  console.log(req.body);
  var query = "INSERT INTO ??(??,??) VALUES (?,?)";
  var inserts = ['guestbook', 'name', 'message', req.body.name, req.body.message];
  //sql = mysql.format(query, inserts);
  query = mysql.format(query,inserts);
  connection.query(query,function(err,rows){
    if(err) {
        res.json({"Error" : true, "Message" : "Error executing MySQL query"});
    } else {
        res.json({"Error" : false, "Message" : "Success"});
    }
});
});
app.get('/guestbook', (req, res) => {
  connection.query(SELECT_ALL_POSTS_QUERY, (err, results) => {
    if(err) {
      return res.send(err)
    }
    else {
      return res.json({
        data: results
      })
    }
  })
})

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server listening to port 4000`);
});

// mysql -h guestbook.cj2oasnjjkll.us-east-2.rds.amazonaws.com -P 3306 -u Magnus


// const express = require('express');
// var mysql = require("mysql");
// var connection = mysql.createConnection({
//   host     : 'crockett.highstone.biz',
//   user     : 'portfolio',
//   password : 'Portfolio123',
//   database : 'kjk_portfolio'
// });
//
// const app = express();
// const port = 8080;
// const bodyParser = require('body-parser');
//
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
//
// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });
//
// app.listen(port);
//
// const student = {
//   firstname: "Lisa",
//   lastname: "LaFlamme",
//   age: 21,
//   classes: ["street", "dancehall", "balett"]
//   };
//
//   const teacher = {
//     firstname: "Adrienne",
//     lastname: "Picard",
//     age: 21,
//     classes: ["street", "dancehall", "balett"]
//     };
//
//     // todo add classes
//
//
// const capitalize = function (string) {
//     return string.charAt(0).toUpperCase() + string.slice(1);
//   };
//
// // todo: functions to return number of students of a class, which dates a student/teacher has depending on classes
//
//
//   let res;
//
//
// app.get('/student', function (req, res) {
//     res.json(student);
// });
//
// app.get('/teacher', function (req, res) {
//   res.json(teacher);
// });
//
// app.get('/comment', function (req, res) {
//   connection.query('SELECT * FROM `comment`', [], function (error, results, fields) {
//   // error will be an Error if one occurred during the query
//   // results will contain the results of the query
//   // fields will contain information about the returned results fields (if any)
//
//   res.json(results);
//
// });
// });
//
// app.post('/comment', function (req, res) {
//   var query = "INSERT INTO ??(??,??) VALUES (?,?)";
//   var inserts = ['comment', 'author', 'body', req.body.author, req.body.body];
//   sql = mysql.format(query, inserts);
//   query = mysql.format(query,inserts);
//   connection.query(query,function(err,rows){
//     if(err) {
//         res.json({"Error" : true, "Message" : "Error executing MySQL query"});
//     } else {
//         res.json({"Error" : false, "Message" : "Comment Added !"});
//     }
// });
// });
// // todo add classes endpoint
//
// console.log(`App listening on port ${port}`);
