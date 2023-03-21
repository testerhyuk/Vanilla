import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import './css/Detail.css'
import Nav from './Nav';
import Footer from './Footer';
import RecentWatched from './RecentWatched';
import { useDispatch } from 'react-redux';
import { insertItem } from '../redux/Store';

export default function Detail() {
    const location = useLocation();
    const dispatch = useDispatch();
    
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(location.state.price);
    const [tab, setTab] = useState(0);

    const handleQuantityPlus = () => {
        setQuantity(quantity+1)
    }

    const handleQuantityMinus = () => {
        if (quantity > 1) {
            setQuantity(quantity-1)
        }
    }

    useEffect(() => {
        setPrice(location.state.price * quantity)
    }, [location.state.price, quantity])

    useEffect(() => {
        let watched = sessionStorage.getItem('watched')
        watched = JSON.parse(watched)
        watched.unshift([location.state.productId, location.state.title])
        watched = [...new Set(watched.join("|").split("|"))]
                    .map((v) => v.split(","))
        watched = Array.from(watched)
        sessionStorage.setItem('watched', JSON.stringify(watched))
        window.dispatchEvent(new Event("storage"));
    })


  return (
    <>
        <Nav />
        <section className='productDetail'>
            <div className='imgInfo'>
                <img 
                    src={"https://gdimg.gmarket.co.kr/" + location.state.productId + "/still/300"}
                    alt={location.state.productId}
                    className='productImg'
                />
            </div>
            <div className='buyInfo'>
                <div>
                    <h3 className='productTitle'>{location.state.title}</h3>
                </div>
                <div>
                    <h3 className='ProductPrice'>{location.state.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</h3>
                </div>
                <div>
                    <div className='detailInfo'>
                        <table className='review'>
                            <tbody>
                                <tr>
                                    <td className='prod_info'>구매 후기</td>
                                    <td className='prod_info_dt'>정보없음</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='detailInfo'>
                        <table className='review'>
                            <tbody>
                                <tr>
                                    <td className='prod_info'>배송비</td>
                                    <td className='prod_info_dt'>무료 배송</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='detailInfo'>
                        <table className='review'>
                            <tbody>
                                <tr>
                                    <td className='prod_info'>배송 시작</td>
                                    <td className='prod_info_dt'>평균 1일, 최대 2일 이내</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='totalPriceSection'>
                    <span className='totalPrice'>총 금액</span>
                    <span className='varPrice'>{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</span>
                </div>
                <div className='buyButton'>
                    <div className='quantity_box'>
                        <span className='quantity'>수량</span>
                        <input className='prod_quantity' type='text' value={quantity} readOnly={true} />
                        <div className='quantity_button'>
                            <FontAwesomeIcon icon={faAngleUp} className="quantity_plus" onClick={handleQuantityPlus} />
                            <FontAwesomeIcon icon={faAngleDown} className="quantity_minus" onClick={handleQuantityMinus} />
                        </div>
                    </div>
                    <div className='buy_ctn'>
                        <button 
                            type='button' 
                            className='cart_button'
                            onClick={() => {
                                dispatch(
                                    insertItem({
                                        id: location.state.productId,
                                        title: location.state.title,
                                        price: location.state.price,
                                        quantity: quantity,
                                    })
                                )
                            }}
                        >
                            장바구니
                        </button>
                        <button type='button' className='buy_button'>구매하기</button>
                    </div>
                </div>
            </div>
            {/* 탭 UI */}
        </section>
        <div className='tabUI'>
            <ul className='menuTab'>
                <li>
                    <span 
                        className={'tabBox' + (tab===0 ? ' active' : '')}
                        onClick={() => setTab(0)}
                    >
                        리뷰
                    </span>
                </li>
                <li>
                    <span 
                        className={'tabBox' + (tab===1 ? ' active' : '')}
                        onClick={() => setTab(1)}
                    >
                        Q&A
                    </span>
                </li>
            </ul>
        </div>
        <div className='tabDetail'>
            { 
                tab === 0 ? <div>리뷰를 보여줌</div>
                : <div>Q&A를 보여줌</div>
            }
        </div>
        <Footer />
        <RecentWatched />
    </>
  )
}