const { relative } = require('path');

function canBeResolvedAlready(request) {
  try {
    require.resolve(request);
    return true;
  } catch (err) {
    return false;
  }
}

const ContextRelativeResolver = paths => ({
  apply: function(resolver) {
    resolver.plugin('module', function(request, callback) {
      if (
        request.request &&
        !request.request.startsWith('.') &&
        !canBeResolvedAlready(request.request)
      ) {
        const path = paths.find(path => request.path.match(path.root) !== null);
        if (!path) {
          return callback();
        }

        const match = request.path.match(path.root)[0];
        const parts = request.path.split(match);
        const root = request.path.split(parts[1])[0];
        const req = this.join(path.NODE_PATH, request.request);

        const obj = {
          ...request,
          request: relative(request.path, this.join(root, req)),
        };

        this.doResolve('resolve', obj, `resolved as ${req}`, callback);
      } else {
        callback();
      }
    });
  },
});

module.exports = ContextRelativeResolver;
