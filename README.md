# omnichain-message-passing (`Avalanche <-> Ethereum <-> Polygon` via [LayerZero](https://layerzero.gitbook.io/docs/))

## About
Uses the [LayerZero](https://layerzero.gitbook.io/docs/) message passing protocol to update and query the application state of satellite chains (Rinkeby [Ethereum] & Mumbai [Polygon]) via a master chain (Fuji [Avalanche]).

```
                         <--> Rinkeby (ETH Satellite)
                       /
Fuji (AVAX Master) <-->
                       \
                         <--> Mumbai (MATIC Satellite)
```

For this POC, the maintained state is a simple counter, which is associated with each satellite chain.

---

## ChainIDs & Endpoints

* Fuji (Avalanche Testnet)
  * chainId: `10006`
  * endpoint: `0x93f54D755A063cE7bB9e6Ac47Eccc8e33411d706`
* Rinkeby (Ethereum Testnet)
  * chainId: `10001`
  * endpoint: `0x79a63d6d8BBD5c6dfc774dA79bCcD948EAcb53FA`
* Mumbai (Polygon Testnet)
  * chainId: `10009`
  * endpoint: `0xf69186dfBa60DdB133E91E9A4B5673624293d8F8`

See all Layer0 official (testnet) endpoint addresses: https://layerzero.gitbook.io/docs/technical-reference/testnet/contract-addresses

---

## Deployed Contract Addresses

* Fuji (Avalanche Testnet): https://testnet.snowtrace.io/address/0x408F593195bbC0EC582Dcd0CDD003020a8a16929
* Rinkeby (Ethereum Testnet): https://rinkeby.etherscan.io/address/0x914c4486d1435efBB6Ae46E4c9FBF2cA9C71643f
* Mumbai (Polygon Testnet): https://mumbai.polygonscan.com/address/0xCf60FFf0Ad44c019b0DDf591Ab9F69Af720894d7

---

## Commands

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
npx hardhat help
REPORT_GAS=true npx hardhat test
npx hardhat coverage
npx hardhat run scripts/deploy.ts --network ropsten
TS_NODE_FILES=true npx ts-node scripts/deploy.ts
npx eslint '**/*.{js,ts}'
npx eslint '**/*.{js,ts}' --fix
npx prettier '**/*.{json,sol,md}' --check
npx prettier '**/*.{json,sol,md}' --write
npx solhint 'contracts/**/*.sol'
npx solhint 'contracts/**/*.sol' --fix
```
