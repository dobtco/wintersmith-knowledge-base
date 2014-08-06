# wintersmith-stylus

[stylus](http://learnboost.github.com/stylus/docs/js.html) plugin for [wintersmith](https://github.com/jnordberg/wintersmith).

Now works with [nib](http://visionmedia.github.com/nib/).

### install:

`npm install wintersmith-stylus -g`
then add `wintersmith-stylus` to your plugins in the wintersmith config

or locally,

    npm install wintersmith-stylus
  
then add `./node_modules/wintersmith-stylus/` to `config.json` like:

    {
      "locals": {
        "url": "http://localhost:8080",
        "name": "The Wintersmith's blog",
        "owner": "The Wintersmith",
        "description": "-32°C ain't no problems!",
        "index_articles": 3
      },
      "plugins": [
        "./node_modules/wintersmith-stylus/"
      ]
    }
    

### Test

Test is written using [Mocha](http://visionmedia.github.com/mocha/). Install it globally, then run

    $ mocha
