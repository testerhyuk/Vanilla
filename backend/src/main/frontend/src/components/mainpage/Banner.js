import React from 'react'
import '../css/Banner.css'

export default function Banner() {
  return (
    <div className='bannerSlider'>
        <img src={process.env.PUBLIC_URL + '/banner.jpg'} height="420px" alt='banner' className='banner_img'/>
    </div>
  )
}
