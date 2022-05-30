const bodyParser = require('body-parser');
const app = require('express')();

app.use(bodyParser.json());
app.all('/getJSON', (req, res) => {
  console.log(req);
  return res.send(201).json({ data: 'data' });
});

module.exports = app;
