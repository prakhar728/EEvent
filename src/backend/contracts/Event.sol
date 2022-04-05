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
        uint256 _ticketPrice;
    }

    mapping (uint256 => eventPanel) public events;
    constructor(){
        contractOwner=msg.sender;
    }

    event created(
       string  _eventDetails,
       uint256 _ticketCount,
       uint256 _ticketsSold,
       address indexed  _hostName,
       address indexed _eventOrganiser
    );
    function currentEventCount() external view returns(uint256){
        return _eventId.current();
    }
    function createEvent(string memory _eventDetails,uint256 _ticketCount,uint256 _ticketsSold,address payable _hostName,uint256 _ticketPrice) external nonReentrant returns(uint)
    {
        _eventId.increment();
        events[_eventId.current()]=eventPanel(_eventDetails,_ticketCount, _ticketsSold,_hostName,payable(msg.sender),_ticketPrice);
        emit created(_eventDetails,_ticketCount,_ticketsSold,_hostName,msg.sender);
        return _eventId.current();
    }
}