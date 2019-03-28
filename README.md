# Decentralized-Classifieds

## GOOSECOIN 
![My image](https://github.com/a5chanda/Goosecoin-Marketplace/blob/master/Routes/Goosecoin.png)



Goosecoin is an Ethereum Marketplace that incorporates ethereum to authenticate transactios between buyers and sellers. This web app utilizes smart contracts which to enroll users and add listings (items) for selling. These listings have an id that will allow other users to find it and buy it from the seller. The vision of the application is to serve as a decentralized-classifieds system targeted towards university students. Moreover, students will be able to utilize Goosecoin as a universal currency(ERC token) amongst other universities and list items they wish to sell within the application.


*** This application is far from complete and can only do very basic transactions thus far within the UI. However, the backend smart contract is more capabale of complicated transactions which haven't been implemented into the front end as of yet.

## Starting the app

This app requires metamask.

Go into the drizzle-project directory
```
cd drizzle-project
```

Run npm install to get the node modules
```
npm install
```

Start Ganache cli on one bash terminal. Ensure that it is running on Port 8545.
Import your keys to metamask accordingly
```
ganache-cli -p 8545
```

On a seperate bash terminal within the drizzle-project directory, run the following commands:
```
truffle compile
truffle migrate
truffle test
```

Once that is done, you're ready to start the app! Run the following command:
```
npm run start
```




### Main-Page

![My image](https://github.com/a5chanda/Goosecoin-Marketplace/blob/master/Routes/Main.png)

The main page consists of listings that the user may be interested in. This is a mockup of what the app is going to look like in the near future as updates are made to the front end.


### Enroll

Users are entered into  Goosecoin Marketplace. The information that they must include are first name, last name,email address. The User must enroll into the contract before they can conduct any transactions or add any listings.


### Account Info

Contains all of the User's information which includes their listing IDs and the IDs of the listings you have posted, sold and purchased.


### Add Listing

User is able to add any number of listing of their own. 


### All Listings

Contains all of the listings currently stored in the database. Right now, the all listings section only shows the total amount of listings within the marketplace.


### Your listings

Displays all of the listing ID's that are posted by the user.


### Buy Listings

This is the section where a user enters the ID of a listing that they want to purchase. This section will eventually be merged with the all listings section,
