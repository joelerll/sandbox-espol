var colors = require('colors');

module.exports.log = function consoleTest( string ) {
  if ( process.env.NODE_ENV !== 'test' ) {
    console.log( string );
  }
}

module.exports.colors = colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red'
});
