const bodyParser = require('body-parser');
const app = require('express')();

app.use(bodyParser.json());
app.all('/getJSON', (req, res) => {
  console.log(req);
  res.json({ data: 'data' });
});

module.exports = app;