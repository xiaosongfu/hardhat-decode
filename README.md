## Hardhat Decode

This is a hardhat plugin used to decode smart contract's error、event、function-data and function-result.

> We also provide a website [easydecode.dev](https://easydecode.dev/) for commonly use case.

#### 1. Install

```shell
$ npm install --save-dev hardhat-decode
# or
$ yarn add --dev hardhat-decode
```

#### 2. Included Commands

- Decode custom error: `npx hardhat decode error --contract <contract name> <error hex string>`
- Decode event: `npx hardhat decode event --contract <contract name> --topics 0x...Topic1,0x...Topic2,0x...Topic3 --data 0x...Data`
- Decode function data: `npx hardhat decode function-data --contract <contract name> <function data hex string>`
- Decode function result: `npx hardhat decode function-result --contract <contract name> <function result hex string>`

For example, we have an ERC20 contract in our hardhat project, named `USDT` and we want to decode a unknown function-data:

```shell
$ npx hardhat decode function-data --contract USDT 0x40c10f19000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb922660000000000000000000000000000000000000000000000000000000000989680
mint(address,uint256)
  >>>  0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
  >>>  10000000
```

#### 3. Usage

Load plugin in Hardhat config:

```javascript
require('hardhat-decode');
// or
import 'hardhat-decode';
```

Enjoy!

#### 4. Version History

- v0.1.0 (2024/06/28)
  * init release
