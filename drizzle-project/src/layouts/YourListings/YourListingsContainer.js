import YourListings from './YourListings'
import { drizzleConnect } from 'drizzle-react'



// May still need this even with data function to refresh component on updates for this contract.
const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    Classifieds: state.contracts.Classifieds,
    drizzleStatus: state.drizzleStatus
  }
}

const YourListingsContainer = drizzleConnect(YourListings, mapStateToProps);

export default YourListingsContainer;
