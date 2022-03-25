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

const config: HardhatUserConfig = {
    solidity: "0.8.10",
    networks: {
        fuji: {
            url: "https://api.avax-test.network/ext/bc/C/rpc",
            accounts:
                process.env.MASK_PRIVATE_KEY_A1 !== undefined ? [`0x${process.env.MASK_PRIVATE_KEY_A1}`] : [],
            chainId: 43113,
            gasPrice: 225000000000
        },
        rinkeby: {
            url: process.env.ALCHEMY_PREP_URL_RINKEBY || "",
            accounts:
                process.env.MASK_PRIVATE_KEY_A1 !== undefined ? [process.env.MASK_PRIVATE_KEY_A1] : [],
        },
        mumbai: {
            url: "https://rpc-mumbai.maticvigil.com",
            accounts:
                process.env.MASK_PRIVATE_KEY_A1 !== undefined ? [process.env.MASK_PRIVATE_KEY_A1] : [],
            gasPrice: 8000000000
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
