import React from 'react'
import { faSearch, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './css/Nav.css'
import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <>
        <div className='topFunc'>
            <span>회원가입</span>
            <span>로그인</span>
            <span>고객센터</span>
        </div>
        {/* 내비게이션 */}
        <div className='nav'>
            <div className='nav_bar'>
            {/* 로고 */}
            <div className='logo'>
            <Link to='/'>
                <img src={process.env.PUBLIC_URL + '/logo.png'} alt='logo' className='logo' />
            </Link>
            </div>
            </div>
            {/* 검색바 */}
            <div className='searchDiv'>
            <div className='searchForm'>
                <input type='text' placeholder='상품을 검색해보세요' className='searchInput'/>
                <label className='searchLabel'>
                <button type='button' className='searchButton'>
                    <FontAwesomeIcon icon={faSearch} className="search" />
                </button>
                </label>
            </div>
            </div>
            {/* 회원 정보 장바구니 */}
            <div className='infoButton'>
            <button type='button' className='userInfo'>
                <FontAwesomeIcon icon={faUser} className='userInfoIcon'/>
                내 정보
            </button>
            <button type='button' className='cartInfo'>
                <FontAwesomeIcon icon={faShoppingCart} className='cartIcon'/>
                장바구니
            </button>
            </div>
        </div>
        {/* 카테고리 */}
        <section className='category'>
            <button className='categoryButton'>카테고리</button>
        </section>
    </>
  )
}
