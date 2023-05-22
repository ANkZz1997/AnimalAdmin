
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
import User from "./Pages/User";
import Protected from "./Protected";
import UserDetails from "./Pages/UserDetails";
import NftDetailsId from "./Pages/NftDetails";
import AuctionDetailsId from "./Pages/AuctionDetails";
import DashboardDetailsId from "./Components/Dashboard/DashboardDetails/DashboardDetails";
import JoinTodayId from "./Pages/JoinedToday";
import UserChatDetailsId from "./Pages/ChatDetails";
import MarketplaceDetailsId from "./Pages/MarketplaceDetails";
import PlatformSettings from "./Pages/PlatformSettings";
import MobileSettings from "./Pages/MobileSettings";
import NotificationPage from "./Pages/NotificationPage";
// import PreSettings from "./Pages/PreSettings";

function App() {
  
  const userCheck = useSelector((state)=>state?.commonReducer);
  const token = localStorage.getItem("token");
  console.log('userCheck',userCheck)
  return (
   <>
   <Layout>
          <Routes>
            {/* <Route path="/" element={ <Protected > <Dashboard /> </Protected> } /> */}
            {/* <Route path="/presettings" element={<Protected><PreSettings/></Protected>}/> */}
            <Route path="/dashboard" element={ <Protected > <Dashboard /> </Protected> } />
            <Route path="/user" element={ <Protected > <User /> </Protected> } />
            <Route path="/nfts" element={ <Protected > <Nfts /> </Protected> } />
            <Route path="/auction" element={ <Protected > <Auction /> </Protected> } />
            <Route path="/marketplace" element={ <Protected > <Marketplace /> </Protected> } />
            <Route path="/bids" element={ <Protected > <Bids /> </Protected> } />
            <Route path="/kyc" element={ <Protected > <Kyc /> </Protected> } />
            <Route path="/chatsupport" element={ <Protected > <Chatsupport/> </Protected> } />
            <Route path="/help" element={ <Protected > <Help /> </Protected> } />
            <Route path="/platformsettings" element={ <Protected > <PlatformSettings/> </Protected> } />
            <Route path="/mobilesettings" element={ <Protected > <MobileSettings/> </Protected> } />
            <Route path="/notification" element={ <Protected > <NotificationPage/> </Protected> } />


            {/* <Route path="/platformsettings/platformcharge" element={ <Protected > <PlatformFees/> </Protected> } /> */}

            <Route path="/user/userdetails/:id" element={ <Protected > <UserDetails /> </Protected> } />
            <Route path="/nfts/nftdetails/:id" element={ <Protected > <NftDetailsId/> </Protected> } />
            <Route path="/auction/auctiondetails/:id" element={ <Protected > <AuctionDetailsId/> </Protected> } />
            <Route path="/dashboard/dashboarddetails/:id" element={ <Protected > <DashboardDetailsId/> </Protected> } />
            <Route path="/dashboard/joinedtoday" element={ <Protected > <JoinTodayId/> </Protected> } />
            <Route path="marketplace/marketplacedetails/:id" element={<Protected > <MarketplaceDetailsId/> </Protected> }/>
            <Route path="/chatsupport/userchatdetails/:id" element={ <Protected > <UserChatDetailsId/> </Protected> } />
            
            <Route path='*' element={ <Protected > <Dashboard /> </Protected> }/> 
          </Routes>
    </Layout>
            {/* Pre settings before Super admin can actually Login in into the application  */}

            <Routes>
              {/* <Route path="/presettings" element={<PreSettings/>}/> */}
            </Routes>
      
    </>
  )}

export default App;
