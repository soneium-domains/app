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
 * Represents the filters for the "ControllerChanged" event.
 */
export type ControllerChangedEventFilters = Partial<{
  controller: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"address","name":"controller","type":"address"}>
}>;

/**
 * Creates an event object for the ControllerChanged event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { controllerChangedEvent } from "TODO";
 * 
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  controllerChangedEvent({
 *  controller: ...,
 * })
 * ],
 * });
 * ```
 */ 
export function controllerChangedEvent(filters: ControllerChangedEventFilters = {}) {
  return prepareEvent({
    signature: "event ControllerChanged(address indexed controller, bool enabled)",
    filters,
  });
};
  

/**
 * Represents the filters for the "DefaultResolverChanged" event.
 */
export type DefaultResolverChangedEventFilters = Partial<{
  resolver: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"contract NameResolver","name":"resolver","type":"address"}>
}>;

/**
 * Creates an event object for the DefaultResolverChanged event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { defaultResolverChangedEvent } from "TODO";
 * 
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  defaultResolverChangedEvent({
 *  resolver: ...,
 * })
 * ],
 * });
 * ```
 */ 
export function defaultResolverChangedEvent(filters: DefaultResolverChangedEventFilters = {}) {
  return prepareEvent({
    signature: "event DefaultResolverChanged(address indexed resolver)",
    filters,
  });
};
  

/**
 * Represents the filters for the "OwnershipTransferred" event.
 */
export type OwnershipTransferredEventFilters = Partial<{
  previousOwner: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"}>
newOwner: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}>
}>;

/**
 * Creates an event object for the OwnershipTransferred event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { ownershipTransferredEvent } from "TODO";
 * 
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  ownershipTransferredEvent({
 *  previousOwner: ...,
 *  newOwner: ...,
 * })
 * ],
 * });
 * ```
 */ 
export function ownershipTransferredEvent(filters: OwnershipTransferredEventFilters = {}) {
  return prepareEvent({
    signature: "event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)",
    filters,
  });
};
  

/**
 * Represents the filters for the "ReverseClaimed" event.
 */
export type ReverseClaimedEventFilters = Partial<{
  addr: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"address","name":"addr","type":"address"}>
node: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"bytes32","name":"node","type":"bytes32"}>
}>;

/**
 * Creates an event object for the ReverseClaimed event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { reverseClaimedEvent } from "TODO";
 * 
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  reverseClaimedEvent({
 *  addr: ...,
 *  node: ...,
 * })
 * ],
 * });
 * ```
 */ 
export function reverseClaimedEvent(filters: ReverseClaimedEventFilters = {}) {
  return prepareEvent({
    signature: "event ReverseClaimed(address indexed addr, bytes32 indexed node)",
    filters,
  });
};
  

/**
* Contract read functions
*/

/**
 * Represents the parameters for the "controllers" function.
 */
export type ControllersParams = {
  arg_0: AbiParameterToPrimitiveType<{"internalType":"address","name":"","type":"address"}>
};

/**
 * Calls the "controllers" function on the contract.
 * @param options - The options for the controllers function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { controllers } from "TODO";
 * 
 * const result = await controllers({
 *  arg_0: ...,
 * });
 * 
 * ```
 */
export async function controllers(
  options: BaseTransactionOptions<ControllersParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0xda8c229e",
  [
    {
      "internalType": "address",
      "name": "",
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
    params: [options.arg_0]
  });
};




/**
 * Calls the "defaultResolver" function on the contract.
 * @param options - The options for the defaultResolver function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { defaultResolver } from "TODO";
 * 
 * const result = await defaultResolver();
 * 
 * ```
 */
export async function defaultResolver(
  options: BaseTransactionOptions
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x828eab0e",
  [],
  [
    {
      "internalType": "contract NameResolver",
      "name": "",
      "type": "address"
    }
  ]
],
    params: []
  });
};




/**
 * Calls the "ens" function on the contract.
 * @param options - The options for the ens function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { ens } from "TODO";
 * 
 * const result = await ens();
 * 
 * ```
 */
export async function ens(
  options: BaseTransactionOptions
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x3f15457f",
  [],
  [
    {
      "internalType": "contract ENS",
      "name": "",
      "type": "address"
    }
  ]
],
    params: []
  });
};


/**
 * Represents the parameters for the "node" function.
 */
export type NodeParams = {
  addr: AbiParameterToPrimitiveType<{"internalType":"address","name":"addr","type":"address"}>
};

/**
 * Calls the "node" function on the contract.
 * @param options - The options for the node function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { node } from "TODO";
 * 
 * const result = await node({
 *  addr: ...,
 * });
 * 
 * ```
 */
export async function node(
  options: BaseTransactionOptions<NodeParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0xbffbe61c",
  [
    {
      "internalType": "address",
      "name": "addr",
      "type": "address"
    }
  ],
  [
    {
      "internalType": "bytes32",
      "name": "",
      "type": "bytes32"
    }
  ]
],
    params: [options.addr]
  });
};




/**
 * Calls the "owner" function on the contract.
 * @param options - The options for the owner function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { owner } from "TODO";
 * 
 * const result = await owner();
 * 
 * ```
 */
export async function owner(
  options: BaseTransactionOptions
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x8da5cb5b",
  [],
  [
    {
      "internalType": "address",
      "name": "",
      "type": "address"
    }
  ]
],
    params: []
  });
};


/**
* Contract write functions
*/

/**
 * Represents the parameters for the "claim" function.
 */
export type ClaimParams = {
  owner: AbiParameterToPrimitiveType<{"internalType":"address","name":"owner","type":"address"}>
};

/**
 * Calls the "claim" function on the contract.
 * @param options - The options for the "claim" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { claim } from "TODO";
 * 
 * const transaction = claim({
 *  owner: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function claim(
  options: BaseTransactionOptions<ClaimParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x1e83409a",
  [
    {
      "internalType": "address",
      "name": "owner",
      "type": "address"
    }
  ],
  [
    {
      "internalType": "bytes32",
      "name": "",
      "type": "bytes32"
    }
  ]
],
    params: [options.owner]
  });
};


/**
 * Represents the parameters for the "claimForAddr" function.
 */
export type ClaimForAddrParams = {
  addr: AbiParameterToPrimitiveType<{"internalType":"address","name":"addr","type":"address"}>
owner: AbiParameterToPrimitiveType<{"internalType":"address","name":"owner","type":"address"}>
resolver: AbiParameterToPrimitiveType<{"internalType":"address","name":"resolver","type":"address"}>
};

/**
 * Calls the "claimForAddr" function on the contract.
 * @param options - The options for the "claimForAddr" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { claimForAddr } from "TODO";
 * 
 * const transaction = claimForAddr({
 *  addr: ...,
 *  owner: ...,
 *  resolver: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function claimForAddr(
  options: BaseTransactionOptions<ClaimForAddrParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x65669631",
  [
    {
      "internalType": "address",
      "name": "addr",
      "type": "address"
    },
    {
      "internalType": "address",
      "name": "owner",
      "type": "address"
    },
    {
      "internalType": "address",
      "name": "resolver",
      "type": "address"
    }
  ],
  [
    {
      "internalType": "bytes32",
      "name": "",
      "type": "bytes32"
    }
  ]
],
    params: [options.addr, options.owner, options.resolver]
  });
};


/**
 * Represents the parameters for the "claimWithResolver" function.
 */
export type ClaimWithResolverParams = {
  owner: AbiParameterToPrimitiveType<{"internalType":"address","name":"owner","type":"address"}>
resolver: AbiParameterToPrimitiveType<{"internalType":"address","name":"resolver","type":"address"}>
};

/**
 * Calls the "claimWithResolver" function on the contract.
 * @param options - The options for the "claimWithResolver" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { claimWithResolver } from "TODO";
 * 
 * const transaction = claimWithResolver({
 *  owner: ...,
 *  resolver: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function claimWithResolver(
  options: BaseTransactionOptions<ClaimWithResolverParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x0f5a5466",
  [
    {
      "internalType": "address",
      "name": "owner",
      "type": "address"
    },
    {
      "internalType": "address",
      "name": "resolver",
      "type": "address"
    }
  ],
  [
    {
      "internalType": "bytes32",
      "name": "",
      "type": "bytes32"
    }
  ]
],
    params: [options.owner, options.resolver]
  });
};




/**
 * Calls the "renounceOwnership" function on the contract.
 * @param options - The options for the "renounceOwnership" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { renounceOwnership } from "TODO";
 * 
 * const transaction = renounceOwnership();
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function renounceOwnership(
  options: BaseTransactionOptions
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x715018a6",
  [],
  []
],
    params: []
  });
};


/**
 * Represents the parameters for the "setController" function.
 */
export type SetControllerParams = {
  controller: AbiParameterToPrimitiveType<{"internalType":"address","name":"controller","type":"address"}>
enabled: AbiParameterToPrimitiveType<{"internalType":"bool","name":"enabled","type":"bool"}>
};

/**
 * Calls the "setController" function on the contract.
 * @param options - The options for the "setController" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { setController } from "TODO";
 * 
 * const transaction = setController({
 *  controller: ...,
 *  enabled: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function setController(
  options: BaseTransactionOptions<SetControllerParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0xe0dba60f",
  [
    {
      "internalType": "address",
      "name": "controller",
      "type": "address"
    },
    {
      "internalType": "bool",
      "name": "enabled",
      "type": "bool"
    }
  ],
  []
],
    params: [options.controller, options.enabled]
  });
};


/**
 * Represents the parameters for the "setDefaultResolver" function.
 */
export type SetDefaultResolverParams = {
  resolver: AbiParameterToPrimitiveType<{"internalType":"address","name":"resolver","type":"address"}>
};

/**
 * Calls the "setDefaultResolver" function on the contract.
 * @param options - The options for the "setDefaultResolver" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { setDefaultResolver } from "TODO";
 * 
 * const transaction = setDefaultResolver({
 *  resolver: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function setDefaultResolver(
  options: BaseTransactionOptions<SetDefaultResolverParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0xc66485b2",
  [
    {
      "internalType": "address",
      "name": "resolver",
      "type": "address"
    }
  ],
  []
],
    params: [options.resolver]
  });
};


/**
 * Represents the parameters for the "setName" function.
 */
export type SetNameParams = {
  name: AbiParameterToPrimitiveType<{"internalType":"string","name":"name","type":"string"}>
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
 *  name: ...,
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
  "0xc47f0027",
  [
    {
      "internalType": "string",
      "name": "name",
      "type": "string"
    }
  ],
  [
    {
      "internalType": "bytes32",
      "name": "",
      "type": "bytes32"
    }
  ]
],
    params: [options.name]
  });
};


/**
 * Represents the parameters for the "setNameForAddr" function.
 */
export type SetNameForAddrParams = {
  addr: AbiParameterToPrimitiveType<{"internalType":"address","name":"addr","type":"address"}>
owner: AbiParameterToPrimitiveType<{"internalType":"address","name":"owner","type":"address"}>
resolver: AbiParameterToPrimitiveType<{"internalType":"address","name":"resolver","type":"address"}>
name: AbiParameterToPrimitiveType<{"internalType":"string","name":"name","type":"string"}>
};

/**
 * Calls the "setNameForAddr" function on the contract.
 * @param options - The options for the "setNameForAddr" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { setNameForAddr } from "TODO";
 * 
 * const transaction = setNameForAddr({
 *  addr: ...,
 *  owner: ...,
 *  resolver: ...,
 *  name: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function setNameForAddr(
  options: BaseTransactionOptions<SetNameForAddrParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x7a806d6b",
  [
    {
      "internalType": "address",
      "name": "addr",
      "type": "address"
    },
    {
      "internalType": "address",
      "name": "owner",
      "type": "address"
    },
    {
      "internalType": "address",
      "name": "resolver",
      "type": "address"
    },
    {
      "internalType": "string",
      "name": "name",
      "type": "string"
    }
  ],
  [
    {
      "internalType": "bytes32",
      "name": "",
      "type": "bytes32"
    }
  ]
],
    params: [options.addr, options.owner, options.resolver, options.name]
  });
};


/**
 * Represents the parameters for the "transferOwnership" function.
 */
export type TransferOwnershipParams = {
  newOwner: AbiParameterToPrimitiveType<{"internalType":"address","name":"newOwner","type":"address"}>
};

/**
 * Calls the "transferOwnership" function on the contract.
 * @param options - The options for the "transferOwnership" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { transferOwnership } from "TODO";
 * 
 * const transaction = transferOwnership({
 *  newOwner: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function transferOwnership(
  options: BaseTransactionOptions<TransferOwnershipParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0xf2fde38b",
  [
    {
      "internalType": "address",
      "name": "newOwner",
      "type": "address"
    }
  ],
  []
],
    params: [options.newOwner]
  });
};


