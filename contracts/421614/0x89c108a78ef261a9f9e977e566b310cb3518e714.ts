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
 * Represents the filters for the "NameRegistered" event.
 */
export type NameRegisteredEventFilters = Partial<{
  label: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"bytes32","name":"label","type":"bytes32"}>
owner: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"address","name":"owner","type":"address"}>
}>;

/**
 * Creates an event object for the NameRegistered event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { nameRegisteredEvent } from "TODO";
 * 
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  nameRegisteredEvent({
 *  label: ...,
 *  owner: ...,
 * })
 * ],
 * });
 * ```
 */ 
export function nameRegisteredEvent(filters: NameRegisteredEventFilters = {}) {
  return prepareEvent({
    signature: "event NameRegistered(string name, bytes32 indexed label, address indexed owner, uint256 baseCost, uint256 premium, uint256 expires)",
    filters,
  });
};
  

/**
 * Represents the filters for the "NameRenewed" event.
 */
export type NameRenewedEventFilters = Partial<{
  label: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"bytes32","name":"label","type":"bytes32"}>
}>;

/**
 * Creates an event object for the NameRenewed event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { nameRenewedEvent } from "TODO";
 * 
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  nameRenewedEvent({
 *  label: ...,
 * })
 * ],
 * });
 * ```
 */ 
export function nameRenewedEvent(filters: NameRenewedEventFilters = {}) {
  return prepareEvent({
    signature: "event NameRenewed(string name, bytes32 indexed label, uint256 cost, uint256 expires)",
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
 * Creates an event object for the PriceOracleChanged event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { priceOracleChangedEvent } from "TODO";
 * 
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  priceOracleChangedEvent()
 * ],
 * });
 * ```
 */ 
export function priceOracleChangedEvent() {
  return prepareEvent({
    signature: "event PriceOracleChanged(address oldAddress, address newAddress)",
  });
};
  

/**
* Contract read functions
*/



/**
 * Calls the "MIN_REGISTRATION_DURATION" function on the contract.
 * @param options - The options for the MIN_REGISTRATION_DURATION function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { MIN_REGISTRATION_DURATION } from "TODO";
 * 
 * const result = await MIN_REGISTRATION_DURATION();
 * 
 * ```
 */
export async function MIN_REGISTRATION_DURATION(
  options: BaseTransactionOptions
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x8a95b09f",
  [],
  [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ]
],
    params: []
  });
};


/**
 * Represents the parameters for the "available" function.
 */
export type AvailableParams = {
  name: AbiParameterToPrimitiveType<{"internalType":"string","name":"name","type":"string"}>
};

/**
 * Calls the "available" function on the contract.
 * @param options - The options for the available function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { available } from "TODO";
 * 
 * const result = await available({
 *  name: ...,
 * });
 * 
 * ```
 */
export async function available(
  options: BaseTransactionOptions<AvailableParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0xaeb8ce9b",
  [
    {
      "internalType": "string",
      "name": "name",
      "type": "string"
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
    params: [options.name]
  });
};




/**
 * Calls the "baseExtension" function on the contract.
 * @param options - The options for the baseExtension function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { baseExtension } from "TODO";
 * 
 * const result = await baseExtension();
 * 
 * ```
 */
export async function baseExtension(
  options: BaseTransactionOptions
) {
  return readContract({
    contract: options.contract,
    method: [
  "0xc6682862",
  [],
  [
    {
      "internalType": "string",
      "name": "",
      "type": "string"
    }
  ]
],
    params: []
  });
};




/**
 * Calls the "baseNode" function on the contract.
 * @param options - The options for the baseNode function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { baseNode } from "TODO";
 * 
 * const result = await baseNode();
 * 
 * ```
 */
export async function baseNode(
  options: BaseTransactionOptions
) {
  return readContract({
    contract: options.contract,
    method: [
  "0xddf7fcb0",
  [],
  [
    {
      "internalType": "bytes32",
      "name": "",
      "type": "bytes32"
    }
  ]
],
    params: []
  });
};


/**
 * Represents the parameters for the "commitments" function.
 */
export type CommitmentsParams = {
  arg_0: AbiParameterToPrimitiveType<{"internalType":"bytes32","name":"","type":"bytes32"}>
};

/**
 * Calls the "commitments" function on the contract.
 * @param options - The options for the commitments function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { commitments } from "TODO";
 * 
 * const result = await commitments({
 *  arg_0: ...,
 * });
 * 
 * ```
 */
export async function commitments(
  options: BaseTransactionOptions<CommitmentsParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x839df945",
  [
    {
      "internalType": "bytes32",
      "name": "",
      "type": "bytes32"
    }
  ],
  [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ]
],
    params: [options.arg_0]
  });
};


/**
 * Represents the parameters for the "makeCommitment" function.
 */
export type MakeCommitmentParams = {
  name: AbiParameterToPrimitiveType<{"internalType":"string","name":"name","type":"string"}>
owner: AbiParameterToPrimitiveType<{"internalType":"address","name":"owner","type":"address"}>
duration: AbiParameterToPrimitiveType<{"internalType":"uint256","name":"duration","type":"uint256"}>
secret: AbiParameterToPrimitiveType<{"internalType":"bytes32","name":"secret","type":"bytes32"}>
resolver: AbiParameterToPrimitiveType<{"internalType":"address","name":"resolver","type":"address"}>
data: AbiParameterToPrimitiveType<{"internalType":"bytes[]","name":"data","type":"bytes[]"}>
reverseRecord: AbiParameterToPrimitiveType<{"internalType":"bool","name":"reverseRecord","type":"bool"}>
fuses: AbiParameterToPrimitiveType<{"internalType":"uint32","name":"fuses","type":"uint32"}>
wrapperExpiry: AbiParameterToPrimitiveType<{"internalType":"uint64","name":"wrapperExpiry","type":"uint64"}>
};

/**
 * Calls the "makeCommitment" function on the contract.
 * @param options - The options for the makeCommitment function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { makeCommitment } from "TODO";
 * 
 * const result = await makeCommitment({
 *  name: ...,
 *  owner: ...,
 *  duration: ...,
 *  secret: ...,
 *  resolver: ...,
 *  data: ...,
 *  reverseRecord: ...,
 *  fuses: ...,
 *  wrapperExpiry: ...,
 * });
 * 
 * ```
 */
export async function makeCommitment(
  options: BaseTransactionOptions<MakeCommitmentParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0xd555254a",
  [
    {
      "internalType": "string",
      "name": "name",
      "type": "string"
    },
    {
      "internalType": "address",
      "name": "owner",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "duration",
      "type": "uint256"
    },
    {
      "internalType": "bytes32",
      "name": "secret",
      "type": "bytes32"
    },
    {
      "internalType": "address",
      "name": "resolver",
      "type": "address"
    },
    {
      "internalType": "bytes[]",
      "name": "data",
      "type": "bytes[]"
    },
    {
      "internalType": "bool",
      "name": "reverseRecord",
      "type": "bool"
    },
    {
      "internalType": "uint32",
      "name": "fuses",
      "type": "uint32"
    },
    {
      "internalType": "uint64",
      "name": "wrapperExpiry",
      "type": "uint64"
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
    params: [options.name, options.owner, options.duration, options.secret, options.resolver, options.data, options.reverseRecord, options.fuses, options.wrapperExpiry]
  });
};




/**
 * Calls the "maxCommitmentAge" function on the contract.
 * @param options - The options for the maxCommitmentAge function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { maxCommitmentAge } from "TODO";
 * 
 * const result = await maxCommitmentAge();
 * 
 * ```
 */
export async function maxCommitmentAge(
  options: BaseTransactionOptions
) {
  return readContract({
    contract: options.contract,
    method: [
  "0xce1e09c0",
  [],
  [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ]
],
    params: []
  });
};




/**
 * Calls the "minCommitmentAge" function on the contract.
 * @param options - The options for the minCommitmentAge function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { minCommitmentAge } from "TODO";
 * 
 * const result = await minCommitmentAge();
 * 
 * ```
 */
export async function minCommitmentAge(
  options: BaseTransactionOptions
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x8d839ffe",
  [],
  [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ]
],
    params: []
  });
};




/**
 * Calls the "nameWrapper" function on the contract.
 * @param options - The options for the nameWrapper function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { nameWrapper } from "TODO";
 * 
 * const result = await nameWrapper();
 * 
 * ```
 */
export async function nameWrapper(
  options: BaseTransactionOptions
) {
  return readContract({
    contract: options.contract,
    method: [
  "0xa8e5fbc0",
  [],
  [
    {
      "internalType": "contract INameWrapper",
      "name": "",
      "type": "address"
    }
  ]
],
    params: []
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
 * Calls the "prices" function on the contract.
 * @param options - The options for the prices function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { prices } from "TODO";
 * 
 * const result = await prices();
 * 
 * ```
 */
export async function prices(
  options: BaseTransactionOptions
) {
  return readContract({
    contract: options.contract,
    method: [
  "0xd3419bf3",
  [],
  [
    {
      "internalType": "contract IPriceOracle",
      "name": "",
      "type": "address"
    }
  ]
],
    params: []
  });
};


/**
 * Represents the parameters for the "rentPrice" function.
 */
export type RentPriceParams = {
  name: AbiParameterToPrimitiveType<{"internalType":"string","name":"name","type":"string"}>
duration: AbiParameterToPrimitiveType<{"internalType":"uint256","name":"duration","type":"uint256"}>
};

/**
 * Calls the "rentPrice" function on the contract.
 * @param options - The options for the rentPrice function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { rentPrice } from "TODO";
 * 
 * const result = await rentPrice({
 *  name: ...,
 *  duration: ...,
 * });
 * 
 * ```
 */
export async function rentPrice(
  options: BaseTransactionOptions<RentPriceParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x83e7f6ff",
  [
    {
      "internalType": "string",
      "name": "name",
      "type": "string"
    },
    {
      "internalType": "uint256",
      "name": "duration",
      "type": "uint256"
    }
  ],
  [
    {
      "components": [
        {
          "internalType": "uint256",
          "name": "base",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "premium",
          "type": "uint256"
        }
      ],
      "internalType": "struct IPriceOracle.Price",
      "name": "price",
      "type": "tuple"
    }
  ]
],
    params: [options.name, options.duration]
  });
};




/**
 * Calls the "revenueAccount" function on the contract.
 * @param options - The options for the revenueAccount function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { revenueAccount } from "TODO";
 * 
 * const result = await revenueAccount();
 * 
 * ```
 */
export async function revenueAccount(
  options: BaseTransactionOptions
) {
  return readContract({
    contract: options.contract,
    method: [
  "0xf5dc7d56",
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
 * Calls the "reverseRegistrar" function on the contract.
 * @param options - The options for the reverseRegistrar function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { reverseRegistrar } from "TODO";
 * 
 * const result = await reverseRegistrar();
 * 
 * ```
 */
export async function reverseRegistrar(
  options: BaseTransactionOptions
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x80869853",
  [],
  [
    {
      "internalType": "contract ReverseRegistrar",
      "name": "",
      "type": "address"
    }
  ]
],
    params: []
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
 * Represents the parameters for the "valid" function.
 */
export type ValidParams = {
  name: AbiParameterToPrimitiveType<{"internalType":"string","name":"name","type":"string"}>
};

/**
 * Calls the "valid" function on the contract.
 * @param options - The options for the valid function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { valid } from "TODO";
 * 
 * const result = await valid({
 *  name: ...,
 * });
 * 
 * ```
 */
export async function valid(
  options: BaseTransactionOptions<ValidParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x9791c097",
  [
    {
      "internalType": "string",
      "name": "name",
      "type": "string"
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
    params: [options.name]
  });
};


/**
* Contract write functions
*/

/**
 * Represents the parameters for the "commit" function.
 */
export type CommitParams = {
  commitment: AbiParameterToPrimitiveType<{"internalType":"bytes32","name":"commitment","type":"bytes32"}>
};

/**
 * Calls the "commit" function on the contract.
 * @param options - The options for the "commit" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { commit } from "TODO";
 * 
 * const transaction = commit({
 *  commitment: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function commit(
  options: BaseTransactionOptions<CommitParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0xf14fcbc8",
  [
    {
      "internalType": "bytes32",
      "name": "commitment",
      "type": "bytes32"
    }
  ],
  []
],
    params: [options.commitment]
  });
};


/**
 * Represents the parameters for the "recoverFunds" function.
 */
export type RecoverFundsParams = {
  token: AbiParameterToPrimitiveType<{"internalType":"address","name":"_token","type":"address"}>
to: AbiParameterToPrimitiveType<{"internalType":"address","name":"_to","type":"address"}>
amount: AbiParameterToPrimitiveType<{"internalType":"uint256","name":"_amount","type":"uint256"}>
};

/**
 * Calls the "recoverFunds" function on the contract.
 * @param options - The options for the "recoverFunds" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { recoverFunds } from "TODO";
 * 
 * const transaction = recoverFunds({
 *  token: ...,
 *  to: ...,
 *  amount: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function recoverFunds(
  options: BaseTransactionOptions<RecoverFundsParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x5d3590d5",
  [
    {
      "internalType": "address",
      "name": "_token",
      "type": "address"
    },
    {
      "internalType": "address",
      "name": "_to",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "_amount",
      "type": "uint256"
    }
  ],
  []
],
    params: [options.token, options.to, options.amount]
  });
};


/**
 * Represents the parameters for the "register" function.
 */
export type RegisterParams = {
  name: AbiParameterToPrimitiveType<{"internalType":"string","name":"name","type":"string"}>
owner: AbiParameterToPrimitiveType<{"internalType":"address","name":"owner","type":"address"}>
duration: AbiParameterToPrimitiveType<{"internalType":"uint256","name":"duration","type":"uint256"}>
secret: AbiParameterToPrimitiveType<{"internalType":"bytes32","name":"secret","type":"bytes32"}>
resolver: AbiParameterToPrimitiveType<{"internalType":"address","name":"resolver","type":"address"}>
data: AbiParameterToPrimitiveType<{"internalType":"bytes[]","name":"data","type":"bytes[]"}>
reverseRecord: AbiParameterToPrimitiveType<{"internalType":"bool","name":"reverseRecord","type":"bool"}>
fuses: AbiParameterToPrimitiveType<{"internalType":"uint32","name":"fuses","type":"uint32"}>
wrapperExpiry: AbiParameterToPrimitiveType<{"internalType":"uint64","name":"wrapperExpiry","type":"uint64"}>
};

/**
 * Calls the "register" function on the contract.
 * @param options - The options for the "register" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { register } from "TODO";
 * 
 * const transaction = register({
 *  name: ...,
 *  owner: ...,
 *  duration: ...,
 *  secret: ...,
 *  resolver: ...,
 *  data: ...,
 *  reverseRecord: ...,
 *  fuses: ...,
 *  wrapperExpiry: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function register(
  options: BaseTransactionOptions<RegisterParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x7acaaf26",
  [
    {
      "internalType": "string",
      "name": "name",
      "type": "string"
    },
    {
      "internalType": "address",
      "name": "owner",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "duration",
      "type": "uint256"
    },
    {
      "internalType": "bytes32",
      "name": "secret",
      "type": "bytes32"
    },
    {
      "internalType": "address",
      "name": "resolver",
      "type": "address"
    },
    {
      "internalType": "bytes[]",
      "name": "data",
      "type": "bytes[]"
    },
    {
      "internalType": "bool",
      "name": "reverseRecord",
      "type": "bool"
    },
    {
      "internalType": "uint32",
      "name": "fuses",
      "type": "uint32"
    },
    {
      "internalType": "uint64",
      "name": "wrapperExpiry",
      "type": "uint64"
    }
  ],
  []
],
    params: [options.name, options.owner, options.duration, options.secret, options.resolver, options.data, options.reverseRecord, options.fuses, options.wrapperExpiry]
  });
};


/**
 * Represents the parameters for the "renew" function.
 */
export type RenewParams = {
  name: AbiParameterToPrimitiveType<{"internalType":"string","name":"name","type":"string"}>
duration: AbiParameterToPrimitiveType<{"internalType":"uint256","name":"duration","type":"uint256"}>
};

/**
 * Calls the "renew" function on the contract.
 * @param options - The options for the "renew" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { renew } from "TODO";
 * 
 * const transaction = renew({
 *  name: ...,
 *  duration: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function renew(
  options: BaseTransactionOptions<RenewParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0xacf1a841",
  [
    {
      "internalType": "string",
      "name": "name",
      "type": "string"
    },
    {
      "internalType": "uint256",
      "name": "duration",
      "type": "uint256"
    }
  ],
  []
],
    params: [options.name, options.duration]
  });
};


/**
 * Represents the parameters for the "renewWithFuses" function.
 */
export type RenewWithFusesParams = {
  name: AbiParameterToPrimitiveType<{"internalType":"string","name":"name","type":"string"}>
duration: AbiParameterToPrimitiveType<{"internalType":"uint256","name":"duration","type":"uint256"}>
fuses: AbiParameterToPrimitiveType<{"internalType":"uint32","name":"fuses","type":"uint32"}>
wrapperExpiry: AbiParameterToPrimitiveType<{"internalType":"uint64","name":"wrapperExpiry","type":"uint64"}>
};

/**
 * Calls the "renewWithFuses" function on the contract.
 * @param options - The options for the "renewWithFuses" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { renewWithFuses } from "TODO";
 * 
 * const transaction = renewWithFuses({
 *  name: ...,
 *  duration: ...,
 *  fuses: ...,
 *  wrapperExpiry: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function renewWithFuses(
  options: BaseTransactionOptions<RenewWithFusesParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x6459220f",
  [
    {
      "internalType": "string",
      "name": "name",
      "type": "string"
    },
    {
      "internalType": "uint256",
      "name": "duration",
      "type": "uint256"
    },
    {
      "internalType": "uint32",
      "name": "fuses",
      "type": "uint32"
    },
    {
      "internalType": "uint64",
      "name": "wrapperExpiry",
      "type": "uint64"
    }
  ],
  []
],
    params: [options.name, options.duration, options.fuses, options.wrapperExpiry]
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
 * Represents the parameters for the "setPrices" function.
 */
export type SetPricesParams = {
  prices: AbiParameterToPrimitiveType<{"internalType":"contract IPriceOracle","name":"_prices","type":"address"}>
};

/**
 * Calls the "setPrices" function on the contract.
 * @param options - The options for the "setPrices" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { setPrices } from "TODO";
 * 
 * const transaction = setPrices({
 *  prices: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function setPrices(
  options: BaseTransactionOptions<SetPricesParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x43861c5a",
  [
    {
      "internalType": "contract IPriceOracle",
      "name": "_prices",
      "type": "address"
    }
  ],
  []
],
    params: [options.prices]
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




/**
 * Calls the "withdraw" function on the contract.
 * @param options - The options for the "withdraw" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { withdraw } from "TODO";
 * 
 * const transaction = withdraw();
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function withdraw(
  options: BaseTransactionOptions
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x3ccfd60b",
  [],
  []
],
    params: []
  });
};


