import React, { useState } from 'react'
import AddBanner from './AddBanner'
import BannersList from './BannersList'

export default function Index() {
  const [bannerData , setBannerData] = useState()
  return (
    <div>
        <AddBanner handleClick={(data)=>{setBannerData(data)}}/>
        <BannersList newBanner={bannerData}/>
    </div>
  )
}


