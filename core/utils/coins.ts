import { capFirstLetter } from ".";

interface CoinInfo {
  [key: string]: readonly [string, string];
}

export const evmCoinTypeToNameMap: CoinInfo = {
    /* Chain ID: 10 */
    "2147483658": ["op", "Optimism"],
    /* Chain ID: 25 */
    "2147483673": ["cro", "Cronos"],
    /* Chain ID: 56 */
    "2147483704": ["bsc", "BNB Smart Chain"],
    /* Chain ID: 60 */
    "2147483708": ["go", "GoChain"],
    /* Chain ID: 61 */
    "2147483709": ["etc", "Ethereum Classic"],
    /* Chain ID: 88 */
    "2147483736": ["tomo", "TomoChain"],
    /* Chain ID: 99 */
    "2147483747": ["poa", "POA"],
    /* Chain ID: 100 */
    "2147483748": ["gno", "Gnosis"],
    /* Chain ID: 108 */
    "2147483756": ["tt", "ThunderCore"],
    /* Chain ID: 137 */
    "2147483785": ["matic", "Polygon"],
    /* Chain ID: 169 */
    "2147483817": ["manta", "Manta Pacific"],
    /* Chain ID: 246 */
    "2147483894": ["ewt", "Energy Web"],
    /* Chain ID: 250 */
    "2147483898": ["ftm", "Fantom Opera"],
    /* Chain ID: 288 */
    "2147483936": ["boba", "Boba"],
    /* Chain ID: 324 */
    "2147483972": ["zksync", "zkSync"],
    /* Chain ID: 361 */
    "2147484009": ["theta", "Theta"],
    /* Chain ID: 820 */
    "2147484468": ["clo", "Callisto"],
    /* Chain ID: 1088 */
    "2147484736": ["metis", "Metis"],
    /* Chain ID: 5000 */
    "2147488648": ["mantle", "Mantle"],
    /* Chain ID: 8453 */
    "2147492101": ["base", "Base"],
    /* Chain ID: 39797 */
    "2147523445": ["nrg", "Energi"],
    /* Chain ID: 42161 */
    "2147525809": ["arb1", "Arbitrum One"],
    /* Chain ID: 42220 */
    "2147525868": ["celo", "Celo"],
    /* Chain ID: 43114 */
    "2147526762": ["avaxc", "Avalanche C-Chain"],
    /* Chain ID: 59144 */
    "2147542792": ["linea", "Linea"],
    /* Chain ID: 534352 */
    "2148018000": ["scr", "Scroll"],
    /* Chain ID: 7777777 */
    "2155261425": ["zora", "Zora"],
  } as const;
  
  export const nonEvmCoinTypeToNameMap: CoinInfo = {
    "0": ["btc", "Bitcoin"],
    "2": ["ltc", "Litecoin"],
    "3": ["doge", "Dogecoin"],
    "4": ["rdd", "Reddcoin"],
    "5": ["dash", "Dash"],
    "6": ["ppc", "Peercoin"],
    "7": ["nmc", "Namecoin"],
    "14": ["via", "Viacoin"],
    "20": ["dgb", "DigiByte"],
    "22": ["mona", "Monacoin"],
    "42": ["dcr", "Decred"],
    "43": ["xem", "NEM"],
    "55": ["aib", "AIB"],
    "57": ["sys", "Syscoin"],
    "60": ["eth", "Ethereum"],
    "61": ["etcLegacy", "[LEGACY] Ethereum Classic"],
    "74": ["icx", "ICON"],
    "77": ["xvg", "Verge"],
    "105": ["strat", "Stratis"],
    "111": ["ark", "ARK"],
    "118": ["atom", "Atom"],
    "121": ["zen", "Zencash"],
    "128": ["xmr", "Monero"],
    "133": ["zec", "Zcash"],
    "134": ["lsk", "Lisk"],
    "135": ["steem", "Steem"],
    "136": ["firo", "Firo"],
    "137": ["rbtc", "RSK"],
    "141": ["kmd", "Komodo"],
    "144": ["xrp", "Ripple"],
    "145": ["bch", "Bitcoin Cash"],
    "148": ["xlm", "Stellar Lumens"],
    "153": ["btm", "Bytom"],
    "156": ["btg", "Bitcoin Gold"],
    "165": ["nano", "Nano"],
    "175": ["rvn", "Ravencoin"],
    "178": ["poaLegacy", "[LEGACY] POA"],
    "192": ["lcc", "LitecoinCash"],
    "194": ["eos", "EOS"],
    "195": ["trx", "Tron"],
    "204": ["bcn", "Bytecoin"],
    "235": ["fio", "FIO"],
    "236": ["bsv", "BitcoinSV"],
    "242": ["nim", "Nimiq"],
    "246": ["ewtLegacy", "[LEGACY] Energy Web"],
    "283": ["algo", "Algorand"],
    "291": ["iost", "IOST"],
    "301": ["divi", "Divi Project"],
    "304": ["iotx", "IoTeX"],
    "308": ["bts", "Bitshares"],
    "309": ["ckb", "Nervos CKB"],
    "313": ["zil", "Zilliqa"],
    "326": ["mrx", "Metrix Coin"],
    "330": ["luna", "Terra"],
    "354": ["dot", "Polkadot"],
    "360": ["vsys", "V Systems"],
    "367": ["abbc", "ABBC"],
    "397": ["near", "NEAR Protocol"],
    "415": ["etn", "Electroneum"],
    "425": ["aion", "Aion"],
    "434": ["ksm", "Kusama"],
    "457": ["ae", "æternity"],
    "459": ["kava", "Kava"],
    "461": ["fil", "Filecoin"],
    "472": ["ar", "Arweave"],
    "489": ["cca", "Counos"],
    "500": ["thetaLegacy", "[LEGACY] Theta"],
    "501": ["sol", "Solana"],
    "508": ["egld", "MultiversX"],
    "535": ["xhv", "Haven Protocol"],
    "539": ["flow", "Flow"],
    "566": ["iris", "Irisnet"],
    "568": ["lrg", "Large Coin"],
    "569": ["sero", "Super Zero Protocol"],
    "570": ["bdx", "Beldex"],
    "571": ["ccxx", "Counos X"],
    "573": ["srm", "Serum"],
    "574": ["vlxLegacy", "[LEGACY] Velas"],
    "576": ["bps", "BitcoinPoS"],
    "589": ["tfuel", "Theta Fuel"],
    "592": ["grin", "Grin"],
    "700": ["gnoLegacy", "[LEGACY] Gnosis"],
    "714": ["bnb", "BNB"],
    "818": ["vet", "VeChain"],
    "820": ["cloLegacy", "[LEGACY] Callisto"],
    "825": ["hive", "Hive"],
    "888": ["neo", "NEO"],
    "889": ["tomoLegacy", "[LEGACY] TomoChain"],
    "904": ["hnt", "Helium"],
    "931": ["rune", "THORChain"],
    "999": ["bcd", "Bitcoin Diamond"],
    "1001": ["ttLegacy", "[LEGACY] ThunderCore"],
    "1007": ["ftmLegacy", "[LEGACY] Fantom"],
    "1023": ["one", "HARMONY-ONE"],
    "1024": ["ont", "Ontology"],
    "1237": ["nostr", "Nostr"],
    "1729": ["xtz", "Tezos"],
    "1815": ["ada", "Cardano"],
    "1991": ["sc", "Sia"],
    "2301": ["qtum", "QTUM"],
    "2303": ["gxc", "GXChain"],
    "2305": ["ela", "Elastos"],
    "2718": ["nas", "Nebulas"],
    "3030": ["hbar", "Hedera HBAR"],
    "4218": ["iota", "IOTA"],
    "5353": ["hns", "Handshake"],
    "5757": ["stx", "Stacks"],
    "6060": ["goLegacy", "[LEGACY] GoChain"],
    "8444": ["xch", "Chia"],
    "8964": ["nuls", "NULS"],
    "9000": ["avax", "Avalanche"],
    "9004": ["strk", "StarkNet"],
    "9797": ["nrgLegacy", "[LEGACY] Energi"],
    "16754": ["ardr", "Ardor"],
    "19167": ["flux", "Flux"],
    "52752": ["celoLegacy", "[LEGACY] Celo"],
    "99999": ["wicc", "Waykichain"],
    "5655640": ["vlx", "Velas"],
    "5718350": ["wan", "Wanchain"],
    "5741564": ["waves", "Waves"],
  } as const;

  export const allCoins = Object.entries({
    ...nonEvmCoinTypeToNameMap,
    ...evmCoinTypeToNameMap,
  }) as [];
  
  export function getCoinNameByAbbreviation(abbreviation: string): string {
    for (const [type, info] of allCoins as [CoinInfo, [string, string]][]) {
      if (info[0] === abbreviation.toLowerCase()) {
        return info[1];
      }
    }
    return capFirstLetter(abbreviation);
  }

  export function getAbbreviationByCoinName(coinName: string): string {
    for (const [type, info] of allCoins as [CoinInfo, [string, string]][]) {
      if (info[1].toLowerCase() === coinName.toLowerCase()) {
        return info[0];
      }
    }
    return capFirstLetter(coinName);
  }