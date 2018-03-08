module.exports = function(source) {
  // Apply some transformations to the source...
  return source.replace(/data-test=\".+\"/g, '');
};
