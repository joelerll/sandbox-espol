var localtunnel = require('localtunnel');

var tunnel = localtunnel(4000, { subdomain: 'sandbox'}, function(err, tunnel) {
    if (err) {
      console.log('error');
    }
    console.log(tunnel);
});

tunnel.on('close', function() {
    console.log('tunnel cerrado');
});
