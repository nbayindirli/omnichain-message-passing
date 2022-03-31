// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "./interfaces/ICounterDeployment.sol";
import "./@layerzerolabs/contracts/interfaces/ILayerZeroEndpoint.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * LayerZero Message Passing POC: Master Chain Counter
 *
 * Author: Noah Bayindirli (nbayindirli)
 */
contract MasterCounter is ICounterDeployment, ReentrancyGuard {

    mapping(address /* satelliteCounterAddress */ => int256 /* count */) public counter;

    modifier owningEndpointOnly() {
        require(msg.sender == address(endpoint), "owning endpoint only");
        _;
    }

    ILayerZeroEndpoint public endpoint;

    constructor(address _endpoint) payable {
        endpoint = ILayerZeroEndpoint(_endpoint);
    }

    /**
     * @dev Updates count for owning Satellite chain request.
     */
    function updateCount(
        int256 _value,
        Operation _op,
        address _satelliteCounterAddress
    ) public payable override(ICounterDeployment) {
        /* switch (Operation) */
        if (/* case: */ Operation.ADD == _op)
        {
            counter[_satelliteCounterAddress] += _value;
        }
        else if (/* case: */ Operation.SUB == _op)
        {
            counter[_satelliteCounterAddress] -= _value;
        }
        else if (/* case: */ Operation.MUL == _op)
        {
            counter[_satelliteCounterAddress] *= _value;
        }
        else /* default: */
        {
            require(false, "invalid operation");
        }
    }

    /**
     * @dev Retrieves count for Satellite chain request.
     */
    function getCount(
        address _satelliteCounterAddress
    ) public payable override(ICounterDeployment) returns (int256 count) {
        count = counter[_satelliteCounterAddress];
    }

    /**
     * @dev Sends message of LayerZero from this contract's `endpoint`.
     */
    function send(
        uint16 _dstChainId,
        bytes memory _dstBytesAddress,
        bytes memory _payload
    ) public payable override(ICounterDeployment) {
        uint16 version = 1;
        uint gasForDestinationLzReceive = 350000;
        bytes memory adapterParams = abi.encodePacked(
            version,
            gasForDestinationLzReceive
        );

        (uint messageFee,) = endpoint.estimateFees(
            _dstChainId,
            address(this),
            _payload,
            false,
            adapterParams
        );

        require(address(this).balance >= messageFee, "messageFee higher than balance");

        endpoint.send{value: messageFee}(
            _dstChainId,
            _dstBytesAddress,
            _payload,
            payable(this),
            address(0),
            bytes("")
        );
    }

    /**
     * @dev Receives request from Satellite chains via LayerZero.
     *
     * Emits {CountUpdated} and {CountRetrieved} events.
     */
    function lzReceive(
        uint16 _srcChainId,
        bytes memory _srcAddress,
        uint64 /* _nonce */,
        bytes memory _payload
    ) external override(ILayerZeroReceiver) nonReentrant owningEndpointOnly {
        (
            Function sendingFunction,
            int256 value,
            Operation op,
            address satelliteCounterAddress
        ) = abi.decode(
            _payload, (Function, int256, Operation, address)
        );

        /* switch (Function) */
        if (/* case: */ Function.UPDATE_COUNT == sendingFunction)
        {
            require(getAddress(_srcAddress) == satelliteCounterAddress, "owning satellite only");

            updateCount(value, op, satelliteCounterAddress);

            emit CountUpdated(satelliteCounterAddress, value, op);
        }
        else if (/* case: */ Function.GET_COUNT == sendingFunction)
        {
            int256 count = getCount(satelliteCounterAddress);

            emit CountRetrieved(getAddress(_srcAddress), satelliteCounterAddress, count);

            bytes memory payload = abi.encode(
                count,
                satelliteCounterAddress
            );

            send(_srcChainId, _srcAddress, payload);
        }
        else /* default: */
        {
            require(false, "invalid sending function");
        }
    }

    /**
     * @dev Converts bytes to an address.
     *
     * Requirements:
     * - `_bytesAddress` is the bytes representation of an address.
     */
    function getAddress(
        bytes memory _bytesAddress
    ) private pure returns (address convertedAddress) {
        assembly {
            convertedAddress := mload(add(_bytesAddress, 20))
        }
    }

    fallback() external payable {}
    receive() external payable {}
}
