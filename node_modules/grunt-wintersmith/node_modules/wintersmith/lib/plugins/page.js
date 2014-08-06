(function() {
  var async, path, replaceAll, slugify,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  path = require('path');

  async = require('async');

  slugify = require('slugg');

  replaceAll = function(string, map) {
    var re;
    re = new RegExp(Object.keys(map).join('|'), 'gi');
    return string.replace(re, function(match) {
      return map[match];
    });
  };

  module.exports = function(env, callback) {
    var Page, templateView;
    templateView = function(env, locals, contents, templates, callback) {
      /* Content view that expects content to have a @template instance var that
          matches a template in *templates*. Calls *callback* with output of template
          or null if @template is set to 'none'.
      */

      var ctx, template;
      if (this.template === 'none') {
        return callback(null, null);
      }
      template = templates[this.template];
      if (template == null) {
        callback(new Error("page '" + this.filename + "' specifies unknown template '" + this.template + "'"));
        return;
      }
      ctx = {
        page: this
      };
      env.utils.extend(ctx, locals);
      return template.render(ctx, callback);
    };
    Page = (function(_super) {
      __extends(Page, _super);

      /* Page base class, a page is content that has metadata, html and a template that renders it*/


      function Page(filepath, metadata) {
        this.filepath = filepath;
        this.metadata = metadata;
      }

      Page.prototype.getFilename = function() {
        /* Returns the filename for this page based on the filename template.
            The default template (filenameTemplate config key) is ':file.html'.
        
            Available variables:
        
              :year - Full year from page.date
              :month - Zero-padded month from page.date
              :day - Zero-padded day from page.date
              :title - Slugified version of page.title
              :basename - filename from @filepath
              :file - basename without file extension
              :ext - file extension
        
            You can also run javascript by wrapping it in double moustaches {{ }}, in that context
            this page instance is available as *page* and the environment as *env*.
        
            Examples:
        
              (for a page with the filename somedir/myfile.md and date set to 2001-02-03)
        
              template: :file.html (default)
              output: somedir/myfile.html
        
              template: /:year/:month/:day/index.html
              output: 2001/02/03/index.html
        
              template: :year-:title.html
              output: somedir/2001-slugified-title.html
        
              template: /otherdir/{{ page.metadata.category }}/:basename
              output: otherdir/the-category/myfile.md
        */

        var basename, ctx, dirname, ext, file, filename, template, vm,
          _this = this;
        template = this.filenameTemplate;
        dirname = path.dirname(this.filepath.relative);
        basename = path.basename(this.filepath.relative);
        file = env.utils.stripExtension(basename);
        ext = path.extname(basename);
        filename = replaceAll(template, {
          ':year': this.date.getFullYear(),
          ':month': ('0' + (this.date.getMonth() + 1)).slice(-2),
          ':day': ('0' + this.date.getDate()).slice(-2),
          ':title': slugify(this.title + ''),
          ':file': file,
          ':ext': ext,
          ':basename': basename,
          ':dirname': dirname
        });
        vm = ctx = null;
        filename = filename.replace(/\{\{(.*?)\}\}/g, function(match, code) {
          if (vm == null) {
            vm = require('vm');
          }
          if (ctx == null) {
            ctx = vm.createContext({
              env: env,
              page: _this
            });
          }
          return vm.runInContext(code, ctx);
        });
        if (filename[0] === '/') {
          return filename.slice(1);
        } else {
          return path.join(dirname, filename);
        }
      };

      Page.prototype.getUrl = function(base) {
        return Page.__super__.getUrl.call(this, base).replace(/([\/^])index\.html$/, '$1');
      };

      Page.prototype.getView = function() {
        return this.metadata.view || 'template';
      };

      /* Page specific properties*/


      Page.property('html', 'getHtml');

      Page.prototype.getHtml = function(base) {
        if (base == null) {
          base = env.config.baseUrl;
        }
        /* return html with all urls resolved using *base**/

        throw new Error('Not implemented.');
      };

      Page.property('intro', 'getIntro');

      Page.prototype.getIntro = function(base) {
        var cutoff, cutoffs, html, i, idx, _i, _len;
        html = this.getHtml(base);
        cutoffs = ['<span class="more', '<h2', '<hr'];
        idx = Infinity;
        for (_i = 0, _len = cutoffs.length; _i < _len; _i++) {
          cutoff = cutoffs[_i];
          i = html.indexOf(cutoff);
          if (i !== -1 && i < idx) {
            idx = i;
          }
        }
        if (idx !== Infinity) {
          return html.substr(0, idx);
        } else {
          return html;
        }
      };

      Page.property('filenameTemplate', 'getFilenameTemplate');

      Page.prototype.getFilenameTemplate = function() {
        return this.metadata.filename || env.config.filenameTemplate || ':file.html';
      };

      /* Template property used by the 'template' view*/


      Page.property('template', 'getTemplate');

      Page.prototype.getTemplate = function() {
        return this.metadata.template || env.config.defaultTemplate || 'none';
      };

      Page.property('title', function() {
        return this.metadata.title || 'Untitled';
      });

      Page.property('date', function() {
        return new Date(this.metadata.date || 0);
      });

      Page.property('rfc822date', function() {
        return env.utils.rfc822(this.date);
      });

      Page.property('hasMore', function() {
        if (this._html == null) {
          this._html = this.getHtml();
        }
        if (this._intro == null) {
          this._intro = this.getIntro();
        }
        if (this._hasMore == null) {
          this._hasMore = this._html.length > this._intro.length;
        }
        return this._hasMore;
      });

      return Page;

    })(env.ContentPlugin);
    env.plugins.Page = Page;
    env.registerView('template', templateView);
    return callback();
  };

}).call(this);
