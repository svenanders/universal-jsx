const Svenjs = require('svenjs');
const App = require("./app");
const rootNode = document.getElementById('myapp');
Svenjs.render(
  App,
  rootNode
);
