# webpack-context-relative-resolver

If you have a `create-react-app` with `NODE_PATH` set, you can use this plugin to have multiple CRA on the same repository and compile them all from a single webpack configuration at the top of the repository.

Usage:
```
ProjectRelativeResolver([
  {
    root: /packages\/app1/,
    NODE_PATH: './',
  },
  {
    root: /packages\/app2/,
    NODE_PATH: './src',
  },
])
```
