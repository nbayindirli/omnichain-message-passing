// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "../@layerzerolabs/contracts/interfaces/ILayerZeroReceiver.sol";

/**
 * LayerZero Message Passing POC
 *
 * Author: Noah Bayindirli (nbayindirli)
 */
interface ICounterDeployment is ILayerZeroReceiver {

    /**
     * @dev Emitted when a `satelliteCounterAddress` counter's count.`op`(`value`) is updated.
     */
    event CountUpdated(address indexed satelliteCounterAddress, int256 value, Operation op);

    /**
     * @dev Emitted when a `viewingSatelliteCounterAddress` retrieves the `count` of a
     * `viewedSatelliteCounterAddress`. `count` is the current count of the viewed address.
     *
     * Requirements:
     * - Only emitted by Master chains.
     */
    event CountRetrieved(
        address indexed viewingSatelliteCounterAddress,
        address indexed viewedSatelliteCounterAddress,
        int256 count
    );

    /**
     * @dev Emitted when a `viewingSatelliteCounterAddress` receives the `count` of a
     * `viewedSatelliteCounterAddress`. `count` is the current count of the viewed address.
     *
     * Requirements:
     * - Only emitted by Satellite chains.
     */
    event CountReceived(
        address indexed viewingSatelliteCounterAddress,
        address indexed viewedSatelliteCounterAddress,
        int256 count
    );

    /**
     * @dev Defines a math operation (+, -, *).
     */
    enum Operation {
        ADD,
        SUB,
        MUL
    }

    /**
     * @dev Specifies which function is making the endpoint.send() request to Layer0.
     *
     * For internal use only.
     */
    enum Function {
        UPDATE_COUNT,
        GET_COUNT
    }

    /**
     * @dev Updates a satellite chain's count by a `_value` for a particular `_op`
     * at `_satelliteCounterAddress`.
     *
     * Requirements:
     * - Can only be used to update the calling satellite chain's own counter.
     * - `_op` must only be ADD(+) || SUB(-) || MUL(*).
     */
    function updateCount(int256 _value, Operation _op, address _satelliteCounterAddress) external payable;

    /**
     * @dev Retrieves a satellite chain's `count` at `_satelliteCounterAddress`
     */
    function getCount(address _satelliteCounterAddress) external payable returns (int256 count);

    /**
     * @dev Sends a messages via LayerZero
     */
    function send(
        uint16 _dstChainId, bytes memory _dstBytesAddress, bytes memory _payload
    ) external payable;
}
