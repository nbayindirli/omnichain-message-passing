const hardhat = require("hardhat")
import { ethers } from "hardhat";
import { SatelliteCounter } from "../typechain";
import { CHAIN_IDS_AND_ENDPOINTS } from "./util/chainIdsAndEndpoints";

async function main() {
    const satelliteNetwork = hardhat.network.name;

    const satelliteCounter: SatelliteCounter = await ethers.getContractAt("SatelliteCounter", CHAIN_IDS_AND_ENDPOINTS[satelliteNetwork].contractAddress);

    console.log("Retrieved SatelliteCounter at %s on %s network.", satelliteCounter.address, satelliteNetwork);

    const value = 17;
    const op = 0;
    const msg_value = '0.66';

    console.log("Calling updateCount(value: %s, op: %s) for %s on %s network...", value, op, satelliteCounter.address, satelliteNetwork);

    // @ts-ignore
    await (await satelliteCounter.updateCount(value, op, satelliteCounter.address, { value: ethers.utils.parseEther(msg_value) })).wait();

    console.log("Successfully called updateCount(value: %s, op: %s) for %s on %s network.", value, op, satelliteCounter.address, satelliteNetwork);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
