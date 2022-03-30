const hardhat = require("hardhat")
import { ethers } from "hardhat";
import { SatelliteCounter, SatelliteCounter__factory } from "../typechain";
import { CHAIN_IDS_AND_ENDPOINTS } from "./util/chainIdsAndEndpoints";

async function main() {
    console.log('Deploying SatelliteCounter on %s network.', hardhat.network.name);

    const fujiMasterCounterAddress = '0x408F593195bbC0EC582Dcd0CDD003020a8a16929';
    const rinkebySatelliteCounterAddress = '0x914c4486d1435efBB6Ae46E4c9FBF2cA9C71643f';
    const mumbaiSatelliteCounterAddress = '0xCf60FFf0Ad44c019b0DDf591Ab9F69Af720894d7';

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
