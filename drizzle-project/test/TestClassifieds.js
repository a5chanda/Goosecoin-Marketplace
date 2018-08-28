var Classifieds = artifacts.require("./Classifieds.sol");

contract('Classifieds', function(accounts) {
  //console.log(accounts);


  //***** User 1 Tests and Enrollment */

  // This test ensures that a user 1 gets successfully enrolled before they 
  // can make transactions on the decentralized platform. This user is linked to account[0].
  // This is an essential function since we want our users to be enrolled before they transact
  it("Should enroll user", function() {
    return Classifieds.deployed().then(function(instance) {
      classifiedsInstance = instance;

      return classifiedsInstance.enrollUser("Test User1", "Last Name", "Abc@gmail.com", {from: accounts[0]});
    }).then(function() {
      return classifiedsInstance.allUsers.call(accounts[0]);
    }).then(function(user) {
      //console.log(user);
      assert.equal(user[0], 'Test User1', "First Name: Test User1 ");
      assert.equal(user[1], 'Last Name', "Last Name: Test User1 ");
      assert.equal(user[2],  accounts[0], "Account: " + accounts[0]);
      assert.equal(user[3], 'Abc@gmail.com', "Email: Abc@gmail.com");
      assert.equal(user[4], true, "The User was enrolled");
    });
  });

  //This test adds a listing for user 1 which is linked to account[0]. This listing will be purchased by user 2
   it("Should add 1 listing for User 1 after enrolling User 1", function() {
    return Classifieds.deployed().then(function(instance) {
      classifiedsInstance = instance;
      return classifiedsInstance.addListing("ListingTest1", "This is a test listing", 4132, "Today", {from: accounts[0]});
      //return classifiedsInstance.addListing("ListingTest2", "This is a test listing", 4124, "Today");
    }).then(function() {
      // return classifiedsInstance.getUserListings.call(accounts[0]);
      return classifiedsInstance.allListings.call(1);
    }).then(function(userListing1) {
      assert.equal(userListing1[0], 1, "Listing ID 1");
      assert.equal(userListing1[1], "ListingTest1", "Listing Name");
      assert.equal(userListing1[3], 4132, "Listing Price");

    });
  });

  //Ensuring that we have 2 listings by the same user which will be sold to another user
  it("Should add 1 more listing for User 1", function() {
    return Classifieds.deployed().then(function(instance) {
      classifiedsInstance = instance;
      
      return classifiedsInstance.addListing("ListingTest2", "This is a test listing", 4124, "Today");
    }).then(function() {
      // return classifiedsInstance.getUserListings.call(accounts[0]);
      return classifiedsInstance.allListings.call(2);
    }).then(function(userListing2) {
      assert.equal(userListing2[0], 2, "Listing ID 1");
      assert.equal(userListing2[1], "ListingTest2", "Listing Name");
      assert.equal(userListing2[3], 4124, "Listing Price");

    });
  });


  //***** User 2  Tests and Enrollment */

  // This function enrolls user 2
  it("Should enroll user2", function() {
    return Classifieds.deployed().then(function(instance) {
      classifiedsInstance = instance;

      return classifiedsInstance.enrollUser("Test User2", "Last Name2", "Abc2@gmail.com", {from: accounts[1]});
    }).then(function() {
      return classifiedsInstance.allUsers.call(accounts[1]);
    }).then(function(user) {
      //console.log(user);
      assert.equal(user[0], 'Test User2', "First Name: Test User2 ");
      assert.equal(user[1], 'Last Name2', "Last Name: Test User2 ");
      assert.equal(user[2],  accounts[1], "Account: " + accounts[1]);
      assert.equal(user[3], 'Abc2@gmail.com', "Email: Abc2@gmail.com");
      assert.equal(user[4], true, "The User was enrolled");
    });
  });


  // This test checks if User 2 can buy a listing from User 1 and retreives the transaction information
  // for the purchase of this listing
  it("User2 can buy listing from User1", function() {
    return Classifieds.deployed().then(function(instance) {
      classifiedsInstance = instance;

      return classifiedsInstance.buyListing(1, {value:4132, from: accounts[1],  }); //Buying listingID 1
    }).then(function() {
      return classifiedsInstance.allTransactions.call(1);
    }).then(function(transaction) {
      //console.log(transaction);
       assert.equal(transaction[0], accounts[1], "Buyer Address ");
       assert.equal(transaction[1], accounts[0], "Seller Address ");
       assert.equal(transaction[2],  4132, "Value Transacted for the Listing");
       assert.equal(transaction[3], 1, "Listing ID");
       assert.equal(transaction[4], "ListingTest1", "Listing Name");
       assert.equal(transaction[5], 1, "Transaction ID");
    });
  });

  //Checking that we can buy a second listing posted by user 1
  it("User2 can buy listing 2 from User1", function() {
    return Classifieds.deployed().then(function(instance) {
      classifiedsInstance = instance;

      return classifiedsInstance.buyListing(2, {value:4124, from: accounts[1],  }); //Buying listingID 1
    }).then(function() {
      return classifiedsInstance.allTransactions.call(2);
    }).then(function(transaction) {
       //console.log(transaction);
       assert.equal(transaction[0], accounts[1], "Buyer Address ");
       assert.equal(transaction[1], accounts[0], "Seller Address ");
       assert.equal(transaction[2],  4124, "Value Transacted for the Listing");
       assert.equal(transaction[3], 2, "Listing ID");
       assert.equal(transaction[4], "ListingTest2", "Listing Name");
       assert.equal(transaction[5], 2, "Transaction ID");
    });
  });


  // Checking that User 2 has bought 2 listings
  it("User 2 has bought 2 listings", function() {
    return Classifieds.deployed().then(function(instance) {
      classifiedsInstance = instance;

      return classifiedsInstance.getUserListingsPurchased(accounts[1]); //Buying listingID 1
    }).then(function(transaction) {
      //console.log(transaction[0]);
      assert.equal(transaction[0], 1, "Amount purchased");
      assert.equal(transaction[1], 2, "Amount purchased");
    });
  });

  // Checking that User 1 has sold 2 listings
  it("User 1 has sold listings", function() {
    return Classifieds.deployed().then(function(instance) {
      classifiedsInstance = instance;

      return classifiedsInstance.getUserListingsSold(accounts[0]); //Buying listingID 1
    }).then(function(transaction) {
      //console.log(transaction[0]);
      assert.equal(transaction[0], 1, "Amount purchased");
      assert.equal(transaction[1], 2, "Amount purchased");
    });
  });
  
});
