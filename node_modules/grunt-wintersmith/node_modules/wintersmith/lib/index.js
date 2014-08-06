(function() {
  var ContentPlugin, ContentTree, Environment, TemplatePlugin, _ref;

  _ref = require('./core/content'), ContentTree = _ref.ContentTree, ContentPlugin = _ref.ContentPlugin;

  Environment = require('./core/environment').Environment;

  TemplatePlugin = require('./core/templates').TemplatePlugin;

  module.exports = function() {
    return Environment.create.apply(null, arguments);
  };

  module.exports.Environment = Environment;

  module.exports.ContentPlugin = ContentPlugin;

  module.exports.ContentTree = ContentTree;

  module.exports.TemplatePlugin = TemplatePlugin;

}).call(this);
