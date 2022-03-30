interface layerZeroData {
    chainId: number,
    endpoint: string,
    contractAddress: string;
};

interface chain {
    [name: string]: layerZeroData
};

export enum SUPPORTED_NETWORKS {
    FUJI = 'fuji',
    RINKEBY = 'rinkeby',
    MUMBAI = 'mumbai'
};

export const CHAIN_IDS_AND_ENDPOINTS: chain = {
    'fuji': { /* Avalanche Master */
        chainId: 10006,
        endpoint: '0x93f54D755A063cE7bB9e6Ac47Eccc8e33411d706',
        contractAddress: '0x408F593195bbC0EC582Dcd0CDD003020a8a16929'
    },
    'rinkeby': { /* Ethereum Satellite */
        chainId: 10001,
        endpoint: '0x79a63d6d8BBD5c6dfc774dA79bCcD948EAcb53FA',
        contractAddress: '0x914c4486d1435efBB6Ae46E4c9FBF2cA9C71643f'
    },
    'mumbai': { /* Polygon Satellite */
        chainId: 10009,
        endpoint: '0xf69186dfBa60DdB133E91E9A4B5673624293d8F8',
        contractAddress: '0xCf60FFf0Ad44c019b0DDf591Ab9F69Af720894d7'
    }
};
