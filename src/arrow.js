module.exports = function(file, api) {
  var j = api.jscodeshift;

  return j(file.source)
    .find(j.ArrowFunctionExpression)
    .replaceWith(function(path) {
      var parent = path.parent.value;
      var name = parent.type === 'VariableDeclarator'
        ? parent.id.name
        : null;

      var body = path.value.body;
      var resultBody = body.type === 'BlockStatement'
        ? body
        : j.blockStatement([
          j.returnStatement(body)
        ]);

      return j.functionExpression(
        j.identifier(name),
        path.value.params,
        resultBody
      );
    })
    .toSource();
};
