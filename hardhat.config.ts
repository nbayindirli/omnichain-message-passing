import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";

dotenv.config();

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners();

    for (const account of accounts) {
        console.log(account.address);
    }
});

const getAccounts = function () {
    return process.env.MASK_PRIVATE_KEY_A1 !== undefined ? [process.env.MASK_PRIVATE_KEY_A1] : [];
};

const config: HardhatUserConfig = {
    solidity: "0.8.4",
    networks: {
        fuji: {
            url: process.env.FUJI_TESTNET_URL || "",
            accounts: getAccounts(),
            chainId: 43113,
            gas: 2200000
        },
        rinkeby: {
            url: process.env.RINKEBY_ALCHEMY_NOAHBAY_URL || "",
            accounts: getAccounts(),
            chainId: 4,
            gas: 2200000
        },
        mumbai: {
            url: process.env.MUMBAI_TESTNET_URL || "",
            accounts: getAccounts(),
            gas: 2200000
        }
    },
    gasReporter: {
        enabled: true,
        currency: "USD",
    },
    etherscan: {
        apiKey: process.env.ETHERSCAN_PREP_API_KEY,
    },
};

export default config;
