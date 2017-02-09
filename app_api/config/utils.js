module.exports.log = function consoleTest( string ) {
  if ( process.env.NODE_ENV !== 'test' ) {
    console.log( string );
  }
}
