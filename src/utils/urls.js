export const EXCHANGE_URL = process.env.REACT_APP_BASE_EXCHANGE_URL;
console.log("EXCHANGE_URL",EXCHANGE_URL)
// const NEXT_ORIGIN = process.env.NEXT_PUBLIC_NEXT_URL || '';
// const EXCHANGE_URL = 'http://nft.sdnatech.com:8080'
// const EXCHANGE_URL = 'https://nft-admin.sdnatech.com/'
// export const EXCHANGE_URL = 'https://nft.sdnatech.com/animal-api-dev'
const URLS = {
    //PAGE ROUTES
    NEXT :{
        USER:{
            Key:"Value"
        },
    },
    //API ROUTES
    EXCHANGE:{

            //COMPLETE DETAILS APIS
        ADMIN:{
            //Pre Login APIs
            GET_SETTING_LIST:`${EXCHANGE_URL}/admin/getSettings`,
            SET_COMMISSION:`${EXCHANGE_URL}/admin/setCommission?value=`,
            SET_COMMISSION_TYPE:`${EXCHANGE_URL}/admin/setCommissionType?value=`,
            SET_LAZY_MINTING:`${EXCHANGE_URL}/admin/setLazyMint?value=`,
            SET_STRIPE_SECRET:`${EXCHANGE_URL}/admin/setStripeSecret?value=`,
            POST_PINATA_CREDINTIALS:`${EXCHANGE_URL}/admin/setPinataCreds?value=`,
            POST_STRIPE_CALLBACK: `${EXCHANGE_URL}/admin/stripeCallbackUrl`,
            POST_PLATFORM_DETAILS:`${EXCHANGE_URL}/admin/setPlatformDetails`,


            LOGIN: `${EXCHANGE_URL}/auth/adminLogin`,
            GET_DASHBOARD: `${EXCHANGE_URL}/admin/dashboard`,
            GET_CHAIN_BALANCE: `${EXCHANGE_URL}/admin/adminBalance`,
            GET_TOP_BUYER: `${EXCHANGE_URL}/admin/topBuyer`,
            GET_TOP_SELLER: `${EXCHANGE_URL}/admin/topSeller`,
            GET_USERS_WALLET_BALANCE: `${EXCHANGE_URL}/admin/usersWalletBalance`,
            ALL_USERS_SOCIAL_TYPE: `${EXCHANGE_URL}/admin/userSocialType`,
            ALL_USERS_KYC_STATUS: `${EXCHANGE_URL}/admin/usersKycStatus`,
            ETH_TRANSFEREDBY_ADMIN: `${EXCHANGE_URL}/admin/totalEthTransfered`,
            USER_COUNT_PER_MONTH: `${EXCHANGE_URL}/admin/userCountPerMonth`,
            MARKETPLACE_STATUS_GRAPH: `${EXCHANGE_URL}/admin/marketplaceStatusData`,
            PLATFORM_FEE_DATA: `${EXCHANGE_URL}/admin/platformFeeData`,




            GET_USER_LIST: `${EXCHANGE_URL}/admin/users`,
            GET_NFTS_LIST: `${EXCHANGE_URL}/admin/nft`,
            GET_AUCTIONS_LIST: `${EXCHANGE_URL}/admin/auctions`,
            GET_MARKETPLACE_ITEM_LIST: `${EXCHANGE_URL}/admin/marketplace`,
            GET_BIDS_LIST: `${EXCHANGE_URL}/admin/bids`,
            GET_USERDETAILS_LIST: `${EXCHANGE_URL}/admin/getUserDetail?id=6392c0a5101f472e2010c544`,
            GET_KYC_DETAILS: `${EXCHANGE_URL}/admin/kyc`,
            GET_KYC_DOC_LIST: `${EXCHANGE_URL}/admin/getKYCDocType`,
            ADD_KYC_DOC_LIST: `${EXCHANGE_URL}/admin/addKYCDocType`,
            EDIT_KYC_DOC: `${EXCHANGE_URL}/admin/editKYCDocType`,
            UPDATE_KYC_DOC: `${EXCHANGE_URL}/admin/setKYCDocTypeStatus`,
            EDIT_ADMIN_PROFILE: `${EXCHANGE_URL}/admin/editProfile`,
            EDIT_ADMIN_PASSWORD: `${EXCHANGE_URL}/admin/changePassword`,

            



            //INDIVIDUAL DETAILS APIS

            GET_USER_DETAILS: `${EXCHANGE_URL}/admin/getUserDetail?id=`,
            POST_USER_STATUS: `${EXCHANGE_URL}/admin/updateUserStatus`,
            GET_USER_ACTIVITIES: `${EXCHANGE_URL}/admin/getActivities`,
            GET_NFT_DETAILS: `${EXCHANGE_URL}/admin/getNftDetail?id=`,
            GET_AUCTION_DETAILS: `${EXCHANGE_URL}/admin/getAuctionDetail?id=`,
            GET_MARKETPLACE_DETAILS: `${EXCHANGE_URL}/admin/getMarketplaceDetail?id=`,
            GET_BIDS_DETAILS: `${EXCHANGE_URL}/admin/getBidDetail?id=`,
            KYC_ACTION_APPROVE: `${EXCHANGE_URL}/kyc/verifyKyc?id=`,
            KYC_ACTION_REJECT: `${EXCHANGE_URL}/kyc/rejectKyc?id=`,
            GET_DISPUTE_LIST: `${EXCHANGE_URL}/admin/dispute?`,
            GET_DISPUTE_TOPIC: `${EXCHANGE_URL}/dispute/getEntities`,
            GET_CONVERSATION: `${EXCHANGE_URL}/conversation?id=`,
            POST_CONVERSATION: `${EXCHANGE_URL}/dispute/newResponse`,
            POST_BANNERS: `${EXCHANGE_URL}/admin/addBanner`,
            BANNER_LIST:`${EXCHANGE_URL}/admin/banners`,
            BANNER_STATUS: `${EXCHANGE_URL}/admin/updateBannerStatus`,
            DELETE_BANNER: `${EXCHANGE_URL}/admin/deleteBanner`,

            POST_ROLES: `${EXCHANGE_URL}/access/addRole`,
            POST_ACCESS_CODE: `${EXCHANGE_URL}/access/addAccessCode`,
            ASSIGN_ROLES_CODES: `${EXCHANGE_URL}/access/assignAccessCode`,
            REMOVE_ROLES_CODES: `${EXCHANGE_URL}/access/removeAccessCode`,

            GET_ROLES: `${EXCHANGE_URL}/access/getRoles`,
            GET_ACCESS_CODES: `${EXCHANGE_URL}/access/getAccessCodes`,
            GET_NETWORKS:`${EXCHANGE_URL}/admin/getNetworks`,

            GET_ADMIN_USERS : `${EXCHANGE_URL}/admin/fetchAdminUsers`,
            CREATE_USER_ASSIGN_CODE : `${EXCHANGE_URL}/admin/createAdminUser`,
            CHANGE_USER_ROLES :`${EXCHANGE_URL}/admin/updateAdminUserRole`,
            CHANGE_ADMIN_USER_PASSWORD:`${EXCHANGE_URL}/admin/updateAdminUserPassword`,

            ADD_NETWORK: `${EXCHANGE_URL}/admin/addNetwork`,
            ENABLE_NETWORK: `${EXCHANGE_URL}/admin/setNetworkEnableStatus`,
            DEFAULT_NETWORK: `${EXCHANGE_URL}/admin/setNetworkAsDefault?id=`,
            DELETE_NETWORK: `${EXCHANGE_URL}/admin/deleteNetwork`,
            EDIT_NETWORK: `${EXCHANGE_URL}/admin/editNetwork`,
            START_LISTENING: `${EXCHANGE_URL}/contractEvent/startListening`,
        },

        ENDPOINTS: {
            // IMAGE_END_POINT: `${EXCHANGE_URL}/download/`,
            IMAGE_END_POINT: `https://nft.sdnatech.com/animal-api-dev/download/`,
          },
    }

}

export default URLS;



