// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "./interfaces/ICounterDeployment.sol";
import "./@layerzerolabs/contracts/interfaces/ILayerZeroEndpoint.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * LayerZero Message Passing POC: Satellite Chain Counter
 *
 * Author: Noah Bayindirli (nbayindirli)
 */
contract SatelliteCounter is ICounterDeployment, ReentrancyGuard {

    modifier owningEndpointOnly() {
        require(msg.sender == address(endpoint), "owning endpoint only");
        _;
    }

    uint16 public masterChainId;
    bytes public masterCounterBytesAddress;

    ILayerZeroEndpoint public endpoint;

    constructor(
        uint16 _masterChainId,
        address _masterCounterAddress,
        address _endpoint
    ) {
        masterChainId = _masterChainId;
        masterCounterBytesAddress = abi.encodePacked(_masterCounterAddress);
        endpoint = ILayerZeroEndpoint(_endpoint);
    }

    /**
     * @dev Sends request to master chain to update count.
     */
    function updateCount(
        int256 _value,
        Operation _op,
        address _satelliteCounterAddress
    ) external payable nonReentrant override(ICounterDeployment) {
        bytes memory payload = abi.encode(
            Function.UPDATE_COUNT,
            _value,
            _op,
            _satelliteCounterAddress
        );

        send(masterChainId, masterCounterBytesAddress, payload);
    }

    /**
     * @dev Sends request to Master chain to retrieve count.
     */
    function getCount(
        address _satelliteCounterAddress
    ) external payable nonReentrant override(ICounterDeployment) returns (int256 count) {
        bytes memory payload = abi.encode(
            Function.GET_COUNT,
            _satelliteCounterAddress
        );

        send(masterChainId, masterCounterBytesAddress, payload);

        return count; /* always zero */
    }

    /**
     * @dev Sends message of LayerZero from this contract's `endpoint`.
     */
    function send(
        uint16 _dstChainId,
        bytes memory _dstBytesAddress,
        bytes memory _payload
    ) public payable override(ICounterDeployment) {
        endpoint.send{value: msg.value}(
            _dstChainId,
            _dstBytesAddress,
            _payload,
            payable(msg.sender),
            address(0),
            bytes("")
        );
    }

    /**
     * @dev Receives response from Master chain via LayerZero.
     *
     * Emits a {CountReceived} event.
     */
    function lzReceive(
        uint16 /* _srcChainId */,
        bytes memory /* _srcAddress */,
        uint64 /* _nonce */,
        bytes memory _payload
    ) external override(ILayerZeroReceiver) nonReentrant owningEndpointOnly {
        (
            int256 count,
            address satelliteCounterAddress
        ) = abi.decode(
            _payload, (int256, address)
        );

        emit CountReceived(address(this), satelliteCounterAddress, count);
    }
}
