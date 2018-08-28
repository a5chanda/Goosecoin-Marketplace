pragma solidity ^ 0.4 .0;

contract Classifieds {

    //** Structs that are going to be used within the dApp **/

    //Listing/Listing structure containing the required information for a classified 
    struct Listing{ 
        uint listingID;
        string ListingName;
        string description;
        uint price;
        address owner;
        ListingStatus status;
        string ListingDateTime;
    }

    //User structure that contains a user's information within the classifieds application
    struct User{
        string firstName;
        string lastName;
        address userAddress;
        string email;
        bool enrolledStatus;
        uint[] listingsPosted;
        uint[] listingsPurchased;
        uint[] listingsSold;
    }

    // Transaction structure containing the fields required when executing a transaction
    struct Transaction{
        address buyer;
        address seller;
        uint amount;
        uint ListingID;
        string listingName;
        uint txID;
    }
    
    uint ListingID;
    uint[] ListingPrices;

    uint txID;

    enum ListingStatus{LISTED, IN_NEGOTIATION, SOLD, NO_LONGER_FOR_SALE}
    enum userStatus{BUYER, SELLER}

    mapping(address => User) public allUsers; // mapping of all the users
    mapping(uint => Listing) public allListings; // mapping of all the Listings


    // mapping(address => Listing[]) public userListings; //mapping of user listings
    // mapping(address => uint[]) public userListingIDs; // mapping of user's listings' IDs
    // mapping(address => uint[]) public ListingsPurchased; // mapping of the Listing IDs purchased by a user
    // mapping(address => uint[]) public ListingsSold;
    
    mapping(uint => Transaction) public allTransactions;
    


    // Events  
    event addListingEvent(
        address indexed sellerAddress,        
        uint indexed ListingID,
        string ListingDateTime,
        string sellerName,
        uint ListingPrice
    );

    event TransactionEvent(
        uint indexed txID,
        address indexed buyer,
        address indexed seller,
        uint ListingID,
        string ListingName,
        uint ListingPrice
    );
    

    //********** Functions ******* */

    //********* Registering a user

    function enrollUser(string firstName, string lastName, string email) public returns (bool){
        require(allUsers[msg.sender].enrolledStatus == false);
        
        allUsers[msg.sender] = User(firstName,lastName,msg.sender,email,true, new uint[](0), new uint[](0), new uint[](0));
        return allUsers[msg.sender].enrolledStatus;
        
    }

    // Returning user details
    function getUserInfo() public constant returns(string, string, address, string, bool){
        return  (allUsers[msg.sender].firstName, 
                 allUsers[msg.sender].lastName, 
                 allUsers[msg.sender].userAddress, 
                 allUsers[msg.sender].email, 
                 allUsers[msg.sender].enrolledStatus);   
    }

    //Returns the info of a user by their address
    function getUserInfoByAddress(address user) public constant returns(string, string, address, string, bool){
        return  (allUsers[user].firstName, 
                 allUsers[user].lastName, 
                 allUsers[user].userAddress, 
                 allUsers[user].email, 
                 allUsers[user].enrolledStatus);   
    }


    //***************** Managing Listing Functions ************//

    //****** Setter Functions 

    // Adding a Listing
    function addListing(string ListingName, string description, uint price, string ListingDateTime) public{
        bytes memory tempEmptyStringTest = bytes(ListingName);
        require(tempEmptyStringTest.length != 0 );
        require(allUsers[msg.sender].enrolledStatus == true);
        


        ListingID++;
        ListingPrices.push(price);
        Listing memory newListing = Listing(ListingID, ListingName, description, price, msg.sender, ListingStatus.LISTED, ListingDateTime);

        allListings[ListingID] = newListing;
        allUsers[msg.sender].listingsPosted.push(ListingID);    
    } 


    // Buy a listing
    function buyListing(uint listingID) public payable{
        require(allUsers[msg.sender].enrolledStatus == true);
        require(allListings[listingID].owner != msg.sender); //Make sure the buyer isn't the seller/same account
        require(allListings[listingID].status == ListingStatus.LISTED); //Ensure that the listing has a status of listed
        require(allListings[listingID].price <= msg.sender.balance);
        require(allListings[listingID].price == msg.value);

        address ownerAddress = allListings[listingID].owner;
        ownerAddress.transfer(msg.value);
        allListings[listingID].status = ListingStatus.SOLD;
        allUsers[msg.sender].listingsPurchased.push(listingID); // list of listings purchased by the buyer
        allUsers[ownerAddress].listingsSold.push(listingID); // list of listings sold by the owner/seller
        
        //transaction handling
        txID++;
        allTransactions[txID] = Transaction(msg.sender, ownerAddress, msg.value, listingID, allListings[listingID].ListingName, txID);
        
        emit TransactionEvent(txID, msg.sender, ownerAddress, listingID, allListings[listingID].ListingName, msg.value);

    }

    function buyListingValue(uint listingID, uint value) public payable{
        require(allUsers[msg.sender].enrolledStatus == true);
        require(allListings[listingID].owner != msg.sender); //Make sure the buyer isn't the seller/same account
        require(allListings[listingID].status == ListingStatus.LISTED); //Ensure that the listing has a status of listed
        require(allListings[listingID].price <= msg.sender.balance);
        require(value <= msg.sender.balance);
        require(allListings[listingID].price == value);

        address ownerAddress = allListings[listingID].owner;
        ownerAddress.transfer(value);
        allListings[listingID].status = ListingStatus.SOLD;
        allUsers[msg.sender].listingsPurchased.push(listingID); // list of listings purchased by the buyer
        allUsers[ownerAddress].listingsSold.push(listingID); // list of listings sold by the owner/seller
        
        //transaction handling
        txID++;
        allTransactions[txID] = Transaction(msg.sender, ownerAddress, msg.value, listingID, allListings[listingID].ListingName, txID);
        
        emit TransactionEvent(txID, msg.sender, ownerAddress, listingID, allListings[listingID].ListingName, msg.value);

    }



    //******** Getter Functions 
    
    //Get the info for a listing by ListingID
    function getListingInfoByID(uint listingSearchID) public constant returns (string, string, uint, address, string){ //  ListingName, description, price, owner,  ListingDateTime
        require(listingSearchID  > 0 && listingSearchID <= ListingID);

        return(allListings[listingSearchID].ListingName, allListings[listingSearchID].description, allListings[listingSearchID].price, allListings[listingSearchID].owner, allListings[listingSearchID].ListingDateTime);
    }

    function getTotalListings() public constant returns (uint){
        return ListingID;
    }

    function getTotalListingPrices() public returns (uint[]){
        return ListingPrices;
    }


    function getUserListings(address user) public constant returns (uint[]){
        return allUsers[user].listingsPosted;
    }

    function getUserListingsSold(address user) public constant returns (uint[]){
        return allUsers[user].listingsSold;
    }

    function getUserListingsPurchased(address user) public constant returns (uint[]){
        return allUsers[user].listingsPurchased;
    }


}