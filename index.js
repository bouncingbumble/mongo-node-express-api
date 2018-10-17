var express = require('express'),
    app = express(),
    port = 3000,
    bodyParser = require('body-parser'),
    todoRoutes = require('./routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => { res.sendFile('index.html') })
app.use('/api/todos', todoRoutes);

//server
app.listen(port, () => {
    console.log('App is running on port ' + port);
})