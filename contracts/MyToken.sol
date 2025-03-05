// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v5.2.0) (token/ERC20/ERC20.sol)

pragma solidity ^0.8.20;

import {IERC20} from "./IERC20.sol";



contract MyToken is IERC20 {
    mapping(address=>uint) private balances;
    mapping(address=>mapping(address => uint)) private allowances;
    uint256 private _totalSupply;
    string private symbol = 'MTK';
    string private name = 'MyToken';
    uint256 public decimals = 18;
    address public tokenOwner;

    modifier onlyOnwer(){
        require(msg.sender == tokenOwner, "Not the owner");
        _;
    }

    constructor(uint256 initialSupply){
        tokenOwner = msg.sender;
        _totalSupply = initialSupply*10**decimals;
        balances[msg.sender] = _totalSupply;
        emit Transfer(address(0), msg.sender, _totalSupply);
    }

    function totalSupply() external view override returns (uint256){
        return _totalSupply;
    }
    function balanceOf(address account) public view override returns (uint256){
        return balances[account];
    }

    function transfer(address recipient, uint256 amount) external override returns (bool){
        require(balances[msg.sender] >= amount, "Not enough money");
        balances[msg.sender] -= amount;
        balances[recipient] += amount;
        emit Transfer(msg.sender, recipient, amount); 
        return true;    
    }

    function allowance(address owner, address spender) external view override returns (uint256) {
        return allowances[owner][spender];
    }
    function approve(address spender, uint256 amount) external override returns (bool) {
        allowances[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }
    function transferFrom(address spender, address recipient, uint256 amount) external override returns (bool){
        require(balances[spender] >= amount, "Not enough money");
        require(allowances[tokenOwner][spender] >= amount, "Allowance exceeded");
        balances[spender] -= amount;
        balances[recipient] += amount;
        allowances[tokenOwner][spender] -= amount;
        emit Transfer(spender, recipient, amount);
        return true;
    }



}

