var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const wordWeb = require('./wordWeb');
const examples = require(`./word`);
request = require('request-json');
var wordlist = examples.exampleList;
var client = request.createClient('http://localhost:3000/');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  var random1 = Math.floor(Math.random()*(wordlist.length));
  var random2 = Math.floor(Math.random()*(wordlist.length));
  var picAddress = "images/pigu" + random2 + ".jpg";
  var varifiedWord = wordlist[random1];
  const list = [];
	res.send(wordWeb.wordWeb("",wordlist,varifiedWord,list,picAddress));
	// res.send(chatWeb.chatPage(chat));
  });

app.use('/users', usersRouter);

app.post('/submit',(req,res) => {
  obj = JSON.parse(req.body.json);
  console.log(obj.varifiedWord);
  obj.list.push(req.body.text);
  // wordWeb.addList(word,wordlist,list);
  // res.send(wordWeb.wordWeb(word));
  res.send(wordWeb.wordWeb(req.body.text,obj.wordlist,obj.varifiedWord,obj.list,obj.picAddress));
});



app.post('/clear',(req,res) => {
   res.redirect('/');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;