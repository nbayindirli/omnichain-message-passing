const hardhat = require("hardhat")
import { ethers } from "hardhat";
import { MasterCounter, MasterCounter__factory } from "../typechain";
import { CHAIN_IDS_AND_ENDPOINTS } from "./util/chainIdsAndEndpoints";

async function main() {

    console.log('Deploying MasterCounter on %s network.', hardhat.network.name);

    const [deployer] = await ethers.getSigners();

    const masterCounter: MasterCounter = await new MasterCounter__factory(deployer).deploy(
        CHAIN_IDS_AND_ENDPOINTS[hardhat.network.name].endpoint
    );

    console.log('%s network MasterCounter deployed at %s', hardhat.network.name, masterCounter.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
