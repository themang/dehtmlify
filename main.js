var through = require('through');

module.exports = function(file) {
  var output = '';
  if(! /\.html|\.md$/.test(file))
    return through();

  return through(function(buf) {
    output += buf;
  }, function() {
    this.queue('module.exports = decodeURI("' + encodeURI(output) + '");');
    this.queue(null);
  });
}
