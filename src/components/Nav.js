import React, { useState } from 'react'
import { faSearch, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './css/Nav.css'
import { Link, useNavigate } from 'react-router-dom';

export default function Nav() {
    const [onOver, setOnOver] = useState(false);
    const navigate = useNavigate();

  return (
    <>
        <div className='topFunc'>
            <span onClick={() => {navigate('/register')}}>회원가입</span>
            <span>로그인</span>
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
                <Link to={'/cart'} className='cart-btn'>
                    <FontAwesomeIcon icon={faShoppingCart} className='cartIcon'/>
                    장바구니
                </Link>
            </button>
            </div>
        </div>
        {/* 카테고리 */}
        <section className='category'>
            <button onMouseEnter={() => {setOnOver(!onOver)}} className='categoryButton'>카테고리</button>
            {onOver ?
                <div className='mouseover_menu' onMouseLeave={() => {setOnOver(!onOver)}}>
                    <div>
                        <div className='man_category'>남성용</div>
                        <ul>
                            <li>셔츠/남방</li>
                            <li>티셔츠</li>
                            <li>패딩/점퍼</li>
                            <li>자켓/코트</li>
                            <li>팬츠</li>
                        </ul>
                    </div>
                    <div>
                        <div className='woman_category'>여성용</div>
                        <ul>
                            <li>블라우스/셔츠</li>
                            <li>티셔츠</li>
                            <li>스커트</li>
                            <li>바지/청바지</li>
                            <li>원피스</li>
                        </ul>
                    </div>
                </div>
            : ''}
        </section>
    </>
  )
}
