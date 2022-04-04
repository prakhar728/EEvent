// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Events is ReentrancyGuard{
    address immutable contractOwner;
    using Counters for Counters.Counter;
    Counters.Counter private _eventId;

    struct eventPanel{
        string _eventDetails;
        uint256 _ticketCount;
        uint256 _ticketsSold;
        address payable hostName;
        address payable eventOrganiser;
    }

    mapping (uint256 => eventPanel) events;
    constructor(){
        contractOwner=msg.sender;
    }

    
    function createEvent(string memory _eventDetails,uint256 _ticketCount,uint256 _ticketsSold,address payable _hostName) public nonReentrant returns(uint)
    {
        _eventId.increment();
        events[_eventId.current()]=eventPanel(_eventDetails,_ticketCount, _ticketsSold,_hostName,payable(msg.sender));
        return _eventId.current();
    }
}