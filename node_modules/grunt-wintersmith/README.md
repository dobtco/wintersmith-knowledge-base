# grunt-wintersmith

A grunt task for working with the [Wintersmith](https://github.com/jnordberg/wintersmith) static site generator.

## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-wintersmith --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-wintersmith');
```

* This plugin was designed to work with Grunt 0.4.x. If you're still using grunt v0.3.x it's strongly recommended that [you upgrade](http://gruntjs.com/upgrading-from-0.3-to-0.4).

* This plugin was designed to work with Wintersmith 2.x.  If you're still using v1.x, you should upgrade.

## Wintersmith task

_Run this task with the `grunt wintersmith` command._

Each task may include options for setting both the action and the configuration file to be used.

### Options

#### action

Type: `String`
Default: `'build'`

This value currently supports `'build'` or `'preview'`.  If you use `'build'` it will build the site with Wintersmith using either the default or the user defined config file.  If you use `'preview'`, it will run the Wintersmith preview server for either the default or the user defined config file.  Any other value will result in an error.

> It is important to note that `'preview'` is an asychronous task which will run until you end it.  If you want to utilize this alongside a similar task (like [grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch)), you will either need to use another command line window or utilize a grunt plugin which allows for concurrent tasks (like [grunt-concurrent](https://github.com/sindresorhus/grunt-concurrent)).

#### config

Type: `String`
Default: `'./config.json'`

The configuration file to use for the specified task.  By default it utilizes `'./config.json'`, but if you need another value, you may specify it here.

## Sample Grunt Files

If you are utilizing the standard value for config, (which is `./config.json`), then you can simply define your tasks as follows:

```js
module.exports = function(grunt) {
  
  grunt.initConfig({
    
    wintersmith: {
      build: {},
      preview: {
        options: {
          action: "preview"
        }
      }
    }
    
  });

  // Load NPM Task
  grunt.loadNpmTasks('grunt-wintersmith');

};
```

In situations where you want to define separate environments which have separate configurations, or if you need to utilize another configuration file, you can include the `config` option within the options object:

```js
module.exports = function(grunt) {
  
  grunt.initConfig({
    
    wintersmith: {
      staging: {
        options: {
          config: './config-staging.json'
        }
      },
      production: {
        options: {
          config: './config-production.json'
        }
      },
      preview: {
        options: {
          action: "preview",
          config: './config-preview.json'
        }
      }
    } 
  });

  // Load NPM Task
  grunt.loadNpmTasks('grunt-wintersmith');

};
```
