import {
  prepareEvent,
  prepareContractCall,
  readContract,
  type BaseTransactionOptions,
  type AbiParameterToPrimitiveType,
} from "thirdweb";

/**
* Contract events
*/

/**
 * Represents the filters for the "ABIChanged" event.
 */
export type ABIChangedEventFilters = Partial<{
  node: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"bytes32","name":"node","type":"bytes32"}>
contentType: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"uint256","name":"contentType","type":"uint256"}>
}>;

/**
 * Creates an event object for the ABIChanged event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { aBIChangedEvent } from "TODO";
 * 
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  aBIChangedEvent({
 *  node: ...,
 *  contentType: ...,
 * })
 * ],
 * });
 * ```
 */ 
export function aBIChangedEvent(filters: ABIChangedEventFilters = {}) {
  return prepareEvent({
    signature: "event ABIChanged(bytes32 indexed node, uint256 indexed contentType)",
    filters,
  });
};
  

/**
 * Represents the filters for the "AddrChanged" event.
 */
export type AddrChangedEventFilters = Partial<{
  node: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"bytes32","name":"node","type":"bytes32"}>
}>;

/**
 * Creates an event object for the AddrChanged event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { addrChangedEvent } from "TODO";
 * 
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  addrChangedEvent({
 *  node: ...,
 * })
 * ],
 * });
 * ```
 */ 
export function addrChangedEvent(filters: AddrChangedEventFilters = {}) {
  return prepareEvent({
    signature: "event AddrChanged(bytes32 indexed node, address a)",
    filters,
  });
};
  

/**
 * Represents the filters for the "AddressChanged" event.
 */
export type AddressChangedEventFilters = Partial<{
  node: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"bytes32","name":"node","type":"bytes32"}>
}>;

/**
 * Creates an event object for the AddressChanged event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { addressChangedEvent } from "TODO";
 * 
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  addressChangedEvent({
 *  node: ...,
 * })
 * ],
 * });
 * ```
 */ 
export function addressChangedEvent(filters: AddressChangedEventFilters = {}) {
  return prepareEvent({
    signature: "event AddressChanged(bytes32 indexed node, uint256 coinType, bytes newAddress)",
    filters,
  });
};
  

/**
 * Represents the filters for the "ApprovalForAll" event.
 */
export type ApprovalForAllEventFilters = Partial<{
  owner: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"address","name":"owner","type":"address"}>
operator: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"address","name":"operator","type":"address"}>
}>;

/**
 * Creates an event object for the ApprovalForAll event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { approvalForAllEvent } from "TODO";
 * 
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  approvalForAllEvent({
 *  owner: ...,
 *  operator: ...,
 * })
 * ],
 * });
 * ```
 */ 
export function approvalForAllEvent(filters: ApprovalForAllEventFilters = {}) {
  return prepareEvent({
    signature: "event ApprovalForAll(address indexed owner, address indexed operator, bool approved)",
    filters,
  });
};
  

/**
 * Represents the filters for the "ContenthashChanged" event.
 */
export type ContenthashChangedEventFilters = Partial<{
  node: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"bytes32","name":"node","type":"bytes32"}>
}>;

/**
 * Creates an event object for the ContenthashChanged event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { contenthashChangedEvent } from "TODO";
 * 
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  contenthashChangedEvent({
 *  node: ...,
 * })
 * ],
 * });
 * ```
 */ 
export function contenthashChangedEvent(filters: ContenthashChangedEventFilters = {}) {
  return prepareEvent({
    signature: "event ContenthashChanged(bytes32 indexed node, bytes hash)",
    filters,
  });
};
  

/**
 * Represents the filters for the "DNSRecordChanged" event.
 */
export type DNSRecordChangedEventFilters = Partial<{
  node: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"bytes32","name":"node","type":"bytes32"}>
}>;

/**
 * Creates an event object for the DNSRecordChanged event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { dNSRecordChangedEvent } from "TODO";
 * 
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  dNSRecordChangedEvent({
 *  node: ...,
 * })
 * ],
 * });
 * ```
 */ 
export function dNSRecordChangedEvent(filters: DNSRecordChangedEventFilters = {}) {
  return prepareEvent({
    signature: "event DNSRecordChanged(bytes32 indexed node, bytes name, uint16 resource, bytes record)",
    filters,
  });
};
  

/**
 * Represents the filters for the "DNSRecordDeleted" event.
 */
export type DNSRecordDeletedEventFilters = Partial<{
  node: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"bytes32","name":"node","type":"bytes32"}>
}>;

/**
 * Creates an event object for the DNSRecordDeleted event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { dNSRecordDeletedEvent } from "TODO";
 * 
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  dNSRecordDeletedEvent({
 *  node: ...,
 * })
 * ],
 * });
 * ```
 */ 
export function dNSRecordDeletedEvent(filters: DNSRecordDeletedEventFilters = {}) {
  return prepareEvent({
    signature: "event DNSRecordDeleted(bytes32 indexed node, bytes name, uint16 resource)",
    filters,
  });
};
  

/**
 * Represents the filters for the "DNSZonehashChanged" event.
 */
export type DNSZonehashChangedEventFilters = Partial<{
  node: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"bytes32","name":"node","type":"bytes32"}>
}>;

/**
 * Creates an event object for the DNSZonehashChanged event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { dNSZonehashChangedEvent } from "TODO";
 * 
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  dNSZonehashChangedEvent({
 *  node: ...,
 * })
 * ],
 * });
 * ```
 */ 
export function dNSZonehashChangedEvent(filters: DNSZonehashChangedEventFilters = {}) {
  return prepareEvent({
    signature: "event DNSZonehashChanged(bytes32 indexed node, bytes lastzonehash, bytes zonehash)",
    filters,
  });
};
  

/**
 * Represents the filters for the "InterfaceChanged" event.
 */
export type InterfaceChangedEventFilters = Partial<{
  node: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"bytes32","name":"node","type":"bytes32"}>
interfaceID: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"bytes4","name":"interfaceID","type":"bytes4"}>
}>;

/**
 * Creates an event object for the InterfaceChanged event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { interfaceChangedEvent } from "TODO";
 * 
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  interfaceChangedEvent({
 *  node: ...,
 *  interfaceID: ...,
 * })
 * ],
 * });
 * ```
 */ 
export function interfaceChangedEvent(filters: InterfaceChangedEventFilters = {}) {
  return prepareEvent({
    signature: "event InterfaceChanged(bytes32 indexed node, bytes4 indexed interfaceID, address implementer)",
    filters,
  });
};
  

/**
 * Represents the filters for the "NameChanged" event.
 */
export type NameChangedEventFilters = Partial<{
  node: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"bytes32","name":"node","type":"bytes32"}>
}>;

/**
 * Creates an event object for the NameChanged event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { nameChangedEvent } from "TODO";
 * 
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  nameChangedEvent({
 *  node: ...,
 * })
 * ],
 * });
 * ```
 */ 
export function nameChangedEvent(filters: NameChangedEventFilters = {}) {
  return prepareEvent({
    signature: "event NameChanged(bytes32 indexed node, string name)",
    filters,
  });
};
  

/**
 * Represents the filters for the "PubkeyChanged" event.
 */
export type PubkeyChangedEventFilters = Partial<{
  node: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"bytes32","name":"node","type":"bytes32"}>
}>;

/**
 * Creates an event object for the PubkeyChanged event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { pubkeyChangedEvent } from "TODO";
 * 
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  pubkeyChangedEvent({
 *  node: ...,
 * })
 * ],
 * });
 * ```
 */ 
export function pubkeyChangedEvent(filters: PubkeyChangedEventFilters = {}) {
  return prepareEvent({
    signature: "event PubkeyChanged(bytes32 indexed node, bytes32 x, bytes32 y)",
    filters,
  });
};
  

/**
 * Represents the filters for the "TextChanged" event.
 */
export type TextChangedEventFilters = Partial<{
  node: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"bytes32","name":"node","type":"bytes32"}>
indexedKey: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"string","name":"indexedKey","type":"string"}>
}>;

/**
 * Creates an event object for the TextChanged event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { textChangedEvent } from "TODO";
 * 
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  textChangedEvent({
 *  node: ...,
 *  indexedKey: ...,
 * })
 * ],
 * });
 * ```
 */ 
export function textChangedEvent(filters: TextChangedEventFilters = {}) {
  return prepareEvent({
    signature: "event TextChanged(bytes32 indexed node, string indexed indexedKey, string key, string value)",
    filters,
  });
};
  

/**
 * Represents the filters for the "VersionChanged" event.
 */
export type VersionChangedEventFilters = Partial<{
  node: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"bytes32","name":"node","type":"bytes32"}>
}>;

/**
 * Creates an event object for the VersionChanged event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { versionChangedEvent } from "TODO";
 * 
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  versionChangedEvent({
 *  node: ...,
 * })
 * ],
 * });
 * ```
 */ 
export function versionChangedEvent(filters: VersionChangedEventFilters = {}) {
  return prepareEvent({
    signature: "event VersionChanged(bytes32 indexed node, uint64 newVersion)",
    filters,
  });
};
  

/**
* Contract read functions
*/

/**
 * Represents the parameters for the "ABI" function.
 */
export type ABIParams = {
  node: AbiParameterToPrimitiveType<{"internalType":"bytes32","name":"node","type":"bytes32"}>
contentTypes: AbiParameterToPrimitiveType<{"internalType":"uint256","name":"contentTypes","type":"uint256"}>
};

/**
 * Calls the "ABI" function on the contract.
 * @param options - The options for the ABI function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { ABI } from "TODO";
 * 
 * const result = await ABI({
 *  node: ...,
 *  contentTypes: ...,
 * });
 * 
 * ```
 */
export async function ABI(
  options: BaseTransactionOptions<ABIParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x2203ab56",
  [
    {
      "internalType": "bytes32",
      "name": "node",
      "type": "bytes32"
    },
    {
      "internalType": "uint256",
      "name": "contentTypes",
      "type": "uint256"
    }
  ],
  [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    },
    {
      "internalType": "bytes",
      "name": "",
      "type": "bytes"
    }
  ]
],
    params: [options.node, options.contentTypes]
  });
};


/**
 * Represents the parameters for the "addr" function.
 */
export type AddrParams = {
  node: AbiParameterToPrimitiveType<{"internalType":"bytes32","name":"node","type":"bytes32"}>
};

/**
 * Calls the "addr" function on the contract.
 * @param options - The options for the addr function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { addr } from "TODO";
 * 
 * const result = await addr({
 *  node: ...,
 * });
 * 
 * ```
 */
export async function addr(
  options: BaseTransactionOptions<AddrParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x3b3b57de",
  [
    {
      "internalType": "bytes32",
      "name": "node",
      "type": "bytes32"
    }
  ],
  [
    {
      "internalType": "address payable",
      "name": "",
      "type": "address"
    }
  ]
],
    params: [options.node]
  });
};


/**
 * Represents the parameters for the "contenthash" function.
 */
export type ContenthashParams = {
  node: AbiParameterToPrimitiveType<{"internalType":"bytes32","name":"node","type":"bytes32"}>
};

/**
 * Calls the "contenthash" function on the contract.
 * @param options - The options for the contenthash function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { contenthash } from "TODO";
 * 
 * const result = await contenthash({
 *  node: ...,
 * });
 * 
 * ```
 */
export async function contenthash(
  options: BaseTransactionOptions<ContenthashParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0xbc1c58d1",
  [
    {
      "internalType": "bytes32",
      "name": "node",
      "type": "bytes32"
    }
  ],
  [
    {
      "internalType": "bytes",
      "name": "",
      "type": "bytes"
    }
  ]
],
    params: [options.node]
  });
};


/**
 * Represents the parameters for the "dnsRecord" function.
 */
export type DnsRecordParams = {
  node: AbiParameterToPrimitiveType<{"internalType":"bytes32","name":"node","type":"bytes32"}>
name: AbiParameterToPrimitiveType<{"internalType":"bytes32","name":"name","type":"bytes32"}>
resource: AbiParameterToPrimitiveType<{"internalType":"uint16","name":"resource","type":"uint16"}>
};

/**
 * Calls the "dnsRecord" function on the contract.
 * @param options - The options for the dnsRecord function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { dnsRecord } from "TODO";
 * 
 * const result = await dnsRecord({
 *  node: ...,
 *  name: ...,
 *  resource: ...,
 * });
 * 
 * ```
 */
export async function dnsRecord(
  options: BaseTransactionOptions<DnsRecordParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0xa8fa5682",
  [
    {
      "internalType": "bytes32",
      "name": "node",
      "type": "bytes32"
    },
    {
      "internalType": "bytes32",
      "name": "name",
      "type": "bytes32"
    },
    {
      "internalType": "uint16",
      "name": "resource",
      "type": "uint16"
    }
  ],
  [
    {
      "internalType": "bytes",
      "name": "",
      "type": "bytes"
    }
  ]
],
    params: [options.node, options.name, options.resource]
  });
};


/**
 * Represents the parameters for the "hasDNSRecords" function.
 */
export type HasDNSRecordsParams = {
  node: AbiParameterToPrimitiveType<{"internalType":"bytes32","name":"node","type":"bytes32"}>
name: AbiParameterToPrimitiveType<{"internalType":"bytes32","name":"name","type":"bytes32"}>
};

/**
 * Calls the "hasDNSRecords" function on the contract.
 * @param options - The options for the hasDNSRecords function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { hasDNSRecords } from "TODO";
 * 
 * const result = await hasDNSRecords({
 *  node: ...,
 *  name: ...,
 * });
 * 
 * ```
 */
export async function hasDNSRecords(
  options: BaseTransactionOptions<HasDNSRecordsParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x4cbf6ba4",
  [
    {
      "internalType": "bytes32",
      "name": "node",
      "type": "bytes32"
    },
    {
      "internalType": "bytes32",
      "name": "name",
      "type": "bytes32"
    }
  ],
  [
    {
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }
  ]
],
    params: [options.node, options.name]
  });
};


/**
 * Represents the parameters for the "interfaceImplementer" function.
 */
export type InterfaceImplementerParams = {
  node: AbiParameterToPrimitiveType<{"internalType":"bytes32","name":"node","type":"bytes32"}>
interfaceID: AbiParameterToPrimitiveType<{"internalType":"bytes4","name":"interfaceID","type":"bytes4"}>
};

/**
 * Calls the "interfaceImplementer" function on the contract.
 * @param options - The options for the interfaceImplementer function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { interfaceImplementer } from "TODO";
 * 
 * const result = await interfaceImplementer({
 *  node: ...,
 *  interfaceID: ...,
 * });
 * 
 * ```
 */
export async function interfaceImplementer(
  options: BaseTransactionOptions<InterfaceImplementerParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x124a319c",
  [
    {
      "internalType": "bytes32",
      "name": "node",
      "type": "bytes32"
    },
    {
      "internalType": "bytes4",
      "name": "interfaceID",
      "type": "bytes4"
    }
  ],
  [
    {
      "internalType": "address",
      "name": "",
      "type": "address"
    }
  ]
],
    params: [options.node, options.interfaceID]
  });
};


/**
 * Represents the parameters for the "isApprovedForAll" function.
 */
export type IsApprovedForAllParams = {
  account: AbiParameterToPrimitiveType<{"internalType":"address","name":"account","type":"address"}>
operator: AbiParameterToPrimitiveType<{"internalType":"address","name":"operator","type":"address"}>
};

/**
 * Calls the "isApprovedForAll" function on the contract.
 * @param options - The options for the isApprovedForAll function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { isApprovedForAll } from "TODO";
 * 
 * const result = await isApprovedForAll({
 *  account: ...,
 *  operator: ...,
 * });
 * 
 * ```
 */
export async function isApprovedForAll(
  options: BaseTransactionOptions<IsApprovedForAllParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0xe985e9c5",
  [
    {
      "internalType": "address",
      "name": "account",
      "type": "address"
    },
    {
      "internalType": "address",
      "name": "operator",
      "type": "address"
    }
  ],
  [
    {
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }
  ]
],
    params: [options.account, options.operator]
  });
};


/**
 * Represents the parameters for the "name" function.
 */
export type NameParams = {
  node: AbiParameterToPrimitiveType<{"internalType":"bytes32","name":"node","type":"bytes32"}>
};

/**
 * Calls the "name" function on the contract.
 * @param options - The options for the name function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { name } from "TODO";
 * 
 * const result = await name({
 *  node: ...,
 * });
 * 
 * ```
 */
export async function name(
  options: BaseTransactionOptions<NameParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x691f3431",
  [
    {
      "internalType": "bytes32",
      "name": "node",
      "type": "bytes32"
    }
  ],
  [
    {
      "internalType": "string",
      "name": "",
      "type": "string"
    }
  ]
],
    params: [options.node]
  });
};


/**
 * Represents the parameters for the "pubkey" function.
 */
export type PubkeyParams = {
  node: AbiParameterToPrimitiveType<{"internalType":"bytes32","name":"node","type":"bytes32"}>
};

/**
 * Calls the "pubkey" function on the contract.
 * @param options - The options for the pubkey function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { pubkey } from "TODO";
 * 
 * const result = await pubkey({
 *  node: ...,
 * });
 * 
 * ```
 */
export async function pubkey(
  options: BaseTransactionOptions<PubkeyParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0xc8690233",
  [
    {
      "internalType": "bytes32",
      "name": "node",
      "type": "bytes32"
    }
  ],
  [
    {
      "internalType": "bytes32",
      "name": "x",
      "type": "bytes32"
    },
    {
      "internalType": "bytes32",
      "name": "y",
      "type": "bytes32"
    }
  ]
],
    params: [options.node]
  });
};


/**
 * Represents the parameters for the "recordVersions" function.
 */
export type RecordVersionsParams = {
  arg_0: AbiParameterToPrimitiveType<{"internalType":"bytes32","name":"","type":"bytes32"}>
};

/**
 * Calls the "recordVersions" function on the contract.
 * @param options - The options for the recordVersions function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { recordVersions } from "TODO";
 * 
 * const result = await recordVersions({
 *  arg_0: ...,
 * });
 * 
 * ```
 */
export async function recordVersions(
  options: BaseTransactionOptions<RecordVersionsParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0xd700ff33",
  [
    {
      "internalType": "bytes32",
      "name": "",
      "type": "bytes32"
    }
  ],
  [
    {
      "internalType": "uint64",
      "name": "",
      "type": "uint64"
    }
  ]
],
    params: [options.arg_0]
  });
};


/**
 * Represents the parameters for the "supportsInterface" function.
 */
export type SupportsInterfaceParams = {
  interfaceID: AbiParameterToPrimitiveType<{"internalType":"bytes4","name":"interfaceID","type":"bytes4"}>
};

/**
 * Calls the "supportsInterface" function on the contract.
 * @param options - The options for the supportsInterface function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { supportsInterface } from "TODO";
 * 
 * const result = await supportsInterface({
 *  interfaceID: ...,
 * });
 * 
 * ```
 */
export async function supportsInterface(
  options: BaseTransactionOptions<SupportsInterfaceParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x01ffc9a7",
  [
    {
      "internalType": "bytes4",
      "name": "interfaceID",
      "type": "bytes4"
    }
  ],
  [
    {
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }
  ]
],
    params: [options.interfaceID]
  });
};


/**
 * Represents the parameters for the "text" function.
 */
export type TextParams = {
  node: AbiParameterToPrimitiveType<{"internalType":"bytes32","name":"node","type":"bytes32"}>
key: AbiParameterToPrimitiveType<{"internalType":"string","name":"key","type":"string"}>
};

/**
 * Calls the "text" function on the contract.
 * @param options - The options for the text function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { text } from "TODO";
 * 
 * const result = await text({
 *  node: ...,
 *  key: ...,
 * });
 * 
 * ```
 */
export async function text(
  options: BaseTransactionOptions<TextParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x59d1d43c",
  [
    {
      "internalType": "bytes32",
      "name": "node",
      "type": "bytes32"
    },
    {
      "internalType": "string",
      "name": "key",
      "type": "string"
    }
  ],
  [
    {
      "internalType": "string",
      "name": "",
      "type": "string"
    }
  ]
],
    params: [options.node, options.key]
  });
};


/**
 * Represents the parameters for the "zonehash" function.
 */
export type ZonehashParams = {
  node: AbiParameterToPrimitiveType<{"internalType":"bytes32","name":"node","type":"bytes32"}>
};

/**
 * Calls the "zonehash" function on the contract.
 * @param options - The options for the zonehash function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { zonehash } from "TODO";
 * 
 * const result = await zonehash({
 *  node: ...,
 * });
 * 
 * ```
 */
export async function zonehash(
  options: BaseTransactionOptions<ZonehashParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x5c98042b",
  [
    {
      "internalType": "bytes32",
      "name": "node",
      "type": "bytes32"
    }
  ],
  [
    {
      "internalType": "bytes",
      "name": "",
      "type": "bytes"
    }
  ]
],
    params: [options.node]
  });
};


/**
* Contract write functions
*/

/**
 * Represents the parameters for the "clearRecords" function.
 */
export type ClearRecordsParams = {
  node: AbiParameterToPrimitiveType<{"internalType":"bytes32","name":"node","type":"bytes32"}>
};

/**
 * Calls the "clearRecords" function on the contract.
 * @param options - The options for the "clearRecords" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { clearRecords } from "TODO";
 * 
 * const transaction = clearRecords({
 *  node: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function clearRecords(
  options: BaseTransactionOptions<ClearRecordsParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x3603d758",
  [
    {
      "internalType": "bytes32",
      "name": "node",
      "type": "bytes32"
    }
  ],
  []
],
    params: [options.node]
  });
};


/**
 * Represents the parameters for the "multicall" function.
 */
export type MulticallParams = {
  data: AbiParameterToPrimitiveType<{"internalType":"bytes[]","name":"data","type":"bytes[]"}>
};

/**
 * Calls the "multicall" function on the contract.
 * @param options - The options for the "multicall" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { multicall } from "TODO";
 * 
 * const transaction = multicall({
 *  data: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function multicall(
  options: BaseTransactionOptions<MulticallParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0xac9650d8",
  [
    {
      "internalType": "bytes[]",
      "name": "data",
      "type": "bytes[]"
    }
  ],
  [
    {
      "internalType": "bytes[]",
      "name": "results",
      "type": "bytes[]"
    }
  ]
],
    params: [options.data]
  });
};


/**
 * Represents the parameters for the "multicallWithNodeCheck" function.
 */
export type MulticallWithNodeCheckParams = {
  nodehash: AbiParameterToPrimitiveType<{"internalType":"bytes32","name":"nodehash","type":"bytes32"}>
data: AbiParameterToPrimitiveType<{"internalType":"bytes[]","name":"data","type":"bytes[]"}>
};

/**
 * Calls the "multicallWithNodeCheck" function on the contract.
 * @param options - The options for the "multicallWithNodeCheck" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { multicallWithNodeCheck } from "TODO";
 * 
 * const transaction = multicallWithNodeCheck({
 *  nodehash: ...,
 *  data: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function multicallWithNodeCheck(
  options: BaseTransactionOptions<MulticallWithNodeCheckParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0xe32954eb",
  [
    {
      "internalType": "bytes32",
      "name": "nodehash",
      "type": "bytes32"
    },
    {
      "internalType": "bytes[]",
      "name": "data",
      "type": "bytes[]"
    }
  ],
  [
    {
      "internalType": "bytes[]",
      "name": "results",
      "type": "bytes[]"
    }
  ]
],
    params: [options.nodehash, options.data]
  });
};


/**
 * Represents the parameters for the "setABI" function.
 */
export type SetABIParams = {
  node: AbiParameterToPrimitiveType<{"internalType":"bytes32","name":"node","type":"bytes32"}>
contentType: AbiParameterToPrimitiveType<{"internalType":"uint256","name":"contentType","type":"uint256"}>
data: AbiParameterToPrimitiveType<{"internalType":"bytes","name":"data","type":"bytes"}>
};

/**
 * Calls the "setABI" function on the contract.
 * @param options - The options for the "setABI" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { setABI } from "TODO";
 * 
 * const transaction = setABI({
 *  node: ...,
 *  contentType: ...,
 *  data: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function setABI(
  options: BaseTransactionOptions<SetABIParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x623195b0",
  [
    {
      "internalType": "bytes32",
      "name": "node",
      "type": "bytes32"
    },
    {
      "internalType": "uint256",
      "name": "contentType",
      "type": "uint256"
    },
    {
      "internalType": "bytes",
      "name": "data",
      "type": "bytes"
    }
  ],
  []
],
    params: [options.node, options.contentType, options.data]
  });
};


/**
 * Represents the parameters for the "setAddr" function.
 */
export type SetAddrParams = {
  node: AbiParameterToPrimitiveType<{"internalType":"bytes32","name":"node","type":"bytes32"}>
coinType: AbiParameterToPrimitiveType<{"internalType":"uint256","name":"coinType","type":"uint256"}>
a: AbiParameterToPrimitiveType<{"internalType":"bytes","name":"a","type":"bytes"}>
};

/**
 * Calls the "setAddr" function on the contract.
 * @param options - The options for the "setAddr" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { setAddr } from "TODO";
 * 
 * const transaction = setAddr({
 *  node: ...,
 *  coinType: ...,
 *  a: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function setAddr(
  options: BaseTransactionOptions<SetAddrParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x8b95dd71",
  [
    {
      "internalType": "bytes32",
      "name": "node",
      "type": "bytes32"
    },
    {
      "internalType": "uint256",
      "name": "coinType",
      "type": "uint256"
    },
    {
      "internalType": "bytes",
      "name": "a",
      "type": "bytes"
    }
  ],
  []
],
    params: [options.node, options.coinType, options.a]
  });
};


/**
 * Represents the parameters for the "setApprovalForAll" function.
 */
export type SetApprovalForAllParams = {
  operator: AbiParameterToPrimitiveType<{"internalType":"address","name":"operator","type":"address"}>
approved: AbiParameterToPrimitiveType<{"internalType":"bool","name":"approved","type":"bool"}>
};

/**
 * Calls the "setApprovalForAll" function on the contract.
 * @param options - The options for the "setApprovalForAll" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { setApprovalForAll } from "TODO";
 * 
 * const transaction = setApprovalForAll({
 *  operator: ...,
 *  approved: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function setApprovalForAll(
  options: BaseTransactionOptions<SetApprovalForAllParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0xa22cb465",
  [
    {
      "internalType": "address",
      "name": "operator",
      "type": "address"
    },
    {
      "internalType": "bool",
      "name": "approved",
      "type": "bool"
    }
  ],
  []
],
    params: [options.operator, options.approved]
  });
};


/**
 * Represents the parameters for the "setContenthash" function.
 */
export type SetContenthashParams = {
  node: AbiParameterToPrimitiveType<{"internalType":"bytes32","name":"node","type":"bytes32"}>
hash: AbiParameterToPrimitiveType<{"internalType":"bytes","name":"hash","type":"bytes"}>
};

/**
 * Calls the "setContenthash" function on the contract.
 * @param options - The options for the "setContenthash" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { setContenthash } from "TODO";
 * 
 * const transaction = setContenthash({
 *  node: ...,
 *  hash: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function setContenthash(
  options: BaseTransactionOptions<SetContenthashParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x304e6ade",
  [
    {
      "internalType": "bytes32",
      "name": "node",
      "type": "bytes32"
    },
    {
      "internalType": "bytes",
      "name": "hash",
      "type": "bytes"
    }
  ],
  []
],
    params: [options.node, options.hash]
  });
};


/**
 * Represents the parameters for the "setDNSRecords" function.
 */
export type SetDNSRecordsParams = {
  node: AbiParameterToPrimitiveType<{"internalType":"bytes32","name":"node","type":"bytes32"}>
data: AbiParameterToPrimitiveType<{"internalType":"bytes","name":"data","type":"bytes"}>
};

/**
 * Calls the "setDNSRecords" function on the contract.
 * @param options - The options for the "setDNSRecords" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { setDNSRecords } from "TODO";
 * 
 * const transaction = setDNSRecords({
 *  node: ...,
 *  data: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function setDNSRecords(
  options: BaseTransactionOptions<SetDNSRecordsParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x0af179d7",
  [
    {
      "internalType": "bytes32",
      "name": "node",
      "type": "bytes32"
    },
    {
      "internalType": "bytes",
      "name": "data",
      "type": "bytes"
    }
  ],
  []
],
    params: [options.node, options.data]
  });
};


/**
 * Represents the parameters for the "setInterface" function.
 */
export type SetInterfaceParams = {
  node: AbiParameterToPrimitiveType<{"internalType":"bytes32","name":"node","type":"bytes32"}>
interfaceID: AbiParameterToPrimitiveType<{"internalType":"bytes4","name":"interfaceID","type":"bytes4"}>
implementer: AbiParameterToPrimitiveType<{"internalType":"address","name":"implementer","type":"address"}>
};

/**
 * Calls the "setInterface" function on the contract.
 * @param options - The options for the "setInterface" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { setInterface } from "TODO";
 * 
 * const transaction = setInterface({
 *  node: ...,
 *  interfaceID: ...,
 *  implementer: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function setInterface(
  options: BaseTransactionOptions<SetInterfaceParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0xe59d895d",
  [
    {
      "internalType": "bytes32",
      "name": "node",
      "type": "bytes32"
    },
    {
      "internalType": "bytes4",
      "name": "interfaceID",
      "type": "bytes4"
    },
    {
      "internalType": "address",
      "name": "implementer",
      "type": "address"
    }
  ],
  []
],
    params: [options.node, options.interfaceID, options.implementer]
  });
};


/**
 * Represents the parameters for the "setName" function.
 */
export type SetNameParams = {
  node: AbiParameterToPrimitiveType<{"internalType":"bytes32","name":"node","type":"bytes32"}>
newName: AbiParameterToPrimitiveType<{"internalType":"string","name":"newName","type":"string"}>
};

/**
 * Calls the "setName" function on the contract.
 * @param options - The options for the "setName" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { setName } from "TODO";
 * 
 * const transaction = setName({
 *  node: ...,
 *  newName: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function setName(
  options: BaseTransactionOptions<SetNameParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x77372213",
  [
    {
      "internalType": "bytes32",
      "name": "node",
      "type": "bytes32"
    },
    {
      "internalType": "string",
      "name": "newName",
      "type": "string"
    }
  ],
  []
],
    params: [options.node, options.newName]
  });
};


/**
 * Represents the parameters for the "setPubkey" function.
 */
export type SetPubkeyParams = {
  node: AbiParameterToPrimitiveType<{"internalType":"bytes32","name":"node","type":"bytes32"}>
x: AbiParameterToPrimitiveType<{"internalType":"bytes32","name":"x","type":"bytes32"}>
y: AbiParameterToPrimitiveType<{"internalType":"bytes32","name":"y","type":"bytes32"}>
};

/**
 * Calls the "setPubkey" function on the contract.
 * @param options - The options for the "setPubkey" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { setPubkey } from "TODO";
 * 
 * const transaction = setPubkey({
 *  node: ...,
 *  x: ...,
 *  y: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function setPubkey(
  options: BaseTransactionOptions<SetPubkeyParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x29cd62ea",
  [
    {
      "internalType": "bytes32",
      "name": "node",
      "type": "bytes32"
    },
    {
      "internalType": "bytes32",
      "name": "x",
      "type": "bytes32"
    },
    {
      "internalType": "bytes32",
      "name": "y",
      "type": "bytes32"
    }
  ],
  []
],
    params: [options.node, options.x, options.y]
  });
};


/**
 * Represents the parameters for the "setText" function.
 */
export type SetTextParams = {
  node: AbiParameterToPrimitiveType<{"internalType":"bytes32","name":"node","type":"bytes32"}>
key: AbiParameterToPrimitiveType<{"internalType":"string","name":"key","type":"string"}>
value: AbiParameterToPrimitiveType<{"internalType":"string","name":"value","type":"string"}>
};

/**
 * Calls the "setText" function on the contract.
 * @param options - The options for the "setText" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { setText } from "TODO";
 * 
 * const transaction = setText({
 *  node: ...,
 *  key: ...,
 *  value: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function setText(
  options: BaseTransactionOptions<SetTextParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x10f13a8c",
  [
    {
      "internalType": "bytes32",
      "name": "node",
      "type": "bytes32"
    },
    {
      "internalType": "string",
      "name": "key",
      "type": "string"
    },
    {
      "internalType": "string",
      "name": "value",
      "type": "string"
    }
  ],
  []
],
    params: [options.node, options.key, options.value]
  });
};


/**
 * Represents the parameters for the "setZonehash" function.
 */
export type SetZonehashParams = {
  node: AbiParameterToPrimitiveType<{"internalType":"bytes32","name":"node","type":"bytes32"}>
hash: AbiParameterToPrimitiveType<{"internalType":"bytes","name":"hash","type":"bytes"}>
};

/**
 * Calls the "setZonehash" function on the contract.
 * @param options - The options for the "setZonehash" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { setZonehash } from "TODO";
 * 
 * const transaction = setZonehash({
 *  node: ...,
 *  hash: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function setZonehash(
  options: BaseTransactionOptions<SetZonehashParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0xce3decdc",
  [
    {
      "internalType": "bytes32",
      "name": "node",
      "type": "bytes32"
    },
    {
      "internalType": "bytes",
      "name": "hash",
      "type": "bytes"
    }
  ],
  []
],
    params: [options.node, options.hash]
  });
};


