import { FormatTypes, Interface } from "@ethersproject/abi";
import { keccak256 } from "@ethersproject/keccak256";
import { toUtf8Bytes } from "@ethersproject/strings";
import { scope } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";

// tasks
const decode = scope("decode", "decode every thing of a contract");

// `npx hardhat decode error --contract ScoreLend 0xc431f31700000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005f5e100`
decode
  .task("error", "decode error hex string")
  .addParam("contract", "contract name")
  .addPositionalParam("hex", "error hex string")
  .setAction(
    async (
      taskArgs: { contract: string; hex: string },
      hre: HardhatRuntimeEnvironment,
    ) => {
      // hex example: '0xc431f31700000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005f5e100'
      const selector = taskArgs.hex.slice(0, 10);

      const { abi } = await hre.artifacts.readArtifact(taskArgs.contract);
      const i = new Interface(abi);
      const items = i.format(FormatTypes.minimal);
      for (const item of items) {
        // console.log(item);
        if (item.startsWith("error ")) {
          const errorSignature = item.replace("error ", ""); // 'error InsufficientBalance(account,uint256)'
          const errorSelector = keccak256(toUtf8Bytes(errorSignature)).slice(
            0,
            10,
          ); // '0x' + 4 bytes(8 hex chars)
          // console.log(errorSignature, ' |---| ', errorSelector);

          if (selector == errorSelector) {
            const result = i.decodeErrorResult(
              i.getError(errorSignature)!!,
              taskArgs.hex,
            );

            console.log(errorSignature);
            for (const r of result.toArray()) {
              console.log("  >>> ", r.toString());
            }

            break;
          }
        }
      }
    },
  );

// `npx hardhat decode event --contract ScoreLend --topics "0xe73b1871b62362f466ba54a00fd87e47e6049440c729c0618203cd4060bffc1b","0x000000000000000000000000000000000000000000000000000000000000005a","0x0000000000000000000000004d4b78d37090ed3e1eae6779ba2c3d6728052915","0x000000000000000000000000ca152522f26811ff8fcaf967d4040f7c6bbf8eaa" --data 0x00000000000000000000000000000000000000000000000000000000069db9c0000000000000000000000000000000000000000000000259bb71d5adf3f000000000000000000000000000000000000000000000000000000000000000000064000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000667e5e9d0000000000000000000000000000000000000000000000000000000066802f80`
decode
  .task("event", "decode event hex string")
  .addParam("contract", "contract name")
  .addParam("topics", "event topics string")
  .addParam("data", "event data string")
  .setAction(
    async (
      taskArgs: { contract: string; topics: string; data: string },
      hre: HardhatRuntimeEnvironment,
    ) => {
      const { abi } = await hre.artifacts.readArtifact(taskArgs.contract);
      const i = new Interface(abi);
      const items = i.format(FormatTypes.full);
      for (const item of items) {
        // console.log(item);
        if (item.startsWith("event ")) {
          const eventSignature = item.replace("event ", ""); // 'event Borrow(uint256 indexed,address indexed,address indexed,uint256,uint256,uint256,uint8,uint256,uint256)'
          const eventHash = i.getEventTopic(i.getEvent(eventSignature));
          // console.log(eventSignature, " |---| ", eventHash);

          const topics = taskArgs.topics.split(",");
          if (topics[0] == eventHash) {
            const result = i.decodeEventLog(
              i.getEvent(eventSignature)!!,
              taskArgs.data,
              topics,
            );

            for (const r of result.toArray()) {
              console.log("  >>> ", r.toString());
            }

            break;
          }
        }
      }
    },
  );

// `npx hardhat decode function-data --contract ScoreLend 0xc5ebeaec0000000000000000000000000000000000000000000000000000000005f5e100`
decode
  .task("function-data", "decode function data hex string")
  .addParam("contract", "contract name")
  .addPositionalParam("hex", "function data hex string")
  .setAction(
    async (
      taskArgs: { contract: string; hex: string },
      hre: HardhatRuntimeEnvironment,
    ) => {
      // hex example: '0xc5ebeaec0000000000000000000000000000000000000000000000000000000005f5e100'
      const selector = taskArgs.hex.slice(0, 10);

      const { abi } = await hre.artifacts.readArtifact(taskArgs.contract);
      const i = new Interface(abi);
      const items = i.format(FormatTypes.minimal);
      for (const item of items) {
        // console.log(item);
        if (item.startsWith("function ")) {
          const functionSignature = item.replace("function ", ""); // 'function borrow(uint256)'
          const functionSelector = keccak256(
            toUtf8Bytes(functionSignature),
          ).slice(0, 10); // '0x' + 4 bytes(8 hex chars)
          // console.log(functionSignature, ' |---| ', functionSelector);

          if (selector == functionSelector) {
            const result = i.decodeFunctionData(
              i.getFunction(functionSignature)!!,
              taskArgs.hex,
            );

            console.log(functionSignature);
            for (const r of result.toArray()) {
              console.log("  >>> ", r.toString());
            }

            break;
          }
        }
      }
    },
  );

// `npx hardhat decode function-result --contract ScoreLend 0xc5ebeaec0000000000000000000000000000000000000000000000000000000005f5e100`
decode
  .task("function-result", "decode function result hex string")
  .addParam("contract", "contract name")
  .addPositionalParam("hex", "function result hex string")
  .setAction(
    async (
      taskArgs: { contract: string; hex: string },
      hre: HardhatRuntimeEnvironment,
    ) => {
      // hex example: ''
      const selector = taskArgs.hex.slice(0, 10);

      // TODO 未测试

      const { abi } = await hre.artifacts.readArtifact(taskArgs.contract);
      const i = new Interface(abi);
      const items = i.format(FormatTypes.minimal);
      for (const item of items) {
        // console.log(item);
        if (item.startsWith("function ")) {
          const functionSignature = item.replace("function ", ""); // 'function borrowInterestRate() view returns (uint256)'
          const functionSelector = keccak256(
            toUtf8Bytes(functionSignature),
          ).slice(0, 10); // '0x' + 4 bytes(8 hex chars)
          // console.log(functionSignature, ' |---| ', functionSelector);

          if (selector == functionSelector) {
            const result = i.decodeFunctionResult(
              i.getFunction(functionSignature)!!,
              taskArgs.hex,
            );

            console.log(functionSignature);
            for (const r of result.toArray()) {
              console.log("  >>> ", r.toString());
            }

            break;
          }
        }
      }
    },
  );
