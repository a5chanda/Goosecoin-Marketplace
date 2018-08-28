pragma solidity ^ 0.4 .0;
// This contract is to demonstrate a sample use case of using a self-developed library.
// The following functions are very simple and are only for demonstration purposes as I havent
// imported any libraries for my dapp.

library Math{
    function add(uint a, uint b) public pure returns (uint){
        return a + b;
    }
    function  multiply(uint a, uint b) public pure returns (uint){
        return a * b;
    }
    function subtract(uint a, uint b) public pure returns (uint){
        if(a > b){
            return a - b;
        }
        return b - a;
    }
}

contract LibraryDemo{
    function libraryFn1(uint a, uint b) public pure returns (uint){
        return Math.add(a, b);
    }
    
    function libraryFn2(uint a, uint b) public pure returns (uint){
        return Math.multiply(a, b);
    }
    
    function libraryFn3(uint a, uint b) public pure returns (uint){
        return Math.subtract(a, b);
    }
}