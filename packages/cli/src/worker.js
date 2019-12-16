const path = require('path');
const { parentPort } = require('worker_threads');
const Comlink = require('comlink');
const nodeEndpoint = require('comlink/dist/umd/node-adapter');

const { init } = require(path.resolve(__dirname, './init'));
const { generateFiles } = require(path.resolve(__dirname, './files'));

init().then(index => {
  const api = {
    exit() {
      process.exit();
    },
    async generateFiles() {
      await generateFiles(index);
    },
  };

  Comlink.expose(api, nodeEndpoint(parentPort));
});
