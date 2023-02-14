import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import './css/Detail.css'

export default function Detail() {
    const location = useLocation();

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

  return (
    <>
        <section className='productDetail'>
            <div className='imgInfo'>
                <img 
                    src={"https://codingapple1.github.io/shop/shoes" + (location.state.productId+1) + ".jpg"}
                    alt={'product' + location.state.productId}
                    className='productImg'
                />
            </div>
            <div className='buyInfo'>
                <div>
                    <h2 className='productTitle'>{location.state.title}</h2>
                </div>
                <div>
                    <h2 className='ProductPrice'>{location.state.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</h2>
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
                    <div className='detailInfo'>
                        <table className='review'>
                            <tbody>
                                <tr>
                                    <td className='prod_info'>제품 소개</td>
                                    <td className='prod_info_dt'>{location.state.description}</td>
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
                    <button type='button' className='cart_button'>장바구니</button>
                    <button type='button' className='buy_button'>구매하기</button>
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
                        상세정보
                    </span>
                </li>
                <li>
                    <span 
                        className={'tabBox' + (tab===1 ? ' active' : '')}
                        onClick={() => setTab(1)}
                    >
                        리뷰
                    </span>
                </li>
                <li>
                    <span 
                        className={'tabBox' + (tab===2 ? ' active' : '')}
                        onClick={() => setTab(2)}
                    >
                        Q&A
                    </span>
                </li>
            </ul>
        </div>
        <div className='tabDetail'>
            { 
                tab === 0 ? <div>상세정보를 보여줌</div>
                : tab === 1 ? <div>리뷰를 보여줌</div>
                : <div>Q&A를 보여줌</div>
            }
        </div>
    </>
  )
}
