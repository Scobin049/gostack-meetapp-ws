import app from './app';

var port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log('Server ON');
});
