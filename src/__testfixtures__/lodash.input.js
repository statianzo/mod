var jquery = require("jquery");
var _ = require("underscore");

var favorite = _.findWhere([1,2,3], function(x) {
  return x > 2;
});

var reguniq = _.uniq([1,-1]);

var absuniq = _.uniq([1,-1], function(x) {
  return Math.abs(x);
});
