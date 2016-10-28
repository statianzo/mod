module.exports = function(file, api) {
  var j = api.jscodeshift;
  var ast = j(file.source);

  ast
    .find(j.CallExpression, {
      callee: {name: 'require'},
      arguments: [{value: 'underscore'}],
    })
    .replaceWith((p) => (
      j.callExpression(
        j.identifier('require'),
        [j.literal('lodash')]
      )
    ));

  ast
    .find(j.CallExpression, {
      callee: {
        object: {name: '_'},
        property: {name: 'findWhere'},
      }
    })
    .replaceWith((p) => (
      j.callExpression(
        j.memberExpression(j.identifier('_'), j.identifier('find')),
        p.value.arguments
      )
    ));

  ast
    .find(j.CallExpression, {
      callee: {
        object: {name: '_'},
        property: {name: 'uniq'},
      },
      arguments: (args) => args.length == 2
    })
    .replaceWith((p) => (
      j.callExpression(
        j.memberExpression(j.identifier('_'), j.identifier('uniqBy')),
        p.value.arguments
      )
    ));


  return ast.toSource();
};
