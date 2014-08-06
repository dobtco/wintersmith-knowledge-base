/* generator.coffee*/


(function() {
  var ContentPlugin, ContentTree, runGenerator, _ref;

  _ref = require('./content'), ContentPlugin = _ref.ContentPlugin, ContentTree = _ref.ContentTree;

  runGenerator = function(env, contents, generator, callback) {
    var groups, resolve;
    groups = env.getContentGroups();
    resolve = function(root, items) {
      var item, key, tree, _results;
      _results = [];
      for (key in items) {
        item = items[key];
        if (item instanceof ContentPlugin) {
          item.parent = root;
          item.__env = env;
          item.__filename = 'generator';
          item.__plugin = generator;
          root[key] = item;
          _results.push(root._[generator.group].push(item));
        } else if (item instanceof Object) {
          tree = new ContentTree(key, groups);
          tree.parent = root;
          tree.parent._.directories.push(tree);
          root[key] = tree;
          _results.push(resolve(root[key], item));
        } else {
          throw new Error("Invalid item for '" + key + "' encountered when resolving generator output");
        }
      }
      return _results;
    };
    return generator.fn(contents, function(error, generated) {
      var tree;
      tree = new ContentTree('', groups);
      try {
        resolve(tree, generated);
      } catch (_error) {
        error = _error;
        return callback(error);
      }
      return callback(null, tree);
    });
  };

  /* Exports*/


  module.exports = {
    runGenerator: runGenerator
  };

}).call(this);
