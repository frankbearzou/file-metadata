var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var multer  = require('multer');

var app = express();
// use memory storage because the server has been hosted in heroku.
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });
// var upload = multer({ dest: 'uploads/' });

app.set('PORT', process.env.PORT || 5000);
app.use(express.static(path.join(__dirname, 'public')));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

var type = upload.single('file');

app.post('/get-file-size', type, function (req, res) {
  // req.file is the `file` file
  // req.body will hold the text fields, if there were any

  /*console.log('post');
  var tmp_path = req.file.path;
  var target_path = 'uploads/' + req.file.originalname;

  console.log('tmp_path:', tmp_path);
  console.log('target_path:', target_path);*/

  res.json({
    "name": req.file.originalname,
    "type": req.file.mimetype,
    "size": req.file.size
  });
});

app.listen(app.get('PORT'), () =>
  console.log(`Example app listening on port ${app.get('PORT')}!`)
);
