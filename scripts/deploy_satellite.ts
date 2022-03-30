const hardhat = require("hardhat");
import { ethers } from "hardhat";
import { SatelliteCounter, SatelliteCounter__factory } from "../typechain";
import { CHAIN_IDS_AND_ENDPOINTS, SUPPORTED_NETWORKS } from "./util/chainIdsAndEndpoints";

async function main() {
    const masterNetwork = SUPPORTED_NETWORKS.FUJI;
    const satelliteNetwork = hardhat.network.name;

    console.log('Deploying SatelliteCounter on %s network with %s as MasterCounter network.', satelliteNetwork, masterNetwork);

    const [deployer] = await ethers.getSigners();

    const satelliteCounter: SatelliteCounter = await new SatelliteCounter__factory(deployer).deploy(
        CHAIN_IDS_AND_ENDPOINTS[masterNetwork].chainId,
        CHAIN_IDS_AND_ENDPOINTS[masterNetwork].contractAddress,
        CHAIN_IDS_AND_ENDPOINTS[satelliteNetwork].endpoint
    );

    console.log('SatelliteCounter deployed at %s on %s network with %s MasterCounter.', satelliteCounter.address, satelliteNetwork, masterNetwork);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
