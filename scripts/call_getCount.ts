const hardhat = require("hardhat")
import { ethers } from "hardhat";
import { SatelliteCounter } from "../typechain";
import { CHAIN_IDS_AND_ENDPOINTS } from "./util/chainIdsAndEndpoints";

async function main() {
    const satelliteNetwork = hardhat.network.name;

    const satelliteCounter: SatelliteCounter = await ethers.getContractAt("SatelliteCounter", CHAIN_IDS_AND_ENDPOINTS[satelliteNetwork].contractAddress);

    console.log("Retrieved SatelliteCounter at %s on %s network.", satelliteCounter.address, satelliteNetwork);

    const satelliteCounterAddress = satelliteCounter.address;
    const msg_value = '0.05';

    console.log("Calling getCount(%s) for %s on %s network...", satelliteCounterAddress, satelliteCounter.address, satelliteNetwork);

    // @ts-ignore
    await (await satelliteCounter.getCount(satelliteCounterAddress, { value: ethers.utils.parseEther(msg_value) })).wait();

    console.log("Successfully called getCount(%s) for %s on %s network.", satelliteCounterAddress, satelliteCounter.address, satelliteNetwork);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
