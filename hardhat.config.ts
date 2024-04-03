import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    local: {
      url: "http://127.0.0.1:8545",
      // chainId: 123454321,
      //0x3497440233490aecf30d4fb26c04a1750ef0cab4
      accounts: ["0xafecabd64d696b0d0e3e805b5aa6266e43a311352ae89ace446f4064b5341589"],
    }
  },
};

export default config;
