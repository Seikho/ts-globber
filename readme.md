[![Build Status](https://semaphoreci.com/api/v1/projects/f611cae6-6637-47ba-88ff-1a55a2292700/413283/badge.svg)](https://semaphoreci.com/seikho/ts-globber)

### Ts-globber
Re-propagate the 'files' property of your tsconfig.json.

#### Installation
```
// As a cli-tool
npm install -g ts-globber

// As a node module
npm install ts-globber --save
```

#### Example Usage
```
// CLI
cd ~/projects/myTsProject
tsglob


// Module
var tsglobber = require("ts-globber");
ts-globber();
```