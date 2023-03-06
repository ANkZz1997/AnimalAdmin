
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from './Components/Layout/index'
import Auction from "./Pages/Auction";
import Bids from "./Pages/Bids";
import Chatsupport from "./Pages/Chatsupport";
import Dashboard from "./Pages/Dashboard";
import Help from "./Pages/Help";
import Kyc from "./Pages/Kyc";
import Marketplace from "./Pages/Marketplace";
import Nfts from "./Pages/Nfts";
import PageNotFound from "./Pages/PageNotFound";
import Settings from "./Pages/Settings";
import User from "./Pages/User";
import Protected from "./Protected";
import Login from "./Components/Login";
import UserDetails from "./Pages/UserDetails";
import NftDetailsId from "./Pages/NftDetails";
import AuctionDetails from "./Components/Auction/SingleAuctionDetails";
import AuctionDetailsId from "./Pages/AuctionDetails";
import DashboardDetailsId from "./Components/Dashboard/DashboardDetails/DashboardDetails";
import JoinTodayId from "./Pages/JoinedToday";
import UserChatDetailsId from "./Pages/ChatDetails";
import MarketplaceDetailsId from "./Pages/MarketplaceDetails";




function App() {
  
  const userCheck = useSelector((state)=>state?.commonReducer);
  const token = localStorage.getItem("token");
  console.log('userCheck',userCheck)
  return (
   <>
   <Layout>
          <Routes>
            {/* <Route path="/" element={ <Protected > <Dashboard /> </Protected> } /> */}
            <Route path="/dashboard" element={ <Protected > <Dashboard /> </Protected> } />
            <Route path="/user" element={ <Protected > <User /> </Protected> } />
            <Route path="/nfts" element={ <Protected > <Nfts /> </Protected> } />
            <Route path="/auction" element={ <Protected > <Auction /> </Protected> } />
            <Route path="/marketplace" element={ <Protected > <Marketplace /> </Protected> } />
            <Route path="/bids" element={ <Protected > <Bids /> </Protected> } />
            <Route path="/kyc" element={ <Protected > <Kyc /> </Protected> } />
            <Route path="/chatsupport" element={ <Protected > <Chatsupport/> </Protected> } />
            <Route path="/help" element={ <Protected > <Help /> </Protected> } />
            <Route path="/settings" element={ <Protected > <Settings /> </Protected> } />

            <Route path="/user/userdetails/:id" element={ <Protected > <UserDetails /> </Protected> } />
            <Route path="/user/nftdetails/:id" element={ <Protected > <NftDetailsId/> </Protected> } />
            <Route path="/user/auctiondetails/:id" element={ <Protected > <AuctionDetailsId/> </Protected> } />
            <Route path="/user/dashboarddetails/:id" element={ <Protected > <DashboardDetailsId/> </Protected> } />
            <Route path="/user/joinedtoday" element={ <Protected > <JoinTodayId/> </Protected> } />
            <Route path="user/marketplacedetails/:id" element={<Protected > <MarketplaceDetailsId/> </Protected> }/>
            <Route path="/user/userchatdetails/:id" element={ <Protected > <UserChatDetailsId/> </Protected> } />
            <Route path='*' element={ <Protected > <Dashboard /> </Protected> }/> 
          </Routes>
    </Layout>
      
    </>
  )}


export default App;
