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
        contractAddress: '0x6606E4ce7f3caEa836970037Df05D1eA9311E138'
    },
    'rinkeby': { /* Ethereum Satellite */
        chainId: 10001,
        endpoint: '0x79a63d6d8BBD5c6dfc774dA79bCcD948EAcb53FA',
        contractAddress: '0x4dBCFBe798776FE44b33a1fa94b81f8463D9def0'
    },
    'mumbai': { /* Polygon Satellite */
        chainId: 10009,
        endpoint: '0xf69186dfBa60DdB133E91E9A4B5673624293d8F8',
        contractAddress: '0xea6e77fBee2D7825377103950D4a4d0161845857'
    }
};
