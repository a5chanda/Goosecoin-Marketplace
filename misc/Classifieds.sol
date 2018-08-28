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
        uint[] userListingsIDs;
        uint[] userPurchasesIDs; 
        //string password;
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
    uint txID;

    enum ListingStatus{LISTED, IN_NEGOTIATION, SOLD, NO_LONGER_FOR_SALE}
    enum userStatus{BUYER, SELLER}

    mapping(address => User) public allUsers; // mapping of all the users
    mapping(uint => Listing) public allListings; // mapping of all the Listings

    mapping(address => Listing[]) public userListings;
    mapping(address => uint256[]) public userListingIDs;
    mapping(address => uint256[]) public ListingsPurchased; // mapping of the Listing IDs purchased by a user
    mapping(address => uint256[]) public ListingsSold;
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
        if (allUsers[msg.sender].enrolledStatus){
            return;
        }
        else{

            allUsers[msg.sender] = User(firstName,lastName,msg.sender,email, true, new uint[] (0) , new uint[](0));
            return allUsers[msg.sender].enrolledStatus;
        }
    }

    // Returning user details
    function getUserInfo() public constant returns(string, string, address, string, uint[], uint[], bool){
        return  (allUsers[msg.sender].firstName, 
                 allUsers[msg.sender].lastName, 
                 allUsers[msg.sender].userAddress, 
                 allUsers[msg.sender].email, 
                 allUsers[msg.sender].userPurchasesIDs,
                 allUsers[msg.sender].userListingsIDs,
                 allUsers[msg.sender].enrolledStatus);   
    }

    //Returns the info of a user by their address
    function getUserInfoByAddress(address user) public constant returns(string, string, address, string, uint[], uint[], bool){
        return  (allUsers[user].firstName, 
                 allUsers[user].lastName, 
                 allUsers[user].userAddress, 
                 allUsers[user].email, 
                 allUsers[user].userPurchasesIDs,
                 allUsers[user].userListingsIDs,
                 allUsers[user].enrolledStatus);   
    }


    //***************** Managing Listing Functions ************//

    //****** Setter Functions 

    // Adding a Listing
    function addListing(string ListingName, string description, uint price, string ListingDateTime)
    public{
        require(allUsers[msg.sender].enrolledStatus == true);

        ListingID++;
        Listing memory newListing = Listing(ListingID, ListingName, description, price, msg.sender, ListingStatus.LISTED, ListingDateTime);

        allListings[ListingID] = newListing;
        userListings[msg.sender].push(newListing);
        userListingIDs[msg.sender].push(ListingID);
        allUsers[msg.sender].userListingsIDs.push(ListingID);
    } 

    // Buy a listing
    function buyListing(uint listingID) public payable{
        require(allListings[listingID].status == ListingStatus.LISTED);
        require(allListings[listingID].price <= msg.sender.balance);
        require(allListings[listingID].price == msg.value);

        address ownerAddress = allListings[listingID].owner;
        ownerAddress.transfer(msg.value);
        allListings[listingID].status = ListingStatus.SOLD;
        ListingsPurchased[msg.sender].push(listingID); // list of listings purchased by the buyer
        ListingsSold[ownerAddress].push(listingID); // list of listings sold by the owner/seller
        
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

    function getListingIDsForUser() public constant returns (uint[]){
        require(allUsers[msg.sender].enrolledStatus == true);
        return(allUsers[msg.sender].userListingsIDs);   
    }

    function getTotalListingsPurchased() public view returns (uint[]){
        return ListingsPurchased[msg.sender];
    }
    function getTotalListingsSold() public view returns (uint[]){
        return ListingsSold[msg.sender];
    }


}