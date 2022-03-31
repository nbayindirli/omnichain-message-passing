const hardhat = require("hardhat")
import { ethers } from "hardhat";
import { MasterCounter, MasterCounter__factory } from "../typechain";
import { CHAIN_IDS_AND_ENDPOINTS } from "./util/chainIdsAndEndpoints";

async function main() {
    const masterNetwork = hardhat.network.name;

    console.log('Deploying MasterCounter on %s network.', masterNetwork);

    const [deployer] = await ethers.getSigners();

    const masterCounter: MasterCounter = await new MasterCounter__factory(deployer).deploy(
        CHAIN_IDS_AND_ENDPOINTS[masterNetwork].endpoint,
        //@ts-ignore
        { value: ethers.utils.parseEther('3') }
    );

    console.log('MasterCounter deployed at %s on %s network.', masterCounter.address, masterNetwork);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
