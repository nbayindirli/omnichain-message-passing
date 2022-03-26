const hardhat = require("hardhat")
import { ethers } from "hardhat";
import { SatelliteCounter, SatelliteCounter__factory } from "../typechain";
import { CHAIN_IDS_AND_ENDPOINTS } from "./util/chainIdsAndEndpoints";

async function main() {
    console.log('Deploying SatelliteCounter on %s network.', hardhat.network.name);

    const fujiMasterCounterAddress = '0xF2656CCFfd9D4150C4BAecB9e1C0D3100C85C8A9';
    const rinkebySatelliteCounterAddress = '0x4286f9f9dBAd326e08B951331B54607dc1Aaf8e6';
    const mumbaiSatelliteCounterAddress = '0xe3F9324060494352fdE595f97711Ffc80500ADd2';

    const [deployer] = await ethers.getSigners();

    const satelliteCounter: SatelliteCounter = await new SatelliteCounter__factory(deployer).deploy(
        CHAIN_IDS_AND_ENDPOINTS['fuji'].chainId,
        fujiMasterCounterAddress,
        CHAIN_IDS_AND_ENDPOINTS[hardhat.network.name].endpoint
    );

    console.log('%s network SatelliteCounter deployed at %s', hardhat.network.name, satelliteCounter.address);

    // @ts-ignore
    await satelliteCounter.updateCount(20, 0, satelliteCounter.address, { value: ethers.utils.parseEther("0.2") }); // Add 20: 20
    console.log("Successfully called updateCount(20, 0)");
    // @ts-ignore
    await satelliteCounter.updateCount(4, 2, satelliteCounter.address, { value: ethers.utils.parseEther("0.2") }); // Mul 4: 80
    console.log("Successfully called updateCount(4, 2)");
    // @ts-ignore
    await satelliteCounter.updateCount(3, 1, satelliteCounter.address, { value: ethers.utils.parseEther("0.2") }); // Sub 3: 77
    console.log("Successfully called updateCount(3, 1)");
    // @ts-ignore
    await satelliteCounter.getCount(satelliteCounter.address, { value: ethers.utils.parseEther("0.2") }); // 77
    console.log("Successfully called getCount(%s)", satelliteCounter.address);
    // @ts-ignore
    await satelliteCounter.getCount(rinkebySatelliteCounterAddress, { value: ethers.utils.parseEther("0.2") }); // 0
    console.log("Successfully called getCount(%s)", rinkebySatelliteCounterAddress);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
