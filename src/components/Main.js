import React, { useEffect } from 'react'
import Banner from './Banner'
import Footer from './Footer'
import Nav from './Nav'
import Product from './Product'
import RecentWatched from './RecentWatched'

export default function Main() {
  return (
    <div>
        <Nav />
        <Banner />
        <Product />
        <Footer />
        <RecentWatched />
    </div>
  )
}
