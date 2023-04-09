import React, { useState } from 'react'
import { faSearch, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../css/Nav.css'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { signout } from '../api/ApiCall';

export default function Nav() {
    const [onOver, setOnOver] = useState(false);
    const navigate = useNavigate();
    const cartList = useSelector((state) => state.cart);
    const [searchKeyword, setSearchKeyword] = useState('');

    const handleChange = (e) => {
        setSearchKeyword(e.target.value)
        navigate(`/search?keyword=${e.target.value}`)
    }

    const handleMypage = () => {
        navigate('/my-page')
        // if (localStorage.getItem("ACCESS_TOKEN") === 'null' && sessionStorage.getItem("ACCESS_TOKEN") === 'null') {
        //     alert("로그인이 필요한 서비스입니다.")
        // } else {
        //     navigate('/my-page')
        // }
    }

  return (
    <> 
        <div className='topFunc'>
            {localStorage.getItem("ACCESS_TOKEN") === 'null' && sessionStorage.getItem("ACCESS_TOKEN") === 'null' ?
                (
                    <>
                        <span onClick={() => {navigate('/register')}}>회원가입</span>
                        <span onClick={() => {navigate('/login')}}>로그인</span>
                    </>
                )
                :
                (
                    <>
                        <span onClick={() => {signout()}}>로그아웃</span>
                    </>
                )
            }
        </div>
        {/* 내비게이션 */}
        <div className='nav'>
            <div className='nav_bar'>
            {/* 로고 */}
            <div className='logo'>
                <img src={process.env.PUBLIC_URL + '/logo.png'} alt='logo' className='logo' onClick={() => navigate('/')} />
            </div>
            </div>
            {/* 검색바 */}
            <div className='searchDiv'>
            <div className='searchForm'>
                <input type='text' placeholder='상품을 검색해보세요' className='searchInput' value={searchKeyword} onChange={handleChange}/>
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
                <FontAwesomeIcon icon={faUser} className='userInfoIcon' onClick={handleMypage} />
                <span onClick={handleMypage}>내 정보</span>
            </button>
            <button type='button' className='cartInfo'>
                <div className='cart-btn'>
                    {cartList.length > 0 ?
                        <span className='count_cart'>{cartList.length}</span>
                        :
                        null
                    }
                    <span>
                        <FontAwesomeIcon icon={faShoppingCart} className='cartIcon' onClick={() => navigate('/cart')}/>
                    </span>
                    <span onClick={() => navigate('/cart')}>장바구니</span>
                </div>
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
                            <Link 
                                to={"/category/m/shirts"}
                                style={{ textDecoration: "none", color: "gray" }}
                                state={{
                                    sex: "m", 
                                    cat: "shirts",
                            }}>
                                <li>셔츠/남방</li>
                            </Link>
                            <Link 
                                to={"/category/m/tshirts"}
                                style={{ textDecoration: "none", color: "gray" }}
                                state={{
                                    sex: "m", 
                                    cat: "tshirts",
                            }}>
                                <li>티셔츠</li>
                            </Link>
                            <Link 
                                to={"/category/m/jumper"}
                                style={{ textDecoration: "none", color: "gray" }}
                                state={{
                                    sex: "m", 
                                    cat: "jumper",
                            }}>
                                <li>패딩/점퍼</li>
                            </Link>
                            <Link 
                                to={"/category/m/jacket"}
                                style={{ textDecoration: "none", color: "gray" }}
                                state={{
                                    sex: "m", 
                                    cat: "jacket",
                            }}>
                                <li>자켓/코트</li>
                            </Link>
                            <Link 
                                to={"/category/m/pants"}
                                style={{ textDecoration: "none", color: "gray" }}
                                state={{
                                    sex: "m", 
                                    cat: "pants",
                            }}>
                                <li>팬츠</li>
                            </Link>
                        </ul>
                    </div>
                    <div>
                        <div className='woman_category'>여성용</div>
                        <ul>
                            <Link 
                                to={"/category/w/shirts"}
                                style={{ textDecoration: "none", color: "gray" }}
                                state={{
                                    sex: "w", 
                                    cat: "shirts",
                            }}>
                                <li>블라우스/셔츠</li>
                            </Link>
                            <Link 
                                to={"/category/w/tshirts"}
                                style={{ textDecoration: "none", color: "gray" }}
                                state={{
                                    sex: "w", 
                                    cat: "tshirts",
                            }}>
                                <li>티셔츠</li>
                            </Link>
                            <Link 
                                to={"/category/w/skirts"}
                                style={{ textDecoration: "none", color: "gray" }}
                                state={{
                                    sex: "w", 
                                    cat: "skirts",
                            }}>
                                <li>스커트</li>
                            </Link>
                            <Link 
                                to={"/category/w/pants"}
                                style={{ textDecoration: "none", color: "gray" }}
                                state={{
                                    sex: "w", 
                                    cat: "pants",
                            }}>
                                <li>바지/청바지</li>
                            </Link>
                            <Link 
                                to={"/category/w/onepiece"}
                                style={{ textDecoration: "none", color: "gray" }}
                                state={{
                                    sex: "w", 
                                    cat: "onepiece",
                            }}>
                                <li>원피스</li>
                            </Link>
                        </ul>
                    </div>
                </div>
            : ''}
        </section>
    </>
  )
}
