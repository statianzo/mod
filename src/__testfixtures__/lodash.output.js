var jquery = require("jquery");
var _ = require("lodash");

var favorite = _.find([1,2,3], function(x) {
  return x > 2;
});

var reguniq = _.uniq([1,-1]);

var absuniq = _.uniqBy([1,-1], function(x) {
  return Math.abs(x);
});
