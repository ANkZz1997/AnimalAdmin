// const EXCHANGE_URL = process.env.NEXT_PUBLIC_BASE_EXCHANGE_URL;
// const NEXT_ORIGIN = process.env.NEXT_PUBLIC_NEXT_URL || '';
// const EXCHANGE_URL = 'http://nft.sdnatech.com:8080'
// const EXCHANGE_URL = 'https://nft-admin.sdnatech.com/'
const EXCHANGE_URL = 'https://nft.sdnatech.com/animal-api-dev'



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


            LOGIN: `${EXCHANGE_URL}/auth/adminLogin`,
            GET_DASHBOARD: `${EXCHANGE_URL}/admin/dashboard`,
            GET_USER_LIST: `${EXCHANGE_URL}/admin/users`,
            GET_NFTS_LIST: `${EXCHANGE_URL}/admin/nft`,
            GET_AUCTIONS_LIST: `${EXCHANGE_URL}/admin/auctions`,
            GET_MARKETPLACE_ITEM_LIST: `${EXCHANGE_URL}/admin/marketplace`,
            GET_BIDS_LIST: `${EXCHANGE_URL}/admin/bids`,
            GET_USERDETAILS_LIST: `${EXCHANGE_URL}/admin/getUserDetail?id=6392c0a5101f472e2010c544`,
            GET_KYC_DETAILS: `${EXCHANGE_URL}/admin/kyc`,

            //INDIVIDUAL DETAILS APIS

            GET_USER_DETAILS: `${EXCHANGE_URL}/admin/getUserDetail?id=`,
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
            ADD_NETWORK: `${EXCHANGE_URL}/admin/addNetwork`,
            ENABLE_NETWORK: `${EXCHANGE_URL}/admin/setNetworkEnableStatus`,
            DEFAULT_NETWORK: `${EXCHANGE_URL}/admin/setNetworkAsDefault?id=`,
            DELETE_NETWORK: `${EXCHANGE_URL}/admin/deleteNetwork`,
            EDIT_NETWORK: `${EXCHANGE_URL}/admin/editNetwork`
        },

        ENDPOINTS: {
            IMAGE_END_POINT: `${EXCHANGE_URL}/download/`,
          },
    }

}

export default URLS;



