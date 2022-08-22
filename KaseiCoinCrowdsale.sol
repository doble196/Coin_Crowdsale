pragma solidity ^0.5.5;

import "./KaseiCoin.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/crowdsale/Crowdsale.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/crowdsale/emission/MintedCrowdsale.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/crowdsale/validation/CappedCrowdsale.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/crowdsale/validation/TimedCrowdsale.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/crowdsale/distribution/RefundablePostDeliveryCrowdsale.sol";



// Have the KaseiCoinCrowdsale contract inherit the following OpenZeppelin:
// * Crowdsale
// * MintedCrowdsale
// * CappedCrowdSale
// * TimedCrowdSale
// * RefundablePostDeliveryCrowdsale



contract KaseiCoinCrowdsale is Crowdsale, MintedCrowdsale, CappedCrowdsale, TimedCrowdsale, RefundablePostDeliveryCrowdsale { // UPDATE THE CONTRACT SIGNATURE TO ADD INHERITANCE

    // Provide parameters for all of the features of your crowdsale, such as the `rate`, `beneficiaryWallet` for fundraising, and `token`.
    constructor(
        // We are going to get rate, wallet, & KaseiCoin contract adddresses from the user, i.e. Remix interface
        // that will be used in the constructor        
        uint256 exchangeRate, // rate in TKNbits
        address payable beneficiaryFundraisingWallet, // sale beneficiary for fundraising
        KaseiCoin kaseiCoinContractAddress, // the KaseiCoin itself that the KaseiCoinCrowdsale will work with
        uint256 goal, // the crowdsale goal
        uint256 open, // the crowdsale opening time
        uint256 close // the crowdsale closing time

    )   public 

        Crowdsale (exchangeRate, beneficiaryFundraisingWallet, kaseiCoinContractAddress) 
        CappedCrowdsale (goal)
        TimedCrowdsale (open, close)
        RefundableCrowdsale (goal) 
    {
            // constructor can stay empty
    }
}



contract KaseiCoinCrowdsaleDeployer {

    // Create an `address public` variable called `kasei_token_address`.
    address public kaseiTokenAddress;
    
    // Create an `address public` variable called `kasei_crowdsale_address`.
    address public kaseiCrowdsaleAddress;

    // Add the constructor.
    constructor(  
        // We are going to get name, symbol, rate, wallet address from the user, i.e. Remix interface
        // that will be used in the constructor
        string memory name,
        string memory symbol,
        uint256 exchangeRate,
        address payable wallet,
        uint goal
        
    )   public {

        // Create a new instance of the KaseiCoin contract.
        KaseiCoin tokenContract = new KaseiCoin (name, symbol, 0);

        // Assign the token contract’s address to the `kasei_token_address` variable.
        kaseiTokenAddress = address(tokenContract);
    
        // Create a new instance of the `KaseiCoinCrowdsale` contract
        KaseiCoinCrowdsale crowdsaleContract = new KaseiCoinCrowdsale (exchangeRate, wallet, tokenContract, goal, now, now + 5 minutes);          

        // Aassign the `KaseiCoinCrowdsale` contract’s address to the `kasei_crowdsale_address` variable.
        kaseiCrowdsaleAddress = address (crowdsaleContract);

        // Set the `KaseiCoinCrowdsale` contract as a minter
        tokenContract.addMinter(kaseiCrowdsaleAddress);

        // Have the `KaseiCoinCrowdsaleDeployer` renounce its minter role.
        tokenContract.renounceMinter();
    }
}
