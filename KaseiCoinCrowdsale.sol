pragma solidity ^0.5.0;

import "./KaseiCoin.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/crowdsale/Crowdsale.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/crowdsale/emission/MintedCrowdsale.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/crowdsale/validation/CappedCrowdsale.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/crowdsale/validation/TimedCrowdsale.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/crowdsale/distribution/RefundablePostDeliveryCrowdsale.sol";

// Have the KaseiCoinCrowdsale contract inherit the following OpenZeppelin:
// * Crowdsale
// * MintedCrowdsale
contract KaseiCoinCrowdsale is Crowdsale, MintedCrowdsale, TimedCrowdsale, CappedCrowdsale, RefundablePostDeliveryCrowdsale, TokenTimelock { // UPDATE THE CONTRACT SIGNATURE TO ADD INHERITANCE
    
    // Provide parameters for all of the features of your crowdsale, such as the `rate`, `wallet` for fundraising, and `token`.
    constructor (
        uint rate,
        address payable wallet_for_funding,
        KasseiCoin kaseiCoin_contract_wallet,
        uint goal,
        uint open,
        uint close,
        uint releaseTime
    ) 

    public Crowdsale (
        rate = 1, 
        wallet_for_funding, 
        kaseiCoin_contract_wallet)
        CappedCrowdsale (goal)
        TimedCrowdsale (open, close)
        RefundablePostDeliveryCrowdsale (goal){
        // constructor can stay empty
    }
}


contract KaseiCoinCrowdsaleDeployer {
    // Create an `address public` variable called `kasei_token_address`.
    address public kasei_token_address;
    // Create an `address public` variable called `kasei_crowdsale_address`.
    address payable kasei_crowdsale_address;

    // Add the constructor.
    constructor (
        string memory name,
        string memory symbol,
        uint exchange_rate,
        address payable wallet,
        uint goal,
        uint open,
        uint close
    )

    public {
        // Create a new instance of the KaseiCoin contract.
        KaseiCoin token_contract = new KaseiCoin (name, symbol, 0);
        
        // Assign the token contract’s address to the `kasei_token_address` variable.
        kasei_token_address = address(token_contract);

        // Create a new instance of the `KaseiCoinCrowdsale` contract
        KaseiCoinCrowdsale crowdsale_contract = new KaseiCoinCrowdsale (exchange_rate, wallet, token_contract,goal,now,now + 5 minutes);            
            
        // Assign the `KaseiCoinCrowdsale` contract’s address to the `kasei_crowdsale_address` variable.
        kasei_crowdsale_address = address (crowdsale_contract);

        // Set the `KaseiCoinCrowdsale` contract as a minter
        token_contract.addMinter(kasei_crowdsale_address);
        
        // Have the `KaseiCoinCrowdsaleDeployer` renounce its minter role.
        token_contract.renounceMinter();
    }
}
