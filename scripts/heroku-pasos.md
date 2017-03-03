heroku create

heroku config:set MONGOLAB_URI=""
 heroku ps:scale web=1


 "start": "node ./bin/www",
 "postinstall": "bower install",

 "bower": "^1.8.0", en
