## Hardhat Decode

#### 1. Install

```
$ npm install --save-dev hardhat-decode
# or
$ yarn add --dev hardhat-decode
```

#### 2. Included Commands

- Decode custom error: `npx hardhat decode error --contract <contract name> <error hex string>`
- Decode event: `npx hardhat decode event --contract <contract name> --topics "0x...Topic1","0x...Topic2","0x...Topic3" --data 0x...Data`
- Decode function data: `npx hardhat decode function-data --contract <contract name> <function data hex string>`
- Decode function result: `npx hardhat decode function-result --contract <contract name> <function result hex string>`

#### 3. Usage

Load plugin in Hardhat config:

```
require('hardhat-decode');
# or
import 'hardhat-decode';
```

Enjoy!

#### 4. Version History

- v0.1.0 (2024/06/28)
  * init release
