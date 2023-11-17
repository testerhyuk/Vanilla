import React from 'react'
import '../css/Banner.css'
import { useNavigate } from 'react-router-dom'

export default function Banner() {
  const navigate = useNavigate();

  return (
    <div className='bannerSlider'>
        <img 
          src={process.env.PUBLIC_URL + '/banner.jpg'}
          height="420px"
          alt='banner' 
          className='banner_img'
          onClick={() => {navigate('/event')}}
          />
    </div>
  )
}