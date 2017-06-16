const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const Pusher = require('pusher');

require('dotenv').config();

const app = express();

const routes = express.Router();

app.use(express.static('./public'));
app.use(express.static('./client/build'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

routes.get('/site', function(req, res){
  res.sendFile(path.join( __dirname, './public/index.html'));
});

routes.get('/listener', function(req, res){
  res.sendFile(path.join( __dirname, './public/listener.html'));
});

routes.get('/sender', function(req, res){
  res.sendFile(path.join( __dirname, './client/build/index.html'));
});

routes.post('/send', (req, res) => {
  var pusher = new Pusher({
    appId: process.env.APPID,
    key: process.env.KEY,
    secret: process.env.SECRET,
    cluster: 'us2',
    encrypted: true
  });

  pusher.trigger('my-channel', 'my-event', {
    "message": req.body.message
  });
});

app.use(routes);

app.set('port', (3000));

app.listen(app.get('port'), () => {
    console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
