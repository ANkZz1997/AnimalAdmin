// import axios from 'axios'
// import React from 'react'
// import { useEffect } from 'react'
// import { useState } from 'react'
// import styled from 'styled-components'
// import URLS from '../../utils/urls'
// import CommissionValue from './CommissionValue'
// import LazyMinting from './LazyMinting'
// import PinataCredentials from './PinataCredentials'
// import StripeSecret from './StripeSecret'

// export default function PreLoginSetting({handleCheck}) {
//     const [activeSetting, setActiveSetting] = useState('');
//     const [settingRes, setSettingRes] = useState({});
//     const [lazy, setLazy] = useState();
//     const [comm, setComm] = useState();

//     const getSettings = async () => {
//         try {
//             const res = await axios.get(`${URLS.EXCHANGE.ADMIN.GET_SETTING_LIST}`)
//             setSettingRes(res?.data?.data)

//         } catch (err) {
//             console.log("err", err)
//         }
//     }

//     const findEmpty = () => {
//         let emptyKey = [];
//         for (const i in settingRes) {
//             if (settingRes[i] == "") {
//                 emptyKey.push(i);
//             }
//         }
//         // emptyKey.push("lazymint")

//         emptyKey = emptyKey.filter(function(items){
//             return items !== "adminPrivateKey"
//         })

//         setActiveSetting(emptyKey[0])
//         // setActiveSetting("lazymint")
//         console.log("emptyKey",emptyKey)
//         handleCheck(emptyKey)
//     }


//     useEffect(() => {
//         getSettings();
//     }, [])


//     useEffect(() => {
//         if(Object.keys(settingRes).length != 0){
//             findEmpty();
//         }else{
//             handleCheck([])
//         }
//     }, [settingRes])

//     console.log('settingRes ---- ',activeSetting)

//     return (
//         <Root>
//             <h1>
//                 Welcome To SDNA's NFT World, Follow The Instructions To Continue Your Onboarding...
//             </h1>
//             {/* <CommissionValue comm={'bsbsbbs'}/> */}
//             <div>
//                 {activeSetting == "commission" || activeSetting == "commissionType" ? <CommissionValue handleApiCall={()=>{getSettings()}}/> :  activeSetting == "lazymint" ?
//                     <LazyMinting handleApiCall={()=>{getSettings()}} /> : activeSetting == "adminPrivateKey" ? <LazyMinting /> : activeSetting == "pinataApiKey" || activeSetting == "pinataSecret" ? 
//                     <PinataCredentials handleApiCall={()=>{getSettings()}} /> : activeSetting == "stripeSecret" ? <StripeSecret handleApiCall={()=>{getSettings()}} /> : ""}
//             </div>
//             <button onClick={()=>{ handleCheck()}}>Click Next</button>
//         </Root>
//     )
// }

// const Root = styled.section`


// `
