var express = require('express'),
    app = express();

app.get('/hello', function (req, res) {
  res.send('world');
});
app.get('/echo', function (req, res) {
  res.send('your query was:  ' + req.query.echo);
});

if (!module.parent) {
  app.listen(3000);
  console.log('Express server listening on port 3000');
}
