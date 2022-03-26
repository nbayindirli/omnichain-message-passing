interface layerZeroData {
    chainId: number,
    endpoint: string
};

interface chain {
    [name: string]: layerZeroData
};

export const CHAIN_IDS_AND_ENDPOINTS: chain = {
    'fuji': { /* Avalanche Master */
        chainId: 10006,
        endpoint: '0x93f54D755A063cE7bB9e6Ac47Eccc8e33411d706'
    },
    'rinkeby': { /* Ethereum Satellite */
        chainId: 10001,
        endpoint: '0x79a63d6d8BBD5c6dfc774dA79bCcD948EAcb53FA'
    },
    'mumbai': { /* Polygon Satellite */
        chainId: 10009,
        endpoint: '0xf69186dfBa60DdB133E91E9A4B5673624293d8F8'
    }
};
