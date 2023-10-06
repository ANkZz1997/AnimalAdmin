
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
// import DashboardDetailsId from "./Components/Dashboard/DashboardDetails/DashboardDetails";
import UserChatDetailsId from "./Pages/ChatDetails";
import MarketplaceDetailsId from "./Pages/MarketplaceDetails";
import PlatformSettings from "./Pages/PlatformSettings";
import MobileSettings from "./Pages/MobileSettings";
import NotificationPage from "./Pages/NotificationPage";
import Login from "./Components/Login";
import AdminProfile from "./Components/AdminSettings/AdminProfile";
import PageNF from "./Pages/PageNF";
import WelcomePage from "./Pages/WelcomePage";
// import PreSettings from "./Pages/PreSettings";

function App() {
  const accessCodes = useSelector(
    (state) => state?.persistReducer?.accessCodes
  );

  console.log("accessCodes",accessCodes.includes("dashboard_code"))

  return (
   <>
   <Layout>
          <Routes>
            {accessCodes.includes("dashboard_code") ?
            <Route path="/dashboard" exact element={ <Protected > <Dashboard /> </Protected> } />:""
          }
            {accessCodes.includes("user_code") ?
            <Route path="/user" element={ <Protected > <User /> </Protected> }/>:""
          }
            {accessCodes.includes("single_user_code") ?
            <Route path="/user/userdetails/:id" element={ <Protected > <UserDetails /> </Protected> } />:""
          }
            {accessCodes.includes("nft_code") ?
            <Route path="/nfts" element={ <Protected > <Nfts /> </Protected> } />:""
          }
            {accessCodes.includes("single_nft_code") ?
            <Route path="/nfts/nftdetails/:id" element={ <Protected > <NftDetailsId/> </Protected> } />:""
          }
            {accessCodes.includes("auction_code") ?
            <Route path="/auction" element={ <Protected > <Auction /> </Protected> } />:""
          }
            {accessCodes.includes("auction_code") ?
            <Route path="/auction/auctiondetails/:id" element={ <Protected > <AuctionDetailsId/> </Protected> } />:""
          }
            {accessCodes.includes("marketplace_code") ?
            <Route path="/marketplace" element={ <Protected > <Marketplace /> </Protected> } />:""
          }
            {accessCodes.includes("marketplace_code") ?
            <Route path="marketplace/marketplacedetails/:id" element={<Protected > <MarketplaceDetailsId/> </Protected> }/>:""
          }
            {accessCodes.includes("bids_code") ?
            <Route path="/bids" element={ <Protected > <Bids /> </Protected> } />:""
          }
            {accessCodes.includes("kyc_code") ?
            <Route path="/kyc" element={ <Protected > <Kyc /> </Protected> } />:""
          }
            {accessCodes.includes("chat_support_code") ?
            <Route path="/chatsupport" element={ <Protected > <Chatsupport/> </Protected> } />:""
          }
            {accessCodes.includes("chat_support_code") ?
            <Route path="/chatsupport/userchatdetails/:id" element={ <Protected > <UserChatDetailsId/> </Protected> } />:""
          }
            {accessCodes.includes("platform_settings") ?
            <Route path="/platformsettings" element={ <Protected > <PlatformSettings/> </Protected> } />:""
          }
            {accessCodes.includes("mobile_setting_code") ?
            <Route path="/mobilesettings" element={ <Protected > <MobileSettings/> </Protected> } />:""
          }
            
            {/* <Route path="/help" element={ <Protected > <Help /> </Protected> } /> */}
            <Route path='/welcome' element={<Protected><WelcomePage/></Protected>}/>
            <Route path='*' element={<Protected><WelcomePage/></Protected>}/>
            <Route path='/profileadmin' element={<Protected><AdminProfile/></Protected>}/>
            <Route path="/notification" element={ <Protected > <NotificationPage/> </Protected> } />
            {/* <Route path='*' element={ <Protected > <PageNF /> </Protected> }/>  */}
          </Routes>
    </Layout>
    </>
  )}

export default App;
