pragma solidity ^ 0.4 .0;
// This contract is to demonstrate a sample use case of using a self-developed library

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
    function libraryFn1(uint a, uint b) public returns (uint){
        return Math.add(a, b);
    }
    
    function libraryFn2(uint a, uint b) public returns (uint){
        return Math.multiply(a, b);
    }
    
    function libraryFn3(uint a, uint b) public returns (uint){
        return Math.subtract(a, b);
    }
}