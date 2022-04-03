// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Events is ReentrancyGuard{
    address immutable contractOwner;
    
    constructor(){
        contractOwner=msg.sender;
    }
}